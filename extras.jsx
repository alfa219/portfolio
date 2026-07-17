// Certs, Achievements, Blog, Testimonials, Contact, Footer

const CERTS = [
  { issuer: 'Cisco', logo: 'CC', title: 'Cisco Networking Essentials', date: 'Completed 2024' },
  { issuer: 'Coursera', logo: 'CR', title: 'IoT Specialization (UC Irvine)', date: 'Completed 2024' },
  { issuer: 'AWS', logo: 'AW', title: 'AWS Cloud Practitioner (Foundational)', date: 'Issued 2024' },
  { issuer: 'Dicoding', logo: 'DC', title: 'Belajar Fundamental IoT', date: 'Completed 2023' },
  { issuer: 'Udemy', logo: 'UD', title: 'Mastering Microcontroller with STM32', date: 'Completed 2023' },
  { issuer: 'Hackster', logo: 'HK', title: 'Hackster.io Contributor Badge', date: 'Active 2022—present' },
];

const ACHIEVEMENTS = [
  { kind: 'award', title: 'Finalist — Campus Innovation Challenge 2024', desc: 'Smart irrigation prototype, selected from 38 student teams.' },
  { kind: 'patent', title: 'Best Thesis Demo — Engineering Showcase 2025', desc: 'Recognized at the faculty graduation symposium.' },
  { kind: 'talk', title: 'Speaker — University IoT Study Club', desc: '"Getting started with ESP32 and MQTT for first-year students."' },
];

function AchIcon({ kind }) {
  const paths = {
    award: <React.Fragment><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4z"/><path d="M7 5H4v2a3 3 0 003 3M17 5h3v2a3 3 0 01-3 3"/></React.Fragment>,
    patent: <React.Fragment><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M9 13l2 2 4-4"/></React.Fragment>,
    talk: <React.Fragment><path d="M12 2a3 3 0 00-3 3v6a3 3 0 006 0V5a3 3 0 00-3-3z"/><path d="M19 10v1a7 7 0 01-14 0v-1M12 18v4M8 22h8"/></React.Fragment>,
  };
  return (
    <svg className="ach-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[kind]}
    </svg>
  );
}

