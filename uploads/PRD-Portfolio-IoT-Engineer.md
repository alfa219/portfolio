# PRD: Portfolio Website — IoT Engineer

**Versi:** 1.0
**Tanggal:** 18 Mei 2026
**Target Tool:** Claude (untuk generate UI/Frontend code)
**Tipe Deliverable:** Single Page Application (SPA) — Frontend Portfolio

---

## 1. Ringkasan Eksekutif

### 1.1 Tujuan
Membangun website portofolio personal untuk seorang **IoT Engineer** yang profesional, modern, dan memikat. Website harus mampu memamerkan kemampuan teknis di bidang Internet of Things, project showcase, dan menjadi *personal branding* yang kuat untuk rekruter, klien, dan komunitas tech.

### 1.2 Target Audiens
- **Rekruter & HR perusahaan teknologi** (utama)
- **Klien freelance / project owner** (IoT consulting)
- **Sesama engineer & komunitas developer**
- **Investor / startup founder** yang mencari technical partner

### 1.3 Tujuan Bisnis
- Meningkatkan visibilitas profesional
- Menghasilkan inbound opportunities (kerja, freelance, kolaborasi)
- Menjadi "kartu nama digital" yang berbeda dari portofolio kebanyakan

---

## 2. Design Direction

### 2.1 Mood & Tema
- **Tema utama:** Dark / Black — kesan profesional, futuristik, "tech-savvy"
- **Vibe:** Cyberpunk minimalis, terminal-style, "circuit board" aesthetic
- **Inspirasi:** Tesla.com, Arduino.cc, GitHub dark mode, Vercel.com

### 2.2 Palet Warna

| Role | Hex | Penggunaan |
|---|---|---|
| Background utama | `#0A0A0A` | Body background |
| Background sekunder | `#141414` | Cards, sections |
| Border / divider | `#1F1F1F` | Subtle separators |
| Accent primer | `#00E5FF` (Cyan Electric) | CTA, highlight, links, glow |
| Accent sekunder | `#39FF14` (Neon Green) | Status "online", success indicator |
| Accent peringatan | `#FF3D71` | Hover, error, attention |
| Teks utama | `#F5F5F5` | Heading & body utama |
| Teks sekunder | `#9CA3AF` | Subtitle, caption |
| Teks muted | `#525252` | Helper text |

> **Catatan:** Warna utama tetap hitam, tapi accent neon (cyan/green) sangat penting untuk memberi nuansa "live signal" khas IoT.

### 2.3 Tipografi
- **Heading:** `Space Grotesk` atau `Sora` (geometric, modern, tech)
- **Body:** `Inter` (clean, readable)
- **Code / Mono:** `JetBrains Mono` atau `Fira Code` (untuk snippet, terminal)
- Heading besar: 48–72px, bold, sedikit letter-spacing negatif
- Body: 16–18px, line-height 1.6

### 2.4 Layout & Grid
- Max-width container: 1280px
- Padding section: 96–120px (desktop), 48–64px (mobile)
- 12-column grid dengan gap 24px
- Sudut komponen: `rounded-xl` (12px) untuk card, `rounded-full` untuk button pill

---

## 3. Animasi & Microinteraction

### 3.1 Animasi Wajib
1. **Hero animation** — Animated grid background (circuit-board pattern) dengan dot/line yang "berdenyut"
2. **Typing animation** pada role text: `IoT Engineer | Embedded Developer | Smart System Builder`
3. **Animated icons** untuk skill (gunakan **Lottie** atau **SVG animation**) — contoh:
   - Chip ESP32 yang "berkedip" (LED indicator)
   - Antena WiFi yang memancarkan sinyal melengkung (ripple effect)
   - Cloud icon dengan dot data yang "naik" terhubung ke device
   - Sensor icon dengan grafik gelombang berjalan
4. **Scroll-triggered animations** — element fade-in + slide-up saat masuk viewport (gunakan `Framer Motion` atau `GSAP ScrollTrigger`)
5. **Hover micro-interaction**:
   - Card project: lift + glow border cyan
   - Button: ripple effect atau magnetic cursor
   - Skill icon: 3D tilt (gunakan `react-parallax-tilt`)
6. **Cursor custom** — dot kecil yang membesar saat hover element interaktif
7. **Live status indicator** — dot hijau berdenyut "online" di bagian profil
8. **Parallax** — pada hero & section background

### 3.2 Page Transitions
- Smooth scroll antar section (anchor link)
- Loading screen pendek dengan animasi "boot sequence" terminal-style (`>_ initializing portfolio... [OK]`)

---

## 4. Struktur Konten & Section

### 4.1 Section 1 — Hero / Landing
**Elemen:**
- Background: animated circuit pattern + subtle gradient
- Profile photo (optional) — bisa diganti animated avatar / 3D model chip
- Heading utama: nama lengkap
- Subheading dengan typing animation berisi role
- Tagline singkat (1 kalimat): *"Building the bridge between hardware and the cloud."*
- 2 CTA button:
  - `View Projects` (primary, cyan)
  - `Download CV` (secondary, outline)
