import React from "react";
import { motion } from "framer-motion";
import {
  Wrench, ShieldCheck, MapPin, Settings2, Wind,
  Clock, Star, Sparkles, ArrowUpRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetServicesQuery } from "@/store/api";
import Loader from "@/components/ui/Loader";

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'ShieldCheck': return ShieldCheck;
    case 'MapPin': return MapPin;
    case 'Settings2': return Settings2;
    case 'Wind': return Wind;
    default: return Wrench;
  }
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #F4FAFE;
    --bg2: #ffffff;
    --bg3: #E8F6FC;
    --border: rgba(6,149,205,0.12);
    --border-hover: rgba(6,149,205,0.25);
    --text: #082A45;
    --text2: #0E3D5E;
    --muted: rgba(8,42,69,0.48);
    --accent: #0695CD;
    --accent-light: #E8F6FC;
    --accent-mid: #B3E0F2;
    --warm: #0695CD;
    --font-display: 'DM Serif Display', serif;
    --font-body: 'DM Sans', sans-serif;
    --shadow-sm: 0 1px 3px rgba(6,149,205,0.06), 0 1px 2px rgba(6,149,205,0.04);
    --shadow-md: 0 4px 12px rgba(6,149,205,0.08), 0 2px 4px rgba(6,149,205,0.04);
    --shadow-lg: 0 12px 32px rgba(6,149,205,0.10), 0 4px 8px rgba(6,149,205,0.06);
  }

  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text); font-family: var(--font-body); -webkit-font-smoothing: antialiased; }

  .sp-root {
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  .sp-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.022;
    pointer-events: none;
    z-index: 1;
  }

  .dot-grid {
    position: fixed;
    inset: 0;
    background-image: 
      linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }

  .bg-glow {
    position: fixed;
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 600px;
    background: radial-gradient(ellipse at center, rgba(186,230,253,0.35) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .sp-wrap {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px 100px;
  }

  /* ── HERO ── */
  .sp-hero {
    padding: 80px 0 64px;
    text-align: center;
  }

  .sp-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--accent-light);
    border: 1px solid var(--accent-mid);
    border-radius: 100px;
    padding: 6px 16px;
    color: var(--accent);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 28px;
  }

  .sp-title {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 6vw, 5rem);
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -0.01em;
    color: var(--text);
    margin-bottom: 20px;
  }

  .sp-title em {
    font-style: italic;
    color: var(--accent);
  }

  .sp-sub {
    color: var(--muted);
    font-size: 1.05rem;
    max-width: 460px;
    margin: 0 auto;
    line-height: 1.75;
    font-weight: 400;
  }

  .accent-divider {
    width: 48px;
    height: 3px;
    background: var(--accent);
    border-radius: 2px;
    margin: 16px auto 0;
    opacity: 0.6;
  }

  /* ── STATS BAR ── */
  .stats-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    margin-top: 40px;
    padding: 20px 36px;
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 100px;
    box-shadow: var(--shadow-sm);
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    flex-wrap: wrap;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.85rem;
    color: var(--muted);
    white-space: nowrap;
  }

  .stat-num {
    font-family: var(--font-display);
    font-size: 1.2rem;
    color: var(--text);
    font-weight: 400;
  }

  .stat-sep {
    width: 1px;
    height: 24px;
    background: var(--border);
  }

  /* ── GRID ── */
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 18px;
    margin-top: 48px;
  }

  .service-card {
    position: relative;
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 30px;
    cursor: pointer;
    overflow: hidden;
    transition: border-color 0.3s, transform 0.2s, box-shadow 0.3s;
    text-align: left;
    box-shadow: var(--shadow-sm);
  }

  .service-card:hover {
    border-color: var(--border-hover);
    box-shadow: var(--shadow-lg);
  }

  .card-top-strip {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    border-radius: 20px 20px 0 0;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .service-card:hover .card-top-strip { opacity: 1; }

  .card-glow {
    position: absolute;
    top: -40px; right: -40px;
    width: 160px; height: 160px;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;
  }

  .service-card:hover .card-glow { opacity: 0.6; }

  .card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 22px;
  }

  .card-icon-wrap {
    width: 50px; height: 50px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid;
  }

  .card-badge {
    font-size: 0.67rem;
    font-weight: 600;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 100px;
    border: 1px solid;
  }

  .card-title {
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 400;
    letter-spacing: -0.01em;
    color: var(--text);
    margin-bottom: 6px;
  }

  .card-tagline {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--warm);
    margin-bottom: 12px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .card-desc {
    color: var(--muted);
    font-size: 0.88rem;
    line-height: 1.75;
    margin-bottom: 26px;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 18px;
    border-top: 1px solid var(--border);
  }

  .card-meta {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .card-meta-item {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--muted);
    font-size: 0.78rem;
  }

  .card-price {
    font-family: var(--font-display);
    font-size: 1.05rem;
    font-weight: 400;
    color: var(--text);
  }

  .card-arrow {
    width: 34px; height: 34px;
    border-radius: 50%;
    background: var(--accent-light);
    border: 1px solid var(--accent-mid);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, transform 0.2s;
  }

  .service-card:hover .card-arrow {
    background: var(--accent);
    border-color: var(--accent);
  }

  .service-card:hover .card-arrow svg { color: white !important; }

  @media (max-width: 768px) {
    .services-grid { grid-template-columns: 1fr; }
    .sp-title { font-size: 2.6rem; }
    .stats-bar { gap: 20px; padding: 16px 24px; }
    .stat-sep { display: none; }
  }
