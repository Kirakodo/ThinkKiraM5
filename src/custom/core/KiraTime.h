// ThinkKira – Zeitzone, Sommer/Winterzeit und Uhrzeit von Hand stellen.
// Gespeichert wird nur config.device.tzdef (POSIX-Zeitzone), damit auch die Meshtastic-Apps sie sehen.
// SPDX-License-Identifier: GPL-3.0-only
#pragma once
#ifdef THINKKIRA
#include <stdint.h>
#include <string>

namespace ThinkKira
{
enum DstMode : uint8_t { DST_AUTO = 0, DST_WINTER = 1, DST_SUMMER = 2 }; // automatisch (EU-Regel), immer Winter-, immer Sommerzeit

struct TimeZone {
    int16_t offsetMin = 60; // Normalzeit, Minuten östlich von UTC
    DstMode dst = DST_AUTO;
    bool custom = false; // tzdef passt zu keiner eigenen Einstellung (z. B. aus der App gesetzt)
};

extern const char *const DEFAULT_TZ; // Deutschland
TimeZone timeZone();
void setTimeZone(int16_t offsetMin, DstMode dst); // speichert und gilt sofort
std::string tzLabel(int16_t offsetMin);           // "UTC+1"
const char *dstLabel(DstMode d);
bool adjustClock(int32_t deltaSec); // Uhr von Hand verstellen (ungestellt: ab Bautag)
bool setClock(uint32_t epoch);      // z. B. vom Konfigurator
} // namespace ThinkKira
#endif
