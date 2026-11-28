// SPDX-License-Identifier: GPL-3.0-only
#ifdef THINKKIRA
#include "KiraMap.h"
#include "FSCommon.h"
#include "SPILock.h"
#include "configuration.h"
#ifndef FILE_O_APPEND
#define FILE_O_APPEND "a"
#endif
#include <string.h>
#if defined(ARCH_ESP32)
#include "mbedtls/base64.h"
#endif

namespace ThinkKira
{

static const char *MAP_PATH = "/kira/map.tkm";
static const char *PART_PATH = "/kira/map.part";
static constexpr uint32_t HEADER_SIZE = 32;
#ifdef FSCom
static File upFile; // bleibt während des Empfangs offen (öffnen/schließen je Stück wäre zu langsam)
#endif

KiraMapFile &mapFile()
{
    static KiraMapFile m;
    return m;
}

static uint32_t u32(const uint8_t *b)
{
    return b[0] | (b[1] << 8) | (b[2] << 16) | ((uint32_t)b[3] << 24);
}

bool KiraMapFile::available()
{
    if (checked)
        return ok;
    checked = true;
    ok = false;
#ifdef FSCom
    concurrency::LockGuard g(spiLock);
    File f = FSCom.open(MAP_PATH, FILE_O_READ);
    if (!f)
        return false;
    uint8_t h[HEADER_SIZE];
    size = f.size();
    if (f.read(h, HEADER_SIZE) == HEADER_SIZE && !memcmp(h, "TKM1", 4)) {
        hdr.version = h[4] | (h[5] << 8);
        hdr.level = h[6] | (h[7] << 8);
        hdr.latMin = (int32_t)u32(h + 8);
        hdr.lonMin = (int32_t)u32(h + 12);
        hdr.latMax = (int32_t)u32(h + 16);
        hdr.lonMax = (int32_t)u32(h + 20);
        hdr.nx = h[24] | (h[25] << 8);
        hdr.ny = h[26] | (h[27] << 8);
        ok = hdr.version == 1 && hdr.nx && hdr.ny && size >= HEADER_SIZE + 8u * hdr.nx * hdr.ny;
    }
    f.close();
#endif
    return ok;
}

bool KiraMapFile::readTile(int tx, int ty, std::vector<uint8_t> &out)
{
    out.clear();
    if (!available() || tx < 0 || ty < 0 || tx >= hdr.nx || ty >= hdr.ny)
        return false;
#ifdef FSCom
    concurrency::LockGuard g(spiLock);
    File f = FSCom.open(MAP_PATH, FILE_O_READ);
    if (!f)
        return false;
    uint8_t ix[8];
    bool good = f.seek(HEADER_SIZE + 8u * (ty * hdr.nx + tx)) && f.read(ix, 8) == 8;
    uint32_t off = u32(ix), len = u32(ix + 4);
    if (good && len && len < 64 * 1024 && off + len <= size && f.seek(off)) {
        out.resize(len);
        good = f.read(out.data(), len) == (int)len;
        if (!good)
            out.clear();
    }
    f.close();
    return good && !out.empty();
#else
    return false;
#endif
}

bool KiraMapFile::beginUpload(uint32_t bytes, std::string &error)
{
#ifdef FSCom
    concurrency::LockGuard g(spiLock);
    if (upFile)
        upFile.close();
    FSCom.remove(PART_PATH);
    // Platz: die alte Karte wird erst am Ende ersetzt, zählt also noch mit
    uint32_t oldMap = 0;
    if (File old = FSCom.open(MAP_PATH, FILE_O_READ)) {
        oldMap = old.size();
        old.close();
    }
    uint32_t freeBytes = FSCom.totalBytes() - FSCom.usedBytes();
    if (bytes + 16 * 1024 > freeBytes + oldMap) {
        error = "Nicht genug Platz im Gerät (" + std::to_string((freeBytes + oldMap) / 1024) + " KB frei)";
        return false;
    }
    if (bytes + 16 * 1024 > freeBytes) {
        FSCom.remove(MAP_PATH); // alte Karte zuerst löschen, sonst passt die neue nicht
        checked = false;
    }
    FSCom.mkdir("/kira");
    upFile = FSCom.open(PART_PATH, FILE_O_WRITE);
    if (!upFile) {
        error = "Datei konnte nicht angelegt werden";
        return false;
    }
    upExpected = bytes;
    upBytes = 0;
    uploading = true;
    return true;
#else
    error = "kein Dateisystem";
    return false;
#endif
}

bool KiraMapFile::appendBase64(const char *b64)
{
    if (!uploading)
        return false;
#if defined(ARCH_ESP32) && defined(FSCom)
    uint8_t buf[192];
    size_t n = 0;
    if (mbedtls_base64_decode(buf, sizeof(buf), &n, (const unsigned char *)b64, strlen(b64)) != 0)
        return false;
    concurrency::LockGuard g(spiLock);
    if (!upFile)
        return false;
    bool good = upFile.write(buf, n) == n;
    if (good)
        upBytes += n;
    return good;
#else
    return false;
#endif
}

bool KiraMapFile::finishUpload(std::string &error)
{
    if (!uploading) {
        error = "kein Upload aktiv";
        return false;
    }
    uploading = false;
#ifdef FSCom
    concurrency::LockGuard g(spiLock);
    if (upFile)
        upFile.close();
    if (upBytes != upExpected) {
        FSCom.remove(PART_PATH);
        error = "unvollständig (" + std::to_string(upBytes) + " von " + std::to_string(upExpected) + " Byte)";
        return false;
    }
    FSCom.remove(MAP_PATH);
    if (!FSCom.rename(PART_PATH, MAP_PATH)) {
        error = "Umbenennen fehlgeschlagen";
        return false;
    }
#endif
    checked = false;
    rev++;
    if (!available()) {
        error = "Datei ist keine gültige ThinkKira-Karte";
        return false;
    }
    return true;
}

bool KiraMapFile::remove()
{
#ifdef FSCom
    concurrency::LockGuard g(spiLock);
    FSCom.remove(MAP_PATH);
#endif
    checked = false;
    rev++;
    return true;
}

} // namespace ThinkKira
#endif
