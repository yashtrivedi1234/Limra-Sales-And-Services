import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, CheckCircle2, Clock, Star, Phone,
  Calendar, Shield, Zap, ChevronDown, ArrowUpRight,
} from "lucide-react";

// ✅ Pull data from the dedicated data file
import { services, getService } from "../data/servicesData";

// ─── Design tokens ────────────────────────────────────────────────────────────
const BRAND = {
  dark:       "#0a0f1e",
  darkMid:    "#0d1730",
  primary:    "#1a3a6e",
  accent:     "#38bdf8",
  accentWarm: "#f0a500",
  white:      "#ffffff",
  textMuted:  "rgba(255,255,255,0.55)",
};

// ─── FAQ accordion ────────────────────────────────────────────────────────────
function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${open ? BRAND.accent + "44" : "rgba(255,255,255,0.1)"}`,
        transition: "border-color 0.3s",
        marginBottom: 12,
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.04)",
          border: "none",
          cursor: "pointer",
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <span
          style={{
            color: BRAND.white,
            fontWeight: 600,
            fontSize: "0.95rem",
            textAlign: "left",
            fontFamily: "'Sora', sans-serif",
          }}
        >
          {faq.q}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} style={{ flexShrink: 0 }}>
          <ChevronDown size={18} style={{ color: BRAND.accent }} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "0 24px 20px",
                color: BRAND.textMuted,
                fontSize: "0.9rem",
                lineHeight: 1.8,
              }}
            >
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────
export default function ServiceDetailPage({ slug }) {
  // getService returns undefined if slug is unknown; fall back to first service
  const service = getService(slug) ?? services[0];
  const Icon = service.icon;

  // Related = up to 3 other services
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(160deg, ${BRAND.dark} 0%, ${BRAND.darkMid} 60%, ${BRAND.primary} 100%)`,
        fontFamily: "'Inter', sans-serif",
        position: "relative",
      }}
    >
      {/* Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');`}</style>

      {/* Dot-grid background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          opacity: 0.25,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Glow orb */}
      <div
        style={{
          position: "fixed",
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BRAND.accent}14 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "48px 32px 120px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* ── Back nav ─────────────────────────────────────────────────── */}
        <motion.a
          href="/services"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: BRAND.textMuted,
            textDecoration: "none",
            fontSize: "0.9rem",
            marginBottom: 48,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = BRAND.white)}
          onMouseLeave={(e) => (e.currentTarget.style.color = BRAND.textMuted)}
        >
          <ArrowLeft size={16} />
          All Services
        </motion.a>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 32,
            alignItems: "flex-start",
            marginBottom: 72,
            flexWrap: "wrap",
          }}
        >
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 100,
                padding: "5px 14px",
                marginBottom: 20,
              }}
            >
              <Icon size={13} style={{ color: BRAND.accent }} />
              <span
                style={{
                  color: BRAND.accent,
                  fontWeight: 700,
                  fontSize: "0.68rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                {service.badge}
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
                fontWeight: 800,
                color: BRAND.white,
                lineHeight: 1.1,
                marginBottom: 16,
                fontFamily: "'Sora', sans-serif",
              }}
            >
              {service.title}
            </h1>

            <p
              style={{
                color: BRAND.accentWarm,
                fontWeight: 600,
                fontSize: "1.05rem",
                marginBottom: 18,
                fontFamily: "'Sora', sans-serif",
              }}
            >
              {service.tagline}
            </p>

            <p
              style={{
                color: BRAND.textMuted,
                fontSize: "1rem",
                maxWidth: 560,
                lineHeight: 1.85,
                marginBottom: 32,
              }}
            >
              {service.longDesc}
            </p>

            {/* Meta row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 20,
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Star size={16} style={{ color: BRAND.accentWarm, fill: BRAND.accentWarm }} />
                <span style={{ color: BRAND.white, fontWeight: 700 }}>
                  {service.rating}
                </span>
                <span style={{ color: BRAND.textMuted, fontSize: "0.85rem" }}>
                  ({service.reviews} reviews)
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Clock size={15} style={{ color: BRAND.accent }} />
                <span style={{ color: BRAND.textMuted, fontSize: "0.9rem" }}>
                  {service.duration}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Zap size={15} style={{ color: BRAND.accent }} />
                <span style={{ color: BRAND.white, fontWeight: 700 }}>
                  {service.price}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right — CTA card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              minWidth: 260,
              padding: "32px 28px",
              borderRadius: 24,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              style={{
                color: BRAND.white,
                fontWeight: 800,
                fontSize: "1.6rem",
                marginBottom: 4,
                fontFamily: "'Sora', sans-serif",
              }}
            >
              {service.price}
            </div>
            <div
              style={{ color: BRAND.textMuted, fontSize: "0.8rem", marginBottom: 24 }}
            >
              {service.duration}
            </div>

            <motion.a
              href={`/book?service=${service.slug}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                width: "100%",
                padding: "14px 0",
                borderRadius: 100,
                background: `linear-gradient(135deg, ${BRAND.accent}, #0ea5e9)`,
                color: BRAND.dark,
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "0.95rem",
                marginBottom: 12,
                fontFamily: "'Sora', sans-serif",
                boxShadow: `0 8px 24px ${BRAND.accent}40`,
              }}
            >
              <Calendar size={16} /> Book Now
            </motion.a>

            <motion.a
              href="tel:+911234567890"
              whileHover={{ scale: 1.03 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                width: "100%",
                padding: "13px 0",
                borderRadius: 100,
                border: "1px solid rgba(255,255,255,0.2)",
                color: BRAND.white,
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "0.9rem",
                fontFamily: "'Sora', sans-serif",
              }}
            >
              <Phone size={15} /> Call Us
            </motion.a>

            <div
              style={{
                marginTop: 24,
                paddingTop: 20,
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {[
                { icon: Shield, text: "Certified technicians" },
                { icon: Star,   text: "Satisfaction guarantee" },
              ].map(({ icon: I, text }) => (
                <div
                  key={text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <I size={13} style={{ color: BRAND.accent }} />
                  <span style={{ color: BRAND.textMuted, fontSize: "0.82rem" }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── HIGHLIGHTS ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 72 }}
        >
          <h2
            style={{
              color: BRAND.white,
              fontWeight: 800,
              fontSize: "1.5rem",
              marginBottom: 28,
              fontFamily: "'Sora', sans-serif",
            }}
          >
            What's Included
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {service.highlights.map((h, i) => (
              <motion.div
                key={h}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "18px 20px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <CheckCircle2
                  size={18}
                  style={{ color: BRAND.accent, flexShrink: 0 }}
                />
                <span
                  style={{
                    color: BRAND.white,
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                >
                  {h}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 72 }}
        >
          <h2
            style={{
              color: BRAND.white,
              fontWeight: 800,
              fontSize: "1.5rem",
              marginBottom: 36,
              fontFamily: "'Sora', sans-serif",
            }}
          >
            How It Works
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {service.process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                style={{
                  padding: 24,
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Ghost step number */}
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 20,
                    fontSize: "2.4rem",
                    fontWeight: 900,
                    color: "rgba(255,255,255,0.04)",
                    fontFamily: "'Sora', sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {p.step}
                </div>

                {/* Step badge */}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: `${BRAND.accent}20`,
                    border: `1px solid ${BRAND.accent}44`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      color: BRAND.accent,
                      fontWeight: 800,
                      fontSize: "0.75rem",
                      fontFamily: "'Sora', sans-serif",
                    }}
                  >
                    {p.step}
                  </span>
                </div>

                <h4
                  style={{
                    color: BRAND.white,
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    marginBottom: 8,
                    fontFamily: "'Sora', sans-serif",
                  }}
                >
                  {p.title}
                </h4>
                <p
                  style={{
                    color: BRAND.textMuted,
                    fontSize: "0.85rem",
                    lineHeight: 1.75,
                  }}
                >
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 80 }}
        >
          <h2
            style={{
              color: BRAND.white,
              fontWeight: 800,
              fontSize: "1.5rem",
              marginBottom: 28,
              fontFamily: "'Sora', sans-serif",
            }}
          >
            Frequently Asked Questions
          </h2>
          {service.faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </motion.div>

        {/* ── RELATED SERVICES ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            style={{
              color: BRAND.white,
              fontWeight: 800,
              fontSize: "1.5rem",
              marginBottom: 28,
              fontFamily: "'Sora', sans-serif",
            }}
          >
            Other Services
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {related.map((s, i) => {
              const RelIcon = s.icon;
              return (
                <motion.a
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: 20,
                    borderRadius: 18,
                    textDecoration: "none",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    transition: "border-color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = `${BRAND.accent}44`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      flexShrink: 0,
                      background: `${BRAND.accent}18`,
                      border: `1px solid ${BRAND.accent}33`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <RelIcon size={20} style={{ color: BRAND.accent }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        color: BRAND.white,
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        fontFamily: "'Sora', sans-serif",
                      }}
                    >
                      {s.title}
                    </div>
                    <div style={{ color: BRAND.textMuted, fontSize: "0.78rem" }}>
                      {s.price}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    style={{ color: BRAND.accent, flexShrink: 0 }}
                  />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}