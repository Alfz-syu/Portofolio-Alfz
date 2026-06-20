/* =====================================================================
   script.js — Portofolio Ibni Atha Fauzi
   Vanilla JS. Berisi: i18n (ID/EN), data konten, render section,
   dan port efek ReactBits (BlurText, Magnet, SpotlightCard, ClickSpark,
   Aurora, HeroParticles, ProfileCard tilt).
   ===================================================================== */
'use strict';

/* ── I18N DICTIONARY (embedded; tanpa fetch agar jalan dari file://) ── */
const I18N = {
  id: {
    nav: { profil: 'Profil', skill: 'Skill', proyek: 'Proyek', pendidikan: 'Pendidikan', aktivitas: 'Kontribusi', kontak: 'Kontak' },
    hero: {
      status: 'Available for opportunities', chip: 'Open to Work', cta_projects: 'Lihat Proyek',
      roles: ['Information Systems Student', 'Web Developer', 'Vibe Coder'],
      bio: 'Mahasiswa Teknik Rekayasa Perangkat Lunak yang membangun solusi digital dari ide ke kode. Spesialis pengembangan web berbasis PHP & MySQL — dari sistem ritel hingga manajemen gudang. Tujuan: menjadi software engineer yang membuat produk yang benar-benar dipakai orang.',
      stats: [ { n: '2+', l: 'Tahun belajar web dev' }, { n: '5+', l: 'Proyek selesai' }, { n: '3+', l: 'Tech stack dikuasai' } ],
    },
    about: {
      title: 'Profil',
      lead: 'Halo — saya Ibni, mahasiswa Teknik Rekayasa Perangkat Lunak yang senang mengubah masalah nyata menjadi aplikasi yang benar-benar dipakai.',
      p1: 'Saya mulai dari penasaran dengan cara kerja website, lalu jatuh cinta pada proses membangunnya — dari merancang basis data, menulis logika back-end PHP, sampai merapikan tampilan. Beberapa proyek saya lahir dari kebutuhan nyata, seperti sistem kasir ritel dan manajemen gudang.',
      p2: 'Saya percaya konsistensi mengalahkan kecepatan: lebih baik menyelesaikan satu proyek dengan rapi daripada memulai sepuluh yang terbengkalai. Sekarang saya sedang memperdalam JavaScript modern dan arsitektur aplikasi yang lebih bersih.',
      s1: 'Mulai belajar coding', s2: 'Proyek selesai', s3: 'Sertifikasi',
      quote_label: '// fun fact', quote: 'Debugging paling produktif saya sering terjadi saat menyeduh kopi.',
    },
    skills: { title: 'Skill & Teknologi', sub: 'Kemampuan saat ini :', cat_language: 'Bahasa Pemrograman', cat_framework: 'Framework', cat_tool: 'Tools' },
    filter: { all: 'Semua', projek: 'Projek', latihan: 'Latihan' },
    projects: {
      title: 'Proyek', sub: 'Kerja nyata — dari kelas ke produksi',
      type_mandiri: 'Proyek Mandiri', type_latihan: 'Latihan', type_akademik: 'Akademik',
      link_repo: 'Repo', link_demo: 'Live Demo', link_doc: 'Dokumen →',
      featured1: { title: 'Sistem Manajemen Penjualan Ritel', sub: 'Karya Mandiri Pamanukan', desc: 'Aplikasi web manajemen toko ritel dengan dua peran — Admin dan Kasir. CRUD produk lengkap, transaksi real-time, modal pencarian item, dan kalkulasi otomatis <code>Total = Ukuran × Harga × Jumlah</code>.' },
      featured2: { title: 'Sistem Manajemen Gudang', sub: 'si_gudang', desc: 'Web app manajemen gudang dengan template Spica Bootstrap. Modul lengkap: barang masuk/keluar, supplier, user management, laporan stok. Implementasi session auth, PDO, navigasi dinamis.' },
      small1: { title: 'To-Do App', desc: 'Clone to-do list — add, edit, delete, filter status. Vanilla JS + localStorage.' },
      small2: { title: 'Kalkulator Matriks', desc: 'Kalkulator determinan dengan metode kofaktor & eliminasi baris. Visualisasi langkah.' },
      small3: { title: 'Sistem Penggajian', desc: 'Analisis & perancangan sistem penggajian karyawan — DFD, flowchart, dokumentasi lengkap.' },
    },
    education: {
      title: 'Pendidikan & Sertifikasi', sub: 'Jalur belajar formal dan mandiri',
      formal_hd: 'Pendidikan Formal', cert_hd: 'Kursus & Sertifikasi',
      formal1: { yr: '2025 — Sekarang', title: 'D4 Teknik Rekayasa Perangkat Lunak', place: 'Politeknik Negeri Subang · Subang, Jawa Barat', desc: 'Fokus pada rekayasa perangkat lunak, basis data, dan analisis sistem. Aktif mengerjakan praktikum berbasis proyek nyata setiap semester.' },
      cert1: { name: 'Belajar Dasar Pemrograman Web', org: 'Dicoding Indonesia' },
      cert2: { name: 'Pengenalan Logika Pemrograman', org: 'Dicoding Indonesia' },
      cert3: { name: 'Responsive Web Design', org: 'freeCodeCamp' },
      cert4: { name: 'Python for Everybody', org: 'Coursera · Univ. of Michigan' },
    },
    activity: {
      title: 'Kontribusi & Aktivitas', sub: 'Apa yang sedang dibangun dan direncanakan',
      stat_commits: 'Commits', stat_repos: 'Repositori', stat_months: 'Bulan Aktif',
      github: { title: 'GitHub Activity', desc: 'Commit aktif pada proyek kuliah dan eksperimen mandiri. Fokus pada konsistensi daripada kuantitas repo.', link: 'Lihat profil GitHub →' },
      opensource: { title: 'Open Source', desc: 'Menjajaki kontribusi open source — laporan bug kecil dan perbaikan dokumentasi. Sedang mencari proyek yang ramah kontributor baru.', link: 'Lihat kontribusi →' },
      blog: { title: 'Blog Teknis', desc: 'Mendokumentasikan proses belajar dari setiap proyek. Blog teknis sedang direncanakan — target tulisan pertama segera.', link: 'Lihat blog →' },
      goals: { title: 'Target 2025', items: [ 'Selesaikan 2 proyek mandiri yang bisa di-deploy', 'Raih 1 sertifikasi cloud (AWS / GCP Essentials)', 'Mulai blog teknis, tulis rutin tiap bulan', 'Kirim PR pertama ke proyek open source', 'Pelajari React atau Vue untuk frontend modern' ] },
    },
    contact: { title: 'Kontak', sub: 'Punya proyek atau sekadar ingin menyapa? Kirim pesan.', f_name: 'Nama', f_email: 'Email', f_msg: 'Pesan', send: 'Kirim Pesan', sending: 'Mengirim…', ok: 'Terima kasih! Pesanmu sudah terkirim.', err: 'Gagal mengirim. Coba lagi atau email langsung.' },
    footer: { tagline: 'Dibangun dengan kesabaran,\nkopi, dan banyak debugging.', nav_hd: 'Navigasi', contact_hd: 'Kontak', copyright: '© 2025 Ibni Atha Fauzi · Subang, Indonesia', back_top: '↑ Kembali ke atas' },
    lang: { switch_to: 'EN', label: 'Ganti bahasa ke English' },
  },
  en: {
    nav: { profil: 'Profile', skill: 'Skills', proyek: 'Projects', pendidikan: 'Education', aktivitas: 'Activity', kontak: 'Contact' },
    hero: {
      status: 'Available for opportunities', chip: 'Open to Work', cta_projects: 'View Projects',
      roles: ['Information Systems Student', 'Web Developer', 'Vibe Coder'],
      bio: 'Software Engineering student building digital solutions from idea to code. Specialized in PHP & MySQL web development — from retail systems to warehouse management. Goal: become a software engineer who builds products people actually use.',
      stats: [ { n: '2+', l: 'Years learning web dev' }, { n: '5+', l: 'Projects completed' }, { n: '3+', l: 'Tech stacks mastered' } ],
    },
    about: {
      title: 'Profile',
      lead: 'Hi — I’m Ibni, a Software Engineering student who loves turning real problems into apps people actually use.',
      p1: 'It started with curiosity about how websites work, then grew into a love for building them — designing databases, writing PHP back-end logic, and polishing the UI. Several of my projects were born from real needs, like a retail POS and a warehouse management system.',
      p2: 'I believe consistency beats speed: better to finish one project cleanly than start ten that stall. Right now I’m going deeper into modern JavaScript and cleaner application architecture.',
      s1: 'Started learning to code', s2: 'Projects completed', s3: 'Certifications',
      quote_label: '// fun fact', quote: 'My most productive debugging usually happens while brewing coffee.',
    },
    skills: { title: 'Skills & Technology', sub: 'Current capabilities:', cat_language: 'Programming Languages', cat_framework: 'Frameworks', cat_tool: 'Tools' },
    filter: { all: 'All', projek: 'Projects', latihan: 'Practice' },
    projects: {
      title: 'Projects', sub: 'Real work — from classroom to production',
      type_mandiri: 'Personal Project', type_latihan: 'Practice', type_akademik: 'Academic',
      link_repo: 'Repo', link_demo: 'Live Demo', link_doc: 'Document →',
      featured1: { title: 'Retail Sales Management System', sub: 'Karya Mandiri Pamanukan', desc: 'Retail store management web app with two roles — Admin and Cashier. Full product CRUD, real-time transactions, item search modal, and automatic calculation <code>Total = Size × Price × Quantity</code>.' },
      featured2: { title: 'Warehouse Management System', sub: 'si_gudang', desc: 'Warehouse management web app built on the Spica Bootstrap template. Full modules: stock in/out, suppliers, user management, stock reports. Implements session auth, PDO, and dynamic navigation.' },
      small1: { title: 'To-Do App', desc: 'To-do list clone — add, edit, delete, filter by status. Vanilla JS + localStorage.' },
      small2: { title: 'Matrix Calculator', desc: 'Determinant calculator using cofactor & row-reduction methods. Step-by-step visualization.' },
      small3: { title: 'Payroll System', desc: 'Analysis & design of an employee payroll system — DFD, flowchart, full documentation.' },
    },
    education: {
      title: 'Education & Certification', sub: 'Formal and self-taught learning path',
      formal_hd: 'Formal Education', cert_hd: 'Courses & Certifications',
      formal1: { yr: '2025 — Present', title: 'D4 Software Engineering', place: 'Politeknik Negeri Subang · Subang, West Java', desc: 'Focused on software engineering, databases, and systems analysis. Actively working on real project-based labs every semester.' },
      cert1: { name: 'Web Programming Fundamentals', org: 'Dicoding Indonesia' },
      cert2: { name: 'Introduction to Programming Logic', org: 'Dicoding Indonesia' },
      cert3: { name: 'Responsive Web Design', org: 'freeCodeCamp' },
      cert4: { name: 'Python for Everybody', org: 'Coursera · Univ. of Michigan' },
    },
    activity: {
      title: 'Contributions & Activity', sub: 'What’s being built and planned',
      stat_commits: 'Commits', stat_repos: 'Repositories', stat_months: 'Active Months',
      github: { title: 'GitHub Activity', desc: 'Active commits on coursework projects and personal experiments. Focused on consistency over repo count.', link: 'View GitHub profile →' },
      opensource: { title: 'Open Source', desc: 'Exploring open source contributions — small bug reports and documentation fixes. Looking for projects that welcome new contributors.', link: 'View contributions →' },
      blog: { title: 'Technical Blog', desc: 'Documenting the learning process from every project. A technical blog is in the works — first post coming soon.', link: 'View blog →' },
      goals: { title: '2025 Goals', items: [ 'Finish 2 deployable personal projects', 'Earn 1 cloud certification (AWS / GCP Essentials)', 'Start a technical blog, write regularly each month', 'Send a first PR to an open source project', 'Learn React or Vue for modern frontend' ] },
    },
    contact: { title: 'Contact', sub: 'Got a project or just want to say hi? Send a message.', f_name: 'Name', f_email: 'Email', f_msg: 'Message', send: 'Send Message', sending: 'Sending…', ok: 'Thanks! Your message has been sent.', err: 'Failed to send. Try again or email directly.' },
    footer: { tagline: 'Built with patience,\ncoffee, and a lot of debugging.', nav_hd: 'Navigation', contact_hd: 'Contact', copyright: '© 2025 Ibni Atha Fauzi · Subang, Indonesia', back_top: '↑ Back to top' },
    lang: { switch_to: 'ID', label: 'Switch language to Indonesian' },
  },
};

