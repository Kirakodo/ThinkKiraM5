// SPDX-License-Identifier: GPL-3.0-only
#ifdef THINKKIRA
#include "KiraModule.h"
#include "RTC.h"
#include <algorithm>
#include <deque>
#include "KiraMap.h"
#include "KiraMenu.h"
#include "KiraMessages.h"
#include "KiraNav.h"
#include "KiraRadio.h"
#include "KiraSettings.h"
#include "KiraSystem.h"
#include "PowerStatus.h"
#include "MeshService.h"
#include "NodeDB.h"
#include "configuration.h"
#include "main.h"
#include <cstdlib>
#include <cstring>

#if HAS_WIFI
#include <WiFi.h>
#endif

namespace ThinkKira
{

KiraModule *kiraModule = nullptr;

ProcessMessage KiraModule::handleReceived(const meshtastic_MeshPacket &mp)
{
    char cmd[240] = {0};
    size_t n = mp.decoded.payload.size < sizeof(cmd) - 1 ? mp.decoded.payload.size : sizeof(cmd) - 1;
    memcpy(cmd, mp.decoded.payload.bytes, n);

    if (isFromUs(&mp))
        handleLocal(cmd);
    else
        handleRemote(mp, cmd);
    return ProcessMessage::STOP;
}

void KiraModule::handleLocal(char *cmd)
{
    if (!strcmp(cmd, "wifiscan"))
        wifiScan();
    else if (!strcmp(cmd, "get"))
        sendMode();
    else if (!strcmp(cmd, "info"))
        sendInfo();
    else if (!strcmp(cmd, "stats"))
        sendStats();
    else if (!strcmp(cmd, "ping")) {
        pingFromClient = true;
        if (!sendPing())
            reply("err|Ping konnte nicht gesendet werden");
    } else if (!strcmp(cmd, "ui"))
        sendUi();
    else if (!strncmp(cmd, "map", 3))
        mapCommand(cmd);
    else if (!strcmp(cmd, "wpl"))
        sendWaypoints();
    else if (!strncmp(cmd, "wpa|", 4) || !strncmp(cmd, "wpr|", 4) || !strncmp(cmd, "wpd|", 4) || !strncmp(cmd, "wps|", 4) ||
             !strncmp(cmd, "wpg|", 4))
        waypointCommand(cmd);
    else if (!strcmp(cmd, "trk"))
        sendTrack();
    else if (!strcmp(cmd, "trc")) {
        if (kiraNav)
            kiraNav->clearTrack();
        reply("t|cleared");
    } else if (!strncmp(cmd, "arrive|", 7)) {
        settings().arrive = (uint16_t)std::max(5, std::min(500, atoi(cmd + 7)));
        if (kiraNav)
            kiraNav->arrivalRadius = settings().arrive;
        saveSettings();
        sendWaypoints();
    } else if (!strcmp(cmd, "mg"))
        sendMenu();
    else if (!strcmp(cmd, "mb"))
        menuUpload.clear();
    else if (!strncmp(cmd, "ml|", 3)) {
        if (menuUpload.size() < MENU_MAX_TEXT + 256)
            menuUpload += cmd + 3;
    } else if (!strcmp(cmd, "me") || !strcmp(cmd, "mr")) {
        std::string err;
        bool ok = cmd[1] == 'r' ? resetMenu() : setMenuText(menuUpload, err);
        menuUpload.clear();
        if (ok) {
            settings().uiRev++;
            reply("M|ok");
        } else
            reply(("err|Menü: " + err).c_str());
    }
    else if (!strncmp(cmd, "ui|", 3)) {
        // ui|reihenfolge|seitenbits|startbausteine|antworten|tasten|statuszeile (leere Felder bleiben unverändert)
        char *f[6] = {nullptr};
        char *p = cmd + 3;
        for (int i = 0; i < 6 && p; i++) {
            f[i] = p;
            p = strchr(p, '|');
            if (p)
                *p++ = 0;
        }
        Settings &s = settings();
        bool ok = true;
        if (f[0] && *f[0])
            ok &= setOrder(f[0]);
        if (f[1] && *f[1])
            s.pages = (uint8_t)(atoi(f[1]) | 0x21);
        if (f[2])
            ok &= setStart(f[2]);
        if (f[3] && *f[3])
            ok &= setReplies(f[3]);
        if (f[4] && *f[4])
            ok &= setKeys(f[4]);
        if (f[5] && *f[5])
            ok &= setBar(f[5]);
        s.uiRev++;
        saveSettings();
        if (!ok)
            reply("err|Designer: ungültiger Wert, Rest übernommen");
        sendUi();
    } else if (!strncmp(cmd, "mode|", 5)) {
        RadioMode want = !strcmp(cmd + 5, "kira") ? RADIO_KIRA : RADIO_MESHTASTIC;
        if (want != settings().radioMode) {
            settings().radioMode = want;
            saveSettings();
            LOG_INFO("[Kira] Funkmodus -> %s, Neustart", radioModeName(want));
            rebootAtMsec = millis() + 2000;
        }
        sendMode();
    } else
        reply("err|unbekannter Befehl");
}

// p|index|name|lat|lon|zeit … p|end|anzahl|ankunftsradius|ziel
void KiraModule::sendWaypoints()
{
    if (!kiraNav)
        return reply("err|Navigation nicht verfügbar");
    const auto &w = kiraNav->waypoints();
    char b[96];
    for (size_t i = 0; i < w.size(); i++) {
        snprintf(b, sizeof(b), "p|%u|%s|%ld|%ld|%lu", (unsigned)i, w[i].name, (long)w[i].lat, (long)w[i].lon, (unsigned long)w[i].time);
        reply(b);
    }
    snprintf(b, sizeof(b), "p|end|%u|%u|%s", (unsigned)w.size(), (unsigned)settings().arrive,
             kiraNav->target().kind == TARGET_NONE ? "" : kiraNav->target().name);
    reply(b);
}

// wpa|name|lat|lon (anlegen) · wpr|i|name (umbenennen) · wpd|i (löschen) · wps|i (ins Mesh senden) · wpg|i (als Ziel)
void KiraModule::waypointCommand(char *cmd)
{
    if (!kiraNav)
        return reply("err|Navigation nicht verfügbar");
    char *f[3] = {nullptr};
    char *p = cmd + 4;
    for (int i = 0; i < 3 && p; i++) {
        f[i] = p;
        p = strchr(p, '|');
        if (p)
            *p++ = 0;
    }
    bool ok = false;
    size_t idx = f[0] ? strtoul(f[0], nullptr, 10) : 0;
    switch (cmd[2]) {
    case 'a':
        ok = f[2] && kiraNav->addWaypoint(f[0], strtol(f[1], nullptr, 10), strtol(f[2], nullptr, 10), getValidTime(RTCQualityDevice));
        break;
    case 'r':
        ok = f[1] && kiraNav->renameWaypoint(idx, f[1]);
        break;
    case 'd':
        ok = kiraNav->removeWaypoint(idx);
        break;
    case 's':
        ok = kiraNav->sendWaypointToMesh(idx);
        break;
    case 'g':
        if (idx < kiraNav->waypoints().size()) {
            const Waypoint &w = kiraNav->waypoints()[idx];
            Target t;
            t.kind = TARGET_POINT;
            strncpy(t.name, w.name, sizeof(t.name) - 1);
            t.lat = w.lat;
            t.lon = w.lon;
            kiraNav->setTarget(t);
            ok = true;
        }
        break;
    }
    if (!ok)
        reply("err|Wegpunkt: Aktion nicht möglich (voll, ungültig oder nicht gefunden)");
    sendWaypoints();
}

// Offline-Karte: mapb|bytes (Beginn) · mapd|offset|base64 (Daten) · mapq (Stand) · mape (fertig) · mapx (löschen) · mapi (Info)
// Antworten: k|ready · k|a|bytes (Stand nach jedem mapd und auf mapq) · k|ok|bytes · k|info|bytes|stufe|latMin|lonMin|latMax|lonMax · k|none
void KiraModule::mapCommand(char *cmd)
{
    KiraMapFile &m = mapFile();
    std::string err;
    char b[120];
    if (!strncmp(cmd, "mapd|", 5)) {
        // mapd|offset|base64 – jedes Stück wird sofort mit dem Stand quittiert (k|a|bytes); Stücke mit falschem
        // Offset (Wiederholung oder eins davor verloren) werden verworfen, der Konfigurator macht beim Stand weiter
        char *data = strchr(cmd + 5, '|');
        uint32_t off = strtoul(cmd + 5, nullptr, 10);
        if (data && off == m.received() && !m.appendBase64(data + 1))
            return replyNow("err|Karte: Daten konnten nicht geschrieben werden");
        snprintf(b, sizeof(b), "k|a|%lu", (unsigned long)m.received());
        replyNow(b);
    } else if (!strcmp(cmd, "mapq")) {
        snprintf(b, sizeof(b), "k|a|%lu", (unsigned long)m.received());
        replyNow(b);
    } else if (!strncmp(cmd, "mapb|", 5)) {
        if (m.beginUpload(strtoul(cmd + 5, nullptr, 10), err))
            reply("k|ready");
        else
            reply(("err|Karte: " + err).c_str());
    } else if (!strcmp(cmd, "mape")) {
        if (m.finishUpload(err)) {
            snprintf(b, sizeof(b), "k|ok|%lu", (unsigned long)m.fileSize());
            reply(b);
        } else
            reply(("err|Karte: " + err).c_str());
    } else if (!strcmp(cmd, "mapx")) {
        m.remove();
        reply("k|none");
    } else if (!strcmp(cmd, "mapi")) {
        if (!m.available())
            return reply("k|none");
        const MapHeader &h = m.header();
        snprintf(b, sizeof(b), "k|info|%lu|%u|%ld|%ld|%ld|%ld", (unsigned long)m.fileSize(), (unsigned)h.level, (long)h.latMin,
                 (long)h.lonMin, (long)h.latMax, (long)h.lonMax);
        reply(b);
    }
}

// t|<stück> … t|end|punkte — Inhalt: lat_i,lon_i,zeit je Zeile
void KiraModule::sendTrack()
{
    if (!kiraNav)
        return reply("err|Navigation nicht verfügbar");
    for (size_t off = 0, n = 0; n < 2000; off += 200, n++) {
        std::string c = kiraNav->trackChunk(off, 200);
        if (c.empty())
            break;
        reply(("t|" + c).c_str());
    }
    reply(("t|end|" + std::to_string(kiraNav->trackPoints())).c_str());
}

void KiraModule::sendMenu()
{
    // in Stücken, eine Antwort hat höchstens ~230 Byte
    std::string t = menuText();
    for (size_t i = 0; i < t.size(); i += 200)
        reply(("M|" + t.substr(i, 200)).c_str());
    reply("M|end");
}

void KiraModule::sendUi()
{
    const Settings &s = settings();
    char out[240];
    snprintf(out, sizeof(out), "u|%s|%u|%s|%s|%s|%s", s.order, (unsigned)s.pages, s.start, s.replies, s.keys, s.bar);
    reply(out);
}

void KiraModule::handleRemote(const meshtastic_MeshPacket &mp, char *cmd)
{
#if CUSTOM_FEATURE_RADIO_STATS
    if (mp.transport_mechanism != meshtastic_MeshPacket_TransportMechanism_TRANSPORT_LORA)
        return;
    char out[64];
    if (!strncmp(cmd, "ping|", 5)) {
        // höchstens eine Antwort pro 2 s, damit niemand das Gerät zum Dauersenden bringt
        if (lastPongMs && millis() - lastPongMs < 2000)
            return;
        lastPongMs = millis();
        snprintf(out, sizeof(out), "pong|%lu|%d|%.1f", strtoul(cmd + 5, nullptr, 10), (int)mp.rx_rssi, mp.rx_snr);
        sendRadio(mp.from, out);
    } else if (!strncmp(cmd, "pong|", 5) && mp.to == nodeDB->getNodeNum()) {
        RangeResult r;
        char *p = cmd + 5;
        r.seq = strtoul(p, &p, 10);
        if (*p == '|')
            r.rssiThem = (int16_t)strtol(p + 1, &p, 10);
        if (*p == '|')
            r.snrThem = strtof(p + 1, &p);
        r.from = mp.from;
        r.rssiUs = (int16_t)mp.rx_rssi;
        r.snrUs = mp.rx_snr;
        r.atMs = millis();
        recordPong(r);
        LOG_INFO("[Kira] Pong %lu von !%08x: dort %d dBm / %.1f dB, hier %d dBm / %.1f dB", (unsigned long)r.seq, r.from,
                 r.rssiThem, r.snrThem, r.rssiUs, r.snrUs);
        if (pingFromClient) {
            snprintf(out, sizeof(out), "r|%lu|%08x|%d|%.1f|%d|%.1f|0", (unsigned long)r.seq, r.from, r.rssiThem, r.snrThem,
                     r.rssiUs, r.snrUs);
            reply(out);
        }
    }
#endif
}

bool KiraModule::sendPing()
{
#if CUSTOM_FEATURE_RADIO_STATS
    RadioStats &s = radioStats();
    char out[24];
    snprintf(out, sizeof(out), "ping|%lu", (unsigned long)++s.lastPingSeq);
    meshtastic_MeshPacket *p = allocDataPacket();
    if (!p)
        return false;
    p->to = NODENUM_BROADCAST;
    p->hop_limit = 0; // nur direkte Nachbarn = echte Reichweite
    p->want_ack = false;
    size_t len = strlen(out);
    memcpy(p->decoded.payload.bytes, out, len);
    p->decoded.payload.size = len;
    service->sendToMesh(p, RX_SRC_LOCAL, false);
    s.pingsSent++;
    LOG_INFO("[Kira] Ping %lu gesendet", (unsigned long)s.lastPingSeq);
    return true;
#else
    return false;
#endif
}

void KiraModule::sendRadio(uint32_t to, const char *text)
{
    meshtastic_MeshPacket *p = allocDataPacket();
    if (!p)
        return;
    p->to = to;
    p->hop_limit = 0;
    p->want_ack = false;
    size_t len = strlen(text);
    memcpy(p->decoded.payload.bytes, text, len);
    p->decoded.payload.size = len;
    service->sendToMesh(p, RX_SRC_LOCAL, false);
}

// Antworten ans Handy/den Konfigurator laufen über eine Warteschlange: lange Listen (Menü, Wegpunkte, Track)
// würden sonst die kleine Meshtastic-Warteschlange zum Handy überlaufen lassen.
class KiraOutbox : public concurrency::OSThread
{
  public:
    KiraOutbox() : OSThread("KiraOutbox") {}
    std::deque<std::string> q;
    void push(const char *t)
    {
        if (q.size() < 400)
            q.emplace_back(t);
        setIntervalFromNow(0);
    }

