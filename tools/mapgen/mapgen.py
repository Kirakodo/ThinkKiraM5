#!/usr/bin/env python3
# ThinkKira mapgen – wandelt einen OpenStreetMap-Ausschnitt in eine kompakte Offline-Karte (.tkm) für das ThinkNode M5.
# Daten: © OpenStreetMap-Mitwirkende, ODbL. Nur Python-Standardbibliothek.
#
#   python3 mapgen.py --bbox 52.26,12.95,52.45,13.32 --budget 700 --out potsdam.tkm
#   python3 mapgen.py --osm export.json ...      (statt Overpass: gespeicherte Overpass-JSON-Antwort)
#
# Detailstufen (es wird die höchste genommen, die ins Budget passt):
#   1 immer:      Haupt- und Nebenstraßen, Bahn, Flüsse/Kanäle, Seeufer, Ortsnamen
#   2 wenn Platz: Wohnstraßen, Erschließungs-, Feld- und Waldwege
#   3 nur bei Platz: Fußwege, Pfade, Radwege, wenige Orte von Interesse
#
# Dateiformat (alle Zahlen little-endian):
#   Kopf 32 Byte: "TKM1" | uint16 Version=1 | uint16 Stufe | int32 latMin | int32 lonMin | int32 latMax | int32 lonMax
#                 (1e-7 Grad) | uint16 Kacheln X | uint16 Kacheln Y | uint32 reserviert
#   Kachel-Index: je Kachel uint32 Offset + uint32 Länge (Zeile für Zeile von Süden nach Norden, West → Ost)
#   Kachel: Folge von Objekten
#     uint8 Typ, uint16 Punkte n, dann n × (int16 dLat, int16 dLon) in 1e-5 Grad;
#     erster Punkt relativ zur Kachel-Ecke (Süd-West), weitere relativ zum vorigen Punkt.
#     Typ 20–29 (Namen/Punkte): 1 Punkt, danach uint8 Länge + UTF-8-Text.
# SPDX-License-Identifier: GPL-3.0-only
import argparse
import json
import math
import struct
import sys
import time
import urllib.parse
import urllib.request

TILE_LAT = 0.01  # ≈ 1,1 km
TILE_LON = 0.015  # ≈ 1,0 km bei 52° N
UNIT = 1e-5  # Koordinaten-Einheit in den Kacheln (≈ 1,1 m)

# Typ-Nummern – müssen zu src/custom/ui/KiraMap.cpp passen
T_MAJOR, T_MINOR, T_RESIDENTIAL, T_TRACK, T_PATH, T_RAIL, T_WATERWAY, T_WATERSHORE = 1, 2, 3, 4, 5, 6, 7, 8
T_CITY, T_TOWN, T_VILLAGE, T_SUBURB, T_POI = 20, 21, 22, 23, 24

HIGHWAY = {
    "motorway": (T_MAJOR, 1), "trunk": (T_MAJOR, 1), "primary": (T_MAJOR, 1), "secondary": (T_MAJOR, 1),
    "motorway_link": (T_MAJOR, 1), "trunk_link": (T_MAJOR, 1), "primary_link": (T_MAJOR, 1),
    "tertiary": (T_MINOR, 1), "secondary_link": (T_MINOR, 1), "tertiary_link": (T_MINOR, 1),
    "unclassified": (T_RESIDENTIAL, 2), "residential": (T_RESIDENTIAL, 2), "living_street": (T_RESIDENTIAL, 2),
    "service": (T_RESIDENTIAL, 3), "track": (T_TRACK, 2), "pedestrian": (T_PATH, 3),
    "footway": (T_PATH, 3), "path": (T_PATH, 3), "cycleway": (T_PATH, 3), "bridleway": (T_PATH, 3), "steps": (T_PATH, 3),
}
PLACE = {"city": (T_CITY, 1), "town": (T_TOWN, 1), "village": (T_VILLAGE, 1), "suburb": (T_SUBURB, 1), "hamlet": (T_VILLAGE, 2)}


