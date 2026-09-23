"""Right-sized AVIF and WebP copies of the site's heavy photos for phones and tablets.

Desktop (1280px and wider) keeps loading the original files; below that, <ResponsiveImg>
(src/components/ui/ResponsiveImg.jsx) offers these copies through <picture> sources.

Run from the project root after adding or replacing one of the images below:
    python scripts/responsive-images.py
It rewrites public/assets/images/responsive/** and src/data/responsiveImages.js.
Needs Python 3 with Pillow 11.3+ (AVIF and WebP support).
"""
import os
import shutil
from PIL import Image, ImageOps, features

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
PUBLIC = os.path.join(ROOT, 'public')
OUT_DIR = '/assets/images/responsive'
MANIFEST = os.path.join(ROOT, 'src', 'data', 'responsiveImages.js')

# Source (URL path) -> widths (capped at the original width, never upscaled). The largest
# width covers the biggest slot the image fills below 1280px at up to 3x pixel density.
IMAGES = {
    # Homepage: concern cards (paths carousel)
    '/assets/images/concern_rosacea.jpg': [480, 640, 896],
    '/assets/images/concern_skin_laxity.jpg': [480, 640, 896],
    '/assets/images/concern_stubborn_fat.jpg': [480, 640, 896],
    '/assets/images/concern_hyperpigmentation.jpg': [480, 640, 896],
    '/assets/images/concern_acne_scarring.jpg': [480, 640, 896],
    '/assets/images/concern_tattoo_removal.jpg': [320, 480, 640, 896],
    '/assets/images/concern_lip_plumping.jpg': [480, 640, 896],
    # Treatment photos (treatment cards, technologies carousel, Instagram row)
    '/assets/images/site/treatment-picoway.webp': [480, 800, 1200, 1600],
    '/assets/images/site/treatment-advatx.webp': [480, 800, 1200, 1600],
    '/assets/images/site/treatment-morpheus8.webp': [480, 800, 1200, 1600],
    '/assets/images/site/treatment-sofwave.webp': [480, 800, 1200, 1600],
    '/assets/images/site/emerald-laser.webp': [480, 800, 1200],
    '/assets/images/site/treatment-cosmelan.jpg': [320, 480, 640, 896],
    '/assets/images/site/treatment-hydrafacial.jpg': [320, 480, 640, 896],
    '/assets/images/site/why-clinic-room.webp': [480, 800, 1200],
    '/assets/images/site/why-detail-hands.webp': [480, 800, 1200],
    '/assets/images/site/emsculpt-neo.webp': [320, 640, 1024],
    '/assets/images/area_cheeks.jpg': [320, 600],
    '/assets/images/area_lips.jpg': [320, 600],
    '/assets/images/area_jawline.jpg': [320, 600],
    '/assets/images/area_eyes.jpg': [480, 896],
    '/assets/images/prefooter_serum.jpg': [320, 800, 1376],
    '/assets/videos/hero-clinic-live-poster.webp': [640, 960, 1280],
    '/assets/videos/hero-clinic-sanctuary-poster.webp': [640, 960, 1280],
    '/assets/images/kojivit_ultra_cream.png': [480, 768, 1024],
    '/assets/images/tretiheal_01.png': [240, 360],
    '/assets/images/tretiheal-0025-pack.webp': [240, 360, 640, 960, 1240],
    '/assets/images/allure_logo.png': [160, 320, 614],
    # Inner pages: treatment directory, treatment pages, price list thumbnails
    '/assets/images/picoway_laser.png': [320, 640, 1024],
    '/assets/images/advatx_laser.png': [320, 640, 1024],
    '/assets/images/morpheus8_rf.png': [320, 640, 1024],
    '/assets/images/sofwave_lift.png': [320, 640, 1024],
    '/assets/images/before_after_face.jpg': [320, 640],
}

# Skin close-ups keep their fine texture (redness, pigment) at a higher quality. AVIF is
# encoded without chroma subsampling so small red detail isn't averaged away.
SKIN = ('concern_', 'area_', 'before_after_face')
SETTINGS = {
    'skin': {'avif': 72, 'webp': 88},
    'photo': {'avif': 62, 'webp': 82},
    'logo': {'avif': 80, 'webp': 90},
}


def kind_of(src):
    if 'logo' in src:
        return 'logo'
    return 'skin' if any(key in src for key in SKIN) else 'photo'


def out_path(src, width, ext):
    # Keep in step with copyPath() in src/utils/responsiveImages.js
    rel = src.replace('/assets/images/', '', 1) if src.startswith('/assets/images/') else src.replace('/assets/', '', 1)
    stem, _ = os.path.splitext(rel)
    return f'{OUT_DIR}/{stem}-{width}.{ext}'


def main():
    if not (features.check('avif') and features.check('webp')):
        raise SystemExit('This Pillow build lacks AVIF or WebP support (needs Pillow 11.3+).')
    shutil.rmtree(PUBLIC + OUT_DIR, ignore_errors=True)
    manifest = {}
    for src, widths in IMAGES.items():
        im = ImageOps.exif_transpose(Image.open(PUBLIC + src))
        im = im.convert('RGBA')
        if im.getchannel('A').getextrema()[0] == 255:  # no real transparency
            im = im.convert('RGB')
        quality = SETTINGS[kind_of(src)]
        sizes = sorted({min(w, im.width) for w in widths})
        for w in sizes:
            copy = im if w == im.width else im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
            for ext in ('avif', 'webp'):
                dest = out_path(src, w, ext)
                os.makedirs(os.path.dirname(PUBLIC + dest), exist_ok=True)
                if ext == 'avif':
                    copy.save(PUBLIC + dest, 'AVIF', quality=quality['avif'], subsampling='4:4:4', speed=4)
                else:
                    copy.save(PUBLIC + dest, 'WEBP', quality=quality['webp'], method=6)
                print(f'{os.path.getsize(PUBLIC + dest) / 1024:7.1f} KB  {dest}')
        manifest[src] = (round(im.width / im.height, 4), sizes)

    lines = [
        '// Generated by scripts/responsive-images.py: do not edit by hand.',
        '// Original image URL -> [width / height ratio, widths of its AVIF and WebP copies].',
        '// The copies live under /assets/images/responsive (see src/utils/responsiveImages.js).',
        'export const MOBILE_COPIES = {',
    ]
    for src, (ratio, sizes) in manifest.items():
        lines.append(f"  '{src}': [{ratio}, [{', '.join(str(w) for w in sizes)}]],")
    lines.append('};')
    with open(MANIFEST, 'w', encoding='utf-8', newline='\n') as fh:
        fh.write('\n'.join(lines) + '\n')
    print('wrote', os.path.normpath(MANIFEST))


if __name__ == '__main__':
    main()
