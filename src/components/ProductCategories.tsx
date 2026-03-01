import { motion } from "framer-motion";
import { Wind, Building2, Snowflake, Fan, ThermometerSun, AirVent, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BRAND } from "@/lib/colors";

/* ─── DATA ─────────────────────────────────────────────────────────── */
const categories = [
  {
    icon: Snowflake,
    title: "Inverter Split AC",
    type: "Residential",
    desc: "Energy-efficient cooling engineered for modern homes and apartments.",
    tag: "BESTSELLER",
    stat: "5-star rated",
  },
  {
    icon: Building2,
    title: "VRV / VRF Systems",
    type: "Commercial",
    desc: "Variable refrigerant flow for seamless multi-zone climate control.",
    tag: "ENTERPRISE",
    stat: "500+ installs",
  },
  {
    icon: AirVent,
    title: "Cassette AC",
    type: "Commercial",
    desc: "360° ceiling-mounted airflow, invisible and impossibly quiet.",
    tag: "PREMIUM",
    stat: "Ultra-silent",
  },
  {
    icon: Wind,
    title: "Ductable AC",
    type: "Commercial",
    desc: "Centralized ducted architecture for large commercial spaces.",
    tag: "INDUSTRIAL",
    stat: "High capacity",
  },
  {
    icon: Fan,
    title: "Portable AC",
    type: "Residential",
    desc: "No installation needed. Plug in, wheel anywhere, instant cool.",
    tag: "FLEXIBLE",
    stat: "No install",
  },
  {
    icon: ThermometerSun,
    title: "Tower AC",
    type: "Residential",
    desc: "Statement floor-standing design with powerful room-wide cooling.",
    tag: "POWERFUL",
    stat: "Design icon",
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
        {/* Tag */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: BRAND.primary,
              background: `${BRAND.primary}1A`,
              border: `1px solid ${BRAND.primary}40`,
              padding: "3px 10px",
              borderRadius: "100px",
            }}
          >
            {cat.tag}
          </span>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              color: BRAND.slate400,
            }}
          >
            {cat.type}
          </span>
        </div>

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
            paddingTop: "8px",
            borderTop: `1px solid ${BRAND.slate100}`,
          }}
        >
          <span
            style={{
              fontSize: "0.76rem",
              fontWeight: 600,
              color: BRAND.primary,
            }}
          >
            {cat.stat}
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