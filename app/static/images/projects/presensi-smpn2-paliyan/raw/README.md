# Presensi SMPN 2 Paliyan — Raw Photos (NOT served publicly)

Folder untuk **foto asli** sebelum diproses. Isinya tidak di-deploy ke production
dan sudah di-gitignore (lihat `.gitignore` di root).

## Workflow

```
1. Taruh foto asli di sini (JPG / PNG / WebP / HEIC), mis:
   └─ app/static/images/projects/presensi-smpn2-paliyan/raw/
      └─ alat-gerbang.jpg

2. (sekali saja) install dependency:
   .\venv\Scripts\pip.exe install -r requirements-photos.txt

3. Proses (auto-blur wajah + resize + konversi WebP):
   .\venv\Scripts\python.exe scripts\process_photos.py presensi-smpn2-paliyan

   Hasil tersimpan di folder induk sebagai: 01-alat-gerbang.webp

4. Beri tahu Claude nama file output-nya — nanti diisikan ke
   app/data/projects.json → PRJ_004 → field "photos" beserta caption.
```

Foto alat (enclosure di gerbang, tanpa wajah) tidak butuh blur —
bisa tambahkan `--no-blur` bila mau.
