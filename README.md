# ThinkKiraM5

Eigene Firmware für das **Elecrow ThinkNode M5**, aufgebaut als Fork der [Meshtastic-Firmware](https://github.com/meshtastic/firmware).

> **Stand: v0.4.5 (Phase 4 umgesetzt).** Meshtastic-Basis, Kira-Funk, eigene E-Ink-Oberfläche mit Designer, Navigation zu Wegpunkten/Knoten, Track als GPX und Offline-Karten für Deutschland (Kartendaten © OpenStreetMap-Mitwirkende, ODbL). Als Nächstes: Phase 5 (Verbindungen, WLAN, Auto-Update). Plan: [docs/PLAN.md](docs/PLAN.md)

## Idee

Das ThinkNode M5 ist ein kleines LoRa-Mesh-Gerät mit GPS und E-Ink-Display. ThinkKiraM5 behält die volle Meshtastic-Kompatibilität und ergänzt sie um:

- eine **vereinfachte Bedienung** mit 6 Seiten und zwei Tasten,
- **Navigation zu Wegpunkten** und Knoten mit Richtungspfeil,
- **Offline-Karten** direkt im Gerät (ohne SD-Karte),
- **Loader, Konfigurator und Designer** im Browser.

Eigene Änderungen liegen getrennt vom Meshtastic-Code (`src/custom/`, eigene PlatformIO-Umgebung `thinknode_m5_custom`), damit Updates von Meshtastic weiter übernommen werden können. Jede Zusatzfunktion lässt sich per Compile-Flag abschalten.

## Hardware

| Bauteil | Details |
|---|---|
| Prozessor | ESP32-S3, 4 MB Flash, WLAN + Bluetooth 5 |
| Funk | LoRa SX1262, EU 868 MHz, bis 22 dBm, RP-SMA |
| GPS | v1.0: Quectel L76K · v2.0: AG3352 (wird automatisch erkannt) |
| Display | 1,54" E-Ink, 200 × 200, mit Hintergrundlicht |
| Sonstiges | RTC PCF8563, Buzzer, blaue und rote LED, 2 Tasten, GPS-Schalter |
| Akku | 1200 mAh, USB-C |
| Erweiterung | zweiter I²C-Bus für externe Sensoren (z. B. BME280) |

Pinbelegung: `variants/esp32s3/ELECROW-ThinkNode-M5/variant.h`.

## Funktionen

### Schon drin (bis v0.4.5)

**Funk & Mesh**
- Meshtastic-kompatibel (Standard), inkl. Relay und AES-Verschlüsselung
- Kira-Funk als zweiter Modus (eigenes Sync-Wort, stört das Meshtastic-Netz nicht), umschaltbar per Menü, Konfigurator oder `kira mode`
- Funk-Statistik (RSSI/SNR, Paketzähler) und Reichweitentest

**Oberfläche**
- 6 Seiten, Menüs mit 2 Ebenen, Schnellantworten, SOS, Ausschalten
- Eigenes Startlogo und ThinkKira-Version auf dem Startbildschirm (Logo aus Bild erzeugen: `tools/logo/logo2xbm.py`)
- Statuszeile oben frei einstellbar: Seitenname, Uhrzeit, Symbole für GPS, WLAN, Bluetooth, Akku, ungelesene Nachrichten, Knoten online, Funkmodus
- Eigene „Tipps nach dem Start“ statt der Meshtastic-Tipps

**GPS & Navigation**
- Kompass aus dem GPS-Kurs, Peilung und Entfernung zum Ziel
- Bis zu 64 Wegpunkte, Ziel aus Wegpunkten oder Knoten, Ziel bleibt über Neustart erhalten
- Navigationsseite mit Pfeil, Entfernung, Ankunftszeit und Ankunftssignal (Radius einstellbar)
- Wegpunkte aus dem Mesh übernehmen, Track-Aufzeichnung

**Offline-Karten**
- Vektorkarte (Straßen, Wege, Gewässer, Orte) im Flash, 3 Zoomstufen, Norden oben oder Laufrichtung, Verschieben, Wegpunkte und Ziel-Linie
- Detailkarten für Großstädte und Wandergebiete (z. B. Potsdam–Ludwigsfelde, Berlin, Harz, Rügen) und grobe Karten für ganz Deutschland (ca. 50 × 50 km je Feld)
- Bau per GitHub Action aus OpenStreetMap-Daten (`tools/mapgen/`), Download über den Konfigurator

### Geplant
- **Phase 5:** WLAN-Verbindung für Konfigurator und Designer, OTA-Update, Auto-Update aus GitHub-Releases (Installation erst nach Tastendruck), MQTT
- **Phase 6:** Tiefschlaf, Energieprofile („Wandern“, „Basis“, „Maximal sparen“)
- **Phase 7:** SOS mit Notfall-Position, externe I²C-Sensoren, Wecker

## Bedienung

### Tasten

| Taste | Kurz | Lang (0,5 s) | Sehr lang |
|---|---|---|---|
| Haupttaste | nächste Seite / nächster Eintrag | Menü öffnen / auswählen | 4 s: Ausschalten |
| Zweittaste | vorherige Seite / zurück | zur Startseite | 3 s: SOS (5 s Countdown, jede Taste bricht ab) |

Die Belegung lässt sich im Designer ändern.

### Seiten

Die 6 Seiten laufen im Kreis. Langes Drücken öffnet das Menü der jeweiligen Seite. Reihenfolge und Startseite stellt der Designer ein.

1. **Start**: Uhrzeit, Akku, GPS, Signal, Knoten online, ungelesene Nachrichten, aktuelles Ziel
2. **Nachrichten**: Antworten mit Schnellantworten, neue Nachricht, Chats
3. **Navigation**: Ziel wählen, Wegpunkt speichern, Track starten/stoppen
4. **Karte**: Zoom, Verschieben, Wegpunkt setzen, Ausrichtung
5. **Knoten**: Nachricht senden, als Ziel wählen, Favorit, Trace Route, Signal-Info
6. **Einstellungen**: Funk, GPS, Verbindungen, Energie, Anzeige & Töne, System

## Webseite: Loader, Konfigurator, Designer

Projektseite: **https://devsven.de/Key/ThinkKira** (Chrome oder Edge am PC, Tabs Übersicht, Loader, Konfigurator).

Die Seite holt Firmware **und** ihre eigenen Web-Dateien (Loader, Konfigurator, Designer) automatisch aus dem [neuesten GitHub-Release](https://github.com/Kirakodo/ThinkKiraM5/releases/latest). Ein neues Release reicht, an der Webseite muss nichts geändert werden.

### Loader
- **Firmware wählen:** neueste ThinkKira (empfohlen), ältere ThinkKira-Versionen, Original-Meshtastic fürs M5 (auch mit InkHUD-Anzeige) oder eine eigene `.bin` vom PC
- **Gerät auslesen** (Chip, Speicher, installierte Firmware)
- **Backup erstellen** (komplettes Flash als `.bin`) und **Backup zurückspielen**

### Konfigurator (USB oder Bluetooth)
- Alle Meshtastic-Einstellungen: Gerät, Kanäle, Funk, GPS, Energie, WLAN (mit „Netze suchen“), Bluetooth, Anzeige, Sicherheit, Module
- **Speichern mit Rückmeldung:** zeigt „Gespeichert“, sobald die Einstellungen beim Gerät sind
- **Wegpunkte** verwalten, GPX importieren/exportieren, Track als GPX herunterladen, Ankunftsradius
- **Funkmodus** Meshtastic/Kira umschalten
- **Design-Datei** aus dem Designer ans Gerät übertragen oder vom Gerät herunterladen
- **Karte laden:** Karte aus der Liste wählen (die Karte zur eigenen GPS-Position ist mit 📍 markiert) und Stück für Stück mit Quittung übertragen. Bricht die Übertragung ab, macht „Karte laden“ an derselben Stelle weiter. Vor dem Start prüft der Konfigurator, ob ThinkKira im Gerät antwortet.
- **Fehlerprotokoll** zum Kopieren (Ablauf des Uploads, empfangene Pakete, Antworten von ThinkKira, Geräte-Log)

> **Tipp:** Hängt der Karten-Upload oder antwortet das Gerät nicht, Gerät neu starten (Taste lang drücken oder USB kurz trennen), neu verbinden, 10 Sekunden warten und nochmal „Karte laden“ drücken.

### Designer
Eigenes Werkzeug, läuft auch ohne Gerät und offline (`thinkkira-designer.html` im Release).
- Seitenreihenfolge, Startseite und Bausteine der Startseite
- Menüs mit Untermenüs, Tastenbelegung, Schnellantworten
- Statuszeile mit Symbolen (links/rechts), mit Vorschau wie auf dem Gerät
- „Tipps nach dem Start“
- Alles als **Design-Datei** (JSON) speichern und laden; aufs Gerät kommt sie über den Konfigurator

## Roadmap

| Phase | Inhalt | Status |
|---|---|---|
| 1 | Grundlage: Fork, Build, GPS-Versionserkennung, USB-Befehle | fertig |
| 2 | Funk & Mesh: Meshtastic-Modus, Kira-Funk, Statistik | umgesetzt, Test am Gerät offen |
| 3 | Eigene E-Ink-Oberfläche, Designer | umgesetzt (v0.3.x) |
| 4 | Kompass, Wegpunkte, Track, Offline-Karten Deutschland | umgesetzt (v0.4.x) |
| 5 | Verbindungen: WLAN für Konfigurator/Designer, OTA, Auto-Update, MQTT | als Nächstes |
| 6 | Strom: Tiefschlaf, Energieprofile | geplant |
| 7 | Extras: SOS mit Position, Sensoren, Wecker | geplant |
| 8 | Webseite: Loader, Konfigurator, Designer | läuft, Ausbau je Phase |

## Installation

### Flashen mit dem ThinkKira-Loader (empfohlen)
1. In Chrome oder Edge am PC öffnen: **https://devsven.de/Key/ThinkKira** → Tab **Loader**
2. ThinkNode M5 per USB-C anschließen.
3. Beim ersten Wechsel auf ThinkKira „Gerät vorher komplett löschen“ angehakt lassen.
4. **„Firmware installieren“** klicken, Port wählen, warten bis „Fertig!“ erscheint.
5. Einstellungen danach im Tab **Konfigurator** (USB oder Bluetooth).

### Firmware-Dateien direkt
Im [neuesten Release](https://github.com/Kirakodo/ThinkKiraM5/releases/latest):
`thinkkira-m5.factory.bin` (komplettes Abbild, Adresse 0x0) und `thinkkira-m5.bin` (nur Update).
Karten liegen im Release `karten`, die Original-Meshtastic-Firmware im Release `meshtastic`.

### Selbst bauen und flashen (PlatformIO)
```bash
git clone --recursive https://github.com/Kirakodo/ThinkKiraM5
cd ThinkKiraM5
pip install -r .github/actions/setup-base/requirements.txt
pio run -e thinknode_m5_custom              # bauen
pio run -e thinknode_m5_custom -t upload    # flashen (USB)
pio device monitor -b 115200                # Log ansehen
```

### USB-Befehle
Im seriellen Monitor (115200 Baud) `kira help` eingeben und Enter drücken:

| Befehl | Zeigt |
|---|---|
| `kira info` | Version, GPS-Hardware, Flash, PSRAM, Speicher |
| `kira flash` | Flash-Partitionen |
| `kira gps` | GPS-Status und Position |
| `kira power` | Akku und USB |
| `kira nodes` | Anzahl Knoten |
| `kira mode` | Funkmodus anzeigen; `kira mode kira` bzw. `kira mode meshtastic` wechselt (Neustart) |
| `kira stats` | Funk-Statistik: Zähler, zuletzt gehörte Pakete (RSSI/SNR), Reichweitentest |
| `kira ping` | Reichweitentest an direkt erreichbare ThinkKira-Geräte |
| `kira reboot` | Neustart |

### Meshtastic-Updates übernehmen
```bash
git remote add upstream https://github.com/meshtastic/firmware   # einmalig
git fetch upstream && git merge upstream/develop
```

## Lizenz

GPL-3.0, wie die Meshtastic-Firmware, auf der dieses Projekt aufbaut.

Kartendaten: © OpenStreetMap-Mitwirkende, lizenziert unter ODbL.
