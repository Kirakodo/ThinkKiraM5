// SPDX-License-Identifier: GPL-3.0-only
#ifdef THINKKIRA
#include "KiraTime.h"
#include "NodeDB.h"
#include "RTC.h"
#include "configuration.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/time.h>
#include <time.h>

namespace ThinkKira
{
const char *const DEFAULT_TZ = "CET-1CEST,M3.5.0,M10.5.0/3";

// POSIX zählt westlich positiv: UTC+1 = "-1"
static void posixOffset(char *b, size_t n, int16_t offsetMin)
{
    int m = -offsetMin;
    char sign = m < 0 ? '-' : '+';
    if (m < 0)
        m = -m;
    if (m % 60)
        snprintf(b, n, "%c%d:%02d", sign, m / 60, m % 60);
    else
        snprintf(b, n, "%c%d", sign, m / 60);
}

static std::string makeTz(int16_t offsetMin, DstMode dst)
{
    if (offsetMin == 60 && dst == DST_AUTO)
        return DEFAULT_TZ;
    char o[12], b[64];
    posixOffset(o, sizeof(o), dst == DST_SUMMER ? offsetMin + 60 : offsetMin);
    if (dst == DST_AUTO)
        snprintf(b, sizeof(b), "STD%sDST,M3.5.0,M10.5.0/3", o);
    else
        snprintf(b, sizeof(b), "STD%s", o);
    return b;
}

TimeZone timeZone()
{
    TimeZone z;
    const char *cur = config.device.tzdef[0] ? config.device.tzdef : "GMT0";
    for (int16_t off = -12 * 60; off <= 14 * 60; off += 30)
        for (uint8_t d = 0; d < 3; d++)
            if (makeTz(off, (DstMode)d) == cur) {
                z.offsetMin = off;
                z.dst = (DstMode)d;
                return z;
            }
    if (!strcmp(cur, "GMT0") || !strcmp(cur, "UTC0")) {
        z.offsetMin = 0;
        z.dst = DST_WINTER;
        return z;
    }
    z.custom = true;
    return z;
}

void setTimeZone(int16_t offsetMin, DstMode dst)
{
    std::string tz = makeTz(offsetMin, dst);
    strncpy(config.device.tzdef, tz.c_str(), sizeof(config.device.tzdef) - 1);
    config.device.tzdef[sizeof(config.device.tzdef) - 1] = 0;
    setenv("TZ", config.device.tzdef, 1);
    tzset();
    nodeDB->saveToDisk(SEGMENT_CONFIG);
}

std::string tzLabel(int16_t offsetMin)
{
    char b[16];
    int m = offsetMin < 0 ? -offsetMin : offsetMin;
    if (m % 60)
        snprintf(b, sizeof(b), "UTC%c%d:%02d", offsetMin < 0 ? '-' : '+', m / 60, m % 60);
    else if (m)
        snprintf(b, sizeof(b), "UTC%c%d", offsetMin < 0 ? '-' : '+', m / 60);
    else
        snprintf(b, sizeof(b), "UTC");
    return b;
}

const char *dstLabel(DstMode d)
{
    return d == DST_AUTO ? "Automatisch" : d == DST_SUMMER ? "Immer Sommerzeit" : "Immer Winterzeit";
}

bool setClock(uint32_t epoch)
{
    struct timeval tv = {(time_t)epoch, 0};
    return perhapsSetRTC(RTCQualityNTP, &tv, true) == RTCSetResultSuccess;
}

bool adjustClock(int32_t deltaSec)
{
    uint32_t now = getValidTime(RTCQualityDevice);
#ifdef BUILD_EPOCH
    if (!now)
        now = BUILD_EPOCH; // noch nie gestellt: ab dem Bautag hochzählen
#endif
    return now && setClock(now + deltaSec);
}
} // namespace ThinkKira
#endif
