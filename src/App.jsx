import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#080c14",
  surface: "#0d1420",
  card: "#111827",
  border: "#1e2d42",
  accent: "#38bdf8",
  accent2: "#818cf8",
  green: "#4ade80",
  text: "#e2e8f0",
  muted: "#64748b",
  white: "#ffffff",
};

const SKILLS = [
  { name: "React.js",       icon: "⚛️",  level: 85, color: "#61dafb" },
  { name: "JavaScript ES6+",icon: "⚡",  level: 82, color: "#f7df1e" },
  { name: "HTML5",          icon: "🌐",  level: 92, color: "#e34c26" },
  { name: "CSS3",           icon: "🎨",  level: 88, color: "#264de4" },
  { name: "Redux Toolkit",  icon: "🔁",  level: 75, color: "#764abc" },
  { name: "Node.js",        icon: "🟢",  level: 70, color: "#68a063" },
  { name: "Express.js",     icon: "⚡",  level: 68, color: "#ffffff" },
  { name: "MongoDB",        icon: "🍃",  level: 65, color: "#47a248" },
  { name: "Git & GitHub",   icon: "🐙",  level: 80, color: "#f05032" },
  { name: "REST APIs",      icon: "🔗",  level: 78, color: "#38bdf8" },
];

const PROJECTS = [
  {
    title: "E-Commerce Platform",
    subtitle: "Full Stack MERN Application",
    desc: "A production-ready e-commerce platform with user authentication, product management, cart system, order tracking, and an admin dashboard with RBAC.",
    tech: ["React.js", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "JWT"],
    icon: "🛒",
    color: "#38bdf8",
    github: "https://github.com/VishwadipBadale",
    live: "#",
    highlights: ["JWT Auth + RBAC", "Redux Global State", "REST API Integration", "Admin Dashboard"],
  },
  {
    title: "Portfolio Website",
    subtitle: "Personal Brand & Showcase",
    desc: "Responsive personal portfolio built with React.js, showcasing projects, technical skills, and experience with smooth animations and clean UI.",
    tech: ["React.js", "CSS3", "JavaScript", "GitHub Pages"],
    icon: "🌐",
    color: "#818cf8",
    github: "https://github.com/VishwadipBadale",
    live: "#",
    highlights: ["Responsive Design", "Smooth Animations", "GitHub Pages Deploy", "Mobile First"],
  },
];

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

