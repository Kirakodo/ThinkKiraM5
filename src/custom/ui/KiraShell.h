// ThinkKira – eigene Oberfläche: 6 Seiten im Kreis, Menüs mit max. 2 Ebenen, SOS, Ausschalten.
// Tasten:
//   Haupttaste: kurz = nächste Seite / nächster Eintrag, lang (0,5 s) = Menü öffnen / auswählen, 4 s = Ausschalten
//   Zweittaste: kurz = vorherige Seite / eine Ebene zurück, lang (0,5 s) = Startseite, 3 s = SOS (5 s Countdown)
// SPDX-License-Identifier: GPL-3.0-only
#pragma once

#if defined(THINKKIRA) && defined(MESHTASTIC_INCLUDE_INKHUD)

#include "concurrency/OSThread.h"
#include "custom/core/KiraMenu.h"
#include "graphics/niche/InkHUD/Applet.h"
#include <functional>
#include <string>
#include <vector>

namespace ThinkKira
{

class Shell : public NicheGraphics::InkHUD::Applet, private concurrency::OSThread
{
  public:
    Shell(uint8_t mainPin, uint8_t auxPin, std::function<void(bool)> backlight);
    static Shell *instance;

    void onRender(bool full) override;
    void onActivate() override;
    void onForeground() override;
    void onButtonShortPress() override; // Haupttaste kurz (über InkHUD)
    void onButtonLongPress() override;  // Haupttaste lang (über InkHUD)
    void auxShort();                    // Zweittaste kurz (direkt aus nicheGraphics.h)
    void auxLong();                     // Zweittaste lang
    void keyDown();                     // jede Taste gedrückt (Licht, Halten messen)

    enum Page : uint8_t { P_START, P_MSG, P_NAV, P_MAP, P_NODES, P_SET, P_COUNT };
  private:
    struct Item {
        std::string label;
        std::function<void()> action;
    };
    struct Menu {
        std::string title;
        std::vector<Item> items;
        int sel = 0;
    };
    enum SosState : uint8_t { SOS_OFF, SOS_COUNTDOWN, SOS_ACTIVE };

    int32_t runOnce() override;

    // Navigation
    void changePage(int dir);
    void goHome();
    void openPageMenu();
    void pushMenu(const Menu &m);
    void closeMenus();
    void showInfo(const std::string &title, const std::vector<std::string> &lines);
    void toast(const std::string &text);
    bool consumeSpecial(); // SOS abbrechen, Info schließen, Bildschirm wecken
    void redraw(bool full = false);

    // Menüs der Seiten
    Menu buildMenu(const std::string &title, const std::vector<MenuEntry> &entries);
    bool runAction(const std::string &id);
    std::string actionLabel(const std::string &id);
    void gesture(char role); // Rolle aus der Tastenbelegung ausführen
    Menu menuQuickReplies(uint32_t to, uint8_t channel, const std::string &title);
    Menu menuNodeList();
    Menu menuNode(uint32_t num);

    // Zeichnen
    void drawTopBar(const std::string &title);
    void drawPageDots();
    void drawStart();
    void drawMessages();
    void drawNav();
    void drawMap();
    void drawNodes();
    void drawSettings();
    void drawMenu(const Menu &m);
    void drawInfo();
    void drawSos();
    void drawOff();

    // Aktionen
    void setLight(bool on);
    void lightActivity();
    void startSos();
    void stopSos();
    void sendSos();
    std::string nodeName(uint32_t num);
    std::string ago(uint32_t ms);

    uint8_t mainPin, auxPin;
    std::function<void(bool)> backlight;
    bool lightOn = false;
    uint32_t lightUntil = 0;

    Page page = P_START;
    std::vector<Menu> stack; // leer = Seitenansicht; max. 2 Ebenen
    bool infoOpen = false;
    std::string infoTitle;
    std::vector<std::string> infoLines;
    std::string toastText;
    uint32_t toastUntil = 0;
    bool screenOff = false;

    SosState sos = SOS_OFF;
    uint32_t sosStart = 0, sosLastSend = 0;
    uint32_t sosCount = 0;

    uint32_t mainDownAt = 0, auxDownAt = 0;
    bool holdHandled = false;
    uint32_t lastMinute = 0;
    int lastMsgCount = -1;
    int lastUnread = -1;
    uint8_t lastUiRev = 0;
};

} // namespace ThinkKira

#endif
