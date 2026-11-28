// SPDX-License-Identifier: GPL-3.0-only
#ifdef THINKKIRA
#include "KiraModule.h"
#include "KiraRadio.h"
#include "KiraSettings.h"
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
    char cmd[48] = {0};
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
    else if (!strcmp(cmd, "stats"))
        sendStats();
    else if (!strcmp(cmd, "ping")) {
        pingFromClient = true;
        if (!sendPing())
            reply("err|Ping konnte nicht gesendet werden");
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

void KiraModule::reply(const char *text)
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
}

} // namespace ThinkKira
#endif
