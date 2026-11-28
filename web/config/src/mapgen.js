// ThinkKira Offline-Karte im Browser bauen – gleiche Logik und gleiches Dateiformat (.tkm) wie tools/mapgen/mapgen.py.
// Daten: © OpenStreetMap-Mitwirkende, ODbL (über Overpass).
// SPDX-License-Identifier: GPL-3.0-only

const TILE_LAT = 0.01;
const TILE_LON = 0.015;
const UNIT = 1e-5;

// Typ-Nummern – müssen zu src/custom/ui/KiraMap.cpp passen
const T_MAJOR = 1, T_MINOR = 2, T_RESIDENTIAL = 3, T_TRACK = 4, T_PATH = 5, T_RAIL = 6, T_WATERWAY = 7, T_WATERSHORE = 8;
const T_CITY = 20, T_TOWN = 21, T_VILLAGE = 22, T_SUBURB = 23, T_POI = 24;

const HIGHWAY = {
  motorway: [T_MAJOR, 1], trunk: [T_MAJOR, 1], primary: [T_MAJOR, 1], secondary: [T_MAJOR, 1],
  motorway_link: [T_MAJOR, 1], trunk_link: [T_MAJOR, 1], primary_link: [T_MAJOR, 1],
  tertiary: [T_MINOR, 1], secondary_link: [T_MINOR, 1], tertiary_link: [T_MINOR, 1],
  unclassified: [T_RESIDENTIAL, 2], residential: [T_RESIDENTIAL, 2], living_street: [T_RESIDENTIAL, 2],
  service: [T_RESIDENTIAL, 3], track: [T_TRACK, 2], pedestrian: [T_PATH, 3],
  footway: [T_PATH, 3], path: [T_PATH, 3], cycleway: [T_PATH, 3], bridleway: [T_PATH, 3], steps: [T_PATH, 3],
};
const PLACE = { city: [T_CITY, 1], town: [T_TOWN, 1], village: [T_VILLAGE, 1], suburb: [T_SUBURB, 1], hamlet: [T_VILLAGE, 2] };
const LEVEL0 = new Set([T_MAJOR, T_RAIL, T_WATERWAY, T_WATERSHORE, T_CITY, T_TOWN]);

export const MAX_SPAN = { lat: 0.8, lon: 1.2 }; // größer passt selbst in Stufe 0 kaum in 700 KB

const SERVERS = ["https://overpass-api.de/api/interpreter", "https://overpass.private.coffee/api/interpreter"];

// OSM-Daten für das Gebiet holen; bei großen Gebieten nur Hauptsachen (spart Download)
export async function fetchOsm([s, w, n, e], onStatus = () => {}, big = false) {
  const hw = big ? '["highway"~"^(motorway|trunk|primary|secondary|tertiary)(_link)?$"]' : '["highway"]';
  const q = `[out:json][timeout:180];
(
  way${hw}(${s},${w},${n},${e});
  way["railway"~"^(rail|light_rail|subway|tram)$"](${s},${w},${n},${e});
  way["waterway"~"^(river|canal${big ? "" : "|stream"})$"](${s},${w},${n},${e});
  way["natural"="water"](${s},${w},${n},${e});
  node["place"~"^(city|town|village|suburb|hamlet)$"](${s},${w},${n},${e});
  ${big ? "" : `node["amenity"~"^(hospital|pharmacy|police|fire_station)$"](${s},${w},${n},${e});\n  node["railway"="station"](${s},${w},${n},${e});`}
);
out geom;`;
  let last;
  for (let attempt = 0; attempt < 4; attempt++) {
    const url = SERVERS[attempt % SERVERS.length];
    try {
      onStatus(attempt ? `OpenStreetMap-Server ausgelastet, neuer Versuch (${attempt + 1}/4) …` : "Lade OpenStreetMap-Daten …");
      const r = await fetch(url, { method: "POST", body: new URLSearchParams({ data: q }) });
      if (!r.ok) throw new Error("Server antwortet " + r.status);
      onStatus("Daten empfangen, baue Karte …");
      return await r.json();
    } catch (e) {
      last = e;
      await new Promise((res) => setTimeout(res, 5000 * (attempt + 1)));
    }
  }
  throw new Error("OpenStreetMap-Daten nicht erreichbar (" + (last?.message ?? last) + "). Bitte später nochmal versuchen.");
}

