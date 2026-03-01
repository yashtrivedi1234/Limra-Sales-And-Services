import { motion } from "framer-motion";
import { Wind, Building2, Snowflake, Fan, ThermometerSun, AirVent, ArrowRight, Box, Droplet, Droplets, Activity } from "lucide-react";
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
    icon: Box,
    title: "Window AC",
    type: "Residential",
    desc: `Compact and budget-friendly Window AC for small rooms.
Easy installation with strong cooling output.
Ideal for residential and rental properties..`,
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
    icon: Wind,
    title: "Ductable AC",
    type: "Commercial",
    desc: `Centralized Ductable AC system for large areas and halls.
Hidden installation with powerful airflow control.
Best solution for commercial and industrial cooling needs.`,
  },
  {
    icon: Droplet,
    title: "Water Dispenser",
    type: "Residential",
    desc: `Hot and cold Water Dispensers for offices and commercial use.
Energy-efficient and durable cooling system.
Reliable performance with easy maintenance support.`,
  },
  {
    icon: Droplet,
    title: "RO Plant",
    type: "Commercial",
    desc: `Advanced RO Plant systems for pure and safe drinking water.
Suitable for commercial and industrial applications.
High filtration efficiency with long-lasting components.`,
  },
  {
    icon: ThermometerSun,
    title: "Tower AC",
    type: "Commercial",
    desc: `High-capacity Tower AC for large rooms and event spaces.
Strong airflow with quick cooling performance.
Stylish vertical design with easy mobility.`,
  },
  {
    icon: Box,
    title: "Package AC",
    type: "Commercial",
    desc: `Heavy-duty Package AC for commercial buildings and malls.
All-in-one cooling solution with efficient performance.
Designed for large-scale air conditioning requirements.`,
  },
  {
    icon: Building2,
    title: "VRV / VRF System",
    type: "Commercial",
    desc: `Advanced VRV/VRF air conditioning system for multi-zone cooling.
Energy-efficient technology with precise temperature control.
Ideal for hotels, offices, and commercial complexes.`,
  },
  {
    icon: Fan,
    title: "AHU (Air Handling Unit)",
    type: "Commercial",
    desc: `High-performance AHU for centralized HVAC systems.
Ensures proper air circulation and ventilation control.
Perfect for hospitals, industries, and large facilities.`,
  },
  {
    icon: Snowflake,
    title: "Cold Room",
    type: "Commercial",
    desc: `Custom-built Cold Room solutions for storage and preservation.
Temperature-controlled environment for food and pharma use.
Energy-efficient design with reliable insulation technology.`,
  },
  {
    icon: Snowflake,
    title: "Chiller",
    type: "Industrial",
    desc: `Industrial Chiller systems for large-scale cooling applications.
Maintains stable temperature for factories and plants.
Available in air-cooled and water-cooled options.`,
  },
  {
    icon: Fan,
    title: "Air-Cooled Chiller",
    type: "Industrial",
    desc: `Efficient Air-Cooled Chiller with low maintenance cost.
Ideal for industrial and commercial cooling systems.
Durable design with high energy performance.`,
  },
  {
    icon: Droplets,
    title: "Water-Cooled Chiller",
    type: "Industrial",
    desc: `High-capacity Water-Cooled Chiller for heavy-duty applications.
Superior cooling efficiency for large facilities.
Designed for continuous industrial operations.`,
  },
  {
    icon: Snowflake,
    title: "Ice Plant",
    type: "Industrial",
    desc: `Industrial Ice Plant for bulk ice production.
Reliable and energy-efficient cooling system.
Suitable for fisheries, food processing, and cold storage units.`,
  },
  {
    icon: Activity,
    title: "Panel AC",
    type: "Industrial",
    desc: `Compact Panel AC for electrical control panels.
Prevents overheating and ensures equipment safety.
Ideal for industrial automation systems.`,
  },
  {
    icon: Droplets,
    title: "Water Cooler",
    type: "Commercial",
    desc: `Commercial Water Cooler for offices, schools, and public spaces.
Fast cooling with durable stainless steel body.
Designed for continuous and heavy usage.`,
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
function Card({ cat, i, navigate }: { cat: typeof categories[0]; i: number; navigate: ReturnType<typeof useNavigate> }) {
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

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{
                  color: BRAND.slate400,
                  fontSize: "1.05rem",
                  lineHeight: 1.75,
                  margin: "12px 0 0",
                  maxWidth: "520px",
                }}
              >
                From single-room comfort to enterprise-scale climate architecture — we engineer the perfect solution for every space.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <a
                href="/product"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: BRAND.primary,
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                }}
              >
                View All Products <ArrowRight size={16} />
              </a>
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
            <Card key={cat.title} cat={cat} i={i} navigate={navigate} />
          ))}
        </div>
      </div>
    </section>
  );
}