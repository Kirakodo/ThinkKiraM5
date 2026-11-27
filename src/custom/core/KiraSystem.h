// ThinkKira – Hardware- und Speicher-Infos (Boot-Bericht, Statusseite, Konsole)
// SPDX-License-Identifier: GPL-3.0-only
#pragma once

#ifdef THINKKIRA

#include <Arduino.h>
#include <stdint.h>

namespace ThinkKira
{

struct SystemInfo {
    uint32_t flashPhysical = 0;  // tatsächliche Größe des Flash-Chips (Bytes)
    uint32_t flashConfigured = 0; // Größe, mit der die Firmware gebaut wurde
    uint32_t appUsed = 0;         // Größe der laufenden Firmware
    uint32_t appSlot = 0;         // Größe der App-Partition
    uint32_t fsTotal = 0;         // LittleFS gesamt
    uint32_t fsUsed = 0;          // LittleFS belegt
    uint8_t psramEfuseMB = 0;     // eingebautes PSRAM laut eFuse (0 = keins)
    uint32_t psramUsable = 0;     // vom Framework nutzbares PSRAM (0, solange nicht aktiviert)
    uint32_t heapFree = 0;
    bool gpsV2 = false; // true = v2.0 (AG3352), false = v1.0 (L76K)
};

void collectSystemInfo(SystemInfo &info);
const char *gpsVersionText(bool v2); // "v2.0 (AG3352)" / "v1.0 (L76K)"

// Gibt den kompletten Bericht zeilenweise über LOG_INFO aus
void logSystemReport();

// Listet alle Flash-Partitionen über LOG_INFO
void logPartitions();

// Startet den einmaligen Boot-Bericht (ein paar Sekunden nach dem Start)
void startBootReport();

} // namespace ThinkKira

#endif
