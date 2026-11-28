// ThinkKira – Befehlskanal zwischen Konfigurator/App und Gerät auf eigenem Port 287.
// Anfragen kommen nur vom angeschlossenen Client (USB/Bluetooth), Antworten gehen nur an ihn.
// Protokoll (Text):
//   Anfrage "wifiscan"  -> je Netz "w|<rssi>|<offen 0/1>|<ssid>", danach "w|end|<anzahl>"
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

  protected:
    ProcessMessage handleReceived(const meshtastic_MeshPacket &mp) override;

  private:
    void reply(const char *text);
    void wifiScan();
};

void setupModule();
} // namespace ThinkKira
