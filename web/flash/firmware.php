<?php
// ThinkKira – Firmware-Proxy für den Web-Flasher.
// Holt Firmware, Loader und Konfigurator serverseitig aus dem neuesten GitHub-Release, weil der Browser
// GitHub-Downloads wegen CORS nicht direkt laden darf. Keine Firmware liegt dauerhaft
// auf dem Webserver: nur ein kurzer Zwischenspeicher (10 Minuten) im System-Temp.
// SPDX-License-Identifier: GPL-3.0-only

const TK_REPO = 'Kirakodo/ThinkKiraM5';
const TK_CACHE_SECONDS = 600;     // Karten, Meshtastic-Original
const TK_LATEST_SECONDS = 60;     // wie oft nach einem neuen Release geschaut wird
const TK_FIXED_SECONDS = 604800;  // Dateien einer bestimmten Version ändern sich nicht

// Tag des neuesten Releases (z. B. v0.4.1), ohne API-Limit über die Weiterleitung von /releases/latest
function tk_latest_tag($dir)
{
    $f = $dir . '/latest-tag';
    if (is_file($f) && filemtime($f) >= time() - TK_LATEST_SECONDS) {
        return trim(file_get_contents($f));
    }
    $ch = curl_init('https://github.com/' . TK_REPO . '/releases/latest');
    curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_NOBODY => true, CURLOPT_FOLLOWLOCATION => false, CURLOPT_TIMEOUT => 15, CURLOPT_USERAGENT => 'ThinkKira-Flasher']);
    curl_exec($ch);
    $loc = (string) curl_getinfo($ch, CURLINFO_REDIRECT_URL);
    curl_close($ch);
    if (preg_match('#/releases/tag/(v\d+\.\d+\.\d+)$#', $loc, $m)) {
        file_put_contents($f, $m[1]);
        return $m[1];
    }
    return is_file($f) ? trim(file_get_contents($f)) : null; // GitHub nicht erreichbar: letzter bekannter Stand
}
const TK_ASSETS = [
    'manifest.json'          => 'application/json',
    'thinkkira-m5.factory.bin' => 'application/octet-stream',
    'thinkkira-m5.bin'       => 'application/octet-stream',
    'thinkkira-config.js'    => 'text/javascript; charset=utf-8',
    'thinkkira-config.css'   => 'text/css; charset=utf-8',
    'thinkkira-loader.js'    => 'text/javascript; charset=utf-8',
    'thinkkira-loader.css'   => 'text/css; charset=utf-8',
    'thinkkira-designer.js'  => 'text/javascript; charset=utf-8',
];