function classify(el) {
  const t = el.tags ?? {};
  if (el.type === "node") {
    if (PLACE[t.place] && t.name) return [...PLACE[t.place], t.name];
    if (t.name && (t.amenity || t.railway === "station")) return [T_POI, 3, t.name];
    return null;
  }
  if (HIGHWAY[t.highway]) return t.area === "yes" ? null : [...HIGHWAY[t.highway], null];
  if (t.railway) return [T_RAIL, 1, null];
  if (t.waterway === "river" || t.waterway === "canal") return [T_WATERWAY, 1, null];
  if (t.waterway === "stream") return [T_WATERWAY, 3, null];
  if (t.natural === "water") return [T_WATERSHORE, 1, null];
  return null;
}

function simplify(pts, tol, lat0) {
  if (pts.length < 3) return pts;
  const c = Math.cos((lat0 * Math.PI) / 180);
  const xy = pts.map(([a, b]) => [b * 111320 * c, a * 110540]);
  const keep = new Array(pts.length).fill(false);
  keep[0] = keep[pts.length - 1] = true;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [i, j] = stack.pop();
    const [x1, y1] = xy[i], [x2, y2] = xy[j];
    const dx = x2 - x1, dy = y2 - y1;
    const ln = Math.hypot(dx, dy) || 1e-9;
    let best = -1, bi = -1;
    for (let k = i + 1; k < j; k++) {
      const d = Math.abs(dy * (xy[k][0] - x1) - dx * (xy[k][1] - y1)) / ln;
      if (d > best) (best = d), (bi = k);
    }
    if (best > tol) {
      keep[bi] = true;
      stack.push([i, bi], [bi, j]);
    }
  }
  return pts.filter((_, k) => keep[k]);
}

function densify(pts, sLat, sLon) {
  const out = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    const [a1, b1] = pts[i - 1], [a2, b2] = pts[i];
    const n = Math.floor(Math.max(Math.abs(a2 - a1) / sLat, Math.abs(b2 - b1) / sLon));
    for (let k = 1; k <= n; k++) out.push([a1 + ((a2 - a1) * k) / (n + 1), b1 + ((b2 - b1) * k) / (n + 1)]);
    out.push([a2, b2]);
  }
  return out;
}

