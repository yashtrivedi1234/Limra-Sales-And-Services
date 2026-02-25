import { motion } from "framer-motion";
import { Wrench, ShieldCheck, MapPin, Clock } from "lucide-react";

const COLORS = {
  navy: "#0B1F4B",
  blue: "#1D4ED8",
  white: "#FFFFFF",
};

const services = [
  { icon: Wrench, title: "Expert Installation", desc: "Certified technicians with precision setup for optimal performance and longevity." },
  { icon: ShieldCheck, title: "Maintenance & Repair", desc: "Scheduled servicing, gas top-ups, deep cleaning and swift troubleshooting." },
  { icon: MapPin, title: "Free Site Visit", desc: "Complimentary assessment of your space to recommend the perfect cooling solution." },
  { icon: Clock, title: "24/7 Emergency Service", desc: "Round-the-clock support because breakdowns don't wait for business hours." },
];

export default function Services() {
  return (
    <section style={{
      padding: "100px 0", position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg, #0B1F4B 0%, #1A3580 50%, #1D4ED8 100%)",
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* Dot pattern overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.4,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
        backgroundSize: "28px 28px"
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <div style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)",
            color: "#93C5FD", fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "5px 16px", borderRadius: "100px", marginBottom: "18px"
          }}>
            What We Do
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)", color: COLORS.white, lineHeight: 1.15
          }}>
            Professional Services
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 100 }}
              whileHover={{ y: -4 }}
              style={{
                padding: "32px", borderRadius: "20px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                transition: "all 0.3s"
              }}
            >
              <div style={{
                width: "56px", height: "56px", borderRadius: "14px",
                background: "rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px"
              }}>
                <s.icon size={26} style={{ color: "#93C5FD" }} />
              </div>
              <h3 style={{ fontWeight: 700, color: COLORS.white, marginBottom: "10px", fontSize: "1.05rem" }}>{s.title}</h3>
              <p style={{ color: "rgba(219,234,254,0.65)", fontSize: "0.87rem", lineHeight: 1.7 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}