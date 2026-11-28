// SPDX-License-Identifier: GPL-3.0-only
#ifdef THINKKIRA
#include "KiraSettings.h"
#include "FSCommon.h"
#include "SPILock.h"
#include "configuration.h"
#include <stdlib.h>
#include <string.h>

namespace ThinkKira
{

static Settings current;
static bool loaded = false;
static const char *PATH = "/kira/settings.txt";

static void parseLine(char *s)
{
    char *eq = strchr(s, '=');
    if (!eq)
        return;
    *eq = 0;
    const char *key = s, *val = eq + 1;
    if (!strcmp(key, "radio"))
        current.radioMode = !strcmp(val, "kira") ? RADIO_KIRA : RADIO_MESHTASTIC;
    else if (!strcmp(key, "light"))
        current.light = (LightMode)(atoi(val) % 3);
    else if (!strcmp(key, "leds"))
        current.leds = atoi(val) != 0;
    else if (!strcmp(key, "pages"))
        current.pages = (uint8_t)(atoi(val) | 0x21); // Start und Einstellungen immer an
}

Settings &settings()
{
    if (loaded)
        return current;
    loaded = true;
#ifdef FSCom
    concurrency::LockGuard g(spiLock);
    File f = FSCom.open(PATH, FILE_O_READ);
    if (f) {
        char line[64];
        size_t n = 0;
        while (f.available()) {
            int c = f.read();
            if (c == '\n' || c == '\r' || n == sizeof(line) - 1) {
                line[n] = 0;
                if (n)
                    parseLine(line);
                n = 0;
            } else
                line[n++] = (char)c;
        }
        line[n] = 0;
        if (n)
            parseLine(line);
        f.close();
    }
#endif
    LOG_INFO("[Kira] Funkmodus: %s", radioModeName(current.radioMode));
    return current;
}

bool saveSettings()
{
#ifdef FSCom
    concurrency::LockGuard g(spiLock);
    FSCom.mkdir("/kira");
    File f = FSCom.open(PATH, FILE_O_WRITE);
    if (!f) {
        LOG_ERROR("[Kira] Einstellungen konnten nicht gespeichert werden");
        return false;
    }
    f.printf("radio=%s\n", current.radioMode == RADIO_KIRA ? "kira" : "meshtastic");
    f.printf("light=%u\nleds=%u\npages=%u\n", (unsigned)current.light, current.leds ? 1u : 0u, (unsigned)current.pages);
    f.close();
    return true;
#else
    return false;
#endif
}

const char *radioModeName(RadioMode m)
{
    return m == RADIO_KIRA ? "Kira-Funk" : "Meshtastic";
}

uint8_t radioSyncWord()
{
#if CUSTOM_FEATURE_KIRA_RADIO
    return settings().radioMode == RADIO_KIRA ? SYNC_KIRA : SYNC_MESHTASTIC;
#else
    return SYNC_MESHTASTIC;
#endif
}

} // namespace ThinkKira
#endif
