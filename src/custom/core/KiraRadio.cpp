// SPDX-License-Identifier: GPL-3.0-only
#ifdef THINKKIRA
#include "KiraRadio.h"
#include "NodeDB.h"
#include "RadioLibInterface.h"
#include "configuration.h"
#include <string.h>

namespace ThinkKira
{

static RadioStats stats;

RadioStats &radioStats()
{
    return stats;
}

RadioCounters radioCounters()
{
    RadioCounters c{0, 0, 0, 0};
    if (RadioLibInterface::instance) {
        c.rxGood = RadioLibInterface::instance->rxGood;
        c.rxBad = RadioLibInterface::instance->rxBad;
        c.txGood = RadioLibInterface::instance->txGood;
        c.txRelay = RadioLibInterface::instance->txRelay;
    }
    return c;
}

ProcessMessage KiraStatsModule::handleReceived(const meshtastic_MeshPacket &mp)
{
    if (isFromUs(&mp) || mp.transport_mechanism != meshtastic_MeshPacket_TransportMechanism_TRANSPORT_LORA || !mp.has_rx_rssi)
        return ProcessMessage::CONTINUE;
    memmove(&stats.heard[1], &stats.heard[0], sizeof(HeardPacket) * (HEARD_MAX - 1));
    stats.heard[0].from = mp.from;
    stats.heard[0].rssi = (int16_t)mp.rx_rssi;
    stats.heard[0].snr = mp.rx_snr;
    stats.heard[0].atMs = millis();
    return ProcessMessage::CONTINUE;
}

void recordPong(const RangeResult &r)
{
    memmove(&stats.range[1], &stats.range[0], sizeof(RangeResult) * (RANGE_MAX - 1));
    stats.range[0] = r;
    stats.pongsReceived++;
}

} // namespace ThinkKira
#endif
