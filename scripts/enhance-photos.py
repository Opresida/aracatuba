"""Realce de qualidade das fotos de produto (não altera o conteúdo).
autocontraste + contraste/cor + unsharp mask -> webp alta qualidade.
Uso: python scripts/enhance-photos.py
"""
import glob
import os
from PIL import Image, ImageOps, ImageEnhance, ImageFilter

DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images", "produtos")

for src in sorted(glob.glob(os.path.join(DIR, "*.orig.jpeg"))):
    name = os.path.basename(src).replace(".orig.jpeg", "")
    img = Image.open(src).convert("RGB")

    # exposição/contraste automáticos (corrige fotos "lavadas")
    img = ImageOps.autocontrast(img, cutoff=0.4)
    img = ImageEnhance.Contrast(img).enhance(1.06)
    img = ImageEnhance.Color(img).enhance(1.10)
    img = ImageEnhance.Brightness(img).enhance(1.02)

    # nitidez (unsharp mask) — realça bordas/rótulos sem inventar detalhe
    img = img.filter(ImageFilter.UnsharpMask(radius=2.2, percent=120, threshold=3))

    out = os.path.join(DIR, name + ".webp")
    img.save(out, "WEBP", quality=90, method=6)
    print(f"{name}: {img.width}x{img.height} -> {out} ({os.path.getsize(out)//1024} KB)")
