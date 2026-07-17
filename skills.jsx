// Skills grid with animated SVG icons per category
function IconChip() {
  // ESP32 chip with blinking LED
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="10" y="10" width="28" height="28" rx="2" stroke="#FFFFFF"/>
      <rect x="15" y="15" width="18" height="18" rx="1" fill="none" stroke="rgba(255, 255, 255,0.4)"/>
      {[14, 20, 26, 32].map(y => (
        <g key={y}>
          <line x1="6" y1={y} x2="10" y2={y} stroke="#FFFFFF"/>
          <line x1="38" y1={y} x2="42" y2={y} stroke="#FFFFFF"/>
        </g>
      ))}
      {[14, 20, 26, 32].map(x => (
        <g key={x}>
          <line x1={x} y1="6" x2={x} y2="10" stroke="#FFFFFF"/>
          <line x1={x} y1="38" x2={x} y2="42" stroke="#FFFFFF"/>
        </g>
      ))}
      <circle cx="33" cy="15" r="1.5" fill="#A3A3A3">
        <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite"/>
      </circle>
      <text x="24" y="27" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill="#FFFFFF">MCU</text>
    </svg>
  );
}

function IconSignal() {
  // WiFi/antenna with concentric ripples
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="24" cy="34" r="2" fill="#FFFFFF"/>
      {[8, 14, 20].map((r, i) => (
        <path key={r} d={`M ${24-r} 34 A ${r} ${r} 0 0 1 ${24+r} 34`} stroke="#FFFFFF" opacity={1 - i*0.25}>
          <animate attributeName="opacity" values={`0;${1 - i*0.25};0`} dur="2.4s" begin={`${i*0.4}s`} repeatCount="indefinite"/>
        </path>
      ))}
      <line x1="24" y1="34" x2="24" y2="40" stroke="#FFFFFF"/>
    </svg>
  );
}

function IconCode() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="10" width="36" height="28" rx="2" stroke="#FFFFFF"/>
      <line x1="6" y1="16" x2="42" y2="16" stroke="#FFFFFF"/>
      <circle cx="10" cy="13" r="0.8" fill="#FFFFFF"/>
      <circle cx="13" cy="13" r="0.8" fill="#D4D4D4"/>
      <circle cx="16" cy="13" r="0.8" fill="#A3A3A3"/>
      <text x="11" y="26" fontFamily="JetBrains Mono" fontSize="4.5" fill="#FFFFFF">$ make</text>
      <text x="11" y="32" fontFamily="JetBrains Mono" fontSize="4.5" fill="#9CA3AF">
        building...
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
      </text>
    </svg>
  );
}