/* ── DATA (struktur stabil; teks via i18n key) ── */
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';
const SKILL_GROUPS = [
  { titleKey: 'skills.cat_language', icon: '&lt;/&gt;', items: [
    { name: 'HTML5', icon: DEVICON + 'html5/html5-original.svg' },
    { name: 'CSS3', icon: DEVICON + 'css3/css3-original.svg' },
    { name: 'JavaScript', icon: DEVICON + 'javascript/javascript-original.svg' },
    { name: 'Python', icon: DEVICON + 'python/python-original.svg' },
    { name: 'PHP', icon: DEVICON + 'php/php-original.svg' },
  ]},
  { titleKey: 'skills.cat_framework', icon: '{ }', items: [
    { name: 'React', icon: DEVICON + 'react/react-original.svg' },
    { name: 'Laravel', icon: DEVICON + 'laravel/laravel-original.svg' },
    { name: 'Node.js', icon: DEVICON + 'nodejs/nodejs-original.svg' },
    { name: 'TailwindCSS', icon: DEVICON + 'tailwindcss/tailwindcss-original.svg' },
  ]},
  { titleKey: 'skills.cat_tool', icon: '#', items: [
    { name: 'Git', icon: DEVICON + 'git/git-original.svg' },
    { name: 'GitHub', icon: DEVICON + 'github/github-original.svg' },
    { name: 'VS Code', icon: DEVICON + 'vscode/vscode-original.svg' },
    { name: 'MySQL', icon: DEVICON + 'mysql/mysql-original.svg' },
    { name: 'Figma', icon: DEVICON + 'figma/figma-original.svg' },
  ]},
];

