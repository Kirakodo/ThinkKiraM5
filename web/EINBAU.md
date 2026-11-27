# Einbau in devsven.de (für die Website-Sitzung)

Ziel: `https://devsven.de/Key/ThinkKira` → Unterseite `SUBPAGES/keylink/ThinkKira`.

## Loader (Karte `Loader.php`)

`SUBPAGES/keylink/` ist öffentlich gesperrt. Darum zwei Orte:

| Datei | Wohin | Zweck |
|---|---|---|
| `flash/index.html` | Inhalt von `<main>` + die zwei `<script>` als Karte **`Loader.php`** in `SUBPAGES/keylink/ThinkKira/` | Flasher-Oberfläche |
| `flash/flash.css` | zu den Styles der ThinkKira-Seite | Styles, alle Klassen mit Präfix `tk-` |
| `flash/firmware.php` | **öffentlich erreichbarer** Ordner, z. B. `/_scripts/php/keylink/thinkkira/firmware.php` | Proxy: holt `manifest.json` und `.bin` aus dem neuesten GitHub-Release |

In `Loader.php` vor dem Flasher-Script den öffentlichen Pfad setzen:

```html
<script>window.TK_FIRMWARE_PHP = '/_scripts/php/keylink/thinkkira/firmware.php';</script>
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
- Test: `https://devsven.de/_scripts/php/keylink/thinkkira/firmware.php?asset=manifest.json` muss JSON mit der Version liefern.

## Konfigurator (Karte `Konfigurator.php`)

JS und CSS liegen **nicht** auf devsven.de, sondern kommen wie die Firmware aus dem neuesten GitHub-Release
(Release-Assets `thinkkira-config.js`, `thinkkira-config.css`) über `firmware.php`.

Inhalt der Karte **`Konfigurator.php`** in `SUBPAGES/keylink/ThinkKira/`:

```html
<link rel="stylesheet" href="/_scripts/php/keylink/thinkkira/firmware.php?asset=thinkkira-config.css">
<div id="tk-config"></div>
<script type="module" src="/_scripts/php/keylink/thinkkira/firmware.php?asset=thinkkira-config.js"></script>
```

- Startet von selbst, sobald `<div id="tk-config">` da ist. Alle CSS-Klassen beginnen mit `tk-`.
- Verbindung per **USB (Web Serial)** oder **Bluetooth (Web Bluetooth)**: nur HTTPS, Chrome/Edge (Bluetooth auch Android-Chrome).
- Seiten: Gerät & Name · Kanäle · Funk (LoRa) · Position & GPS · Energie · WLAN · Bluetooth · Anzeige · Sicherheit ·
  alle Module (MQTT, Telemetrie/Sensoren, Buzzer & LEDs, …) · Wegpunkte (senden, GPX-Import/Export) · Schnellantworten ·
  ThinkKira-Funktionen (werden mit den Firmware-Phasen freigeschaltet) · System (Backup/Restore, Neustart, Werkseinstellungen).
- Alles auf Deutsch.

## Erlaubte Dateien in `firmware.php`
`?asset=` `manifest.json` · `thinkkira-m5.factory.bin` · `thinkkira-m5.bin` · `thinkkira-config.js` · `thinkkira-config.css`

## Updates
Alles kommt aus `https://github.com/Kirakodo/ThinkKiraM5/releases/latest`. Neues Release = Seite aktuell, auf dem Server ist nichts zu tun.
Nur wenn sich `firmware.php` selbst ändert, muss sie neu hochgeladen werden.

## Übersicht
Kurzbeschreibung, Funktionen und Download-Link: Texte aus der README (Abschnitte „Idee“, „Geplante Funktionen“, „Bedienung“).
