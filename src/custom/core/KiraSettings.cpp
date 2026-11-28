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
    else if (!strcmp(key, "order"))
        setOrder(val);
    else if (!strcmp(key, "start"))
        setStart(val);
    else if (!strcmp(key, "replies"))
        setReplies(val);
    else if (!strcmp(key, "keys"))
        setKeys(val);
}

bool setOrder(const char *o)
{
    // genau die Ziffern 0–5, jede einmal
    if (strlen(o) != 6)
        return false;
    uint8_t seen = 0;
    for (int i = 0; i < 6; i++) {
        if (o[i] < '0' || o[i] > '5' || (seen & (1 << (o[i] - '0'))))
            return false;
        seen |= 1 << (o[i] - '0');
    }
    memcpy(current.order, o, 7);
    return true;
}

bool setStart(const char *st)
{
    size_t n = strlen(st);
    if (n >= sizeof(current.start))
        return false;
    for (size_t i = 0; i < n; i++)
        if (!strchr("cbgsknmp", st[i]))
            return false;
    memcpy(current.start, st, n + 1);
    return true;
}

bool setKeys(const char *k)
{
    // 4 Tasten-Rollen + 2 Halte-Aktionen; Menü und Weiter müssen belegt sein, sonst ist das Gerät nicht bedienbar
    if (strlen(k) != 6)
        return false;
    for (int i = 0; i < 4; i++)
        if (!strchr("nmphlx", k[i]))
            return false;
    if (!strchr("osx", k[4]) || !strchr("osx", k[5]))
        return false;
    if (!memchr(k, 'm', 4) || !memchr(k, 'n', 4))
        return false;
    memcpy(current.keys, k, 7);
    return true;
}

bool setReplies(const char *r)
{
    size_t n = strlen(r);
    if (!n || n >= sizeof(current.replies) || strchr(r, '|') || strchr(r, '\n'))
        return false;
    memcpy(current.replies, r, n + 1);
    return true;
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
        char line[256];
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
    f.printf("order=%s\nstart=%s\nreplies=%s\nkeys=%s\n", current.order, current.start, current.replies, current.keys);
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