const PROJECTS = [
  { key: 'featured1', cat: 'projek', typeKey: 'projects.type_mandiri', tag: 'IAF', tags: ['PHP', 'MySQL', 'Bootstrap'],
    repo: 'https://github.com/Rolang-git', demo: '#', doc: null },
  { key: 'featured2', cat: 'projek', typeKey: 'projects.type_mandiri', tag: 'SG', tags: ['PHP', 'PDO', 'Bootstrap'],
    repo: 'https://github.com/Rolang-git', demo: '#', doc: null },
  { key: 'small1', cat: 'latihan', typeKey: 'projects.type_latihan', tag: 'TD', tags: ['JavaScript', 'localStorage'],
    repo: 'https://github.com/Rolang-git', demo: '#', doc: null },
  { key: 'small2', cat: 'latihan', typeKey: 'projects.type_latihan', tag: 'MX', tags: ['JavaScript', 'Math'],
    repo: 'https://github.com/Rolang-git', demo: '#', doc: null },
  { key: 'small3', cat: 'latihan', typeKey: 'projects.type_akademik', tag: 'PG', tags: ['Analysis', 'DFD'],
    repo: null, demo: null, doc: '#' },
];

const CERTS = ['cert1', 'cert2', 'cert3', 'cert4'];

/* ── helpers ── */
const $  = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
const tGet = (lang, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), I18N[lang]);

