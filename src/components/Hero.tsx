import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Eye, CheckCircle, MapPin } from "lucide-react";
import heroImage from "@/assets/heroimage.webp";
import type { CSSProperties } from "react";

const badges = [
  { icon: CheckCircle, text: "Free Site Visit & Consultation" },
  { icon: CheckCircle, text: "Expert Installation Team" },
  { icon: MapPin,      text: "Uttar Pradesh" },
];

export default function HeroSection() {
  return (
    <section
      className="bg-hero-gradient"
      style={{
        position: "relative", width: "100%", height: "100vh",
        overflow: "hidden", display: "flex", alignItems: "center",
      }}
    >
      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.07,
        backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }} />

      {/* Right photo */}
      <div style={{ position: "absolute", right: "2%", top: 0, width: "46%", height: "100%", zIndex: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          src={heroImage}
          alt="HVAC technician installing air conditioning unit"
          loading="eager"
          style={{ width: "100%", height: "85%", objectFit: "contain", objectPosition: "center" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, hsl(var(--brand-dark)) 0%, hsl(var(--brand-dark) / 0.7) 25%, transparent 100%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "60px 24px 48px" }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{
            display: "inline-block",
            background: "hsl(var(--primary) / 0.2)",
            border: "1px solid hsl(var(--primary) / 0.4)",
            color: "hsl(var(--brand-sky))",
            fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.18em", textTransform: "uppercase" as const,
            padding: "5px 16px", borderRadius: "100px",
            marginTop: "50px", marginBottom: "50px",
          }}
        >
          HVAC & Air Conditioning Experts
        </motion.div>

        {/* h1 — global: DM Serif Display, 400, brand-dark. Override color white for hero */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            color: "white",
            wordSpacing: "0.05em", letterSpacing: "0.02em",
            marginBottom: "16px", maxWidth: "min(95vw, 690px)", wordBreak: "break-word",
          }}
        >
          #1 HVAC Installation{" "}
          <span style={{ color: "hsl(var(--brand-sky))" }}>
            &amp; Service Experts in Uttar Pradesh
          </span>{" "}
          Trusted by 5,000+ Customers Since 2017
        </motion.h1>

        {/* body-text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="body-text"
          style={{ color: "hsl(var(--brand-sky) / 0.8)", maxWidth: "480px", marginBottom: "32px", fontWeight: 400 }}
        >
          Industrial | Commercial | Residential HVAC Solutions in Lucknow &amp; Across UP
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "32px" }}
        >
          <Link to="/contact" style={btnPrimary}>
            <Phone size={16} fill="white" stroke="none" /> Get Free Site Inspection
          </Link>
          <Link to="/case-studies" style={btnOutline}>
            <Eye size={16} /> View Our Projects
          </Link>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "20px", borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: "0px" }}
        >
          {badges.map((b, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "hsl(var(--brand-sky) / 0.7)", fontSize: "0.84rem" }}>
              <b.icon size={14} style={{ color: "hsl(var(--brand-sky))" }} /> {b.text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const btnPrimary: CSSProperties = {
  background: "hsl(var(--primary))",
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