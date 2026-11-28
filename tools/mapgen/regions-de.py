#!/usr/bin/env python3
# ThinkKira – Regionenliste Deutschland für tools/mapgen/batch.py erzeugen:
#   Raster (ganz Deutschland, ca. 50 × 50 km, grob) + Detailregionen (Großstädte, Wandergebiete, ca. 25 × 25 km).
#   python3 tools/mapgen/regions-de.py > regions-de.json
# SPDX-License-Identifier: GPL-3.0-only
import json

# name, Titel, Mitte lat, lon, Größe (Faktor zur Standardgröße 0,23° × 0,36°)
DETAIL = [
    ("berlin", "Berlin", 52.52, 13.40, 1.5), ("hamburg", "Hamburg", 53.55, 9.99, 1.2), ("muenchen", "München", 48.14, 11.58, 1.2),
    ("koeln", "Köln", 50.94, 6.96, 1), ("frankfurt", "Frankfurt am Main", 50.11, 8.68, 1), ("stuttgart", "Stuttgart", 48.78, 9.18, 1),
    ("duesseldorf", "Düsseldorf", 51.23, 6.78, 1), ("dortmund", "Dortmund", 51.51, 7.47, 1), ("essen", "Essen", 51.46, 7.01, 1),
    ("leipzig", "Leipzig", 51.34, 12.37, 1), ("dresden", "Dresden", 51.05, 13.74, 1), ("hannover", "Hannover", 52.37, 9.73, 1),
    ("nuernberg", "Nürnberg", 49.45, 11.08, 1), ("bremen", "Bremen", 53.08, 8.80, 1), ("kiel", "Kiel", 54.32, 10.13, 1),
    ("rostock", "Rostock", 54.09, 12.10, 1), ("magdeburg", "Magdeburg", 52.13, 11.63, 1), ("erfurt", "Erfurt", 50.98, 11.03, 1),
    ("mainz-wiesbaden", "Mainz / Wiesbaden", 50.03, 8.25, 1), ("saarbruecken", "Saarbrücken", 49.24, 6.99, 1),
    ("freiburg", "Freiburg im Breisgau", 47.99, 7.85, 1), ("karlsruhe", "Karlsruhe", 49.01, 8.40, 1),
    ("mannheim-heidelberg", "Mannheim / Heidelberg", 49.45, 8.57, 1), ("augsburg", "Augsburg", 48.37, 10.90, 1),
    ("regensburg", "Regensburg", 49.01, 12.10, 1), ("wuerzburg", "Würzburg", 49.79, 9.95, 1), ("muenster", "Münster", 51.96, 7.63, 1),
    ("bielefeld", "Bielefeld", 52.02, 8.53, 1), ("kassel", "Kassel", 51.31, 9.48, 1), ("braunschweig", "Braunschweig", 52.27, 10.52, 1),
    ("aachen", "Aachen", 50.78, 6.08, 1), ("bonn", "Bonn", 50.73, 7.10, 1), ("chemnitz", "Chemnitz", 50.83, 12.92, 1),
    ("schwerin", "Schwerin", 53.63, 11.41, 1),
    ("harz", "Harz (Brocken)", 51.80, 10.62, 1), ("saechsische-schweiz", "Sächsische Schweiz", 50.92, 14.15, 1),
    ("schwarzwald", "Schwarzwald (Feldberg)", 47.87, 8.00, 1), ("allgaeu", "Allgäu (Oberstdorf)", 47.41, 10.28, 1),
    ("berchtesgaden", "Berchtesgadener Land", 47.63, 12.99, 1), ("garmisch", "Garmisch-Partenkirchen / Zugspitze", 47.49, 11.10, 1),
    ("ruegen", "Rügen", 54.42, 13.43, 1.3), ("spreewald", "Spreewald", 51.87, 14.00, 1), ("bayerischer-wald", "Bayerischer Wald", 49.00, 13.35, 1),
    ("eifel", "Eifel", 50.40, 6.80, 1), ("thueringer-wald", "Thüringer Wald", 50.65, 10.75, 1),
    ("mecklenburger-seen", "Mecklenburgische Seenplatte", 53.40, 12.75, 1), ("usedom", "Usedom", 53.95, 14.05, 1), ("sylt", "Sylt", 54.90, 8.33, 1),
]
out = [{"name": "potsdam-ludwigsfelde", "title": "Potsdam – Ludwigsfelde", "bbox": [52.26, 12.95, 52.45, 13.32], "kind": "region"}]
for name, title, lat, lon, f in DETAIL:
    h, w = 0.23 * f / 2, 0.36 * f / 2
    out.append({"name": name, "title": title, "bbox": [round(lat - h, 3), round(lon - w, 3), round(lat + h, 3), round(lon + w, 3)], "kind": "region"})

# Raster: 0,45° × 0,75° (≈ 50 × 50 km), 0,02° Überlappung; leere Felder (Meer, Ausland) lässt batch.py weg
S, N, W, E, DLAT, DLON, OV = 47.25, 55.10, 5.85, 15.05, 0.45, 0.75, 0.02
row = 0
lat = S
while lat < N:
    col, lon = 0, W
    while lon < E:
        out.append({"name": f"de-raster-{row:02d}-{col:02d}", "bbox": [round(lat - OV, 3), round(lon - OV, 3), round(lat + DLAT + OV, 3), round(lon + DLON + OV, 3)],
                    "kind": "raster", "minLevel": 0})
        col, lon = col + 1, lon + DLON
    row, lat = row + 1, lat + DLAT
print(json.dumps(out, ensure_ascii=False, indent=1))
