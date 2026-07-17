// Hero section: circuit bg, typing role, status pulse, stats ticker
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

function CircuitBG() {
  // Minimal modern grid: subtle major grid lines + a few quiet accents
  return (
    <svg viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-fine" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.018)" strokeWidth="1"/>
        </pattern>
        <pattern id="grid-major" width="240" height="240" patternUnits="userSpaceOnUse">
          <path d="M 240 0 L 0 0 0 240" fill="none" stroke="rgba(255, 255, 255,0.04)" strokeWidth="1"/>
        </pattern>
        <linearGradient id="fade-bottom" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0A0A0A" stopOpacity="0"/>
          <stop offset="100%" stopColor="#0A0A0A" stopOpacity="1"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-fine)"/>
      <rect width="100%" height="100%" fill="url(#grid-major)"/>
      {/* Two quiet horizontal hairlines */}
      <line x1="0" y1="360" x2="1280" y2="360" stroke="rgba(255, 255, 255,0.06)" strokeWidth="1"/>
      <line x1="640" y1="0" x2="640" y2="720" stroke="rgba(255, 255, 255,0.04)" strokeWidth="1"/>
      {/* A handful of small intersection markers, not glowy */}
      {[[240,240],[480,240],[800,480],[1040,240],[480,480]].map(([x,y],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="2" fill="#FFFFFF" opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur={`${3 + i*0.4}s`} repeatCount="indefinite"/>
          </circle>
        </g>
      ))}
      <rect width="100%" height="100%" fill="url(#fade-bottom)"/>
    </svg>
  );
}