def overpass(bbox):
    s, w, n, e = bbox
    q = f"""[out:json][timeout:300];
(
  way["highway"]({s},{w},{n},{e});
  way["railway"~"^(rail|light_rail|subway|tram)$"]({s},{w},{n},{e});
  way["waterway"~"^(river|canal|stream)$"]({s},{w},{n},{e});
  way["natural"="water"]({s},{w},{n},{e});
  node["place"~"^(city|town|village|suburb|hamlet)$"]({s},{w},{n},{e});
  node["amenity"~"^(hospital|pharmacy|police|fire_station)$"]({s},{w},{n},{e});
  node["railway"="station"]({s},{w},{n},{e});
);
out geom;"""
    data = urllib.parse.urlencode({"data": q}).encode()
    servers = ["https://overpass-api.de/api/interpreter", "https://overpass.private.coffee/api/interpreter", "https://maps.mail.ru/osm/tools/overpass/api/interpreter"]
    last = None
    for attempt in range(6):  # Overpass ist oft überlastet: mehrere Server, mit Pausen
        url = servers[attempt % len(servers)]
        try:
            req = urllib.request.Request(url, data=data, headers={"User-Agent": "ThinkKira-mapgen"})
            with urllib.request.urlopen(req, timeout=600) as r:
                return json.load(r)
        except Exception as e:  # noqa: BLE001
            last = e
            print(f"{url}: {e} – neuer Versuch …", flush=True)
            time.sleep(20 * (attempt + 1))
    raise SystemExit(f"OpenStreetMap-Daten nicht erreichbar: {last}")


def classify(el):
    """→ (typ, stufe, name) oder None"""
    t = el.get("tags", {})
    if el["type"] == "node":
        if t.get("place") in PLACE and t.get("name"):
            typ, lvl = PLACE[t["place"]]
            return typ, lvl, t["name"]
        if t.get("name") and (t.get("amenity") or t.get("railway") == "station"):
            return T_POI, 3, t["name"]
        return None
    if t.get("highway") in HIGHWAY:
        typ, lvl = HIGHWAY[t["highway"]]
        if t.get("area") == "yes":
            return None
        return typ, lvl, None
    if t.get("railway"):
        return T_RAIL, 1, None
    if t.get("waterway") in ("river", "canal"):
        return T_WATERWAY, 1, None
    if t.get("waterway") == "stream":
        return T_WATERWAY, 3, None
    if t.get("natural") == "water":
        return T_WATERSHORE, 1, None
    return None


def to_xy(lat, lon, lat0):
    """Meter in lokaler Ebene (für Douglas-Peucker)"""
    return lon * 111320.0 * math.cos(math.radians(lat0)), lat * 110540.0


def simplify(pts, tol_m, lat0):
    if len(pts) < 3:
        return pts
    xy = [to_xy(a, b, lat0) for a, b in pts]
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        i, j = stack.pop()
        (x1, y1), (x2, y2) = xy[i], xy[j]
        dx, dy = x2 - x1, y2 - y1
        ln = math.hypot(dx, dy) or 1e-9
        best, bi = -1, -1
        for k in range(i + 1, j):
            x, y = xy[k]
            d = abs(dy * (x - x1) - dx * (y - y1)) / ln
            if d > best:
                best, bi = d, k
        if best > tol_m:
            keep[bi] = True
            stack += [(i, bi), (bi, j)]
    return [p for p, k in zip(pts, keep) if k]


def densify(pts, step_deg):
    """lange Abschnitte teilen, damit keine Kachel übersprungen wird"""
    out = [pts[0]]
    for (a1, b1), (a2, b2) in zip(pts, pts[1:]):
        n = int(max(abs(a2 - a1) / step_deg[0], abs(b2 - b1) / step_deg[1]))
        for k in range(1, n + 1):
            out.append((a1 + (a2 - a1) * k / (n + 1), b1 + (b2 - b1) * k / (n + 1)))
        out.append((a2, b2))
    return out


