// About + animated stats counter
const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

function Counter({ to, suffix }) {
  const [val, setVal] = useStateA(0);
  const ref = useRefA(null);
  const started = useRefA(false);

  useEffectA(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const dur = 1400;
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(eased * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);

  return <span ref={ref}>{val}{suffix && <span className="plus">{suffix}</span>}</span>;
}

function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="section-head-row">
          <div>
            <div className="kicker">01 // About</div>
            <h2 className="section-title">Engineer wired<br/>for connected systems.</h2>
          </div>
          <div className="section-meta">
            <div>FILE: <span className="v">about.md</span></div>
            <div>LAST_UPDATED: 18.05.2026</div>
          </div>
        </div>

        <div className="about-grid">
          <div>
            <div className="avatar-frame">
              <div className="avatar-placeholder">
                <div className="ph-glyph">◐</div>
                <div>[YOUR_PHOTO]</div>
                <div style={{ marginTop: 4 }}>1:1 · 800×800</div>
              </div>
            </div>
            <div className="avatar-meta">
              <span>ID://0xA1B2C3</span>
              <span className="green">● ONLINE</span>
            </div>
          </div>

          <div className="bio">
            <p className="lead">
              I&rsquo;m <b>[YOUR_NAME]</b>, a recent <b>Bachelor of Electrical &amp; Computer
              Engineering</b> graduate from [YOUR_UNIVERSITY], with a concentration in
              Internet of Things and Embedded Systems.
            </p>
            <p>
              Across coursework, my final-year project, and personal builds, I have
              worked on the full IoT signal path: from sensor and PCB to MQTT broker
              and dashboard. My strongest skills are in embedded firmware (C/C++,
              MicroPython) and IoT communication protocols.
            </p>
            <p>
              I am actively looking for my <b>first full-time role</b> as a Junior IoT
              or Embedded Engineer. I learn quickly, document my work, and approach
              every project with rigor. Open to internship, junior, or freelance
              opportunities anywhere in Indonesia.
            </p>

            <div className="stats">
              <div className="stat reveal">
                <div className="stat-num"><Counter to={2025} suffix=""/></div>
                <div className="stat-label">Year Graduated</div>
              </div>
              <div className="stat reveal">
                <div className="stat-num"><Counter to={12} suffix="+"/></div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat reveal">
                <div className="stat-num"><Counter to={3} suffix=""/></div>
                <div className="stat-label">Hackathons Joined</div>
              </div>
              <div className="stat reveal">
                <div className="stat-num"><Counter to={30} suffix="+"/></div>
                <div className="stat-label">Technologies Used</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.About = About;
