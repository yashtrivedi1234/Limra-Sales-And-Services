import { motion } from "framer-motion";
import { Shield, Award, Users, Target, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/colors";
import CountUp from "@/components/ui/CountUp";

const stats = [
  { value: 9, suffix: "+", label: "Years Experience" },
  { value: 5000, suffix: "+", label: "Projects Completed" },
  { value: 50, suffix: "+", label: "Expert Technicians" },
  { value: 8, suffix: "+", label: "Premium Brands" },
];

const values = [
  { icon: Shield, title: "Reliability", desc: "Comprehensive warranties and responsive after-sales support on every installation." },
  { icon: Award, title: "Excellence", desc: "Only premium brands and certified technicians — no shortcuts on quality." },
  { icon: Users, title: "Customer First", desc: "Every solution tailored to your space, budget, and comfort requirements." },
  { icon: Target, title: "Innovation", desc: "Latest energy-efficient and smart HVAC technologies, always ahead of the curve." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

export default function AboutPreview() {
  return (
    <section style={{ padding: "100px 0", background: BRAND.white, fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
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
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "5px 14px",
              borderRadius: "100px",
              marginBottom: "18px",
            }}
          >
            Who We Are
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: BRAND.dark, lineHeight: 1.15, marginBottom: "16px", fontWeight: 800 }}
          >
            Building Comfort Since 2017
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ color: BRAND.slate400, fontSize: "1.05rem", lineHeight: 1.75, maxWidth: "580px", margin: "0 auto" }}
          >
            LIMRA Sales And Services is Bareilly's most trusted HVAC partner — delivering premium air conditioning solutions for homes, offices, hospitals, hotels, and industrial facilities across Uttar Pradesh.
          </motion.p>
        </div>

        {/* Stats with CountUp */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "64px" }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{
                background: BRAND.primaryPale,
                borderRadius: "16px",
                padding: "32px 24px",
                textAlign: "center",
                border: `1px solid ${BRAND.slate100}`,
              }}
            >
              {/* ✅ CountUp Applied */}
              <div style={{ fontSize: "2.8rem", color: BRAND.primary, lineHeight: 1, marginBottom: "8px", fontWeight: 800 }}>
                <CountUp
                  from={0}
                  to={s.value}
                  duration={1.2}
                  separator=","
                  direction="up"
                  startCounting={true}
                />
                {s.suffix}
              </div>

              <div style={{ fontSize: "0.85rem", color: BRAND.slate400, fontWeight: 500 }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "48px" }}>
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              style={{
                background: BRAND.white,
                border: `1px solid ${BRAND.slate100}`,
                borderRadius: "16px",
                padding: "28px",
                boxShadow: `0 2px 16px ${BRAND.primary}14`,
                transition: "all 0.3s",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: BRAND.primarySky,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <v.icon size={22} style={{ color: BRAND.primary }} />
              </div>

              <h3 style={{ fontWeight: 700, color: BRAND.dark, marginBottom: "8px", fontSize: "1rem" }}>
                {v.title}
              </h3>

              <p style={{ fontSize: "0.87rem", color: BRAND.slate400, lineHeight: 1.65 }}>
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ textAlign: "center" }}
        >
          <a
            href="/about"
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
            Learn More About Us <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}