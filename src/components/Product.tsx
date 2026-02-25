import { motion } from "framer-motion";
import { Hotel, Cross, GraduationCap, Dumbbell, Scissors, Briefcase, ShoppingBag, BarChart2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const COLORS = {
  navy: "#0B1F4B",
  blue: "#1D4ED8",
  blueLight: "#3B82F6",
  bluePale: "#EFF6FF",
  white: "#FFFFFF",
  slate100: "#E8EFFF",
  slate600: "#3A5A9C",
};

const applications = [
  { icon: <Hotel size={30} strokeWidth={1.5} />, label: "Hotels & Restaurants" },
  { icon: <Cross size={30} strokeWidth={1.5} />, label: "Hospitals & Clinics" },
  { icon: <GraduationCap size={30} strokeWidth={1.5} />, label: "Schools & Colleges" },
  { icon: <Dumbbell size={30} strokeWidth={1.5} />, label: "Gyms & Fitness Centers" },
  { icon: <Scissors size={30} strokeWidth={1.5} />, label: "Salons & Spas" },
  { icon: <Briefcase size={30} strokeWidth={1.5} />, label: "Offices & IT Parks" },
  { icon: <ShoppingBag size={30} strokeWidth={1.5} />, label: "Retail Stores" },
  { icon: <BarChart2 size={30} strokeWidth={1.5} />, label: "Industrial Buildings" },
];

export default function CommercialApplications() {
  const navigate = useNavigate();

  return (
    <section style={{ padding: "100px 0", background: COLORS.white, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(29,78,216,0.1)", border: "1px solid rgba(29,78,216,0.25)",
            color: "#1D4ED8", fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "5px 14px", borderRadius: "100px", marginBottom: "18px"
          }}>
            Industries We Serve
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)", color: COLORS.navy, lineHeight: 1.15
          }}>
            Commercial HVAC Applications
          </h2>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px", marginBottom: "48px" }}>
          {applications.map((app, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(29,78,216,0.14)" }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: "12px",
                background: COLORS.bluePale, borderRadius: "16px",
                padding: "28px 16px", cursor: "pointer",
                border: `1px solid ${COLORS.slate100}`,
                transition: "all 0.25s"
              }}
            >
              <div style={{ color: COLORS.navy }}>{app.icon}</div>
              <span style={{ fontSize: "0.82rem", color: COLORS.slate600, fontWeight: 600, textAlign: "center", lineHeight: 1.4 }}>
                {app.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => navigate("/product")}
            style={{
              background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.blue} 100%)`,
              color: COLORS.white, fontWeight: 700, fontSize: "0.9rem",
              padding: "14px 36px", borderRadius: "100px", border: "none",
              cursor: "pointer", boxShadow: "0 8px 24px rgba(29,78,216,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}