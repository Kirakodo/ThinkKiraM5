// ThinkKira – Menüs der 6 Seiten als Daten (aus dem Designer), gespeichert in LittleFS /kira/menu.txt.
// Textformat, eine Zeile je Eintrag:
//   P<seite>            Beginn des Menüs einer Seite (0–5)
//   I<aktion>|<text>    Eintrag; leerer Text = Standardtext der Aktion (zeigt z. B. „Licht an/aus“ passend an)
//   S<text>             Beginn eines Untermenüs (zweite Ebene)
//   E                   Ende des Untermenüs
// SPDX-License-Identifier: GPL-3.0-only
#pragma once
#include <string>
#include <vector>

namespace ThinkKira
{

struct MenuEntry {
    std::string action; // leer = Untermenü
    std::string label;
    std::vector<MenuEntry> sub;
};

constexpr int MENU_PAGES = 6;
constexpr size_t MENU_MAX_TEXT = 3000; // Obergrenze für die Datei

extern const char *const DEFAULT_MENU;

std::vector<MenuEntry> &pageMenu(int page); // lädt beim ersten Aufruf
bool parseMenu(const std::string &text, std::vector<MenuEntry> (&out)[MENU_PAGES], std::string &error);
std::string menuText();                   // aktuelle Menüs als Text
bool setMenuText(const std::string &text, std::string &error); // prüfen, speichern, übernehmen
bool resetMenu();                         // Datei löschen → Standard
bool isKnownAction(const std::string &id);

} // namespace ThinkKira
