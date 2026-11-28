// ThinkKira – Navigation: Kompass aus GPS-Kurs, Wegpunkte, Ziel, Ankunft, Track-Aufzeichnung.
// Dateien in LittleFS: /kira/wp.txt (name|lat_i|lon_i|zeit je Zeile), /kira/target.txt, /kira/track.txt (lat_i,lon_i,zeit)
// SPDX-License-Identifier: GPL-3.0-only
#pragma once
#include "concurrency/OSThread.h"
#include "mesh/SinglePortModule.h"
#include <stdint.h>
#include <string>
#include <vector>

namespace ThinkKira
{

struct Waypoint {
    char name[20] = {0};
    int32_t lat = 0, lon = 0; // 1e-7 Grad
    uint32_t time = 0;        // Unix-Zeit, 0 = unbekannt
};

enum TargetKind : uint8_t { TARGET_NONE = 0, TARGET_POINT = 1, TARGET_NODE = 2 };

struct Target {
    TargetKind kind = TARGET_NONE;
    char name[20] = {0};
    int32_t lat = 0, lon = 0;
    uint32_t node = 0; // bei Knoten: Position wird laufend aus der Knotenliste übernommen
};

constexpr int WP_MAX = 64;
constexpr float MIN_SPEED_KMH = 1.5f;

struct NavInfo {
    bool havePos = false;      // eigene GPS-Position
    bool moving = false;       // Kurs gültig (ab 1,5 km/h)
    float course = 0;          // Grad, 0 = Norden (zuletzt gültiger Wert)
    float speedKmh = 0;        // geglättet
    bool haveTarget = false;
    float distance = 0;        // m
    float bearing = 0;         // Grad zum Ziel
    uint32_t etaSec = 0;       // 0 = unbekannt
};

class KiraNav : private concurrency::OSThread
{
  public:
    KiraNav();
    const NavInfo &info() const { return nav; }
    const Target &target() const { return tgt; }
    void setTarget(const Target &t);
    void clearTarget();

    const std::vector<Waypoint> &waypoints();
    bool addWaypoint(const char *name, int32_t lat, int32_t lon, uint32_t time); // speichert
    bool addHere(std::string &nameOut);                                      // an eigener Position
    bool removeWaypoint(size_t i);
    bool renameWaypoint(size_t i, const char *name);
    bool sendWaypointToMesh(size_t i);
    std::vector<size_t> waypointsByDistance();

    bool tracking() const { return trackOn; }
    void setTracking(bool on);
    uint32_t trackPoints() const { return trackCount; }
    bool clearTrack();
    std::string trackChunk(size_t offset, size_t len); // Teil von /kira/track.txt (leer = Ende)

    uint16_t arrivalRadius = 20; // m (Einstellung „arrive“)
    uint8_t rev = 0;             // ändert sich bei neuen Daten → Oberfläche zeichnet neu
    bool arrivedFlag = false;    // Oberfläche zeigt „Ziel erreicht“ und setzt zurück

  private:
    int32_t runOnce() override;
    void loadWaypoints();
    bool saveWaypoints();
    void loadTarget();
    void saveTarget();
    void onArrived();

    NavInfo nav;
    Target tgt;
    std::vector<Waypoint> wps;
    bool wpLoaded = false;
    int32_t lastLat = 0, lastLon = 0;
    uint32_t lastFixMs = 0;
    bool trackOn = false;
    uint32_t trackCount = 0;
    int32_t trackLat = 0, trackLon = 0;
    uint32_t trackMs = 0;
};

// Empfängt Meshtastic-Wegpunkte (App oder Mesh) und legt sie als eigene Wegpunkte ab
class KiraWaypointRx : public SinglePortModule
{
  public:
    KiraWaypointRx();

  protected:
    ProcessMessage handleReceived(const meshtastic_MeshPacket &mp) override;
};

extern KiraNav *kiraNav;
std::string formatDistance(float m); // „850 m“, „1,2 km“

} // namespace ThinkKira
