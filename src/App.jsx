import { useEffect } from 'react';
import { initSiteEffects } from './effects.js';
import BlurText from './components/BlurText.jsx';

// ─── React Bits components go here ───
// Drop components copied from https://reactbits.dev into src/components/
// and import them, e.g.:
//   import SplitText from './components/SplitText.jsx';
// then use them inside the JSX below.

export default function App() {
  useEffect(() => {
    initSiteEffects();
  }, []);

  return (
    <>
      {/* CURSOR GLOW */}
      <div className="cursor-glow" id="cursor-glow"></div>

      {/* ─── HEADER ─── */}
      <header className="site-header" id="site-header">
        <div className="container nav-container">
          <a href="#top" className="logo">
            <span className="logo-bracket">[</span>IAF<span className="logo-bracket">]</span>
          </a>

          <nav className="nav-links" id="nav-links">
            <a href="#about"     className="nav-item"><span className="nav-num">01</span><span className="nav-label">Profil</span></a>
            <a href="#skills"    className="nav-item"><span className="nav-num">02</span><span className="nav-label">Skill</span></a>
            <a href="#projects"  className="nav-item"><span className="nav-num">03</span><span className="nav-label">Proyek</span></a>
            <a href="#education" className="nav-item"><span className="nav-num">04</span><span className="nav-label">Pendidikan</span></a>
            <a href="#activity"  className="nav-item"><span className="nav-num">05</span><span className="nav-label">Aktivitas</span></a>
          </nav>

          <div className="nav-actions">
            <button className="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
              <svg className="icon-sun" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              <svg className="icon-moon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            </button>
            <button className="nav-hamburger" id="nav-hamburger" aria-label="Menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
        <div className="nav-progress" id="nav-progress"></div>
      </header>

      {/* ─── HERO ─── */}
      <section className="hero" id="about">
        <div className="hero-bg-text" aria-hidden="true">PORTFOLIO</div>
        <div className="container hero-inner">

          <div className="hero-text">
            <div className="hero-status">
              <span className="status-dot"></span>
              <span>Available for opportunities</span>
            </div>
            <h1 className="hero-name">
              <span className="name-first">Ibni</span>
              <em className="name-last">Atha Fauzi</em>
            </h1>
            <div className="hero-rule"></div>
            <p className="hero-roles">
              <span>Information Systems Student</span>
              <span className="dot-sep">·</span>
              <span>Web Developer</span>
              <span className="dot-sep">·</span>
              <span>Subang, ID</span>
            </p>
            {/* React Bits — BlurText component */}
            <BlurText
              className="hero-bio"
              animateBy="words"
              delay={30}
              text="Mahasiswa Sistem Informasi yang membangun solusi digital dari ide ke kode. Spesialis pengembangan web berbasis PHP & MySQL — dari sistem ritel hingga manajemen gudang. Tujuan: menjadi software engineer yang membuat produk yang benar-benar dipakai orang."
            />
            <div className="hero-ctas">
              <a href="mailto:ibni0907@gmail.com" className="cta-ghost">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
                Email
              </a>
              <a href="https://linkedin.com/in/ibni" target="_blank" rel="noopener" className="cta-ghost">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 10v7M7 7v.01M12 10v7M12 13a3 3 0 0 1 6 0v4"/></svg>
                LinkedIn
              </a>
              <a href="https://github.com/Rolang-git" target="_blank" rel="noopener" className="cta-ghost">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                GitHub
              </a>
              <a href="#projects" className="cta-primary">
                Lihat Proyek
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="photo-wrap">
              <div className="photo-corner c-tl"></div>
              <div className="photo-corner c-tr"></div>
              <div className="photo-corner c-bl"></div>
              <div className="photo-corner c-br"></div>
              <div className="photo-box">
                <img src="/photo.jpeg"
                     alt="Ibni Atha Fauzi"
                     style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="photo-chip">
                <span className="chip-dot"></span>Open to Work
              </div>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-n">2+</span>
                <span className="stat-l">Tahun belajar web dev</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-n">5+</span>
                <span className="stat-l">Proyek selesai</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-n">3+</span>
                <span className="stat-l">Tech stack dikuasai</span>
              </div>
            </div>
          </div>

        </div>
        <div className="hero-scroll">
          <div className="scroll-track"><div className="scroll-thumb"></div></div>
          <span>scroll</span>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section className="section" id="skills">
        <div className="container">
          <div className="sec-hd">
            <span className="sec-eyebrow">01 / 05</span>
            <h2 className="sec-title">Skill &amp; Teknologi</h2>
            <p className="sec-sub">Kemampuan saat ini — jujur, tanpa dilebih-lebihkan</p>
          </div>

          <div className="skills-layout">
            <div className="skills-bars">
              <h3 className="cat-hd">Bahasa Pemrograman</h3>
              <div className="sbar-list">
                <div className="sbar-item">
                  <div className="sbar-info"><span className="sbar-name">HTML &amp; CSS</span><span className="sbadge mahir">Mahir</span></div>
                  <div className="sbar-track"><div className="sbar-fill" style={{ '--p': 85 }}></div></div>
                  <span className="sbar-pct">85%</span>
                </div>
                <div className="sbar-item">
                  <div className="sbar-info"><span className="sbar-name">PHP</span><span className="sbadge mahir">Mahir</span></div>
                  <div className="sbar-track"><div className="sbar-fill" style={{ '--p': 80 }}></div></div>
                  <span className="sbar-pct">80%</span>
                </div>
                <div className="sbar-item">
                  <div className="sbar-info"><span className="sbar-name">SQL (MySQL)</span><span className="sbadge mahir">Mahir</span></div>
                  <div className="sbar-track"><div className="sbar-fill" style={{ '--p': 78 }}></div></div>
                  <span className="sbar-pct">78%</span>
                </div>
                <div className="sbar-item">
                  <div className="sbar-info"><span className="sbar-name">JavaScript</span><span className="sbadge menengah">Menengah</span></div>
                  <div className="sbar-track"><div className="sbar-fill" style={{ '--p': 62 }}></div></div>
                  <span className="sbar-pct">62%</span>
                </div>
                <div className="sbar-item">
                  <div className="sbar-info"><span className="sbar-name">Python</span><span className="sbadge menengah">Menengah</span></div>
                  <div className="sbar-track"><div className="sbar-fill" style={{ '--p': 55 }}></div></div>
                  <span className="sbar-pct">55%</span>
                </div>
              </div>
            </div>

            <div className="skills-tags">
              <div>
                <h3 className="cat-hd">Framework &amp; Tools</h3>
                <div className="tag-wrap">
                  <span className="stag lvl-a">Bootstrap 5</span>
                  <span className="stag lvl-a">Font Awesome 6</span>
                  <span className="stag lvl-b">jQuery</span>
                  <span className="stag lvl-b">XAMPP / Apache</span>
                  <span className="stag lvl-b">Git &amp; GitHub</span>
                  <span className="stag lvl-b">phpMyAdmin</span>
                  <span className="stag lvl-c">VS Code</span>
                  <span className="stag lvl-c">Figma (basic)</span>
                  <span className="stag lvl-c">Canva</span>
                  <span className="stag lvl-b">Hostinger</span>
                </div>
              </div>
              <div style={{ marginTop: '2rem' }}>
                <h3 className="cat-hd">Konsep &amp; Metodologi</h3>
                <div className="tag-wrap">
                  <span className="stag lvl-a">CRUD Development</span>
                  <span className="stag lvl-a">Session Auth (PHP)</span>
                  <span className="stag lvl-b">Analisis Sistem</span>
                  <span className="stag lvl-b">DFD &amp; Flowchart</span>
                  <span className="stag lvl-c">OOP Dasar</span>
                  <span className="stag lvl-c">RESTful Concepts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section className="section section-tinted" id="projects">
        <div className="container">
          <div className="sec-hd">
            <span className="sec-eyebrow">02 / 05</span>
            <h2 className="sec-title">Proyek</h2>
            <p className="sec-sub">Kerja nyata — dari kelas ke produksi</p>
          </div>

          <div className="proj-featured">

            <article className="pcard">
              <div className="pcard-visual">
                <div className="pmock">
                  <div className="pmock-topbar"><span></span><span></span><span></span></div>
                  <div className="pmock-body">
                    <div className="pmock-ln w75"></div>
                    <div className="pmock-ln w55"></div>
                    <div className="pmock-cards">
                      <div className="pmock-c"></div><div className="pmock-c"></div>
                      <div className="pmock-c"></div><div className="pmock-c"></div>
                    </div>
                    <div className="pmock-ln w40"></div>
                  </div>
                </div>
                <div className="pcard-label">
                  <span className="ptype mandiri">Proyek Mandiri</span>
                </div>
              </div>
              <div className="pcard-body">
                <h3 className="pcard-title">Sistem Manajemen Penjualan Ritel</h3>
                <p className="pcard-sub">Karya Mandiri Pamanukan</p>
                <p className="pcard-desc">Aplikasi web manajemen toko ritel dengan dua peran — Admin dan Kasir. CRUD produk lengkap, transaksi real-time, modal pencarian item, dan kalkulasi otomatis <code>Total = Ukuran × Harga × Jumlah</code>.</p>
                <div className="pcard-tech">
                  <span className="ptag">PHP</span><span className="ptag">MySQL</span>
                  <span className="ptag">Bootstrap 5</span><span className="ptag">Font Awesome 6</span><span className="ptag">PDO</span>
                </div>
                <div className="pcard-links">
                  <a href="https://github.com/Rolang-git/project-1" target="_blank" className="plnk">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                    Repo
                  </a>
                  <a href="#" className="plnk plnk-accent">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </article>

            <article className="pcard pcard-alt">
              <div className="pcard-visual">
                <div className="pmock pmock-dark">
                  <div className="pmock-topbar dark"><span></span><span></span><span></span></div>
                  <div className="pmock-body dark">
                    <div className="pmock-sidebar">
                      <div className="pmock-si"></div>
                      <div className="pmock-si active"></div>
                      <div className="pmock-si"></div>
                      <div className="pmock-si"></div>
                    </div>
                    <div className="pmock-main">
                      <div className="pmock-ln w65 light"></div>
                      <div className="pmock-rows">
                        <div className="pmock-r"></div>
                        <div className="pmock-r"></div>
                        <div className="pmock-r"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pcard-label">
                  <span className="ptype kampus">Tugas Kampus (UTS)</span>
                </div>
              </div>
              <div className="pcard-body">
                <h3 className="pcard-title">Sistem Manajemen Gudang</h3>
                <p className="pcard-sub">si_gudang</p>
                <p className="pcard-desc">Web app manajemen gudang dengan Spica Bootstrap template. Modul lengkap: barang masuk/keluar, supplier, user management, laporan stok. Implementasi session auth, PDO, navigasi dinamis.</p>
                <div className="pcard-tech">
                  <span className="ptag">PHP</span><span className="ptag">MySQL</span>
                  <span className="ptag">Spica Template</span><span className="ptag">PDO</span><span className="ptag">Session Auth</span>
                </div>
                <div className="pcard-links">
                  <a href="#" target="_blank" className="plnk">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                    Repo
                  </a>
                </div>
              </div>
            </article>

          </div>

          <div className="proj-small">

            <article className="psm">
              <div className="psm-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              </div>
              <div className="psm-top">
                <span className="ptype latihan">Latihan</span>
                <h3 className="psm-title">To-Do App</h3>
              </div>
              <p className="psm-desc">Clone to-do list — add, edit, delete, filter status. Vanilla JS + localStorage.</p>
              <div className="psm-tech"><span className="ptag-sm">HTML</span><span className="ptag-sm">CSS</span><span className="ptag-sm">JS</span></div>
              <a href="#" className="psm-link">GitHub →</a>
            </article>

            <article className="psm">
              <div className="psm-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>
              </div>
              <div className="psm-top">
                <span className="ptype latihan">Latihan</span>
                <h3 className="psm-title">Kalkulator Matriks</h3>
              </div>
              <p className="psm-desc">Kalkulator determinan dengan metode kofaktor &amp; eliminasi baris. Visualisasi langkah.</p>
              <div className="psm-tech"><span className="ptag-sm">Python</span><span className="ptag-sm">NumPy</span></div>
              <a href="#" className="psm-link">GitHub →</a>
            </article>

            <article className="psm">
              <div className="psm-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div className="psm-top">
                <span className="ptype akademik">Akademik</span>
                <h3 className="psm-title">Sistem Penggajian</h3>
              </div>
              <p className="psm-desc">Analisis &amp; perancangan sistem penggajian karyawan — DFD, flowchart, dokumentasi lengkap.</p>
              <div className="psm-tech"><span className="ptag-sm">System Analysis</span><span className="ptag-sm">DFD</span></div>
              <a href="#" className="psm-link">Dokumen →</a>
            </article>

          </div>
        </div>
      </section>

      {/* ─── EDUCATION ─── */}
      <section className="section" id="education">
        <div className="container">
          <div className="sec-hd">
            <span className="sec-eyebrow">03 / 05</span>
            <h2 className="sec-title">Pendidikan &amp; Sertifikasi</h2>
            <p className="sec-sub">Jalur belajar formal dan mandiri</p>
          </div>

          <div className="edu-layout">
            <div className="edu-left">
              <h3 className="cat-hd">Pendidikan Formal</h3>
              <div className="tline">
                <div className="tline-item">
                  <div className="tline-marker">
                    <div className="tline-dot"></div>
                    <div className="tline-stem"></div>
                  </div>
                  <div className="tline-body">
                    <div className="tline-yr">2022 — Sekarang</div>
                    <div className="tline-title">S1 Sistem Informasi</div>
                    <div className="tline-place">Politeknik Negeri Subang · Subang, Jawa Barat</div>
                    <p className="tline-desc">Fokus pada rekayasa perangkat lunak, basis data, dan analisis sistem. Aktif mengerjakan praktikum berbasis proyek nyata setiap semester.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="edu-right">
              <h3 className="cat-hd">Kursus &amp; Sertifikasi</h3>
              <div className="cert-list">
                <div className="cert-card">
                  <div className="cert-logo dicoding">Di</div>
                  <div className="cert-info">
                    <div className="cert-name">Belajar Dasar Pemrograman Web</div>
                    <div className="cert-org">Dicoding Indonesia</div>
                  </div>
                  <span className="cert-status done">✓ Selesai</span>
                </div>
                <div className="cert-card">
                  <div className="cert-logo dicoding">Di</div>
                  <div className="cert-info">
                    <div className="cert-name">Pengenalan Logika Pemrograman</div>
                    <div className="cert-org">Dicoding Indonesia</div>
                  </div>
                  <span className="cert-status done">✓ Selesai</span>
                </div>
                <div className="cert-card">
                  <div className="cert-logo fcc">fCC</div>
                  <div className="cert-info">
                    <div className="cert-name">Responsive Web Design</div>
                    <div className="cert-org">freeCodeCamp</div>
                  </div>
                  <span className="cert-status progress">Proses</span>
                </div>
                <div className="cert-card">
                  <div className="cert-logo coursera">Co</div>
                  <div className="cert-info">
                    <div className="cert-name">Python for Everybody</div>
                    <div className="cert-org">Coursera · Univ. of Michigan</div>
                  </div>
                  <span className="cert-status progress">Proses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ACTIVITY ─── */}
      <section className="section section-tinted" id="activity">
        <div className="container">
          <div className="sec-hd">
            <span className="sec-eyebrow">04 / 05</span>
            <h2 className="sec-title">Kontribusi &amp; Aktivitas</h2>
            <p className="sec-sub">Apa yang sedang dibangun dan direncanakan</p>
          </div>

          <div className="act-grid">

            <div className="acard acard-wide">
              <div className="acard-hd">
                <div className="acard-ico">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                </div>
                <h3 className="acard-title">GitHub Activity</h3>
              </div>
              <p className="acard-desc">Commit aktif pada proyek-proyek kuliah dan eksperimen mandiri. Fokus pada konsistensi daripada kuantitas repo.</p>
              <div className="contrib-grid" id="contrib-grid"></div>
              <div className="contrib-legend">
                <span>Kurang</span>
                <span className="cl-sq sq0"></span>
                <span className="cl-sq sq1"></span>
                <span className="cl-sq sq2"></span>
                <span className="cl-sq sq3"></span>
                <span className="cl-sq sq4"></span>
                <span>Lebih</span>
              </div>
              <a href="https://github.com/Rolang-git" target="_blank" className="acard-link">Lihat profil GitHub →</a>
            </div>

            <div className="acard">
              <div className="acard-hd">
                <div className="acard-ico">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <h3 className="acard-title">Open Source</h3>
              </div>
              <p className="acard-desc">Menjajaki kontribusi open source — laporan bug kecil dan perbaikan dokumentasi. Sedang mencari proyek yang ramah kontributor baru.</p>
              <a href="#" className="acard-link">Lihat kontribusi →</a>
            </div>

            <div className="acard">
              <div className="acard-hd">
                <div className="acard-ico">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                </div>
                <h3 className="acard-title">Blog Teknis</h3>
              </div>
              <p className="acard-desc">Mendokumentasikan proses belajar dari setiap proyek. Blog teknis sedang direncanakan — target tulisan pertama segera.</p>
              <a href="#" className="acard-link">Lihat blog →</a>
            </div>

            <div className="acard acard-goals">
              <div className="acard-hd">
                <div className="acard-ico">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                </div>
                <h3 className="acard-title">Target 2025</h3>
              </div>
              <ul className="goal-list">
                <li><span className="goal-dot"></span>Selesaikan 2 proyek mandiri yang bisa di-deploy</li>
                <li><span className="goal-dot"></span>Raih 1 sertifikasi cloud (AWS / GCP Essentials)</li>
                <li><span className="goal-dot"></span>Mulai blog teknis, tulis rutin tiap bulan</li>
                <li><span className="goal-dot"></span>Kirim PR pertama ke proyek open source</li>
                <li><span className="goal-dot"></span>Pelajari React atau Vue untuk frontend modern</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo"><span className="logo-bracket">[</span>IAF<span className="logo-bracket">]</span></div>
              <p>Dibangun dengan kesabaran,<br />kopi, dan banyak debugging.</p>
            </div>
            <nav className="footer-nav">
              <span className="footer-nav-hd">Navigasi</span>
              <a href="#about">Profil</a>
              <a href="#skills">Skill</a>
              <a href="#projects">Proyek</a>
              <a href="#education">Pendidikan</a>
              <a href="#activity">Aktivitas</a>
            </nav>
            <div className="footer-contact">
              <span className="footer-nav-hd">Kontak</span>
              <a href="mailto:ibni0907@gmail.com">ibni0907@gmail.com</a>
              <a href="https://linkedin.com/in/ibni" target="_blank">LinkedIn</a>
              <a href="https://github.com/Rolang-git" target="_blank">GitHub</a>
            </div>
          </div>
          <div className="footer-bar">
            <span>© 2025 Ibni Atha Fauzi · Subang, Indonesia</span>
            <a href="#top" className="back-top">
              Kembali ke atas
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5,12 12,5 19,12"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
