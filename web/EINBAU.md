# Einbau in devsven.de (für die Website-Sitzung)

Ziel: `https://devsven.de/Key/ThinkKira` → Unterseite `SUBPAGES/keylink/ThinkKira`.

## Loader (Karte `Loader.php`)

Eigener Loader, komplett auf Deutsch (esptool-js, kein englischer esp-web-tools-Dialog mehr).
JS/CSS und Firmware kommen aus dem neuesten GitHub-Release über `firmware.php`.

| Datei | Wohin |
|---|---|
| `flash/firmware.php` | öffentlich: `/_scripts/php/keylink/thinkkira/firmware.php` |

Inhalt der Karte **`Loader.php`** in `SUBPAGES/keylink/ThinkKira/`:

```html
<link rel="stylesheet" href="/_scripts/php/keylink/thinkkira/firmware.php?asset=thinkkira-loader.css">
<div id="tk-loader" data-firmware="/_scripts/php/keylink/thinkkira/firmware.php"></div>
<script type="module" src="/_scripts/php/keylink/thinkkira/firmware.php?asset=thinkkira-loader.js"></script>
```

- Zeigt die neueste Version, Option „Gerät vorher komplett löschen“, Fortschrittsbalken, Meldungen auf Deutsch.
- Nötig: HTTPS, Chrome/Edge am PC; PHP mit cURL und ausgehendem HTTPS zu github.com.
- Test: `https://devsven.de/_scripts/php/keylink/thinkkira/firmware.php?asset=manifest.json` liefert JSON mit der Version.
- `flash/index.html` ist nur eine Vorschauseite zum Testen.

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
`?asset=` `manifest.json` · `thinkkira-m5.factory.bin` · `thinkkira-m5.bin` · `thinkkira-loader.js` · `thinkkira-loader.css` · `thinkkira-config.js` · `thinkkira-config.css`

## Updates
Alles kommt aus `https://github.com/Kirakodo/ThinkKiraM5/releases/latest`. Neues Release = Seite aktuell, auf dem Server ist nichts zu tun.
Nur wenn sich `firmware.php` selbst ändert, muss sie neu hochgeladen werden.

## Übersicht
Kurzbeschreibung, Funktionen und Download-Link: Texte aus der README (Abschnitte „Idee“, „Geplante Funktionen“, „Bedienung“).
