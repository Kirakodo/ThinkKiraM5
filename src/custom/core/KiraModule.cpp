// SPDX-License-Identifier: GPL-3.0-only
#ifdef THINKKIRA
#include "KiraModule.h"
#include "MeshService.h"
#include "NodeDB.h"
#include "configuration.h"
#include <cstring>

#if HAS_WIFI
#include <WiFi.h>
#endif

namespace ThinkKira
{

ProcessMessage KiraModule::handleReceived(const meshtastic_MeshPacket &mp)
{
    // Nur Befehle vom eigenen Client annehmen, nie aus dem Mesh.
    if (!isFromUs(&mp))
        return ProcessMessage::STOP;

    char cmd[32] = {0};
    size_t n = mp.decoded.payload.size < sizeof(cmd) - 1 ? mp.decoded.payload.size : sizeof(cmd) - 1;
    memcpy(cmd, mp.decoded.payload.bytes, n);

    if (strcmp(cmd, "wifiscan") == 0)
        wifiScan();
    else
        reply("err|unbekannter Befehl");
    return ProcessMessage::STOP;
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
    new KiraModule();
}

} // namespace ThinkKira

#endif
