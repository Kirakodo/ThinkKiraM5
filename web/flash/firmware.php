<?php
// ThinkKira – Firmware-Proxy für den Web-Flasher.
// Holt Firmware, Loader und Konfigurator serverseitig aus dem neuesten GitHub-Release, weil der Browser
// GitHub-Downloads wegen CORS nicht direkt laden darf. Keine Firmware liegt dauerhaft
// auf dem Webserver: nur ein kurzer Zwischenspeicher (10 Minuten) im System-Temp.
// SPDX-License-Identifier: GPL-3.0-only

const TK_REPO = 'Kirakodo/ThinkKiraM5';
const TK_CACHE_SECONDS = 600;
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
if (isset($_GET['maps'])) {
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
    $mime = TK_ASSETS[$asset];
} else {
    http_response_code(404);
    exit('unbekannte Datei');
}

$cacheDir = sys_get_temp_dir() . '/thinkkira-fw';
if (!is_dir($cacheDir)) {
    @mkdir($cacheDir, 0700, true);
}
$cacheFile = $cacheDir . '/' . $asset;

if (!is_file($cacheFile) || filemtime($cacheFile) < time() - TK_CACHE_SECONDS) {
    $url = 'https://github.com/' . TK_REPO . '/releases/' . $release . '/' . rawurlencode($asset);
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
        file_put_contents($cacheFile . '.tmp', $data);
        rename($cacheFile . '.tmp', $cacheFile);
    }
}

header('Content-Type: ' . $mime);
header('Content-Length: ' . filesize($cacheFile));
header('Cache-Control: no-cache');
readfile($cacheFile);
