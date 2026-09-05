from PIL import Image, ImageDraw, ImageFont
import os

base_dir = os.path.dirname(os.path.abspath(__file__))

# Facebook/Open Graph recommended link-preview size
W, H = 1200, 630

img = Image.open(os.path.join(base_dir, "gilbert-bw3.jpg")).convert("RGB")
w, h = img.size

# Center-crop to 1200x630 aspect ratio
target_ratio = W / H
src_ratio = w / h
if src_ratio > target_ratio:
    new_w = int(h * target_ratio)
    left = (w - new_w) // 2
    img = img.crop((left, 0, left + new_w, h))
else:
    new_h = int(w / target_ratio)
    top = (h - new_h) // 3  # bias toward top so face isn't cropped out
    img = img.crop((0, top, w, top + new_h))

img = img.resize((W, H), Image.LANCZOS)

# Dark cinematic overlay (near-black, matching site bg #0E0D0B)
overlay = Image.new("RGBA", (W, H), (14, 13, 11, 175))
img = img.convert("RGBA")
img = Image.alpha_composite(img, overlay)

# Extra gradient darkening on the left so left-aligned text stays legible
gradient = Image.new("L", (W, 1), color=0)
for x in range(W):
    # darker on the left, fading out by ~60% across
    t = min(x / (W * 0.62), 1.0)
    gradient.putpixel((x, 0), int(200 * (1 - t)))
gradient = gradient.resize((W, H))
black = Image.new("RGBA", (W, H), (14, 13, 11, 255))
img = Image.composite(black, img, gradient)

draw = ImageDraw.Draw(img)

font_paths = {
    "serif": "/System/Library/Fonts/Supplemental/BigCaslon.ttf",
    "sans": "/System/Library/Fonts/Supplemental/Georgia.ttf",
}

title_font = ImageFont.truetype(font_paths["serif"], 74)
kicker_font = ImageFont.truetype(font_paths["sans"], 22)
byline_font = ImageFont.truetype(font_paths["sans"], 26)

gold = (227, 190, 74)
gold_dim = (201, 162, 39)
cream = (236, 228, 214)
muted = (157, 149, 127)

left_x = 80

# Kicker
kicker = "VLOGGER OF THE YEAR, 2024"
draw.text((left_x, 165), kicker, font=kicker_font, fill=gold_dim)

# Title (two lines)
draw.text((left_x, 205), "The Vlogging", font=title_font, fill=cream)
draw.text((left_x, 285), "Course", font=title_font, fill=gold)

# Thin rule
rule_y = 395
draw.line([(left_x, rule_y), (left_x + 70, rule_y)], fill=gold_dim, width=2)

# Byline
draw.text((left_x, 420), "With Gillian Baci", font=byline_font, fill=cream)
draw.text((left_x, 458), "Grow your audience with vlogs people actually want to watch", font=kicker_font, fill=muted)

img = img.convert("RGB")
output_path = os.path.join(base_dir, "vlogging-course-cover.jpg")
img.save(output_path, "JPEG", quality=92)
print(f"Saved to {output_path}")
print(f"Size: {img.size}")
