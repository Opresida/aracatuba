"""Gera og-image.png (1200x630) e favicon.png (180x180) com a marca Araçatuba.
Uso: python scripts/gen-og.py
"""
import os
from PIL import Image, ImageDraw, ImageFont

DIR = os.path.join(os.path.dirname(__file__), "..", "public")
GREEN = (28, 58, 43)
GOLD = (217, 164, 65)
WHITE = (255, 255, 255)
MUTED = (255, 255, 255, 190)

FBLACK = "C:/Windows/Fonts/ariblk.ttf"
FBOLD = "C:/Windows/Fonts/arialbd.ttf"


def emblema(size, letra_px):
    """Desenha o emblema 'A' (quadrado verde, borda dourada, A dourado)."""
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    r = int(size * 0.17)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=r, fill=GREEN)
    inset = int(size * 0.09)
    d.rounded_rectangle([inset, inset, size - inset, size - inset], radius=int(r * 0.7),
                        outline=GOLD, width=max(2, int(size * 0.02)))
    f = ImageFont.truetype(FBLACK, letra_px)
    d.text((size / 2, size / 2 - size * 0.04), "A", font=f, fill=GOLD, anchor="mm")
    return im


def letter_spaced(draw, pos, text, font, fill, spacing, anchor_center_x=None):
    """Escreve texto com espaçamento entre letras. Retorna largura total."""
    widths = [draw.textlength(c, font=font) for c in text]
    total = sum(widths) + spacing * (len(text) - 1)
    x = pos[0] - total / 2 if anchor_center_x else pos[0]
    y = pos[1]
    for c, w in zip(text, widths):
        draw.text((x, y), c, font=font, fill=fill)
        x += w + spacing
    return total


# ---------- OG image ----------
W, H = 1200, 630
og = Image.new("RGB", (W, H), GREEN)
d = ImageDraw.Draw(og)

# círculo decorativo (canto)
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse([W - 220, -220, W + 260, 260], fill=(217, 164, 65, 28))
og.paste(Image.alpha_composite(og.convert("RGBA"), glow).convert("RGB"), (0, 0))
d = ImageDraw.Draw(og)

# emblema centralizado no topo
emb = emblema(190, 150)
og.paste(emb, (int(W / 2 - 95), 150), emb)

# wordmark
f_word = ImageFont.truetype(FBLACK, 92)
d.text((W / 2, 400), "ARAÇATUBA", font=f_word, fill=WHITE, anchor="mm")

# subtítulo espaçado
f_sub = ImageFont.truetype(FBOLD, 30)
letter_spaced(d, (W / 2, 452), "DISTRIBUIDORA", f_sub, GOLD, 14, anchor_center_x=True)

# tagline
f_tag = ImageFont.truetype(FBOLD, 26)
d.text((W / 2, 540), "Abastecendo o seu negócio  •  Manaus / AM", font=f_tag,
       fill=(255, 255, 255), anchor="mm")

og.save(os.path.join(DIR, "og-image.png"), "PNG")
print("og-image.png 1200x630 gerado")

# ---------- OG image (brandbook) ----------
ogb = Image.new("RGB", (W, H), GREEN)
ogb.paste(Image.alpha_composite(ogb.convert("RGBA"), glow).convert("RGB"), (0, 0))
d = ImageDraw.Draw(ogb)
emb2 = emblema(170, 132)
ogb.paste(emb2, (int(W / 2 - 85), 138), emb2)
d.text((W / 2, 370), "ARAÇATUBA", font=ImageFont.truetype(FBLACK, 82), fill=WHITE, anchor="mm")
letter_spaced(d, (W / 2, 418), "DISTRIBUIDORA", ImageFont.truetype(FBOLD, 26), GOLD, 12, anchor_center_x=True)
# pílula "MANUAL DE MARCA"
pill_f = ImageFont.truetype(FBOLD, 30)
pill_txt = "MANUAL DE MARCA"
pw = d.textlength(pill_txt, font=pill_f) + 30 * (len(pill_txt) - 1) * 0  # base
# usa espaçamento manual, então mede diferente
spacing = 10
letters_w = sum(d.textlength(c, font=pill_f) for c in pill_txt) + spacing * (len(pill_txt) - 1)
pad_x, pad_y = 34, 16
px0 = W / 2 - letters_w / 2 - pad_x
px1 = W / 2 + letters_w / 2 + pad_x
py0, py1 = 500, 500 + 30 + pad_y * 2
d.rounded_rectangle([px0, py0, px1, py1], radius=(py1 - py0) / 2, fill=GOLD)
letter_spaced(d, (W / 2, py0 + pad_y), pill_txt, pill_f, GREEN, spacing, anchor_center_x=True)
ogb.save(os.path.join(DIR, "og-brandbook.png"), "PNG")
print("og-brandbook.png 1200x630 gerado")

# ---------- favicon PNG (fallback) ----------
fav = emblema(180, 128)
bg = Image.new("RGBA", (180, 180), (0, 0, 0, 0))
bg.alpha_composite(fav)
bg.save(os.path.join(DIR, "favicon.png"), "PNG")
print("favicon.png 180x180 gerado")
