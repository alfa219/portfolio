// Education + Coursework section (fresh-grad essentials)

const COURSEWORK = [
  { code: 'IOT401', name: 'Internet of Things' },
  { code: 'EMB301', name: 'Embedded Systems Design' },
  { code: 'MCU201', name: 'Microprocessor Architecture' },
  { code: 'NET302', name: 'Computer Networks' },
  { code: 'SIG201', name: 'Signals & Systems' },
  { code: 'ELE201', name: 'Digital Electronics' },
  { code: 'PCB301', name: 'PCB Design & Fabrication' },
  { code: 'WCM402', name: 'Wireless Communication' },
  { code: 'CTR301', name: 'Control Systems' },
  { code: 'DSP301', name: 'Digital Signal Processing' },
  { code: 'SWE201', name: 'Software Engineering' },
  { code: 'DAT302', name: 'Database Systems' },
];

const ORGS = [
  {
    period: '2023 — 2024',
    role: 'Hardware Division Lead',
    org: 'IoT Study Club · [YOUR_UNIVERSITY]',
    desc: 'Coordinated weekly workshops for 25+ members on ESP32 and Arduino fundamentals. Organized two internal hackathons.',
  },
  {
    period: '2022 — 2023',
    role: 'Member · Engineering Student Association',
    org: 'HMJ Teknik Elektro · [YOUR_UNIVERSITY]',
    desc: 'Active in the academic division. Co-organized a campus-wide tech competition with 60+ participants.',
  },
  {
    period: '2022 — 2023',
    role: 'Volunteer · STEM Outreach Program',
    org: 'Faculty of Engineering · [YOUR_UNIVERSITY]',
    desc: 'Taught basic electronics and microcontroller programming to 40+ high-school students across four sessions.',
  },
];

function Education() {
  return (
    <section id="education">
      <div className="container">
        <div className="section-head-row">
          <div>
            <div className="kicker">02 // Education</div>
            <h2 className="section-title">Formal training<br/>&amp; foundations.</h2>
          </div>
          <div className="section-meta">
            <div>DEGREE: <span className="v">S1</span></div>
            <div>FIELD: <span className="v">EE / CE</span></div>
          </div>
        </div>

        <div className="edu-grid">
          {/* Main degree card */}
          <div className="edu-card edu-degree reveal">
            <div className="edu-card-head">
              <div className="edu-badge">B.ENG</div>
              <div className="edu-year">2021 — 2025</div>
            </div>
            <h3 className="edu-degree-title">Bachelor of Engineering</h3>
            <div className="edu-field">Electrical &amp; Computer Engineering</div>
            <div className="edu-uni">[YOUR_UNIVERSITY]</div>

            <div className="edu-meta-row">
              <div className="edu-meta">
                <div className="edu-meta-label">GPA</div>
                <div className="edu-meta-value">[X.XX] <span className="edu-meta-dim">/ 4.00</span></div>
              </div>
              <div className="edu-meta">
                <div className="edu-meta-label">Concentration</div>
                <div className="edu-meta-value">Internet of Things</div>
              </div>
              <div className="edu-meta">
                <div className="edu-meta-label">Status</div>
                <div className="edu-meta-value">Graduated <span className="edu-meta-dim">[CUM LAUDE]</span></div>
              </div>
            </div>

            <div className="edu-thesis">
              <div className="edu-thesis-label">FINAL-YEAR THESIS</div>
              <div className="edu-thesis-title">"[Thesis Title — e.g. Design and Implementation of an ESP32-Based Smart Environmental Monitoring System with MQTT Cloud Integration]"</div>
              <div className="edu-thesis-meta">Advisor: Dr. [SUPERVISOR_NAME] · Grade: [A]</div>
            </div>
          </div>

          {/* Coursework */}
          <div className="edu-card edu-courses reveal">
            <div className="edu-courses-head">
              <h4 className="edu-courses-title">Relevant Coursework</h4>
              <span className="edu-courses-count">{COURSEWORK.length} subjects</span>
            </div>
            <div className="course-list">
              {COURSEWORK.map(c => (
                <div className="course-row" key={c.code}>
                  <span className="course-code">{c.code}</span>
                  <span className="course-name">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Organizational Experience */}
        <div className="org-block">
          <div className="org-head">
            <h3 className="org-title">Organizational &amp; Volunteer Experience</h3>
            <span className="org-tag">EXTRACURRICULAR</span>
          </div>
          <div className="org-grid">
            {ORGS.map(o => (
              <div className="org-card reveal" key={o.role}>
                <div className="org-period">{o.period}</div>
                <h4 className="org-role">{o.role}</h4>
                <div className="org-name">{o.org}</div>
                <p className="org-desc">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.Education = Education;
