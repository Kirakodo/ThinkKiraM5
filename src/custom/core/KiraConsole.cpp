// ThinkKira – Textbefehle über USB-Seriell
// SPDX-License-Identifier: GPL-3.0-only
#ifdef THINKKIRA

#include "KiraConsole.h"
#include "GPSStatus.h"
#include "KiraSystem.h"
#include "PowerStatus.h"
#include "configuration.h"
#include "custom/features.h"
#include "main.h"
#include "mesh/NodeDB.h"

#include <string.h>

namespace ThinkKira
{

#if CUSTOM_FEATURE_SERIAL_CONSOLE

static char line[64];
static uint8_t lineLen = 0;

static void cmdHelp()
{
    LOG_INFO("[Kira] Befehle:");
    LOG_INFO("[Kira]   kira info    - Version, GPS-Hardware, Speicher, PSRAM");
    LOG_INFO("[Kira]   kira flash   - Partitionen anzeigen");
    LOG_INFO("[Kira]   kira gps     - GPS-Status");
    LOG_INFO("[Kira]   kira power   - Akku und USB");
    LOG_INFO("[Kira]   kira nodes   - Anzahl Knoten");
    LOG_INFO("[Kira]   kira reboot  - Neustart");
}

static void cmdGps()
{
    SystemInfo i;
    collectSystemInfo(i);
    LOG_INFO("[Kira] GPS-Hardware: %s", gpsVersionText(i.gpsV2));
    if (gpsStatus) {
        LOG_INFO("[Kira] GPS verbunden: %s, Fix: %s, Satelliten: %u", gpsStatus->getIsConnected() ? "ja" : "nein",
                 gpsStatus->getHasLock() ? "ja" : "nein", (unsigned)gpsStatus->getNumSatellites());
        if (gpsStatus->getHasLock())
            LOG_INFO("[Kira] Position: %.6f, %.6f", gpsStatus->getLatitude() * 1e-7, gpsStatus->getLongitude() * 1e-7);
    }
}

static void cmdPower()
{
    if (!powerStatus) {
        LOG_INFO("[Kira] Kein Akku-Status");
        return;
    }
    LOG_INFO("[Kira] Akku: %u %%, %d mV, USB: %s, laedt: %s", powerStatus->getBatteryChargePercent(),
             powerStatus->getBatteryVoltageMv(), powerStatus->getHasUSB() ? "ja" : "nein",
             powerStatus->getIsCharging() ? "ja" : "nein");
}

static void handleLine(char *s)
{
    // führende Leerzeichen weg
    while (*s == ' ' || *s == '\t')
        s++;
    if (strncmp(s, "kira", 4) != 0)
        return; // kein Befehl für uns
    s += 4;
    while (*s == ' ')
        s++;

    if (*s == 0 || !strcmp(s, "help") || !strcmp(s, "hilfe"))
        cmdHelp();
    else if (!strcmp(s, "info"))
        logSystemReport();
    else if (!strcmp(s, "flash"))
        logPartitions();
    else if (!strcmp(s, "gps"))
        cmdGps();
    else if (!strcmp(s, "power"))
        cmdPower();
    else if (!strcmp(s, "nodes"))
        LOG_INFO("[Kira] Knoten: %u bekannt, %u online", (unsigned)nodeDB->getNumMeshNodes(),
                 (unsigned)nodeDB->getNumOnlineMeshNodes());
    else if (!strcmp(s, "reboot")) {
        LOG_INFO("[Kira] Neustart in 1 s");
        rebootAtMsec = millis() + 1000;
    } else
        LOG_INFO("[Kira] Unbekannter Befehl '%s' - 'kira help' zeigt alle", s);
}

void consoleFeed(uint8_t c)
{
    if (c == '\r' || c == '\n') {
        if (lineLen) {
            line[lineLen] = 0;
            handleLine(line);
            lineLen = 0;
        }
        return;
    }
    if (c < 0x20 || c > 0x7e) { // nur druckbare ASCII-Zeichen, sonst Zeile verwerfen
        lineLen = 0;
        return;
    }
    if (lineLen < sizeof(line) - 1)
        line[lineLen++] = (char)c;
}

#else
void consoleFeed(uint8_t) {}
#endif

} // namespace ThinkKira

#endif
