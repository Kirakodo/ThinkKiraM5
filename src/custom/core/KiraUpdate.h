// ThinkKira – Updates aus GitHub-Releases. Bei WLAN prüft das Gerät die neueste Version (Weiterleitung von
// releases/latest, keine API-Grenzen). Installiert wird nur nach Bestätigung: Zugang und Adresse kommen in NVS,
// dann startet der Updater aus der Partition „flashApp“ (Ordner updater/), lädt die Firmware und startet neu.
// SPDX-License-Identifier: GPL-3.0-only
#pragma once
#include <string>

namespace ThinkKira
{

enum class UpdState { IDLE, CHECKING, NONE, AVAILABLE, ERROR };

struct UpdateInfo {
    UpdState state = UpdState::IDLE;
    std::string latest; // z. B. "0.5.0"
    std::string error;
};

const UpdateInfo &updateInfo();
bool versionNewer(const std::string &a, const std::string &b); // a neuer als b?
bool updateCheckNow();                     // im Hintergrund prüfen; false ohne WLAN
void updateAutoCheck();                    // regelmäßig aufrufen: prüft kurz nach WLAN-Verbindung und dann alle 12 h
bool updateInstall(std::string &error);    // startet den Updater (Neustart); false bei Fehler
std::string updateLastResult();            // Ergebnis des letzten Updates ("ok", "fail:…" oder leer), einmalig

} // namespace ThinkKira
