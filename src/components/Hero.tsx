import { motion } from "framer-motion";
import { Phone, ShoppingCart, Eye, CheckCircle, MapPin } from "lucide-react";
import { BRAND } from "@/lib/colors";
import type { CSSProperties } from "react";

const badges = [
  { icon: CheckCircle, text: "Free Site Visit & Consultation" },
  { icon: CheckCircle, text: "Expert Installation Team" },
  { icon: MapPin, text: "Uttar Pradesh" },
];

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.darkMid} 45%, ${BRAND.primary} 100%)`,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Grid overlay */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.07, backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />

      {/* Right photo */}
      <div style={{ position: "absolute", right: 0, top: 0, width: "48%", height: "100%", zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop"
          alt="HVAC technician installing air conditioning unit"
          loading="eager"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${BRAND.dark} 0%, ${BRAND.dark}B3 40%, ${BRAND.dark}1A 100%)` }} />
      </div>

      {/* Diagonal slice */}
      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: "120px", zIndex: 5, background: BRAND.white, clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0% 100%)" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "100px 48px 120px" }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "inline-block",
            background: `${BRAND.primary}33`,
            border: `1px solid ${BRAND.primary}66`,
            color: BRAND.accentOnDark,
            fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.18em", textTransform: "uppercase" as const,
            padding: "5px 16px", borderRadius: "100px", marginBottom: "24px",
          }}
        >
          HVAC & Air Conditioning Experts
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(2.2rem, 5vw, 4.2rem)",
            lineHeight: 1.1, letterSpacing: "-0.02em",
            color: BRAND.white, fontWeight: 800,
            marginBottom: "20px", maxWidth: "min(95vw, 690px)", wordBreak: "break-word",
          }}
        >
          Professional HVAC Solutions <span style={{ color: BRAND.accentOnDark }}>&amp; Air Conditioning Services</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            color: BRAND.textOnDark, fontSize: "1.05rem", lineHeight: 1.75,
            maxWidth: "480px", marginBottom: "36px", fontWeight: 400,
          }}
        >
          Expert installation, servicing & commercial HVAC projects across Uttar Pradesh. Trusted by 50,000+ satisfied customers.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "36px" }}
        >
          <a href="tel:+919839171701" style={btnPrimary}>
            <Phone size={16} fill="white" stroke="none" /> Call Now — Free Consultation
          </a>
          <a href="#products" style={btnOutline}>
            <Eye size={16} /> View Products
          </a>
          <a href="#shop" style={btnGhost}>
            <ShoppingCart size={16} /> Shop Online
          </a>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            display: "flex", flexWrap: "wrap", gap: "20px",
            borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: "32px",
          }}
        >
          {badges.map((b, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: BRAND.textOnDarkMuted, fontSize: "0.84rem" }}>
              <b.icon size={14} style={{ color: BRAND.accentOnDark }} /> {b.text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const btnPrimary: CSSProperties = {
  background: BRAND.primary,
  color: "#fff", fontWeight: 700, fontSize: "0.9rem",
  letterSpacing: "0.05em", textTransform: "uppercase",
  padding: "14px 28px", borderRadius: "8px", border: "none",
  display: "inline-flex", alignItems: "center", gap: "8px",
  cursor: "pointer", textDecoration: "none",
};

const btnOutline: CSSProperties = {
  background: "transparent",
  color: "#fff", fontWeight: 700, fontSize: "0.9rem",
  letterSpacing: "0.05em", textTransform: "uppercase",
  padding: "13px 28px", borderRadius: "8px",
  border: "2px solid rgba(255,255,255,0.35)",
  display: "inline-flex", alignItems: "center", gap: "8px",
  cursor: "pointer", textDecoration: "none",
};

const btnGhost: CSSProperties = {
  background: "rgba(255,255,255,0.12)",
  color: BRAND.accentOnDark, fontWeight: 700, fontSize: "0.9rem",
  letterSpacing: "0.05em", textTransform: "uppercase",
  padding: "14px 28px", borderRadius: "8px",
  border: `1px solid ${BRAND.accentOnDark}4D`,
  display: "inline-flex", alignItems: "center", gap: "8px",
  cursor: "pointer", textDecoration: "none",
};
