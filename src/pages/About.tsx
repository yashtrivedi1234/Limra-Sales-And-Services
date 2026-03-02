import { motion } from "framer-motion";
import { Shield, Award, CheckCircle, Target, Phone } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import { BRAND } from "@/lib/colors";

const stats = [
  { value: 5000, suffix: "+", label: "Customers" },
  { value: 500, suffix: "+", label: "Commercial Projects" },
  { value: 9, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "+", label: "Cities" },
];

const values = [
  { icon: Shield, title: "Reliability", desc: "We stand behind every AC installation and industrial cooling project with dependable service, strong workmanship, and responsive after-sales support. Our commitment ensures consistent performance and long-term customer trust." },
  { icon: Award, title: "Excellence", desc: "We deliver HVAC solutions with certified technicians, premium components, and no shortcuts. Every project reflects our dedication to technical precision and professional standards." },
  { icon: CheckCircle, title: "Quality Assured", desc: "Through strict quality checks and performance testing, we guarantee reliable and energy-efficient air conditioning systems. From VRV/VRF systems to chiller plants, quality remains our top priority." },
  { icon: Target, title: "Innovation", desc: "We continuously adopt modern, energy-efficient, and smart HVAC technologies to deliver advanced cooling solutions for residential, commercial, and industrial needs." },
];

