# ThinkKira – Umsetzungsplan

Stand: 27.11.2026 · Gerät: Elecrow ThinkNode M5 · Basis: `meshtastic/firmware` (Branch `develop`)

## Grundsätze

- **Upstream bleibt mergebar.** Meshtastic ist als Remote `upstream` eingebunden. Updates holen:
  `git fetch upstream && git merge upstream/develop`.
- **Eigener Code nur in `src/custom/`**, eigene Env `thinknode_m5_custom` in
  `variants/esp32s3/ELECROW-ThinkNode-M5/platformio-custom.ini` (bzw. eigener Ordner
  `variants/esp32s3/ThinkKira-M5/`). Eingriffe in Meshtastic-Dateien nur als kleine,
  mit `// THINKKIRA` markierte Hooks, gesammelt in `docs/UPSTREAM-PATCHES.md`.
- **Jede Funktion per Flag abschaltbar**: `-DCUSTOM_FEATURE_xxx=1/0`, zentral in
  `src/custom/features.h`.
- **Pins nur aus `variant.h`** bzw. `variant.cpp` (GPS-Erkennung), nichts geraten.
- **Build-Gate je Phase**: `pio run -e thinknode_m5_custom` grün → Commit → PR nach `main`
  → Sven testet am Gerät → Merge.
- **Lizenz**: GPL-3.0 (wie Meshtastic).

## Technische Entscheidungen

| Thema | Entscheidung | Grund |
|---|---|---|
| UI-Basis | Eigene Oberfläche auf dem **InkHUD-Framework** von Meshtastic (eigene Applets + eigenes Menü in `src/custom/ui/`), BaseUI wird nicht gebaut | InkHUD ist für E-Ink gebaut (Teil-/Voll-Refresh-Steuerung, Tasten, Applets), M5 wird dort schon unterstützt. Spart Flash gegenüber BaseUI + eigener UI. |
| Flash-Aufteilung | Eigene Partitionstabelle `partitions-thinkkira.csv`. Größen erst nach Messung in Phase 1 festlegen | Meshtastic-Standard: App 2,3 MB, OTA-Loader 640 KB, Dateisystem 1 MB. Die 1 MB werden schon für Einstellungen/Knoten genutzt, Karte passt da nicht mit rein. |
| Karte | Eigene Datenpartition `map` (Ziel 1 MB, Rohdaten, kein Dateisystem) | Schnelles Lesen per `esp_partition_read`, kein LittleFS-Overhead |
| Wegpunkte, Tracks | LittleFS (`/kira/wp.json`, `/kira/tracks/*.gpx`) | wie im Prompt |
| Eigene Einstellungen | Eigenes Protobuf `thinkkira.proto`, PortNum **287** (privater Bereich 256–511), gespeichert in LittleFS | Keine Meshtastic-Felder zweckentfremden |
| Eigenes LoRa-Protokoll | Gleicher SX1262-Treiber (RadioLib), anderes Sync-Word (`0x12` statt `0x2B`) und eigene Frequenz innerhalb EU_868 | stört das Meshtastic-Netz nicht |
| GitHub Actions | Die ~30 Meshtastic-Workflows werden gelöscht, dafür eine eigene Action `thinkkira.yml` (Build der eigenen Env, später Release + Web) | Die Upstream-Matrix baut >100 Boards bei jedem PR und braucht Secrets |
| Branches | Je Phase ein PR nach `main` (Branch `claude/project-thread-ltxbnh`, nach jedem Merge neu ab `main`) | |

## Phasen

### Phase 1 – Grundlage
1. Upstream-Merge (erledigt), Submodule, eigene Actions.
2. Env `thinknode_m5_custom` (erbt von `thinknode_m5-inkhud`), `src/custom/features.h`, Region EU_868 und Name „ThinkKira“ als Voreinstellung (`userPrefs`).
3. Statusseite (Applet) mit Version, GPS-Version v1.0/v2.0, Akku, PSRAM, freier Flash.
4. Serielle Konsole: Boot-Report (PSRAM, Flash-Größe, GPS-Version, freier Speicher) + Befehle `kira help|info|reboot`.
5. Flash messen → Partitionsgrößen festlegen.
**Test am Gerät:** flashen, Boot-Log lesen (PSRAM, GPS-Version), Statusseite anschauen, Meshtastic-App verbindet.

### Phase 2 – Funk & Mesh
- Meshtastic-Modus = Standard (Relay, AES unverändert aus Meshtastic).
- Eigener Modus „Kira-Funk“ umschaltbar (Reboot beim Wechsel), eigener Sync-Word/Kanal.
- Funk-Statistik: RSSI/SNR letzter Pakete, Zähler RX/TX/Fehler, Reichweitentest (Ping/Pong mit Zähler).
**Test:** Nachricht mit zweitem Meshtastic-Gerät, Modus wechseln, Statistik prüfen.