function PCB3D() {
  // Isometric stacked PCB layers: substrate, traces, components, top silk
  return (
    <div className="pcb-3d-wrap" aria-hidden="true">
      <div className="pcb-3d">
        {/* Layer 0: shadow / glow */}
        <div className="pcb-layer l0">
          <svg viewBox="0 0 400 400">
            <rect x="20" y="20" width="360" height="360" rx="14" fill="#003B47" opacity="0.5"/>
          </svg>
        </div>
        {/* Layer 1: substrate */}
        <div className="pcb-layer l1">
          <svg viewBox="0 0 400 400">
            <defs>
              <pattern id="pcb-fiber" width="6" height="6" patternUnits="userSpaceOnUse">
                <path d="M 0 3 L 6 3" stroke="rgba(0,80,90,0.5)" strokeWidth="0.4"/>
              </pattern>
            </defs>
            <rect x="20" y="20" width="360" height="360" rx="14" fill="#062028"/>
            <rect x="20" y="20" width="360" height="360" rx="14" fill="url(#pcb-fiber)"/>
            {/* mounting holes */}
            {[[40,40],[360,40],[40,360],[360,360]].map(([x,y],i) =>
              <g key={i}><circle cx={x} cy={y} r="6" fill="#0A0A0A"/><circle cx={x} cy={y} r="4" fill="#1a3540"/></g>
            )}
          </svg>
        </div>
        {/* Layer 2: traces + pads */}
        <div className="pcb-layer l2">
          <svg viewBox="0 0 400 400">
            <g stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity="0.85" filter="url(#trace-glow)">
              <defs>
                <filter id="trace-glow"><feGaussianBlur stdDeviation="0.6"/><feComponentTransfer><feFuncA type="linear" slope="2"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>
              {/* main bus traces */}
              <path d="M 60 80 L 340 80 L 340 120 L 280 120 L 280 200"/>
              <path d="M 60 110 L 220 110 L 220 180 L 160 180 L 160 280"/>
              <path d="M 60 140 L 200 140 L 200 220 L 340 220 L 340 320"/>
              <path d="M 100 320 L 240 320 L 240 260"/>
              <path d="M 60 260 L 120 260 L 120 340"/>
              <path d="M 280 60 L 280 90"/>
              <path d="M 320 200 L 320 270 L 260 270"/>
              {/* perpendicular short traces */}
              <path d="M 100 200 L 140 200"/>
              <path d="M 180 240 L 180 300"/>
            </g>
            {/* through-hole pads */}
            {[[60,80],[60,110],[60,140],[60,260],[100,200],[100,320],[120,340],[140,200],[160,280],[180,240],[180,300],[200,140],[200,220],[220,110],[220,180],[240,260],[240,320],[260,270],[280,60],[280,90],[280,120],[280,200],[320,200],[320,270],[340,80],[340,120],[340,220],[340,320]].map(([x,y],i) =>
              <g key={i}>
                <circle cx={x} cy={y} r="3" fill="#D4D4D4"/>
                <circle cx={x} cy={y} r="1.2" fill="#0A0A0A"/>
              </g>
            )}
          </svg>
        </div>
        {/* Layer 3: components on top */}
        <div className="pcb-layer l3">
          <svg viewBox="0 0 400 400">
            {/* main MCU chip (QFP) */}
            <g>
              <rect x="100" y="150" width="100" height="100" rx="3" fill="#0F0F0F" stroke="#222" strokeWidth="1"/>
              <rect x="105" y="155" width="90" height="90" fill="#1a1a1a"/>
              {/* QFP pins on 4 sides */}
              {Array.from({length: 10}).map((_, i) => {
                const o = 105 + 5 + i * 9;
                return <g key={i}>
                  <rect x={o} y="146" width="5" height="6" fill="#C0C0C0"/>
                  <rect x={o} y="248" width="5" height="6" fill="#C0C0C0"/>
                  <rect x="94" y={150 + 5 + i * 9} width="6" height="5" fill="#C0C0C0"/>
                  <rect x="200" y={150 + 5 + i * 9} width="6" height="5" fill="#C0C0C0"/>
                </g>;
              })}
              <text x="150" y="200" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="#666">ESP32</text>
              <text x="150" y="212" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill="#444">WROOM-32</text>
              {/* pin1 dot */}
              <circle cx="112" cy="162" r="2" fill="#D4D4D4"/>
            </g>
            {/* secondary chip (SOIC) */}
            <g>
              <rect x="240" y="60" width="60" height="40" rx="2" fill="#0F0F0F" stroke="#222"/>
              <text x="270" y="84" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill="#666">RF24</text>
              {Array.from({length: 5}).map((_, i) =>
                <g key={i}>
                  <rect x={245 + i * 12} y="56" width="6" height="5" fill="#C0C0C0"/>
                  <rect x={245 + i * 12} y="99" width="6" height="5" fill="#C0C0C0"/>
                </g>
              )}
            </g>
            {/* SMD resistors/caps */}
            {[[60,180,'R1'],[60,220,'R2'],[80,290,'C1'],[260,180,'R3'],[290,150,'C2'],[300,310,'R4']].map(([x,y,l],i) =>
              <g key={i}>
                <rect x={x-6} y={y-3} width="12" height="6" fill="#1a1a1a" stroke="#333"/>
                <text x={x} y={y+12} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5" fill="#444">{l}</text>
              </g>
            )}
            {/* electrolytic capacitor */}
            <g>
              <circle cx="80" cy="80" r="14" fill="#1a1a1a" stroke="#0a0a0a" strokeWidth="2"/>
              <circle cx="80" cy="80" r="10" fill="#0a0a0a"/>
              <line x1="76" y1="80" x2="84" y2="80" stroke="#666" strokeWidth="1"/>
            </g>
            {/* LEDs */}
            <g>
              <circle cx="320" cy="80" r="5" fill="#A3A3A3" opacity="0.95">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="1.3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="320" cy="80" r="10" fill="none" stroke="#A3A3A3" opacity="0.3">
                <animate attributeName="r" values="5;14;5" dur="1.3s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.5;0;0.5" dur="1.3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="340" cy="320" r="4" fill="#FFFFFF" opacity="0.9">
                <animate attributeName="opacity" values="1;0.2;1" dur="0.9s" repeatCount="indefinite"/>
              </circle>
              <circle cx="60" cy="320" r="4" fill="#FFFFFF" opacity="0.9">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="1.6s" repeatCount="indefinite"/>
              </circle>
            </g>
            {/* Crystal oscillator */}
            <g>
              <rect x="222" y="270" width="36" height="14" rx="2" fill="#3a3a3a" stroke="#666"/>
              <text x="240" y="280" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5" fill="#aaa">26.000</text>
            </g>
            {/* Header pins */}
            <g>
              {Array.from({length: 6}).map((_, i) =>
                <g key={i}>
                  <rect x={45 + i * 9} y="50" width="5" height="5" fill="#D4D4D4" stroke="#aa8800"/>
                </g>
              )}
            </g>
            {/* Silk label */}
            <text x="200" y="385" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#888" letterSpacing="2">[ IoT-NODE-v3.2 ]</text>
          </svg>
        </div>
      </div>
      <div className="pcb-3d-tag">PCB_PREVIEW · ROTATING</div>
    </div>
  );
}

