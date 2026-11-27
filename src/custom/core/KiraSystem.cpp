// ThinkKira – Hardware- und Speicher-Infos
// SPDX-License-Identifier: GPL-3.0-only
#ifdef THINKKIRA

#include "KiraSystem.h"
#include "FSCommon.h"
#include "concurrency/OSThread.h"
#include "configuration.h"
#include "custom/features.h"

#include <esp_efuse.h>
#include <esp_efuse_table.h>
#include <esp_flash.h>
#include <esp_ota_ops.h>
#include <esp_partition.h>

extern int m5HasAg3352; // aus src/platform/extra_variants/ELECROW-ThinkNode-M5/variant.cpp

namespace ThinkKira
{

static uint8_t readPsramEfuseMB()
{
#ifdef CONFIG_IDF_TARGET_ESP32S3
    // ESP32-S3 TRM: PSRAM_CAP 0 = kein PSRAM im Chip, 1 = 8 MB, 2 = 2 MB
    uint8_t cap = 0;
    esp_efuse_read_field_blob(ESP_EFUSE_PSRAM_CAP, &cap, 2);
    switch (cap) {
    case 1:
        return 8;
    case 2:
        return 2;
    default:
        return 0;
    }
#else
    return 0;
#endif
}

void collectSystemInfo(SystemInfo &info)
{
    uint32_t phys = 0;
    if (esp_flash_get_physical_size(esp_flash_default_chip, &phys) == ESP_OK)
        info.flashPhysical = phys;
    info.flashConfigured = ESP.getFlashChipSize();
    info.appUsed = ESP.getSketchSize();
    const esp_partition_t *running = esp_ota_get_running_partition();
    info.appSlot = running ? running->size : 0;
#ifdef FSCom
    info.fsTotal = FSCom.totalBytes();
    info.fsUsed = FSCom.usedBytes();
#endif
    info.psramEfuseMB = readPsramEfuseMB();
    info.psramUsable = ESP.getPsramSize();
    info.heapFree = ESP.getFreeHeap();
    info.gpsV2 = m5HasAg3352 != 0;
}

const char *gpsVersionText(bool v2)
{
    return v2 ? "v2.0 (AG3352)" : "v1.0 (L76K)";
}

void logPartitions()
{
    esp_partition_iterator_t it = esp_partition_find(ESP_PARTITION_TYPE_ANY, ESP_PARTITION_SUBTYPE_ANY, nullptr);
    while (it) {
        const esp_partition_t *p = esp_partition_get(it);
        LOG_INFO("[Kira] Partition %-9s typ %d/%02x  0x%06x  %4u KB", p->label, p->type, p->subtype, (unsigned)p->address,
                 (unsigned)(p->size / 1024));
        it = esp_partition_next(it);
    }
    esp_partition_iterator_release(it);
}

void logSystemReport()
{
    SystemInfo i;
    collectSystemInfo(i);
    LOG_INFO("[Kira] ThinkKira %s (Meshtastic %s)", THINKKIRA_VERSION, optstr(APP_VERSION));
    LOG_INFO("[Kira] GPS-Hardware: %s", gpsVersionText(i.gpsV2));
    LOG_INFO("[Kira] Flash-Chip: %u KB (Firmware gebaut fuer %u KB)", (unsigned)(i.flashPhysical / 1024),
             (unsigned)(i.flashConfigured / 1024));
    LOG_INFO("[Kira] Firmware: %u KB von %u KB App-Partition (frei %u KB)", (unsigned)(i.appUsed / 1024),
             (unsigned)(i.appSlot / 1024), (unsigned)((i.appSlot - i.appUsed) / 1024));
    LOG_INFO("[Kira] LittleFS: %u KB belegt von %u KB", (unsigned)(i.fsUsed / 1024), (unsigned)(i.fsTotal / 1024));
    LOG_INFO("[Kira] PSRAM laut eFuse: %u MB, aktiv genutzt: %u KB", i.psramEfuseMB, (unsigned)(i.psramUsable / 1024));
    LOG_INFO("[Kira] Freier Heap: %u KB", (unsigned)(i.heapFree / 1024));
    logPartitions();
}

#if CUSTOM_FEATURE_BOOT_REPORT
class BootReportThread : public concurrency::OSThread
{
  public:
    BootReportThread() : OSThread("KiraBoot") { setIntervalFromNow(5000); }

  protected:
    int32_t runOnce() override
    {
        logSystemReport();
        return disable();
    }
};
#endif

void startBootReport()
{
#if CUSTOM_FEATURE_BOOT_REPORT
    static BootReportThread *t = nullptr;
    if (!t)
        t = new BootReportThread();
#endif
}

} // namespace ThinkKira

#endif