let LANG = localStorage.getItem('portfolio-lang') || 'id';
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hoverCapable   = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* =====================================================================
   I18N — apply translations to [data-i18n] / [data-i18n-aria]
   ===================================================================== */
function applyI18n() {
  document.documentElement.lang = LANG;
  $$('[data-i18n]').forEach((el) => {
    const val = tGet(LANG, el.getAttribute('data-i18n'));
    if (typeof val === 'string') {
      if (val.includes('<code>')) el.innerHTML = val; else el.textContent = val;
    }
  });
  $$('[data-i18n-aria]').forEach((el) => {
    const val = tGet(LANG, el.getAttribute('data-i18n-aria'));
    if (typeof val === 'string') el.setAttribute('aria-label', val);
  });
}

/* render bagian dinamis yang bergantung bahasa */
function renderHeroStats() {
  const wrap = $('#heroStats'); if (!wrap) return;
  const stats = tGet(LANG, 'hero.stats');
  wrap.innerHTML = stats.map((s, i) =>
    `${i ? '<div class="stat-divider"></div>' : ''}<div class="stat-item"><span class="stat-n">${s.n}</span><span class="stat-l">${s.l}</span></div>`
  ).join('');
}
function renderSkills() {
  const wrap = $('#skillsWrap'); if (!wrap) return;
  wrap.innerHTML = SKILL_GROUPS.map((g) => `
    <div class="skill-group reveal">
      <div class="skill-group-hd"><span class="ic">${g.icon}</span>${tGet(LANG, g.titleKey)}</div>
      <div class="skill-grid">
        ${g.items.map((it) => `
          <div class="skill-box">
            <img src="${it.icon}" alt="${it.name}" loading="lazy" onerror="this.style.opacity=.3" />
            <span>${it.name}</span>
          </div>`).join('')}
      </div>
    </div>`).join('');
  initReveal();
}
function renderProjects(filter = 'all') {
  const grid = $('#projGrid'); if (!grid) return;
  const links = (p) => {
    const a = [];
    if (p.repo) a.push(`<a href="${p.repo}" target="_blank" rel="noopener">${tGet(LANG, 'projects.link_repo')}</a>`);
    if (p.demo) a.push(`<a href="${p.demo}" target="_blank" rel="noopener">${tGet(LANG, 'projects.link_demo')}</a>`);
    if (p.doc)  a.push(`<a href="${p.doc}" target="_blank" rel="noopener">${tGet(LANG, 'projects.link_doc')}</a>`);
    return a.join('');
  };
  grid.innerHTML = PROJECTS.map((p) => {
    const pr = tGet(LANG, 'projects.' + p.key);
    const show = filter === 'all' || p.cat === filter;
    return `
    <article class="project-card rb-spot ${show ? 'pop' : 'hide'}" data-cat="${p.cat}">
      <div class="rb-glow"></div>
      <div class="proj-thumb">
        <span class="mono-tag">${p.tag}</span>
        <div class="proj-overlay">${links(p)}</div>
      </div>
      <div class="proj-body">
        <span class="proj-badge">${tGet(LANG, p.typeKey)}</span>
        <h3 class="proj-title">${pr.title}</h3>
        ${pr.sub ? `<div class="proj-sub">${pr.sub}</div>` : ''}
        <p class="proj-desc">${pr.desc}</p>
        <div class="proj-tags">${p.tags.map((t) => `<span>${t}</span>`).join('')}</div>
      </div>
    </article>`;
  }).join('');
  initSpotlight();
}
function renderCerts() {
  const list = $('#certList'); if (!list) return;
  list.innerHTML = CERTS.map((k) => {
    const c = tGet(LANG, 'education.' + k);
    const initials = c.org.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
    return `
    <div class="cert-item">
      <span class="cert-ic">${initials}</span>
      <div><div class="cert-name">${c.name}</div><div class="cert-org">${c.org}</div></div>
      <span class="cert-status">✓</span>
    </div>`;
  }).join('');
}
function renderGoals() {
  const ul = $('#goalsList'); if (!ul) return;
  ul.innerHTML = tGet(LANG, 'activity.goals.items').map((g) => `<li>${g}</li>`).join('');
}

