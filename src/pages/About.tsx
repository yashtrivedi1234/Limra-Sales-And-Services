import { motion } from "framer-motion";
import { Shield, Award, Users, Target, Phone } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import { BRAND } from "@/lib/colors";

const stats = [
  { value: 9, suffix: "+", label: "Years Experience" },
  { value: 5000, suffix: "+", label: "Projects Completed" },
  { value: 50, suffix: "+", label: "Expert Technicians" },
  { value: 8, suffix: "+", label: "Premium Brands" },
];

const values = [
  { icon: Shield, title: "Reliability", desc: "We stand behind every installation with comprehensive warranties and responsive after-sales support." },
  { icon: Award, title: "Excellence", desc: "Only premium brands and certified technicians — no shortcuts, no compromises on quality." },
  { icon: Users, title: "Customer First", desc: "Every solution is tailored to the client's space, budget, and comfort requirements." },
  { icon: Target, title: "Innovation", desc: "We stay ahead with the latest energy-efficient and smart HVAC technologies." },
];

const milestones = [
  { year: "2017", text: "Founded in Bareilly as a small AC service workshop" },
  { year: "2020", text: "Became authorized Daikin dealer for the region" },
  { year: "2023", text: "Expanded to commercial VRV and chiller systems" },
  { year: "2026", text: "Completed landmark projects across UP including airports and hotels" },
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
          LIMRA Sales And Services is Bareilly's most trusted HVAC partner — delivering premium air conditioning solutions for homes, offices, hospitals, hotels, and industrial facilities.
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
    <section style={{ padding: "80px 24px", background: BRAND.bgSoft }}>
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div style={{
            display: "inline-block",
            background: `${BRAND.primary}1A`, border: `1px solid ${BRAND.primary}40`,
            color: BRAND.primary, fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "5px 14px", borderRadius: "100px", marginBottom: "18px"
          }}>Our Story</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: BRAND.dark, lineHeight: 1.2, marginBottom: "28px", fontWeight: 800 }}>
            From a Workshop to UP's Leading HVAC Partner
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", color: BRAND.slate400, lineHeight: 1.8, fontSize: "1.02rem", fontWeight: 300 }}>
            <p>What started as a humble air conditioning service workshop in Bareilly in 2017 has grown into one of the region's leading HVAC solutions providers. LIMRA Sales And Services was founded with a simple belief: everyone deserves reliable, energy-efficient comfort.</p>
            <p>Over the years, we've built deep partnerships with the world's finest brands — Daikin, Mitsubishi Heavy, Carrier, Midea, and more — becoming their authorized dealer and installation partner for residential and large-scale commercial projects.</p>
            <p>From cooling a single room to engineering climate control for airports and five-star hotels, our team of 50+ certified technicians delivers solutions that are designed to last, built to perform, and backed by our unwavering service commitment.</p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Values ── */}
    <section style={{ padding: "80px 24px", background: BRAND.white }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
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

    {/* ── Timeline ── */}
    <section style={{ padding: "80px 24px", background: BRAND.bgSoft }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{
            display: "inline-block",
            background: `${BRAND.primary}1A`, border: `1px solid ${BRAND.primary}40`,
            color: BRAND.primary, fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "5px 14px", borderRadius: "100px", marginBottom: "18px"
          }}>Milestones</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: BRAND.dark, lineHeight: 1.2, fontWeight: 800 }}>Our Journey</h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {milestones.map((m, i) => (
            <motion.div key={m.year}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } } }}
              style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
              <div style={{
                flexShrink: 0, width: "64px", height: "64px", borderRadius: "50%",
                background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)`,
                color: BRAND.white, display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: "0.8rem",
                boxShadow: `0 6px 20px ${BRAND.primary}48`
              }}>
                {m.year}
              </div>
              <div style={{
                paddingTop: "14px", flex: 1,
                borderBottom: i < milestones.length - 1 ? `1px solid ${BRAND.slate100}` : "none",
                paddingBottom: "24px"
              }}>
                <p style={{ color: BRAND.dark, fontWeight: 500, lineHeight: 1.6 }}>{m.text}</p>
              </div>
            </motion.div>
          ))}
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
        <a href="tel:+919839171701" style={{
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