// ── Animated Counter ──────────────────────────────────────
function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = end / 40;
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 40);
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Skill Bar ─────────────────────────────────────────────
function SkillBar({ skill, delay }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setWidth(skill.level), delay);
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [skill.level, delay]);

  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>
          {skill.icon} {skill.name}
        </span>
        <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600 }}>{skill.level}%</span>
      </div>
      <div style={{ height: 6, background: COLORS.border, borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${width}%`, borderRadius: 99,
          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
          transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: `0 0 10px ${skill.color}55`,
        }} />
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────
function Navbar({ active, setActive, menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(8,12,20,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${COLORS.border}` : "none",
      padding: "0 24px", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "all 0.3s ease",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, fontSize: 16, color: "#fff", fontFamily: "Georgia, serif",
        }}>VB</div>
        <span style={{ color: COLORS.white, fontWeight: 700, fontSize: 16, letterSpacing: 0.5 }}>
          Vishwadip<span style={{ color: COLORS.accent }}>.dev</span>
        </span>
      </div>

      {/* Desktop Nav */}
      <div style={{ display: "flex", gap: 4 }} className="desktop-nav">
        {NAV_LINKS.map(link => (
          <button key={link} onClick={() => setActive(link)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600,
              color: active === link ? COLORS.accent : COLORS.muted,
              transition: "all 0.2s",
              borderBottom: active === link ? `2px solid ${COLORS.accent}` : "2px solid transparent",
            }}>
            {link}
          </button>
        ))}
      </div>

      {/* CTA */}
      <a href="mailto:vishwadipbadale777@gmail.com"
        style={{
          background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`,
          color: "#fff", border: "none", padding: "9px 20px", borderRadius: 8,
          cursor: "pointer", fontSize: 13, fontWeight: 700, textDecoration: "none",
          display: "inline-block",
        }}>
        Hire Me ✨
      </a>
    </nav>
  );
}

// ── Hero Section ──────────────────────────────────────────
function Hero({ setActive }) {
  const [typed, setTyped] = useState("");
  const roles = ["Frontend Developer", "React.js Developer", "MERN Stack Developer", "UI Enthusiast"];
  const roleRef = useRef(0);
  const charRef = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const current = roles[roleRef.current];
      if (!deleting.current) {
        setTyped(current.slice(0, charRef.current + 1));
        charRef.current++;
        if (charRef.current === current.length) { deleting.current = true; setTimeout(() => {}, 1200); }
      } else {
        setTyped(current.slice(0, charRef.current - 1));
        charRef.current--;
        if (charRef.current === 0) {
          deleting.current = false;
          roleRef.current = (roleRef.current + 1) % roles.length;
        }
      }
    }, deleting.current ? 60 : 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "80px 24px 40px", position: "relative", overflow: "hidden",
    }}>
      {/* BG glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse at 20% 40%, ${COLORS.accent}15 0%, transparent 60%),
                     radial-gradient(ellipse at 80% 20%, ${COLORS.accent2}10 0%, transparent 50%)`,
      }} />
      {/* Grid pattern */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03,
        backgroundImage: `linear-gradient(${COLORS.accent} 1px, transparent 1px),
                          linear-gradient(90deg, ${COLORS.accent} 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center" }}>
          <div>
            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: `${COLORS.accent}15`, border: `1px solid ${COLORS.accent}30`,
              borderRadius: 99, padding: "6px 16px", marginBottom: 24,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.green,
                boxShadow: `0 0 8px ${COLORS.green}`, display: "inline-block" }} />
              <span style={{ fontSize: 12, color: COLORS.accent, fontWeight: 700, letterSpacing: 1 }}>
                OPEN TO WORK
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(32px, 5vw, 56px)", fontFamily: "'Georgia', serif",
              color: COLORS.white, lineHeight: 1.15, marginBottom: 12,
            }}>
              Hi, I'm <span style={{
                background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Vishwadip</span> 👋
            </h1>

            <div style={{ fontSize: "clamp(18px, 3vw, 28px)", color: COLORS.muted, marginBottom: 20, height: 40, fontWeight: 600 }}>
              <span style={{ color: COLORS.accent2 }}>{typed}</span>
              <span style={{ color: COLORS.accent, animation: "blink 1s infinite" }}>|</span>
            </div>

            <p style={{
              fontSize: 15, color: COLORS.muted, lineHeight: 1.8,
              maxWidth: 520, marginBottom: 32,
            }}>
              MCA Graduate from Pune with <strong style={{ color: COLORS.text }}>11 months internship experience</strong> building
              scalable web apps. Passionate about clean code, great UI, and shipping real products. 🚀
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={() => setActive("Projects")}
                style={{
                  background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`,
                  color: "#fff", border: "none", padding: "13px 28px",
                  borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700,
                  boxShadow: `0 4px 20px ${COLORS.accent}40`,
                }}>
                View My Work →
              </button>
              <a href="mailto:vishwadipbadale777@gmail.com"
                style={{
                  background: "transparent", color: COLORS.accent,
                  border: `1.5px solid ${COLORS.accent}`, padding: "13px 28px",
                  borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700,
                  textDecoration: "none", display: "inline-block",
                }}>
                Contact Me
              </a>
            </div>

            {/* Socials */}
            <div style={{ display: "flex", gap: 16, marginTop: 32, alignItems: "center" }}>
              <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600 }}>Find me on:</span>
              {[
                { label: "GitHub", icon: "🐙", url: "https://github.com/VishwadipBadale" },
                { label: "LinkedIn", icon: "💼", url: "https://linkedin.com/in/vishwadip-badale" },
                { label: "Email", icon: "📧", url: "mailto:vishwadipbadale777@gmail.com" },
              ].map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    color: COLORS.muted, textDecoration: "none", fontSize: 13, fontWeight: 600,
                    padding: "6px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.color = COLORS.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.muted; }}>
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Avatar card */}
          <div style={{ position: "relative" }}>
            <div style={{
              width: 260, height: 260, borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
              background: `linear-gradient(135deg, ${COLORS.accent}20, ${COLORS.accent2}20)`,
              border: `2px solid ${COLORS.accent}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 100, position: "relative",
              boxShadow: `0 0 60px ${COLORS.accent}15`,
              animation: "float 4s ease-in-out infinite",
            }}>
              👨‍💻
              {/* floating badges */}
              {[
                { text: "React.js", top: "5%",  left: "-20%", color: COLORS.accent },
                { text: "MongoDB", top: "80%", left: "-15%", color: COLORS.green },
                { text: "Node.js", top: "10%", right: "-20%", color: "#68a063" },
                { text: "Redux",   top: "75%", right: "-15%", color: COLORS.accent2 },
              ].map(b => (
                <div key={b.text} style={{
                  position: "absolute", top: b.top, left: b.left, right: b.right,
                  background: COLORS.card, border: `1px solid ${b.color}40`,
                  borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 700,
                  color: b.color, whiteSpace: "nowrap",
                  boxShadow: `0 4px 12px rgba(0,0,0,0.3)`,
                }}>{b.text}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginTop: 56,
          padding: "24px", background: COLORS.card,
          borderRadius: 16, border: `1px solid ${COLORS.border}`,
        }}>
          {[
            { num: 11, suffix: " mo", label: "Internship Experience" },
            { num: 2,  suffix: "+",  label: "Projects Built" },
            { num: 10, suffix: "+",  label: "Tech Skills" },
            { num: 500,suffix: "+",  label: "LinkedIn Connections" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.accent, fontFamily: "Georgia, serif" }}>
                <Counter end={s.num} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About Section ─────────────────────────────────────────
function About() {
  return (
    <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionTitle title="About Me" sub="Who I am & what I do" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
        <div>
          <p style={{ color: COLORS.muted, lineHeight: 1.9, fontSize: 15, marginBottom: 16 }}>
            Hey! I'm <strong style={{ color: COLORS.text }}>Vishwadip Badale</strong>, a passionate Frontend Developer
            and MCA graduate from <strong style={{ color: COLORS.accent }}>Pune, India</strong>.
          </p>
          <p style={{ color: COLORS.muted, lineHeight: 1.9, fontSize: 15, marginBottom: 16 }}>
            I spent <strong style={{ color: COLORS.text }}>11 months at SoftGrid Info Pvt Ltd</strong> building
            real-world web applications — from React components to REST APIs, JWT auth, and MongoDB databases.
          </p>
          <p style={{ color: COLORS.muted, lineHeight: 1.9, fontSize: 15, marginBottom: 28 }}>
            I love turning ideas into pixel-perfect, performant UIs. When I'm not coding, I'm exploring new
            tech, contributing to projects, and levelling up every day. 🚀
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[["📍","Pune, Maharashtra"],["🎓","MCA Graduate 2025"],["💼","Open to Work"],["🌐","Remote / On-site"]].map(([icon, text]) => (
              <div key={text} style={{
                display: "flex", alignItems: "center", gap: 6,
                background: COLORS.card, border: `1px solid ${COLORS.border}`,
                borderRadius: 8, padding: "8px 14px", fontSize: 12, color: COLORS.text, fontWeight: 600,
              }}>{icon} {text}</div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 style={{ color: COLORS.text, fontSize: 16, fontWeight: 700, marginBottom: 20 }}>My Journey</h3>
          {[
            { year: "2018–2022", title: "B.Sc. Computer Science", sub: "College of Computer Science & IT, Latur", color: COLORS.accent2 },
            { year: "2023–2025", title: "MCA — Master of Computer Applications", sub: "Pune Cambridge Institute, Pune", color: COLORS.accent },
            { year: "May 2025", title: "Software Engineer Intern", sub: "SoftGrid Info Pvt Ltd · 11 months", color: COLORS.green },
            { year: "2026",     title: "Open to Opportunities 🚀", sub: "Frontend / Full Stack Developer roles", color: "#f59e0b" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 16, marginBottom: 20, position: "relative" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: 14, height: 14, borderRadius: "50%", background: item.color,
                  boxShadow: `0 0 10px ${item.color}`, flexShrink: 0, marginTop: 2,
                }} />
                {i < 3 && <div style={{ width: 2, flex: 1, background: COLORS.border, marginTop: 4 }} />}
              </div>
              <div style={{ paddingBottom: 8 }}>
                <span style={{ fontSize: 11, color: item.color, fontWeight: 700, letterSpacing: 0.5 }}>{item.year}</span>
                <div style={{ fontSize: 14, color: COLORS.text, fontWeight: 700, margin: "2px 0" }}>{item.title}</div>
                <div style={{ fontSize: 12, color: COLORS.muted }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Skills Section ────────────────────────────────────────
function Skills() {
  return (
    <section style={{ padding: "80px 24px", background: COLORS.surface }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle title="Technical Skills" sub="Technologies I work with" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          {/* Skill bars */}
          <div style={{
            background: COLORS.card, borderRadius: 16, padding: 28,
            border: `1px solid ${COLORS.border}`,
          }}>
            <h3 style={{ color: COLORS.text, fontSize: 15, fontWeight: 700, marginBottom: 20 }}>
              ⚡ Skill Proficiency
            </h3>
            {SKILLS.map((s, i) => <SkillBar key={s.name} skill={s} delay={i * 80} />)}
          </div>

          {/* Tech categories */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { title: "🎨 Frontend", color: COLORS.accent, techs: ["React.js", "Redux Toolkit", "JavaScript ES6+", "HTML5", "CSS3", "Responsive Design"] },
              { title: "⚙️ Backend",  color: COLORS.green,  techs: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "RBAC"] },
              { title: "🗄️ Database", color: "#f59e0b",     techs: ["MongoDB", "Mongoose ODM"] },
              { title: "🛠️ Tools",    color: COLORS.accent2, techs: ["Git", "GitHub", "Postman", "VS Code", "GitHub Pages"] },
            ].map(cat => (
              <div key={cat.title} style={{
                background: COLORS.card, borderRadius: 12, padding: 20,
                border: `1px solid ${COLORS.border}`,
              }}>
                <h4 style={{ color: cat.color, fontSize: 13, fontWeight: 700, marginBottom: 12 }}>{cat.title}</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {cat.techs.map(t => (
                    <span key={t} style={{
                      background: `${cat.color}15`, color: cat.color,
                      border: `1px solid ${cat.color}30`,
                      borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 600,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Projects Section ──────────────────────────────────────
function Projects() {
  return (
    <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionTitle title="Projects" sub="Things I've built" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
        {PROJECTS.map((p, i) => (
          <div key={i} style={{
            background: COLORS.card, borderRadius: 16,
            border: `1px solid ${COLORS.border}`, overflow: "hidden",
            transition: "all 0.3s", cursor: "default",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = p.color + "60"; e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3)`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.boxShadow = "none"; }}>
            {/* Top bar */}
            <div style={{ height: 4, background: `linear-gradient(90deg, ${p.color}, ${p.color}66)` }} />
            <div style={{ padding: 24 }}>
              {/* Icon + title */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, fontSize: 28,
                  background: `${p.color}15`, border: `1px solid ${p.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>{p.icon}</div>
                <div>
                  <h3 style={{ color: COLORS.text, fontSize: 17, fontWeight: 800, marginBottom: 2 }}>{p.title}</h3>
                  <span style={{ fontSize: 12, color: p.color, fontWeight: 600 }}>{p.subtitle}</span>
                </div>
              </div>

              <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>{p.desc}</p>

              {/* Highlights */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
                {p.highlights.map(h => (
                  <div key={h} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: COLORS.muted }}>
                    <span style={{ color: COLORS.green, fontSize: 10 }}>✓</span> {h}
                  </div>
                ))}
              </div>

              {/* Tech tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                {p.tech.map(t => (
                  <span key={t} style={{
                    background: COLORS.surface, color: COLORS.muted,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 600,
                  }}>{t}</span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: "flex", gap: 10 }}>
                <a href={p.github} target="_blank" rel="noreferrer"
                  style={{
                    flex: 1, textAlign: "center", padding: "9px",
                    background: COLORS.surface, color: COLORS.text,
                    border: `1px solid ${COLORS.border}`, borderRadius: 8,
                    textDecoration: "none", fontSize: 12, fontWeight: 700,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.color = p.color; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.text; }}>
                  🐙 GitHub
                </a>
                <a href={p.live} target="_blank" rel="noreferrer"
                  style={{
                    flex: 1, textAlign: "center", padding: "9px",
                    background: `linear-gradient(135deg, ${p.color}, ${p.color}99)`,
                    color: "#fff", borderRadius: 8, border: "none",
                    textDecoration: "none", fontSize: 12, fontWeight: 700,
                  }}>
                  🌐 Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* More projects CTA */}
        <a href="https://github.com/VishwadipBadale" target="_blank" rel="noreferrer"
          style={{
            background: "transparent", borderRadius: 16, padding: 24,
            border: `2px dashed ${COLORS.border}`, textDecoration: "none",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: 12, minHeight: 200,
            transition: "all 0.2s", cursor: "pointer",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.accent; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; }}>
          <span style={{ fontSize: 40 }}>🐙</span>
          <span style={{ color: COLORS.muted, fontSize: 14, fontWeight: 700 }}>See All on GitHub</span>
          <span style={{ color: COLORS.accent, fontSize: 12 }}>github.com/VishwadipBadale →</span>
        </a>
      </div>
    </section>
  );
}

// ── Contact Section ───────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <section style={{ padding: "80px 24px", background: COLORS.surface }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionTitle title="Get In Touch" sub="Let's build something together" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {/* Info */}
          <div>
            <p style={{ color: COLORS.muted, fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
              I'm actively looking for <strong style={{ color: COLORS.text }}>Frontend Developer</strong> and
              <strong style={{ color: COLORS.text }}> Full Stack Developer</strong> roles. Whether you have a
              job opportunity, project idea, or just want to say hi — my inbox is always open! 😊
            </p>
            {[
              { icon: "📧", label: "Email", val: "vishwadipbadale777@gmail.com", href: "mailto:vishwadipbadale777@gmail.com" },
              { icon: "📱", label: "Phone", val: "+91 7776990204",               href: "tel:+917776990204" },
              { icon: "📍", label: "Location", val: "Pune, Maharashtra, India",  href: "#" },
              { icon: "💼", label: "LinkedIn", val: "linkedin.com/in/vishwadip-badale", href: "https://linkedin.com/in/vishwadip-badale" },
            ].map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                style={{
                  display: "flex", gap: 14, alignItems: "center", marginBottom: 16,
                  textDecoration: "none", padding: "14px 16px",
                  background: COLORS.card, borderRadius: 10, border: `1px solid ${COLORS.border}`,
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.accent}
                onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
                <span style={{ fontSize: 22 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600, marginBottom: 2 }}>{c.label}</div>
                  <div style={{ fontSize: 13, color: COLORS.text, fontWeight: 600 }}>{c.val}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Form */}
          <div style={{
            background: COLORS.card, borderRadius: 16, padding: 28,
            border: `1px solid ${COLORS.border}`,
          }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
                <h3 style={{ color: COLORS.green, fontSize: 20, marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: COLORS.muted, fontSize: 14 }}>Thanks! I'll get back to you soon.</p>
                <button onClick={() => { setSent(false); setForm({ name:"", email:"", message:"" }); }}
                  style={{ marginTop: 20, background: "transparent", color: COLORS.accent,
                    border: `1px solid ${COLORS.accent}`, padding: "8px 20px",
                    borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ color: COLORS.text, fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Send a Message</h3>
                {[["name","Your Name","Recruiter / Friend"],["email","Email Address","hr@company.com"]].map(([field, label, ph]) => (
                  <div key={field} style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.muted, display: "block", marginBottom: 6 }}>{label}</label>
                    <input type={field === "email" ? "email" : "text"} value={form[field]}
                      onChange={e => setForm({ ...form, [field]: e.target.value })} placeholder={ph}
                      style={{
                        width: "100%", padding: "11px 14px", background: COLORS.surface,
                        border: `1px solid ${COLORS.border}`, borderRadius: 8,
                        color: COLORS.text, fontSize: 14, outline: "none",
                      }} />
                  </div>
                ))}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.muted, display: "block", marginBottom: 6 }}>Message</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Hi Vishwadip, I'd like to discuss a Frontend role..." rows={4}
                    style={{
                      width: "100%", padding: "11px 14px", background: COLORS.surface,
                      border: `1px solid ${COLORS.border}`, borderRadius: 8,
                      color: COLORS.text, fontSize: 14, outline: "none", resize: "vertical",
                    }} />
                </div>
                <button onClick={submit}
                  style={{
                    width: "100%", padding: "13px",
                    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`,
                    color: "#fff", border: "none", borderRadius: 10,
                    cursor: "pointer", fontSize: 14, fontWeight: 700,
                    boxShadow: `0 4px 20px ${COLORS.accent}30`,
                  }}>
                  Send Message 🚀
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section Title ─────────────────────────────────────────
function SectionTitle({ title, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <p style={{ fontSize: 12, color: COLORS.accent, fontWeight: 700, letterSpacing: 2,
        textTransform: "uppercase", marginBottom: 8 }}>{sub}</p>
      <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", color: COLORS.white,
        fontFamily: "Georgia, serif", fontWeight: 700 }}>{title}</h2>
      <div style={{ width: 48, height: 3, background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2})`,
        borderRadius: 99, margin: "12px auto 0" }} />
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      background: COLORS.bg, borderTop: `1px solid ${COLORS.border}`,
      padding: "24px", textAlign: "center",
    }}>
      <p style={{ color: COLORS.muted, fontSize: 13 }}>
        Designed & Built by{" "}
        <span style={{ color: COLORS.accent, fontWeight: 700 }}>Vishwadip Badale</span>
        {" "}· React.js · 2025
      </p>
      <p style={{ color: COLORS.border, fontSize: 12, marginTop: 6 }}>
        Open to Frontend Developer & Full Stack roles across India 🇮🇳
      </p>
    </footer>
  );
}

// ── Main App ──────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  const renderSection = () => {
    switch (active) {
      case "Home":     return <Hero setActive={setActive} />;
      case "About":    return <About />;
      case "Skills":   return <Skills />;
      case "Projects": return <Projects />;
      case "Contact":  return <Contact />;
      default:         return <Hero setActive={setActive} />;
    }
  };

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        input::placeholder, textarea::placeholder { color: #334155; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #080c14; }
        ::-webkit-scrollbar-thumb { background: #1e2d42; border-radius: 99px; }
      `}</style>

      <Navbar active={active} setActive={setActive} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main>
        {renderSection()}
      </main>

      <Footer />
    </div>
  );
}