- Sosial media icon row (GitHub, LinkedIn, Email, X/Twitter)
- Scroll indicator animasi panah ke bawah

### 4.2 Section 2 — About Me
**Elemen:**
- Foto setengah badan / avatar di sisi kiri
- Bio 2–3 paragraf di sisi kanan (background, passion, fokus area IoT)
- **Stats counter** (animate from 0 saat scroll):
  - Tahun pengalaman
  - Project selesai
  - Devices deployed
  - Cup of coffee ☕ (touch humanis)
- "Current status" badge: 🟢 Available for opportunities

### 4.3 Section 3 — Tech Stack & Skills
**Layout:** Grid kategori dengan animated icon di setiap item. Tiap icon punya glow saat hover.

#### A. Hardware & Microcontrollers
- ESP32 / ESP8266
- Arduino (Uno, Mega, Nano)
- Raspberry Pi (3/4/5, Pico)
- STM32
- NodeMCU
- BeagleBone
- Sensor module umum (DHT22, BMP280, MPU6050, PIR, dll.)

#### B. Communication Protocols
- MQTT
- HTTP / REST / WebSocket
- CoAP
- LoRaWAN
- Zigbee
- BLE (Bluetooth Low Energy)
- Wi-Fi
- GSM / NB-IoT / LTE-M
- Modbus / RS-485

#### C. Programming Languages
- C / C++ (embedded)
- Python / MicroPython
- JavaScript / TypeScript (Node.js)
- Rust (embedded — opsional, advanced)

#### D. Cloud & Platform IoT
- AWS IoT Core
- Azure IoT Hub
- Google Cloud IoT
- ThingsBoard
- Blynk
- Adafruit IO
- Firebase RTDB

#### E. Database & Data Pipeline
- InfluxDB (time-series)
- MongoDB
- PostgreSQL
- Redis
- Apache Kafka / MQTT broker (Mosquitto, HiveMQ)

#### F. Visualization & Dashboard
- Grafana
- Node-RED
- Power BI
- Custom dashboard (React + Recharts)

#### G. DevOps & Tools
- Git / GitHub
- Docker
- PlatformIO
- Arduino IDE
- KiCad / EasyEDA / Fritzing (PCB design)
- Proteus / LTspice (simulation)
- VS Code

#### H. Soft Skills
- Problem solving
- Technical writing
- Team collaboration
- Project management (Agile/Scrum)

### 4.4 Section 4 — Featured Projects
**Layout:** Grid card 2–3 kolom, masing-masing project punya page detail (atau modal).

**Anatomi 1 project card:**
- Thumbnail image / video / GIF (live demo)
- Project title
- Short description (1–2 kalimat)
- Tech stack tags (pill kecil)
- Status badge (🟢 Live | 🟡 In Progress | 🔵 Archived)
- 3 button: `View Demo` | `GitHub` | `Case Study`

**Ide project yang harus ditampilkan (minimal 4–6):**
1. **Smart Home Automation** — kontrol lampu, AC, CCTV via app + voice
2. **Industrial Monitoring System** — predictive maintenance pabrik
3. **Environmental Monitoring** — kualitas udara/air dengan dashboard live
4. **Smart Agriculture** — irigasi otomatis berbasis soil moisture & weather API
5. **Wearable Health Tracker** — heart rate + GPS dengan BLE ke smartphone
6. **Asset Tracking** — GPS + LoRaWAN untuk fleet management

### 4.5 Section 5 — Experience Timeline
**Layout:** Vertical timeline dengan node yang glow di setiap milestone.

**Konten per entry:**
- Tahun (range)
- Job title
- Nama perusahaan + logo
- Deskripsi tanggung jawab (3–4 bullet)
- Stack/tools yang dipakai (tag)

Includes: Pengalaman kerja, internship, dan/atau freelance project signifikan.

### 4.6 Section 6 — Certifications & Achievements
**Grid card** dengan logo penerbit sertifikat.

**Sertifikasi umum di IoT:**
- AWS Certified IoT — Specialty
- Cisco Certified Network Associate (CCNA)
- Microsoft Azure IoT Developer Specialty
- Google Professional Cloud IoT Engineer
- CompTIA IoT+
- Hackster.io / Arduino Certified
- Course completion (Coursera, Udemy, edX)

Tambahkan juga **achievement / award** (hackathon, publikasi, paten, talks).

### 4.7 Section 7 — Blog / Articles (Opsional tapi Recommended)
- 3 card latest article dengan thumbnail
- Topik: tutorial IoT, opinion piece, case study
- Link ke Medium / Dev.to / personal blog

### 4.8 Section 8 — Testimonials (Opsional)
- Quote card dari klien / atasan / kolega
- Foto + nama + posisi + perusahaan
- Slider/carousel atau grid 3 kolom

