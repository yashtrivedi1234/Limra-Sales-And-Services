import { motion } from "framer-motion";
import { Shield, Award, Users, Target, ArrowRight } from "lucide-react";

const COLORS = {
  navy: "#0B1F4B",
  blue: "#1D4ED8",
  blueLight: "#3B82F6",
  blueSky: "#DBEAFE",
  bluePale: "#EFF6FF",
  white: "#FFFFFF",
  slate100: "#E8EFFF",
  slate200: "#C7D8F8",
  slate400: "#6B8AC7",
};

const stats = [
  { value: "9+", label: "Years Experience" },
  { value: "5000+", label: "Projects Completed" },
  { value: "50+", label: "Expert Technicians" },
  { value: "8+", label: "Premium Brands" },
];

const values = [
  { icon: Shield, title: "Reliability", desc: "Comprehensive warranties and responsive after-sales support on every installation." },
  { icon: Award, title: "Excellence", desc: "Only premium brands and certified technicians — no shortcuts on quality." },
  { icon: Users, title: "Customer First", desc: "Every solution tailored to your space, budget, and comfort requirements." },
  { icon: Target, title: "Innovation", desc: "Latest energy-efficient and smart HVAC technologies, always ahead of the curve." },
];

export default function AboutPreview() {
  return (
    <section style={{ padding: "100px 0", background: COLORS.white, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{
              display: "inline-block",
              background: "rgba(29,78,216,0.1)", border: "1px solid rgba(29,78,216,0.25)",
              color: "#1D4ED8", fontWeight: 700, fontSize: "0.72rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "5px 14px", borderRadius: "100px", marginBottom: "18px"
            }}
          >
            Who We Are
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)", color: COLORS.navy,
              lineHeight: 1.15, marginBottom: "16px"
            }}
          >
            Building Comfort Since 2017
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            style={{ color: COLORS.slate400, fontSize: "1.05rem", lineHeight: 1.75, maxWidth: "580px", margin: "0 auto" }}
          >
            LIMRA Sales And Services is Bareilly's most trusted HVAC partner — delivering premium air conditioning
            solutions for homes, offices, hospitals, hotels, and industrial facilities across Uttar Pradesh.
          </motion.p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "64px" }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{
                background: COLORS.bluePale, borderRadius: "16px",
                padding: "32px 24px", textAlign: "center",
                border: `1px solid ${COLORS.slate100}`
              }}
            >
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2.8rem", color: COLORS.blue, lineHeight: 1, marginBottom: "8px" }}>{s.value}</div>
              <div style={{ fontSize: "0.85rem", color: COLORS.slate400, fontWeight: 500 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "48px" }}>
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{
                background: COLORS.white,
                border: `1px solid ${COLORS.slate100}`,
                borderRadius: "16px", padding: "28px",
                boxShadow: "0 2px 16px rgba(29,78,216,0.08)",
                transition: "all 0.3s"
              }}
            >
              <div style={{
                width: "48px", height: "48px", borderRadius: "12px",
                background: COLORS.blueSky, display: "flex", alignItems: "center",
                justifyContent: "center", marginBottom: "16px"
              }}>
                <v.icon size={22} style={{ color: COLORS.blue }} />
              </div>
              <h3 style={{ fontWeight: 700, color: COLORS.navy, marginBottom: "8px", fontSize: "1rem" }}>{v.title}</h3>
              <p style={{ fontSize: "0.87rem", color: COLORS.slate400, lineHeight: 1.65 }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          style={{ textAlign: "center" }}
        >
          <a
            href="/about"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: COLORS.blue, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none"
            }}
          >
            Learn More About Us <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}