function renderDynamic() {
  renderHeroStats(); renderSkills(); renderProjects(currentFilter); renderCerts(); renderGoals();
}

/* =====================================================================
   01 — LOADER
   ===================================================================== */
(function initLoader() {
  const loader = $('#loader'); const bar = $('.loader-bar i');
  if (!loader) return;
  let p = 0;
  const tick = setInterval(() => { p = Math.min(p + Math.random() * 18, 92); if (bar) bar.style.width = p + '%'; }, 130);
  window.addEventListener('load', () => {
    clearInterval(tick); if (bar) bar.style.width = '100%';
    setTimeout(() => loader.classList.add('done'), 350);
  });
  setTimeout(() => { clearInterval(tick); if (bar) bar.style.width = '100%'; loader.classList.add('done'); }, 4500);
})();

/* =====================================================================
   02 — CUSTOM CURSOR
   ===================================================================== */
(function initCursor() {
  if (!hoverCapable) return;
  const dot = $('#c-dot'); const ring = $('#c-ring');
  if (!dot || !ring) return;
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  }, { passive: true });
  (function loop() {
    rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();
  addEventListener('mouseover', (e) => { if (e.target.closest('a,button,input,textarea,[data-magnet]')) ring.classList.add('hover'); });
  addEventListener('mouseout',  (e) => { if (e.target.closest('a,button,input,textarea,[data-magnet]')) ring.classList.remove('hover'); });
  addEventListener('mousedown', () => ring.classList.add('click'));
  addEventListener('mouseup',   () => ring.classList.remove('click'));
})();

/* =====================================================================
   03 — THEME, LANG, NAV
   ===================================================================== */
(function initTheme() {
  const btn = $('#themeBtn');
  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  btn && btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });
})();

let currentFilter = 'all';
(function initLang() {
  const btn = $('#langBtn');
  btn && btn.addEventListener('click', () => {
    LANG = LANG === 'id' ? 'en' : 'id';
    localStorage.setItem('portfolio-lang', LANG);
    applyI18n(); renderDynamic();
  });
})();

