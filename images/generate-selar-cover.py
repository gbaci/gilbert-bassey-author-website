from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

base_dir = os.path.dirname(os.path.abspath(__file__))

# Load and crop typewriter to square (center crop)
img = Image.open(os.path.join(base_dir, "lsc-hero-typewriter.jpg"))
w, h = img.size
# Center-crop to square
side = min(w, h)
left = (w - side) // 2
top = (h - side) // 2
img = img.crop((left, top, left + side, top + side))
img = img.resize((1500, 1500), Image.LANCZOS)

# Darken the image with overlay
overlay = Image.new("RGBA", (1500, 1500), (0, 0, 0, 160))
img = img.convert("RGBA")
img = Image.alpha_composite(img, overlay)

draw = ImageDraw.Draw(img)

# Try to use Georgia or fall back to a serif font
font_paths = [
    "/Library/Fonts/Georgia.ttf",
    "/Library/Fonts/Georgia Bold.ttf",
    "/System/Library/Fonts/Supplemental/Georgia.ttf",
    "/System/Library/Fonts/Supplemental/Georgia Bold.ttf",
    "/Library/Fonts/Times New Roman Bold.ttf",
    "/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf",
]

font_path = None
font_path_regular = None
for fp in font_paths:
    if os.path.exists(fp):
        if "Bold" in fp and font_path is None:
            font_path = fp
        elif "Bold" not in fp and font_path_regular is None:
            font_path_regular = fp

if font_path is None:
    font_path = font_path_regular

# Fonts
title_font = ImageFont.truetype(font_path, 120) if font_path else ImageFont.load_default()
the_font = ImageFont.truetype(font_path_regular or font_path, 44) if (font_path_regular or font_path) else ImageFont.load_default()
subtitle_font = ImageFont.truetype(font_path_regular or font_path, 48) if (font_path_regular or font_path) else ImageFont.load_default()
name_font = ImageFont.truetype(font_path_regular or font_path, 44) if (font_path_regular or font_path) else ImageFont.load_default()

# Layout — centered vertically and horizontally
center_x = 750

# Calculate total text block height to center it
# THE (44) + gap(15) + STORYTELLING (120) + gap(10) + COURSE (120) + gap(30) + line + gap(20) + by LS (48) + gap(15) + GB (44)
# Total ~= 466
block_height = 466
y_start = (1500 - block_height) // 2

# "THE" — small, white, uppercase
the_text = "THE"
bbox0 = draw.textbbox((0, 0), the_text, font=the_font)
tw0 = bbox0[2] - bbox0[0]
draw.text((center_x - tw0 // 2, y_start), the_text, fill="#aaaaaa", font=the_font)

# "STORYTELLING" — white, uppercase
y_story = y_start + 55
story_text = "STORYTELLING"
bbox = draw.textbbox((0, 0), story_text, font=title_font)
tw = bbox[2] - bbox[0]
draw.text((center_x - tw // 2, y_story), story_text, fill="white", font=title_font)

# "COURSE" — red, uppercase
y_course = y_story + 125
course_text = "COURSE"
bbox2 = draw.textbbox((0, 0), course_text, font=title_font)
tw2 = bbox2[2] - bbox2[0]
draw.text((center_x - tw2 // 2, y_course), course_text, fill="#c41e3a", font=title_font)

# Thin line
y_line = y_course + 140
draw.line([(center_x - 120, y_line), (center_x + 120, y_line)], fill="#c41e3a", width=2)

# "by Learn Storycraft"
y_sub = y_line + 25
sub_text = "by Learn Storycraft"
bbox3 = draw.textbbox((0, 0), sub_text, font=subtitle_font)
tw3 = bbox3[2] - bbox3[0]
draw.text((center_x - tw3 // 2, y_sub), sub_text, fill="#aaaaaa", font=subtitle_font)

# "Gilbert Bassey"
y_by = y_sub + 60
by_text = "Gilbert Bassey"
bbox4 = draw.textbbox((0, 0), by_text, font=name_font)
tw4 = bbox4[2] - bbox4[0]
draw.text((center_x - tw4 // 2, y_by), by_text, fill="#888888", font=name_font)

# Convert back to RGB and save
img = img.convert("RGB")
output_path = os.path.join(base_dir, "lsc-selar-cover.jpg")
img.save(output_path, "JPEG", quality=95)
print(f"Saved to {output_path}")
print(f"Size: {img.size}")
