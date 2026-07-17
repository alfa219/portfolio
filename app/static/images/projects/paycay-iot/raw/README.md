# PAYCAY IoT + Web — Raw Photos

Folder ini untuk **foto asli hardware & dashboard web PAYCAY** sebelum diproses.
Tidak di-deploy ke production (gitignore) — lihat .gitignore di root.

## Konten yang Cocok Ditaruh di Sini

- Foto **ESP32 DevKit V1** + peripheral (PZEM-004T, RC522 RFID, relay 10A, LCD 16x2)
- Foto **proses solder / wiring** di breadboard atau PCB
- Foto **charging station fisik** (kalau ada prototype assembled)
- **Screenshot dashboard web Admin / User** (PAYCAY di Azure)
- **Screenshot live charging monitor** (volt/ampere/watt/kWh chart)

## Workflow (3 langkah)

```
1. Taruh foto asli di sini (JPG/PNG/WebP/screenshot)
   d:\portofolio\app\static\images\projects\paycay-iot\raw\

2. Jalankan script process (pakai --no-blur untuk screenshot — tidak ada wajah):
   .\venv\Scripts\python.exe scripts\process_photos.py paycay-iot --no-blur

   ATAU dengan blur (kalau ada foto orang/team):
   .\venv\Scripts\python.exe scripts\process_photos.py paycay-iot

3. Update app/data/projects.json -> PRJ_002 (PAYCAY IoT + Web) -> field "photos":
   "photos": [
     { "file": "01-esp32-wiring.webp", "caption": "Wiring ESP32 + PZEM-004T + relay control" },
     { "file": "02-admin-dashboard.webp", "caption": "Admin dashboard live monitoring 3 stasiun" }
   ]
```

## Catatan

- Untuk **screenshot** (web dashboard, app), tidak perlu face-blur — pakai `--no-blur`.
- Untuk **foto orang** (team, demo session), pakai default (blur otomatis).
- Cek visual sebelum push.
