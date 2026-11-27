# Einbau in devsven.de (für die Website-Sitzung)

Ziel: `https://devsven.de/Key/ThinkKira` → Unterseite `SUBPAGES/keylink/ThinkKira`.

## Web-Flasher (Tab „Flasher“)

`SUBPAGES/keylink/` ist öffentlich gesperrt. Darum zwei Orte:

| Datei | Wohin | Zweck |
|---|---|---|
| `flash/index.html` | Inhalt von `<main>` + die zwei `<script>` als Karte **`Flasher.php`** in `SUBPAGES/keylink/ThinkKira/` | Flasher-Oberfläche |
| `flash/flash.css` | zu den Styles der ThinkKira-Seite | Styles, alle Klassen mit Präfix `tk-` |
| `flash/firmware.php` | **öffentlich erreichbarer** Ordner, z. B. `/_scripts/php/keylink/ThinkKira/firmware.php` | Proxy: holt `manifest.json` und `.bin` aus dem neuesten GitHub-Release |

In `Flasher.php` vor dem Flasher-Script den öffentlichen Pfad setzen:

```html
<script>window.TK_FIRMWARE_PHP = '/_scripts/php/keylink/ThinkKira/firmware.php';</script>
```

Das esp-web-tools-Script muss geladen werden:

```html
<script type="module" src="https://unpkg.com/esp-web-tools@10/dist/web/install-button.js?module"></script>
```

Wichtig:
- Die Firmware wird **nicht** auf den Server hochgeladen. `firmware.php` lädt sie bei Bedarf von
  `https://github.com/Kirakodo/ThinkKiraM5/releases/latest/download/…` (10 Minuten Zwischenspeicher im Temp-Ordner).
- Nötig: PHP mit cURL, ausgehende HTTPS-Verbindungen zu github.com. Seite nur über HTTPS (Web Serial).
- Das Manifest verweist relativ auf `firmware.php?asset=…`, also auf denselben Ordner wie `firmware.php`.
- Neue Firmware = neues GitHub-Release, auf dem Server ist nichts zu ändern.
- Test: `https://devsven.de/_scripts/php/keylink/ThinkKira/firmware.php?asset=manifest.json` muss JSON mit der Version liefern.

## Configurator (Tab „Configurator“)

Fertig gebaute Dateien liegen in `web/config/dist/` (auch im Release als `thinkkira-web.zip`):

| Datei | Wohin |
|---|---|
| `config/dist/thinkkira-config.js` | öffentlich, z. B. `/_scripts/php/keylink/ThinkKira/thinkkira-config.js` |
| `config/dist/thinkkira-config.css` | öffentlich, z. B. `/_scripts/php/keylink/ThinkKira/thinkkira-config.css` |

Inhalt der Karte **`Configurator.php`** in `SUBPAGES/keylink/ThinkKira/`:

```html
<link rel="stylesheet" href="/_scripts/php/keylink/ThinkKira/thinkkira-config.css">
<div id="tk-config"></div>
<script type="module" src="/_scripts/php/keylink/ThinkKira/thinkkira-config.js"></script>
```

- Startet von selbst, sobald `<div id="tk-config">` da ist. Alle CSS-Klassen beginnen mit `tk-`.
- Verbindung per **USB (Web Serial)** oder **Bluetooth (Web Bluetooth)**: nur HTTPS, Chrome/Edge (Bluetooth auch Android-Chrome).
- Seiten: Gerät & Name · Kanäle · Funk (LoRa) · Position & GPS · Energie · WLAN · Bluetooth · Anzeige · Sicherheit ·
  alle Module (MQTT, Telemetrie/Sensoren, Buzzer & LEDs, …) · Wegpunkte (senden, GPX-Import/Export) · Schnellantworten ·
  ThinkKira-Funktionen (werden mit den Firmware-Phasen freigeschaltet) · System (Backup/Restore, Neustart, Werkseinstellungen).
- Alles auf Deutsch. Formulare werden aus den Meshtastic-Protobufs erzeugt, neue Einstellungen erscheinen nach Updates automatisch.

Neu bauen (nur nötig nach Änderungen im Quellcode):

```bash
cd web/config && npm ci && npm run build
```

## Übersicht (Tab „Übersicht“)
Kurzbeschreibung, Funktionen und Download-Link: Texte aus der README (Abschnitte „Idee“, „Geplante Funktionen“, „Bedienung“).
Download immer über `https://github.com/Kirakodo/ThinkKiraM5/releases/latest`.
