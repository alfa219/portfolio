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

Satu landing page menampilkan 10 section: hero, about, education, skills, projects, experience, certifications & achievements, blog, testimonials, contact. Semua data dikelola via JSON di `app/data/`.

## Placeholder

Ganti string-string berikut di `.env` dan file JSON di `app/data/`:

- `[YOUR_NAME]`, `[YOUR_UNIVERSITY]`, `[YOUR_INTERNSHIP_COMPANY]`
- `[SUPERVISOR_NAME]`, `[INTERN_MENTOR_NAME]`, `[HACKATHON_TEAMMATE]`
- `[X.XX]` (GPA), `[CUM LAUDE]`, `[HIGH GRADE]`
- `hello@[yourdomain].dev`

## Backend belum dikerjakan

Sesuai brief, item PRD berikut **belum** dibangun (frontend dahulu):

- `/api/contact` email endpoint (Flask-Mail, rate limiting)
- Flask-Caching
- Flask-Talisman / CSRF
- Build pipeline Tailwind & PostCSS (CSS sudah ditulis manual)

Form kontak saat ini disimulasikan di sisi klien (toast sukses tanpa kirim email).