  protected:
    int32_t runOnce() override
    {
        // je Durchlauf 2 Antworten, dann 50 ms Pause: so kommt die Verbindung zum Handy hinterher
        for (int i = 0; i < 2 && !q.empty() && kiraModule; i++) {
            kiraModule->replyNow(q.front().c_str());
            q.pop_front();
        }
        return q.empty() ? INT32_MAX : 50;
    }
};
static KiraOutbox *outbox = nullptr;

void KiraModule::reply(const char *text)
{
    if (!outbox)
        outbox = new KiraOutbox();
    outbox->push(text);
}

void KiraModule::replyNow(const char *text)
{
    meshtastic_MeshPacket *p = allocDataPacket();
    if (!p)
        return;
    p->from = nodeDB->getNodeNum();
    p->to = nodeDB->getNodeNum();
    size_t len = strlen(text);
    if (len > sizeof(p->decoded.payload.bytes))
        len = sizeof(p->decoded.payload.bytes);
    memcpy(p->decoded.payload.bytes, text, len);
    p->decoded.payload.size = len;
    service->sendToPhone(p);
}

void KiraModule::sendMode()
{
    char out[48];
    snprintf(out, sizeof(out), "m|%s|%s", settings().radioMode == RADIO_KIRA ? "kira" : "meshtastic", THINKKIRA_VERSION);
    reply(out);
}

void KiraModule::sendInfo()
{
    SystemInfo i;
    collectSystemInfo(i);
    char out[200];
    snprintf(out, sizeof(out), "i|%s|%s|%lu|%lu|%lu|%lu|%lu|%u|%lu|%lu|%d|%d|%d", THINKKIRA_VERSION, i.gpsV2 ? "v2" : "v1",
             (unsigned long)(i.flashPhysical / 1024), (unsigned long)(i.flashConfigured / 1024), (unsigned long)(i.appUsed / 1024),
             (unsigned long)(i.appSlot / 1024), (unsigned long)(i.fsUsed / 1024), (unsigned)i.psramEfuseMB,
             (unsigned long)(i.psramUsable / 1024), (unsigned long)(i.heapFree / 1024),
             powerStatus ? (int)powerStatus->getBatteryChargePercent() : -1, powerStatus ? powerStatus->getBatteryVoltageMv() : -1,
             powerStatus && powerStatus->getHasUSB() ? 1 : 0);
    reply(out);
    snprintf(out, sizeof(out), "f|%lu", (unsigned long)(i.fsTotal / 1024));
    reply(out);
}

void KiraModule::sendStats()
{
    char out[80];
    RadioCounters c = radioCounters();
    RadioStats &s = radioStats();
    snprintf(out, sizeof(out), "s|%lu|%lu|%lu|%lu|%lu|%lu", (unsigned long)c.rxGood, (unsigned long)c.rxBad,
             (unsigned long)c.txGood, (unsigned long)c.txRelay, (unsigned long)s.pingsSent, (unsigned long)s.pongsReceived);
    reply(out);
    uint32_t now = millis();
    for (const HeardPacket &h : s.heard) {
        if (!h.atMs)
            break;
        snprintf(out, sizeof(out), "h|%08x|%d|%.1f|%lu", h.from, h.rssi, h.snr, (unsigned long)((now - h.atMs) / 1000));
        reply(out);
    }
    for (const RangeResult &r : s.range) {
        if (!r.atMs)
            break;
        snprintf(out, sizeof(out), "r|%lu|%08x|%d|%.1f|%d|%.1f|%lu", (unsigned long)r.seq, r.from, r.rssiThem, r.snrThem,
                 r.rssiUs, r.snrUs, (unsigned long)((now - r.atMs) / 1000));
        reply(out);
    }
    reply("s|end");
}

void KiraModule::wifiScan()
{
#if HAS_WIFI && CUSTOM_FEATURE_WIFI_SCAN
    bool wasOff = WiFi.getMode() == WIFI_OFF;
    if (wasOff)
        WiFi.mode(WIFI_STA);
    // Aktive Suche, 120 ms je Kanal (ca. 1,6 s), versteckte Netze nicht anzeigen.
    int count = WiFi.scanNetworks(false, false, false, 120);
    char line[64];
    int sent = 0;
    for (int i = 0; i < count && sent < 15; i++) {
        String ssid = WiFi.SSID(i);
        if (ssid.length() == 0)
            continue;
        snprintf(line, sizeof(line), "w|%d|%d|%s", (int)WiFi.RSSI(i), WiFi.encryptionType(i) == WIFI_AUTH_OPEN ? 1 : 0,
                 ssid.c_str());
        reply(line);
        sent++;
    }
    WiFi.scanDelete();
    if (wasOff && !config.network.wifi_enabled)
        WiFi.mode(WIFI_OFF);
    snprintf(line, sizeof(line), "w|end|%d", sent);
    reply(line);
    LOG_INFO("[Kira] WLAN-Suche: %d Netze", sent);
#else
    reply("w|end|-1");
#endif
}

void setupModule()
{
    settings(); // früh laden (Funkmodus)
    kiraModule = new KiraModule();
#if CUSTOM_FEATURE_RADIO_STATS
    new KiraStatsModule();
#endif
#if defined(MESHTASTIC_INCLUDE_INKHUD)
    kiraMessages = new KiraMessageModule();
#endif
    new KiraNav();
    new KiraWaypointRx();
}

} // namespace ThinkKira
#endif
