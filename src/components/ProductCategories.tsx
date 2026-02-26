import { motion } from "framer-motion";
import { Wind, Building2, Snowflake, Fan, ThermometerSun, AirVent, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/colors";

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
    <section style={{
      padding: "100px 0", background: BRAND.bgSoft, fontFamily: "'Inter', sans-serif",
      backgroundImage: `linear-gradient(${BRAND.primary}0F 1px, transparent 1px), linear-gradient(90deg, ${BRAND.primary}0F 1px, transparent 1px)`,
      backgroundSize: "48px 48px",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ display: "inline-block", background: `${BRAND.primary}1A`, border: `1px solid ${BRAND.primary}40`, color: BRAND.primary, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "100px", marginBottom: "18px" }}>
            Our Products
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: BRAND.dark, lineHeight: 1.15, fontWeight: 800 }}>
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
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -4 }}
              style={{
                background: BRAND.white, border: `1px solid ${BRAND.slate100}`,
                borderRadius: "20px", padding: "32px", cursor: "pointer",
                transition: "all 0.3s", position: "relative", overflow: "hidden",
                boxShadow: `0 2px 16px ${BRAND.primary}14`
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${BRAND.dark}, ${BRAND.primary})` }} />
              <span style={{ display: "inline-flex", alignItems: "center", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: BRAND.primary, background: BRAND.primarySky, padding: "4px 12px", borderRadius: "100px", marginBottom: "20px" }}>
                {cat.type}
              </span>
              <cat.icon size={36} style={{ color: BRAND.dark, marginBottom: "16px", display: "block" }} strokeWidth={1.5} />
              <h3 style={{ fontWeight: 700, color: BRAND.dark, marginBottom: "8px", fontSize: "1.1rem" }}>{cat.title}</h3>
              <p style={{ color: BRAND.slate400, fontSize: "0.88rem", marginBottom: "20px" }}>{cat.desc}</p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: 600, color: BRAND.primary }}>
                Explore Category <ArrowRight size={14} />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
