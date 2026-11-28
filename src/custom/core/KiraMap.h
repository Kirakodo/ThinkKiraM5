// ThinkKira – Offline-Karte: Datei /kira/map.tkm (Format siehe tools/mapgen/mapgen.py) lesen und per USB/Bluetooth empfangen.
// SPDX-License-Identifier: GPL-3.0-only
#pragma once
#include <stdint.h>
#include <string>
#include <vector>

namespace ThinkKira
{

// Objekt-Typen – müssen zu tools/mapgen/mapgen.py passen
enum MapType : uint8_t {
    MT_MAJOR = 1,
    MT_MINOR = 2,
    MT_RESIDENTIAL = 3,
    MT_TRACK = 4,
    MT_PATH = 5,
    MT_RAIL = 6,
    MT_WATERWAY = 7,
    MT_WATERSHORE = 8,
    MT_CITY = 20,
    MT_TOWN = 21,
    MT_VILLAGE = 22,
    MT_SUBURB = 23,
    MT_POI = 24,
};

struct MapHeader {
    uint16_t version = 0, level = 0;
    int32_t latMin = 0, lonMin = 0, latMax = 0, lonMax = 0; // 1e-7 Grad
    uint16_t nx = 0, ny = 0;
};

class KiraMapFile
{
  public:
    bool available();               // Karte vorhanden und gültig
    const MapHeader &header() { return hdr; }
    uint32_t fileSize() const { return size; }
    // Kachel tx/ty lesen (leer, wenn außerhalb oder leer)
    bool readTile(int tx, int ty, std::vector<uint8_t> &out);
    void reset() { checked = false; } // nach neuem Upload neu einlesen

    // Empfang (Befehle mapb/mapd/mape/mapx)
    bool beginUpload(uint32_t bytes, std::string &error);
    bool appendBase64(const char *b64);
    bool finishUpload(std::string &error);
    bool remove();
    uint32_t received() const { return upBytes; }
    uint32_t expected() const { return upExpected; }
    bool isUploading() const { return uploading; }
    uint8_t rev = 0; // ändert sich, wenn eine neue Karte da ist

  private:
    bool checked = false, ok = false;
    MapHeader hdr;
    uint32_t size = 0;
    uint32_t upExpected = 0, upBytes = 0;
    bool uploading = false;
};

KiraMapFile &mapFile();

} // namespace ThinkKira
