import { motion } from "framer-motion";
import { Shield, Award, CheckCircle, Target, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/colors";
import CountUp from "./ui/CountUp";
const stats = [
  { value: 5000, suffix: "+", label: "Customers" },
  { value: 500, suffix: "+", label: "Commercial Projects" },
  { value: 9, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "+", label: "Cities" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const values = [
  { icon: Shield, title: "Reliability", desc: "Comprehensive warranties and responsive after-sales support on every installation." },
  { icon: Award, title: "Excellence", desc: "Only premium brands and certified technicians — no shortcuts on quality." },
  { icon: CheckCircle, title: "Quality Assured", desc: "Rigorous testing and strict quality control to guarantee reliable and top-tier HVAC solutions." },
  { icon: Target, title: "Innovation", desc: "Latest energy-efficient and smart HVAC technologies, always ahead of the curve." },
];

// const fadeUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.1, duration: 0.6 },
//   }),
// };

export default function AboutPreview() {
  return (
    <section style={{ padding: "64px 0", background: "rgb(215 242 255 / 58%)", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>

        {/* Header */}
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
            LIMRA Sales & Services
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: BRAND.dark, lineHeight: 1.15, marginBottom: "16px" }}
          >
           Trusted HVAC & Cooling Experts in Uttar Pradesh
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ color: BRAND.slate400, fontSize: "1.05rem", lineHeight: 1.75, margin: "0 auto", textAlign: "justify" }}
          >


LIMRA Sales & Services is a leading HVAC and air conditioning solutions provider based in Uttar Pradesh, delivering reliable installation, maintenance, and large-scale commercial cooling projects across the state. With strong technical expertise and years of hands-on industry experience, we provide complete climate control solutions for residential, commercial, and industrial spaces.

<br />
<br />

From standard AC installations to advanced VRF/VRV systems, ducting, ventilation, cold rooms, ice plants, and chiller plants, our team ensures every project is executed with precision, safety, and efficiency. We specialize in the installation and servicing of Window, Split, Cassette, Ductable, Package AC, and AHU systems, along with copper piping and complete HVAC line work.

<br />


<br />

With a commitment to quality workmanship, transparent service, and long-term customer satisfaction, LIMRA Sales & Services continues to build trust through performance and professionalism.
          </motion.p>
        </div>

       
        
<div style={{ padding: "0 0 40px", margin: "0 auto", width: "100%" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                  {stats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      style={{
                        color: "white",
                        background: "linear-gradient(135deg, rgb(8, 42, 69) 0%, rgb(6, 149, 205) 100%)",
                        borderRadius: "16px",
                        padding: "32px 24px",
                        textAlign: "center",
                        boxShadow: `0 4px 20px ${BRAND.primary}14`,
                        
                      }}
                    >
                      {/* ✅ CountUp Applied */}
                      <div style={{ fontSize: "2.8rem", color: "white", lineHeight: 1, marginBottom: "8px", fontWeight: 800 }}>
                        <CountUp
                          from={0}
                          to={s.value}
                          duration={1.2}
                          separator=","
                          direction="up"
                          startWhen={true}
                        />
                        {s.suffix}
                      </div>
          
                      <div style={{ fontSize: "0.85rem", color: "white", fontWeight: 500 }}>
                        {s.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>


        {/* Values */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "40px" }}>
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