class MapBuilder:
    def __init__(self, bbox):
        self.s, self.w, self.n, self.e = bbox
        self.nx = max(1, math.ceil((self.e - self.w) / TILE_LON))
        self.ny = max(1, math.ceil((self.n - self.s) / TILE_LAT))
        self.tiles = [bytearray() for _ in range(self.nx * self.ny)]

    def tile_of(self, lat, lon):
        tx = min(self.nx - 1, max(0, int((lon - self.w) / TILE_LON)))
        ty = min(self.ny - 1, max(0, int((lat - self.s) / TILE_LAT)))
        return tx, ty

    def origin(self, tx, ty):
        return self.s + ty * TILE_LAT, self.w + tx * TILE_LON

    def put(self, tx, ty, typ, pts, name=None):
        olat, olon = self.origin(tx, ty)
        buf = self.tiles[ty * self.nx + tx]
        q = [(round((a - olat) / UNIT), round((b - olon) / UNIT)) for a, b in pts]
        out = [q[0]] + [(q[i][0] - q[i - 1][0], q[i][1] - q[i - 1][1]) for i in range(1, len(q))]
        if any(not (-32768 <= v <= 32767) for p in out for v in p):
            return
        # aufeinanderfolgende gleiche Punkte (nach Rundung) weglassen
        clean = [out[0]] + [p for p in out[1:] if p != (0, 0)]
        if name is None and len(clean) < 2:
            return
        buf += struct.pack("<BH", typ, len(clean))
        for a, b in clean:
            buf += struct.pack("<hh", a, b)
        if name is not None:
            nb = name.encode("utf-8")[:40]
            buf += struct.pack("<B", len(nb)) + nb

    def add_line(self, typ, pts):
        inside = [p for p in pts if self.s - 0.02 <= p[0] <= self.n + 0.02 and self.w - 0.03 <= p[1] <= self.e + 0.03]
        if len(inside) < 2:
            return
        pts = densify(pts, (TILE_LAT / 2, TILE_LON / 2))
        run, cur = [], None
        for i, p in enumerate(pts):
            t = self.tile_of(*p)
            if cur is None:
                cur, run = t, [p]
            elif t == cur:
                run.append(p)
            else:
                run.append(p)  # Linie bis in die Nachbarkachel weiterführen
                self.put(*cur, typ, run)
                cur, run = t, [pts[i - 1], p]
        if run and len(run) >= 2:
            self.put(*cur, typ, run)

    def add_point(self, typ, lat, lon, name):
        if self.s <= lat <= self.n and self.w <= lon <= self.e:
            self.put(*self.tile_of(lat, lon), typ, [(lat, lon)], name)

    def build(self, level):
        head = b"TKM1" + struct.pack(
            "<HHiiiiHHI", 1, level, round(self.s * 1e7), round(self.w * 1e7), round(self.n * 1e7), round(self.e * 1e7), self.nx, self.ny, 0
        )
        index, body, off = bytearray(), bytearray(), len(head) + 8 * len(self.tiles)
        for t in self.tiles:
            index += struct.pack("<II", off + len(body), len(t))
            body += t
        return head + index + body


def make(data, bbox, level, tol):
    b = MapBuilder(bbox)
    lat0 = (bbox[0] + bbox[2]) / 2
    for el in data["elements"]:
        c = classify(el)
        if not c or c[1] > level:
            continue
        typ, _, name = c
        if el["type"] == "node":
            b.add_point(typ, el["lat"], el["lon"], name)
        elif "geometry" in el:
            pts = [(g["lat"], g["lon"]) for g in el["geometry"] if g]
            if len(pts) >= 2:
                b.add_line(typ, simplify(pts, tol, lat0))
    return b.build(level)


def main():
    ap = argparse.ArgumentParser(description="ThinkKira Offline-Karte erzeugen")
    ap.add_argument("--bbox", default="52.26,12.95,52.45,13.32", help="Süd,West,Nord,Ost")
    ap.add_argument("--budget", type=int, default=700, help="maximale Größe in KB")
    ap.add_argument("--tolerance", type=float, default=6.0, help="Vereinfachung in Metern (Douglas-Peucker)")
    ap.add_argument("--osm", help="gespeicherte Overpass-JSON-Datei statt Download")
    ap.add_argument("--save-osm", help="Overpass-Antwort zusätzlich speichern")
    ap.add_argument("--out", default="thinkkira-map.tkm")
    a = ap.parse_args()
    bbox = tuple(float(x) for x in a.bbox.split(","))
    if a.osm:
        with open(a.osm, encoding="utf-8") as f:
            data = json.load(f)
    else:
        print("Lade OpenStreetMap-Daten (Overpass) …", flush=True)
        data = overpass(bbox)
        if a.save_osm:
            with open(a.save_osm, "w", encoding="utf-8") as f:
                json.dump(data, f)
    print(f"{len(data['elements'])} OSM-Objekte", flush=True)
    best = None
    for level in (1, 2, 3):
        for tol in (a.tolerance, a.tolerance * 1.7):
            out = make(data, bbox, level, tol)
            kb = len(out) / 1024
            print(f"Stufe {level}, Vereinfachung {tol:.0f} m: {kb:.0f} KB", flush=True)
            if kb <= a.budget:
                best = (level, tol, out)
                break
    if not best:
        sys.exit(f"Passt nicht ins Budget von {a.budget} KB – Gebiet verkleinern oder teilen.")
    level, tol, out = best
    with open(a.out, "wb") as f:
        f.write(out)
    print(f"Fertig: {a.out}, Stufe {level}, {len(out) / 1024:.0f} KB. Daten © OpenStreetMap-Mitwirkende (ODbL).")


if __name__ == "__main__":
    main()
