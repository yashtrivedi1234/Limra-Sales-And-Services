import { motion } from "framer-motion";
import { Wind, Building2, Snowflake, AppWindow, AirVent, Building, Droplets, Filter, Fan, ThermometerSun, ArrowRight, Box, Droplet, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BRAND } from "@/lib/colors";

/* ─── DATA ─────────────────────────────────────────────────────────── */
const categories = [
  {
    icon: Snowflake,
    title: "Split AC",
    type: "Residential",
    desc: `Energy-efficient Split AC for homes and offices with powerful cooling performance.
Low noise operation and modern wall-mounted design.
Professional installation and reliable after-sales support available.`,
  },
  {
    icon: AppWindow,
    title: "Window AC",
    type: "Residential",
    desc: `Compact and budget-friendly Window AC for small rooms.
Easy installation with strong cooling output.
Ideal for residential and rental properties.`,
  },
  {
    icon: AirVent,
    title: "Cassette AC",
    type: "Commercial",
    desc: `Ceiling-mounted Cassette AC for uniform 360° air distribution.
Perfect for offices, showrooms, and commercial spaces.
Stylish design with high cooling efficiency.`,
  },
  {
    icon: Building,
    title: "Ductable AC",
    type: "Commercial",
    desc: `Centralized Ductable AC system for large areas and halls.
Hidden installation with powerful airflow control.
Best solution for commercial and industrial cooling needs.`,
  },
  {
    icon: Droplets,
    title: "Water Dispenser",
    type: "Residential",
    desc: `Hot and cold Water Dispensers for offices and commercial use.
Energy-efficient and durable cooling system.
Reliable performance with easy maintenance support.`,
  },
  {
    icon: Filter,
    title: "RO Plant",
    type: "Commercial",
    desc: `Advanced RO Plant systems for pure and safe drinking water.
Suitable for commercial and industrial applications.
High filtration efficiency with long-lasting components.`,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

/* ─── CARD ──────────────────────────────────────────────────────────── */
function Card({ cat, i }: { cat: typeof categories[0]; i: number }) {
  const navigate = useNavigate();
  const Icon = cat.icon;

  return (
    <motion.div
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      whileHover={{ y: -4 }}
      onClick={() => navigate("/product")}
      style={{ cursor: "pointer" }}
    >
      <div
        style={{
          background: BRAND.white,
          border: `1px solid ${BRAND.slate100}`,
          borderRadius: "16px",
          padding: "28px",
          boxShadow: `0 2px 16px ${BRAND.primary}14`,
          transition: "all 0.3s",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: BRAND.primarySky,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={22} style={{ color: BRAND.primary }} />
        </div>

        {/* Title */}
        <h3
          style={{
            fontWeight: 700,
            color: BRAND.dark,
            fontSize: "1.05rem",
            margin: 0,
          }}
        >
          {cat.title}
        </h3>

        {/* Desc */}
        <p
          style={{
            fontSize: "0.87rem",
            color: BRAND.slate400,
            lineHeight: 1.65,
            margin: 0,
            flex: 1,
          }}
        >
          {cat.desc}
        </p>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "12px",
            marginTop: "auto",
            borderTop: `1px solid ${BRAND.slate100}`,
          }}
        >
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: BRAND.primary }}>
            View More
          </span>
          <ArrowRight size={16} style={{ color: BRAND.primary }} />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── MAIN ──────────────────────────────────────────────────────────── */
export default function ProductCategories() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        padding: "64px 0",
        background: "rgb(215 242 255 / 58%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 48px)",
        }}
      >
        {/* ── HEADER ── */}
        <div style={{ textAlign: "left", marginBottom: "48px" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-block",
              background: `${BRAND.primary}1A`,
              border: `1px solid ${BRAND.primary}40`,
              color: BRAND.primary,
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "5px 20px",
              borderRadius: "100px",
              marginBottom: "18px",
            }}
          >
            Our Products
          </motion.div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontWeight: 400,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: BRAND.dark,
                  lineHeight: 1.15,
                  marginBottom: "12px",
                  margin: 0,
                }}
              >
                Cooling Solutions for Every Need
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => navigate("/product")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)`, color: BRAND.white, fontWeight: 700, fontSize: "0.9rem",
                  padding: "10px 22px",
                  borderRadius: "100px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: `0 4px 16px ${BRAND.primary}40`,
                  transition: "all 0.25s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 6px 20px ${BRAND.primary}60`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 16px ${BRAND.primary}40`;
                }}
              >
                View All Products <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>

        {/* ── GRID ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {categories.map((cat, i) => (
            <Card key={cat.title} cat={cat} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}