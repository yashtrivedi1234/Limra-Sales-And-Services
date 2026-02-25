import { motion } from "framer-motion";
import { Phone, ShoppingCart, Eye, CheckCircle, MapPin } from "lucide-react";

const stats = [
  { value: "50,000+", label: "AC Installations" },
  { value: "500+", label: "Projects" },
  { value: "25+", label: "Years Experience" },
];

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
        background:
          "linear-gradient(135deg, #0B1F4B 0%, #1D3A7A 45%, #1D4ED8 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.07,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Right photo */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "48%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop"
          alt="HVAC technician"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, #0B1F4B 0%, rgba(11,31,75,0.7) 40%, rgba(11,31,75,0.1) 100%)",
          }}
        />
      </div>

      {/* Diagonal slice */}
      <div
        style={{
          position: "absolute",
          bottom: -2,
          left: 0,
          right: 0,
          height: "120px",
          zIndex: 5,
          background: "#F8FAFF",
          clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0% 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "100px 48px 120px",
        }}
      >
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-block",
            background: "rgba(59,130,246,0.2)",
            border: "1px solid rgba(59,130,246,0.4)",
            color: "#93C5FD",
            fontWeight: 700,
            fontSize: "0.72rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding: "5px 16px",
            borderRadius: "100px",
            marginBottom: "24px",
          }}
        >
          HVAC & Air Conditioning Experts
        </motion.div>

        {/* ✅ HERO HEADING (2 lines forced) */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2.2rem, 5vw, 4.2rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            marginBottom: "20px",
            maxWidth: "min(95vw, 690px)",
            wordBreak: "break-word",
          }}
        >
          Professional HVAC Solutions <span style={{ color: "#60A5FA" }}>& Air Conditioning Services</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            color: "rgba(219,234,254,0.85)",
            fontSize: "1.05rem",
            lineHeight: 1.75,
            maxWidth: "480px",
            marginBottom: "36px",
            fontWeight: 300,
          }}
        >
          Expert installation, servicing & commercial HVAC projects across Uttar
          Pradesh. Trusted by 50,000+ satisfied customers.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "36px",
          }}
        >
          <a href="tel:+919839171701" style={btnPrimary}>
            <Phone size={16} fill="white" stroke="none" />
            Call Now — Free Consultation
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
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "48px",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
            paddingBottom: "32px",
          }}
        >
          {badges.map((b, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "rgba(219,234,254,0.7)",
                fontSize: "0.84rem",
              }}
            >
              <b.icon size={14} style={{ color: "#60A5FA" }} />
              {b.text}
            </span>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            flexWrap: "wrap",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: "32px" }}
            >
              <div>
                <div style={statValue}>{s.value}</div>
                <div style={statLabel}>{s.label}</div>
              </div>
              {i < stats.length - 1 && <div style={divider} />}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================== STYLES ================== */

const btnPrimary = {
  background: "#1D4ED8",
  color: "#fff",
  fontWeight: 700,
  fontSize: "0.9rem",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  padding: "14px 28px",
  borderRadius: "8px",
  border: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  textDecoration: "none",
};

const btnOutline = {
  background: "transparent",
  color: "#fff",
  fontWeight: 700,
  fontSize: "0.9rem",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  padding: "13px 28px",
  borderRadius: "8px",
  border: "2px solid rgba(255,255,255,0.35)",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  textDecoration: "none",
};

const btnGhost = {
  background: "rgba(255,255,255,0.12)",
  color: "#93C5FD",
  fontWeight: 700,
  fontSize: "0.9rem",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  padding: "14px 28px",
  borderRadius: "8px",
  border: "1px solid rgba(147,197,253,0.3)",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  textDecoration: "none",
};

const statValue = {
  fontFamily: "'DM Serif Display', serif",
  fontSize: "2.4rem",
  color: "#60A5FA",
  lineHeight: 1,
};

const statLabel = {
  fontSize: "0.78rem",
  color: "rgba(219,234,254,0.6)",
  marginTop: "4px",
};

const divider = {
  width: "1px",
  height: "40px",
  background: "rgba(255,255,255,0.15)",
};
