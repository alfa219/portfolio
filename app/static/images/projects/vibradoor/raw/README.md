# VIBRADoor — Raw Photos (NOT served publicly)

Folder ini untuk **foto asli** sebelum diproses. Isinya **tidak di-deploy ke production**
dan **sebaiknya di-gitignore** (lihat `.gitignore` di root).

## Workflow

```
1. Taruh foto asli di sini (JPG / PNG / WebP)
   └─ d:\portofolio\app\static\images\projects\vibradoor\raw\
      ├─ foto-deploy-1.jpg
      ├─ foto-wearable.jpg
      └─ ...

2. Install dependency (sekali saja)
   └─ .\venv\Scripts\pip.exe install -r requirements-photos.txt

3. Jalankan script auto-blur + optimize
   └─ .\venv\Scripts\python.exe scripts\process_photos.py vibradoor

4. Hasil otomatis tersimpan di parent folder (vibradoor/) sebagai:
   ├─ 01-foto-deploy-1.webp   (wajah ter-blur, max 1600px wide, ~150 KB)
   ├─ 02-foto-wearable.webp
   └─ ...

5. Buka app/data/projects.json -> entry PRJ_001 (VIBRADoor) -> field "photos"
   Isi dengan nama file output + caption, contoh:
       "photos": [
         {
           "file": "01-foto-deploy-1.webp",
           "caption": "Siswa SLB Damayanti menggunakan wearable VIBRADoor di kelas"
         },
         {
           "file": "02-foto-wearable.webp",
           "caption": "Detail wearable: ESP32 + LiPo + vibration motor 10mm"
         }
       ]

6. Refresh portfolio - foto otomatis muncul di modal case study.
```

## Opsi Script

```bash
# Default: blur faces, max 1600px wide, WebP quality 82
python scripts/process_photos.py vibradoor

# Tanpa face blur (kalau sudah dipastikan tidak ada wajah)
python scripts/process_photos.py vibradoor --no-blur

# Kecilkan max width (untuk hemat bandwidth)
python scripts/process_photos.py vibradoor --max-width 1200

# Naikkan kualitas WebP
python scripts/process_photos.py vibradoor --quality 90
```

## Catatan Privasi

- Script pakai OpenCV Haar cascade — bisa miss wajah miring ekstrem / tertutup.
- **WAJIB cek visual hasil** sebelum push ke production.
- Kalau ada wajah yang miss, edit manual di Photopea / Paint.NET / GIMP,
  simpan kembali di folder ini dengan nama berbeda, lalu rerun script.
- Folder ini (raw/) sebaiknya di-gitignore agar foto asli tidak ter-push.