function RoleRotator({ roles }) {
  // Vertical mask rotator — like a split-flap, no caret, no typing
  const [idx, setIdx] = useStateH(0);
  useEffectH(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % roles.length), 2800);
    return () => clearInterval(t);
  }, [roles.length]);
  return (
    <div className="role-rotator">
      <span className="role-rotator-prefix">Currently —</span>
      <div className="role-rotator-mask">
        <div className="role-rotator-track" style={{ transform: `translateY(-${idx * 100}%)` }}>
          {roles.map(r => <div key={r} className="role-rotator-item">{r}</div>)}
          <div className="role-rotator-item">{roles[0]}</div>
        </div>
      </div>
    </div>
  );
}

function StaggerName({ text }) {
  // Character-by-character mask reveal, with subtle weight stagger
  const chars = text.split('');
  return (
    <h1 className="stagger-name">
      {chars.map((ch, i) => (
        <span key={i} className="stagger-char-mask">
          <span className="stagger-char" style={{ animationDelay: `${0.05 + i * 0.04}s` }}>
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        </span>
      ))}
    </h1>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg"><CircuitBG/></div>
      <div className="hero-gradient"></div>
      <div className="hero-vignette"></div>

      <PCB3D/>

      <div className="container hero-content">
        <div className="hero-watermark" aria-hidden="true">
          <span>IoT</span>
          <span className="hero-watermark-sep">/</span>
          <span>'25</span>
        </div>

        <div className="hero-meta">
          <span className="status-dot"></span>
          <span>OPEN TO ENTRY-LEVEL ROLES</span>
          <span className="hero-meta-sep"></span>
          <span>S1 · CLASS OF 2025</span>
          <span className="hero-meta-sep"></span>
          <span>WATES, YOGYAKARTA</span>
        </div>

        <StaggerName text="[YOUR_NAME]"/>

        <RoleRotator roles={[
          'IoT Engineer',
          'Embedded Developer',
          'Fresh Graduate, 2025',
          'Junior, ready to ship'
        ]}/>

        <p className="tagline">
          Recent S1 graduate in Electrical &amp; Computer Engineering, focused on
          Internet of Things. Looking for my first full-time role to ship reliable
          connected systems.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary btn-icon">
            <span>View Projects</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
          <a href="#" className="btn btn-ghost btn-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            <span>Download CV</span>
          </a>
        </div>
        <div className="hero-socials">
          {[
            ['GitHub', 'M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.64.71 1.03 1.61 1.03 2.71 0 3.84-2.34 4.68-4.57 4.93.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z'],
            ['LinkedIn', 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 110-4 2 2 0 010 4z'],
            ['Email', 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6'],
            ['X', 'M18 2h3l-7.5 8.5L22 22h-7l-5-6-6 6H1l8-9L1 2h7l4.5 6L18 2z'],
          ].map(([name, d]) => (
            <a key={name} href="#" aria-label={name}>
              <svg viewBox="0 0 24 24" fill={name === 'X' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={d}/>
              </svg>
            </a>
          ))}
        </div>
      </div>

      <div className="hero-side">PORTFOLIO_V1.0 // SCROLL_TO_EXPLORE</div>

      <div className="hero-stats-strip">
        <div className="container">
          <div className="hero-stats-strip-inner">
            <div className="ticker">
              <span><span className="dot"></span>S1 GRADUATE · ELECTRICAL &amp; COMPUTER ENG.</span>
              <span><span className="dot"></span>ESP32 · STM32 · ARDUINO · RPi · LoRaWAN · BLE</span>
              <span><span className="dot"></span>OPEN TO: FULL-TIME · INTERNSHIP · FREELANCE</span>
              <span><span className="dot"></span>BASED IN YOGYAKARTA · WILLING TO RELOCATE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
