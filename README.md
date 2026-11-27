# ThinkKiraM5

Eigene Firmware für das **Elecrow ThinkNode M5**, aufgebaut als Fork der [Meshtastic-Firmware](https://github.com/meshtastic/firmware).

> **Status: Phase 1 (Grundlage).** Meshtastic-Basis mit Statusseite und USB-Befehlen. Plan: [docs/PLAN.md](docs/PLAN.md)

## Idee

Das ThinkNode M5 ist ein kleines LoRa-Mesh-Gerät mit GPS und E-Ink-Display. ThinkKiraM5 behält die volle Meshtastic-Kompatibilität und ergänzt sie um:

- eine **vereinfachte Bedienung** mit 6 Seiten und zwei Tasten,
- **Navigation zu Wegpunkten** und Knoten mit Richtungspfeil,
- eine **Offline-Karte** direkt im Gerät (ohne SD-Karte),
- einen **Web-Flasher und Web-Konfigurator** im Browser.

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

Pinbelegung: siehe `variants/esp32s3/ELECROW-ThinkNode-M5/variant.h` in der Meshtastic-Firmware.

## Geplante Funktionen

**Funk & Mesh**
- Meshtastic-kompatibel (Standard), inkl. Relay und AES-Verschlüsselung
- Optional ein eigenes LoRa-Protokoll als zweiter Modus (stört das Meshtastic-Netz nicht)
- Funk-Statistik: RSSI/SNR, Paketzähler, Reichweitentest

**GPS & Navigation**
- Position anzeigen und senden, Uhrzeit per GPS
- Kompass ohne Zusatzmodul (Richtung aus GPS-Kurs, Peilung und Entfernung zum Ziel)
- Wegpunkte anlegen, verwalten, ins Mesh senden, GPX-Import/-Export
- Navigation mit großem Pfeil, Entfernung, Ankunftszeit und Ankunftssignal
- Track-Aufzeichnung als GPX

**Offline-Karte**
- Einfache Vektorkarte (Straßen, Wege, Gewässer, Orte) im Flash, ca. 1 MB
- Erstes Gebiet: **Potsdam bis Ludwigsfelde**
- PC-Tool `tools/mapgen/` wandelt OpenStreetMap-Daten in das Kartenformat um

**Verbindungen**
- Bluetooth (Meshtastic-App funktioniert weiter)
- WLAN-Weboberfläche, OTA-Update, MQTT-Brücke

**Strom & Extras**
- Tiefschlaf, Energieprofile (z. B. „Wandern“, „Basis“, „Maximal sparen“)
- SOS-Funktion, externe I²C-Sensoren, Wecker und Erinnerungen
- Licht, Buzzer und LEDs einstellbar

## Bedienung

### Tasten

| Taste | Kurz | Lang (0,5 s) | Sehr lang |
|---|---|---|---|
| Haupttaste | nächste Seite / nächster Eintrag | Menü öffnen / auswählen | 4 s: Ausschalten |
| Zweittaste | vorherige Seite / zurück | zur Startseite | 3 s: SOS (5 s Countdown, jede Taste bricht ab) |

### Seiten

Die 6 Seiten laufen im Kreis. Langes Drücken öffnet das Menü der jeweiligen Seite (maximal 2 Ebenen).

1. **Start**: Uhrzeit, Akku, GPS, Signal, Knoten online, ungelesene Nachrichten
2. **Nachrichten**: Antworten mit Schnellantworten, neue Nachricht, Chats
3. **Navigation**: Ziel wählen, Wegpunkt speichern, Track starten/stoppen
4. **Karte**: Zoom, Verschieben, Wegpunkt setzen, Ausrichtung
5. **Knoten**: Nachricht senden, als Ziel wählen, Favorit, Trace Route, Signal-Info
6. **Einstellungen**: Funk, GPS, Verbindungen, Energie, Anzeige & Töne, Wecker & Sensoren, System

## Webseite

Projektseite: **https://devsven.de/Key/ThinkKira** (noch im Aufbau)

Geplante Tabs:
- **Übersicht**: Funktionen, Bilder, Download, Anleitung
- **Loader**: Firmware direkt aus dem Browser aufspielen (Chrome/Edge, USB)
- **Konfigurator**: Gerät per USB oder Bluetooth einstellen, inkl. Wegpunkte, Schnellantworten und Sicherung

Der Quellcode der Webseite kommt in den Ordner `web/`.

## Roadmap

| Phase | Inhalt | Status |
|---|---|---|
| 1 | Grundlage: Fork, Build, GPS-Versionserkennung, USB-Logs | in Arbeit |
| 2 | Funk & Mesh: Meshtastic-Modus, eigener Modus, Statistik | geplant |
| 3 | Eigene E-Ink-Oberfläche mit 6 Seiten | geplant |
| 4 | GPS: Kompass, Track, Wegpunkt-Navigation, Offline-Karte | geplant |
| 5 | Verbindungen: Bluetooth, WLAN, OTA, MQTT | geplant |
| 6 | Strom: Tiefschlaf, Energieprofile | geplant |
| 7 | Extras: SOS, Sensoren, Wecker | geplant |
| 8 | Webseite, Web-Flasher, Configurator | geplant |

## Installation

### Flashen mit dem ThinkKira-Loader (empfohlen)
1. In Chrome oder Edge am PC öffnen: **https://devsven.de/Key/ThinkKira** → Karte **Loader**
2. ThinkNode M5 per USB-C anschließen.
3. Beim ersten Wechsel auf ThinkKira „Gerät vorher komplett löschen“ angehakt lassen.
4. **„Firmware installieren“** klicken, Port wählen, warten bis „Fertig!“ erscheint.

Der Loader holt die Firmware immer aus dem neuesten [GitHub-Release](https://github.com/Kirakodo/ThinkKiraM5/releases/latest).
Einstellungen danach im **Konfigurator** auf derselben Seite (USB oder Bluetooth).

### Firmware-Dateien direkt
Alle Dateien liegen im [neuesten Release](https://github.com/Kirakodo/ThinkKiraM5/releases/latest):
`thinkkira-m5.factory.bin` (komplettes Abbild, Adresse 0x0) und `thinkkira-m5.bin` (nur Update).

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
| `kira reboot` | Neustart |

### Meshtastic-Updates übernehmen
```bash
git remote add upstream https://github.com/meshtastic/firmware   # einmalig
git fetch upstream && git merge upstream/develop
```

## Lizenz

GPL-3.0, wie die Meshtastic-Firmware, auf der dieses Projekt aufbaut.

Kartendaten: © OpenStreetMap-Mitwirkende, lizenziert unter ODbL.
