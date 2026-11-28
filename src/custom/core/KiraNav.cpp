// SPDX-License-Identifier: GPL-3.0-only
#ifdef THINKKIRA
#include "KiraNav.h"
#include "FSCommon.h"
#include "KiraSettings.h"
#include "MeshService.h"
#include "NodeDB.h"
#include "RTC.h"
#include "SPILock.h"
#include "buzz.h"
#include "configuration.h"
#ifndef FILE_O_APPEND
#define FILE_O_APPEND "a"
#endif
#include "gps/GeoCoord.h"
#include "main.h"
#include "mesh/mesh-pb-constants.h"
#include <algorithm>
#include <math.h>
#include <stdlib.h>
#include <string.h>

namespace ThinkKira
{

KiraNav *kiraNav = nullptr;

static const char *WP_PATH = "/kira/wp.txt";
static const char *TARGET_PATH = "/kira/target.txt";
static const char *TRACK_PATH = "/kira/track.txt";

std::string formatDistance(float m)
{
    char b[16];
    if (m < 1000)
        snprintf(b, sizeof(b), "%u m", (unsigned)(m + 0.5f));
    else if (m < 10000) {
        snprintf(b, sizeof(b), "%.1f km", m / 1000);
        if (char *dot = strchr(b, '.'))
            *dot = ','; // deutsch: Komma
    } else
        snprintf(b, sizeof(b), "%u km", (unsigned)(m / 1000 + 0.5f));
    return b;
}

static float degrees(float rad)
{
    float d = rad * 180.0f / (float)M_PI;
    return d < 0 ? d + 360 : d;
}

// Liest eine ganze Datei (klein) als Text
static std::string readFile(const char *path, size_t max)
{
    std::string t;
#ifdef FSCom
    concurrency::LockGuard g(spiLock);
    File f = FSCom.open(path, FILE_O_READ);
    if (f) {
        while (f.available() && t.size() < max)
            t += (char)f.read();
        f.close();
    }
#endif
    return t;
}

static bool writeFile(const char *path, const std::string &text, bool append = false)
{
#ifdef FSCom
    concurrency::LockGuard g(spiLock);
    FSCom.mkdir("/kira");
    File f = FSCom.open(path, append ? FILE_O_APPEND : FILE_O_WRITE);
    if (!f)
        return false;
    f.print(text.c_str());
    f.close();
    return true;
#else
    return false;
#endif
}

KiraNav::KiraNav() : OSThread("KiraNav")
{
    kiraNav = this;
    arrivalRadius = settings().arrive;
    loadTarget();
    for (size_t off = 0;; off += 512) { // Punkte zählen, ohne die ganze Datei in den Speicher zu laden
        std::string t = trackChunk(off, 512);
        if (t.empty())
            break;
        trackCount += std::count(t.begin(), t.end(), '\n');
    }
    setIntervalFromNow(5000);
}

// ---------------------------------------------------------------- Wegpunkte

void KiraNav::loadWaypoints()
{
    wpLoaded = true;
    wps.clear();
    std::string t = readFile(WP_PATH, 8000);
    size_t pos = 0;
    while (pos < t.size() && wps.size() < WP_MAX) {
        size_t nl = t.find('\n', pos);
        if (nl == std::string::npos)
            nl = t.size();
        std::string line = t.substr(pos, nl - pos);
        pos = nl + 1;
        size_t a = line.find('|'), b = line.find('|', a + 1), c = line.find('|', b + 1);
        if (a == std::string::npos || b == std::string::npos)
            continue;
        Waypoint w;
        strncpy(w.name, line.substr(0, a).c_str(), sizeof(w.name) - 1);
        w.lat = strtol(line.c_str() + a + 1, nullptr, 10);
        w.lon = strtol(line.c_str() + b + 1, nullptr, 10);
        w.time = c == std::string::npos ? 0 : strtoul(line.c_str() + c + 1, nullptr, 10);
        wps.push_back(w);
    }
}

bool KiraNav::saveWaypoints()
{
    std::string t;
    char b[80];
    for (const Waypoint &w : wps) {
        snprintf(b, sizeof(b), "%s|%ld|%ld|%lu\n", w.name, (long)w.lat, (long)w.lon, (unsigned long)w.time);
        t += b;
    }
    rev++;
    return writeFile(WP_PATH, t);
}

const std::vector<Waypoint> &KiraNav::waypoints()
{
    if (!wpLoaded)
        loadWaypoints();
    return wps;
}

bool KiraNav::addWaypoint(const char *name, int32_t lat, int32_t lon, uint32_t time)
{
    waypoints();
    if (!lat && !lon)
        return false;
    // gleicher Name + fast gleicher Ort (z. B. erneut empfangen) → ersetzen statt doppelt
    for (Waypoint &w : wps)
        if (!strcmp(w.name, name) && abs(w.lat - lat) < 100 && abs(w.lon - lon) < 100) {
            w.lat = lat;
            w.lon = lon;
            return saveWaypoints();
        }
    if (wps.size() >= WP_MAX)
        return false;
    Waypoint w;
    strncpy(w.name, name, sizeof(w.name) - 1);
    for (char *c = w.name; *c; c++)
        if (*c == '|' || *c == '\n')
            *c = ' ';
    w.lat = lat;
    w.lon = lon;
    w.time = time;
    wps.push_back(w);
    return saveWaypoints();
}

bool KiraNav::addHere(std::string &nameOut)
{
    if (!localPosition.latitude_i && !localPosition.longitude_i)
        return false;
    waypoints();
    // nächster freier Name WP01, WP02, …
    char n[20];
    for (int i = 1; i < 100; i++) {
        snprintf(n, sizeof(n), "WP%02d", i);
        bool used = false;
        for (const Waypoint &w : wps)
            used |= !strcmp(w.name, n);
        if (!used)
            break;
    }
    nameOut = n;
    return addWaypoint(n, localPosition.latitude_i, localPosition.longitude_i, getValidTime(RTCQualityDevice));
}

bool KiraNav::removeWaypoint(size_t i)
{
    waypoints();
    if (i >= wps.size())
        return false;
    wps.erase(wps.begin() + i);
    return saveWaypoints();
}

bool KiraNav::renameWaypoint(size_t i, const char *name)
{
    waypoints();
    if (i >= wps.size() || !*name)
        return false;
    memset(wps[i].name, 0, sizeof(wps[i].name));
    strncpy(wps[i].name, name, sizeof(wps[i].name) - 1);
    for (char *c = wps[i].name; *c; c++)
        if (*c == '|' || *c == '\n')
            *c = ' ';
    return saveWaypoints();
}

bool KiraNav::sendWaypointToMesh(size_t i)
{
    waypoints();
    if (i >= wps.size() || !router)
        return false;
    meshtastic_Waypoint w = meshtastic_Waypoint_init_zero;
    w.id = (uint32_t)random(1, 0x7fffffff);
    w.has_latitude_i = w.has_longitude_i = true;
    w.latitude_i = wps[i].lat;
    w.longitude_i = wps[i].lon;
    strncpy(w.name, wps[i].name, sizeof(w.name) - 1);
    meshtastic_MeshPacket *p = router->allocForSending();
    if (!p)
        return false;
    p->to = NODENUM_BROADCAST;
    p->decoded.portnum = meshtastic_PortNum_WAYPOINT_APP;
    p->decoded.payload.size =
        pb_encode_to_bytes(p->decoded.payload.bytes, sizeof(p->decoded.payload.bytes), &meshtastic_Waypoint_msg, &w);
    service->sendToMesh(p, RX_SRC_LOCAL, true);
    return true;
}

std::vector<size_t> KiraNav::waypointsByDistance()
{
    waypoints();
    std::vector<size_t> idx(wps.size());
    for (size_t i = 0; i < idx.size(); i++)
        idx[i] = i;
    if (nav.havePos) {
        double la = localPosition.latitude_i * 1e-7, lo = localPosition.longitude_i * 1e-7;
        std::vector<float> d(wps.size());
        for (size_t i = 0; i < wps.size(); i++)
            d[i] = GeoCoord::latLongToMeter(la, lo, wps[i].lat * 1e-7, wps[i].lon * 1e-7);
        std::sort(idx.begin(), idx.end(), [&](size_t a, size_t b) { return d[a] < d[b]; });
    }
    return idx;
}

// ---------------------------------------------------------------- Ziel

void KiraNav::loadTarget()
{
    std::string t = readFile(TARGET_PATH, 200);
    if (t.empty())
        return;
    // art|name|lat|lon|knoten
    char buf[200];
    strncpy(buf, t.c_str(), sizeof(buf) - 1);
    buf[sizeof(buf) - 1] = 0;
    char *f[5] = {nullptr};
    char *p = buf;
    for (int i = 0; i < 5 && p; i++) {
        f[i] = p;
        p = strchr(p, '|');
        if (p)
            *p++ = 0;
    }
    if (!f[4])
        return;
    tgt.kind = (TargetKind)atoi(f[0]);
    strncpy(tgt.name, f[1], sizeof(tgt.name) - 1);
    tgt.lat = strtol(f[2], nullptr, 10);
    tgt.lon = strtol(f[3], nullptr, 10);
    tgt.node = strtoul(f[4], nullptr, 10);
}

void KiraNav::saveTarget()
{
    char b[120];
    snprintf(b, sizeof(b), "%u|%s|%ld|%ld|%lu\n", (unsigned)tgt.kind, tgt.name, (long)tgt.lat, (long)tgt.lon, (unsigned long)tgt.node);
    writeFile(TARGET_PATH, tgt.kind == TARGET_NONE ? std::string() : std::string(b));
}

void KiraNav::setTarget(const Target &t)
{
    tgt = t;
    saveTarget();
    rev++;
    setIntervalFromNow(0); // sofort neu berechnen
}

void KiraNav::clearTarget()
{
    tgt = Target();
    nav.haveTarget = false;
    saveTarget();
    rev++;
}

void KiraNav::onArrived()
{
    LOG_INFO("[Kira] Ziel erreicht: %s", tgt.name);
    playComboTune();
#ifdef HAS_PCA9557
    if (settings().leds) {
        io.digitalWrite(PCA_LED_ENABLE, HIGH);
        for (int i = 0; i < 3; i++) {
            io.digitalWrite(PCA_LED_NOTIFICATION, HIGH);
            delay(120);
            io.digitalWrite(PCA_LED_NOTIFICATION, LOW);
            delay(120);
        }
    }
#endif
    arrivedFlag = true;
    clearTarget();
}

// ---------------------------------------------------------------- Track

void KiraNav::setTracking(bool on)
{
    trackOn = on;
    trackMs = 0;
    rev++;
}

bool KiraNav::clearTrack()
{
#ifdef FSCom
    {
        concurrency::LockGuard g(spiLock);
        FSCom.remove(TRACK_PATH);
    }
#endif
    trackCount = 0;
    rev++;
    return true;
}

std::string KiraNav::trackChunk(size_t offset, size_t len)
{
    std::string t;
#ifdef FSCom
    concurrency::LockGuard g(spiLock);
    File f = FSCom.open(TRACK_PATH, FILE_O_READ);
    if (f) {
        if (f.seek(offset))
            while (f.available() && t.size() < len)
                t += (char)f.read();
        f.close();
    }
#endif
    return t;
}

// ---------------------------------------------------------------- laufend (1 s)

int32_t KiraNav::runOnce()
{
    uint32_t now = millis();
    nav.havePos = localPosition.latitude_i || localPosition.longitude_i;
    if (nav.havePos) {
        double la = localPosition.latitude_i * 1e-7, lo = localPosition.longitude_i * 1e-7;
        // Kurs: vom GPS, sonst aus zwei Positionen
        float speed = -1;
        if (localPosition.has_ground_speed)
            speed = localPosition.ground_speed * 3.6f; // m/s → km/h
        if (lastFixMs && (localPosition.latitude_i != lastLat || localPosition.longitude_i != lastLon)) {
            float moved = GeoCoord::latLongToMeter(lastLat * 1e-7, lastLon * 1e-7, la, lo);
            float dt = (now - lastFixMs) / 1000.0f;
            if (speed < 0 && dt > 0.5f)
                speed = moved / dt * 3.6f;
            if (moved >= 3) {
                if (localPosition.has_ground_track && localPosition.ground_track)
                    nav.course = localPosition.ground_track * 1e-5f;
                else
                    nav.course = degrees(GeoCoord::bearing(lastLat * 1e-7, lastLon * 1e-7, la, lo));
            }
            lastLat = localPosition.latitude_i;
            lastLon = localPosition.longitude_i;
            lastFixMs = now;
        } else if (!lastFixMs) {
            lastLat = localPosition.latitude_i;
            lastLon = localPosition.longitude_i;
            lastFixMs = now;
        } else if (now - lastFixMs > 10000)
            speed = 0; // seit 10 s keine Bewegung
        if (speed >= 0)
            nav.speedKmh = nav.speedKmh * 0.7f + speed * 0.3f;
        nav.moving = nav.speedKmh >= MIN_SPEED_KMH;

        // Ziel
        if (tgt.kind == TARGET_NODE) {
            meshtastic_PositionLite p;
            if (nodeDB->copyNodePosition(tgt.node, p) && (p.latitude_i || p.longitude_i)) {
                tgt.lat = p.latitude_i;
                tgt.lon = p.longitude_i;
            }
        }
        nav.haveTarget = tgt.kind != TARGET_NONE && (tgt.lat || tgt.lon);
        if (nav.haveTarget) {
            nav.distance = GeoCoord::latLongToMeter(la, lo, tgt.lat * 1e-7, tgt.lon * 1e-7);
            nav.bearing = degrees(GeoCoord::bearing(la, lo, tgt.lat * 1e-7, tgt.lon * 1e-7));
            nav.etaSec = nav.speedKmh >= MIN_SPEED_KMH ? (uint32_t)(nav.distance / (nav.speedKmh / 3.6f)) : 0;
            if (nav.distance <= arrivalRadius)
                onArrived();
        }

        // Track: alle 10 s, wenn mindestens 10 m weiter
        if (trackOn && now - trackMs >= 10000) {
            float d = trackLat || trackLon ? GeoCoord::latLongToMeter(trackLat * 1e-7, trackLon * 1e-7, la, lo) : 1e9f;
            if (d >= 10) {
                char b[48];
                snprintf(b, sizeof(b), "%ld,%ld,%lu\n", (long)localPosition.latitude_i, (long)localPosition.longitude_i,
                         (unsigned long)getValidTime(RTCQualityDevice));
                if (writeFile(TRACK_PATH, b, true)) {
                    trackCount++;
                    trackLat = localPosition.latitude_i;
                    trackLon = localPosition.longitude_i;
                }
            }
            trackMs = now;
        }
    } else
        nav.haveTarget = tgt.kind != TARGET_NONE;
    return 1000;
}

// ---------------------------------------------------------------- Empfang von Meshtastic-Wegpunkten

KiraWaypointRx::KiraWaypointRx() : SinglePortModule("kirawp", meshtastic_PortNum_WAYPOINT_APP) {}

ProcessMessage KiraWaypointRx::handleReceived(const meshtastic_MeshPacket &mp)
{
    meshtastic_Waypoint w = meshtastic_Waypoint_init_zero;
    if (kiraNav && pb_decode_from_bytes(mp.decoded.payload.bytes, mp.decoded.payload.size, &meshtastic_Waypoint_msg, &w) &&
        w.has_latitude_i && w.has_longitude_i && (w.expire == 0 || w.expire > getValidTime(RTCQualityDevice))) {
        char name[20];
        strncpy(name, w.name[0] ? w.name : "Wegpunkt", sizeof(name) - 1);
        name[sizeof(name) - 1] = 0;
        kiraNav->addWaypoint(name, w.latitude_i, w.longitude_i, mp.rx_time);
        LOG_INFO("[Kira] Wegpunkt empfangen: %s", name);
    }
    return ProcessMessage::CONTINUE; // Meshtastic-Wegpunktmodul bekommt ihn auch
}

} // namespace ThinkKira
#endif