$asset = $_GET['asset'] ?? '';
$map = $_GET['map'] ?? '';
$release = 'latest/download';
$url = null;       // abweichende Quelle (GitHub-API)
$transform = null; // Antwort vor dem Zwischenspeichern umbauen
$cacheKey = null;
$ttl = TK_CACHE_SECONDS;
$cacheDir = sys_get_temp_dir() . '/thinkkira-fw';
if (!is_dir($cacheDir)) {
    @mkdir($cacheDir, 0700, true);
}
if (isset($_GET['releases'])) {
    // Liste der ThinkKira-Versionen für die Auswahl im Loader (ohne die Sammel-Releases „karten“ und „meshtastic“)
    $asset = 'releases.json';
    // Atom-Feed statt GitHub-API: hat kein Abruf-Limit (die API sperrt geteilte Server-IPs schnell)
    $url = 'https://github.com/' . TK_REPO . '/releases.atom';
    $mime = 'application/json; charset=utf-8';
    $ttl = TK_LATEST_SECONDS * 2;
    $transform = function ($data) {
        $list = [];
        $xml = @simplexml_load_string($data);
        foreach ($xml ? $xml->entry : [] as $e) {
            $href = (string) $e->link['href'];
            if (!preg_match('#/releases/tag/(v\d+\.\d+\.\d+)$#', $href, $m)) {
                continue; // „karten“, „meshtastic“ usw.
            }
            $list[] = ['tag' => $m[1], 'date' => substr((string) $e->updated, 0, 10)];
        }
        return json_encode($list);
    };
} elseif (isset($_GET['mt'])) {
    // Originale Meshtastic-Firmware für das M5 (Workflow „Meshtastic-Original“ legt sie ins Release „meshtastic“)
    $files = ['info' => 'meshtastic.json', 'm5' => 'meshtastic-m5.factory.bin', 'm5-inkhud' => 'meshtastic-m5-inkhud.factory.bin'];
    if (!isset($files[$_GET['mt']])) {
        http_response_code(404);
        exit('unbekannte Datei');
    }
    $asset = $files[$_GET['mt']];
    $release = 'download/meshtastic';
    $mime = $_GET['mt'] === 'info' ? 'application/json; charset=utf-8' : 'application/octet-stream';
    $cacheKey = 'mt-' . $asset;
} elseif (isset($_GET['tag'])) {
    // ältere ThinkKira-Version: ?tag=v0.3.2&asset=thinkkira-m5.factory.bin
    if (!preg_match('/^v\d+\.\d+\.\d+$/', $_GET['tag']) || !in_array($asset, ['manifest.json', 'thinkkira-m5.factory.bin'], true)) {
        http_response_code(404);
        exit('unbekannte Version');
    }
    $release = 'download/' . $_GET['tag'];
    $mime = TK_ASSETS[$asset];
    $cacheKey = $_GET['tag'] . '-' . $asset;
    $ttl = TK_FIXED_SECONDS;
} elseif (isset($_GET['maps'])) {
    // Verzeichnis aller Offline-Karten (Name, Titel, Gebiet, Größe) für den Konfigurator
    $asset = 'karten.json';
    $release = 'download/karten';
    $mime = 'application/json; charset=utf-8';
} elseif ($map !== '') {
    // Offline-Karten liegen im Release „karten“: ?map=potsdam-ludwigsfelde → potsdam-ludwigsfelde.tkm
    if (!preg_match('/^[a-z0-9-]{1,40}$/', $map)) {
        http_response_code(404);
        exit('unbekannte Karte');
    }
    $asset = $map . '.tkm';
    $release = 'download/karten';
    $mime = 'application/octet-stream';
} elseif (array_key_exists($asset, TK_ASSETS)) {
    // immer die Dateien des aktuell neuesten Releases: Version und Firmware passen so garantiert zusammen
    $mime = TK_ASSETS[$asset];
    $tag = tk_latest_tag($cacheDir);
    if ($tag) {
        $release = 'download/' . $tag;
        $cacheKey = $tag . '-' . $asset;
        $ttl = TK_FIXED_SECONDS;
    }
} else {
    http_response_code(404);
    exit('unbekannte Datei');
}

$cacheFile = $cacheDir . '/' . ($cacheKey ?? $asset);

if (!is_file($cacheFile) || filemtime($cacheFile) < time() - $ttl) {
    $url = $url ?? 'https://github.com/' . TK_REPO . '/releases/' . $release . '/' . rawurlencode($asset);
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS => 5,
        CURLOPT_TIMEOUT => 60,
        CURLOPT_USERAGENT => 'ThinkKira-Flasher',
    ]);
    $data = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($data === false || $status !== 200) {
        if (!is_file($cacheFile)) { // kein alter Stand vorhanden
            http_response_code(502);
            exit('GitHub-Release nicht erreichbar');
        }
    } else {
        if ($transform) {
            $data = $transform($data);
        }
        file_put_contents($cacheFile . '.tmp', $data);
        rename($cacheFile . '.tmp', $cacheFile);
    }
}

header('Content-Type: ' . $mime);
header('Content-Length: ' . filesize($cacheFile));
header('Cache-Control: no-cache');
readfile($cacheFile);
