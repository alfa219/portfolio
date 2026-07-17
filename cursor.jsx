// Custom cursor + unique signal-acquisition intro
const { useState, useEffect, useRef } = React;

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let rafId;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
    };
    const onOver = (e) => {
      const t = e.target;
      if (t && t.closest && t.closest('a, button, .skill-cat, .project-card, .stat, input, textarea, .cert, .blog-card, .ach, .testimonial, .lang-card')) {
        setHover(true);
      } else {
        setHover(false);
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className={"cursor-ring" + (hover ? " hover" : "")} ref={ringRef}></div>
    </React.Fragment>
  );
}

// Modern editorial intro: hairline reveal + character mask + counter
function PCBIntro({ onDone }) {
  const [phase, setPhase] = useState(0);
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 1400);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const ts = [];
    ts.push(setTimeout(() => setPhase(1), 180));
    ts.push(setTimeout(() => setPhase(2), 700));
    ts.push(setTimeout(() => setPhase(3), 1400));
    ts.push(setTimeout(() => setGone(true), 2100));
    ts.push(setTimeout(() => onDone && onDone(), 2700));
    return () => { cancelAnimationFrame(raf); ts.forEach(clearTimeout); };
  }, []);

  return (
    <div className={"intro-mod " + (gone ? "gone" : "")}>
      <div className="intro-mod-top">
        <span className={"intro-mod-label" + (phase >= 1 ? " on" : "")}>PORTFOLIO &mdash; 2026</span>
        <span className={"intro-mod-label" + (phase >= 1 ? " on" : "")}>IOT &middot; EMBEDDED &middot; CLOUD</span>
      </div>

      <div className="intro-mod-center">
        <div className={"intro-mod-hairline" + (phase >= 1 ? " on" : "")}></div>
        <div className="intro-mod-mask">
          <h1 className={"intro-mod-name" + (phase >= 2 ? " on" : "")}>[YOUR_NAME]</h1>
        </div>
        <div className={"intro-mod-sub" + (phase >= 3 ? " on" : "")}>
          Building the bridge between hardware and the cloud.
        </div>
      </div>

      <div className="intro-mod-bottom">
        <span className={"intro-mod-counter" + (phase >= 1 ? " on" : "")}>
          {String(count).padStart(3, '0')}<span className="intro-mod-counter-dim"> / 100</span>
        </span>
        <span className={"intro-mod-loc" + (phase >= 1 ? " on" : "")}>WATES &middot; ID &middot; GMT+7</span>
      </div>
    </div>
  );
}

window.CustomCursor = CustomCursor;
window.PCBIntro = PCBIntro;