function CertsAchievements() {
  return (
    <section id="certs">
      <div className="container">
        <div className="section-head-row">
          <div>
            <div className="kicker">06 // Verified</div>
            <h2 className="section-title">Certifications<br/>& achievements.</h2>
          </div>
          <div className="section-meta">
            <div>VERIFIED: <span className="v">{CERTS.length}</span></div>
            <div>BADGES: <span className="v">{ACHIEVEMENTS.length}</span></div>
          </div>
        </div>

        <div className="cert-grid">
          {CERTS.map(c => (
            <div className="cert reveal" key={c.title}>
              <div className="cert-logo">{c.logo}</div>
              <div className="cert-body">
                <h4 className="cert-title">{c.title}</h4>
                <div className="cert-issuer">{c.issuer}</div>
                <div className="cert-date">{c.date}</div>
              </div>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-2)' }}>
                <path d="M7 17L17 7M17 7H8M17 7V16"/>
              </svg>
            </div>
          ))}
        </div>

        <div className="achievements">
          {ACHIEVEMENTS.map(a => (
            <div className="ach reveal" key={a.title}>
              <AchIcon kind={a.kind}/>
              <h4 className="ach-title">{a.title}</h4>
              <p className="ach-desc">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----- Blog -----
function BlogThumb({ accent, glyph, label }) {
  return (
    <svg viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`bg-${label}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke={`${accent}22`}/>
        </pattern>
      </defs>
      <rect width="600" height="320" fill="#0B1014"/>
      <rect width="600" height="320" fill={`url(#bg-${label})`}/>
      <text x="300" y="170" textAnchor="middle" fontFamily="Space Grotesk" fontSize="72" fill={accent} opacity="0.5" fontWeight="600">{glyph}</text>
      <text x="300" y="240" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="#9CA3AF">[{label}]</text>
    </svg>
  );
}

const POSTS = [
  { tag: 'TUTORIAL', date: '12.05.2026', read: '8 min', title: 'OTA updates that survive a brownout', excerpt: 'A dual-bank firmware pattern for ESP32 that has shipped to 12,000 devices without a single brick.', accent: '#FFFFFF', glyph: '⟲', label: 'esp32_ota.md' },
  { tag: 'OPINION', date: '03.05.2026', read: '5 min', title: 'MQTT is fine. Your topic design isn\'t.', excerpt: 'Most IoT pipelines die at the broker. Five rules I follow for a topic tree that scales past 100k devices.', accent: '#A3A3A3', glyph: '#', label: 'mqtt_topics.md' },
  { tag: 'CASE STUDY', date: '21.04.2026', read: '12 min', title: 'Cutting a fleet\'s power budget by 64%', excerpt: 'Profiling, sleep modes, radio scheduling — the full audit that doubled battery life on our wearable line.', accent: '#FFFFFF', glyph: '⚡', label: 'power_audit.md' },
];

function Blog() {
  return (
    <section id="blog">
      <div className="container">
        <div className="section-head-row">
          <div>
            <div className="kicker">07 // Writing</div>
            <h2 className="section-title">Articles &amp; notes<br/>from the bench.</h2>
            <p className="section-sub">Cross-posted on Hackster &amp; Dev.to. Mostly firmware, fleets, and what breaks at 3 a.m.</p>
          </div>
          <div className="section-meta">
            <div>POSTS: <span className="v">23</span></div>
            <div>SUBS: <span className="v">2,140</span></div>
          </div>
        </div>

        <div className="blog-grid">
          {POSTS.map(p => (
            <article key={p.title} className="blog-card reveal">
              <div className="blog-thumb"><BlogThumb accent={p.accent} glyph={p.glyph} label={p.label}/></div>
              <div className="blog-body">
                <div className="blog-meta">
                  <span className="tag">{p.tag}</span>
                  <span>·</span>
                  <span>{p.date}</span>
                  <span>·</span>
                  <span>{p.read}</span>
                </div>
                <h3 className="blog-title">{p.title}</h3>
                <p className="blog-excerpt">{p.excerpt}</p>
                <a href="#" className="blog-readmore">
                  Read article
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----- Testimonials -----
const TESTIMONIALS = [
  { quote: "Diligent, curious, and one of the most self-directed students I have supervised. His thesis demonstrated genuine end-to-end ownership of an IoT system.", name: 'Dr. [SUPERVISOR_NAME]', role: 'Thesis Advisor · [YOUR_UNIVERSITY]', initials: 'SV' },
  { quote: "Picked up the firmware codebase quickly and contributed test coverage that the rest of the team has continued to build on. A pleasure to onboard.", name: '[INTERN_MENTOR_NAME]', role: 'Senior Engineer · [INTERNSHIP_COMPANY]', initials: 'IM' },
  { quote: "Reliable lab partner. Carried our hackathon team\u2019s firmware in 36 hours and stayed calm when the board wouldn\u2019t boot.", name: '[HACKATHON_TEAMMATE]', role: 'Teammate · Campus Innovation Challenge', initials: 'HT' },
];

function Testimonials() {
  return (
    <section id="testimonials">
      <div className="container">
        <div className="section-head-row">
          <div>
            <div className="kicker">08 // Voices</div>
            <h2 className="section-title">What collaborators<br/>have said.</h2>
          </div>
          <div className="section-meta">
            <div>SAMPLE: <span className="v">3 / 14</span></div>
          </div>
        </div>

        <div className="testimonial-grid">
          {TESTIMONIALS.map(t => (
            <div className="testimonial reveal" key={t.name}>
              <div className="quote-mark">&ldquo;</div>
              <p>{t.quote}</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.initials}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----- Contact -----
function Check() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="check" style={{ color: 'var(--green)' }}>
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function Contact() {
  const [form, setForm] = React.useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [copied, setCopied] = React.useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setToast('Message sent. You will receive a response within 24 hours.');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setToast(null), 3500);
    }, 1100);
  };

  const copyEmail = () => {
    navigator.clipboard && navigator.clipboard.writeText('hello@[yourdomain].dev');
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-left">
            <div className="kicker">09 // Get In Touch</div>
            <h2>Let&rsquo;s build<br/>something <span className="accent">connected.</span></h2>
            <p>I am currently looking for my first full-time role as a Junior IoT or Embedded Engineer. Open to internships, contract work, and freelance projects. I reply to every message.</p>

            <div className="contact-info">
              <div className="info-row">
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6"/></svg>
                </div>
                <span>hello@[yourdomain].dev</span>
                <button className="copy-btn" onClick={copyEmail}>{copied ? '✓ copied' : 'copy'}</button>
              </div>
              <div className="info-row">
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <span>Wates, Yogyakarta · ID</span>
              </div>
              <div className="info-row">
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <span>GMT+7 · Replies within 24h</span>
              </div>
            </div>

            <div className="avail-chips">
              <div className="avail-chip"><Check/>Entry-Level</div>
              <div className="avail-chip"><Check/>Internship</div>
              <div className="avail-chip"><Check/>Freelance</div>
              <div className="avail-chip"><Check/>Remote</div>
            </div>
          </div>

          <form className="form" onSubmit={onSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your full name" required/>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@company.com" required/>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input className="form-input" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="What's this about?"/>
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-textarea" value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell me about your project, role, or idea…" required/>
            </div>
            <button type="submit" className="btn btn-primary btn-icon" disabled={sending}>
              {sending ? (
                <React.Fragment>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                  </svg>
                  Transmitting…
                </React.Fragment>
              ) : (
                <React.Fragment>
                  Send Message
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </React.Fragment>
              )}
            </button>
          </form>
        </div>
      </div>
      {toast && (
        <div className="toast">
          <span className="dot"></span>
          {toast}
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}

// ----- Footer -----
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand-block">
            <div className="brand">
              <span className="brand-glyph">⌬</span>
              <span>[YOUR_NAME].iot</span>
            </div>
            <p>Building the bridge between hardware and the cloud — from sensor to dashboard, one signal at a time.</p>
          </div>
          <div className="footer-col">
            <h4>Navigate</h4>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
          </div>
          <div className="footer-col">
            <h4>More</h4>
            <a href="#certs">Certifications</a>
            <a href="#blog">Articles</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-col">
            <h4>Elsewhere</h4>
            <a href="#">GitHub ↗</a>
            <a href="#">LinkedIn ↗</a>
            <a href="#">Hackster ↗</a>
            <a href="#">X / Twitter ↗</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 [YOUR_NAME]. All rights reserved.</div>
          <div>Designed and engineered in Yogyakarta · <a href="#" style={{ textDecoration: 'underline', color: 'var(--text-2)' }}>view source</a></div>
        </div>
      </div>
    </footer>
  );
}

window.CertsAchievements = CertsAchievements;
window.Blog = Blog;
window.Testimonials = Testimonials;
window.Contact = Contact;
window.Footer = Footer;
