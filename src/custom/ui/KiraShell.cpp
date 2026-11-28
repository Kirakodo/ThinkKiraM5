// ThinkKira – eigene Oberfläche (siehe KiraShell.h)
// SPDX-License-Identifier: GPL-3.0-only
#if defined(THINKKIRA) && defined(MESHTASTIC_INCLUDE_INKHUD)

#include "KiraShell.h"
#include "GPSStatus.h"
#include "NodeDB.h"
#include "PowerStatus.h"
#include "RTC.h"
#include "buzz.h"
#include "custom/core/KiraMap.h"
#include "custom/core/KiraMenu.h"
#include "custom/core/KiraMessages.h"
#include "custom/core/KiraNav.h"
#include "custom/core/KiraModule.h"
#include "custom/core/KiraRadio.h"
#include "custom/core/KiraSettings.h"
#include "custom/core/KiraSystem.h"
#include "custom/features.h"
#include "gps/GeoCoord.h"
#include "main.h"
#if HAS_WIFI
#include "mesh/wifi/WiFiAPClient.h"
#include <WiFi.h>
#endif
#include "mesh/MeshService.h"
#include "modules/PositionModule.h"
#include <Arduino.h>
#include <algorithm>

namespace ThinkKira
{
using namespace NicheGraphics;

Shell *Shell::instance = nullptr;

static const char *const PAGE_NAMES[] = {"Start", "Nachrichten", "Navigation", "Karte", "Knoten", "Einstellungen"};
static constexpr uint32_t LIGHT_MS = 10 * 1000;      // Licht nach Tastendruck
static constexpr uint32_t OFF_HOLD_MS = 4000;        // Haupttaste halten = Ausschalten
static constexpr uint32_t SOS_HOLD_MS = 3000;        // Zweittaste halten = SOS
static constexpr uint32_t SOS_COUNTDOWN_MS = 5000;   // Countdown vor dem Senden
static constexpr uint32_t SOS_REPEAT_MS = 60 * 1000; // SOS wiederholen
static constexpr int MAP_ZOOMS = 3;
static const float MAP_SCALES[MAP_ZOOMS] = {3, 8, 20}; // Meter pro Pixel

Shell::Shell(uint8_t mainPin, uint8_t auxPin, std::function<void(bool)> backlight)
    : OSThread("KiraShell"), mainPin(mainPin), auxPin(auxPin), backlight(backlight)
{
    instance = this;
    setInputsSubscribed(BUTTON_SHORT | BUTTON_LONG, true);
}

void Shell::onActivate()
{
    setIntervalFromNow(1000);
}

void Shell::onForeground()
{
    redraw(true);
}

// ---------------------------------------------------------------- Tasten

bool Shell::consumeSpecial()
{
    if (sos != SOS_OFF) {
        stopSos();
        return true;
    }
    if (screenOff) {
        screenOff = false;
        redraw(true);
        return true;
    }
    if (infoOpen) {
        infoOpen = false;
        redraw();
        return true;
    }
    return false;
}

void Shell::keyDown()
{
    lightActivity();
    uint32_t now = millis();
    if (digitalRead(mainPin) == LOW && !mainDownAt)
        mainDownAt = now;
    if (digitalRead(auxPin) == LOW && !auxDownAt)
        auxDownAt = now;
    holdHandled = false;
    setIntervalFromNow(100); // Halten messen
}

// Tastenbelegung aus dem Designer: keys = [Haupt kurz, Haupt lang, Zweit kurz, Zweit lang, Haupt 4 s, Zweit 3 s]
// Rollen: n weiter, p zurück, m Menü/Auswählen, h Startseite, l Licht, x nichts; Halten: o Ausschalten, s SOS, x nichts
void Shell::onButtonShortPress()
{
    gesture(ThinkKira::settings().keys[0]);
}

void Shell::onButtonLongPress()
{
    gesture(ThinkKira::settings().keys[1]);
}

void Shell::auxShort()
{
    playChirp();
    gesture(ThinkKira::settings().keys[2]);
}

void Shell::auxLong()
{
    playBoop();
    gesture(ThinkKira::settings().keys[3]);
}

void Shell::gesture(char role)
{
    if (holdHandled || consumeSpecial())
        return;
    if (role == 'h') {
        goHome();
        return;
    }
    if (role == 'l') {
        runAction("light.toggle");
        toast(actionLabel("light.toggle"));
        return;
    }
    if (stack.empty() && mapPan && page == P_MAP) {
        // Karte bewegen: Weiter = schieben, Zurück = Richtung drehen, Menü = Zoom, Startseite = fertig
        if (role == 'n') {
            static const int8_t DY[] = {1, 0, -1, 0}, DX[] = {0, 1, 0, -1};
            float step = MAP_SCALES[mapZoom] * 70; // Meter, ca. ein Drittel des Bildschirms
            mapLat += (int32_t)(DY[mapDir] * step / 110540.0f * 1e7f);
            mapLon += (int32_t)(DX[mapDir] * step / (111320.0f * cosf(mapLat * 1e-7f * (float)M_PI / 180)) * 1e7f);
        } else if (role == 'p')
            mapDir = (mapDir + 1) % 4;
        else if (role == 'm')
            mapZoom = (mapZoom + 1) % MAP_ZOOMS;
        redraw();
        return;
    }
    if (stack.empty()) {
        if (role == 'n')
            changePage(+1);
        else if (role == 'p')
            changePage(-1);
        else if (role == 'm')
            openPageMenu();
        return;
    }
    Menu &m = stack.back();
    if (role == 'n') {
        if (!m.items.empty())
            m.sel = (m.sel + 1) % m.items.size();
    } else if (role == 'p') {
        stack.pop_back();
    } else if (role == 'm') {
        if (m.items.empty())
            return;
        auto action = m.items[m.sel].action; // Kopie: die Aktion darf den Stapel ändern
        if (action)
            action();
    }
    redraw();
}

// ---------------------------------------------------------------- Ablauf

int32_t Shell::runOnce()
{
    uint32_t now = millis();
    bool needFast = false;

    // Halten messen (4 s Ausschalten, 3 s SOS)
    if (mainDownAt || auxDownAt) {
        needFast = true;
        bool mainHeld = digitalRead(mainPin) == LOW, auxHeld = digitalRead(auxPin) == LOW;
        if (!mainHeld)
            mainDownAt = 0;
        if (!auxHeld)
            auxDownAt = 0;
        const char *k = ThinkKira::settings().keys;
        char hold = 0;
        if (mainDownAt && !holdHandled && now - mainDownAt >= OFF_HOLD_MS)
            hold = k[4];
        else if (auxDownAt && !holdHandled && now - auxDownAt >= SOS_HOLD_MS)
            hold = k[5];
        if (hold == 'o') {
            holdHandled = true;
            showInfo("Ausschalten", {"ThinkKira wird", "ausgeschaltet …"});
            playShutdownMelody();
            shutdownAtMsec = now + 1500;
        } else if (hold == 's' && sos == SOS_OFF) {
            holdHandled = true;
            startSos();
        }
    }

    // SOS
    if (sos == SOS_COUNTDOWN) {
        needFast = true;
        uint32_t left = SOS_COUNTDOWN_MS - std::min(SOS_COUNTDOWN_MS, now - sosStart);
        static uint32_t lastSec = 0;
        uint32_t sec = (left + 999) / 1000;
        if (sec != lastSec) {
            lastSec = sec;
            playBeep();
            redraw();
        }
        if (left == 0) {
            sos = SOS_ACTIVE;
            sendSos();
            redraw(true);
        }
    } else if (sos == SOS_ACTIVE && now - sosLastSend >= SOS_REPEAT_MS) {
        sendSos();
        redraw();
    }

    // Licht nach Tastendruck wieder aus
    ThinkKira::Settings &s = ThinkKira::settings();
    if (s.light == LIGHT_ALWAYS && !lightOn)
        setLight(true);
    else if (s.light != LIGHT_ALWAYS && lightOn && (s.light == LIGHT_OFF || (int32_t)(now - lightUntil) >= 0))
        setLight(false);

    // Kurzmeldung ausblenden
    if (toastUntil && (int32_t)(now - toastUntil) >= 0) {
        toastUntil = 0;
        toastText.clear();
        redraw();
    }

    // Inhalte aktualisieren (nur wenn sich etwas geändert hat; E-Ink schonen)
    if (s.uiRev != lastUiRev) {
        lastUiRev = s.uiRev;
        stack.clear(); // Menüs können neu geladen worden sein
        if (!(s.pages & (1 << page)))
            page = P_START;
        redraw(true);
    }

    if (isForeground() && stack.empty() && !infoOpen && !screenOff && sos == SOS_OFF) {
        int cnt = kiraMessages ? kiraMessages->count() : 0, unread = kiraMessages ? kiraMessages->unread() : 0;
        uint32_t minute = getValidTime(RTCQualityDevice, true) / 60;
        if (cnt != lastMsgCount || unread != lastUnread) {
            lastMsgCount = cnt;
            lastUnread = unread;
            if (page == P_MSG && kiraMessages)
                kiraMessages->markRead();
            redraw();
        } else if (page == P_START && minute != lastMinute) {
            lastMinute = minute;
            redraw();
        } else if (!(page == P_MAP && mapPan) && barSig() != lastBarSig) {
            redraw(); // Uhrzeit, Akku, GPS, WLAN, Bluetooth in der Statuszeile
        } else if (kiraNav && (page == P_NAV || page == P_START || (page == P_MAP && !mapPan))) {
            // Navigation: nur neu zeichnen, wenn sich die Anzeige sichtbar ändert (höchstens 1×/s)
            const NavInfo &n = kiraNav->info();
            uint32_t sig = (uint32_t)(n.course / 10) ^ ((uint32_t)(n.bearing / 10) << 6) ^ ((uint32_t)(n.distance / 10) << 12) ^
                           ((uint32_t)n.moving << 30) ^ ((uint32_t)n.haveTarget << 31) ^ ((uint32_t)kiraNav->rev << 24) ^
                           ((uint32_t)n.havePos << 29);
            if (sig != lastNavSig) {
                lastNavSig = sig;
                redraw();
            }
        }
    }
    if (kiraNav && kiraNav->arrivedFlag) {
        kiraNav->arrivedFlag = false;
        showInfo("Ziel erreicht", {"Du bist angekommen.", "Die Navigation ist beendet."});
        redraw(true);
    }
    return needFast ? 100 : 1000;
}

void Shell::redraw(bool full)
{
    requestUpdate(full ? Drivers::EInk::UpdateTypes::FULL : Drivers::EInk::UpdateTypes::FAST);
}

// Seitenreihenfolge aus dem Designer (Ziffern 0–5); ausgeschaltete Seiten werden übersprungen
static int orderPos(Shell::Page p)
{
    const char *o = ThinkKira::settings().order;
    for (int i = 0; i < 6; i++)
        if (o[i] - '0' == p)
            return i;
    return 0;
}

void Shell::changePage(int dir)
{
    uint8_t mask = ThinkKira::settings().pages | 0x21;
    const char *o = ThinkKira::settings().order;
    int pos = orderPos(page);
    for (int i = 0; i < P_COUNT; i++) {
        pos = (pos + dir + P_COUNT) % P_COUNT;
        page = (Page)(o[pos] - '0');
        if (mask & (1 << page))
            break;
    }
    if (page == P_MSG && kiraMessages)
        kiraMessages->markRead();
    redraw();
}

void Shell::goHome()
{
    if (mapPan && page == P_MAP) { // aus dem Verschieben-Modus erst zurück zur Karte
        mapPan = false;
        redraw();
        return;
    }
    stack.clear();
    infoOpen = false;
    page = P_START;
    redraw();
}

void Shell::pushMenu(const Menu &m)
{
    if (stack.size() >= 2) // höchstens 2 Ebenen: die oberste ersetzen
        stack.back() = m;
    else
        stack.push_back(m);
    redraw();
}

void Shell::closeMenus()
{
    stack.clear();
    redraw();
}

void Shell::showInfo(const std::string &title, const std::vector<std::string> &lines)
{
    infoTitle = title;
    infoLines = lines;
    infoOpen = true;
    stack.clear();
    redraw();
}

void Shell::toast(const std::string &text)
{
    toastText = text;
    toastUntil = millis() + 3000;
    redraw();
}

void Shell::setLight(bool on)
{
    lightOn = on;
    if (backlight)
        backlight(on);
}

void Shell::lightActivity()
{
    ThinkKira::Settings &s = ThinkKira::settings();
    if (s.light == LIGHT_ON_KEY) {
        lightUntil = millis() + LIGHT_MS;
        if (!lightOn)
            setLight(true);
    }
}

// ---------------------------------------------------------------- SOS

void Shell::startSos()
{
    sos = SOS_COUNTDOWN;
    sosStart = millis();
    sosCount = 0;
    stack.clear();
    infoOpen = false;
    setIntervalFromNow(100);
    redraw(true);
}

void Shell::stopSos()
{
    bool wasActive = sos == SOS_ACTIVE;
    sos = SOS_OFF;
    if (wasActive && kiraMessages)
        kiraMessages->send("SOS beendet - alles in Ordnung.", NODENUM_BROADCAST, 0);
    toast(wasActive ? "SOS beendet" : "SOS abgebrochen");
    redraw(true);
}

void Shell::sendSos()
{
    char text[110];
    if (localPosition.latitude_i || localPosition.longitude_i)
        snprintf(text, sizeof(text), "SOS! Notfall bei %.5f, %.5f (https://osm.org/?mlat=%.5f&mlon=%.5f)",
                 localPosition.latitude_i * 1e-7, localPosition.longitude_i * 1e-7, localPosition.latitude_i * 1e-7,
                 localPosition.longitude_i * 1e-7);
    else
        snprintf(text, sizeof(text), "SOS! Notfall - Position unbekannt (kein GPS)");
    if (kiraMessages)
        kiraMessages->send(text, NODENUM_BROADCAST, 0);
    if (positionModule)
        positionModule->sendOurPosition();
    sosLastSend = millis();
    sosCount++;
    playLongBeep();
}

// ---------------------------------------------------------------- Hilfen

std::string Shell::nodeName(uint32_t num)
{
    if (num == NODENUM_BROADCAST)
        return "Alle";
    meshtastic_NodeInfoLite *n = nodeDB->getMeshNode(num);
    if (n && nodeInfoLiteHasUser(n) && n->long_name[0])
        return parse(n->long_name);
    return hexifyNodeNum(num);
}

std::string Shell::ago(uint32_t ms)
{
    uint32_t s = ms / 1000;
    char b[16];
    if (s < 60)
        snprintf(b, sizeof(b), "%us", (unsigned)s);
    else if (s < 3600)
        snprintf(b, sizeof(b), "%um", (unsigned)(s / 60));
    else if (s < 86400)
        snprintf(b, sizeof(b), "%uh", (unsigned)(s / 3600));
    else
        snprintf(b, sizeof(b), "%ud", (unsigned)(s / 86400));
    return b;
}

// ---------------------------------------------------------------- Menüs

void Shell::openPageMenu()
{
    const std::vector<MenuEntry> &def = pageMenu(page);
    if (def.empty()) {
        toast("Kein Menü auf dieser Seite");
        return;
    }
    pushMenu(buildMenu(page == P_START ? "Start" : PAGE_NAMES[page], def));
}

// Baut ein Menü aus den Designer-Daten. Untermenüs werden erst beim Öffnen gebaut (Texte bleiben aktuell).
Shell::Menu Shell::buildMenu(const std::string &title, const std::vector<MenuEntry> &entries)
{
    Menu m{title, {}};
    for (const MenuEntry &e : entries) {
        if (e.action.empty()) {
            std::vector<MenuEntry> sub = e.sub; // Kopie: das Menü kann vom Designer ersetzt werden
            std::string t = e.label;
            m.items.push_back({t, [this, t, sub]() { pushMenu(buildMenu(t, sub)); }});
        } else {
            std::string id = e.action, custom = e.label;
            m.items.push_back({custom.empty() ? actionLabel(id) : custom, [this, id, custom]() {
                                   size_t depth = stack.size();
                                   int sel = depth ? stack.back().sel : 0;
                                   bool stay = runAction(id);
                                   // Schalter bleiben im Menü; Standardtext an den neuen Zustand anpassen
                                   if (stay && custom.empty() && stack.size() == depth && depth && sel < (int)stack.back().items.size())
                                       stack.back().items[sel].label = actionLabel(id);
                               }});
        }
    }
    return m;
}

std::string Shell::actionLabel(const std::string &id)
{
    ThinkKira::Settings &s = ThinkKira::settings();
    bool mute = config.device.buzzer_mode == meshtastic_Config_DeviceConfig_BuzzerMode_DISABLED;
    if (id == "light.toggle")
        return s.light == LIGHT_ALWAYS ? "Licht: immer an" : "Licht: bei Taste";
    if (id == "light.cycle") {
        static const char *const L[] = {"Licht: aus", "Licht: bei Taste", "Licht: immer"};
        return L[s.light % 3];
    }
    if (id == "sound.toggle")
        return mute ? "Töne: aus" : "Töne: an";
    if (id == "leds.toggle")
        return s.leds ? "LED-Hinweise: an" : "LED-Hinweise: aus";
    if (id == "radio.mode")
        return s.radioMode == RADIO_KIRA ? "Zu Meshtastic wechseln" : "Zu Kira-Funk wechseln";
    if (id == "bt.toggle")
        return config.bluetooth.enabled ? "Bluetooth aus (Neustart)" : "Bluetooth an (Neustart)";
    if (id == "screen.off")
        return "Bildschirm aus";
    if (id == "home")
        return "Zur Startseite";
    if (id == "map.rotate")
        return mapCourseUp ? "Ausrichtung: Norden oben" : "Ausrichtung: Laufrichtung";
    if (id == "nav.track")
        return kiraNav && kiraNav->tracking() ? "Track stoppen" : "Track starten";
    if (id == "sos")
        return "SOS auslösen";
    return id;
}

// Führt eine Aktion aus. true = im Menü bleiben (Schalter), false = Menü wurde geschlossen/gewechselt.
bool Shell::runAction(const std::string &id)
{
    ThinkKira::Settings &s = ThinkKira::settings();
    auto phase = [this](const char *n) {
        toast(std::string("Kommt mit Phase ") + n);
        return true;
    };
    if (id == "pos.send") {
        bool ok = positionModule && positionModule->sendOurPosition();
        closeMenus();
        toast(ok ? "Position gesendet" : "Keine Position");
    } else if (id == "light.toggle") {
        s.light = (s.light == LIGHT_ALWAYS) ? LIGHT_ON_KEY : LIGHT_ALWAYS;
        saveSettings();
        setLight(s.light == LIGHT_ALWAYS);
        return true;
    } else if (id == "light.cycle") {
        s.light = (LightMode)((s.light + 1) % 3);
        saveSettings();
        return true;
    } else if (id == "sound.toggle") {
        bool mute = config.device.buzzer_mode == meshtastic_Config_DeviceConfig_BuzzerMode_DISABLED;
        config.device.buzzer_mode =
            mute ? meshtastic_Config_DeviceConfig_BuzzerMode_ALL_ENABLED : meshtastic_Config_DeviceConfig_BuzzerMode_DISABLED;
        nodeDB->saveToDisk(SEGMENT_CONFIG);
        return true;
    } else if (id == "leds.toggle") {
        s.leds = !s.leds;
        saveSettings();
        return true;
    } else if (id == "screen.off") {
        closeMenus();
        screenOff = true;
        setLight(false);
        redraw(true);
    } else if (id == "msg.reply") {
        if (!kiraMessages || !kiraMessages->count()) {
            toast("Keine Nachricht zum Antworten");
            return true;
        }
        const KiraMessage &last = kiraMessages->get(0);
        uint32_t to = last.outgoing ? last.to : (last.to == NODENUM_BROADCAST ? NODENUM_BROADCAST : last.from);
        pushMenu(menuQuickReplies(to, last.channel, "Antwort an " + nodeName(to)));
    } else if (id == "msg.new") {
        pushMenu(menuQuickReplies(NODENUM_BROADCAST, 0, "An alle"));
    } else if (id == "msg.chats") {
        std::vector<std::string> lines;
        for (int i = 0; kiraMessages && i < kiraMessages->count(); i++) {
            const KiraMessage &k = kiraMessages->get(i);
            lines.push_back((k.outgoing ? "Ich > " + nodeName(k.to) : nodeName(k.from)) + ": " + parse(k.text));
        }
        if (lines.empty())
            lines.push_back("Keine Nachrichten");
        showInfo("Alle Chats", lines);
    } else if (id == "msg.clear") {
        if (kiraMessages)
            kiraMessages->clear();
        closeMenus();
        toast("Nachrichten gelöscht");
    } else if (id == "nav.goto") {
        pushMenu(menuTargets());
    } else if (id == "nav.wpsave") {
        std::string name;
        bool ok = kiraNav && kiraNav->addHere(name);
        closeMenus();
        toast(ok ? "Gespeichert als " + name : "Keine GPS-Position");
    } else if (id == "nav.track") {
        if (!kiraNav)
            return true;
        kiraNav->setTracking(!kiraNav->tracking());
        closeMenus();
        toast(kiraNav->tracking() ? "Track läuft" : "Track gestoppt (" + std::to_string(kiraNav->trackPoints()) + " Punkte)");
    } else if (id == "nav.stop") {
        if (kiraNav)
            kiraNav->clearTarget();
        closeMenus();
        toast("Navigation beendet");
    } else if (id == "wp.manage") {
        pushMenu(menuWaypoints(true));
    } else if (id == "track.clear") {
        if (kiraNav)
            kiraNav->clearTrack();
        closeMenus();
        toast("Track gelöscht");
    } else if (id == "map.offline") {
        KiraMapFile &mf = mapFile();
        if (!mf.available())
            showInfo("Offline-Karte", {"Keine Karte im Gerät.", "Hochladen: Konfigurator → ThinkKira → Offline-Karte."});
        else {
            const MapHeader &h = mf.header();
            char b[64];
            std::vector<std::string> l;
            snprintf(b, sizeof(b), "%u KB, Detailstufe %u", (unsigned)(mf.fileSize() / 1024), (unsigned)h.level);
            l.push_back(b);
            snprintf(b, sizeof(b), "%.2f–%.2f N", h.latMin * 1e-7, h.latMax * 1e-7);
            l.push_back(parse(b));
            snprintf(b, sizeof(b), "%.2f–%.2f O", h.lonMin * 1e-7, h.lonMax * 1e-7);
            l.push_back(parse(b));
            l.push_back(parse("© OpenStreetMap-Mitwirkende"));
            showInfo("Offline-Karte", l);
        }
    } else if (id == "map.zoomin" || id == "map.zoomout") {
        if (id == "map.zoomin" && mapZoom > 0)
            mapZoom--;
        else if (id == "map.zoomout" && mapZoom < MAP_ZOOMS - 1)
            mapZoom++;
        closeMenus();
    } else if (id == "map.move") {
        if (!mapFree)
            mapCenterHere();
        mapFree = mapPan = true;
        closeMenus();
    } else if (id == "map.center") {
        mapFree = mapPan = false;
        closeMenus();
    } else if (id == "map.rotate") {
        mapCourseUp = !mapCourseUp;
        closeMenus();
        toast(mapCourseUp ? "Karte: in Laufrichtung" : "Karte: Norden oben");
    } else if (id == "map.wphere" || id == "map.gohere") {
        int32_t la, lo;
        if (!mapCenter(la, lo)) {
            toast("Keine Kartenmitte");
            return true;
        }
        if (id == "map.wphere") {
            char n[20];
            snprintf(n, sizeof(n), "Karte %02u", (unsigned)(kiraNav ? kiraNav->waypoints().size() + 1 : 1));
            bool ok = kiraNav && kiraNav->addWaypoint(n, la, lo, getValidTime(RTCQualityDevice));
            closeMenus();
            toast(ok ? std::string("Gespeichert als ") + n : "Speichern nicht möglich");
        } else if (kiraNav) {
            Target t;
            t.kind = TARGET_POINT;
            strncpy(t.name, "Kartenpunkt", sizeof(t.name) - 1);
            t.lat = la;
            t.lon = lo;
            kiraNav->setTarget(t);
            mapPan = false;
            closeMenus();
            toast("Navigation zur Kartenmitte");
        }
    } else if (id == "wifi") {
        // WLAN-Zustand und Adresse für „Per WLAN verbinden“ im Konfigurator
        std::vector<std::string> l;
#if HAS_WIFI
        if (!config.network.wifi_enabled) {
            l = {"WLAN ist aus.", "Einschalten im Konfigurator unter Einstellungen → WLAN."};
        } else if (WiFi.status() == WL_CONNECTED) {
            l = {"Verbunden mit", std::string(config.network.wifi_ssid), "Adresse:", std::string(WiFi.localIP().toString().c_str()),
                 "Im Konfigurator: Per WLAN verbinden"};
        } else {
            l = {"WLAN an, aber nicht verbunden.", std::string("Netz: ") + config.network.wifi_ssid};
        }
#else
        l = {"Dieses Gerät hat kein WLAN."};
#endif
        showInfo("WLAN & Web", l);
    } else if (id == "nodes.list") {
        pushMenu(menuNodeList());
    } else if (id == "ping") {
        bool ok = kiraModule && kiraModule->sendPing();
        closeMenus();
        toast(ok ? "Ping gesendet" : "Ping nicht möglich");
    } else if (id == "radio.mode") {
        bool kira = s.radioMode == RADIO_KIRA;
        s.radioMode = kira ? RADIO_MESHTASTIC : RADIO_KIRA;
        saveSettings();
        showInfo("Funkmodus", {kira ? "Meshtastic" : "Kira-Funk", "Neustart …"});
        rebootAtMsec = millis() + 2000;
    } else if (id == "radio.stats") {
        RadioCounters c = radioCounters();
        char b[48];
        std::vector<std::string> l;
        l.push_back(radioModeName(s.radioMode));
        snprintf(b, sizeof(b), "RX %lu, Fehler %lu", (unsigned long)c.rxGood, (unsigned long)c.rxBad);
        l.push_back(b);
        snprintf(b, sizeof(b), "TX %lu, weiter %lu", (unsigned long)c.txGood, (unsigned long)c.txRelay);
        l.push_back(b);
        const RadioStats &rs = radioStats();
        if (rs.heard[0].atMs) {
            snprintf(b, sizeof(b), "Zuletzt %d dBm / %.1f dB", rs.heard[0].rssi, rs.heard[0].snr);
            l.push_back(b);
        }
        snprintf(b, sizeof(b), "Reichweite: %lu/%lu", (unsigned long)rs.pongsReceived, (unsigned long)rs.pingsSent);
        l.push_back(b);
        showInfo("Funk-Statistik", l);
    } else if (id == "pages") {
        Menu a{"Seiten ein/aus", {}};
        for (int p = P_MSG; p <= P_NODES; p++) {
            auto label = [p]() {
                return std::string(PAGE_NAMES[p]) + ((ThinkKira::settings().pages & (1 << p)) ? ": an" : ": aus");
            };
            int idx = (int)a.items.size();
            a.items.push_back({label(), [this, p, idx, label]() {
                                   ThinkKira::settings().pages ^= (1 << p);
                                   saveSettings();
                                   stack.back().items[idx].label = label();
                               }});
        }
        pushMenu(a);
    } else if (id == "bt.toggle") {
        bool bt = config.bluetooth.enabled;
        config.bluetooth.enabled = !bt;
        nodeDB->saveToDisk(SEGMENT_CONFIG);
        showInfo("Bluetooth", {bt ? "aus" : "an", "Neustart …"});
        rebootAtMsec = millis() + 2000;
    } else if (id == "sys.info") {
        SystemInfo i;
        collectSystemInfo(i);
        char b[48];
        std::vector<std::string> l;
        l.push_back("ThinkKira " THINKKIRA_VERSION);
        l.push_back(std::string("GPS: ") + gpsVersionText(i.gpsV2));
        snprintf(b, sizeof(b), "Flash %u MB, frei %u KB", (unsigned)(i.flashPhysical >> 20), (unsigned)((i.appSlot - i.appUsed) / 1024));
        l.push_back(b);
        snprintf(b, sizeof(b), "Speicher %u/%u KB", (unsigned)(i.fsUsed / 1024), (unsigned)(i.fsTotal / 1024));
        l.push_back(b);
        l.push_back(hexifyNodeNum(nodeDB->getNodeNum()));
        showInfo("Info", l);
    } else if (id == "sys.reboot") {
        showInfo("Neustart", {"Neustart …"});
        rebootAtMsec = millis() + 1500;
    } else if (id == "sys.off") {
        showInfo("Ausschalten", {"ThinkKira wird", "ausgeschaltet …"});
        shutdownAtMsec = millis() + 1500;
    } else if (id == "home") {
        goHome();
    } else if (id == "sos") {
        startSos();
    } else
        toast("Unbekannte Aktion");
    return false;
}

Shell::Menu Shell::menuQuickReplies(uint32_t to, uint8_t channel, const std::string &title)
{
    Menu m{title, {}};
    std::string all = ThinkKira::settings().replies;
    size_t a = 0;
    while (a <= all.size()) {
        size_t b = all.find(';', a);
        if (b == std::string::npos)
            b = all.size();
        std::string t = all.substr(a, b - a);
        a = b + 1;
        if (t.empty())
            continue;
        m.items.push_back({t, [this, t, to, channel]() {
                               bool ok = kiraMessages && kiraMessages->send(t.c_str(), to, channel);
                               closeMenus();
                               toast(ok ? "Gesendet" : "Senden fehlgeschlagen");
                           }});
    }
    return m;
}

// Wegpunkte, nächste zuerst. manage = Verwalten-Menü statt direkt als Ziel
Shell::Menu Shell::menuWaypoints(bool manage)
{
    Menu m{manage ? "Wegpunkte" : "Ziel: Wegpunkt", {}};
    if (!kiraNav)
        return m;
    const auto &w = kiraNav->waypoints();
    const NavInfo &n = kiraNav->info();
    for (size_t i : kiraNav->waypointsByDistance()) {
        std::string label = w[i].name;
        if (n.havePos)
            label += "  " + formatDistance(GeoCoord::latLongToMeter(localPosition.latitude_i * 1e-7, localPosition.longitude_i * 1e-7,
                                                                   w[i].lat * 1e-7, w[i].lon * 1e-7));
        std::string name = w[i].name;
        m.items.push_back({label, [this, i, manage, name]() {
                               if (!manage) {
                                   targetWaypoint(i);
                                   return;
                               }
                               Menu a{name, {}};
                               a.items.push_back({"Als Ziel", [this, i]() { targetWaypoint(i); }});
                               a.items.push_back({"Ins Mesh senden", [this, i]() {
                                                      bool ok = kiraNav->sendWaypointToMesh(i);
                                                      closeMenus();
                                                      toast(ok ? "Wegpunkt gesendet" : "Senden nicht möglich");
                                                  }});
                               a.items.push_back({"Löschen", [this, i]() {
                                                      kiraNav->removeWaypoint(i);
                                                      closeMenus();
                                                      toast("Wegpunkt gelöscht");
                                                  }});
                               pushMenu(a);
                           }});
    }
    if (m.items.empty())
        m.items.push_back({"Noch keine Wegpunkte", nullptr});
    return m;
}

void Shell::targetWaypoint(size_t i)
{
    const auto &w = kiraNav->waypoints();
    if (i >= w.size())
        return;
    Target t;
    t.kind = TARGET_POINT;
    strncpy(t.name, w[i].name, sizeof(t.name) - 1);
    t.lat = w[i].lat;
    t.lon = w[i].lon;
    kiraNav->setTarget(t);
    stack.clear();
    page = P_NAV;
    redraw();
}

Shell::Menu Shell::menuTargets()
{
    Menu m{"Navigieren zu …", {}};
    m.items.push_back({"Wegpunkt …", [this]() { pushMenu(menuWaypoints(false)); }});
    m.items.push_back({"Knoten …", [this]() { pushMenu(menuNodeList()); }});
    if (kiraNav && kiraNav->target().kind != TARGET_NONE)
        m.items.push_back({"Navigation beenden", [this]() { runAction("nav.stop"); }});
    return m;
}

Shell::Menu Shell::menuNodeList()
{
    Menu m{"Knoten wählen", {}};
    std::vector<meshtastic_NodeInfoLite *> list;
    for (size_t i = 0; i < nodeDB->getNumMeshNodes(); i++) {
        meshtastic_NodeInfoLite *n = nodeDB->getMeshNodeByIndex(i);
        if (n && n->num != nodeDB->getNodeNum())
            list.push_back(n);
    }
    std::sort(list.begin(), list.end(), [](auto *a, auto *b) { return a->last_heard > b->last_heard; });
    for (size_t i = 0; i < list.size() && i < 20; i++) {
        uint32_t num = list[i]->num;
        m.items.push_back({nodeName(num), [this, num]() { pushMenu(menuNode(num)); }});
    }
    if (m.items.empty())
        m.items.push_back({"Noch keine Knoten", nullptr});
    return m;
}

Shell::Menu Shell::menuNode(uint32_t num)
{
    Menu m{nodeName(num), {}};
    m.items.push_back({"Nachricht senden", [this, num]() { pushMenu(menuQuickReplies(num, 0, "An " + nodeName(num))); }});
    bool fav = nodeDB->isFavorite(num);
    m.items.push_back({fav ? "Kein Favorit mehr" : "Als Favorit", [this, num, fav]() {
                           nodeDB->set_favorite(!fav, num);
                           closeMenus();
                           toast(fav ? "Favorit entfernt" : "Favorit gesetzt");
                       }});
    m.items.push_back({"Signal-Info", [this, num]() {
                           meshtastic_NodeInfoLite *n = nodeDB->getMeshNode(num);
                           std::vector<std::string> l;
                           char b[48];
                           l.push_back(hexifyNodeNum(num));
                           if (n) {
                               snprintf(b, sizeof(b), "SNR: %.1f dB", n->snr);
                               l.push_back(b);
                               if (n->has_hops_away) {
                                   snprintf(b, sizeof(b), "Sprünge: %u", (unsigned)n->hops_away);
                                   l.push_back(b);
                               }
                               uint32_t now = getValidTime(RTCQualityDevice);
                               if (n->last_heard && now > n->last_heard)
                                   l.push_back("Zuletzt: vor " + ago((now - n->last_heard) * 1000));
                           }
                           meshtastic_PositionLite p;
                           if (nodeDB->copyNodePosition(num, p) && (localPosition.latitude_i || localPosition.longitude_i)) {
                               float d = GeoCoord::latLongToMeter(localPosition.latitude_i * 1e-7, localPosition.longitude_i * 1e-7,
                                                                  p.latitude_i * 1e-7, p.longitude_i * 1e-7);
                               l.push_back("Entfernung: " + localizeDistance((uint32_t)d));
                           }
                           showInfo("Signal-Info", l);
                       }});
    m.items.push_back({"Als Ziel", [this, num]() {
                           Target t;
                           t.kind = TARGET_NODE;
                           t.node = num;
                           strncpy(t.name, nodeName(num).c_str(), sizeof(t.name) - 1);
                           meshtastic_PositionLite p;
                           if (nodeDB->copyNodePosition(num, p)) {
                               t.lat = p.latitude_i;
                               t.lon = p.longitude_i;
                           }
                           if (!kiraNav || (!t.lat && !t.lon)) {
                               toast("Knoten hat keine Position");
                               return;
                           }
                           kiraNav->setTarget(t);
                           stack.clear();
                           page = P_NAV;
                           redraw();
                       }});
    return m;
}

// ---------------------------------------------------------------- Zeichnen

// Zustand der Statussymbole
static bool gpsOn() { return config.position.gps_mode == meshtastic_Config_PositionConfig_GpsMode_ENABLED; }
static bool gpsFix() { return gpsStatus && gpsStatus->getHasLock(); }
static bool wifiOn() { return config.network.wifi_enabled; }
static bool wifiConnected()
{
#if HAS_WIFI
    return wifiOn() && WiFi.status() == WL_CONNECTED;
#else
    return false;
#endif
}
static bool btOn() { return config.bluetooth.enabled; }
static bool btConnected() { return nimbleBluetooth && nimbleBluetooth->isConnected(); }

uint32_t Shell::barSig()
{
    const char *b = ThinkKira::settings().bar;
    uint32_t sig = 0;
    if (strchr(b, 'c'))
        sig ^= getValidTime(RTCQualityDevice, true) / 60;
    if (powerStatus && (strchr(b, 'b') || strchr(b, 'B')))
        sig ^= ((uint32_t)(powerStatus->getBatteryChargePercent() / 5) << 20) ^ ((uint32_t)powerStatus->getHasUSB() << 27);
    sig ^= ((uint32_t)gpsFix() << 28) ^ ((uint32_t)wifiConnected() << 29) ^ ((uint32_t)btConnected() << 30);
    if (strchr(b, 'k'))
        sig ^= (uint32_t)nodeDB->getNumOnlineMeshNodes() << 12;
    if (strchr(b, 'm') && kiraMessages)
        sig ^= (uint32_t)kiraMessages->unread() << 16;
    return sig;
}

// Zeichnet einen Baustein der Statuszeile; x ist die linke (oder bei fromRight die rechte) Kante. Gibt die Breite zurück.
int16_t Shell::drawBarItem(char c, int16_t x, bool fromRight, const std::string &title, int16_t h)
{
    const int16_t cy = h / 2; // Mitte der Zeile
    auto text = [&](const std::string &t) -> int16_t {
        std::string p = parse(t);
        int16_t w = getTextWidth(p);
        printAt(fromRight ? x - w : x, 2, p);
        return w;
    };
    auto L = [&](int16_t w) { return fromRight ? x - w : x; }; // linke Kante eines Symbols der Breite w
    char b[24];
    switch (c) {
    case 'n':
        return text(title);
    case 'f':
        return text("ThinkKira");
    case 'c':
        return getValidTime(RTCQualityDevice) ? text(getTimeString()) : 0;
    case 'b':
        if (!powerStatus)
            return 0;
        snprintf(b, sizeof(b), "%u%%", powerStatus->getBatteryChargePercent());
        return text(b);
    case 'B': { // Akku-Symbol, gefüllt nach Ladestand; Blitz-Strich bei USB
        if (!powerStatus)
            return 0;
        const int16_t w = 16, hh = 8, l = L(w), t = cy - hh / 2;
        drawRect(l, t, w - 2, hh, BLACK);
        fillRect(l + w - 2, t + 2, 2, hh - 4, BLACK);
        int fill = (w - 6) * powerStatus->getBatteryChargePercent() / 100;
        fillRect(l + 2, t + 2, fill, hh - 4, BLACK);
        if (powerStatus->getHasUSB()) // weißer Strich als „lädt“-Zeichen
            drawLine(l + 4, t + hh - 2, l + w - 7, t + 1, fill > 6 ? WHITE : BLACK);
        return w;
    }
    case 'g': { // GPS: Stecknadel; voll = Position, hohl = sucht
        if (!gpsOn())
            return 0;
        const int16_t w = 7, l = L(w), t = cy - 5;
        if (gpsFix()) {
            fillCircle(l + 3, t + 3, 3, BLACK);
            fillTriangle(l, t + 4, l + 6, t + 4, l + 3, t + 10, BLACK);
            drawPixel(l + 3, t + 3, WHITE);
        } else {
            drawCircle(l + 3, t + 3, 3, BLACK);
            drawLine(l + 1, t + 5, l + 3, t + 10, BLACK);
            drawLine(l + 5, t + 5, l + 3, t + 10, BLACK);
        }
        return w;
    }
    case 'w': { // WLAN: drei Balken; voll = verbunden, hohl = an, nicht verbunden
        if (!wifiOn())
            return 0;
        const int16_t w = 10, l = L(w), base = cy + 5;
        for (int i = 0; i < 3; i++) {
            int16_t bh = 4 + 3 * i, bx = l + i * 4;
            if (wifiConnected())
                fillRect(bx, base - bh, 2, bh, BLACK);
            else
                drawRect(bx, base - bh, 2, bh, BLACK);
        }
        return w;
    }
    case 'l': { // Bluetooth-Rune; Punkt darunter = verbunden
        if (!btOn())
            return 0;
        const int16_t w = 7, l = L(w), t = cy - 5, m = l + 3;
        drawLine(m, t, m, t + 10, BLACK);
        drawLine(m, t, m + 3, t + 3, BLACK);
        drawLine(m + 3, t + 3, l, t + 7, BLACK);
        drawLine(m, t + 10, m + 3, t + 7, BLACK);
        drawLine(m + 3, t + 7, l, t + 3, BLACK);
        if (btConnected())
            fillRect(l + 5, t + 9, 2, 2, BLACK);
        return w;
    }
    case 'k': {
        snprintf(b, sizeof(b), "%uK", (unsigned)nodeDB->getNumOnlineMeshNodes());
        return text(b);
    }
    case 'm': { // Brief mit Anzahl, nur wenn ungelesen
        int u = kiraMessages ? kiraMessages->unread() : 0;
        if (!u)
            return 0;
        snprintf(b, sizeof(b), "%d", u);
        std::string t = parse(b);
        const int16_t ew = 10, tw = getTextWidth(t), w = ew + 2 + tw, l = L(w), et = cy - 4;
        drawRect(l, et, ew, 8, BLACK);
        drawLine(l, et, l + ew / 2, et + 4, BLACK);
        drawLine(l + ew - 1, et, l + ew / 2, et + 4, BLACK);
        printAt(l + ew + 2, 2, t);
        return w;
    }
    case 'r':
        return text(ThinkKira::settings().radioMode == ThinkKira::RADIO_KIRA ? "K" : "M");
    }
    return 0;
}

void Shell::drawTopBar(const std::string &title)
{
    setFont(fontSmall);
    const int16_t h = fontSmall.lineHeight() + 4;
    const char *bar = ThinkKira::settings().bar;
    const char *sep = strchr(bar, '|');
    std::string left(bar, sep ? sep - bar : strlen(bar)), right(sep ? sep + 1 : "");
    int16_t x = 2;
    for (char c : left) {
        int16_t w = drawBarItem(c, x, false, title, h);
        if (w)
            x += w + 4;
    }
    int16_t r = width() - 2;
    for (auto it = right.rbegin(); it != right.rend(); ++it) {
        int16_t w = drawBarItem(*it, r, true, title, h);
        if (w)
            r -= w + 4;
    }
    lastBarSig = barSig();
    drawLine(0, h, width() - 1, h, BLACK);
}

void Shell::drawPageDots()
{
    uint8_t mask = ThinkKira::settings().pages | 0x21;
    int count = 0;
    for (int p = 0; p < P_COUNT; p++)
        if (mask & (1 << p))
            count++;
    const int16_t gap = 12, r = 3, y = height() - 6;
    int16_t x = width() / 2 - (count - 1) * gap / 2;
    const char *o = ThinkKira::settings().order;
    for (int i = 0; i < P_COUNT; i++) {
        int p = o[i] - '0';
        if (!(mask & (1 << p)))
            continue;
        if (p == page)
            fillCircle(x, y, r, BLACK);
        else
            drawCircle(x, y, r, BLACK);
        x += gap;
    }
}

void Shell::onRender(bool)
{
    if (screenOff) {
        drawOff();
        return;
    }
    if (sos != SOS_OFF) {
        drawSos();
        return;
    }
    if (infoOpen) {
        drawInfo();
        return;
    }
    if (!stack.empty()) {
        drawMenu(stack.back());
    } else {
        switch (page) {
        case P_START:
            drawStart();
            break;
        case P_MSG:
            drawMessages();
            break;
        case P_NAV:
            drawNav();
            break;
        case P_MAP:
            drawMap();
            break;
        case P_NODES:
            drawNodes();
            break;
        default:
            drawSettings();
            break;
        }
        drawPageDots();
    }
    if (!toastText.empty()) {
        setFont(fontMedium);
        const int16_t h = fontMedium.lineHeight() + 8, y = height() - h - 14;
        fillRect(6, y, width() - 12, h, WHITE);
        drawRect(6, y, width() - 12, h, BLACK);
        printAt(width() / 2, y + h / 2, parse(toastText), CENTER, MIDDLE);
    }
}

void Shell::drawStart()
{
    drawTopBar("ThinkKira");
    int16_t y = fontSmall.lineHeight() + 10;
    const int16_t lh = fontMedium.lineHeight() + 3;
    char b[48];
    // Bausteine in der Reihenfolge aus dem Designer
    for (const char *w = ThinkKira::settings().start; *w && y < height() - 16; w++) {
        setFont(fontMedium);
        switch (*w) {
        case 'c': { // Uhr groß
            uint32_t t = getValidTime(RTCQualityDevice, true);
            setFont(fontLarge);
            if (t) {
                snprintf(b, sizeof(b), "%02u:%02u", (unsigned)((t / 3600) % 24), (unsigned)((t / 60) % 60));
                printThick(width() / 2, y + fontLarge.lineHeight() / 2 + 4, b, 2, 2);
                y += fontLarge.lineHeight() + 12;
            } else {
                printAt(width() / 2, y, "--:--", CENTER);
                y += fontLarge.lineHeight() + 8;
            }
            continue;
        }
        case 'b':
            if (!powerStatus)
                continue;
            snprintf(b, sizeof(b), "Akku %u%%%s", powerStatus->getBatteryChargePercent(), powerStatus->getHasUSB() ? " (USB)" : "");
            break;
        case 'g':
            if (!gpsStatus)
                continue;
            if (gpsStatus->getHasLock())
                snprintf(b, sizeof(b), "GPS: Fix, %u Sat.", (unsigned)gpsStatus->getNumSatellites());
            else
                snprintf(b, sizeof(b), "GPS: %s", gpsStatus->getIsConnected() ? "sucht …" : "aus");
            break;
        case 's': {
            const RadioStats &rs = radioStats();
            if (rs.heard[0].atMs)
                snprintf(b, sizeof(b), "Signal: %d dBm (vor %s)", rs.heard[0].rssi, ago(millis() - rs.heard[0].atMs).c_str());
            else
                snprintf(b, sizeof(b), "Signal: noch nichts gehört");
            break;
        }
        case 'k':
            snprintf(b, sizeof(b), "Knoten online: %u", (unsigned)nodeDB->getNumOnlineMeshNodes());
            break;
        case 'n': {
            int unread = kiraMessages ? kiraMessages->unread() : 0;
            snprintf(b, sizeof(b), unread ? "Ungelesen: %d" : "Keine neuen Nachrichten", unread);
            break;
        }
        case 'm':
            snprintf(b, sizeof(b), "Funk: %s", radioModeName(ThinkKira::settings().radioMode));
            break;
        case 't':
            if (!kiraNav || !kiraNav->info().haveTarget)
                continue;
            snprintf(b, sizeof(b), "Ziel %s: %s", kiraNav->target().name,
                     kiraNav->info().havePos ? formatDistance(kiraNav->info().distance).c_str() : "");
            break;
        case 'p':
            if (localPosition.latitude_i || localPosition.longitude_i)
                snprintf(b, sizeof(b), "%.4f N  %.4f O", localPosition.latitude_i * 1e-7, localPosition.longitude_i * 1e-7);
            else
                snprintf(b, sizeof(b), "Position: unbekannt");
            break;
        default:
            continue;
        }
        printAt(4, y, parse(b));
        y += lh;
    }
}

void Shell::drawMessages()
{
    int unread = kiraMessages ? kiraMessages->unread() : 0;
    drawTopBar(unread ? "Nachrichten (" + std::to_string(unread) + ")" : "Nachrichten");
    int16_t y = fontSmall.lineHeight() + 8;
    const int16_t bottom = height() - 14;
    if (!kiraMessages || !kiraMessages->count()) {
        setFont(fontMedium);
        printAt(width() / 2, height() / 2, "Keine Nachrichten", CENTER, MIDDLE);
        return;
    }
    for (int i = 0; i < kiraMessages->count() && y < bottom; i++) {
        const KiraMessage &m = kiraMessages->get(i);
        setFont(fontSmall);
        std::string head = m.outgoing ? "Ich > " + nodeName(m.to) : nodeName(m.from);
        head += "  " + ago(millis() - m.atMs);
        printAt(2, y, head);
        y += fontSmall.lineHeight() + 1;
        setFont(fontMedium);
        std::string body = parse(m.text);
        uint32_t h = getWrappedTextHeight(2, width() - 4, body);
        if (y + (int32_t)h > bottom) {
            setCrop(0, y, width(), bottom - y);
            printWrapped(2, y, width() - 4, body);
            resetCrop();
            break;
        }
        printWrapped(2, y, width() - 4, body);
        y += h + 4;
    }
}

// Großer Pfeil: Spitze zeigt in Richtung angle (Grad, 0 = oben)
void Shell::drawArrow(int16_t cx, int16_t cy, int16_t r, float angle)
{
    float a = angle * (float)M_PI / 180.0f;
    auto pt = [&](float ang, float len, int16_t &x, int16_t &y) {
        x = cx + (int16_t)(sinf(ang) * len);
        y = cy - (int16_t)(cosf(ang) * len);
    };
    int16_t tx, ty, lx, ly, rx, ry, bx, by;
    pt(a, r, tx, ty);                     // Spitze
    pt(a + 2.5f, r * 0.8f, lx, ly);       // links hinten
    pt(a - 2.5f, r * 0.8f, rx, ry);       // rechts hinten
    pt(a + (float)M_PI, r * 0.35f, bx, by); // Kerbe
    fillTriangle(tx, ty, lx, ly, bx, by, BLACK);
    fillTriangle(tx, ty, rx, ry, bx, by, BLACK);
}

void Shell::drawNav()
{
    drawTopBar(kiraNav && kiraNav->tracking() ? "Navigation  [Track]" : "Navigation");
    const int16_t top = fontSmall.lineHeight() + 6;
    char b[48];
    if (!kiraNav || !kiraNav->info().havePos) {
        setFont(fontMedium);
        printAt(width() / 2, height() / 2 - 10, "Keine GPS-Position", CENTER, MIDDLE);
        setFont(fontSmall);
        printAt(width() / 2, height() / 2 + 12, parse("Unter freiem Himmel warten …"), CENTER, MIDDLE);
        return;
    }
    const NavInfo &n = kiraNav->info();
    const int16_t cx = width() / 2, cy = top + 62, r = 50;
    if (n.haveTarget) {
        setFont(fontSmall);
        printAt(cx, top + 2, parse(std::string("Ziel: ") + kiraNav->target().name), CENTER);
        // in Bewegung: relativ zur Laufrichtung; im Stand: Peilung mit Norden oben
        float ang = n.moving ? n.bearing - n.course : n.bearing;
        drawArrow(cx, cy + 6, r - 6, ang);
        if (!n.moving) {
            printAt(cx, cy - r + 6, "N", CENTER);
        }
        setFont(fontLarge);
        printAt(cx, cy + r + 4, formatDistance(n.distance), CENTER);
        setFont(fontSmall);
        int16_t y = cy + r + 4 + fontLarge.lineHeight() + 2;
        if (n.moving) {
            uint32_t m = n.etaSec / 60;
            if (m >= 60)
                snprintf(b, sizeof(b), "%u°  ·  %.1f km/h  ·  %uh %02um", (unsigned)n.bearing, n.speedKmh, (unsigned)(m / 60), (unsigned)(m % 60));
            else
                snprintf(b, sizeof(b), "%u°  ·  %.1f km/h  ·  %u min", (unsigned)n.bearing, n.speedKmh, (unsigned)m);
        } else
            snprintf(b, sizeof(b), "%u° (Norden oben) · Gehe los für Richtung", (unsigned)n.bearing);
        printAt(cx, y, parse(b), CENTER);
        return;
    }
    // Kompass ohne Ziel: Pfeil zeigt nach Norden relativ zur Laufrichtung
    setFont(fontSmall);
    printAt(cx, top + 2, n.moving ? "Kompass (aus GPS-Kurs)" : "Kompass", CENTER);
    if (n.moving) {
        drawArrow(cx, cy + 6, r - 6, -n.course);
        printAt(cx, cy + 6 - r - 2, "N", CENTER);
        setFont(fontLarge);
        snprintf(b, sizeof(b), "%u°", (unsigned)n.course);
        printAt(cx, cy + r + 4, b, CENTER);
    } else {
        setFont(fontLarge);
        printAt(cx, cy, "Stand", CENTER, MIDDLE);
        setFont(fontSmall);
        printAt(cx, cy + 22, parse("Gehe los für Richtung"), CENTER, MIDDLE);
    }
    setFont(fontSmall);
    snprintf(b, sizeof(b), "%.5f  %.5f", localPosition.latitude_i * 1e-7, localPosition.longitude_i * 1e-7);
    printAt(cx, height() - 26, b, CENTER);
}

// Kartenmitte: frei verschoben, sonst eigene Position, sonst Mitte der Karte
bool Shell::mapCenter(int32_t &lat, int32_t &lon)
{
    if (mapFree) {
        lat = mapLat;
        lon = mapLon;
        return true;
    }
    if (localPosition.latitude_i || localPosition.longitude_i) {
        lat = localPosition.latitude_i;
        lon = localPosition.longitude_i;
        return true;
    }
    KiraMapFile &mf = mapFile();
    if (!mf.available())
        return false;
    lat = mf.header().latMin / 2 + mf.header().latMax / 2;
    lon = mf.header().lonMin / 2 + mf.header().lonMax / 2;
    return true;
}

void Shell::mapCenterHere()
{
    mapCenter(mapLat, mapLon);
}

void Shell::drawMap()
{
    static const char *const DIRS[] = {"Nord", "Ost", "Süd", "West"};
    KiraMapFile &mf = mapFile();
    int32_t cLat, cLon;
    bool haveCenter = mapCenter(cLat, cLon);
    const float scale = MAP_SCALES[mapZoom]; // Meter pro Pixel
    const int16_t top = fontSmall.lineHeight() + 5;
    const int16_t cx = width() / 2, cy = top + (height() - top) / 2;
    const NavInfo *nav = kiraNav ? &kiraNav->info() : nullptr;
    const float rot = (mapCourseUp && nav && nav->moving && !mapFree) ? nav->course * (float)M_PI / 180 : 0;
    const float cosLat = cosf(cLat * 1e-7f * (float)M_PI / 180);
    const float sr = sinf(rot), cr = cosf(rot);
    // Breite/Länge (1e-7) → Bildschirm
    auto toScreen = [&](double lat, double lon, int16_t &x, int16_t &y) {
        float dx = (float)((lon - cLon * 1e-7) * 111320.0 * cosLat) / scale;
        float dy = (float)((lat - cLat * 1e-7) * 110540.0) / scale;
        float rx = dx * cr - dy * sr, ry = dx * sr + dy * cr;
        x = cx + (int16_t)rx;
        y = cy - (int16_t)ry;
    };

    if (!mf.available()) {
        drawTopBar("Karte");
        setFont(fontMedium);
        printWrapped(8, height() / 2 - 30, width() - 16, parse("Keine Offline-Karte im Gerät."));
        setFont(fontSmall);
        printWrapped(8, height() / 2 + 4, width() - 16, parse("Hochladen über den Konfigurator: ThinkKira → Offline-Karte."));
        return;
    }
    if (haveCenter) {
        const MapHeader &h = mf.header();
        const float tileLat = 0.01f, tileLon = 0.015f;
        float radius = scale * 150; // Meter bis zur Bildschirmecke (mit Rand)
        float dLat = radius / 110540.0f, dLon = radius / (111320.0f * cosLat);
        float la = cLat * 1e-7f, lo = cLon * 1e-7f;
        int tx0 = (int)floorf((lo - dLon - h.lonMin * 1e-7f) / tileLon), tx1 = (int)floorf((lo + dLon - h.lonMin * 1e-7f) / tileLon);
        int ty0 = (int)floorf((la - dLat - h.latMin * 1e-7f) / tileLat), ty1 = (int)floorf((la + dLat - h.latMin * 1e-7f) / tileLat);
        std::vector<uint8_t> t;
        setFont(fontSmall);
        for (int ty = std::max(0, ty0); ty <= std::min((int)h.ny - 1, ty1); ty++)
            for (int tx = std::max(0, tx0); tx <= std::min((int)h.nx - 1, tx1); tx++) {
                if (!mf.readTile(tx, ty, t))
                    continue;
                double oLat = h.latMin * 1e-7 + ty * (double)tileLat, oLon = h.lonMin * 1e-7 + tx * (double)tileLon;
                size_t p = 0;
                while (p + 3 <= t.size()) {
                    uint8_t type = t[p];
                    uint16_t n = t[p + 1] | (t[p + 2] << 8);
                    p += 3;
                    if (p + 4u * n > t.size())
                        break;
                    // je Zoomstufe nur passende Objekte zeigen
                    bool show = !((mapZoom >= 1 && (type == MT_PATH || type == MT_POI)) ||
                                  (mapZoom >= 2 && (type == MT_TRACK || type == MT_RESIDENTIAL || type == MT_SUBURB || type == MT_VILLAGE)));
                    int32_t qa = 0, qo = 0;
                    int16_t px = 0, py = 0;
                    for (uint16_t i = 0; i < n; i++, p += 4) {
                        qa += (int16_t)(t[p] | (t[p + 1] << 8));
                        qo += (int16_t)(t[p + 2] | (t[p + 3] << 8));
                        int16_t x, y;
                        toScreen(oLat + qa * 1e-5, oLon + qo * 1e-5, x, y);
                        if (i && show) {
                            if (type == MT_RAIL || type == MT_TRACK || type == MT_PATH) {
                                // gestrichelt: nur jeden zweiten Abschnitt halb zeichnen
                                drawLine(px, py, (px + x) / 2, (py + y) / 2, BLACK);
                            } else {
                                drawLine(px, py, x, y, BLACK);
                                if (type == MT_MAJOR || type == MT_WATERWAY)
                                    drawLine(px + 1, py, x + 1, y, BLACK);
                            }
                        }
                        px = x;
                        py = y;
                    }
                    if (type >= MT_CITY) { // Name
                        if (p >= t.size())
                            break;
                        uint8_t len = t[p++];
                        if (p + len > t.size())
                            break;
                        if (show && px > 0 && px < width() && py > top && py < height())
                            printAt(px, py, parse(std::string((const char *)&t[p], len)), CENTER, MIDDLE);
                        p += len;
                    }
                }
            }

        // Wegpunkte und Linie zum Ziel
        if (kiraNav) {
            for (const Waypoint &w : kiraNav->waypoints()) {
                int16_t x, y;
                toScreen(w.lat * 1e-7, w.lon * 1e-7, x, y);
                if (x > 2 && x < width() - 2 && y > top && y < height() - 2) {
                    fillRect(x - 2, y - 2, 5, 5, BLACK);
                    if (mapZoom == 0)
                        printAt(x + 4, y, parse(w.name), LEFT, MIDDLE);
                }
            }
            if (nav && nav->haveTarget && nav->havePos) {
                int16_t x1, y1, x2, y2;
                toScreen(localPosition.latitude_i * 1e-7, localPosition.longitude_i * 1e-7, x1, y1);
                toScreen(kiraNav->target().lat * 1e-7, kiraNav->target().lon * 1e-7, x2, y2);
                for (int k = 0; k < 20; k += 2) // gestrichelt
                    drawLine(x1 + (x2 - x1) * k / 20, y1 + (y2 - y1) * k / 20, x1 + (x2 - x1) * (k + 1) / 20,
                             y1 + (y2 - y1) * (k + 1) / 20, BLACK);
                drawCircle(x2, y2, 5, BLACK);
            }
        }
        // eigene Position
        if (localPosition.latitude_i || localPosition.longitude_i) {
            int16_t x, y;
            toScreen(localPosition.latitude_i * 1e-7, localPosition.longitude_i * 1e-7, x, y);
            fillCircle(x, y, 5, WHITE);
            drawCircle(x, y, 5, BLACK);
            fillCircle(x, y, 2, BLACK);
        }
        if (mapFree) { // Fadenkreuz in der Mitte
            drawLine(cx - 6, cy, cx + 6, cy, BLACK);
            drawLine(cx, cy - 6, cx, cy + 6, BLACK);
        }
    }

    // Kopfzeile + Maßstab + Hinweise über der Karte
    fillRect(0, 0, width(), top, WHITE);
    char b[40];
    snprintf(b, sizeof(b), "Karte  %s%s", formatDistance(scale * 50).c_str(), rot != 0 ? "  (Laufr.)" : "");
    drawTopBar(b);
    drawLine(4, height() - 4, 54, height() - 4, BLACK); // Maßstab: 50 Pixel
    drawLine(4, height() - 7, 4, height() - 1, BLACK);
    drawLine(54, height() - 7, 54, height() - 1, BLACK);
    setFont(fontSmall);
    printAt(width() - 2, height() - 2, parse("© OSM"), RIGHT, BOTTOM);
    if (mapPan) {
        std::string hint = std::string("Schieben: ") + DIRS[mapDir] + "  ·  Zurück = Richtung";
        fillRect(0, top + 1, width(), fontSmall.lineHeight() + 3, WHITE);
        printAt(cx, top + 2, parse(hint), CENTER);
    }
}

void Shell::drawNodes()
{
    drawTopBar("Knoten (" + std::to_string(nodeDB->getNumOnlineMeshNodes()) + " online)");
    std::vector<meshtastic_NodeInfoLite *> list;
    for (size_t i = 0; i < nodeDB->getNumMeshNodes(); i++) {
        meshtastic_NodeInfoLite *n = nodeDB->getMeshNodeByIndex(i);
        if (n && n->num != nodeDB->getNodeNum())
            list.push_back(n);
    }
    std::sort(list.begin(), list.end(), [](auto *a, auto *b) { return a->last_heard > b->last_heard; });
    setFont(fontSmall);
    int16_t y = fontSmall.lineHeight() + 8;
    const int16_t lh = fontSmall.lineHeight() + 4, bottom = height() - 14;
    uint32_t now = getValidTime(RTCQualityDevice);
    if (list.empty()) {
        setFont(fontMedium);
        printAt(width() / 2, height() / 2, "Noch keine Knoten", CENTER, MIDDLE);
        return;
    }
    for (auto *n : list) {
        if (y + lh > bottom)
            break;
        printAt(2, y, nodeName(n->num));
        char b[32];
        std::string right;
        if (n->has_hops_away && n->hops_away) {
            snprintf(b, sizeof(b), "%u Spr. ", (unsigned)n->hops_away);
            right += b;
        } else {
            snprintf(b, sizeof(b), "%.0fdB ", n->snr);
            right += b;
        }
        if (n->last_heard && now > n->last_heard)
            right += ago((now - n->last_heard) * 1000);
        printAt(width() - 2, y, parse(right), RIGHT);
        y += lh;
    }
}

void Shell::drawSettings()
{
    drawTopBar("Einstellungen");
    setFont(fontMedium);
    int16_t y = fontSmall.lineHeight() + 10;
    const int16_t lh = fontMedium.lineHeight() + 4;
    printAt(4, y, std::string("Funk: ") + radioModeName(ThinkKira::settings().radioMode));
    y += lh;
    static const char *const LIGHT[] = {"aus", "bei Taste", "immer"};
    printAt(4, y, std::string("Licht: ") + LIGHT[ThinkKira::settings().light]);
    y += lh;
    printAt(4, y, parse(config.device.buzzer_mode == meshtastic_Config_DeviceConfig_BuzzerMode_DISABLED ? "Töne: aus" : "Töne: an"));
    y += lh;
    printAt(4, y, config.bluetooth.enabled ? "Bluetooth: an" : "Bluetooth: aus");
    y += lh + 6;
    setFont(fontSmall);
    printWrapped(4, y, width() - 8, parse("Lang drücken öffnet das Menü."));
}

void Shell::drawMenu(const Menu &m)
{
    drawTopBar(m.title);
    setFont(fontMedium);
    const int16_t rowH = fontMedium.lineHeight() + 6;
    const int16_t top = fontSmall.lineHeight() + 6;
    const int visible = (height() - top - 2) / rowH;
    int first = 0;
    if (m.sel >= visible)
        first = m.sel - visible + 1;
    for (int i = first; i < (int)m.items.size() && i < first + visible; i++) {
        int16_t y = top + (i - first) * rowH;
        if (i == m.sel) {
            fillRect(0, y, width(), rowH, BLACK);
            setTextColor(WHITE);
        }
        printAt(6, y + rowH / 2, parse(m.items[i].label), LEFT, MIDDLE);
        setTextColor(BLACK);
    }
    drawScrollHints(first > 0, first + visible < (int)m.items.size());
}

void Shell::drawInfo()
{
    drawTopBar(infoTitle);
    setFont(fontMedium);
    int16_t y = fontSmall.lineHeight() + 10;
    for (const std::string &l : infoLines) {
        if (y > height() - 20)
            break;
        uint32_t h = getWrappedTextHeight(4, width() - 8, parse(l));
        printWrapped(4, y, width() - 8, parse(l));
        y += h + 2;
    }
    setFont(fontSmall);
    printAt(width() / 2, height() - 12, "Taste = zurück", CENTER);
}

void Shell::drawSos()
{
    fillRect(0, 0, width(), height(), BLACK);
    setTextColor(WHITE);
    setFont(fontLarge);
    printThick(width() / 2, height() / 3, "SOS", 3, 3);
    setFont(fontMedium);
    if (sos == SOS_COUNTDOWN) {
        uint32_t left = SOS_COUNTDOWN_MS - std::min(SOS_COUNTDOWN_MS, millis() - sosStart);
        char b[40];
        snprintf(b, sizeof(b), "Sende in %u s", (unsigned)((left + 999) / 1000));
        printAt(width() / 2, height() / 2 + 10, b, CENTER, MIDDLE);
        printAt(width() / 2, height() - 30, "Taste = Abbruch", CENTER, MIDDLE);
    } else {
        char b[40];
        snprintf(b, sizeof(b), "Gesendet: %lu x", (unsigned long)sosCount);
        printAt(width() / 2, height() / 2 + 10, b, CENTER, MIDDLE);
        printAt(width() / 2, height() / 2 + 32, "alle 60 s", CENTER, MIDDLE);
        printAt(width() / 2, height() - 30, "Taste = Beenden", CENTER, MIDDLE);
    }
    setTextColor(BLACK);
}

void Shell::drawOff()
{
    setFont(fontMedium);
    printAt(width() / 2, height() / 2 - 10, "ThinkKira", CENTER, MIDDLE);
    setFont(fontSmall);
    printAt(width() / 2, height() / 2 + 12, "Taste = Bildschirm an", CENTER, MIDDLE);
}

} // namespace ThinkKira

#endif