(function initNav() {
  const ham = $('#hamburger'); const links = $('#navLinks');
  ham && ham.addEventListener('click', () => { ham.classList.toggle('open'); links.classList.toggle('open'); });
  $$('#navLinks a').forEach((a) => a.addEventListener('click', () => { ham && ham.classList.remove('open'); links.classList.remove('open'); }));

  const readBar = $('#readBar');
  const sections = ['about', 'skills', 'projects', 'education', 'activity', 'contact'].map((id) => $('#' + id)).filter(Boolean);
  const navItems = $$('#navLinks a');
  addEventListener('scroll', () => {
    const h = document.documentElement;
    const sc = h.scrollTop / (h.scrollHeight - h.clientHeight);
    if (readBar) readBar.style.width = (sc * 100) + '%';
    let cur = '';
    sections.forEach((s) => { if (s.getBoundingClientRect().top <= 120) cur = s.id; });
    navItems.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  }, { passive: true });
})();

/* =====================================================================
   04 — TYPEWRITER (rotasi role)
   ===================================================================== */
(function initTypewriter() {
  const el = $('#typed'); if (!el) return;
  let ri = 0, ci = 0, deleting = false;
  function step() {
    const roles = tGet(LANG, 'hero.roles');
    const word = roles[ri % roles.length];
    el.textContent = word.slice(0, ci);
    if (!deleting && ci < word.length) { ci++; }
    else if (!deleting && ci === word.length) { deleting = true; return setTimeout(step, 1400); }
    else if (deleting && ci > 0) { ci--; }
    else { deleting = false; ri++; }
    setTimeout(step, deleting ? 45 : 95);
  }
  step();
})();

/* =====================================================================
   ReactBits — BlurText (initBlurText)
   ===================================================================== */
function initBlurText() {
  $$('[data-blur]').forEach((el) => {
    if (el.dataset.blurDone) return; el.dataset.blurDone = '1';
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((w, i) => {
      const span = document.createElement('span');
      span.className = 'rb-word'; span.textContent = w + (i < words.length - 1 ? ' ' : '');
      span.style.setProperty('--rb-d', (i * 30) + 'ms');
      el.appendChild(span);
    });
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { $$('.rb-word', el).forEach((s) => s.classList.add('in')); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(el);
  });
}

/* =====================================================================
   ReactBits — Magnet (initMagnet)
   ===================================================================== */
function initMagnet() {
  if (!hoverCapable) return;
  const PAD = 30, STRENGTH = 5;
  $$('[data-magnet]').forEach((el) => {
    if (el.dataset.magnetDone) return; el.dataset.magnetDone = '1';
    el.style.transition = 'transform .4s cubic-bezier(.2,.7,.2,1)';
    addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      if (Math.abs(dx) < r.width / 2 + PAD && Math.abs(dy) < r.height / 2 + PAD) {
        el.style.transform = `translate(${dx / STRENGTH}px, ${dy / STRENGTH}px)`;
      } else { el.style.transform = ''; }
    }, { passive: true });
  });
}

/* =====================================================================
   ReactBits — SpotlightCard (initSpotlight)
   ===================================================================== */