const milestones = [
  { year: "2017", text: "Founded in Hardoi as a small AC service workshop with a vision to deliver reliable cooling solutions." },
  { year: "2020", text: "Expanded services across nearby districts and built a strong customer base in residential and commercial HVAC projects." },
  { year: "2023", text: "Entered commercial and industrial cooling sector including VRV/VRF systems, Cold Rooms, and Chiller Plants." },
  { year: "2024", text: "Successfully completed major commercial and industrial projects across Uttar Pradesh, strengthening our reputation as a trusted HVAC partner." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const About = () => (
  <main style={{ fontFamily: "'Inter', sans-serif" }}>

    {/* ── Hero ── */}
    <section style={{
      background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.darkMid} 50%, ${BRAND.primary} 100%)`,
      padding: "96px 24px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.08,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
        backgroundSize: "32px 32px", pointerEvents: "none"
      }} />
      <div style={{ maxWidth: "780px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ color: BRAND.accentOnDark, fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
          About Us
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: BRAND.white, lineHeight: 1.1, marginBottom: "24px", fontWeight: 800 }}>
          Building Comfort <br />Since 2017
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ color: BRAND.textOnDark, fontSize: "1.05rem", lineHeight: 1.75, fontWeight: 300 }}>
          LIMRA Sales and Services is a trusted HVAC and air conditioning company delivering reliable cooling solutions for homes, offices, hospitals, hotels, and industrial facilities. Since 2017, we specialize in AC installation, AC servicing, VRV/VRF systems, chiller plants, cold rooms, and industrial cooling services with a strong commitment to quality, safety, and customer satisfaction.
        </motion.p>
      </div>
      <div style={{
        position: "absolute", bottom: -2, left: 0, right: 0, height: "80px",
        background: BRAND.white, clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0% 100%)"
      }} />
    </section>

    {/* ── Stats ── */}
    <section style={{ padding: "80px 24px", background: BRAND.white }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "24px" }}>
        {stats.map((s, i) => (
          <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } } }}
            style={{ textAlign: "center", background: BRAND.primaryPale, borderRadius: "16px", padding: "32px 20px", border: `1px solid ${BRAND.slate100}` }}>
            <p style={{ fontSize: "3rem", color: BRAND.primary, lineHeight: 1, marginBottom: "8px", fontWeight: 700 }}>
              <CountUp from={0} to={s.value} duration={1.2} separator="," direction="up" startWhen={true} />
              {s.suffix}
            </p>
            <p style={{ fontSize: "0.85rem", color: BRAND.slate400, fontWeight: 500 }}>{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ── Our Story ── */}
    <section style={{ padding: "80px 24px", background: "rgb(215 242 255 / 58%)" }}>
      <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div style={{
            display: "inline-block",
            background: `${BRAND.primary}1A`, border: `1px solid ${BRAND.primary}40`,
            color: BRAND.primary, fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "5px 14px", borderRadius: "100px", marginBottom: "18px"
          }}>Our Story</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: BRAND.dark, lineHeight: 1.2, marginBottom: "28px", fontWeight: 800 }}>
            Delivering Comfort, Building Trust
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", color: BRAND.slate400, lineHeight: 1.8, fontSize: "1.02rem", fontWeight: 300 }}>
            <p>
              Founded in 2017, LIMRA Sales and Services began with a clear vision — to provide reliable, honest, and high-quality cooling solutions that customers can truly depend on. What started as a small HVAC service initiative has steadily evolved into a trusted name in air conditioning and industrial cooling solutions across multiple cities.
            </p>
            <p>
              Over the years, we have successfully installed and serviced thousands of air conditioning systems — from residential Split and Window AC units to advanced VRV/VRF systems, cold rooms, and large-scale industrial chiller plants. Our growth has been driven by strong technical expertise, prompt service delivery, and an unwavering commitment to quality workmanship.
            </p>
            <p>
              Today, with 5,000+ satisfied customers and 500+ completed commercial projects, we continue to focus on innovation, energy-efficient solutions, and long-term client partnerships. For us, cooling is more than just a service — it is about delivering comfort, reliability, and performance that businesses and families can confidently rely on.
            </p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Values ── */}
    <section style={{ padding: "80px 24px", background: BRAND.white }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{
            display: "inline-block",
            background: `${BRAND.primary}1A`, border: `1px solid ${BRAND.primary}40`,
            color: BRAND.primary, fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "5px 14px", borderRadius: "100px", marginBottom: "18px"
          }}>Our Values</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: BRAND.dark, lineHeight: 1.2, fontWeight: 800 }}>What Drives Us</h2>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          {values.map((v, i) => (
            <motion.div key={v.title}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } } }}
              style={{
                background: BRAND.white, border: `1px solid ${BRAND.slate100}`,
                borderRadius: "18px", padding: "28px",
                boxShadow: `0 2px 16px ${BRAND.primary}14`,
                position: "relative", overflow: "hidden"
              }}>
              <div style={{ height: "3px", position: "absolute", top: 0, left: 0, right: 0, background: `linear-gradient(90deg, ${BRAND.dark}, ${BRAND.primary})` }} />
              <div style={{
                width: "48px", height: "48px", borderRadius: "12px",
                background: BRAND.primarySky, display: "flex", alignItems: "center",
                justifyContent: "center", marginBottom: "16px"
              }}>
                <v.icon size={22} style={{ color: BRAND.primary }} />
              </div>
              <h3 style={{ fontWeight: 700, color: BRAND.dark, marginBottom: "8px", fontSize: "1rem" }}>{v.title}</h3>
              <p style={{ fontSize: "0.875rem", color: BRAND.slate400, lineHeight: 1.65 }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Milestones & Mission ── */}
    <section style={{ paddingTop: "10px", paddingBottom: "80px", background: "linear-gradient(to bottom, #ffffff, #f8fcff)" }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        display: "flex", flexWrap: "wrap", gap: "64px", alignItems: "flex-start"
      }}>

        {/* ── Left Side: Timeline (60%) ── */}
        <div style={{ flex: "1 1 55%", minWidth: "320px" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: "48px" }}>
            <div style={{
              display: "inline-block",
              background: `${BRAND.primary}1A`, border: `1px solid ${BRAND.primary}40`,
              color: BRAND.primary, fontWeight: 700, fontSize: "0.72rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "5px 14px", borderRadius: "100px", marginBottom: "18px"
            }}>Milestones</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: BRAND.dark, lineHeight: 1.2, fontWeight: 800 }}>Our Journey</h2>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {milestones.map((m, i) => (
              <motion.div key={m.year}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
                style={{ display: "flex", gap: "24px", alignItems: "flex-start", position: "relative" }}>

                {/* Connector Line */}
                {i < milestones.length - 1 && (
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: "calc(100% - 40px)" }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: (i * 0.15) + 0.3, duration: 0.6, ease: "easeInOut" }}
                    style={{
                      position: "absolute", left: "31px", top: "64px", width: "2px",
                      background: `linear-gradient(to bottom, ${BRAND.primary} 0%, rgba(37,99,235,0.1) 100%)`, zIndex: 0
                    }} />
                )}

                {/* Year Badge */}
                <div style={{
                  flexShrink: 0, width: "64px", height: "64px", borderRadius: "50%",
                  background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)`,
                  color: BRAND.white, display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: "1rem", letterSpacing: "0.02em",
                  boxShadow: `0 6px 20px ${BRAND.primary}48`,
                  zIndex: 1, position: "relative"
                }}>
                  {m.year}
                </div>

                {/* Content */}
                <div style={{ paddingTop: "14px", flex: 1, paddingBottom: i === milestones.length - 1 ? "0px" : "56px" }}>
                  <p style={{ color: BRAND.dark, fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.7, opacity: 0.9 }}>{m.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Right Side: Mission Card (40%) ── */}
        <div style={{ flex: "1 1 35%", minWidth: "320px", position: "sticky", top: "120px" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              padding: "2px", borderRadius: "22px",
              background: `linear-gradient(135deg, ${BRAND.primary}40 0%, transparent 100%)`,
            }}>
            <div style={{
              background: "rgb(215 242 255 / 58%)",
              borderRadius: "20px", padding: "48px 40px", height: "100%",
              boxShadow: "0 24px 48px rgba(0,0,0,0.04)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "12px",
                  background: BRAND.white, display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.04)"
                }}>
                  <Target size={24} style={{ color: BRAND.primary }} />
                </div>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: BRAND.dark, textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>
                  Our Mission
                </h3>
              </div>
              <p style={{ color: BRAND.dark, fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "24px", fontWeight: 400, opacity: 0.9 }}>
                Our mission is to provide reliable, energy-efficient, and cost-effective air conditioning and industrial cooling solutions tailored to residential, commercial, and industrial needs.
              </p>
              <p style={{ color: BRAND.dark, fontSize: "1.05rem", lineHeight: 1.8, fontWeight: 400, opacity: 0.9 }}>
                We are committed to delivering quality workmanship, advanced HVAC technology, and prompt service support to ensure long-term customer satisfaction and dependable cooling performance.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>

    {/* ── CTA ── */}
    <section style={{
      padding: "96px 24px", textAlign: "center",
      background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.darkMid} 50%, ${BRAND.primary} 100%)`,
      position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.1,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
        backgroundSize: "28px 28px", pointerEvents: "none"
      }} />
      <div style={{ maxWidth: "600px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: BRAND.white, marginBottom: "16px", fontWeight: 800 }}>
          Ready to Work With Us?
        </h2>
        <p style={{ color: BRAND.textOnDark, marginBottom: "36px", fontSize: "1.05rem", fontWeight: 300 }}>
          Whether it's a residential split AC or a commercial VRV system — we've got you covered.
        </p>
        <a href="tel:+919236477974" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "14px 36px", background: BRAND.white, color: BRAND.dark,
          fontWeight: 700, fontSize: "0.95rem", borderRadius: "100px",
          textDecoration: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease",
        }}>
          <Phone size={18} /> Get a Free Consultation
        </a>
      </div>
    </section>
  </main>
);

export default About;
