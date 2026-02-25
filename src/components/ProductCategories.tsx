import { motion } from "framer-motion";
import { Wind, Building2, Snowflake, Fan, ThermometerSun, AirVent, ArrowRight } from "lucide-react";

const COLORS = {
  navy: "#0B1F4B",
  blue: "#1D4ED8",
  blueLight: "#3B82F6",
  blueSky: "#DBEAFE",
  bluePale: "#EFF6FF",
  white: "#FFFFFF",
  slate50: "#F8FAFF",
  slate100: "#E8EFFF",
  slate400: "#6B8AC7",
};

const categories = [
  { icon: Snowflake, title: "Inverter Split AC", type: "Residential", desc: "Energy-efficient cooling for homes" },
  { icon: Building2, title: "VRV / VRF Systems", type: "Commercial", desc: "Multi-zone climate control" },
  { icon: AirVent, title: "Cassette AC", type: "Commercial", desc: "Ceiling-mounted 360° airflow" },
  { icon: Wind, title: "Ductable AC", type: "Commercial", desc: "Centralized ducted solutions" },
  { icon: Fan, title: "Portable AC", type: "Residential", desc: "Flexible & moveable units" },
  { icon: ThermometerSun, title: "Tower AC", type: "Residential", desc: "Powerful floor-standing cooling" },
];

export default function ProductCategories() {
  return (
    <section
      style={{
        padding: "100px 0",
        background: COLORS.slate50,
        fontFamily: "'DM Sans', sans-serif",
        backgroundImage: "linear-gradient(rgba(29,78,216,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(29,78,216,0.06) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <div style={{
            display: "inline-block",
            background: "rgba(29,78,216,0.1)", border: "1px solid rgba(29,78,216,0.25)",
            color: "#1D4ED8", fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "5px 14px", borderRadius: "100px", marginBottom: "18px"
          }}>
            Our Products
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)", color: COLORS.navy, lineHeight: 1.15
          }}>
            Cooling Solutions for Every Need
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
              whileHover={{ y: -4 }}
              style={{
                background: COLORS.white,
                border: `1px solid ${COLORS.slate100}`,
                borderRadius: "20px", padding: "32px",
                cursor: "pointer", transition: "all 0.3s",
                position: "relative", overflow: "hidden",
                boxShadow: "0 2px 16px rgba(29,78,216,0.08)"
              }}
            >
              {/* Top accent bar */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.blueLight})`
              }} />

              <span style={{
                display: "inline-flex", alignItems: "center",
                fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.12em", color: COLORS.blue,
                background: COLORS.blueSky, padding: "4px 12px", borderRadius: "100px", marginBottom: "20px"
              }}>
                {cat.type}
              </span>

              <cat.icon size={36} style={{ color: COLORS.navy, marginBottom: "16px", display: "block" }} strokeWidth={1.5} />
              <h3 style={{ fontWeight: 700, color: COLORS.navy, marginBottom: "8px", fontSize: "1.1rem" }}>{cat.title}</h3>
              <p style={{ color: COLORS.slate400, fontSize: "0.88rem", marginBottom: "20px" }}>{cat.desc}</p>

              <span style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                fontSize: "0.85rem", fontWeight: 600, color: COLORS.blue
              }}>
                Explore Category <ArrowRight size={14} />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}