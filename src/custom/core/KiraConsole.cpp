// ThinkKira – Textbefehle über USB-Seriell
// SPDX-License-Identifier: GPL-3.0-only
#ifdef THINKKIRA

#include "KiraConsole.h"
#include "GPSStatus.h"
#include "KiraModule.h"
#include "KiraRadio.h"
#include "KiraSettings.h"
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
    LOG_INFO("[Kira]   kira mode    - Funkmodus anzeigen; 'kira mode kira|meshtastic' wechselt (Neustart)");
    LOG_INFO("[Kira]   kira stats   - Funk-Statistik (Zaehler, letzte Pakete, Reichweitentest)");
    LOG_INFO("[Kira]   kira ping    - Reichweitentest an direkte Nachbarn (ThinkKira-Geraete)");
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

static void cmdMode(const char *arg)
{
    if (!*arg) {
        LOG_INFO("[Kira] Funkmodus: %s (Sync-Word 0x%02x)", radioModeName(settings().radioMode), radioSyncWord());
        return;
    }
    RadioMode want;
    if (!strcmp(arg, "kira"))
        want = RADIO_KIRA;
    else if (!strcmp(arg, "meshtastic"))
        want = RADIO_MESHTASTIC;
    else {
        LOG_INFO("[Kira] Erlaubt: kira mode kira | kira mode meshtastic");
        return;
    }
    if (want == settings().radioMode) {
        LOG_INFO("[Kira] Funkmodus ist schon %s", radioModeName(want));
        return;
    }
    settings().radioMode = want;
    saveSettings();
    LOG_INFO("[Kira] Funkmodus -> %s, Neustart in 2 s", radioModeName(want));
    rebootAtMsec = millis() + 2000;
}

static void cmdStats()
{
    RadioCounters c = radioCounters();
    RadioStats &s = radioStats();
    LOG_INFO("[Kira] Funk: %s, RX gut %lu, RX Fehler %lu, TX %lu, weitergeleitet %lu", radioModeName(settings().radioMode),
             (unsigned long)c.rxGood, (unsigned long)c.rxBad, (unsigned long)c.txGood, (unsigned long)c.txRelay);
    uint32_t now = millis();
    for (const HeardPacket &h : s.heard) {
        if (!h.atMs)
            break;
        LOG_INFO("[Kira]   gehoert !%08x: %d dBm, SNR %.1f dB, vor %lu s", h.from, h.rssi, h.snr,
                 (unsigned long)((now - h.atMs) / 1000));
    }
    LOG_INFO("[Kira] Reichweitentest: %lu Pings, %lu Antworten", (unsigned long)s.pingsSent, (unsigned long)s.pongsReceived);
    for (const RangeResult &r : s.range) {
        if (!r.atMs)
            break;
        LOG_INFO("[Kira]   #%lu !%08x: dort %d dBm/%.1f dB, hier %d dBm/%.1f dB", (unsigned long)r.seq, r.from, r.rssiThem,
                 r.snrThem, r.rssiUs, r.snrUs);
    }
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
    else if (!strncmp(s, "mode", 4) && (s[4] == 0 || s[4] == ' '))
        cmdMode(s[4] ? s + 5 : "");
    else if (!strcmp(s, "stats"))
        cmdStats();
    else if (!strcmp(s, "ping")) {
        if (!kiraModule || !kiraModule->sendPing())
            LOG_INFO("[Kira] Ping nicht moeglich");
    } else if (!strcmp(s, "reboot")) {
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
