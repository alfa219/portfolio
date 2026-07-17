// Featured projects + experience timeline

function ProjectThumb({ kind }) {
  // Each kind renders a different stylized placeholder visualization
  if (kind === 'smarthome') {
    return (
      <svg viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="th-grid-1" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255,0.08)"/>
          </pattern>
        </defs>
        <rect width="600" height="320" fill="url(#th-grid-1)"/>
        {/* House outline */}
        <path d="M 200 220 L 200 130 L 300 70 L 400 130 L 400 220 Z" fill="none" stroke="#FFFFFF" strokeWidth="1.5"/>
        <rect x="280" y="170" width="40" height="50" fill="none" stroke="#FFFFFF" strokeWidth="1.5"/>
        {/* Connected dots */}
        {[[220, 160], [380, 160], [240, 200], [360, 200], [300, 100]].map(([x,y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="3" fill="#A3A3A3">
              <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1.5 + i*0.3}s`} repeatCount="indefinite"/>
            </circle>
            <circle cx={x} cy={y} r="8" fill="none" stroke="#A3A3A3" opacity="0.3"/>
          </g>
        ))}
        <text x="300" y="280" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="#FFFFFF">[smart_home.svg]</text>
      </svg>
    );
  }
  if (kind === 'industrial') {
    return (
      <svg viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
        <rect width="600" height="320" fill="#0B1014"/>
        {/* graph lines */}
        <g stroke="rgba(255, 255, 255,0.15)">
          {[60, 110, 160, 210, 260].map(y => <line key={y} x1="40" y1={y} x2="560" y2={y}/>)}
        </g>
        <polyline points="40,180 100,150 160,170 220,120 280,140 340,90 400,110 460,70 520,100 560,80" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
        <polyline points="40,220 100,200 160,210 220,180 280,200 340,170 400,180 460,150 520,170 560,160" fill="none" stroke="#A3A3A3" strokeWidth="2" opacity="0.7"/>
        {[100, 220, 340, 460].map((x, i) => (
          <circle key={x} cx={x} cy={150 - i*15} r="3" fill="#FFFFFF">
            <animate attributeName="r" values="3;6;3" dur="2s" begin={`${i*0.3}s`} repeatCount="indefinite"/>
          </circle>
        ))}
        <text x="50" y="40" fontFamily="JetBrains Mono" fontSize="10" fill="#9CA3AF">TEMP_C</text>
        <text x="50" y="290" fontFamily="JetBrains Mono" fontSize="10" fill="#A3A3A3">VIBRATION_HZ — OK</text>
      </svg>
    );
  }
  if (kind === 'env') {
    return (
      <svg viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
        <rect width="600" height="320" fill="#0B1014"/>
        {/* radial gauges */}
        {[[150, 160, 'PM2.5'], [300, 160, 'AQI'], [450, 160, 'pH']].map(([cx, cy, label], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="55" fill="none" stroke="rgba(255, 255, 255,0.15)" strokeWidth="6"/>
            <circle cx={cx} cy={cy} r="55" fill="none" stroke="#FFFFFF" strokeWidth="6"
              strokeDasharray={`${50 + i*30} 999`} transform={`rotate(-90 ${cx} ${cy})`} strokeLinecap="round"/>
            <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="Space Grotesk" fontSize="22" fill="#F5F5F5" fontWeight="600">{[42, 67, 7.2][i]}</text>
            <text x={cx} y={cy + 90} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#9CA3AF">{label}</text>
          </g>
        ))}
      </svg>
    );
  }
  if (kind === 'agri') {
    return (
      <svg viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
        <rect width="600" height="320" fill="#0B1014"/>
        {/* field grid */}
        {Array.from({length: 7}).map((_, r) =>
          Array.from({length: 14}).map((_, c) => {
            const x = 50 + c*36, y = 60 + r*32;
            const wet = (r*c) % 3 === 0;
            return <rect key={`${r}-${c}`} x={x} y={y} width="28" height="24" fill={wet ? "rgba(180, 180, 180,0.25)" : "rgba(255, 255, 255,0.08)"} stroke="rgba(255, 255, 255,0.2)"/>;
          })
        )}
        {/* sprinkler */}
        <g>
          <circle cx="240" cy="170" r="4" fill="#FFFFFF"/>
          {[15, 30, 45].map(r => (
            <circle key={r} cx="240" cy="170" r={r} fill="none" stroke="#A3A3A3" opacity={0.6 - r*0.01}>
              <animate attributeName="r" values={`${r};${r+20}`} dur="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite"/>
            </circle>
          ))}
        </g>
        <text x="50" y="40" fontFamily="JetBrains Mono" fontSize="10" fill="#9CA3AF">SOIL_MOISTURE_GRID · 7×14</text>
      </svg>
    );
  }
  if (kind === 'wearable') {
    return (
      <svg viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
        <rect width="600" height="320" fill="#0B1014"/>
        {/* ECG */}
        <polyline
          points="40,180 100,180 110,180 115,140 125,220 130,180 200,180 210,180 215,140 225,220 230,180 300,180 310,180 315,140 325,220 330,180 400,180 410,180 415,140 425,220 430,180 500,180 560,180"
          fill="none" stroke="#FFFFFF" strokeWidth="2"/>
        <text x="50" y="40" fontFamily="JetBrains Mono" fontSize="10" fill="#FFFFFF">♥ 78 BPM · BLE_CONNECTED</text>
        <text x="50" y="280" fontFamily="JetBrains Mono" fontSize="10" fill="#9CA3AF">GPS: -7.85, 110.16 · ACCURACY ±3m</text>
      </svg>
    );
  }
  if (kind === 'asset') {
    return (
      <svg viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
        <rect width="600" height="320" fill="#0B1014"/>
        {/* map-ish */}
        <g stroke="rgba(255, 255, 255,0.15)" fill="none">
          <path d="M 0 220 Q 150 180 300 210 T 600 200"/>
          <path d="M 0 140 Q 200 100 400 130 T 600 110"/>
          <path d="M 100 0 L 200 320"/>
          <path d="M 400 0 L 350 320"/>
        </g>
        {[[100, 180], [250, 150], [380, 200], [480, 130]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="6" fill="#FFFFFF">
              <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" begin={`${i*0.4}s`} repeatCount="indefinite"/>
            </circle>
            <text x={x + 12} y={y + 4} fontFamily="JetBrains Mono" fontSize="9" fill="#F5F5F5">FLEET-0{i+1}</text>
          </g>
        ))}
        <text x="50" y="40" fontFamily="JetBrains Mono" fontSize="10" fill="#9CA3AF">LORAWAN · 4 ASSETS · LAST_PING 12s</text>
      </svg>
    );
  }
  return null;
}

const PROJECTS = [
  {
    kind: 'smarthome', id: 'PRJ_001', feat: true, status: 'live',
    title: 'Smart Home Automation Hub',
    desc: 'University final-year project: ESP32 hub controlling lighting and climate across four rooms, with a mobile app over MQTT and local Mosquitto broker. Source code public on GitHub.',
    stack: ['ESP32', 'MQTT', 'Flutter', 'Node-RED']
  },
  {
    kind: 'industrial', id: 'PRJ_002', status: 'live',
    title: 'Industrial Monitoring Prototype',
    desc: 'Internship project: vibration and thermal monitoring rig for three motors on a Modbus bus, with anomaly detection in Python and a Grafana dashboard.',
    stack: ['STM32', 'Modbus', 'InfluxDB', 'Grafana']
  },
  {
    kind: 'env', id: 'PRJ_003', status: 'live',
    title: 'Environmental Air Quality Station',
    desc: 'Personal build: outdoor PM2.5 and AQI station with a public dashboard, sampling every five minutes and posting daily summaries.',
    stack: ['ESP32', 'BME680', 'LoRaWAN', 'ThingsBoard']
  },
  {
    kind: 'agri', id: 'PRJ_004', status: 'wip',
    title: 'Smart Agriculture Irrigation',
    desc: 'Hackathon project, now in active development: soil-moisture nodes triggering irrigation valves based on threshold readings and weather-API forecasts.',
    stack: ['RPi Pico', 'Zigbee', 'PostgreSQL', 'Open-Meteo API']
  },
  {
    kind: 'wearable', id: 'PRJ_005', status: 'archived',
    title: 'Wearable Health Tracker (Coursework)',
    desc: 'Course assignment: wristband prototype with PPG heart-rate sensor and BLE sync to a companion app. Demonstrated working at the engineering showcase.',
    stack: ['nRF52', 'BLE', 'Flutter', 'Firebase']
  },
  {
    kind: 'asset', id: 'PRJ_006', status: 'live',
    title: 'LoRaWAN Asset Tracker',
    desc: 'Personal exploration: a single LoRaWAN tracker node with geofence alerts, integrated with The Things Network and a simple map dashboard.',
    stack: ['RAK4630', 'LoRaWAN', 'TTN', 'MapLibre']
  },
];

const STATUS_LABEL = {
  live: ['live', '● Live'],
  wip: ['wip', '● In Progress'],
  archived: ['arch', '● Archived'],
};

const PROJECT_DETAILS = {
  PRJ_001: {
    role: 'Solo Builder · Final-Year Project',
    duration: '6 months (Sep 2024 — Feb 2025)',
    challenge: 'Build a reliable smart-home hub on student budget that runs entirely on local network for privacy, with cloud fallback only when away from home.',
    approach: [
      'Selected ESP32 over Raspberry Pi for cost (₹0.4M total bill of materials) and instant-boot behaviour.',
      'Implemented a dual-broker pattern: local Mosquitto for LAN, AWS IoT Core for off-LAN access — with seamless handover.',
      'Wrote a Flutter companion app with reactive subscribers so the UI updates within 200ms of physical switch changes.',
    ],
    outcome: [
      'Defended thesis with grade A and demoed live to faculty panel.',
      'Open-sourced on GitHub with full schematic, KiCad files, and firmware.',
      'Uptime of 99.4% over a 3-month test period across 4 rooms.',
    ],
    links: { github: '#', demo: '#', case: '#' },
  },
  PRJ_002: {
    role: 'IoT Intern · Industrial Monitoring Team',
    duration: '3 months (Jun — Aug 2024)',
    challenge: 'Existing fleet of 42 motors had no condition monitoring; maintenance was reactive and downtime expensive.',
    approach: [
      'Designed STM32 sensor node sampling vibration (MPU6050) and temperature at 100Hz.',
      'Pipelined readings through Modbus → ingest gateway → InfluxDB.',
      'Built anomaly detection in Python using rolling-window FFT thresholds.',
    ],
    outcome: [
      'Pilot deployed on 3 motors; flagged a faulty bearing 6 days before failure.',
      'Improved firmware unit-test coverage from 22% to 68%.',
      'Documented two internal runbooks adopted by the team.',
    ],
    links: { github: '#', demo: '#', case: '#' },
  },
  PRJ_003: {
    role: 'Solo Builder · Personal Project',
    duration: 'Ongoing since 2023',
    challenge: 'Wanted real-time air quality data for our neighborhood — public sources have 1-hour latency.',
    approach: [
      'ESP32 + BME680 + PMS7003 outdoor enclosure (IP65 printed shell).',
      'LoRaWAN uplink via The Things Network for low-power 5-minute reporting.',
      'ThingsBoard dashboard with public read-only access.',
    ],
    outcome: [
      'Three nodes live across the neighborhood with 8-month uptime.',
      'Featured on Hackster.io front page in March 2025.',
      'Open-sourced PCB design and enclosure STL files.',
    ],
    links: { github: '#', demo: '#', case: '#' },
  },
  PRJ_004: {
    role: 'Team Lead · Campus Innovation Challenge',
    duration: '36-hour hackathon + ongoing iteration',
    challenge: 'Smallholder farmers irrigate on schedule, not on demand — wasting water in rainy weeks.',
    approach: [
      'Capacitive soil-moisture sensor mesh on RPi Pico nodes, Zigbee uplink.',
      'PostgreSQL backend joining moisture readings with Open-Meteo forecasts.',
      'Solenoid valve controller decides irrigation only if 24h forecast < 5mm rain.',
    ],
    outcome: [
      'Finalist at the Campus Innovation Challenge, 38 competing teams.',
      'Simulated 41% water reduction in a 2-month dry-season test.',
      'Currently being adapted for a real 2-hectare pilot plot.',
    ],
    links: { github: '#', demo: '#', case: '#' },
  },
  PRJ_005: {
    role: 'Coursework Project · Embedded Systems',
    duration: '1 semester (3 months)',
    challenge: 'Demonstrate full BLE + sensor stack as a wearable form factor for the embedded-systems course.',
    approach: [
      'nRF52 dev board with PPG sensor (MAX30102) on a custom carrier PCB.',
      'BLE GATT service exposing heart-rate and battery characteristics.',
      'Flutter companion app pairing and logging to Firebase.',
    ],
    outcome: [
      'Received an A grade and was selected for the engineering showcase.',
      'Wrote a tutorial that has been used as supplementary lab reading.',
    ],
    links: { github: '#', demo: '#', case: '#' },
  },
  PRJ_006: {
    role: 'Solo Builder · Personal Project',
    duration: '2 months',
    challenge: 'Explore LoRaWAN economics — can a tracker really cost less than $2/month telemetry?',
    approach: [
      'RAK4630 module with GPS, accelerometer wake-on-motion to save power.',
      'Joined TTN community network, used Cayenne LPP for compact payloads.',
      'MapLibre frontend with geofence polygons drawn directly on the map.',
    ],
    outcome: [
      'Achieved 14 months projected battery life on a single 18650 cell.',
      'Single-node telemetry cost: well under target at $0.30/month.',
      'Open-sourced for anyone wanting a starter LoRaWAN asset tracker.',
    ],
    links: { github: '#', demo: '#', case: '#' },
  },
};

function ProjectModal({ project, onClose }) {
  React.useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  if (!project) return null;
  const detail = PROJECT_DETAILS[project.id] || {};
  const [cls, label] = STATUS_LABEL[project.status];

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-labelledby="modal-title" aria-modal="true">
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div className="modal-hero">
          <ProjectThumb kind={project.kind}/>
          <div className="modal-hero-meta">
            <span className={"project-badge " + cls}>
              <span className="dot"></span>{label.replace('● ', '')}
            </span>
            <span className="project-id">{project.id}</span>
          </div>
        </div>
        <div className="modal-body">
          <h2 className="modal-title" id="modal-title">{project.title}</h2>
          <p className="modal-desc">{project.desc}</p>

          <div className="modal-meta-row">
            <div className="modal-meta-cell">
              <div className="modal-meta-label">Role</div>
              <div className="modal-meta-val">{detail.role || '—'}</div>
            </div>
            <div className="modal-meta-cell">
              <div className="modal-meta-label">Duration</div>
              <div className="modal-meta-val">{detail.duration || '—'}</div>
            </div>
            <div className="modal-meta-cell">
              <div className="modal-meta-label">Stack</div>
              <div className="modal-meta-val modal-stack-inline">
                {project.stack.map(s => <span key={s} className="pill">{s}</span>)}
              </div>
            </div>
          </div>

          {detail.challenge && (
            <div className="modal-section">
              <h3>Challenge</h3>
              <p>{detail.challenge}</p>
            </div>
          )}
          {detail.approach && (
            <div className="modal-section">
              <h3>Approach</h3>
              <ul>{detail.approach.map((p, i) => <li key={i}>{p}</li>)}</ul>
            </div>
          )}
          {detail.outcome && (
            <div className="modal-section">
              <h3>Outcome</h3>
              <ul>{detail.outcome.map((p, i) => <li key={i}>{p}</li>)}</ul>
            </div>
          )}

          <div className="modal-actions">
            <a href={detail.links?.github || '#'} className="btn btn-ghost btn-icon">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.64.71 1.03 1.61 1.03 2.71 0 3.84-2.34 4.68-4.57 4.93.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z"/></svg>
              View on GitHub
            </a>
            <a href={detail.links?.demo || '#'} className="btn btn-primary btn-icon">
              View Live Demo
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H8M17 7V16"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [active, setActive] = React.useState(null);
  return (
    <section id="projects">
      <div className="container">
        <div className="section-head-row">
          <div>
            <div className="kicker">04 // Featured Work</div>
            <h2 className="section-title">Selected projects.<br/>Hardware that ships.</h2>
            <p className="section-sub">A slice of recent builds. Click any card for the full case study.</p>
          </div>
          <div className="section-meta">
            <div>VIEWING: <span className="v">6 / 12</span></div>
            <div>FILTER: <span className="v">[all]</span></div>
          </div>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p) => {
            const [cls, label] = STATUS_LABEL[p.status];
            return (
              <article key={p.id} className={"project-card reveal" + (p.feat ? " feat" : "")}
                onClick={() => setActive(p)}
                onKeyDown={(e) => { if (e.key === 'Enter') setActive(p); }}
                tabIndex={0} role="button" aria-label={`Open ${p.title} case study`}>
                <div className="project-thumb">
                  <ProjectThumb kind={p.kind}/>
                  <div className="project-thumb-overlay"></div>
                  <span className={"project-badge " + cls}>
                    <span className="dot"></span>{label.replace('● ', '')}
                  </span>
                  <span className="project-id">{p.id}</span>
                </div>
                <div className="project-body">
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-stack">
                    {p.stack.map(s => <span key={s} className="pill">{s}</span>)}
                  </div>
                  <div className="project-actions">
                    <span className="proj-link primary">
                      Read Case Study
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <ProjectModal project={active} onClose={() => setActive(null)}/>
    </section>
  );
}

// ----- Experience timeline -----
const EXPERIENCE = [
  {
    year: '2024 — 2025',
    title: 'Final-Year Project · IoT Engineer',
    company: '[YOUR_UNIVERSITY] · Electrical & Computer Engineering',
    points: [
      'Designed and built a smart environmental monitoring system as undergraduate thesis project.',
      'Custom ESP32 firmware with MQTT over Wi-Fi, integrated with a Grafana dashboard.',
      'Successfully defended thesis with [HIGH GRADE]; published methodology to GitHub.',
    ],
    stack: ['ESP32', 'MQTT', 'InfluxDB', 'Grafana']
  },
  {
    year: 'Jun — Aug 2024',
    title: 'IoT Engineering Intern',
    company: '[YOUR_INTERNSHIP_COMPANY] · Yogyakarta',
    points: [
      'Assisted senior engineers on a 3-plant industrial-monitoring deployment over Modbus.',
      'Wrote firmware unit tests for STM32 nodes; improved coverage from 22% to 68%.',
      'Documented two internal runbooks for device provisioning and onboarding.',
    ],
    stack: ['STM32', 'Modbus', 'Python', 'Node-RED']
  },
  {
    year: '2023 — 2024',
    title: 'Lab Assistant · Embedded Systems',
    company: '[YOUR_UNIVERSITY] · Electronics Lab',
    points: [
      'Mentored 40+ undergraduate students through ESP32 and Arduino lab modules.',
      'Maintained lab equipment inventory and prepared weekly practicum kits.',
      'Co-authored a beginner LoRaWAN tutorial used as supplementary reading.',
    ],
    stack: ['Arduino', 'ESP32', 'LoRaWAN', 'KiCad']
  },
  {
    year: '2022 — Present',
    title: 'Personal Projects & Hackathons',
    company: 'Independent Builder',
    points: [
      'Self-initiated 12+ IoT projects ranging from smart-home nodes to wearable health trackers.',
      'Participated in three regional hackathons, finalist at one campus-level event.',
      'Active contributor on Hackster.io and Dev.to with project write-ups.',
    ],
    stack: ['ESP32', 'BLE', 'Flutter', 'Firebase']
  },
];

function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <div className="section-head-row">
          <div>
            <div className="kicker">05 // Track Record</div>
            <h2 className="section-title">A timeline of<br/>signals & shipments.</h2>
          </div>
          <div className="section-meta">
            <div>NODES: <span className="v">{EXPERIENCE.length}</span></div>
            <div>SPAN: <span className="v">2022 → 2025</span></div>
          </div>
        </div>

        <div className="timeline">
          {EXPERIENCE.map((e, i) => (
            <div key={i} className="tl-item reveal">
              <div className="tl-node"></div>
              <div className="tl-meta">{e.year}</div>
              <h3 className="tl-title">{e.title}</h3>
              <div className="tl-company">{e.company}</div>
              <ul className="tl-points">
                {e.points.map((p, j) => <li key={j}>{p}</li>)}
              </ul>
              <div className="project-stack">
                {e.stack.map(s => <span key={s} className="pill cyan">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Projects = Projects;
window.Experience = Experience;
