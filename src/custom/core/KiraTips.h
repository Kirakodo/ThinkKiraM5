// ThinkKira – eigene Tipps, die nach dem Start nacheinander angezeigt werden (aus dem Designer).
// Gespeichert in LittleFS /kira/tips.txt, eine Zeile je Eintrag:
//   T<titel>   Beginn eines Tipps
//   L<text>    eine Textzeile des Tipps
// SPDX-License-Identifier: GPL-3.0-only
#pragma once
#include <string>
#include <vector>

namespace ThinkKira
{

struct Tip {
    std::string title;
    std::string text; // Zeilen mit \n getrennt
};

constexpr size_t TIPS_MAX_TEXT = 2000;
constexpr size_t TIPS_MAX_COUNT = 8;

const std::vector<Tip> &tips(); // lädt beim ersten Aufruf
bool parseTips(const std::string &text, std::vector<Tip> &out, std::string &error);
std::string tipsText();
bool setTipsText(const std::string &text, std::string &error); // prüfen, speichern, übernehmen (leer = keine Tipps)

} // namespace ThinkKira
