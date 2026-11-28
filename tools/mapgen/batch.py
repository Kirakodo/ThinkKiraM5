#!/usr/bin/env python3
# ThinkKira – viele Offline-Karten auf einmal aus einer OSM-PBF-Datei bauen (für den Workflow „ThinkKira Karten Deutschland“).
# Braucht osmium-tool. Regionen: JSON-Liste mit name, title, bbox [S,W,N,O], optional budget (KB), minLevel, kind.
#
#   python3 tools/mapgen/batch.py --pbf germany-filtered.osm.pbf --regions regions.json --out karten/
#
# Schreibt <name>.tkm je Region und karten.json (Verzeichnis für den Konfigurator).
# Daten: © OpenStreetMap-Mitwirkende, ODbL.
# SPDX-License-Identifier: GPL-3.0-only
import argparse
import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))

ap = argparse.ArgumentParser()
ap.add_argument("--pbf", required=True)
ap.add_argument("--regions", required=True)
ap.add_argument("--out", default="karten")
ap.add_argument("--chunk", type=int, default=6, help="Regionen je osmium-Durchlauf (mehr braucht viel Speicher)")
ap.add_argument("--min-objects", type=int, default=300, help="Regionen mit weniger OSM-Objekten auslassen (Meer, Ausland)")
a = ap.parse_args()

regions = json.load(open(a.regions, encoding="utf-8"))
os.makedirs(a.out, exist_ok=True)
work = os.path.join(a.out, "_work")
os.makedirs(work, exist_ok=True)
index, failed = [], []

for i in range(0, len(regions), a.chunk):
    part = regions[i : i + a.chunk]
    cfg = {"directory": work, "extracts": []}
    for r in part:
        s, w, n, e = r["bbox"]
        cfg["extracts"].append({"output": r["name"] + ".osm.pbf", "bbox": [w, s, e, n]})
    cfg_path = os.path.join(work, "extracts.json")
    json.dump(cfg, open(cfg_path, "w"))
    subprocess.run(["osmium", "extract", "-c", cfg_path, "--overwrite", "-s", "complete_ways", a.pbf], check=True)
    for r in part:
        pbf = os.path.join(work, r["name"] + ".osm.pbf")
        gj = os.path.join(work, r["name"] + ".geojsonseq")
        subprocess.run(["osmium", "export", "-f", "geojsonseq", "--overwrite", "-o", gj, pbf], check=True, stderr=subprocess.DEVNULL)
        info = os.path.join(work, r["name"] + ".info.json")
        tkm = os.path.join(a.out, r["name"] + ".tkm")
        cmd = [sys.executable, os.path.join(HERE, "mapgen.py"), "--geojson", gj, "--bbox", ",".join(str(x) for x in r["bbox"]),
               "--budget", str(r.get("budget", 700)), "--min-level", str(r.get("minLevel", 1)), "--out", tkm, "--info", info]
        res = subprocess.run(cmd, capture_output=True, text=True)
        os.remove(pbf)
        os.remove(gj)
        if res.returncode != 0:
            print(f"✗ {r['name']}: {res.stdout.strip().splitlines()[-1:] or res.stderr.strip()}", flush=True)
            failed.append(r["name"])
            continue
        inf = json.load(open(info, encoding="utf-8"))
        if inf["objects"] < a.min_objects:
            os.remove(tkm)
            print(f"– {r['name']}: leer, ausgelassen", flush=True)
            continue
        title = r.get("title") or ("Umgebung " + " / ".join(inf["places"][:2]) if inf["places"] else r["name"])
        index.append({"name": r["name"], "title": title, "kind": r.get("kind", "region"), "bbox": r["bbox"], "level": inf["level"], "bytes": inf["bytes"]})
        print(f"✓ {r['name']}: {title}, Stufe {inf['level']}, {inf['bytes'] // 1024} KB", flush=True)

index.sort(key=lambda x: (x["kind"] != "region", x["title"]))
json.dump({"version": 1, "license": "Kartendaten © OpenStreetMap-Mitwirkende, ODbL", "maps": index},
          open(os.path.join(a.out, "karten.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(f"{len(index)} Karten, {len(failed)} fehlgeschlagen: {', '.join(failed)}")
