// ThinkKira – Funk-Statistik (letzte Pakete mit RSSI/SNR, Zähler) und Reichweitentest (Ping/Pong).
// SPDX-License-Identifier: GPL-3.0-only
#pragma once
#include "mesh/MeshModule.h"
#include <stdint.h>

namespace ThinkKira
{

struct HeardPacket {
    uint32_t from = 0;
    int16_t rssi = 0;
    float snr = 0;
    uint32_t atMs = 0;
};

struct RangeResult {
    uint32_t seq = 0;      // Nummer des Pings
    uint32_t from = 0;     // wer geantwortet hat
    int16_t rssiThem = 0;  // wie die Gegenseite uns gehört hat
    float snrThem = 0;
    int16_t rssiUs = 0;    // wie wir die Antwort gehört haben
    float snrUs = 0;
    uint32_t atMs = 0;
};

constexpr int HEARD_MAX = 5;
constexpr int RANGE_MAX = 5;

struct RadioStats {
    HeardPacket heard[HEARD_MAX]; // neuestes zuerst
    RangeResult range[RANGE_MAX]; // neuestes zuerst
    uint32_t pingsSent = 0;
    uint32_t pongsReceived = 0;
    uint32_t lastPingSeq = 0;
};

RadioStats &radioStats();

// Zähler des Funktreibers (0, wenn kein Funkmodul)
struct RadioCounters {
    uint32_t rxGood, rxBad, txGood, txRelay;
};
RadioCounters radioCounters();

// Hört alle empfangenen LoRa-Pakete mit und merkt sich RSSI/SNR. Ändert nichts am Paket.
class KiraStatsModule : public MeshModule
{
  public:
    KiraStatsModule() : MeshModule("kirastats") { isPromiscuous = true; }

  protected:
    bool wantPacket(const meshtastic_MeshPacket *p) override { return true; }
    ProcessMessage handleReceived(const meshtastic_MeshPacket &mp) override;
};

void recordPong(const RangeResult &r);

} // namespace ThinkKira
