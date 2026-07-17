// Main app + nav + reveal observer
const { useState: useStateApp, useEffect: useEffectApp } = React;

function Nav() {
  const [scrolled, setScrolled] = useStateApp(false);
  const [active, setActive] = useStateApp('home');
  const [open, setOpen] = useStateApp(false);

  useEffectApp(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);

    // Active section observer
    const sections = document.querySelectorAll('section[id]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    sections.forEach(s => io.observe(s));

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  // Lock body scroll when drawer open
  useEffectApp(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const links = [
    ['about', '01', 'about'],
    ['education', '02', 'education'],
    ['skills', '03', 'skills'],
    ['projects', '04', 'projects'],
    ['experience', '05', 'experience'],
    ['contact', '09', 'contact'],
  ];

  return (
    <React.Fragment>
      <nav className={"nav" + (scrolled ? " scrolled" : "")}>
        <div className="container nav-inner">
          <a href="#home" className="brand" aria-label="Home">
            <span className="brand-glyph">⌬</span>
            <span>[YOUR_NAME].iot</span>
          </a>
          <div className="nav-links">
            {links.map(([id, num, label]) => (
              <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''}>
                <span className="num">{num}.</span>{label}
              </a>
            ))}
          </div>
          <div className="nav-right">
            <a href="#contact" className="nav-cta">hire_me()</a>
            <button className="nav-burger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
        <div className="nav-progress" style={{ width: `var(--scroll-progress, 0%)` }}></div>
      </nav>

      <div className={"nav-drawer " + (open ? "open" : "")} onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
        <div className="nav-drawer-panel" role="dialog" aria-label="Navigation">
          <div className="nav-drawer-head">
            <span className="brand-glyph">⌬</span>
            <button className="nav-drawer-close" aria-label="Close menu" onClick={() => setOpen(false)}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <nav className="nav-drawer-links">
            {links.map(([id, num, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className={active === id ? 'is-active' : ''}>
                <span className="num">{num}</span>
                <span className="lbl">{label}</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
            ))}
          </nav>
          <div className="nav-drawer-foot">
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Get in Touch</a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function BackToTop() {
  const [show, setShow] = useStateApp(false);
  useEffectApp(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show) return null;
  return (
    <button className="back-to-top" aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </button>
  );
}

function App() {
  const [booted, setBooted] = useStateApp(() => {
    // Skip intro if user has seen it within the last 24h
    try {
      const last = parseInt(localStorage.getItem('intro_seen_at') || '0', 10);
      if (Date.now() - last < 24 * 60 * 60 * 1000) return true;
    } catch (e) {}
    return false;
  });

  useEffectApp(() => {
    // Reveal observer
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // Scroll progress
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? (window.scrollY / max) * 100 : 0;
      document.documentElement.style.setProperty('--scroll-progress', p + '%');
    };
    window.addEventListener('scroll', onScroll);
    onScroll();

    // Smooth scroll for hash links
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (a) {
        const id = a.getAttribute('href').slice(1);
        if (!id) return;
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
          history.replaceState(null, '', '#' + id);
        }
      }
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('scroll', onScroll);
    };
  }, [booted]);

  const onIntroDone = () => {
    try { localStorage.setItem('intro_seen_at', String(Date.now())); } catch (e) {}
    setBooted(true);
  };

  return (
    <React.Fragment>
      <a href="#main" className="skip-link">Skip to content</a>
      <CustomCursor/>
      {!booted && <PCBIntro onDone={onIntroDone}/>}
      <Nav/>
      <main id="main">
        <Hero/>
        <About/>
        <Education/>
        <Skills/>
        <Projects/>
        <Experience/>
        <CertsAchievements/>
        <Blog/>
        <Testimonials/>
        <Contact/>
      </main>
      <Footer/>
      <BackToTop/>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