### Phase 3 – Eigene Oberfläche
- 6 Seiten im Kreis, Menüs max. 2 Ebenen, Tastenbelegung wie im Prompt (kurz/0,5 s/4 s bzw. kurz/0,5 s/3 s SOS).
- Licht, Buzzer, LEDs einstellbar. Teil-Refresh, Voll-Refresh höchstens alle 10 Teil-Refreshes.
- Drehschalter wird nicht benutzt (nicht am ESP32).
**Test:** alle Seiten/Menüs durchklicken, Ausschalten 4 s, Ghosting beurteilen.

### Phase 4 – GPS, Kompass, Wegpunkte, Karte
- Position senden, GPS-Zeit → RTC.
- Kompass aus GPS-Kurs (ab 1,5 km/h, sonst „Stand“), Pfeil max. 1×/s.
- Track als GPX in LittleFS.
- Wegpunkte (≥ 50, JSON), Navigation mit Pfeil/Entfernung/ETA, Ankunftsradius 20 m, Ziel überlebt Neustart.
- Offline-Karte: `tools/mapgen/` (Python, Overpass/PBF → Kacheln, int16-Deltas, Douglas-Peucker, Detailstufen bis Budget passt), Renderer mit 2–3 Zoomstufen, Norden oben / Laufrichtung. Gebiet Potsdam–Ludwigsfelde. © OpenStreetMap-Mitwirkende.
**Test:** draußen gehen: Kompass, Wegpunkt anlegen + hinnavigieren, Karte vergleichen.

### Phase 5 – Verbindungen
- Bluetooth mit Meshtastic-App (bleibt). WLAN-Webseite (Einstellungen, Wegpunkte, GPX, Karten-Upload), OTA über WLAN, MQTT aus Meshtastic.
- Umschalter „Bluetooth“ / „WLAN“ (nicht gleichzeitig).
- **Auto-Updater aus GitHub Releases**: bei WLAN prüft das Gerät `releases/latest` (Version aus `manifest.json`),
  lädt `thinkkira-m5.bin` per HTTPS und schreibt es über einen eigenen kleinen Update-Loader in der 640-KB-OTA-Partition
  (bei 4 MB Flash passt kein zweites volles App-Abbild). Menü „System → Update suchen“ + automatische Prüfung; Installation erst nach Bestätigung per Taste (Sven, 28.11.2026).
- Alle Updates kommen ausschließlich aus GitHub Releases (Web-Flasher, Configurator-Hinweis, Gerät).
**Test:** App, Webseite im Heimnetz, OTA-Update.

### Phase 6 – Strom
- Deep Sleep, Aufwachen per Zweittaste/LoRa-Interrupt; GPS-Abschaltung wie `variant.cpp`.
- Profile „Wandern“, „Basis“, „Maximal sparen“.
**Test:** Stromaufnahme/Laufzeit grob prüfen, Aufwachen.

### Phase 7 – Extras
- SOS (Countdown, Notfall-Position alle 60 s), I²C-Sensoren über Meshtastic-Telemetrie (Bus SDA 2/SCL 1), Wecker über RTC.
**Test:** SOS mit zweitem Gerät empfangen, BME280 anschließen, Wecker.

### Phase 8 – Webseite & Konfigurator
- `web/` (Vite, statisch, relative Pfade): Projektseite, Flasher (`esp-web-tools`), Tab „Configurator“ (`@meshtastic/core`, Web Serial + Web Bluetooth), Backup/Restore, `web/EINBAU.md`.
- GitHub Action: Release → Firmware + Web-ZIP.
- Nichts wird hochgeladen, Website-Dateien werden nicht angefasst.

## Messwerte Phase 1 (27.11.2026)

- Firmware `thinknode_m5_custom`: **2.238 KB** von 2.368 KB App-Partition (frei ca. 130 KB).
- Standard-Aufteilung 4 MB: App 2.368 KB + OTA-Loader 640 KB + LittleFS 1.024 KB = voll.
- Folge: Für die Karte (1 MB) und weitere Funktionen reicht 4 MB nur, wenn Teile wegfallen
  (z. B. OTA-Loader, Meshtastic-Module) oder das Gerät tatsächlich 8 MB Flash hat → Boot-Log prüfen.

## Offene Punkte (Phase 1)

| Punkt | Wie klären |
|---|---|
| PSRAM (8 MB laut Elecrow, Meshtastic baut ohne) | Boot-Log nach Flashen (Phase 1) |
| Wirkliche Flash-Größe (4 MB oder 8 MB?) | Boot-Log, `esptool flash_id` |
| Freier Flash für die Karte | nach erstem Build messen |
| GPS-Version des Geräts | Boot-Log / Statusseite |
| Drehschalter-Funktion | Sven prüft am Gerät; wird nicht verwendet |
| I²C 1/2 von außen erreichbar? | Sven prüft (Gehäuse) |
