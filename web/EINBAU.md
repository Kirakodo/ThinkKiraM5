# Einbau in devsven.de (für die Website-Sitzung)

Ziel: `https://devsven.de/Key/ThinkKira` → Unterseite `SUBPAGES/keylink/ThinkKira`.

## Web-Flasher (Tab „Flasher“)

`SUBPAGES/keylink/` ist öffentlich gesperrt. Darum zwei Orte:

| Datei | Wohin | Zweck |
|---|---|---|
| `flash/index.html` | Inhalt von `<main>` + die zwei `<script>` als Karte **`Flasher.php`** in `SUBPAGES/keylink/ThinkKira/` | Flasher-Oberfläche |
| `flash/flash.css` | zu den Styles der ThinkKira-Seite | Styles, alle Klassen mit Präfix `tk-` |
| `flash/firmware.php` | **öffentlich erreichbarer** Ordner, z. B. `/Key/ThinkKira/firmware.php` | Proxy: holt `manifest.json` und `.bin` aus dem neuesten GitHub-Release |

In `Flasher.php` vor dem Flasher-Script den öffentlichen Pfad setzen:

```html
<script>window.TK_FIRMWARE_PHP = '/Key/ThinkKira/firmware.php';</script>
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
- Test: `https://devsven.de/Key/ThinkKira/firmware.php?asset=manifest.json` muss JSON mit der Version liefern.

## Später (Phase 8)
Projektseite (Tab „Übersicht“) und Configurator (Tab „Configurator“) folgen in `web/`.
