/* =====================================================================
 * Portfolio interaction layer — vanilla JS
 * Modules: cursor, intro, nav, scroll progress, reveal observer, stagger
 *          name, role rotator, counters, project modal, contact form,
 *          back-to-top, smooth scroll, copy email, drawer.
 * ===================================================================== */

(function () {
  'use strict';

  const isMobile = () => window.matchMedia('(max-width: 900px)').matches;
  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // -----------------------------------------------------------------
  // Custom cursor
  // -----------------------------------------------------------------
  function initCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring || isMobile()) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    const onOver = (e) => {
      const t = e.target;
      const hover = t && t.closest && t.closest(
        'a, button, .skill-cat, .project-card, .stat, input, textarea, .cert, .blog-card, .ach, .testimonial, .lang-card'
      );
      ring.classList.toggle('hover', !!hover);
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
  }

  // -----------------------------------------------------------------
  // Intro overlay (modern editorial)
  // -----------------------------------------------------------------
  function initIntro() {
    const intro = document.getElementById('intro-mod');
    if (!intro) return;

    // Skip intro if seen within last 24h
    try {
      const last = parseInt(localStorage.getItem('intro_seen_at') || '0', 10);
      if (Date.now() - last < 24 * 60 * 60 * 1000) {
        intro.remove();
        return;
      }
    } catch (e) {}

    const counterEl = document.getElementById('intro-counter');
    const topLabels = intro.querySelectorAll('.intro-mod-label');
    const bottomCounter = intro.querySelector('.intro-mod-counter');
    const bottomLoc = intro.querySelector('.intro-mod-loc');
    const hairline = intro.querySelector('.intro-mod-hairline');
    const name = intro.querySelector('.intro-mod-name');
    const sub = intro.querySelector('.intro-mod-sub');

    let count = 0;
    const dur = 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      count = Math.floor(eased * 100);
      if (counterEl) {
        counterEl.innerHTML = String(count).padStart(3, '0') +
          '<span class="intro-mod-counter-dim"> / 100</span>';
      }
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    setTimeout(() => {
      topLabels.forEach(l => l.classList.add('on'));
      if (bottomCounter) bottomCounter.classList.add('on');
      if (bottomLoc) bottomLoc.classList.add('on');
      if (hairline) hairline.classList.add('on');
    }, 180);
    setTimeout(() => name && name.classList.add('on'), 700);
    setTimeout(() => sub && sub.classList.add('on'), 1400);
    setTimeout(() => intro.classList.add('gone'), 2100);
    setTimeout(() => {
      intro.remove();
      try { localStorage.setItem('intro_seen_at', String(Date.now())); } catch (e) {}
    }, 2700);
  }

  // -----------------------------------------------------------------
  // Navigation: scroll style, active link, mobile drawer
  // -----------------------------------------------------------------
  function initNav() {
    const nav = document.getElementById('nav');
    const burger = document.getElementById('nav-burger');
    const drawer = document.getElementById('nav-drawer');
    const drawerClose = document.getElementById('nav-drawer-close');
    if (!nav) return;

    const navLinks = nav.querySelectorAll('a[data-nav]');
    const drawerLinks = drawer ? drawer.querySelectorAll('a[data-nav]') : [];

    const setActive = (id) => {
      navLinks.forEach(a => a.classList.toggle('is-active', a.dataset.nav === id));
      drawerLinks.forEach(a => a.classList.toggle('is-active', a.dataset.nav === id));
    };

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 24);
    });

    const sections = document.querySelectorAll('section[id]');
    if (sections.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
      sections.forEach(s => io.observe(s));
    }

    // Mobile drawer
    if (burger && drawer) {
      const open = () => {
        drawer.classList.add('open');
        burger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      };
      const close = () => {
        drawer.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      };
      burger.addEventListener('click', open);
      if (drawerClose) drawerClose.addEventListener('click', close);
      drawer.addEventListener('click', (e) => {
        if (e.target === drawer) close();
      });
      drawerLinks.forEach(a => a.addEventListener('click', close));
    }
  }

  // -----------------------------------------------------------------
  // Scroll progress bar in nav
  // -----------------------------------------------------------------
  function initScrollProgress() {
    const bar = document.getElementById('nav-progress');
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = p + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // -----------------------------------------------------------------
  // Reveal-on-scroll
  // -----------------------------------------------------------------
  function initReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;
    if (prefersReducedMotion()) {
      targets.forEach(t => t.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(t => io.observe(t));
  }

  // -----------------------------------------------------------------
  // Stagger name (char-by-char mask)
  // -----------------------------------------------------------------
  function initStaggerName() {
    document.querySelectorAll('[data-stagger]').forEach(el => {
      const text = el.dataset.stagger;
      const frag = document.createDocumentFragment();
      [...text].forEach((ch, i) => {
        const mask = document.createElement('span');
        mask.className = 'stagger-char-mask';
        const c = document.createElement('span');
        c.className = 'stagger-char';
        c.style.animationDelay = (0.05 + i * 0.04) + 's';
        c.textContent = ch === ' ' ? ' ' : ch;
        mask.appendChild(c);
        frag.appendChild(mask);
      });
      el.appendChild(frag);
    });
  }

  // -----------------------------------------------------------------
  // Role rotator (vertical split-flap)
  // -----------------------------------------------------------------
  function initRoleRotator() {
    const track = document.getElementById('role-rotator-track');
    if (!track) return;
    const items = track.children.length - 1; // last is a duplicate of first
    let i = 0;
    setInterval(() => {
      i = (i + 1) % items;
      track.style.transform = `translateY(-${i * 100}%)`;
    }, 2800);
  }

  // -----------------------------------------------------------------
  // Number counters (about stats)
  // -----------------------------------------------------------------
  function initCounters() {
    const els = document.querySelectorAll('[data-counter]');
    if (!els.length) return;
    const animate = (el) => {
      const target = parseInt(el.dataset.counter, 10);
      const dur = 1400;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animate(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    els.forEach(el => io.observe(el));
  }

  // -----------------------------------------------------------------
  // Smooth scroll for hash links
  // -----------------------------------------------------------------
  function initSmoothScroll() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
      history.replaceState(null, '', '#' + id);
    });
  }

  // -----------------------------------------------------------------
  // Back to top
  // -----------------------------------------------------------------
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    const onScroll = () => {
      const show = window.scrollY > 800;
      btn.hidden = !show;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    onScroll();
  }

  // -----------------------------------------------------------------
  // Project modal
  // -----------------------------------------------------------------
  function initProjectModal() {
    const cards = document.querySelectorAll('.project-card[data-project]');
    if (!cards.length) return;
    const dataEl = document.getElementById('projects-data');
    const i18nEl = document.getElementById('projects-i18n');
    const baseEl = document.getElementById('projects-static-base');
    let projects = [];
    let labels = {
      role: 'Role', duration: 'Duration', stack: 'Stack',
      challenge: 'Challenge', approach: 'Approach', outcome: 'Outcome',
      photos: 'Field Photos', photo_close: 'Close photo',
      github: 'View on GitHub', demo: 'View Live Demo'
    };
    let staticBase = '/static/images/projects/';
    try { projects = JSON.parse(dataEl.textContent); } catch (e) {}
    try { labels = Object.assign(labels, JSON.parse(i18nEl.textContent)); } catch (e) {}
    try { staticBase = JSON.parse(baseEl.textContent); } catch (e) {}
    const tpl = document.getElementById('project-modal-tpl');
    if (!tpl) return;

    let current = null;

    const close = () => {
      if (!current) return;
      current.remove();
      current = null;
      document.body.style.overflow = '';
    };

    const open = (id) => {
      const project = projects.find(p => p.id === id);
      if (!project) return;
      const detail = project.detail || {};

      const node = tpl.content.firstElementChild.cloneNode(true);
      const hero = node.querySelector('[data-hero]');
      const body = node.querySelector('[data-body]');

      // Move pre-rendered hero SVG into the modal
      const heroSrc = document.querySelector(`[data-project-hero="${id}"]`);
      if (heroSrc) {
        const clone = heroSrc.cloneNode(true);
        clone.removeAttribute('data-project-hero');
        clone.style.display = '';
        // Strip wrapper styles
        while (clone.firstChild) hero.appendChild(clone.firstChild);
      }

      const escapeHTML = (s) => String(s).replace(/[&<>"']/g,
        c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);

      const stackHTML = (project.stack || [])
        .map(s => `<span class="pill">${escapeHTML(s)}</span>`).join('');
      const approachHTML = (detail.approach || [])
        .map(p => `<li>${escapeHTML(p)}</li>`).join('');
      const outcomeHTML = (detail.outcome || [])
        .map(p => `<li>${escapeHTML(p)}</li>`).join('');

      const photos = Array.isArray(project.photos) ? project.photos : [];
      const folder = project.photo_folder || '';
      const photoBase = staticBase + (folder ? folder + '/' : '');
      const galleryHTML = photos.length ? photos.map((p, i) => {
        const url = photoBase + p.file;
        return `
          <figure class="modal-gallery-item" data-fullsize="${url}" data-index="${i}" tabindex="0" role="button" aria-label="${escapeHTML(p.caption || ('Photo ' + (i+1)))}">
            <img src="${url}" alt="${escapeHTML(p.caption || '')}" loading="lazy"/>
            ${p.caption ? `<figcaption>${escapeHTML(p.caption)}</figcaption>` : ''}
          </figure>`;
      }).join('') : '';

      const links = detail.links || {};
      const isReal = (u) => u && u !== '#';
      const githubBtn = isReal(links.github) ? `
          <a href="${links.github}" class="btn btn-ghost btn-icon" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.64.71 1.03 1.61 1.03 2.71 0 3.84-2.34 4.68-4.57 4.93.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z"/></svg>
            ${escapeHTML(labels.github)}
          </a>` : '';
      const demoBtn = isReal(links.demo) ? `
          <a href="${links.demo}" class="btn btn-primary btn-icon" target="_blank" rel="noopener">
            ${escapeHTML(labels.demo)}
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H8M17 7V16"/></svg>
          </a>` : '';
      const actionsHTML = (githubBtn || demoBtn)
        ? `<div class="modal-actions">${githubBtn}${demoBtn}</div>` : '';

      body.innerHTML = `
        <h2 class="modal-title" id="modal-title">${escapeHTML(project.title)}</h2>
        <p class="modal-desc">${escapeHTML(project.desc)}</p>

        <div class="modal-meta-row">
          <div class="modal-meta-cell">
            <div class="modal-meta-label">${escapeHTML(labels.role)}</div>
            <div class="modal-meta-val">${escapeHTML(detail.role || '—')}</div>
          </div>
          <div class="modal-meta-cell">
            <div class="modal-meta-label">${escapeHTML(labels.duration)}</div>
            <div class="modal-meta-val">${escapeHTML(detail.duration || '—')}</div>
          </div>
          <div class="modal-meta-cell">
            <div class="modal-meta-label">${escapeHTML(labels.stack)}</div>
            <div class="modal-meta-val modal-stack-inline">${stackHTML}</div>
          </div>
        </div>

        ${detail.challenge ? `
          <div class="modal-section">
            <h3>${escapeHTML(labels.challenge)}</h3>
            <p>${escapeHTML(detail.challenge)}</p>
          </div>` : ''}

        ${approachHTML ? `
          <div class="modal-section">
            <h3>${escapeHTML(labels.approach)}</h3>
            <ul>${approachHTML}</ul>
          </div>` : ''}

        ${outcomeHTML ? `
          <div class="modal-section">
            <h3>${escapeHTML(labels.outcome)}</h3>
            <ul>${outcomeHTML}</ul>
          </div>` : ''}

        ${galleryHTML ? `
          <div class="modal-section">
            <h3>${escapeHTML(labels.photos)}</h3>
            <div class="modal-gallery">${galleryHTML}</div>
          </div>` : ''}

        ${actionsHTML}
      `;

      node.querySelector('[data-close]').addEventListener('click', close);
      node.addEventListener('click', (e) => {
        if (e.target === node) close();
      });

      // Photo lightbox: clicking a gallery item opens full-screen overlay
      node.querySelectorAll('.modal-gallery-item').forEach((item) => {
        const openLightbox = () => {
          const url = item.getAttribute('data-fullsize');
          const cap = item.querySelector('figcaption');
          const capText = cap ? cap.textContent : '';
          const lb = document.createElement('div');
          lb.className = 'photo-lightbox';
          lb.setAttribute('role', 'dialog');
          lb.setAttribute('aria-modal', 'true');
          lb.innerHTML = `
            <button class="photo-lightbox-close" aria-label="${escapeHTML(labels.photo_close)}">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <figure class="photo-lightbox-figure">
              <img src="${url}" alt="${escapeHTML(capText)}"/>
              ${capText ? `<figcaption>${escapeHTML(capText)}</figcaption>` : ''}
            </figure>
          `;
          const closeLb = () => {
            lb.removeEventListener('click', onBackdrop);
            document.removeEventListener('keydown', onKey);
            lb.remove();
          };
          const onBackdrop = (e) => {
            if (e.target === lb || e.target.closest('.photo-lightbox-close')) closeLb();
          };
          const onKey = (e) => { if (e.key === 'Escape') closeLb(); };
          lb.addEventListener('click', onBackdrop);
          document.addEventListener('keydown', onKey);
          document.body.appendChild(lb);
        };
        item.addEventListener('click', openLightbox);
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(); }
        });
      });

      document.body.style.overflow = 'hidden';
      document.body.appendChild(node);
      current = node;
    };

    cards.forEach(card => {
      const id = card.dataset.project;
      card.addEventListener('click', () => open(id));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(id);
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  // -----------------------------------------------------------------
  // Contact form (frontend only — simulates a successful send)
  // -----------------------------------------------------------------
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!form) return;

    const showToast = (msg) => {
      if (!toast) return;
      if (toastMsg) toastMsg.textContent = msg;
      toast.hidden = false;
      clearTimeout(showToast._t);
      showToast._t = setTimeout(() => { toast.hidden = true; }, 3500);
    };

    const msgRequired = form.dataset.msgRequired || 'Please complete the required fields.';
    const msgSuccess = form.dataset.msgSuccess || 'Message sent.';
    const msgError = form.dataset.msgError || 'Could not send. Please email me directly.';
    const labelSend = form.dataset.labelSend || 'Send Message';
    const labelSending = form.dataset.labelSending || 'Sending…';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const subject = (data.get('subject') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();
      if (!name || !email || !message) {
        showToast(msgRequired);
        return;
      }
      const btn = document.getElementById('form-submit');
      const label = btn && btn.querySelector('.btn-label');
      if (btn) btn.disabled = true;
      if (label) label.textContent = labelSending;
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name, email, subject, message,
            website: (data.get('website') || '').toString()
          })
        });
        const out = await res.json().catch(() => ({}));
        if (res.ok && out.ok) {
          showToast(msgSuccess);
          form.reset();
        } else {
          showToast(msgError);
        }
      } catch (err) {
        showToast(msgError);
      } finally {
        if (btn) btn.disabled = false;
        if (label) label.textContent = labelSend;
      }
    });

    // Copy email button
    const copyBtn = document.getElementById('copy-email');
    const emailEl = document.getElementById('contact-email');
    if (copyBtn && emailEl) {
      const labelCopy = copyBtn.dataset.labelCopy || 'copy';
      const labelCopied = copyBtn.dataset.labelCopied || '✓ copied';
      const labelFailed = copyBtn.dataset.labelFailed || '× failed';
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(emailEl.textContent.trim());
          copyBtn.textContent = labelCopied;
        } catch (e) {
          copyBtn.textContent = labelFailed;
        }
        setTimeout(() => { copyBtn.textContent = labelCopy; }, 1600);
      });
    }
  }

  // -----------------------------------------------------------------
  // Boot
  // -----------------------------------------------------------------
  function boot() {
    initStaggerName();   // Run before reveal so chars render
    initIntro();
    initCursor();
    initNav();
    initScrollProgress();
    initReveal();
    initRoleRotator();
    initCounters();
    initSmoothScroll();
    initBackToTop();
    initProjectModal();
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
