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

struct Settings {
    RadioMode radioMode = RADIO_MESHTASTIC;
};

Settings &settings();   // lädt beim ersten Aufruf aus dem Dateisystem
bool saveSettings();    // schreibt die aktuelle Einstellung
const char *radioModeName(RadioMode m);
uint8_t radioSyncWord(); // vom Funktreiber beim Start abgefragt (Hook in RadioLibInterface.h)

} // namespace ThinkKira
