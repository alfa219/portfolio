# Portfolio IoT Engineer — Python · Flask

Portfolio website Single-Page (multi-section) yang dibangun dengan **Flask 3 + Jinja2 + Vanilla JS**. Semua HTML dirender di server (SSR) dengan progressive enhancement lewat vanilla JS.

> Saat ini fokus pengembangan: **frontend** (templates, CSS, JS interaction). Backend hanya routing dasar untuk merender halaman.

## Stack

| Layer | Pilihan |
|---|---|
| Application | Flask 3.0.3, Python 3.12+ |
| Template | Jinja2 (SSR, semua HTML dirender di server) |
| Styling | Pure CSS (CSS variables, no Tailwind build step) |
| Interaction | Vanilla JavaScript (cursor, intro, reveal, modal, counters, dst) |
| Static assets (prod) | WhiteNoise |
| Production server | Gunicorn |

## Struktur

```
portofolio/
├── app/
│   ├── __init__.py            ← application factory
│   ├── config.py              ← config dev/prod/test
│   ├── routes/
│   │   └── main.py            ← endpoint utama (/)
│   ├── templates/
│   │   ├── base.html
│   │   ├── index.html
│   │   ├── components/        ← cursor, nav, footer, intro, icons, ...
│   │   └── sections/          ← hero, about, education, skills,
│   │                            projects, experience, certs, blog,
│   │                            testimonials, contact
│   ├── static/
│   │   ├── css/main.css       ← styling lengkap
│   │   └── js/main.js         ← interaksi (vanilla JS)
│   └── data/                  ← konten JSON: projects, skills, dll.
├── venv/                      ← Python virtual environment
├── requirements.txt
├── requirements-dev.txt
├── wsgi.py                    ← entry point (Gunicorn/dev)
├── .env / .env.example
└── README.md
```

## Setup

### 1. Virtual environment & dependencies

Sudah dibuat di `venv/`. Untuk mengaktifkan:

```powershell
# Windows PowerShell
.\venv\Scripts\Activate.ps1

# atau langsung pakai interpreter venv tanpa aktivasi:
.\venv\Scripts\python.exe wsgi.py
```

Install ulang dependencies bila perlu:

```powershell
.\venv\Scripts\python.exe -m pip install -r requirements.txt
```

### 2. Konfigurasi

Salin `.env.example` → `.env` lalu sesuaikan nilainya (sudah ada `.env` default untuk dev).

### 3. Jalankan dev server

```powershell
.\venv\Scripts\python.exe wsgi.py
```

Buka: <http://localhost:5000>

## Halaman

Satu landing page dengan section: hero, about, education, skills, projects, experience, certifications & achievements, dan contact (section blog/testimonials otomatis tersembunyi saat datanya kosong). Semua konten dikelola via JSON di `app/data/`.

## Konten dua bahasa (EN/ID)

UI diterjemahkan lewat `app/i18n/{en,id}.json`. Konten data juga bilingual:
`<nama>.json` adalah versi English (default), dan `<nama>.id.json` adalah versi
Indonesia — dipilih otomatis sesuai toggle bahasa. Bila `<nama>.id.json` tidak
ada, versi English yang dipakai.

## Catatan implementasi

- Kontak memakai email langsung (tautan `mailto:` + tombol salin) — tanpa
  form dan tanpa backend email.
- Item PRD yang belum dibangun: Flask-Caching, Flask-Talisman/CSRF.
- Di produksi, aplikasi menolak boot bila `SECRET_KEY` kosong atau masih nilai
  default development.
