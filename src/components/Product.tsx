import { motion } from "framer-motion";
import { Hotel, Cross, GraduationCap, Dumbbell, Scissors, Briefcase, ShoppingBag, BarChart2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BRAND } from "@/lib/colors";

const applications = [
  { icon: <Hotel size={30} strokeWidth={1.5} color="#F59E0B" />, label: "Hotels & Restaurants" },
  { icon: <Cross size={30} strokeWidth={1.5} color="#EF4444" />, label: "Hospitals & Clinics" },
  { icon: <GraduationCap size={30} strokeWidth={1.5} color="#3B82F6" />, label: "Schools & Colleges" },
  { icon: <Dumbbell size={30} strokeWidth={1.5} color="#10B981" />, label: "Gyms & Fitness Centers" },
  { icon: <Scissors size={30} strokeWidth={1.5} color="#EC4899" />, label: "Salons & Spas" },
  { icon: <Briefcase size={30} strokeWidth={1.5} color="#6366F1" />, label: "Offices & IT Parks" },
  { icon: <ShoppingBag size={30} strokeWidth={1.5} color="#F97316" />, label: "Retail Stores" },
  { icon: <BarChart2 size={30} strokeWidth={1.5} color="#14B8A6" />, label: "Industrial Buildings" },
];

export default function CommercialApplications() {
  const navigate = useNavigate();
  return (
    <section style={{ padding: "100px 0", background: BRAND.white, fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ display: "inline-block", background: `${BRAND.primary}1A`, border: `1px solid ${BRAND.primary}40`, color: BRAND.primary, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "100px", marginBottom: "18px" }}>
            Industries We Serve
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: BRAND.dark, lineHeight: 1.15, fontWeight: 800 }}>
            Commercial HVAC Applications
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px", marginBottom: "48px" }}>
          {applications.map((app, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.04, boxShadow: `0 12px 32px ${BRAND.primary}24` }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: "12px",
                background: BRAND.primaryPale, borderRadius: "16px",
                padding: "28px 16px", cursor: "pointer",
                border: `1px solid ${BRAND.slate100}`,
                transition: "all 0.25s"
              }}
            >
            <div>{app.icon}</div>
              <span style={{ fontSize: "0.82rem", color: BRAND.slate600, fontWeight: 600, textAlign: "center", lineHeight: 1.4 }}>{app.label}</span>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => navigate("/product")}
            style={{
              background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)`,
              color: BRAND.white, fontWeight: 700, fontSize: "0.9rem",
              padding: "14px 36px", borderRadius: "100px", border: "none",
              cursor: "pointer", boxShadow: `0 8px 24px ${BRAND.primary}4D`,
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
