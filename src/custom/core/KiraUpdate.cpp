// SPDX-License-Identifier: GPL-3.0-only
#include "KiraUpdate.h"
#include "NodeDB.h"
#include "configuration.h"
#include "custom/features.h"

#if HAS_WIFI
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <esp_ota_ops.h>
#include <nvs.h>
#endif

namespace ThinkKira
{

static const char *REPO_PATH = "/Kirakodo/ThinkKiraM5/releases/latest";
static const char *BIN_URL = "https://github.com/Kirakodo/ThinkKiraM5/releases/latest/download/thinkkira-m5.bin";
static UpdateInfo info;
static uint32_t lastCheckMs = 0, wifiUpSinceMs = 0;
static volatile bool busy = false;

const UpdateInfo &updateInfo()
{
    return info;
}

bool versionNewer(const std::string &a, const std::string &b)
{
    int x[3] = {0}, y[3] = {0};
    sscanf(a.c_str(), "%d.%d.%d", &x[0], &x[1], &x[2]);
    sscanf(b.c_str(), "%d.%d.%d", &y[0], &y[1], &y[2]);
    for (int i = 0; i < 3; i++)
        if (x[i] != y[i])
            return x[i] > y[i];
    return false;
}

#if HAS_WIFI
// Liest „Location: …/releases/tag/v0.5.0“ aus der Weiterleitung. Nur die Versionsnummer wird gelesen; die
// Firmware selbst lädt der Updater mit Zertifikatsprüfung.
static void checkTask(void *)
{
    WiFiClientSecure c;
    c.setInsecure();
    c.setTimeout(15);
    std::string tag, err;
    if (!c.connect("github.com", 443)) {
        err = "GitHub nicht erreichbar";
    } else {
        c.printf("HEAD %s HTTP/1.1\r\nHost: github.com\r\nUser-Agent: ThinkKira/%s\r\nConnection: close\r\n\r\n", REPO_PATH,
                 THINKKIRA_VERSION);
        uint32_t t0 = millis();
        while (c.connected() && millis() - t0 < 15000) {
            String line = c.readStringUntil('\n');
            if (line.length() <= 1)
                break;
            String low = line;
            low.toLowerCase();
            if (low.startsWith("location:")) {
                int p = line.lastIndexOf("/tag/v");
                if (p >= 0) {
                    tag = line.substring(p + 6).c_str();
                    while (!tag.empty() && (tag.back() == '\r' || tag.back() == ' '))
                        tag.pop_back();
                }
            }
        }
        c.stop();
        if (tag.empty())
            err = "Keine Version gefunden";
    }
    if (err.empty()) {
        info.latest = tag;
        info.state = versionNewer(tag, THINKKIRA_VERSION) ? UpdState::AVAILABLE : UpdState::NONE;
    } else {
        info.error = err;
        info.state = UpdState::ERROR;
    }
    LOG_INFO("[Kira] Update-Prüfung: %s %s", tag.c_str(), err.c_str());
    busy = false;
    vTaskDelete(nullptr);
}
#endif

bool updateCheckNow()
{
#if HAS_WIFI
    if (!config.network.wifi_enabled || WiFi.status() != WL_CONNECTED)
        return false;
    if (busy)
        return true;
    busy = true;
    lastCheckMs = millis();
    info.state = UpdState::CHECKING;
    if (xTaskCreate(checkTask, "kiraUpd", 8192, nullptr, 1, nullptr) != pdPASS) {
        busy = false;
        info.state = UpdState::ERROR;
        info.error = "Kein Speicher";
    }
    return true;
#else
    return false;
#endif
}

void updateAutoCheck()
{
#if HAS_WIFI
    bool up = config.network.wifi_enabled && WiFi.status() == WL_CONNECTED;
    uint32_t now = millis();
    if (!up) {
        wifiUpSinceMs = 0;
        return;
    }
    if (!wifiUpSinceMs)
        wifiUpSinceMs = now;
    bool firstDue = !lastCheckMs && now - wifiUpSinceMs > 60 * 1000UL;
    bool againDue = lastCheckMs && now - lastCheckMs > 12 * 3600 * 1000UL;
    if (firstDue || againDue)
        updateCheckNow();
#endif
}

bool updateInstall(std::string &error)
{
#if HAS_WIFI
    if (!config.network.wifi_enabled || !*config.network.wifi_ssid) {
        error = "WLAN ist nicht eingerichtet";
        return false;
    }
    const esp_partition_t *upd = esp_partition_find_first(ESP_PARTITION_TYPE_APP, ESP_PARTITION_SUBTYPE_APP_OTA_1, nullptr);
    esp_app_desc_t d;
    if (!upd || esp_ota_get_partition_description(upd, &d) != ESP_OK || strcmp(d.project_name, "thinkkira-updater") != 0) {
        error = "Updater fehlt: einmal über den Loader installieren";
        return false;
    }
    nvs_handle_t h;
    if (nvs_open("tkupd", NVS_READWRITE, &h) != ESP_OK) {
        error = "Speicher nicht bereit";
        return false;
    }
    nvs_set_str(h, "ssid", config.network.wifi_ssid);
    nvs_set_str(h, "psk", config.network.wifi_psk);
    nvs_set_str(h, "url", BIN_URL);
    nvs_erase_key(h, "result");
    nvs_commit(h);
    nvs_close(h);
    if (esp_ota_set_boot_partition(upd) != ESP_OK) {
        error = "Updater lässt sich nicht starten";
        return false;
    }
    return true; // Neustart macht der Aufrufer (nach dem Zeichnen des Hinweises)
#else
    error = "Kein WLAN";
    return false;
#endif
}

std::string updateLastResult()
{
    std::string r;
#if HAS_WIFI
    nvs_handle_t h;
    if (nvs_open("tkupd", NVS_READWRITE, &h) == ESP_OK) {
        char b[64] = {0};
        size_t n = sizeof(b);
        if (nvs_get_str(h, "result", b, &n) == ESP_OK) {
            r = b;
            nvs_erase_key(h, "result");
            nvs_erase_key(h, "psk"); // Zugang nicht länger als nötig aufheben
            nvs_commit(h);
        }
        nvs_close(h);
    }
#endif
    return r;
}

} // namespace ThinkKira