`;

// ─── SERVICE CARD ─────────────────────────────────────────────────────────────
function ServiceCard({ service, onClick, index }: any) {
  const Icon = renderIcon(service.icon);
  const hue = service.accentHue || "195";
  const hsl = `hsl(${hue}, 65%, 40%)`;
  const hslLight = `hsl(${hue}, 70%, 94%)`;
  const hslBorder = `hsl(${hue}, 60%, 82%)`;
  const hslGlow = `hsl(${hue}, 70%, 88%)`;

  return (
    <motion.div
      className="service-card"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      onClick={() => onClick(service.slug)}
    >
      <div
        className="card-top-strip"
        style={{ background: `linear-gradient(90deg, ${hsl}, hsl(${hue}, 50%, 60%))` }}
      />
      <div
        className="card-glow"
        style={{ background: `radial-gradient(circle, ${hslGlow} 0%, transparent 70%)` }}
      />

      <div className="card-top">
        <div className="card-icon-wrap" style={{ background: hslLight, borderColor: hslBorder }}>
          <Icon size={22} color={hsl} />
        </div>
        <span
          className="card-badge"
          style={{
            color: service.badgeColor || "#d97706",
            borderColor: `${service.badgeColor || "#d97706"}30`,
            background: `${service.badgeColor || "#d97706"}12`,
          }}
        >
          {service.badge || "Standard"}
        </span>
      </div>

      <div className="card-title">{service.title}</div>
      <div className="card-tagline">{service.tagline}</div>
      <div className="card-desc">{service.desc}</div>

      <div className="card-footer">
        <div className="card-meta">
          <span className="card-meta-item">
            <Star size={13} color="#d97706" fill="#d97706" />
            <span style={{ color: "var(--text)", fontWeight: 600 }}>{service.rating || "4.9"}</span>
            <span>({service.reviews || "120"})</span>
          </span>
          <span className="card-meta-item">
            <Clock size={13} color="var(--accent)" />
            {service.duration || "2 hrs"}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="card-price">{service.price}</span>
          <div className="card-arrow">
            <ArrowUpRight size={15} color="var(--accent)" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const navigate = useNavigate();
  const { data: services = [], isLoading } = useGetServicesQuery();

  if (isLoading) return <Loader fullScreen />;

  const handleSelect = (slug: string) => {
    navigate(`/service/${slug}`);
  };

  return (
    <>
      <style>{css}</style>
      <div className="sp-root">
        <div className="dot-grid" />
        <div className="bg-glow" />
        <div className="sp-wrap">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
            {/* Hero */}
            <div className="sp-hero">
              <motion.div
                className="sp-eyebrow"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Sparkles size={12} />
                Premium AC Services
              </motion.div>

              <motion.h1
                className="sp-title"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.17 }}
              >
                Every Service<br /><em>You Need</em>
              </motion.h1>

              <div className="accent-divider" />

              <motion.p
                className="sp-sub"
                style={{ marginTop: 24 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
              >
                From day-one installation to year-round maintenance — certified technicians, transparent pricing.
              </motion.p>

              <motion.div
                className="stats-bar"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34 }}
              >
                {[
                  { num: "10,000+", label: "Jobs done" },
                  { num: "4.85", label: "Avg. rating", icon: <Star size={13} fill="#d97706" color="#d97706" /> },
                  { num: "48 hrs", label: "Avg. response" },
                  { num: "6", label: "Services" },
                ].map((s, i) => (
                  <React.Fragment key={s.num}>
                    {i > 0 && <div className="stat-sep" />}
                    <div className="stat-item">
                      {s.icon}
                      <span className="stat-num">{s.num}</span>
                      <span>{s.label}</span>
                    </div>
                  </React.Fragment>
                ))}
              </motion.div>
            </div>

            {/* Grid */}
            <div className="services-grid">
              {services.map((service: any, i: number) => (
                <ServiceCard
                  key={service.slug || service._id}
                  service={service}
                  onClick={handleSelect}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}