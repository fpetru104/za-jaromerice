import os
from PIL import Image, ImageDraw, ImageFont

candidates = [
    (1, "Soňa Peprlová"),
    (2, "Petr Kříž"),
    (3, "František Petrů"),
    (4, "Pavlína Sovková"),
    (5, "Mgr. František Petrů"),
    (6, "Jaromír Prokeš"),
    (7, "Mgr. Pavlína Sovková"),
    (8, "Zdeněk Matoušek"),
    (9, "Ing. Lukáš Kunst"),
    (10, "Ing. Štěpán Malena"),
    (11, "Mgr. Karel Makovička"),
    (12, "Jan Chlubna"),
    (13, "MUDr. Hana Prokešová"),
    (14, "Jaroslava Kunstová"),
    (15, "Mgr. Raymonde Doležalová"),
    (16, "Michal Pavelec"),
    (17, "Vladimír Smrčka"),
    (18, "Pavel Brabenec"),
    (19, "Mojmír Ciešlak"),
    (20, "Aleš Pekárek"),
    (21, "Ing. Helena Peschová"),
]

WIDTH = 1080
HEIGHT = 1350

BG_COLOR = (248, 249, 250)      # Clean off-white
CARD_BG = (255, 255, 255)       # White card background
CARD_BORDER = (230, 235, 240)   # Light gray border
TEXT_COLOR = (20, 24, 33)       # Dark charcoal text
NUM_BG = (230, 0, 40)          # Red background for numbers
NUM_TEXT = (255, 255, 255)      # White number text
SUBTITLE_COLOR = (100, 110, 120)

image = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
draw = ImageDraw.Draw(image)

font_dir = r"c:\Users\frank\Documents\GitHub\za-jaromerice\assets"
bold_font_path = os.path.join(font_dir, "NotoSans-Bold.ttf")
regular_font_path = os.path.join(font_dir, "NotoSans-Regular.ttf")

title_font = ImageFont.truetype(bold_font_path, 42)
subtitle_font = ImageFont.truetype(regular_font_path, 22)
name_font = ImageFont.truetype(bold_font_path, 22)
num_font = ImageFont.truetype(bold_font_path, 20)

# --- Header ---
draw.text((WIDTH / 2, 55), "KANDIDÁTNÍ LISTINA", fill=TEXT_COLOR, font=title_font, anchor="mm")
draw.text((WIDTH / 2, 95), "Sdružení nezávislých kandidátů ZA JAROMĚŘICE", fill=SUBTITLE_COLOR, font=subtitle_font, anchor="mm")

draw.line([(80, 125), (WIDTH - 80, 125)], fill=(220, 225, 230), width=2)

left_col = candidates[:11]
right_col = candidates[11:]

col_width = 440
col1_x = 70
col2_x = 570
start_y = 150
row_height = 80

def draw_candidate_card(x, y, num, name):
    card_w = col_width
    card_h = 68
    
    draw.rounded_rectangle([x, y, x + card_w, y + card_h], radius=10, fill=CARD_BG, outline=CARD_BORDER, width=2)
    
    badge_size = 40
    badge_x = x + 15
    badge_y = y + (card_h - badge_size) / 2
    draw.rounded_rectangle([badge_x, badge_y, badge_x + badge_size, badge_y + badge_size], radius=8, fill=NUM_BG)
    draw.text((badge_x + badge_size / 2, badge_y + badge_size / 2), str(num), fill=NUM_TEXT, font=num_font, anchor="mm")
    
    text_x = badge_x + badge_size + 18
    text_y = y + card_h / 2
    draw.text((text_x, text_y), name, fill=TEXT_COLOR, font=name_font, anchor="lm")

for idx, (num, name) in enumerate(left_col):
    y = start_y + idx * row_height
    draw_candidate_card(col1_x, y, num, name)

for idx, (num, name) in enumerate(right_col):
    y = start_y + idx * row_height
    draw_candidate_card(col2_x, y, num, name)

logo_path = os.path.join(font_dir, "logo TEXT.png")
if not os.path.exists(logo_path):
    logo_path = os.path.join(font_dir, "logo.png")

if os.path.exists(logo_path):
    logo = Image.open(logo_path).convert("RGBA")
    logo_target_height = 160
    aspect_ratio = logo.width / logo.height
    logo_target_width = int(logo_target_height * aspect_ratio)
    logo_resized = logo.resize((logo_target_width, logo_target_height), Image.Resampling.LANCZOS)
    
    footer_y = 1060
    logo_x = int((WIDTH - logo_target_width) / 2)
    image.paste(logo_resized, (logo_x, footer_y), logo_resized)

output_path = r"c:\Users\frank\Documents\GitHub\za-jaromerice\assets\kandidatka_facebook.png"
image.save(output_path, "PNG")
print(f"Kandidátka byla úspěšně vygenerována do: {output_path}")
