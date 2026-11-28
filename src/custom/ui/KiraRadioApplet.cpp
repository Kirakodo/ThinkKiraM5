// ThinkKira – Funkseite
// SPDX-License-Identifier: GPL-3.0-only
#if defined(THINKKIRA) && defined(MESHTASTIC_INCLUDE_INKHUD)

#include "KiraRadioApplet.h"
#include "custom/core/KiraRadio.h"
#include "custom/core/KiraSettings.h"
#include "custom/features.h"
#include "mesh/NodeDB.h"

namespace ThinkKira
{

RadioApplet::RadioApplet() : OSThread("KiraRadio")
{
    disable();
}

void RadioApplet::onForeground()
{
    enabled = true;
    setIntervalFromNow(REFRESH_MS);
}

void RadioApplet::onBackground()
{
    disable();
}

int32_t RadioApplet::runOnce()
{
    RadioCounters c = radioCounters();
    if (isForeground() && (c.rxGood + c.rxBad != renderedRx || radioStats().pongsReceived != renderedPongs))
        requestUpdate();
    return REFRESH_MS;
}

void RadioApplet::onRender(bool)
{
    RadioCounters c = radioCounters();
    RadioStats &s = radioStats();
    renderedRx = c.rxGood + c.rxBad;
    renderedPongs = s.pongsReceived;

    drawHeader(settings().radioMode == RADIO_KIRA ? "Funk: Kira-Funk" : "Funk: Meshtastic");
    setFont(fontSmall);
    const int16_t x = 4;
    const int16_t lh = fontSmall.lineHeight() + 3;
    int16_t y = getHeaderHeight() + 4;
    char buf[48];
    uint32_t now = millis();

    snprintf(buf, sizeof(buf), "RX %lu  Fehler %lu", (unsigned long)c.rxGood, (unsigned long)c.rxBad);
    printAt(x, y, buf);
    y += lh;
    snprintf(buf, sizeof(buf), "TX %lu  weiter %lu", (unsigned long)c.txGood, (unsigned long)c.txRelay);
    printAt(x, y, buf);
    y += lh + 2;

    printAt(x, y, "Zuletzt gehoert:");
    y += lh;
    int shown = 0;
    for (const HeardPacket &h : s.heard) {
        if (!h.atMs || shown == 3)
            break;
        meshtastic_NodeInfoLite *node = nodeDB->getMeshNode(h.from);
        std::string name = node ? parseShortName(node) : hexifyNodeNum(h.from);
        snprintf(buf, sizeof(buf), "%s %ddBm %.0fdB %lus", name.c_str(), h.rssi, h.snr, (unsigned long)((now - h.atMs) / 1000));
        printAt(x, y, buf);
        y += lh;
        shown++;
    }
    if (!shown) {
        printAt(x, y, "-");
        y += lh;
    }
    y += 2;

    snprintf(buf, sizeof(buf), "Reichweite: %lu/%lu", (unsigned long)s.pongsReceived, (unsigned long)s.pingsSent);
    printAt(x, y, buf);
    y += lh;
    if (s.range[0].atMs) {
        const RangeResult &r = s.range[0];
        meshtastic_NodeInfoLite *node = nodeDB->getMeshNode(r.from);
        std::string name = node ? parseShortName(node) : hexifyNodeNum(r.from);
        snprintf(buf, sizeof(buf), "#%lu %s %d/%d dBm", (unsigned long)r.seq, name.c_str(), r.rssiThem, r.rssiUs);
        printAt(x, y, buf);
    }
}

} // namespace ThinkKira

#endif
