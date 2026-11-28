#!/usr/bin/env python3
# ThinkKira – Bild (PNG/JPG) in ein XBM-Header für das Startlogo umwandeln (src/custom/ui/KiraLogo.h).
# Aufruf: python3 tools/logo/logo2xbm.py logo.png --max 120x96 [--threshold 128] [--invert]
# SPDX-License-Identifier: GPL-3.0-only
import argparse

from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument("image")
ap.add_argument("--max", default="120x96", help="maximale Größe BxH in Pixeln")
ap.add_argument("--threshold", type=int, default=128)
ap.add_argument("--invert", action="store_true", help="helle Teile werden schwarz")
ap.add_argument("--out", default="src/custom/ui/KiraLogo.h")
ap.add_argument("--preview", help="Vorschau als PNG speichern")
a = ap.parse_args()

mw, mh = (int(x) for x in a.max.split("x"))
img = Image.open(a.image).convert("RGBA")
bg = Image.new("RGBA", img.size, (255, 255, 255, 255))
img = Image.alpha_composite(bg, img).convert("L")
bbox = img.point(lambda v: 255 if v < 250 else 0).getbbox()  # Rand abschneiden
if bbox:
    img = img.crop(bbox)
img.thumbnail((mw, mh), Image.LANCZOS)
w, h = img.size
px = img.load()


def black(x, y):
    on = px[x, y] < a.threshold
    return not on if a.invert else on


data = []
for y in range(h):
    for xb in range(0, w, 8):
        b = 0
        for i in range(8):
            if xb + i < w and black(xb + i, y):
                b |= 1 << i  # XBM: niedrigstes Bit links
        data.append(b)

if a.preview:
    p = Image.new("1", (w, h), 1)
    for y in range(h):
        for x in range(w):
            if black(x, y):
                p.putpixel((x, y), 0)
    p.resize((w * 3, h * 3), Image.NEAREST).save(a.preview)

rows = ",\n    ".join(", ".join(f"0x{v:02x}" for v in data[i : i + 16]) for i in range(0, len(data), 16))
open(a.out, "w").write(
    f"""// ThinkKira – Startlogo (erzeugt mit tools/logo/logo2xbm.py, nicht von Hand ändern)
// SPDX-License-Identifier: GPL-3.0-only
#pragma once
#include <stdint.h>

#define KIRA_LOGO_W {w}
#define KIRA_LOGO_H {h}
static const uint8_t KIRA_LOGO[] = {{
    {rows}}};
"""
)
print(f"{a.out}: {w}x{h} Pixel, {len(data)} Byte")
