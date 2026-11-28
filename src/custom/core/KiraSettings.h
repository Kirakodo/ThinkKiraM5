// ThinkKira – eigene Einstellungen (LittleFS /kira/settings.txt, Zeilen "schluessel=wert").
// Bewusst einfach gehalten, damit die Datei auch von Hand lesbar ist.
// SPDX-License-Identifier: GPL-3.0-only
#pragma once
#include <stdint.h>

namespace ThinkKira
{

enum RadioMode : uint8_t { RADIO_MESHTASTIC = 0, RADIO_KIRA = 1 };

// Sync-Words: Meshtastic 0x2B. Kira-Funk 0x24 (nicht 0x12, das nutzen MeshCore und viele LoRa-Bastelprojekte).
constexpr uint8_t SYNC_MESHTASTIC = 0x2b;
constexpr uint8_t SYNC_KIRA = 0x24;

enum LightMode : uint8_t { LIGHT_OFF = 0, LIGHT_ON_KEY = 1, LIGHT_ALWAYS = 2 };

struct Settings {
    RadioMode radioMode = RADIO_MESHTASTIC;
    LightMode light = LIGHT_ON_KEY; // Hintergrundlicht
    bool leds = true;               // LED-Hinweise (blaue LED bei Nachricht)
    uint8_t pages = 0x3F;           // Seiten ein/aus (Bit 0 = Start … Bit 5 = Einstellungen)
    // Designer (Konfigurator): Reihenfolge der Seiten als Ziffern 0–5, Bausteine der Startseite, Schnellantworten
    char order[7] = "012345";
    char start[12] = "cbgsknm"; // c Uhr, b Akku, g GPS, s Signal, k Knoten, n Nachrichten, m Funkmodus, p Position
    uint8_t uiRev = 0; // wird bei Designer-Änderung erhöht, die Oberfläche zeichnet dann neu (nicht gespeichert)
    char replies[170] = "OK;Ja;Nein;Bin unterwegs;Komme gleich;Alles gut;Wo bist du?;Brauche Hilfe";
};

// Prüft und übernimmt Designer-Werte; false, wenn etwas ungültig ist
bool setOrder(const char *order);
bool setStart(const char *start);
bool setReplies(const char *replies);

Settings &settings();   // lädt beim ersten Aufruf aus dem Dateisystem
bool saveSettings();    // schreibt die aktuelle Einstellung
const char *radioModeName(RadioMode m);
uint8_t radioSyncWord(); // vom Funktreiber beim Start abgefragt (Hook in RadioLibInterface.h)

} // namespace ThinkKira