function initSpotlight() {
  if (!hoverCapable) return;
  $$('.rb-spot').forEach((card) => {
    if (card.dataset.spotDone) return; card.dataset.spotDone = '1';
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
}

/* =====================================================================
   ReactBits — ClickSpark (initClickSpark)
   ===================================================================== */
(function initClickSpark() {
  if (prefersReduced) return;
  const cv = $('#spark-canvas'); if (!cv) return;
  const ctx = cv.getContext('2d');
  let sparks = [];
  function resize() { cv.width = innerWidth; cv.height = innerHeight; }
  resize(); addEventListener('resize', resize, { passive: true });
  function color() { return getComputedStyle(document.documentElement).getPropertyValue('--br').trim() || '#D9A064'; }
  addEventListener('pointerdown', (e) => {
    const c = color();
    for (let i = 0; i < 10; i++) {
      const a = (Math.PI * 2 * i) / 10;
      sparks.push({ x: e.clientX, y: e.clientY, vx: Math.cos(a) * 5, vy: Math.sin(a) * 5, life: 1, c });
    }
  });
  (function loop() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    sparks = sparks.filter((s) => s.life > 0.02);
    sparks.forEach((s) => {
      s.x += s.vx; s.y += s.vy; s.vx *= 0.92; s.vy *= 0.92; s.life *= 0.92;
      ctx.strokeStyle = s.c; ctx.globalAlpha = s.life; ctx.lineWidth = 2; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 2, s.y - s.vy * 2); ctx.stroke();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  })();
})();

/* =====================================================================
   ReactBits — Aurora background (initAurora, WebGL2)
   ===================================================================== */
(function initAurora() {
  if (prefersReduced || innerWidth < 720) return;
  const canvas = $('#aurora-canvas'); if (!canvas) return;
  const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: false });
  if (!gl) return;

  const vert = `#version 300 es
  in vec2 position; void main(){ gl_Position = vec4(position,0.0,1.0); }`;
  const frag = `#version 300 es
  precision highp float;
  uniform float uTime; uniform float uAmplitude; uniform vec3 uColorStops[3];
  uniform vec2 uResolution; uniform float uBlend; out vec4 fragColor;
  vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x,289.0); }
  float snoise(vec2 v){
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy)); vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
    vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1; i=mod(i,289.0);
    vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m=m*m; m=m*m;
    vec3 x=2.0*fract(p*C.www)-1.0; vec3 h=abs(x)-0.5; vec3 ox=floor(x+0.5); vec3 a0=x-ox;
    m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.0*dot(m,g);
  }
  void main(){
    vec2 uv=gl_FragCoord.xy/uResolution;
    vec3 rampColor;
    if(uv.x<0.5){ rampColor=mix(uColorStops[0],uColorStops[1],uv.x*2.0); }
    else { rampColor=mix(uColorStops[1],uColorStops[2],(uv.x-0.5)*2.0); }
    float height=snoise(vec2(uv.x*2.0+uTime*0.1,uTime*0.25))*0.5*uAmplitude;
    height=exp(height); height=(uv.y*2.0-height+0.2);
    float intensity=0.6*height; float midPoint=0.20;
    float auroraAlpha=smoothstep(midPoint-uBlend*0.5,midPoint+uBlend*0.5,intensity);
    vec3 auroraColor=intensity*rampColor;
    fragColor=vec4(auroraColor*auroraAlpha,auroraAlpha);
  }`;

  function compile(type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; } return s; }
  const vs = compile(gl.VERTEX_SHADER, vert), fs = compile(gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) return;
  const prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'position'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(prog, 'uTime');
  const uAmp = gl.getUniformLocation(prog, 'uAmplitude');
  const uRes = gl.getUniformLocation(prog, 'uResolution');
  const uBlend = gl.getUniformLocation(prog, 'uBlend');
  const uStops = gl.getUniformLocation(prog, 'uColorStops');

  gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const hex = (h) => { h = h.replace('#',''); return [parseInt(h.slice(0,2),16)/255, parseInt(h.slice(2,4),16)/255, parseInt(h.slice(4,6),16)/255]; };
  function stops() {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    return dark ? ['#3A1E07','#9A6233','#C9925D'] : ['#E3BC8A','#9A6233','#3A1E07'];
  }
  function resize() { canvas.width = innerWidth; canvas.height = innerHeight; gl.viewport(0,0,canvas.width,canvas.height); }
  resize(); addEventListener('resize', resize, { passive: true });

  let t0 = performance.now();
  function frame(now) {
    gl.uniform1f(uTime, (now - t0) / 1000);
    gl.uniform1f(uAmp, 1.0);
    gl.uniform1f(uBlend, 0.5);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform3fv(uStops, new Float32Array(stops().flatMap(hex)));
    gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

/* =====================================================================
   Hero Particles (canvas 2D) — initHeroParticles
   ===================================================================== */
(function initHeroParticles() {
  if (prefersReduced || innerWidth < 720) return;
  const hero = $('#hero'); if (!hero) return;
  const cv = document.createElement('canvas');
  cv.style.cssText = 'position:absolute;inset:0;z-index:0;pointer-events:none';
  hero.insertBefore(cv, hero.firstChild);
  const ctx = cv.getContext('2d');
  const N = 50, LINK = 130; let parts = [];
  function color() { return getComputedStyle(document.documentElement).getPropertyValue('--br-2').trim() || '#C2814C'; }
  function resize() { cv.width = hero.offsetWidth; cv.height = hero.offsetHeight;
    parts = Array.from({ length: N }, () => ({ x: Math.random()*cv.width, y: Math.random()*cv.height, vx: (Math.random()-.5)*.4, vy: (Math.random()-.5)*.4 })); }
  resize(); addEventListener('resize', resize, { passive: true });
  (function loop() {
    const c = color(); ctx.clearRect(0,0,cv.width,cv.height);
    parts.forEach((p) => { p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > cv.width) p.vx *= -1; if (p.y < 0 || p.y > cv.height) p.vy *= -1;
      ctx.fillStyle = c; ctx.globalAlpha = .6; ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, Math.PI*2); ctx.fill(); });
    for (let i = 0; i < N; i++) for (let j = i+1; j < N; j++) {
      const dx = parts[i].x-parts[j].x, dy = parts[i].y-parts[j].y, d = Math.hypot(dx, dy);
      if (d < LINK) { ctx.strokeStyle = c; ctx.globalAlpha = (1 - d/LINK)*.22; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(parts[i].x, parts[i].y); ctx.lineTo(parts[j].x, parts[j].y); ctx.stroke(); }
    }
    ctx.globalAlpha = 1; requestAnimationFrame(loop);
  })();
})();

