# PRD Teknikal — Portfolio Website IoT Engineer
## Python · Flask · Modern Frontend Stack

**Versi:** 2.0 — Technical Edition
**Tanggal:** 23 Mei 2026
**Referensi PRD:** PRD-Portfolio-IoT-Engineer v1.0
**Backend Framework:** Python 3.12 + Flask 3.x
**Frontend Paradigm:** Jinja2 SSR + Progressive Enhancement (Vanilla JS + GSAP + Alpine.js)
**Target Deploy:** VPS / Railway / Render / Fly.io
**Status:** Ready for Development

---

## Daftar Isi

1. [Analisis PRD Asal & Keputusan Arsitektur](#1-analisis-prd-asal--keputusan-arsitektur)
2. [Arsitektur Sistem](#2-arsitektur-sistem)
3. [Frontend Tech Stack — Library & Dependencies](#3-frontend-tech-stack--library--dependencies)
4. [Backend Tech Stack — Python Dependencies](#4-backend-tech-stack--python-dependencies)
5. [Spesifikasi Implementasi Frontend](#5-spesifikasi-implementasi-frontend)
6. [Spesifikasi Backend Flask](#6-spesifikasi-backend-flask)
7. [Data Management — Static JSON](#7-data-management--static-json)
8. [Konfigurasi Environment (.env)](#8-konfigurasi-environment-env)
9. [Deployment & Infrastruktur](#9-deployment--infrastruktur)
10. [Performance & SEO](#10-performance--seo)
11. [Acceptance Criteria](#11-acceptance-criteria)
12. [Checklist Setup Development](#12-checklist-setup-development)

---

## 1. Analisis PRD Asal & Keputusan Arsitektur

### 1.1 Ringkasan Kebutuhan dari PRD v1.0

PRD asal mendefinisikan portofolio IoT Engineer berbasis SPA (Next.js 14 + React). Setelah analisis, seluruh kebutuhan fungsional dan visual dapat dipenuhi dengan **Python/Flask** sebagai server-side rendering engine, dengan progressive enhancement via JavaScript murni dan library animasi modern.

**Keuntungan pendekatan Flask:**
- Zero JavaScript framework overhead
- SEO out-of-the-box tanpa hydration issue
- Deployment lebih sederhana & ringan
- Full control atas server-side logic (email, rate limiting, caching)
- Lebih mudah dipahami dan dimodifikasi tanpa build step kompleks

### 1.2 Mapping Kebutuhan PRD → Solusi Flask

| Kebutuhan PRD v1.0 | Solusi Flask Stack | Library/Tool |
|---|---|---|
| SPA routing | Multi-page Flask routes + smooth scroll | Flask Blueprint + anchor nav |
| Framer Motion animation | GSAP 3 + CSS Animation | `gsap@3.x` via CDN |
| Scroll-triggered reveal | Intersection Observer + GSAP ScrollTrigger | Native JS + GSAP |
| Typing animation | Typed.js | `typed.js@2.x` |
| 3D tilt effect | VanillaTilt.js | `vanilla-tilt@1.x` |
| Contact form + email | Flask-Mail / Flask-WTF | Python backend |
| Custom cursor | Pure CSS + Vanilla JS | No library needed |
| Animated SVG icon | Lottie-web + SVG CSS animation | `lottie-web@5.x` |
| Parallax effect | Rellax.js atau GSAP | `rellax@1.x` |
| Circuit board background | Canvas API (Vanilla JS) | No library needed |
| Image optimization | Pillow + Flask-Caching | `pillow`, `flask-caching` |
| SEO meta tags | Jinja2 template blocks | Jinja2 template inheritance |

---

## 2. Arsitektur Sistem

### 2.1 Gambaran Arsitektur

Aplikasi menggunakan pola **MVC ringan berbasis Flask**. Server merender HTML via Jinja2, menyajikan static assets (CSS, JS, images) via Nginx atau WhiteNoise, dan meng-handle form submission via endpoint Flask. Frontend enhancement dilakukan purely di sisi client dengan Vanilla JS + library animasi.

```
[Browser]
    │
    ▼
[Nginx] ──── Static files (CSS/JS/img) ──── WhiteNoise / Nginx cache
    │
    ▼
[Gunicorn] (WSGI server, 2–4 workers)
    │
    ▼
[Flask App]
    ├── Routes (Blueprint: main, projects, api)
    ├── Jinja2 Templates (HTML rendering)
    ├── Flask-Mail (email delivery)
    ├── Flask-Caching (page + data cache)
    └── Flask-Limiter (rate limiting)
```

### 2.2 Layer Stack

| Layer | Teknologi | Fungsi |
|---|---|---|
| Web Server | Nginx (prod) / Flask dev server | Reverse proxy, static files serving |
| WSGI | Gunicorn 21.x | Production Python server |
| Application | Flask 3.x (Python 3.12) | Routing, logic, template rendering |
| Template Engine | Jinja2 3.x | HTML generation, component reuse |
| Database (opsional) | SQLite / PostgreSQL | Contact form logs, stats |
| ORM (opsional) | Flask-SQLAlchemy | Model abstraction |
| Cache | Flask-Caching (SimpleCache/Redis) | Page cache, image cache |
| Email | Flask-Mail + SMTP | Contact form email delivery |
| Static Assets | WhiteNoise (Python) | Serve CSS/JS/img tanpa Nginx |
| Environment | python-dotenv | Config management |

### 2.3 Struktur Direktori Project

```
portfolio-iot/
├── app/
│   ├── __init__.py               ← Application factory
│   ├── config.py                 ← Config class (dev/prod/test)
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── main.py               ← Landing, about, skills sections
│   │   ├── projects.py           ← Project list & detail page
│   │   ├── blog.py               ← Blog/articles (opsional)
│   │   └── api.py                ← Contact form endpoint (JSON)
│   ├── models/
│   │   └── contact.py            ← Contact message model (opsional)
│   ├── templates/
│   │   ├── base.html             ← Base layout (head, nav, footer)
│   │   ├── index.html            ← Landing page (semua sections)
│   │   ├── project_detail.html   ← Halaman detail project
│   │   ├── blog/
│   │   │   ├── index.html
│   │   │   └── post.html
│   │   └── components/           ← Reusable Jinja2 macros
│   │       ├── macros.html       ← skill_card, project_card, timeline_item
│   │       ├── hero.html
│   │       └── navbar.html
│   ├── static/
│   │   ├── css/
│   │   │   ├── main.css          ← Custom styles (CSS vars, layout)
│   │   │   ├── animations.css    ← Keyframes, transition classes
│   │   │   └── components.css    ← Card, badge, button, tag styles
│   │   ├── js/
│   │   │   ├── main.js           ← Entry point, init all modules
│   │   │   ├── cursor.js         ← Custom cursor logic
│   │   │   ├── circuit.js        ← Canvas circuit board animation
│   │   │   ├── typed-init.js     ← Typed.js initialization
│   │   │   └── animations.js     ← GSAP + ScrollTrigger setup
│   │   ├── images/
│   │   │   ├── profile/          ← Foto profil (WebP)
│   │   │   ├── projects/         ← Thumbnail project (WebP)
│   │   │   └── certs/            ← Logo sertifikat
│   │   ├── lottie/               ← Lottie JSON animation files
│   │   │   ├── esp32-pulse.json
│   │   │   ├── wifi-signal.json
│   │   │   ├── sensor-wave.json
│   │   │   └── cloud-data.json
│   │   └── fonts/                ← Self-hosted fonts (opsional)
│   └── data/
│       ├── projects.json         ← Data semua project
│       ├── skills.json           ← Tech stack & skill data
│       ├── experience.json       ← Timeline pengalaman kerja
│       └── certifications.json   ← Sertifikasi & achievement
├── tests/
│   ├── test_routes.py
│   └── test_forms.py
├── .env                          ← Environment variables (gitignore!)
├── .env.example                  ← Template env (commit ini)
├── requirements.txt              ← Produksi dependencies
├── requirements-dev.txt          ← Dev + test dependencies
├── wsgi.py                       ← Gunicorn entry point
├── package.json                  ← Tailwind + build tools
├── tailwind.config.js
├── postcss.config.js
├── Makefile                      ← Dev shortcuts (make dev, make build)
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 3. Frontend Tech Stack — Library & Dependencies

### 3.1 CSS Framework & Styling

| Library | Versi | Install/CDN | Fungsi |
|---|---|---|---|
| Tailwind CSS | 3.4.x | `npm install -D tailwindcss` | Utility-first CSS framework |
| Custom CSS (`main.css`) | — | Static Flask | Design tokens, layout, overrides |
| Google Fonts API | — | CDN link tag | Space Grotesk, JetBrains Mono |
| CSS Custom Properties | — | Native browser | Color palette, spacing, typography vars |

> **Catatan Produksi:** Gunakan Tailwind CLI untuk build + purge unused CSS. Jangan pakai CDN di production — ukuran file sangat besar.

```json
// package.json (scripts)
{
  "scripts": {
    "build:css": "tailwindcss -i ./app/static/css/input.css -o ./app/static/css/main.css --minify",
    "watch:css": "tailwindcss -i ./app/static/css/input.css -o ./app/static/css/main.css --watch"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

### 3.2 JavaScript Animasi & Interaction Library

| Library | Versi | Install | Kegunaan dalam Portfolio |
|---|---|---|---|
| **GSAP (GreenSock)** | 3.12.x | CDN / `npm install gsap` | Core animation engine: scroll-trigger, timeline, ease |
| **GSAP ScrollTrigger** | 3.12.x | Plugin bundled GSAP | Reveal animasi saat scroll masuk viewport |
| **Typed.js** | 2.1.x | `npm install typed.js` | Typing animation pada hero role text |
| **Lottie-web** | 5.12.x | CDN / `npm install lottie-web` | Render animasi JSON Lottie (chip, WiFi, sensor) |
| **VanillaTilt.js** | 1.8.x | CDN / `npm install vanilla-tilt` | 3D tilt hover effect pada skill card & project card |
| **Rellax.js** | 1.12.x | CDN / `npm install rellax` | Parallax scroll pada hero dan section background |
| **Alpine.js** | 3.14.x | CDN (direkomendasikan) | Reactive mini-components (navbar, modal, accordion) |
| **Swiper.js** | 11.x | CDN / `npm install swiper` | Testimonial slider / carousel (Section 8) |
| **CountUp.js** | 2.8.x | `npm install countup.js` | Animasi stat counter (About: 0 → angka target) |
| **tsParticles** | 3.x | CDN (opsional) | Particle effect pada hero background |

**Cara load via CDN di base.html:**

```html
<!-- Di bagian </body> sebelum custom JS -->

<!-- GSAP Core + ScrollTrigger -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

<!-- Typed.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.1.0/typed.umd.min.js"></script>

<!-- Lottie Web -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>

<!-- VanillaTilt -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js"></script>

<!-- Rellax -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/rellax/1.12.1/rellax.min.js"></script>

<!-- Alpine.js (load dengan defer) -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.0/dist/cdn.min.js"></script>

<!-- Swiper -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<!-- Custom JS (selalu paling bawah) -->
<script src="{{ url_for('static', filename='js/main.js') }}"></script>
```

### 3.3 Icon & Aset Visual

| Library/Sumber | Versi | Akses | Kegunaan |
|---|---|---|---|
| **Lucide Icons** | 0.383 | CDN / `npm install lucide` | UI icon set (arrow, mail, github, menu, dll) |
| **Simple Icons** | 11.x | CDN CSS | Brand icon (AWS, Grafana, MQTT, Arduino, dll) |
| **Devicons** | 2.x | CDN CSS | Programming language & tool icon berwarna |
| **LottieFiles** | — | Download JSON di lottiefiles.com | Animasi microchip, WiFi, sensor, cloud IoT |
| **Heroicons** | 2.x | CDN / `npm install @heroicons` | Outline & solid icon set (Tailwind Labs) |

```html
<!-- Devicons via CDN di <head> -->
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">

<!-- Simple Icons via CDN -->
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/simple-icons-font@9/font/simple-icons.min.css">

<!-- Lucide via CDN -->
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>
```

### 3.4 Build Tools & Asset Pipeline

| Tool | Versi | Fungsi |
|---|---|---|
| Node.js (build only) | 20 LTS | Runtime untuk Tailwind CLI & npm packages |
| Tailwind CLI | 3.4.x | Compile + purge unused CSS |
| PostCSS | 8.x | CSS transformation pipeline |
| Autoprefixer | 10.x | Vendor prefix otomatis (cross-browser) |
| WhiteNoise (Python) | 6.x | Serve static files compressed dari Flask di production |

```js
// tailwind.config.js
module.exports = {
  content: [
    "./app/templates/**/*.html",
    "./app/static/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary':    '#0A0A0A',
        'bg-secondary':  '#141414',
        'accent-cyan':   '#00E5FF',
        'accent-green':  '#39FF14',
        'accent-red':    '#FF3D71',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

---

## 4. Backend Tech Stack — Python Dependencies

### 4.1 requirements.txt — Produksi

```txt
# ── Core Framework ────────────────────────────────────────
Flask==3.0.3
Werkzeug==3.0.3

# ── Template & Config ─────────────────────────────────────
Jinja2==3.1.4
python-dotenv==1.0.1
MarkupSafe==2.1.5

# ── Form Handling & Validation ────────────────────────────
Flask-WTF==1.2.1
WTForms==3.1.2
email-validator==2.1.1

# ── Email ─────────────────────────────────────────────────
Flask-Mail==0.10.0

# ── Database (opsional — untuk contact log & stats) ───────
Flask-SQLAlchemy==3.1.1
SQLAlchemy==2.0.30

# ── Caching ───────────────────────────────────────────────
Flask-Caching==2.3.0

# ── Image Processing ──────────────────────────────────────
Pillow==10.3.0

# ── Static Files (production) ─────────────────────────────
whitenoise==6.7.0
Brotli==1.1.0            # Brotli compression untuk WhiteNoise

# ── WSGI Server (production) ──────────────────────────────
gunicorn==22.0.0

# ── Security ──────────────────────────────────────────────
Flask-Talisman==1.1.0    # HTTPS + CSP headers
flask-seasurf==1.1.1     # CSRF (alternatif WTF built-in)

# ── Rate Limiting (contact form protection) ───────────────
Flask-Limiter==3.7.0
limits==3.12.0
```

### 4.2 requirements-dev.txt — Development

```txt
-r requirements.txt

# ── Dev & Debug ───────────────────────────────────────────
Flask-DebugToolbar==0.15.1

# ── Testing ───────────────────────────────────────────────
pytest==8.2.1
pytest-flask==1.3.0
coverage==7.5.1

# ── Code Quality ──────────────────────────────────────────
black==24.4.2             # Code formatter
isort==5.13.2             # Import sorter
flake8==7.0.0             # Linter
mypy==1.10.0              # Type checker
```

---

## 5. Spesifikasi Implementasi Frontend

### 5.1 CSS Custom Properties (Design Tokens)

Semua nilai warna, spacing, dan font dari PRD didefinisikan sebagai CSS variables — konsisten dengan color palette PRD v1.0.

```css
/* app/static/css/main.css */
:root {
  /* === COLOR PALETTE (dari PRD) === */
  --bg-primary:     #0A0A0A;    /* Body background */
  --bg-secondary:   #141414;    /* Cards, sections */
  --border:         #1F1F1F;    /* Subtle separator */
  --accent-cyan:    #00E5FF;    /* CTA, highlight, glow */
  --accent-green:   #39FF14;    /* Status online, success */
  --accent-red:     #FF3D71;    /* Hover, error, attention */
  --text-primary:   #F5F5F5;    /* Heading & body */
  --text-secondary: #9CA3AF;    /* Subtitle, caption */
  --text-muted:     #525252;    /* Helper text */

  /* === TYPOGRAPHY === */
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body:    'Inter', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  /* === SPACING === */
  --section-py-desktop: 96px;
  --section-py-mobile:  48px;
  --container-max:      1280px;
  --radius-card:        12px;
  --radius-pill:        9999px;

  /* === GLOW EFFECTS === */
  --glow-cyan:  0 0 20px rgba(0, 229, 255, 0.4);
  --glow-green: 0 0 20px rgba(57, 255, 20, 0.4);
  --glow-red:   0 0 20px rgba(255, 61, 113, 0.4);
}

/* Base reset */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 17px;
  line-height: 1.6;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  letter-spacing: -0.02em;
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 24px;
}

code, pre, .mono {
  font-family: var(--font-mono);
}
```

### 5.2 Spesifikasi Animasi per Komponen

| Komponen | Library | Teknik | Config / Parameter |
|---|---|---|---|
| Circuit board hero BG | Canvas API (Vanilla JS) | `requestAnimationFrame` | Dot grid 30px, line opacity 0.08, pulse cyan |
| Typing animation (hero) | Typed.js | `new Typed('#typed', {...})` | `typeSpeed: 60`, `backSpeed: 40`, `loop: true` |
| Scroll reveal (semua section) | GSAP ScrollTrigger | `gsap.from('.reveal', {...})` | `y: 40, opacity: 0, duration: 0.8, stagger: 0.15` |
| Stat counter (About) | CountUp.js | `new CountUp(el, target)` | `duration: 2.5, enableScrollSpy: true` |
| 3D card tilt (Projects) | VanillaTilt.js | `VanillaTilt.init()` | `max: 8, speed: 400, glare: true` |
| Skill icon tilt | VanillaTilt.js | `VanillaTilt.init()` | `max: 15, speed: 300` |
| Lottie icon (ESP32, WiFi) | lottie-web | `lottie.loadAnimation()` | `renderer: 'svg', loop: true, autoplay: true` |
| Parallax (hero section) | Rellax.js | `new Rellax('.rellax')` | `speed: -3, center: true` |
| Custom cursor | Vanilla JS | `mousemove` event listener | dot 8px, ring 40px, scale 2x on hover element |
| Hover card glow | Pure CSS | `box-shadow` transition | `var(--glow-cyan), transition: 0.3s ease` |
| Online status pulse | Pure CSS | `animation: pulse 2s infinite` | `bg: var(--accent-green), keyframes scale 1→1.4` |
| Navbar scroll effect | Alpine.js + scroll | `@scroll.window` | `backdrop-blur` aktif saat `scrollY > 50` |

### 5.3 Implementasi Animasi JavaScript

```js
// app/static/js/animations.js

// ── GSAP Register Plugin ────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// ── Scroll Reveal Global ────────────────────────────────
document.querySelectorAll('.reveal').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%' },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  });
});

// ── Stagger reveal untuk grid item ─────────────────────
gsap.from('.skill-card', {
  scrollTrigger: { trigger: '.skills-grid', start: 'top 80%' },
  y: 30, opacity: 0, duration: 0.5,
  stagger: 0.08, ease: 'power1.out'
});

// ── Typed.js Init ───────────────────────────────────────
new Typed('#typed-role', {
  strings: ['IoT Engineer', 'Embedded Developer', 'Smart System Builder'],
  typeSpeed: 60, backSpeed: 40, backDelay: 2000,
  loop: true, cursorChar: '_'
});

// ── VanillaTilt pada project & skill card ───────────────
VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
  max: 8, speed: 400, glare: true, 'max-glare': 0.15
});

// ── CountUp untuk stats ─────────────────────────────────
document.querySelectorAll('[data-countup]').forEach(el => {
  new CountUp(el, parseInt(el.dataset.countup), {
    duration: 2.5, enableScrollSpy: true, scrollSpyOnce: true
  }).start();
});

// ── Rellax Parallax ─────────────────────────────────────
if (document.querySelector('.rellax')) {
  new Rellax('.rellax', { speed: -3, center: true });
}

// ── Lottie Icons ─────────────────────────────────────────
document.querySelectorAll('[data-lottie]').forEach(el => {
  lottie.loadAnimation({
    container: el,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: el.dataset.lottie
  });
});
```

```js
// app/static/js/circuit.js — Circuit board canvas background
const canvas = document.getElementById('circuit-canvas');
const ctx    = canvas.getContext('2d');

function resize() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', resize);

const GRID = 30;
const dots = [];

// Generate random dots on grid intersections
for (let x = 0; x < canvas.width; x += GRID) {
  for (let y = 0; y < canvas.height; y += GRID) {
    if (Math.random() > 0.65) {
      dots.push({ x, y, pulse: Math.random() * Math.PI * 2 });
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw connecting lines
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.06)';
  ctx.lineWidth = 1;
  dots.forEach((dot, i) => {
    dots.slice(i + 1, i + 4).forEach(other => {
      if (Math.abs(dot.x - other.x) <= GRID && Math.abs(dot.y - other.y) <= GRID) {
        ctx.beginPath();
        ctx.moveTo(dot.x, dot.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    });
  });

  // Draw pulsing dots
  dots.forEach(dot => {
    dot.pulse += 0.03;
    const alpha = 0.2 + Math.sin(dot.pulse) * 0.15;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(draw);
}
draw();
```

```js
// app/static/js/cursor.js — Custom cursor
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

document.addEventListener('mousemove', e => {
  dot.style.left  = e.clientX + 'px';
  dot.style.top   = e.clientY + 'px';
  ring.style.left = e.clientX + 'px';
  ring.style.top  = e.clientY + 'px';
});

// Scale up on hover interactive element
document.querySelectorAll('a, button, [data-tilt]').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('expanded'));
  el.addEventListener('mouseleave', () => ring.classList.remove('expanded'));
});
```

```css
/* Cursor CSS di animations.css */
.cursor-dot, .cursor-ring {
  position: fixed; top: 0; left: 0;
  pointer-events: none; z-index: 9999;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease;
}
.cursor-dot  { width: 8px; height: 8px; border-radius: 50%; background: var(--accent-cyan); }
.cursor-ring { width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--accent-cyan); opacity: 0.5; transition: all 0.15s ease; }
.cursor-ring.expanded { transform: translate(-50%, -50%) scale(2); opacity: 0.2; }

/* Online status pulse */
@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.4); opacity: 0.6; }
}
.status-online {
  display: inline-block;
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--accent-green);
  animation: pulse-dot 2s ease-in-out infinite;
}
```

### 5.4 Jinja2 Component Macros

```html
{# app/templates/components/macros.html #}

{% macro skill_card(name, lottie_path, category, level) %}
<div class="skill-card reveal" data-tilt data-tilt-max="15">
  <div class="skill-icon">
    <div data-lottie="{{ url_for('static', filename=lottie_path) }}"
         class="lottie-icon" style="width:64px;height:64px;"></div>
  </div>
  <p class="skill-name">{{ name }}</p>
  <span class="skill-cat">{{ category }}</span>
  <div class="skill-bar">
    <div class="skill-fill" style="width:{{ level }}%"></div>
  </div>
</div>
{% endmacro %}

{% macro project_card(project) %}
<article class="project-card reveal" data-tilt>
  <div class="card-img-wrap">
    <img src="{{ url_for('static', filename='images/projects/' + project.image) }}"
         alt="{{ project.title }}" loading="lazy" width="600" height="340">
    <span class="status-badge status-{{ project.status }}">
      {% if project.status == 'live' %}🟢 Live
      {% elif project.status == 'progress' %}🟡 In Progress
      {% else %}🔵 Archived{% endif %}
    </span>
  </div>
  <div class="card-body">
    <h3>{{ project.title }}</h3>
    <p>{{ project.description }}</p>
    <div class="tags">
      {% for tag in project.tags %}
        <span class="tag">{{ tag }}</span>
      {% endfor %}
    </div>
    <div class="card-actions">
      <a href="{{ project.demo_url }}"   class="btn btn-primary" target="_blank">View Demo</a>
      <a href="{{ project.github_url }}" class="btn btn-outline" target="_blank">GitHub</a>
      <a href="{{ url_for('projects.detail', slug=project.slug) }}" class="btn btn-ghost">Case Study</a>
    </div>
  </div>
</article>
{% endmacro %}

{% macro timeline_item(item) %}
<div class="timeline-item reveal">
  <div class="timeline-node">
    <span class="node-dot"></span>
  </div>
  <div class="timeline-content">
    <span class="year">{{ item.year_start }} – {{ item.year_end | default('Present') }}</span>
    <h3>{{ item.title }}</h3>
    <h4>{{ item.company }}</h4>
    <ul>
      {% for desc in item.description %}
        <li>{{ desc }}</li>
      {% endfor %}
    </ul>
    <div class="tags">
      {% for tag in item.tags %}
        <span class="tag">{{ tag }}</span>
      {% endfor %}
    </div>
  </div>
</div>
{% endmacro %}
```

---

## 6. Spesifikasi Backend Flask

### 6.1 Application Factory

```python
# app/__init__.py
from flask import Flask
from flask_mail import Mail
from flask_caching import Cache
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from whitenoise import WhiteNoise
from .config import config

mail    = Mail()
cache   = Cache()
limiter = Limiter(key_func=get_remote_address)

def create_app(env: str = 'development') -> Flask:
    app = Flask(__name__)
    app.config.from_object(config[env])

    # Init extensions
    mail.init_app(app)
    cache.init_app(app)
    limiter.init_app(app)

    # WhiteNoise: serve static files di production tanpa Nginx
    if env == 'production':
        app.wsgi_app = WhiteNoise(
            app.wsgi_app,
            root='app/static/',
            prefix='static',
            max_age=31536000      # Cache 1 tahun untuk versioned assets
        )

    # Register blueprints
    from .routes.main     import main_bp
    from .routes.projects import projects_bp
    from .routes.api      import api_bp
    app.register_blueprint(main_bp)
    app.register_blueprint(projects_bp, url_prefix='/projects')
    app.register_blueprint(api_bp,      url_prefix='/api')

    return app
```

### 6.2 Config Class

```python
# app/config.py
import os
from dotenv import load_dotenv

load_dotenv()

class BaseConfig:
    SECRET_KEY       = os.getenv('SECRET_KEY', 'change-me-in-production')
    CACHE_TYPE       = os.getenv('CACHE_TYPE', 'SimpleCache')
    CACHE_DEFAULT_TIMEOUT = 300
    MAIL_SERVER      = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT        = int(os.getenv('MAIL_PORT', 587))
    MAIL_USE_TLS     = os.getenv('MAIL_USE_TLS', 'True') == 'True'
    MAIL_USERNAME    = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD    = os.getenv('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER')
    RATELIMIT_DEFAULT   = '100 per hour'

class DevelopmentConfig(BaseConfig):
    DEBUG = True
    TESTING = False

class ProductionConfig(BaseConfig):
    DEBUG   = False
    TESTING = False
    CACHE_TYPE = 'RedisCache'
    CACHE_REDIS_URL = os.getenv('CACHE_REDIS_URL', 'redis://localhost:6379/0')

class TestingConfig(BaseConfig):
    TESTING  = True
    WTF_CSRF_ENABLED = False

config = {
    'development': DevelopmentConfig,
    'production':  ProductionConfig,
    'testing':     TestingConfig,
}
```

### 6.3 Main Routes

```python
# app/routes/main.py
import json
from pathlib import Path
from flask import Blueprint, render_template
from app import cache

main_bp = Blueprint('main', __name__)

def load_data(filename: str) -> dict | list:
    path = Path(__file__).parent.parent / 'data' / filename
    with open(path, encoding='utf-8') as f:
        return json.load(f)

@main_bp.route('/')
@cache.cached(timeout=300)  # Cache 5 menit
def index():
    return render_template('index.html',
        projects       = load_data('projects.json'),
        skills         = load_data('skills.json'),
        experience     = load_data('experience.json'),
        certifications = load_data('certifications.json'),
    )

@main_bp.route('/sitemap.xml')
def sitemap():
    return render_template('sitemap.xml'), 200, {'Content-Type': 'application/xml'}

@main_bp.route('/robots.txt')
def robots():
    return render_template('robots.txt'), 200, {'Content-Type': 'text/plain'}
```

### 6.4 Endpoint Routes

| Method | Route | Blueprint | Keterangan |
|---|---|---|---|
| `GET` | `/` | main | Landing page — semua section dalam 1 halaman |
| `GET` | `/projects` | projects | List semua project (filter by category) |
| `GET` | `/projects/<slug>` | projects | Detail project individual |
| `GET` | `/blog` | blog | List artikel (opsional) |
| `GET` | `/blog/<slug>` | blog | Detail artikel (opsional) |
| `POST` | `/api/contact` | api | Submit contact form, kirim email, return JSON |
| `GET` | `/api/status` | api | Health check endpoint (JSON) |
| `GET` | `/sitemap.xml` | main | Auto-generate sitemap |
| `GET` | `/robots.txt` | main | Robots.txt file |

### 6.5 Contact Form API Endpoint

```python
# app/routes/api.py
from flask import Blueprint, request, jsonify
from flask_mail import Message
from app import mail, limiter

api_bp = Blueprint('api', __name__)

@api_bp.route('/contact', methods=['POST'])
@limiter.limit("5 per hour")   # Max 5 submit per IP per jam
def contact():
    data = request.get_json()
    if not data:
        return jsonify({'status': 'error', 'msg': 'Invalid JSON'}), 400

    required = ['name', 'email', 'subject', 'message']
    if not all(field in data and data[field].strip() for field in required):
        return jsonify({'status': 'error', 'msg': 'All fields are required'}), 400

    try:
        msg = Message(
            subject  = f"[Portfolio] {data['subject']}",
            sender   = data['email'],
            recipients = ['[YOUR_EMAIL]'],
            body     = f"From: {data['name']} <{data['email']}>\n\n{data['message']}"
        )
        mail.send(msg)
        return jsonify({'status': 'success', 'msg': 'Message sent successfully!'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'msg': 'Failed to send message'}), 500

@api_bp.route('/status', methods=['GET'])
def status():
    return jsonify({'status': 'online', 'version': '1.0.0'}), 200
```

```js
// Contact form submit — app/static/js/main.js
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = this.querySelector('[type=submit]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  const payload = {
    name:    this.name.value,
    email:   this.email.value,
    subject: this.subject.value,
    message: this.message.value,
  };

  try {
    const res  = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    // Show toast notification
    showToast(data.status === 'success' ? '✅ Message sent!' : '❌ ' + data.msg,
              data.status);
    if (data.status === 'success') this.reset();
  } catch {
    showToast('❌ Network error. Try again.', 'error');
  } finally {
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }
});
```

---

## 7. Data Management — Static JSON

### 7.1 app/data/projects.json

```json
[
  {
    "id": 1,
    "slug": "smart-home-automation",
    "title": "Smart Home Automation",
    "description": "Sistem kontrol rumah pintar via app & voice command menggunakan ESP32 dan AWS IoT Core.",
    "long_description": "Deskripsi lengkap untuk halaman case study...",
    "image": "smart-home.webp",
    "tags": ["ESP32", "MQTT", "AWS IoT", "React Native", "Node-RED"],
    "category": "home-automation",
    "status": "live",
    "demo_url": "https://demo.example.com",
    "github_url": "https://github.com/[YOUR_GITHUB]/smart-home",
    "case_study_url": "/projects/smart-home-automation",
    "year": 2024,
    "featured": true
  }
]
```

### 7.2 app/data/skills.json

```json
{
  "hardware": [
    {
      "name": "ESP32",
      "lottie": "lottie/esp32-pulse.json",
      "icon": "devicon-cplusplus-plain colored",
      "level": 95,
      "category": "Microcontroller"
    },
    {
      "name": "Raspberry Pi",
      "lottie": "lottie/rpi-pulse.json",
      "icon": "devicon-raspberrypi-plain colored",
      "level": 85,
      "category": "SBC"
    }
  ],
  "protocols": [...],
  "languages": [...],
  "cloud": [...],
  "devops": [...]
}
```

### 7.3 app/data/experience.json

```json
[
  {
    "year_start": "2023",
    "year_end": "Present",
    "title": "IoT Engineer",
    "company": "[COMPANY_NAME]",
    "company_logo": "images/companies/company-logo.webp",
    "description": [
      "Merancang dan mengimplementasikan sistem monitoring industri berbasis MQTT",
      "Mengembangkan firmware ESP32 untuk 50+ sensor node di lapangan",
      "Membangun dashboard real-time menggunakan Grafana + InfluxDB"
    ],
    "tags": ["ESP32", "MQTT", "Grafana", "InfluxDB", "Python"]
  }
]
```

---

## 8. Konfigurasi Environment (.env)

```bash
# .env.example — salin ke .env dan isi nilainya

# ── Flask Core ────────────────────────────────────────────
FLASK_APP=wsgi.py
FLASK_ENV=development          # development | production
SECRET_KEY=your-very-long-secret-key-change-in-production

# ── Email (Gmail App Password / SMTP provider) ────────────
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your@gmail.com
MAIL_PASSWORD=your-16-char-app-password
MAIL_DEFAULT_SENDER=your@gmail.com

# ── Cache ─────────────────────────────────────────────────
CACHE_TYPE=SimpleCache          # Dev: SimpleCache | Prod: RedisCache
CACHE_REDIS_URL=redis://localhost:6379/0

# ── Database (opsional untuk contact log) ─────────────────
DATABASE_URL=sqlite:///portfolio.db

# ── Rate Limiting ─────────────────────────────────────────
RATELIMIT_STORAGE_URL=memory://   # Dev: memory | Prod: redis URL

# ── reCAPTCHA v3 (opsional, proteksi form) ───────────────
RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
```

---

## 9. Deployment & Infrastruktur

### 9.1 Opsi Platform Deploy

| Platform | Type | Free Tier | Rekomendasi |
|---|---|---|---|
| **Railway.app** | PaaS | Ya ($5 credit/bln) | ⭐ Paling mudah, auto-deploy dari GitHub |
| **Render.com** | PaaS | Ya (1 free web service) | Free tier cukup untuk portfolio |
| **Fly.io** | Container | Ya (3 free shared VM) | Jika pakai Docker, performa sangat baik |
| **VPS (Hetzner/DigitalOcean)** | IaaS | Tidak | Full control, perlu setup Nginx + Gunicorn manual |
| Vercel | Serverless | Ya | ❌ Tidak disarankan untuk Flask (WSGI friction) |
| Heroku | PaaS | Tidak | ❌ Berbayar sejak 2023 |

### 9.2 wsgi.py — Entry Point

```python
# wsgi.py
import os
from app import create_app

env = os.getenv('FLASK_ENV', 'development')
app = create_app(env)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=(env == 'development'))
```

### 9.3 Dockerfile

```dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Node.js untuk build Tailwind CSS
RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*

# Build CSS assets
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build:css

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "--timeout", "60", "wsgi:app"]
```

### 9.4 Makefile — Dev Shortcuts

```makefile
.PHONY: dev build install test lint

install:
	python -m venv venv && . venv/bin/activate && pip install -r requirements-dev.txt && npm install

dev:
	@echo "Starting Flask dev server..."
	flask run --debug --port 5000

build:
	npm run build:css

watch:
	npm run watch:css

test:
	pytest tests/ -v --cov=app

lint:
	black app/ && isort app/ && flake8 app/

clean:
	find . -type d -name __pycache__ -exec rm -rf {} +
```

---

## 10. Performance & SEO

### 10.1 Target Lighthouse Score

| Kategori | Target | Strategi |
|---|---|---|
| Performance | ≥ 95 | WhiteNoise Brotli compression, lazy-load image, defer JS, critical CSS inline |
| Accessibility | ≥ 95 | Semantic HTML, ARIA labels, skip-link, `prefers-reduced-motion` |
| Best Practices | ≥ 95 | HTTPS (Flask-Talisman), no console errors, modern APIs |
| SEO | ≥ 95 | Meta tags lengkap, JSON-LD Person schema, sitemap.xml, canonical URL |

### 10.2 Prefers Reduced Motion

```css
/* Respek preferensi accessibility user */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .cursor-dot, .cursor-ring { display: none; }
}
```

```js
// Disable GSAP animations jika user prefer reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.pause();
}
```

### 10.3 SEO Meta Tags (base.html)

```html
{% block head %}
<title>{% block title %}[YOUR_NAME] — IoT Engineer{% endblock %}</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="{{ meta_desc | default('IoT Engineer specializing in embedded systems, smart devices, and cloud connectivity.') }}">
<meta name="author"  content="[YOUR_NAME]">
<meta name="robots" content="index, follow">
<link rel="canonical" href="{{ request.url }}">

<!-- Open Graph -->
<meta property="og:title"       content="{{ self.title() }}">
<meta property="og:description" content="{{ meta_desc | default('') }}">
<meta property="og:image"       content="{{ url_for('static', filename='images/og-image.png', _external=True) }}">
<meta property="og:url"         content="{{ request.url }}">
<meta property="og:type"        content="website">

<!-- Twitter Card -->
<meta name="twitter:card"  content="summary_large_image">
<meta name="twitter:site"  content="@[YOUR_TWITTER]">
<meta name="twitter:image" content="{{ url_for('static', filename='images/og-image.png', _external=True) }}">

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "[YOUR_NAME]",
  "jobTitle": "IoT Engineer",
  "url": "{{ request.url_root }}",
  "email": "[YOUR_EMAIL]",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Wates",
    "addressRegion": "Yogyakarta",
    "addressCountry": "ID"
  },
  "sameAs": [
    "https://github.com/[YOUR_GITHUB]",
    "https://linkedin.com/in/[YOUR_LINKEDIN]",
    "https://twitter.com/[YOUR_TWITTER]"
  ]
}
</script>
{% endblock %}
```

---

## 11. Acceptance Criteria

| No. | Kriteria | Cara Verifikasi |
|---|---|---|
| 1 | Flask dev server berjalan tanpa error | `python wsgi.py` → 200 OK di `localhost:5000` |
| 2 | Semua 9 section render dengan benar | Visual check + HTML inspector |
| 3 | Typing animation berjalan di hero | Typed.js init, text berganti otomatis |
| 4 | Scroll reveal aktif saat masuk viewport | GSAP ScrollTrigger: opacity 0→1, y 40→0 |
| 5 | Contact form kirim email (dev: MailTrap) | POST `/api/contact` → 200, email diterima |
| 6 | Rate limiting aktif: max 5 req/jam per IP | 6 request → response 429 Too Many Requests |
| 7 | Mobile responsive di 360px, 768px, 1024px, 1440px | Chrome DevTools responsive mode |
| 8 | Lighthouse score ≥ 95 semua kategori | Chrome Lighthouse audit |
| 9 | Static file punya cache header yang benar | `Cache-Control: max-age=31536000` |
| 10 | Tidak ada error di console browser | DevTools Console: zero errors |
| 11 | WhiteNoise compress CSS/JS di production | Response header: `Content-Encoding: br` |
| 12 | Data JSON ter-load dan tampil di template | ≥ 4 project card muncul di Section 4 |
| 13 | Custom cursor berjalan di desktop | Cursor dot + ring mengikuti mouse |
| 14 | Lottie animation memutar pada skill icon | SVG animation autoplay, loop |

---

## 12. Checklist Setup Development

```bash
# 1. Buat virtual environment
python -m venv venv
source venv/bin/activate          # Linux/Mac
# venv\Scripts\activate           # Windows

