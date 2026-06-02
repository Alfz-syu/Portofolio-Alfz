/* ─── PORTFOLIO v2 — main.js ─── */

// ── Theme ──
const html  = document.documentElement;
const btn   = document.getElementById('theme-toggle');
const KEY   = 'ehp-theme';
html.setAttribute('data-theme', localStorage.getItem(KEY) || 'light');
btn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem(KEY, next);
});

// ── Read progress bar ──
const progressBar = document.getElementById('nav-progress');
window.addEventListener('scroll', () => {
  const max  = document.documentElement.scrollHeight - window.innerHeight;
  const pct  = (window.scrollY / max) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });

// ── Active nav on scroll ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item');

function updateNav() {
  const mid = window.scrollY + window.innerHeight / 3;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const bot = top + sec.offsetHeight;
    const id  = sec.getAttribute('id');
    const lnk = document.querySelector(`.nav-item[href="#${id}"]`);
    if (lnk) {
      lnk.classList.toggle('active', mid >= top && mid < bot);
    }
  });
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Mobile nav ──
const hamburger = document.getElementById('nav-hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Cursor glow (desktop only) ──
const glow = document.getElementById('cursor-glow');
if (window.matchMedia('(pointer: fine)').matches) {
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
function buildContribGrid() {
  const grid = document.getElementById('contrib-grid');
  if (!grid) return;

  const weeks = 26; // ~6 months
  const days  = 7;
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
}
buildContribGrid();

// ── Smooth scroll for all anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── Staggered hero text entrance ──
window.addEventListener('DOMContentLoaded', () => {
  const heroEls = document.querySelectorAll(
    '.hero-status, .hero-name, .hero-rule, .hero-roles, .hero-bio, .hero-ctas, .hero-visual'
  );
  heroEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = `opacity .6s ease ${i * 90}ms, transform .6s ease ${i * 90}ms`;
    requestAnimationFrame(() => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }, 80);
    });
  });
});