class Builder {
  constructor([s, w, n, e]) {
    Object.assign(this, { s, w, n, e });
    this.nx = Math.max(1, Math.ceil((e - w) / TILE_LON));
    this.ny = Math.max(1, Math.ceil((n - s) / TILE_LAT));
    this.tiles = Array.from({ length: this.nx * this.ny }, () => []);
  }
  tileOf(lat, lon) {
    return [Math.min(this.nx - 1, Math.max(0, Math.floor((lon - this.w) / TILE_LON))), Math.min(this.ny - 1, Math.max(0, Math.floor((lat - this.s) / TILE_LAT)))];
  }
  put(tx, ty, typ, pts, name = null) {
    const olat = this.s + ty * TILE_LAT, olon = this.w + tx * TILE_LON;
    const q = pts.map(([a, b]) => [Math.round((a - olat) / UNIT), Math.round((b - olon) / UNIT)]);
    const out = q.map((p, i) => (i ? [p[0] - q[i - 1][0], p[1] - q[i - 1][1]] : p));
    if (out.some((p) => p.some((v) => v < -32768 || v > 32767))) return;
    const clean = [out[0], ...out.slice(1).filter((p) => p[0] || p[1])];
    if (name === null && clean.length < 2) return;
    const buf = this.tiles[ty * this.nx + tx];
    buf.push(typ, clean.length & 255, clean.length >> 8);
    for (const [a, b] of clean) buf.push(a & 255, (a >> 8) & 255, b & 255, (b >> 8) & 255);
    if (name !== null) {
      let nb = new TextEncoder().encode(name);
      if (nb.length > 40) nb = nb.subarray(0, 40);
      buf.push(nb.length, ...nb);
    }
  }
  addLine(typ, pts) {
    const inside = pts.filter(([a, b]) => a >= this.s - 0.02 && a <= this.n + 0.02 && b >= this.w - 0.03 && b <= this.e + 0.03);
    if (inside.length < 2) return;
    pts = densify(pts, TILE_LAT / 2, TILE_LON / 2);
    let run = [], cur = null;
    for (let i = 0; i < pts.length; i++) {
      const t = this.tileOf(...pts[i]);
      if (!cur) (cur = t), (run = [pts[i]]);
      else if (t[0] === cur[0] && t[1] === cur[1]) run.push(pts[i]);
      else {
        run.push(pts[i]);
        this.put(cur[0], cur[1], typ, run);
        cur = t;
        run = [pts[i - 1], pts[i]];
      }
    }
    if (run.length >= 2) this.put(cur[0], cur[1], typ, run);
  }
  addPoint(typ, lat, lon, name) {
    if (lat >= this.s && lat <= this.n && lon >= this.w && lon <= this.e) this.put(...this.tileOf(lat, lon), typ, [[lat, lon]], name);
  }
  build(level) {
    const headLen = 32, idxLen = 8 * this.tiles.length;
    const total = headLen + idxLen + this.tiles.reduce((s, t) => s + t.length, 0);
    const out = new Uint8Array(total);
    const v = new DataView(out.buffer);
    out.set([84, 75, 77, 49], 0); // "TKM1"
    v.setUint16(4, 1, true);
    v.setUint16(6, level, true);
    [this.s, this.w, this.n, this.e].forEach((x, i) => v.setInt32(8 + 4 * i, Math.round(x * 1e7), true));
    v.setUint16(24, this.nx, true);
    v.setUint16(26, this.ny, true);
    v.setUint32(28, 0, true);
    let off = headLen + idxLen;
    this.tiles.forEach((t, i) => {
      v.setUint32(headLen + 8 * i, off, true);
      v.setUint32(headLen + 8 * i + 4, t.length, true);
      out.set(t, off);
      off += t.length;
    });
    return out;
  }
}

function make(data, bbox, level, tol) {
  const b = new Builder(bbox);
  const lat0 = (bbox[0] + bbox[2]) / 2;
  for (const el of data.elements) {
    const c = classify(el);
    if (!c || c[1] > Math.max(level, 1)) continue;
    const [typ, , name] = c;
    if (level === 0 && !LEVEL0.has(typ)) continue;
    if (el.type === "node") b.addPoint(typ, el.lat, el.lon, name);
    else if (el.geometry) {
      const pts = el.geometry.filter(Boolean).map((g) => [g.lat, g.lon]);
      if (pts.length >= 2) b.addLine(typ, simplify(pts, tol, lat0));
    }
  }
  return b.build(level);
}

// Höchste Detailstufe, die ins Budget passt → { bytes, level } oder Fehler
export async function buildMap(data, bbox, budgetKB = 700, minLevel = 1, onStatus = () => {}) {
  let best = null;
  for (let level = minLevel; level < 4; level++) {
    if (!best && level > minLevel) break;
    let fit = false;
    for (const tol of [6, 10]) {
      onStatus(`Baue Detailstufe ${level} …`);
      await new Promise((r) => setTimeout(r, 0)); // Oberfläche aktualisieren lassen
      const out = make(data, bbox, level, tol);
      if (out.length / 1024 <= budgetKB) {
        best = { bytes: out, level };
        fit = true;
        break;
      }
    }
    if (!fit) break;
  }
  if (!best) throw new Error(`Das Gebiet ist zu groß für ${budgetKB} KB. Bitte ein kleineres Gebiet wählen.`);
  return best;
}
