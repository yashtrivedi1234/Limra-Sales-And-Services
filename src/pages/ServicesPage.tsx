import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench, ShieldCheck, MapPin, Clock, Settings2, Wind,
  ArrowLeft, CheckCircle2, Star, Phone, Calendar,
  Shield, Zap, ChevronDown, ArrowUpRight, Sparkles
} from "lucide-react";
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
    --warm-light: #E8F6FC;
    --font-display: 'Inter', sans-serif;
    --font-body: 'Inter', sans-serif;
    --shadow-sm: 0 1px 3px rgba(6,149,205,0.06), 0 1px 2px rgba(6,149,205,0.04);
    --shadow-md: 0 4px 12px rgba(6,149,205,0.08), 0 2px 4px rgba(6,149,205,0.04);
    --shadow-lg: 0 12px 32px rgba(6,149,205,0.10), 0 4px 8px rgba(6,149,205,0.06);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
  }

  .services-root {
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  /* Subtle linen texture */
  .services-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.022;
    pointer-events: none;
    z-index: 1;
  }

  /* Soft grid pattern */
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

  /* Warm radial top glow */
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

  .page-wrap {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px 100px;
  }

  /* ── LISTING HERO ── */
  .listing-hero {
    padding: 80px 0 64px;
    text-align: center;
  }

  .listing-eyebrow {
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

  .listing-title {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 6vw, 5rem);
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -0.01em;
    color: var(--text);
    margin-bottom: 20px;
  }

  .listing-title em {
    font-style: italic;
    color: var(--accent);
  }

  .listing-sub {
    color: var(--muted);
    font-size: 1.05rem;
    max-width: 460px;
    margin: 0 auto;
    line-height: 1.75;
    font-weight: 400;
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

  /* Colour wash strip at top */
  .card-top-strip {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    border-radius: 20px 20px 0 0;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .service-card:hover .card-top-strip {
    opacity: 1;
  }

  /* Soft corner glow */
  .card-glow {
    position: absolute;
    top: -40px;
    right: -40px;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;
  }

  .service-card:hover .card-glow {
    opacity: 0.6;
  }

  .card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 22px;
  }

  .card-icon-wrap {
    width: 50px;
    height: 50px;
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
    width: 34px;
    height: 34px;
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

  .service-card:hover .card-arrow svg {
    color: white !important;
  }

  /* ── DETAIL PAGE ── */
  .detail-wrap {
    padding-top: 40px;
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--muted);
    background: none;
    border: 1px solid var(--border);
    border-radius: 100px;
    cursor: pointer;
    font-size: 0.85rem;
    font-family: var(--font-body);
    padding: 8px 18px 8px 14px;
    margin-bottom: 48px;
    margin-top: 45px;
    transition: color 0.2s, border-color 0.2s, background 0.2s;
    box-shadow: var(--shadow-sm);
  }

  .back-btn:hover {
    color: var(--text);
    border-color: var(--border-hover);
    background: var(--bg2);
  }

  .detail-hero {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 48px;
    align-items: flex-start;
    margin-bottom: 72px;
  }

  @media (max-width: 768px) {
    .detail-hero { grid-template-columns: 1fr; }
    .services-grid { grid-template-columns: 1fr; }
    .listing-title { font-size: 2.6rem; }
    .stats-bar { gap: 20px; padding: 16px 24px; }
    .stat-sep { display: none; }
  }

  .detail-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border-radius: 100px;
    padding: 5px 16px;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 20px;
    background: var(--bg3);
    border: 1px solid var(--border);
    color: var(--text2);
  }

  .detail-title {
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 5vw, 3.6rem);
    font-weight: 400;
    letter-spacing: -0.01em;
    line-height: 1.1;
    margin-bottom: 12px;
    color: var(--text);
  }

  .detail-tagline {
    color: var(--warm);
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 22px;
  }

  .detail-long-desc {
    color: var(--text2);
    font-size: 1rem;
    line-height: 1.85;
    max-width: 560px;
    margin-bottom: 36px;
    font-weight: 400;
  }

  .detail-meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
  }

  .detail-meta-item {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 0.88rem;
    color: var(--text2);
  }

  /* CTA CARD */
  .cta-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 32px 28px;
    box-shadow: var(--shadow-md);
    position: sticky;
    top: 24px;
  }

  .cta-price {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 400;
    color: var(--text);
    margin-bottom: 4px;
  }

  .cta-duration {
    color: var(--muted);
    font-size: 0.82rem;
    margin-bottom: 28px;
  }

  .btn-primary {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 15px;
    border-radius: 12px;
    background: var(--accent);
    color: #ffffff;
    font-weight: 600;
    font-size: 0.93rem;
    font-family: var(--font-body);
    border: none;
    cursor: pointer;
    margin-bottom: 10px;
    box-shadow: 0 4px 14px rgba(3,105,161,0.25);
    transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
    text-decoration: none;
  }

  .btn-primary:hover {
    background: #0284c7;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(3,105,161,0.3);
  }

  .btn-secondary {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    background: var(--bg3);
    color: var(--text);
    font-weight: 500;
    font-size: 0.88rem;
    font-family: var(--font-body);
    border: 1px solid var(--border);
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
    text-decoration: none;
  }

  .btn-secondary:hover {
    background: #e8e2d8;
    border-color: var(--border-hover);
  }

  .cta-trust {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid var(--border);
  }

  .trust-item {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 10px;
    color: var(--muted);
    font-size: 0.82rem;
  }

  /* SECTIONS */
  .section {
    margin-bottom: 72px;
  }

  .section-title {
    font-family: var(--font-display);
    font-size: 1.7rem;
    font-weight: 400;
    letter-spacing: -0.01em;
    margin-bottom: 32px;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* HIGHLIGHTS */
  .highlights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: 12px;
  }

  .highlight-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 20px;
    border-radius: 14px;
    background: var(--bg2);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
  }

  .highlight-check {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--accent-light);
    border: 1px solid var(--accent-mid);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* PROCESS */
  .process-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  .process-card {
    padding: 24px;
    border-radius: 18px;
    background: var(--bg2);
    border: 1px solid var(--border);
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: box-shadow 0.2s, border-color 0.2s;
  }

  .process-card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--border-hover);
  }

  .process-ghost-num {
    position: absolute;
    top: 12px;
    right: 16px;
    font-family: var(--font-display);
    font-size: 3.5rem;
    font-weight: 400;
    color: rgba(0,0,0,0.04);
    line-height: 1;
    user-select: none;
  }

  .process-badge {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--accent-light);
    border: 1px solid var(--accent-mid);
    margin-bottom: 14px;
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--accent);
    font-family: var(--font-body);
    letter-spacing: 0.04em;
  }

  .process-card h4 {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 8px;
    color: var(--text);
  }

  .process-card p {
    color: var(--muted);
    font-size: 0.85rem;
    line-height: 1.75;
  }

  /* FAQ */
  .faq-item {
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid var(--border);
    margin-bottom: 8px;
    transition: border-color 0.3s, box-shadow 0.3s;
    background: var(--bg2);
    box-shadow: var(--shadow-sm);
  }

  .faq-item.open {
    border-color: rgba(3,105,161,0.3);
    box-shadow: 0 4px 16px rgba(3,105,161,0.08);
  }

  .faq-btn {
    width: 100%;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 18px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    text-align: left;
    transition: background 0.15s;
  }

  .faq-btn:hover {
    background: var(--bg3);
  }

  .faq-question {
    color: var(--text);
    font-weight: 500;
    font-size: 0.93rem;
    font-family: var(--font-body);
  }

  .faq-answer {
    padding: 0 22px 18px;
    color: var(--muted);
    font-size: 0.88rem;
    line-height: 1.8;
    overflow: hidden;
    background: var(--bg3);
  }

  .faq-chevron-wrap {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--bg3);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s;
  }

  .faq-item.open .faq-chevron-wrap {
    background: var(--accent-light);
    border-color: var(--accent-mid);
  }

  /* RELATED */
  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 12px;
  }

  .related-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 18px 20px;
    border-radius: 16px;
    background: var(--bg2);
    border: 1px solid var(--border);
    cursor: pointer;
    transition: border-color 0.3s, transform 0.2s, box-shadow 0.2s;
    box-shadow: var(--shadow-sm);
  }

  .related-card:hover {
    border-color: rgba(3,105,161,0.3);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .related-icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: var(--accent-light);
    border: 1px solid var(--accent-mid);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .related-info { flex: 1; }
  .related-name {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: 0.95rem;
    margin-bottom: 2px;
    color: var(--text);
  }
  .related-price { color: var(--muted); font-size: 0.78rem; }

  /* Divider accent line */
  .accent-divider {
    width: 48px;
    height: 3px;
    background: var(--accent);
    border-radius: 2px;
    margin: 16px auto 0;
    opacity: 0.6;
  }
`;

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className={`faq-item ${open ? "open" : ""}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <button className="faq-btn" onClick={() => setOpen((o) => !o)}>
        <span className="faq-question">{faq.q}</span>
        <div className="faq-chevron-wrap">
          <motion.span animate={{ rotate: open ? 180 : 0 }} style={{ display: "flex" }}>
            <ChevronDown size={15} color={open ? "#0369a1" : "#94a3b8"} />
          </motion.span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="faq-answer">{faq.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── SERVICE CARD (listing) ───────────────────────────────────────────────────
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
      {/* Top accent strip */}
      <div
        className="card-top-strip"
        style={{ background: `linear-gradient(90deg, ${hsl}, hsl(${hue}, 50%, 60%))` }}
      />

      {/* Corner glow */}
      <div
        className="card-glow"
        style={{ background: `radial-gradient(circle, ${hslGlow} 0%, transparent 70%)` }}
      />

      <div className="card-top">
        <div
          className="card-icon-wrap"
          style={{ background: hslLight, borderColor: hslBorder }}
        >
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

// ─── DETAIL PAGE ──────────────────────────────────────────────────────────────
function DetailPage({ slug, onBack, onNavigate, services }: any) {
  const service = services?.find((s: any) => s.slug === slug);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [slug]);

  if (!service) return null;
  const Icon = renderIcon(service.icon);
  const hue = service.accentHue || "195";
  const hsl = `hsl(${hue}, 65%, 40%)`;
  const hslLight = `hsl(${hue}, 70%, 94%)`;
  const hslBorder = `hsl(${hue}, 60%, 82%)`;
  const related = services?.filter((s: any) => s.slug !== slug).slice(0, 3) || [];

  return (
    <motion.div
      className="detail-wrap"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Back */}
      

      {/* Hero grid */}
      <div className="detail-hero">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
          <div className="detail-badge">
            <Icon size={12} color={hsl} />
            <span style={{ color: hsl }}>{service.badge}</span>
          </div>

          <h1 className="detail-title">{service.title}</h1>
          <p className="detail-tagline">{service.tagline}</p>
          <p className="detail-long-desc">{service.longDesc}</p>

          <div className="detail-meta-row">
            <div className="detail-meta-item">
              <Star size={15} color="#d97706" fill="#d97706" />
              <strong style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>{service.rating}</strong>
              <span style={{ color: "var(--muted)", fontSize: "0.83rem" }}>({service.reviews} reviews)</span>
            </div>
            <div className="detail-meta-item">
              <Clock size={14} color="var(--accent)" />
              <span style={{ color: "var(--muted)" }}>{service.duration}</span>
            </div>
            <div className="detail-meta-item">
              <Zap size={14} color="var(--accent)" />
              <strong style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>{service.price}</strong>
            </div>
          </div>
        </motion.div>

        {/* CTA Card */}
        <motion.div
          className="cta-card"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="cta-price">{service.price}</div>
          <div className="cta-duration">{service.duration}</div>

          <a href={`/book?service=${service.slug}`} className="btn-primary">
            <Calendar size={15} /> Book Now
          </a>
          <a href="tel:+911234567890" className="btn-secondary">
            <Phone size={14} /> Call Us
          </a>

          <div className="cta-trust">
            {[
              { icon: Shield, text: "Certified technicians" },
              { icon: Star, text: "Satisfaction guarantee" },
            ].map(({ icon: I, text }) => (
              <div key={text} className="trust-item">
                <I size={13} color="var(--accent)" />
                {text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* What's Included */}
      <div className="section">
        <h2 className="section-title">What's Included</h2>
        <div className="highlights-grid">
          {service.highlights && service.highlights.map((h: string, i: number) => (
            <motion.div
              key={h}
              className="highlight-item"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <div className="highlight-check">
                <CheckCircle2 size={14} color="var(--accent)" />
              </div>
              <span style={{ fontSize: "0.88rem", fontWeight: 500, color: "var(--text2)" }}>{h}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="section">
        <h2 className="section-title">How It Works</h2>
        <div className="process-grid">
          {service.process && service.process.map((p: any, i: number) => (
            <motion.div
              key={p.step}
              className="process-card"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <div className="process-ghost-num">{p.step}</div>
              <div className="process-badge">{p.step}</div>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="section">
        <h2 className="section-title">FAQ</h2>
        {service.faqs && service.faqs.map((faq: any, i: number) => (
          <FAQItem key={i} faq={faq} index={i} />
        ))}
      </div>

      {/* Related */}
      <div className="section">
        <h2 className="section-title">Other Services</h2>
        <div className="related-grid">
          {related && related.map((s: any, i: number) => {
            const RelIcon = renderIcon(s.icon);
            return (
              <motion.div
                key={s.slug}
                className="related-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => onNavigate(s.slug)}
              >
                <div className="related-icon-wrap">
                  <RelIcon size={18} color="var(--accent)" />
                </div>
                <div className="related-info">
                  <div className="related-name">{s.title}</div>
                  <div className="related-price">{s.price}</div>
                </div>
                <ArrowUpRight size={15} color="var(--accent)" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ─── LISTING PAGE ─────────────────────────────────────────────────────────────
function ListingPage({ onSelect, services }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
    >
      <div className="listing-hero">
        <motion.div
          className="listing-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Sparkles size={12} />
          Premium AC Services
        </motion.div>

        <motion.h1
          className="listing-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.17 }}
        >
          Every Service<br />
          <em>You Need</em>
        </motion.h1>

        <div className="accent-divider" />

        <motion.p
          className="listing-sub"
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
            <>
              {i > 0 && <div key={`sep-${i}`} className="stat-sep" />}
              <div key={s.num} className="stat-item">
                {s.icon}
                <span className="stat-num">{s.num}</span>
                <span>{s.label}</span>
              </div>
            </>
          ))}
        </motion.div>
      </div>

      <div className="services-grid">
        {services && services.map((service: any, i: number) => (
          <ServiceCard key={service.slug || service._id} service={service} onClick={onSelect} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function ServicesApp() {
  const [activeSlug, setActiveSlug] = useState(null);
  const { data: services = [], isLoading } = useGetServicesQuery();

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <>
      <style>{css}</style>
      <div className="services-root">
        <div className="dot-grid" />
        <div className="bg-glow" />
        <div className="page-wrap">
          <AnimatePresence mode="wait">
            {activeSlug === null ? (
              <ListingPage key="listing" onSelect={(slug: any) => setActiveSlug(slug)} services={services} />
            ) : (
              <DetailPage
                key={activeSlug}
                slug={activeSlug}
                services={services}
                onBack={() => setActiveSlug(null)}
                onNavigate={(slug: any) => setActiveSlug(slug)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}