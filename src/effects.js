/* ─── PORTFOLIO — imperative site effects (ported from main.js) ───
   Called once after the React tree mounts (see App.jsx).
   Guarded so it never initialises twice (StrictMode / re-mounts). */

export function initSiteEffects() {
  if (window.__siteEffectsInit) return;
  window.__siteEffectsInit = true;

  // ── Theme ──
  const html = document.documentElement;
  const btn  = document.getElementById('theme-toggle');
  const KEY  = 'ehp-theme';
  html.setAttribute('data-theme', localStorage.getItem(KEY) || 'light');
  if (btn) {
    btn.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', next);
      localStorage.setItem(KEY, next);
    });
  }

  // ── Read progress bar ──
  const progressBar = document.getElementById('nav-progress');
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (window.scrollY / max) * 100;
    if (progressBar) progressBar.style.width = pct + '%';
  }, { passive: true });

  // ── Active nav on scroll ──
  const sections = document.querySelectorAll('section[id]');
  function updateNav() {
    const mid = window.scrollY + window.innerHeight / 3;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const bot = top + sec.offsetHeight;
      const id  = sec.getAttribute('id');
      const lnk = document.querySelector(`.nav-item[href="#${id}"]`);
      if (lnk) lnk.classList.toggle('active', mid >= top && mid < bot);
    });
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ── Mobile nav ──
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ── Cursor glow (desktop only) ──
  const glow = document.getElementById('cursor-glow');
  if (glow && window.matchMedia('(pointer: fine)').matches) {
    glow.style.opacity = '1';
    window.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    }, { passive: true });
  }

  // ── Scroll reveal ──
  const revealEls = document.querySelectorAll(
    '.pcard, .psm, .acard, .cert-card, .tline-item, .sbar-item, .stag'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), i * 55);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => revealObserver.observe(el));

  // ── Skill bars animate on view ──
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.sbar-fill').forEach(b => barObserver.observe(b));

  // ── GitHub contribution grid (decorative) ──
  (function buildContribGrid() {
    const grid = document.getElementById('contrib-grid');
    if (!grid) return;
    const weeks = 26, days = 7;
    const levels = [0, 0, 0, 1, 1, 2, 2, 3, 4];
    for (let w = 0; w < weeks; w++) {
      const col = document.createElement('div');
      col.className = 'cweek';
      for (let d = 0; d < days; d++) {
        const day = document.createElement('div');
        const lvl = levels[Math.floor(Math.random() * levels.length)];
        day.className = `cday l${lvl}`;
        col.appendChild(day);
      }
      grid.appendChild(col);
    }
  })();

  // ── Smooth scroll for all anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ── Staggered hero text entrance ──
  const heroEls = document.querySelectorAll(
    '.hero-status, .hero-name, .hero-rule, .hero-roles, .hero-ctas, .hero-visual'
  );
  heroEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = `opacity .6s ease ${i * 90}ms, transform .6s ease ${i * 90}ms`;
    requestAnimationFrame(() => {
      setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'none'; }, 80);
    });
  });

  /* ═══ REACT-BITS STYLE EFFECTS (vanilla recreations) ═══ */
  const reduce  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePtr = window.matchMedia('(pointer: fine)').matches;
  const root = document.documentElement;
  const cssVar = (n) => getComputedStyle(root).getPropertyValue(n).trim();
  const hexToRgb = (hex) => {
    const h = hex.replace('#', '');
    const v = h.length === 3 ? h.split('').map(c => c + c).join('') : h.padEnd(6, '0');
    return { r: parseInt(v.slice(0, 2), 16), g: parseInt(v.slice(2, 4), 16), b: parseInt(v.slice(4, 6), 16) };
  };
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  // 1. Split / Blur text reveal on section titles
  document.querySelectorAll('.sec-title').forEach(title => {
    const parts = title.textContent.split(/(\s+)/);
    title.textContent = '';
    let i = 0;
    parts.forEach(part => {
      if (part.trim() === '') { title.appendChild(document.createTextNode(part)); return; }
      const span = document.createElement('span');
      span.className = 'rb-word';
      span.textContent = part;
      span.style.setProperty('--rb-d', (i * 70) + 'ms');
      title.appendChild(span);
      i++;
    });
  });
  const titleObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.rb-word').forEach(w => w.classList.add('in'));
        titleObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.sec-title').forEach(t => titleObs.observe(t));

  // 2. CountUp on hero stats
  function animateCount(el) {
    const m = el.textContent.trim().match(/(\d+)(.*)/);
    if (!m) return;
    const target = parseInt(m[1], 10);
    const suffix = m[2] || '';
    if (reduce) { el.textContent = target + suffix; return; }
    const dur = 1100, start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCount(e.target); countObs.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.stat-n').forEach(el => countObs.observe(el));

  // 3. Spotlight cards
  document.querySelectorAll('.pcard, .psm, .acard, .cert-card').forEach(card => {
    card.classList.add('rb-spot');
    const g = document.createElement('div');
    g.className = 'rb-glow';
    card.insertBefore(g, card.firstChild);
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  });

  // 4. Magnetic buttons
  if (!reduce && finePtr) {
    const STR = 0.35;
    document.querySelectorAll('.cta-primary, .cta-ghost').forEach(b => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        b.style.transform = `translate(${x * STR}px, ${y * STR}px)`;
      }, { passive: true });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
  }

  if (reduce) return;

  // 5. Hero particles
  const hero = document.querySelector('.hero');
  if (hero) {
    const cv = document.createElement('canvas');
    cv.className = 'rb-particles';
    hero.insertBefore(cv, hero.firstChild);
    const ctx = cv.getContext('2d');
    let w = 0, h = 0;
    let color = cssVar('--br-2') || '#C4956A';
    const N = 46, LINK = 120 * dpr, parts = [];
    function resize() {
      const r = hero.getBoundingClientRect();
      w = cv.width = r.width * dpr; h = cv.height = r.height * dpr;
      cv.style.width = r.width + 'px'; cv.style.height = r.height + 'px';
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });
    for (let i = 0; i < N; i++) {
      parts.push({
        x: Math.random() * w, y: Math.random() * h,
        r: (Math.random() * 1.5 + 0.6) * dpr,
        vx: (Math.random() - 0.5) * 0.25 * dpr,
        vy: (Math.random() - 0.5) * 0.25 * dpr,
        a: Math.random() * 0.45 + 0.2
      });
    }
    new MutationObserver(() => { color = cssVar('--br-2') || color; })
      .observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    (function draw() {
      ctx.clearRect(0, 0, w, h);
      const c = hexToRgb(color);
      for (let i = 0; i < N; i++) {
        const p = parts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;
        for (let j = i + 1; j < N; j++) {
          const q = parts[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${0.10 * (1 - d / LINK)})`;
            ctx.lineWidth = dpr;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${p.a})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(draw);
    })();
  }

  // 6. Click spark
  const sc = document.createElement('canvas');
  sc.className = 'rb-sparks';
  document.body.appendChild(sc);
  const sctx = sc.getContext('2d');
  let sw = 0, sh = 0;
  function sResize() {
    sw = sc.width = window.innerWidth * dpr; sh = sc.height = window.innerHeight * dpr;
    sc.style.width = window.innerWidth + 'px'; sc.style.height = window.innerHeight + 'px';
  }
  sResize();
  window.addEventListener('resize', sResize, { passive: true });
  let sparks = [];
  window.addEventListener('pointerdown', (e) => {
    const sx = e.clientX * dpr, sy = e.clientY * dpr;
    const col = cssVar('--br') || '#8B5E3C';
    const n = 10;
    for (let i = 0; i < n; i++) {
      const ang = (Math.PI * 2 / n) * i + Math.random() * 0.4;
      const sp = (Math.random() * 3 + 3) * dpr;
      sparks.push({ x: sx, y: sy, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, life: 1, col });
    }
  }, { passive: true });
  (function sDraw() {
    sctx.clearRect(0, 0, sw, sh);
    sparks = sparks.filter(s => s.life > 0);
    for (const s of sparks) {
      s.x += s.vx; s.y += s.vy; s.vx *= 0.92; s.vy *= 0.92; s.life -= 0.035;
      const c = hexToRgb(s.col);
      sctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${Math.max(s.life, 0)})`;
      sctx.lineWidth = 2 * dpr;
      sctx.beginPath(); sctx.moveTo(s.x, s.y); sctx.lineTo(s.x - s.vx * 2, s.y - s.vy * 2); sctx.stroke();
    }
    requestAnimationFrame(sDraw);
  })();
}
