"""
Generate the Open Graph share image (1200x630) at app/static/og-image.png.

Dark theme matching the site: subtle grid, ESP32 chip with circuit traces
and signal pulses on the right, name + focus on the left.

Usage:
    python scripts/generate_og.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (10, 10, 10)
FG = (245, 245, 245)
GRAY = (156, 163, 175)

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "app" / "static" / "og-image.png"
FONTS = Path("C:/Windows/Fonts")


def font(name: str, size: int):
    try:
        return ImageFont.truetype(str(FONTS / name), size)
    except Exception:
        return ImageFont.load_default()


img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img, "RGBA")

# Background grid
for x in range(0, W + 1, 60):
    d.line([(x, 0), (x, H)], fill=(255, 255, 255, 8))
for y in range(0, H + 1, 60):
    d.line([(0, y), (W, y)], fill=(255, 255, 255, 8))

f_name = font("segoeuib.ttf", 76)
f_sub = font("segoeui.ttf", 30)
f_mono = font("consola.ttf", 24)
f_mono_s = font("consola.ttf", 20)
f_chip = font("consola.ttf", 26)

# ── Right: chip + traces + pads + pulses ─────────────────
cx0, cy0, cx1, cy1 = 880, 225, 1070, 405
traces = [
    [(940, cy0), (940, 150), (860, 150), (860, 95)],
    [(1005, cy0), (1005, 120)],
    [(cx1, 270), (1140, 270)],
    [(cx1, 330), (1120, 330), (1120, 430)],
    [(1005, cy1), (1005, 520), (1080, 520)],
    [(940, cy1), (940, 560)],
    [(cx0, 300), (800, 300), (800, 210)],
    [(cx0, 360), (770, 360), (770, 470)],
]
for t in traces:
    d.line(t, fill=(255, 255, 255, 60), width=3)
    ex, ey = t[-1]
    d.ellipse([ex - 7, ey - 7, ex + 7, ey + 7], outline=(255, 255, 255, 120), width=3, fill=BG)

# Chip pins
for i in range(6):
    x = cx0 + 24 + i * 28
    d.rectangle([x, cy0 - 12, x + 12, cy0 - 2], fill=GRAY)
    d.rectangle([x, cy1 + 2, x + 12, cy1 + 12], fill=GRAY)

# Chip body
d.rounded_rectangle([cx0, cy0, cx1, cy1], radius=14, outline=FG, width=3, fill=(15, 20, 24))
d.rounded_rectangle([cx0 + 22, cy0 + 22, cx1 - 22, cy1 - 22], radius=8,
                    outline=(255, 255, 255, 50), width=2, fill=(10, 13, 16))
label_w = d.textlength("ESP32", font=f_chip)
d.text(((cx0 + cx1) / 2 - label_w / 2, (cy0 + cy1) / 2 - 16), "ESP32", font=f_chip, fill=(229, 229, 229))

# Signal pulses on the traces
for px, py in [(940, 190), (1100, 270), (800, 255), (1005, 480)]:
    d.ellipse([px - 14, py - 14, px + 14, py + 14], fill=(255, 255, 255, 28))
    d.ellipse([px - 5, py - 5, px + 5, py + 5], fill=FG)

# ── Left: text ───────────────────────────────────────────
d.text((80, 158), "IoT · EMBEDDED SYSTEMS · PORTFOLIO", font=f_mono, fill=GRAY)
d.text((80, 214), "Wildan Alfa Raezel", font=f_name, fill=FG)
d.text((80, 340), "ESP32 firmware, hardware builds, and connected", font=f_sub, fill=GRAY)
d.text((80, 382), "systems deployed in the field.", font=f_sub, fill=GRAY)
d.text((80, 470), "github.com/alfa219", font=f_mono_s, fill=(120, 127, 135))

img.save(OUT, "PNG", optimize=True)
print(f"saved {OUT} ({OUT.stat().st_size // 1024} KB)")
