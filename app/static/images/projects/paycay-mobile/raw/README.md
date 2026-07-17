# PAYCAY Mobile — Raw Photos

Folder ini untuk **screenshot app Flutter PAYCAY Mobile** sebelum diproses.
Tidak di-deploy ke production (gitignore) — lihat .gitignore di root.

## Konten yang Cocok Ditaruh di Sini

- **Screenshot screen utama**: Login, Dashboard User, Map Stasiun
- **Screenshot live charging monitor** dengan sensor card update
- **Screenshot wallet & top-up flow** (BCA VA / GoPay / Mandiri)
- **Screenshot riwayat transaksi** + receipt detail
- **Screenshot admin panel** (top-up approval, station management)
- **Mockup multi-screen** (hero shot dengan 3-4 screen sejajar)

## Workflow (3 langkah)

```
1. Taruh screenshot di sini (PNG / JPG dari device atau Android Studio emulator)
   d:\portofolio\app\static\images\projects\paycay-mobile\raw\

2. Jalankan script process — pakai --no-blur karena screenshot tidak ada wajah:
   .\venv\Scripts\python.exe scripts\process_photos.py paycay-mobile --no-blur

   Tip: untuk screenshot mobile (9:16 portrait), --max-width 900 lebih hemat:
   .\venv\Scripts\python.exe scripts\process_photos.py paycay-mobile --no-blur --max-width 900

3. Update app/data/projects.json -> PRJ_003 (PAYCAY Mobile) -> field "photos":
   "photos": [
     { "file": "01-dashboard.webp", "caption": "User dashboard: saldo, stasiun terdekat, aktivitas terbaru" },
     { "file": "02-charging.webp", "caption": "Live charging monitor: volt/ampere/watt/kWh update tiap 2 detik" }
   ]
```

## Tip Screenshot

- Pakai Android emulator (Pixel 7 Pro) → Screenshot button → resolusi clean 1080×2400
- Atau di HP fisik: power + volume down → kirim ke laptop via Files/Drive
- **Jangan** kirim screenshot dengan notif/status bar yang ada data pribadi
  (mis. nama akun WhatsApp di notif) — blur manual atau crop top status bar dulu.
