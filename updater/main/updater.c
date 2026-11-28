// ThinkKira Updater – läuft aus der Partition „flashApp“ (ota_1, 640 KB).
// Die ThinkKira-Firmware legt vor dem Neustart WLAN-Zugang und Download-Adresse in NVS ab (Namensraum „tkupd“)
// und startet dieses Programm. Es verbindet sich mit dem WLAN, lädt die Firmware per HTTPS (GitHub-Release)
// und schreibt sie in die App-Partition. Danach startet wieder ThinkKira.
// Schlägt es fehl, bevor die alte Firmware überschrieben wurde, geht es zurück zur alten Firmware.
// Sonst wird es (mit Pausen) weiter versucht – zur Not lässt sich das Gerät immer per USB über den Loader flashen.
// Ergebnis für ThinkKira: NVS „tkupd/result“ = "ok" oder "fail:<grund>".
// SPDX-License-Identifier: GPL-3.0-only
#include <string.h>

#include "esp_crt_bundle.h"
#include "esp_event.h"
#include "esp_http_client.h"
#include "esp_https_ota.h"
#include "esp_log.h"
#include "esp_netif.h"
#include "esp_ota_ops.h"
#include "esp_system.h"
#include "esp_wifi.h"
#include "freertos/FreeRTOS.h"
#include "freertos/event_groups.h"
#include "nvs.h"
#include "nvs_flash.h"

static const char *TAG = "tkupd";
#define DEFAULT_URL "https://github.com/Kirakodo/ThinkKiraM5/releases/latest/download/thinkkira-m5.bin"

static EventGroupHandle_t events;
#define GOT_IP BIT0
static int retries = 0;

static void onWifi(void *arg, esp_event_base_t base, int32_t id, void *data)
{
    if (base == WIFI_EVENT && id == WIFI_EVENT_STA_START) {
        esp_wifi_connect();
    } else if (base == WIFI_EVENT && id == WIFI_EVENT_STA_DISCONNECTED) {
        retries++;
        vTaskDelay(pdMS_TO_TICKS(1000));
        esp_wifi_connect();
    } else if (base == IP_EVENT && id == IP_EVENT_STA_GOT_IP) {
        xEventGroupSetBits(events, GOT_IP);
    }
}

static void saveResult(const char *text)
{
    nvs_handle_t h;
    if (nvs_open("tkupd", NVS_READWRITE, &h) == ESP_OK) {
        nvs_set_str(h, "result", text);
        nvs_commit(h);
        nvs_close(h);
    }
}

// Ist in der App-Partition (ota_0) noch eine startfähige Firmware?
static bool oldAppIntact(const esp_partition_t *app)
{
    esp_app_desc_t d;
    return app && esp_ota_get_partition_description(app, &d) == ESP_OK;
}

static void backToApp(const esp_partition_t *app, const char *why)
{
    char b[64];
    snprintf(b, sizeof(b), "fail:%s", why);
    saveResult(b);
    if (oldAppIntact(app) && esp_ota_set_boot_partition(app) == ESP_OK) {
        ESP_LOGW(TAG, "Abbruch (%s), zurück zur alten Firmware", why);
        esp_restart();
    }
}

static esp_err_t download(const char *url)
{
    esp_http_client_config_t http = {
        .url = url,
        .crt_bundle_attach = esp_crt_bundle_attach,
        .timeout_ms = 20000,
        .keep_alive_enable = true,
        .buffer_size = 4096,    // GitHub schickt lange Kopfzeilen (Weiterleitung)
        .buffer_size_tx = 2048, // lange Weiterleitungs-Adresse
        .max_redirection_count = 5,
    };
    esp_https_ota_config_t cfg = {.http_config = &http};
    return esp_https_ota(&cfg);
}

void app_main(void)
{
    esp_err_t err = nvs_flash_init();
    if (err == ESP_ERR_NVS_NO_FREE_PAGES || err == ESP_ERR_NVS_NEW_VERSION_FOUND) {
        nvs_flash_erase();
        nvs_flash_init();
    }
    const esp_partition_t *app = esp_partition_find_first(ESP_PARTITION_TYPE_APP, ESP_PARTITION_SUBTYPE_APP_OTA_0, NULL);

    char ssid[33] = {0}, psk[65] = {0}, url[200] = DEFAULT_URL;
    nvs_handle_t h;
    size_t n;
    if (nvs_open("tkupd", NVS_READONLY, &h) == ESP_OK) {
        n = sizeof(ssid);
        nvs_get_str(h, "ssid", ssid, &n);
        n = sizeof(psk);
        nvs_get_str(h, "psk", psk, &n);
        n = sizeof(url);
        if (nvs_get_str(h, "url", url, &n) != ESP_OK)
            strcpy(url, DEFAULT_URL);
        nvs_close(h);
    }
    if (!ssid[0])
        backToApp(app, "kein WLAN");

    events = xEventGroupCreate();
    esp_netif_init();
    esp_event_loop_create_default();
    esp_netif_create_default_wifi_sta();
    wifi_init_config_t wcfg = WIFI_INIT_CONFIG_DEFAULT();
    esp_wifi_init(&wcfg);
    esp_event_handler_register(WIFI_EVENT, ESP_EVENT_ANY_ID, onWifi, NULL);
    esp_event_handler_register(IP_EVENT, IP_EVENT_STA_GOT_IP, onWifi, NULL);
    wifi_config_t wc = {0};
    memcpy(wc.sta.ssid, ssid, strlen(ssid));
    memcpy(wc.sta.password, psk, strlen(psk));
    esp_wifi_set_mode(WIFI_MODE_STA);
    esp_wifi_set_config(WIFI_IF_STA, &wc);
    esp_wifi_start();

    for (int attempt = 1;; attempt++) {
        if (!(xEventGroupWaitBits(events, GOT_IP, pdFALSE, pdTRUE, pdMS_TO_TICKS(45000)) & GOT_IP)) {
            backToApp(app, "WLAN nicht erreichbar");
            vTaskDelay(pdMS_TO_TICKS(30000)); // alte Firmware schon weg: weiter versuchen
            continue;
        }
        ESP_LOGW(TAG, "Lade %s (Versuch %d)", url, attempt);
        err = download(url);
        if (err == ESP_OK) {
            saveResult("ok");
            ESP_LOGW(TAG, "Fertig, starte neu");
            esp_restart();
        }
        ESP_LOGE(TAG, "Download fehlgeschlagen: %d", err);
        if (attempt >= 3)
            backToApp(app, "Download fehlgeschlagen");
        vTaskDelay(pdMS_TO_TICKS(attempt < 3 ? 5000 : 60000));
    }
}
