// ThinkKira – zentrale Schalter für eigene Funktionen.
// Jede Funktion lässt sich im Build abschalten, z. B. -DCUSTOM_FEATURE_STATUS_PAGE=0
// SPDX-License-Identifier: GPL-3.0-only
#pragma once

#define THINKKIRA_VERSION "0.1.0"

// Phase 1
#ifndef CUSTOM_FEATURE_STATUS_PAGE
#define CUSTOM_FEATURE_STATUS_PAGE 1 // Statusseite (Version, GPS-Version, Akku, Speicher)
#endif
#ifndef CUSTOM_FEATURE_SERIAL_CONSOLE
#define CUSTOM_FEATURE_SERIAL_CONSOLE 1 // Textbefehle "kira ..." über USB-Seriell
#endif
#ifndef CUSTOM_FEATURE_BOOT_REPORT
#define CUSTOM_FEATURE_BOOT_REPORT 1 // Hardware-Bericht im Boot-Log
#endif