/* =====================================================================
   ProfileCard tilt (initProfileCard) — ReactBits ProfileCard
   ===================================================================== */
(function initProfileCard() {
  const wrap = $('#profileCard'); if (!wrap) return;
  if (!hoverCapable || prefersReduced) return;
  const MAX = 10;
  wrap.addEventListener('pointermove', (e) => {
    const r = wrap.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    wrap.style.setProperty('--rotate-y', ((px - 0.5) * MAX * 2) + 'deg');
    wrap.style.setProperty('--rotate-x', (-(py - 0.5) * MAX * 2) + 'deg');
    wrap.style.setProperty('--pointer-x', (px * 100) + '%');
    wrap.style.setProperty('--pointer-y', (py * 100) + '%');
    wrap.style.setProperty('--card-opacity', '1');
  });
  wrap.addEventListener('pointerleave', () => {
    wrap.style.setProperty('--rotate-x', '0deg'); wrap.style.setProperty('--rotate-y', '0deg');
    wrap.style.setProperty('--card-opacity', '0');
  });
})();

/* =====================================================================
   Reveal on scroll + CountUp
   ===================================================================== */
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$('.reveal:not(.in)').forEach((el) => io.observe(el));
}
function initCountUp() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return; io.unobserve(e.target);
      const el = e.target, target = +el.dataset.target; let cur = 0;
      const stepN = Math.max(1, Math.round(target / 40));
      const t = setInterval(() => { cur += stepN; if (cur >= target) { cur = target; clearInterval(t); } el.textContent = cur + (target >= 100 ? '+' : ''); }, 28);
    });
  }, { threshold: 0.4 });
  $$('.countup').forEach((el) => io.observe(el));
}

/* =====================================================================
   Projects filter
   ===================================================================== */
(function initFilters() {
  const bar = $('#projFilters'); if (!bar) return;
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn'); if (!btn) return;
    $$('.filter-btn', bar).forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderProjects(currentFilter);
  });
})();

/* =====================================================================
   10 — CONTACT FORM (Web3Forms)
   ===================================================================== */
(function initContactForm() {
  const form = $('#contactForm'); if (!form) return;
  const status = $('#formStatus'); const btnSpan = $('#cfSubmit span');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const orig = btnSpan ? btnSpan.textContent : '';
    if (btnSpan) btnSpan.textContent = tGet(LANG, 'contact.sending');
    status.className = 'form-status'; status.textContent = '';
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (res.ok) { status.classList.add('ok'); status.textContent = tGet(LANG, 'contact.ok'); form.reset(); }
      else throw new Error('bad response');
    } catch (_) {
      status.classList.add('err'); status.textContent = tGet(LANG, 'contact.err');
    } finally { if (btnSpan) btnSpan.textContent = orig || tGet(LANG, 'contact.send'); }
  });
})();

/* =====================================================================
   Footer live clock
   ===================================================================== */
(function initClock() {
  const el = $('#clock'); if (!el) return;
  const tick = () => { el.textContent = new Date().toLocaleTimeString('id-ID', { hour12: false, timeZone: 'Asia/Jakarta' }) + ' WIB'; };
  tick(); setInterval(tick, 1000);
})();

/* =====================================================================
   BOOTSTRAP
   ===================================================================== */
applyI18n();
renderDynamic();
initBlurText();
initMagnet();
initSpotlight();
initReveal();
initCountUp();