function IconCloud() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 28 A 8 8 0 0 1 22 18 A 8 8 0 0 1 36 22 A 6 6 0 0 1 36 34 L 16 34 A 6 6 0 0 1 14 28 Z" stroke="#FFFFFF" fill="none"/>
      {[0, 1, 2].map(i => (
        <circle key={i} cx={20 + i * 6} cy="40" r="1.5" fill="#A3A3A3">
          <animate attributeName="cy" values="40;30;40" dur="2s" begin={`${i*0.3}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;0" dur="2s" begin={`${i*0.3}s`} repeatCount="indefinite"/>
        </circle>
      ))}
    </svg>
  );
}

function IconDB() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="24" cy="12" rx="14" ry="4" stroke="#FFFFFF"/>
      <path d="M 10 12 V 22 A 14 4 0 0 0 38 22 V 12" stroke="#FFFFFF"/>
      <path d="M 10 22 V 32 A 14 4 0 0 0 38 32 V 22" stroke="#FFFFFF"/>
      <path d="M 10 32 V 38 A 14 4 0 0 0 38 38 V 32" stroke="#FFFFFF"/>
      <circle cx="24" cy="22" r="1" fill="#A3A3A3">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
}

function IconWave() {
  // sensor wave
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="14" width="36" height="20" rx="2" stroke="#FFFFFF"/>
      <path d="M 10 24 L 14 24 L 16 18 L 20 30 L 24 20 L 28 26 L 32 22 L 38 24" stroke="#A3A3A3" strokeWidth="1.5">
        <animate attributeName="d"
          values="M 10 24 L 14 24 L 16 18 L 20 30 L 24 20 L 28 26 L 32 22 L 38 24;
                  M 10 24 L 14 20 L 16 28 L 20 18 L 24 30 L 28 22 L 32 26 L 38 24;
                  M 10 24 L 14 24 L 16 18 L 20 30 L 24 20 L 28 26 L 32 22 L 38 24"
          dur="3s" repeatCount="indefinite"/>
      </path>
    </svg>
  );
}

function IconTools() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M 14 14 L 24 24 L 14 34" stroke="#FFFFFF" strokeLinecap="round"/>
      <line x1="26" y1="34" x2="36" y2="34" stroke="#FFFFFF" strokeLinecap="round"/>
      <circle cx="36" cy="14" r="2" fill="#FFFFFF">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
}

function IconBrain() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="16" cy="24" r="6" stroke="#FFFFFF"/>
      <circle cx="32" cy="24" r="6" stroke="#FFFFFF"/>
      <line x1="22" y1="24" x2="26" y2="24" stroke="#FFFFFF"/>
      <circle cx="16" cy="24" r="1.5" fill="#A3A3A3"><animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/></circle>
      <circle cx="32" cy="24" r="1.5" fill="#A3A3A3"><animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/></circle>
    </svg>
  );
}

const CATS = [
  {
    icon: <IconChip/>, tag: "A.HW", title: "Hardware & MCU",
    desc: "Boards, modules, and sensors I reach for first.",
    items: ["ESP32", "ESP8266", "Arduino Uno/Mega/Nano", "Raspberry Pi 3/4/5", "RPi Pico", "STM32", "NodeMCU", "BeagleBone", "DHT22", "BMP280", "MPU6050", "PIR"]
  },
  {
    icon: <IconSignal/>, tag: "B.NET", title: "Communication Protocols",
    desc: "Wire and wireless — short range to LPWAN.",
    items: ["MQTT", "HTTP/REST", "WebSocket", "CoAP", "LoRaWAN", "Zigbee", "BLE", "Wi-Fi", "GSM/NB-IoT", "LTE-M", "Modbus", "RS-485"]
  },
  {
    icon: <IconCode/>, tag: "C.LANG", title: "Programming Languages",
    desc: "From bare-metal silicon up to dashboards and PLCs.",
    isLang: true,
  },
  {
    icon: <IconCloud/>, tag: "D.CLOUD", title: "Cloud & IoT Platforms",
    desc: "Where the devices report home.",
    items: ["AWS IoT Core", "Azure IoT Hub", "Google Cloud IoT", "ThingsBoard", "Blynk", "Adafruit IO", "Firebase RTDB"]
  },
  {
    icon: <IconDB/>, tag: "E.DATA", title: "Database & Pipeline",
    desc: "Time-series first, then everything else.",
    items: ["InfluxDB", "MongoDB", "PostgreSQL", "Redis", "Apache Kafka", "Mosquitto", "HiveMQ"]
  },
  {
    icon: <IconWave/>, tag: "F.VIZ", title: "Visualization & Dashboards",
    desc: "Charts that wake up your on-call.",
    items: ["Grafana", "Node-RED", "Power BI", "React + Recharts", "D3.js"]
  },
  {
    icon: <IconTools/>, tag: "G.OPS", title: "DevOps & Tools",
    desc: "Build, ship, simulate, debug.",
    items: ["Git/GitHub", "Docker", "PlatformIO", "Arduino IDE", "KiCad", "EasyEDA", "Fritzing", "Proteus", "LTspice", "VS Code"]
  },
  {
    icon: <IconBrain/>, tag: "H.SOFT", title: "Soft Skills",
    desc: "The parts no library ships with.",
    items: ["Problem Solving", "Technical Writing", "Team Collaboration", "Agile / Scrum", "Mentoring"]
  },
];

// Custom-drawn language glyphs (original — no copyrighted logos)
const LangGlyphs = {
  python: (
    <svg viewBox="0 0 32 32" fill="none">
      <path d="M16 4c-4 0-6 2-6 5v3h6v1H8c-3 0-5 2-5 6s2 6 5 6h2v-3c0-2 2-4 5-4h7c2 0 3-1 3-3V9c0-3-2-5-9-5z" fill="#3776AB"/>
      <path d="M16 28c4 0 6-2 6-5v-3h-6v-1h8c3 0 5-2 5-6s-2-6-5-6h-2v3c0 2-2 4-5 4h-7c-2 0-3 1-3 3v6c0 3 2 5 9 5z" fill="#FFD43B"/>
      <circle cx="13" cy="8" r="1.2" fill="#fff"/>
      <circle cx="19" cy="24" r="1.2" fill="#fff"/>
    </svg>
  ),
  c: (
    <svg viewBox="0 0 32 32" fill="none">
      <path d="M16 3l11 6.5v13L16 29 5 22.5v-13z" fill="#283593" stroke="#5C6BC0" strokeWidth="1"/>
      <text x="16" y="21" textAnchor="middle" fontFamily="Space Grotesk" fontSize="13" fontWeight="700" fill="#fff">C</text>
    </svg>
  ),
  cpp: (
    <svg viewBox="0 0 32 32" fill="none">
      <path d="M16 3l11 6.5v13L16 29 5 22.5v-13z" fill="#00549D" stroke="#4FC3F7" strokeWidth="1"/>
      <text x="13" y="21" textAnchor="middle" fontFamily="Space Grotesk" fontSize="11" fontWeight="700" fill="#fff">C</text>
      <text x="22" y="14" textAnchor="middle" fontFamily="Space Grotesk" fontSize="8" fontWeight="700" fill="#fff">++</text>
    </svg>
  ),
  python_micro: (
    <svg viewBox="0 0 32 32" fill="none">
      <rect x="4" y="6" width="24" height="20" rx="3" fill="none" stroke="#2A6FDB" strokeWidth="1.4"/>
      <text x="16" y="20" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fontWeight="700" fill="#FFD43B">µPy</text>
    </svg>
  ),
  js: (
    <svg viewBox="0 0 32 32">
      <rect width="32" height="32" rx="4" fill="#F0DB4F"/>
      <text x="16" y="23" textAnchor="middle" fontFamily="Space Grotesk" fontSize="14" fontWeight="700" fill="#222">JS</text>
    </svg>
  ),
  ts: (
    <svg viewBox="0 0 32 32">
      <rect width="32" height="32" rx="4" fill="#3178C6"/>
      <text x="16" y="23" textAnchor="middle" fontFamily="Space Grotesk" fontSize="14" fontWeight="700" fill="#fff">TS</text>
    </svg>
  ),
  flask: (
    // Flask logo — official chili-pepper silhouette (monochrome on dark theme)
    <svg viewBox="0 0 32 32" fill="none">
      {/* Curved chili body, stem at upper-left, tip swooping to lower-right */}
      <path d="M 10 6
               C 6 8 4 12 4 16
               C 4 22 8 27 15 28
               C 22 28 28 24 29 19
               C 26 21 22 22 18 21
               C 13 20 10 16 10 12
               C 10 10 11 8 11 6 Z"
        fill="#F5F5F5"/>
      {/* Stem + curled leaf cap */}
      <path d="M 9 6
               C 8 5 8 3 10 3
               C 12 3 13 4 13 6
               C 14 5 15 5 15 6
               C 14 7 13 7 12 7
               C 11 7 10 7 9 6 Z"
        fill="#F5F5F5"/>
      {/* Inner shading line, etched-woodcut feel */}
      <path d="M 9 12 Q 11 18 17 22"
        stroke="#0A0A0A" strokeWidth="0.6" fill="none" opacity="0.35"/>
      <path d="M 14 19 Q 18 21 22 21"
        stroke="#0A0A0A" strokeWidth="0.5" fill="none" opacity="0.25"/>
    </svg>
  ),
  flutter: (
    <svg viewBox="0 0 32 32" fill="none">
      <path d="M20 4L6 18l4 4 18-18z" fill="#54C5F8"/>
      <path d="M20 16l-6 6 6 6h8l-6-6 6-6z" fill="#54C5F8"/>
      <path d="M14 22l6 6h8l-6-6z" fill="#01579B"/>
      <path d="M14 22l6-6 6 6-6 6z" fill="#29B6F6"/>
    </svg>
  ),
  dart: (
    <svg viewBox="0 0 32 32" fill="none">
      <path d="M9 17l11-11 7 7v15H12z" fill="#0175C2"/>
      <path d="M9 17l3-3 12 12-2 2H12z" fill="#13B9FD"/>
      <path d="M27 13v15h-4z" fill="#00C4B3" opacity="0.6"/>
    </svg>
  ),
  node: (
    <svg viewBox="0 0 32 32" fill="none">
      <path d="M16 3l11 6.5v13L16 29 5 22.5v-13z" fill="#3C873A" stroke="#5BC256" strokeWidth="0.8"/>
      <text x="16" y="20" textAnchor="middle" fontFamily="Space Grotesk" fontSize="9" fontWeight="700" fill="#fff">node</text>
    </svg>
  ),
  ladder: (
    <svg viewBox="0 0 32 32" fill="none" stroke="#FFFFFF" strokeWidth="1.4">
      {/* Two vertical rails */}
      <line x1="4" y1="4" x2="4" y2="28"/>
      <line x1="28" y1="4" x2="28" y2="28"/>
      {/* Rung 1: normally open contact */}
      <line x1="4" y1="10" x2="11" y2="10"/>
      <line x1="11" y1="7" x2="11" y2="13"/>
      <line x1="15" y1="7" x2="15" y2="13"/>
      <line x1="15" y1="10" x2="21" y2="10"/>
      <circle cx="24.5" cy="10" r="3" fill="none"/>
      <line x1="27.5" y1="10" x2="28" y2="10"/>
      {/* Rung 2: NC contact + output */}
      <line x1="4" y1="20" x2="11" y2="20"/>
      <line x1="11" y1="17" x2="11" y2="23"/>
      <line x1="15" y1="17" x2="15" y2="23"/>
      <line x1="11" y1="17" x2="15" y2="23"/>
      <line x1="15" y1="20" x2="28" y2="20"/>
    </svg>
  ),
};

const LANGS = [
  { key: 'cpp', name: 'C / C++', prof: 85 },
  { key: 'python', name: 'Python', prof: 82 },
  { key: 'python_micro', name: 'MicroPython', prof: 75 },
  { key: 'js', name: 'JavaScript', prof: 65 },
  { key: 'flask', name: 'Flask', prof: 60 },
  { key: 'node', name: 'Node.js', prof: 55 },
  { key: 'flutter', name: 'Flutter', prof: 60 },
  { key: 'dart', name: 'Dart', prof: 58 },
  { key: 'ladder', name: 'Ladder Logic', prof: 50 },
];

function LangGrid() {
  return (
    <div className="lang-grid">
      {LANGS.map(l => (
        <div key={l.key} className="lang-card">
          {LangGlyphs[l.key]}
          <div className="lang-name">{l.name}</div>
          <div className="lang-prof"><span style={{ width: `${l.prof}%` }}></span></div>
        </div>
      ))}
    </div>
  );
}

function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <div className="section-head-row">
          <div>
            <div className="kicker">03 // Capabilities</div>
            <h2 className="section-title">Full stack — from<br/>silicon to dashboard.</h2>
            <p className="section-sub">Eight domains, one signal path. Click any chip to see what I've shipped with it (placeholder).</p>
          </div>
          <div className="section-meta">
            <div>TOTAL_NODES: <span className="v">{CATS.reduce((s, c) => s + (c.items ? c.items.length : LANGS.length), 0)}</span></div>
            <div>CATEGORIES: <span className="v">{CATS.length}</span></div>
          </div>
        </div>

        <div className="skills-grid">
          {CATS.map((c) => (
            <div className={"skill-cat reveal" + (c.isLang ? " lang-cat" : "")} key={c.tag}>
              <div className="skill-cat-head">
                <div className="skill-cat-icon">{c.icon}</div>
                <div className="skill-cat-tag">{c.tag}</div>
              </div>
              <h3 className="skill-cat-title">{c.title}</h3>
              <p className="skill-cat-desc">{c.desc}</p>
              {c.isLang ? <LangGrid/> : (
                <div className="skill-pills">
                  {c.items.map((it, i) => (
                    <span key={it} className={"pill" + (i < 2 ? " cyan" : "")}>{it}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Skills = Skills;
