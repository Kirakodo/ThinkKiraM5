// ThinkKira – Statusseite
// SPDX-License-Identifier: GPL-3.0-only
#if defined(THINKKIRA) && defined(MESHTASTIC_INCLUDE_INKHUD)

#include "KiraStatusApplet.h"
#include "GPSStatus.h"
#include "PowerStatus.h"
#include "custom/core/KiraSystem.h"
#include "custom/features.h"
#include "mesh/NodeDB.h"

namespace ThinkKira
{

StatusApplet::StatusApplet() : OSThread("KiraStatus")
{
    disable();
}

void StatusApplet::onForeground()
{
    enabled = true;
    setIntervalFromNow(REFRESH_MS);
}

void StatusApplet::onBackground()
{
    disable();
}

int32_t StatusApplet::runOnce()
{
    uint8_t pct = powerStatus ? powerStatus->getBatteryChargePercent() : 0;
    bool lock = gpsStatus && gpsStatus->getHasLock();
    uint32_t nodes = nodeDB ? nodeDB->getNumOnlineMeshNodes() : 0;
    if (isForeground() && (pct != renderedPercent || lock != renderedLock || nodes != renderedNodes))
        requestUpdate(); // nur neu zeichnen, wenn sich etwas geändert hat
    return REFRESH_MS;
}

void StatusApplet::onRender(bool)
{
    SystemInfo i;
    collectSystemInfo(i);

    renderedPercent = powerStatus ? powerStatus->getBatteryChargePercent() : 0;
    renderedLock = gpsStatus && gpsStatus->getHasLock();
    renderedNodes = nodeDB ? nodeDB->getNumOnlineMeshNodes() : 0;

    drawHeader("ThinkKira " THINKKIRA_VERSION);

    setFont(fontSmall);
    const int16_t x = 4;
    const int16_t lh = fontSmall.lineHeight() + 3;
    int16_t y = getHeaderHeight() + 4;
    char buf[48];

    snprintf(buf, sizeof(buf), "GPS: %s", gpsVersionText(i.gpsV2));
    printAt(x, y, buf);
    y += lh;

    if (gpsStatus) {
        snprintf(buf, sizeof(buf), "Fix: %s, Sat: %u", renderedLock ? "ja" : "nein", (unsigned)gpsStatus->getNumSatellites());
        printAt(x, y, buf);
        y += lh;
    }

    if (powerStatus) {
        snprintf(buf, sizeof(buf), "Akku: %u%% (%d.%02d V)%s", renderedPercent, powerStatus->getBatteryVoltageMv() / 1000,
                 (powerStatus->getBatteryVoltageMv() % 1000) / 10, powerStatus->getHasUSB() ? " USB" : "");
        printAt(x, y, buf);
        y += lh;
    }

    snprintf(buf, sizeof(buf), "Knoten online: %u", (unsigned)renderedNodes);
    printAt(x, y, buf);
    y += lh;

    snprintf(buf, sizeof(buf), "Flash: %u MB, App frei %u KB", (unsigned)(i.flashPhysical >> 20),
             (unsigned)((i.appSlot - i.appUsed) / 1024));
    printAt(x, y, buf);
    y += lh;

    snprintf(buf, sizeof(buf), "Speicher: %u/%u KB", (unsigned)(i.fsUsed / 1024), (unsigned)(i.fsTotal / 1024));
    printAt(x, y, buf);
    y += lh;

    if (i.psramUsable)
        snprintf(buf, sizeof(buf), "PSRAM: %u MB aktiv", (unsigned)(i.psramUsable >> 20));
    else
        snprintf(buf, sizeof(buf), "PSRAM: %u MB (eFuse)", i.psramEfuseMB);
    printAt(x, y, buf);
}

} // namespace ThinkKira

#endif
