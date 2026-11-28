// ThinkKira – Befehlskanal auf eigenem Port 287 (Text, Felder mit "|" getrennt).
//
// Vom angeschlossenen Client (Konfigurator über USB/Bluetooth):
//   "wifiscan"          -> je Netz "w|<rssi>|<offen 0/1>|<ssid>", danach "w|end|<anzahl>"
//   "get"               -> "m|<meshtastic|kira>|<version>"
//   "mode|<meshtastic|kira>" -> "m|…", danach Neustart (nur bei Änderung)
//   "stats"             -> "s|rxGut|rxFehler|tx|weitergeleitet|pings|pongs",
//                          je gehörtem Paket "h|<von hex>|<rssi>|<snr>|<vor s>",
//                          je Reichweitentest "r|<nr>|<von hex>|<rssi dort>|<snr dort>|<rssi hier>|<snr hier>|<vor s>", "s|end"
//   "ping"              -> sendet Ping an direkte Nachbarn, Antwort kommt als "r|…"
// Über Funk (nur zwischen ThinkKira-Geräten, direkte Nachbarn, hop_limit 0):
//   "ping|<nr>"  -> Antwort "pong|<nr>|<rssi>|<snr>" an den Absender
// SPDX-License-Identifier: GPL-3.0-only
#pragma once
#include "custom/features.h"
#include "mesh/SinglePortModule.h"

namespace ThinkKira
{
constexpr meshtastic_PortNum KIRA_PORTNUM = (meshtastic_PortNum)287;

class KiraModule : public SinglePortModule
{
  public:
    KiraModule() : SinglePortModule("thinkkira", KIRA_PORTNUM) {}
    bool sendPing(); // auch von Konsole/Bildschirm nutzbar

  protected:
    ProcessMessage handleReceived(const meshtastic_MeshPacket &mp) override;

  private:
    void handleLocal(char *cmd);
    void handleRemote(const meshtastic_MeshPacket &mp, char *cmd);
    void reply(const char *text);
    void sendRadio(uint32_t to, const char *text);
    void wifiScan();
    void sendStats();
    void sendMode();
    uint32_t lastPongMs = 0;
    bool pingFromClient = false;
};

extern KiraModule *kiraModule;
void setupModule();
} // namespace ThinkKira
