"""
Process raw project photos: detect faces, blur them, resize, convert to WebP.

Usage:
    python scripts/process_photos.py vibradoor
    python scripts/process_photos.py vibradoor --no-blur     # skip face blur
    python scripts/process_photos.py vibradoor --max-width 1200

Reads from:  app/static/images/projects/<slug>/raw/*.{jpg,jpeg,png,webp,heic}
Writes to:   app/static/images/projects/<slug>/NN-original-name.webp

Originals di folder raw/ TIDAK dihapus dan TIDAK di-serve ke publik
(direkomendasikan di-gitignore — lihat .gitignore).

Dependencies:
    pip install -r requirements-photos.txt
"""
import argparse
import sys
from pathlib import Path

try:
    import cv2
    import numpy as np
except ImportError:
    sys.exit("ERROR: opencv-python/numpy belum terpasang. Jalankan:\n  "
             "pip install -r requirements-photos.txt")
try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("ERROR: Pillow belum terpasang. Jalankan:\n  "
             "pip install -r requirements-photos.txt")

# Optional HEIC support (iPhone photos)
try:
    from pillow_heif import register_heif_opener
    register_heif_opener()
    HEIC_SUPPORTED = True
except ImportError:
    HEIC_SUPPORTED = False


ROOT = Path(__file__).resolve().parent.parent
PROJECTS_DIR = ROOT / "app" / "static" / "images" / "projects"
SUPPORTED_EXT = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".heic", ".heif"}


def load_face_cascades():
    """Load both frontal and profile Haar cascades for better recall."""
    base = Path(cv2.data.haarcascades)
    frontal = cv2.CascadeClassifier(str(base / "haarcascade_frontalface_default.xml"))
    profile = cv2.CascadeClassifier(str(base / "haarcascade_profileface.xml"))
    if frontal.empty() or profile.empty():
        sys.exit("ERROR: Haar cascade XML tidak ditemukan. Reinstall opencv-python.")
    return frontal, profile


def detect_faces(img_bgr, frontal_cc, profile_cc):
    """Detect frontal + profile (left & flipped right) faces."""
    gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
    gray = cv2.equalizeHist(gray)

    boxes = []
    boxes.extend(frontal_cc.detectMultiScale(gray, 1.1, 5, minSize=(40, 40)))
    boxes.extend(profile_cc.detectMultiScale(gray, 1.1, 5, minSize=(40, 40)))
    # Right-facing profile: flip horizontally then re-flip coordinates
    flipped = cv2.flip(gray, 1)
    h, w = gray.shape
    for (x, y, fw, fh) in profile_cc.detectMultiScale(flipped, 1.1, 5, minSize=(40, 40)):
        boxes.append((w - x - fw, y, fw, fh))
    return boxes


def blur_faces(img_bgr, boxes, pad_ratio=0.25):
    """Apply heavy Gaussian blur to detected face regions, with padding for safety."""
    h, w = img_bgr.shape[:2]
    for (x, y, fw, fh) in boxes:
        # Add padding
        px, py = int(fw * pad_ratio), int(fh * pad_ratio)
        x1, y1 = max(0, x - px), max(0, y - py)
        x2, y2 = min(w, x + fw + px), min(h, y + fh + py)
        roi = img_bgr[y1:y2, x1:x2]
        if roi.size == 0:
            continue
        # Kernel size scaled to face size — much heavier than typical privacy blur
        k = max(31, ((max(fw, fh) // 4) | 1))
        blurred = cv2.GaussianBlur(roi, (k, k), 0)
        img_bgr[y1:y2, x1:x2] = blurred
    return img_bgr


def resize_keep_aspect(pil_img, max_width):
    w, h = pil_img.size
    if w <= max_width:
        return pil_img
    new_h = int(h * (max_width / w))
    return pil_img.resize((max_width, new_h), Image.LANCZOS)


def load_image_as_pil(in_path):
    """Load any supported format (incl. HEIC) via Pillow. Apply EXIF rotation."""
    try:
        pil = Image.open(in_path)
        pil = ImageOps.exif_transpose(pil)  # honour EXIF Orientation tag
        if pil.mode != "RGB":
            pil = pil.convert("RGB")
        return pil
    except Exception as e:
        print(f"  SKIP (cannot decode {in_path.suffix}): {in_path.name} — {e}")
        return None


def process_image(in_path, out_path, frontal_cc, profile_cc,
                  blur_enabled=True, max_width=1600, webp_quality=82):
    pil_img = load_image_as_pil(in_path)
    if pil_img is None:
        return None

    faces = []
    if blur_enabled:
        # PIL RGB → OpenCV BGR ndarray for face detection
        img_bgr = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)
        faces = detect_faces(img_bgr, frontal_cc, profile_cc)
        if faces:
            img_bgr = blur_faces(img_bgr, faces)
            # back to PIL for saving
            pil_img = Image.fromarray(cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB))

    pil_img = resize_keep_aspect(pil_img, max_width)
    pil_img.save(out_path, "WEBP", quality=webp_quality, method=6)

    return {"faces": len(faces), "out_size_kb": out_path.stat().st_size // 1024,
            "dim": pil_img.size}


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("slug", help="Project slug (mis. 'vibradoor')")
    ap.add_argument("--no-blur", action="store_true", help="Skip auto face blur")
    ap.add_argument("--max-width", type=int, default=1600,
                    help="Max output width in px (default: 1600)")
    ap.add_argument("--quality", type=int, default=82,
                    help="WebP quality 1-100 (default: 82)")
    args = ap.parse_args()

    src_dir = PROJECTS_DIR / args.slug / "raw"
    dst_dir = PROJECTS_DIR / args.slug
    if not src_dir.exists():
        sys.exit(f"ERROR: folder source tidak ada: {src_dir}")

    sources = sorted(p for p in src_dir.iterdir()
                     if p.suffix.lower() in SUPPORTED_EXT)
    if not sources:
        sys.exit(f"ERROR: tidak ada gambar di {src_dir}\n"
                 f"  Taruh foto JPG/PNG/WebP di folder itu, lalu jalankan ulang.")

    frontal_cc, profile_cc = load_face_cascades()

    print(f"Processing {len(sources)} photo(s) for project '{args.slug}'")
    print(f"  blur faces: {'NO' if args.no_blur else 'YES'}")
    print(f"  max width:  {args.max_width}px")
    print(f"  quality:    {args.quality}")
    print(f"  output:     {dst_dir}/")
    print()

    for i, src in enumerate(sources, start=1):
        # Output filename: 01-original-stem.webp
        stem = src.stem.lower().replace(" ", "-").replace("_", "-")
        out_name = f"{i:02d}-{stem}.webp"
        out_path = dst_dir / out_name
        print(f"  [{i:02d}] {src.name:<40} -> {out_name}")
        result = process_image(src, out_path, frontal_cc, profile_cc,
                               blur_enabled=not args.no_blur,
                               max_width=args.max_width,
                               webp_quality=args.quality)
        if result:
            faces_msg = (f"blurred {result['faces']} face(s)"
                         if result["faces"] else "no faces detected")
            print(f"       {faces_msg}, "
                  f"{result['dim'][0]}x{result['dim'][1]}px, "
                  f"{result['out_size_kb']} KB")

    print()
    print(f"Done. Hasil tersimpan di: {dst_dir}/")
    print("Periksa visual hasil blur sebelum push — kalau ada wajah yang miss, ")
    print("blur manual di Paint.NET/Photopea, simpan sebagai PNG/JPG di folder raw/, lalu rerun.")


if __name__ == "__main__":
    main()