# 2. Install Python dependencies
pip install -r requirements-dev.txt

# 3. Salin dan isi env variables
cp .env.example .env
# Edit .env: isi SECRET_KEY, MAIL_*, dll.

# 4. Install Node dependencies (untuk Tailwind)
npm install

# 5. Build CSS pertama kali
npm run build:css

# 6. Jalankan dev server
python wsgi.py
# atau: flask run --debug

# 7. Buka browser
# http://localhost:5000

# 8. Test contact form
# Daftar MailTrap (mailtrap.io) → ambil SMTP credentials
# Isi di .env: MAIL_SERVER, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD
```

### Tools yang Diperlukan Sebelum Memulai

| Tool | Versi | Download |
|---|---|---|
| Python | 3.12.x | python.org |
| pip | bundled | — |
| Node.js | 20 LTS | nodejs.org |
| Git | latest | git-scm.com |
| VS Code | latest | code.visualstudio.com |
| VS Code Extension: Python | — | ms-python.python |
| VS Code Extension: Tailwind IntelliSense | — | bradlc.vscode-tailwindcss |
| VS Code Extension: Jinja | — | wholroyd.jinja |

### Placeholder yang Harus Diganti

Cari semua string berikut di seluruh project dan ganti dengan data asli:

- `[YOUR_NAME]` — nama lengkap
- `[YOUR_EMAIL]` — email aktif
- `[YOUR_GITHUB]` — username GitHub
- `[YOUR_LINKEDIN]` — username LinkedIn
- `[YOUR_TWITTER]` — username Twitter/X
- `[COMPANY_NAME]` — nama perusahaan di experience timeline

---

## Referensi Library

| Library | Dokumentasi |
|---|---|
| Flask | https://flask.palletsprojects.com |
| Jinja2 | https://jinja.palletsprojects.com |
| GSAP | https://gsap.com/docs |
| Typed.js | https://mattboldt.com/demos/typed-js |
| Lottie Web | https://airbnb.io/lottie |
| VanillaTilt | https://micku7zu.github.io/vanilla-tilt.js |
| Alpine.js | https://alpinejs.dev |
| Tailwind CSS | https://tailwindcss.com/docs |
| WhiteNoise | https://whitenoise.readthedocs.io |
| Flask-Mail | https://pythonhosted.org/Flask-Mail |
| Flask-Limiter | https://flask-limiter.readthedocs.io |
| LottieFiles | https://lottiefiles.com (download JSON assets) |
| MailTrap | https://mailtrap.io (email testing dev) |

---

*PRD Technical v2.0 — IoT Engineer Portfolio · Python / Flask Stack*
*Generated: 23 Mei 2026 · Based on PRD-Portfolio-IoT-Engineer v1.0*
