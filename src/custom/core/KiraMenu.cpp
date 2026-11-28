// SPDX-License-Identifier: GPL-3.0-only
#ifdef THINKKIRA
#include "KiraMenu.h"
#include "FSCommon.h"
#include "SPILock.h"
#include "configuration.h"
#include <string.h>

namespace ThinkKira
{

// Muss zur Liste ACTIONS in web/config/src/designer.js passen
static const char *const ACTIONS[] = {
    "pos.send",   "light.toggle", "light.cycle", "sound.toggle", "leds.toggle", "screen.off", "msg.reply", "msg.new",
    "msg.chats",  "msg.clear",    "nav.goto",    "nav.wpsave",   "nav.track",   "map.offline", "nodes.list", "ping",
    "radio.mode", "radio.stats",  "pages",       "bt.toggle",    "wifi",        "sys.info",    "sys.reboot", "sys.off",
    "home",       "sos"};

const char *const DEFAULT_MENU = "P0\n"
                                 "Ipos.send|Position senden\n"
                                 "Ilight.toggle|\n"
                                 "Isound.toggle|\n"
                                 "Iscreen.off|Bildschirm aus\n"
                                 "P1\n"
                                 "Imsg.reply|Antworten\n"
                                 "Imsg.new|Neue Nachricht (alle)\n"
                                 "Imsg.chats|Alle Chats\n"
                                 "Imsg.clear|Löschen\n"
                                 "P2\n"
                                 "Ipos.send|Position senden\n"
                                 "Inav.goto|Navigieren zu …\n"
                                 "Inav.wpsave|Wegpunkt speichern\n"
                                 "Inav.track|Track Start/Stopp\n"
                                 "P3\n"
                                 "Imap.offline|Offline-Karte\n"
                                 "P4\n"
                                 "Inodes.list|Knoten wählen …\n"
                                 "Iping|Reichweitentest (Ping)\n"
                                 "P5\n"
                                 "SFunk\n"
                                 "Iradio.mode|\n"
                                 "Iradio.stats|Statistik\n"
                                 "Iping|Reichweitentest (Ping)\n"
                                 "E\n"
                                 "SAnzeige & Töne\n"
                                 "Ilight.cycle|\n"
                                 "Ileds.toggle|\n"
                                 "Isound.toggle|\n"
                                 "Ipages|Seiten ein/aus\n"
                                 "E\n"
                                 "SVerbindungen\n"
                                 "Ibt.toggle|\n"
                                 "Iwifi|WLAN & Web\n"
                                 "E\n"
                                 "SSystem\n"
                                 "Isys.info|Info\n"
                                 "Isys.reboot|Neustart\n"
                                 "Isys.off|Ausschalten\n"
                                 "E\n";

static const char *PATH = "/kira/menu.txt";
static std::vector<MenuEntry> menus[MENU_PAGES];
static bool loaded = false;

bool isKnownAction(const std::string &id)
{
    for (const char *a : ACTIONS)
        if (id == a)
            return true;
    return false;
}

bool parseMenu(const std::string &text, std::vector<MenuEntry> (&out)[MENU_PAGES], std::string &error)
{
    for (auto &m : out)
        m.clear();
    int page = -1;
    MenuEntry *openSub = nullptr;
    size_t pos = 0, lineNo = 0;
    while (pos < text.size()) {
        size_t nl = text.find('\n', pos);
        if (nl == std::string::npos)
            nl = text.size();
        std::string line = text.substr(pos, nl - pos);
        pos = nl + 1;
        lineNo++;
        if (!line.empty() && line.back() == '\r')
            line.pop_back();
        if (line.empty())
            continue;
        char kind = line[0];
        std::string rest = line.substr(1);
        if (kind == 'P') {
            page = atoi(rest.c_str());
            if (page < 0 || page >= MENU_PAGES || rest.empty()) {
                error = "Zeile " + std::to_string(lineNo) + ": ungültige Seite";
                return false;
            }
            openSub = nullptr;
        } else if (page < 0) {
            error = "Zeile " + std::to_string(lineNo) + ": Eintrag ohne Seite";
            return false;
        } else if (kind == 'I') {
            size_t bar = rest.find('|');
            MenuEntry e;
            e.action = rest.substr(0, bar);
            e.label = bar == std::string::npos ? "" : rest.substr(bar + 1);
            if (!isKnownAction(e.action)) {
                error = "Zeile " + std::to_string(lineNo) + ": unbekannte Aktion " + e.action;
                return false;
            }
            (openSub ? openSub->sub : out[page]).push_back(e);
        } else if (kind == 'S') {
            if (openSub) {
                error = "Zeile " + std::to_string(lineNo) + ": höchstens 2 Menü-Ebenen";
                return false;
            }
            MenuEntry e;
            e.label = rest.empty() ? "Untermenü" : rest;
            out[page].push_back(e);
            openSub = &out[page].back();
        } else if (kind == 'E') {
            openSub = nullptr;
        } else {
            error = "Zeile " + std::to_string(lineNo) + ": unbekannter Zeilentyp";
            return false;
        }
    }
    // Einstellungen müssen erreichbar bleiben: Seite 5 braucht ein Menü
    if (out[5].empty()) {
        error = "Das Menü der Einstellungen darf nicht leer sein";
        return false;
    }
    return true;
}

static void loadDefault()
{
    std::string err;
    parseMenu(DEFAULT_MENU, menus, err);
}

static void load()
{
    loaded = true;
    std::string text;
#ifdef FSCom
    {
        concurrency::LockGuard g(spiLock);
        File f = FSCom.open(PATH, FILE_O_READ);
        if (f) {
            while (f.available() && text.size() < MENU_MAX_TEXT)
                text += (char)f.read();
            f.close();
        }
    }
#endif
    std::string err;
    if (text.empty() || !parseMenu(text, menus, err)) {
        if (!text.empty())
            LOG_WARN("[Kira] Menüdatei fehlerhaft (%s), nutze Standard", err.c_str());
        loadDefault();
    }
}

std::vector<MenuEntry> &pageMenu(int page)
{
    if (!loaded)
        load();
    return menus[page < 0 || page >= MENU_PAGES ? 0 : page];
}

std::string menuText()
{
    if (!loaded)
        load();
    std::string t;
    for (int p = 0; p < MENU_PAGES; p++) {
        t += "P" + std::to_string(p) + "\n";
        for (const MenuEntry &e : menus[p]) {
            if (e.action.empty()) {
                t += "S" + e.label + "\n";
                for (const MenuEntry &s : e.sub)
                    t += "I" + s.action + "|" + s.label + "\n";
                t += "E\n";
            } else
                t += "I" + e.action + "|" + e.label + "\n";
        }
    }
    return t;
}

bool setMenuText(const std::string &text, std::string &error)
{
    if (text.size() > MENU_MAX_TEXT) {
        error = "Menü zu groß";
        return false;
    }
    std::vector<MenuEntry> parsed[MENU_PAGES];
    if (!parseMenu(text, parsed, error))
        return false;
    for (int p = 0; p < MENU_PAGES; p++)
        menus[p] = parsed[p];
    loaded = true;
#ifdef FSCom
    concurrency::LockGuard g(spiLock);
    FSCom.mkdir("/kira");
    File f = FSCom.open(PATH, FILE_O_WRITE);
    if (!f) {
        error = "Menü konnte nicht gespeichert werden";
        return false;
    }
    f.print(text.c_str());
    f.close();
#endif
    return true;
}

bool resetMenu()
{
#ifdef FSCom
    {
        concurrency::LockGuard g(spiLock);
        FSCom.remove(PATH);
    }
#endif
    loadDefault();
    loaded = true;
    return true;
}

} // namespace ThinkKira
#endif