### 4.9 Section 9 — Contact / Get In Touch
**Layout:** Split 2 kolom

**Kiri:**
- Headline: *"Let's build something connected."*
- Email (clickable, with copy-to-clipboard)
- Lokasi (Wates, Yogyakarta, Indonesia)
- Available for: Full-time | Freelance | Consulting
- Sosial media icon (besar, animated)

**Kanan:**
- Contact form: Name, Email, Subject, Message
- Submit button dengan loading state
- Success/error toast notification

### 4.10 Footer
- Logo / nama
- Tagline singkat
- Quick links (anchor ke section)
- Sosial icon
- Copyright + "Built with ❤️ and ☕ by [Nama]"
- Optional: "View source on GitHub" link

---

## 5. Spesifikasi Teknis

### 5.1 Tech Stack Rekomendasi
| Layer | Tool |
|---|---|
| Framework | **Next.js 14+** (App Router) atau **Vite + React 18** |
| Styling | **Tailwind CSS** + **shadcn/ui** |
| Animation | **Framer Motion** + **GSAP** (untuk yang complex) |
| Icon | **Lucide React** + **Tabler Icons** + Lottie files |
| 3D (optional) | **Three.js** / **React Three Fiber** |
| Form | React Hook Form + Zod validation |
| Email | EmailJS atau Resend API |
| Hosting | **Vercel** atau **Netlify** |
| Analytics | Vercel Analytics / Plausible |

### 5.2 Performance Requirements
- Lighthouse score: **≥ 95** (Performance, Accessibility, Best Practices, SEO)
- LCP < 2.5s
- Image optimization (Next/Image, WebP, lazy loading)
- Font preload
- Code splitting per route

### 5.3 Responsivitas
Wajib mulus di breakpoint:
- Mobile: 360px – 767px
- Tablet: 768px – 1023px
- Desktop: 1024px – 1439px
- Large: ≥ 1440px

### 5.4 Accessibility (a11y)
- Semantic HTML
- Keyboard navigable
- ARIA label untuk icon-only button
- Contrast ratio ≥ 4.5:1
- Focus state jelas (cyan glow outline)
- Skip-to-content link
- Prefers-reduced-motion handling

### 5.5 SEO
- Meta tags (title, description, OG image)
- Sitemap.xml + robots.txt
- JSON-LD structured data (Person schema)
- Open Graph + Twitter Card

---

## 6. Acceptance Criteria

Website dianggap **DONE** jika:

- [ ] Semua 9 section utama ter-render dengan benar
- [ ] Tema hitam konsisten + accent cyan/neon green
- [ ] Minimal 5 animasi (typing, scroll-reveal, hover, animated icon, parallax) berjalan smooth
- [ ] Mobile-responsive di semua breakpoint
- [ ] Contact form berfungsi (email terkirim)
- [ ] Project section punya minimal 4 entry dengan link demo + GitHub
- [ ] Lighthouse score ≥ 95
- [ ] Loading time < 3 detik di koneksi 4G
- [ ] Tidak ada console error
- [ ] Dark mode by default (tidak perlu toggle, ini portfolio dark)

---

## 7. Out of Scope (Versi 1)
- Multi-language (i18n) — versi 1 cukup English atau Indonesia (pilih salah satu)
- CMS integration (gunakan static data dulu)
- E-commerce / product page
- User authentication
- Live IoT device dashboard (real-time data) — ini fitur v2

---

## 8. Prompt Singkat untuk Claude

> Generate a complete frontend portfolio website for an IoT Engineer based on this PRD. Use **Next.js 14 + Tailwind CSS + Framer Motion**. Theme: pure black (`#0A0A0A`) with cyan electric (`#00E5FF`) and neon green (`#39FF14`) accents. Include animated circuit-board background in hero, typing animation for role title, scroll-triggered fade-up animations, animated SVG icons for the tech stack (pulsing chips, signal waves), live "online" status indicator, and a custom cursor. Build all 9 sections detailed above with responsive design. Use placeholder content where personal data is needed, marked clearly with `[YOUR_NAME]`, `[YOUR_EMAIL]`, etc. Output the full project structure with separate component files.

---

## 9. Aset yang Perlu Disiapkan User

Sebelum generate, siapkan:
- [ ] Foto profil (resolusi tinggi, square crop)
- [ ] Logo personal (opsional)
- [ ] CV PDF
- [ ] Screenshot / GIF demo tiap project
- [ ] List nama perusahaan tempat pernah kerja + logonya
- [ ] Link GitHub repo tiap project
- [ ] Akun sosial media (GitHub, LinkedIn, Twitter/X, Instagram, dll.)
- [ ] Sertifikat (scan / link verifikasi)
- [ ] Bio writeup (2–3 paragraf tentang diri)

---

**End of PRD**

*Document version: 1.0 — Siap dipakai sebagai input ke Claude untuk generate UI.*
