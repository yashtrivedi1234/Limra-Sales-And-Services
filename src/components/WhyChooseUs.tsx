import { motion } from "framer-motion";
import { Award, Users, ShieldCheck, Zap } from "lucide-react";

const COLORS = {
  navy: "#0B1F4B",
  blue: "#1D4ED8",
  blueLight: "#3B82F6",
  bluePale: "#EFF6FF",
  white: "#FFFFFF",
  slate50: "#F8FAFF",
  slate100: "#E8EFFF",
  slate400: "#6B8AC7",
};

const features = [
  { icon: Award, title: "Industry Leader", description: "Recognized as the leading HVAC provider in Uttar Pradesh." },
  { icon: Users, title: "50,000+ Happy Clients", description: "Serving homes, offices, hospitals, and industrial facilities." },
  { icon: ShieldCheck, title: "Quality Assured", description: "Certified team with comprehensive warranty and 24/7 support." },
  { icon: Zap, title: "Latest Technology", description: "Cutting-edge energy-efficient and smart HVAC systems." },
];

export default function WhyChooseUs() {
  return (
    <section style={{ padding: "100px 0", background: COLORS.slate50, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(29,78,216,0.1)", border: "1px solid rgba(29,78,216,0.25)",
            color: "#1D4ED8", fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "5px 14px", borderRadius: "100px", marginBottom: "18px"
          }}>
            Why Choose Us
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)", color: COLORS.navy, lineHeight: 1.15, marginBottom: "16px"
          }}>
            The LIMRA Difference
          </h2>
          <p style={{ color: COLORS.slate400, fontSize: "1.05rem", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Discover what sets LIMRA Sales And Services apart — innovation, reliability, and commitment to
            excellence in every installation.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "24px" }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                background: COLORS.white, borderRadius: "20px",
                padding: "36px 28px", textAlign: "center",
                border: `1px solid ${COLORS.slate100}`,
                boxShadow: "0 2px 16px rgba(29,78,216,0.08)",
                transition: "all 0.3s"
              }}
            >
              <div style={{
                width: "72px", height: "72px", borderRadius: "50%",
                background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.blueLight} 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px",
                boxShadow: "0 8px 24px rgba(29,78,216,0.25)"
              }}>
                <f.icon size={28} style={{ color: COLORS.white }} />
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: COLORS.navy, marginBottom: "10px" }}>{f.title}</h3>
              <p style={{ fontSize: "0.88rem", color: COLORS.slate400, lineHeight: 1.65 }}>{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}