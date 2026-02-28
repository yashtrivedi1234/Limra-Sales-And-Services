import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Phone, Wind, Droplets, ThermometerSun, AirVent, Building2, Home } from "lucide-react";
import { BRAND } from "@/lib/colors";

const residentialItems = [
  { icon: <Wind size={16} />, label: "Split ACs (1-5 Ton)" },
  { icon: <Wind size={16} />, label: "Window ACs" },
  { icon: <Wind size={16} />, label: "Portable ACs" },
  { icon: <Droplets size={16} />, label: "Water Coolers & Dispensers" },
  { icon: <Wind size={16} />, label: "Air Purifiers & Water Softeners" },
];

const commercialItems = [
  { icon: <Building2 size={16} />, label: "Daikin VRV Systems" },
  { icon: <Wind size={16} />, label: "Cassette & Ductable ACs" },
  { icon: <ThermometerSun size={16} />, label: "Chillers & Heat Pumps" },
  { icon: <Building2 size={16} />, label: "Floor Standing ACs" },
  { icon: <AirVent size={16} />, label: "Ventilation Systems" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" } }),
};

function SolutionCard({ title, items, primaryBtnLabel, imageUrl, badgeIcon, index }: any) {
  const navigate = useNavigate();
  return (
    <motion.div
      custom={index}
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants}
      whileHover={{ y: -6 }}
      style={{
        background: BRAND.white, borderRadius: "20px",
        border: `1px solid ${BRAND.slate100}`, overflow: "hidden",
        display: "flex", flexDirection: "column",
        boxShadow: `0 2px 16px ${BRAND.primary}14`,
        transition: "all 0.3s"
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "200px", overflow: "hidden" }}>
        <img src={imageUrl} alt={title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, ${BRAND.dark}1A, ${BRAND.dark}73)` }} />
        <div style={{ position: "absolute", top: 12, left: 12, width: "38px", height: "38px", background: BRAND.white, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 2px 8px ${BRAND.primary}26` }}>
          {badgeIcon}
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: `linear-gradient(90deg, ${BRAND.dark}, ${BRAND.primary})` }} />
      </div>

      <div style={{ padding: "28px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: BRAND.dark, marginBottom: "20px" }}>{title}</h3>
        <ul style={{ flex: 1, marginBottom: "24px", display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0 }}>
          {items.map((item: any, i: number) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", color: BRAND.slate600, fontSize: "0.88rem" }}>
              <span style={{ color: BRAND.primary }}>{item.icon}</span> {item.label}
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", gap: "10px" }}>
          <a
            href="tel:+91 9839171701"
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: BRAND.dark, color: BRAND.white, fontWeight: 600, padding: "12px 16px", borderRadius: "10px", border: "none", cursor: "pointer", fontSize: "0.88rem", transition: "background 0.2s", textDecoration: "none" }}
          >
            <Phone size={15} /> {primaryBtnLabel}
          </a>
          <button
            style={{ flex: 1, background: BRAND.primaryPale, color: BRAND.primary, fontWeight: 600, padding: "12px 16px", borderRadius: "10px", border: `1px solid ${BRAND.slate200}` , cursor: "pointer", fontSize: "0.88rem", transition: "background 0.2s" }}
            onClick={() => navigate('/product')}
          >
            View Products
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function HVACSolutions() {
  return (
    <section style={{ padding: "64px 0", background: BRAND.white, fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ display: "inline-block", background: `${BRAND.primary}1A`, border: `1px solid ${BRAND.primary}40`, color: BRAND.primary, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "100px", marginBottom: "18px" }}>
            Solutions
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.2rem)", color: BRAND.dark, lineHeight: 1.15, marginBottom: "12px" }}>
          Complete HVAC Solutions
          </h2>
          <p style={{ color: BRAND.slate400, fontSize: "1.05rem" }}>From residential comfort to large commercial projects, we've got you covered.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
          <SolutionCard index={0} title="Residential Solutions" items={residentialItems} primaryBtnLabel="Get Home Quote" imageUrl="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80" badgeIcon={<Home size={18} style={{ color: BRAND.primary }} />} />
          <SolutionCard index={1} title="Commercial & VRV Systems" items={commercialItems} primaryBtnLabel="Get Commercial Quote" imageUrl="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80" badgeIcon={<Building2 size={18} style={{ color: BRAND.primary }} />} />
        </div>
      </div>
    </section>
  );
}
