import { motion } from "framer-motion";
import { Shield, Award, Users, Target, Phone } from "lucide-react";


const COLORS = {
  navy: "#0B1F4B",
  blue: "#1D4ED8",
  blueLight: "#3B82F6",
  blueSky: "#DBEAFE",
  bluePale: "#EFF6FF",
  white: "#FFFFFF",
  slate50: "#F8FAFF",
  slate100: "#E8EFFF",
  slate400: "#6B8AC7",
};

const stats = [
  { value: "9+", label: "Years Experience" },
  { value: "5000+", label: "Projects Completed" },
  { value: "50+", label: "Expert Technicians" },
  { value: "8+", label: "Premium Brands" },
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
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=DM+Serif+Display:ital@0;1&display=swap');
      .about-page { font-family: 'DM Sans', sans-serif; }
    `}</style>

    

    <main className="about-page" style={{ paddingTop: "68px" }}>

      {/* ── Hero ── */}
      <section style={{
        background: "linear-gradient(135deg, #0B1F4B 0%, #1A3580 50%, #1D4ED8 100%)",
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
            style={{ color: "#93C5FD", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
            About Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "#ffffff", lineHeight: 1.1, marginBottom: "24px" }}>
            Building Comfort <br />Since 2017
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ color: "rgba(219,234,254,0.75)", fontSize: "1.05rem", lineHeight: 1.75, fontWeight: 300 }}>
            LIMRA Sales And Services is Bareilly's most trusted HVAC partner — delivering premium air conditioning solutions for homes, offices, hospitals, hotels, and industrial facilities.
          </motion.p>
        </div>
        {/* Diagonal slice */}
        <div style={{
          position: "absolute", bottom: -2, left: 0, right: 0, height: "80px",
          background: COLORS.white, clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0% 100%)"
        }} />
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: "80px 24px", background: COLORS.white }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "24px" }}>
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } } }}
              style={{
                textAlign: "center", background: COLORS.bluePale,
                borderRadius: "16px", padding: "32px 20px",
                border: `1px solid ${COLORS.slate100}`
              }}>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "3rem", color: COLORS.blue, lineHeight: 1, marginBottom: "8px" }}>{s.value}</p>
              <p style={{ fontSize: "0.85rem", color: COLORS.slate400, fontWeight: 500 }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Our Story ── */}
      <section style={{ padding: "80px 24px", background: COLORS.slate50 }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div style={{
              display: "inline-block",
              background: "rgba(29,78,216,0.1)", border: "1px solid rgba(29,78,216,0.25)",
              color: COLORS.blue, fontWeight: 700, fontSize: "0.72rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "5px 14px", borderRadius: "100px", marginBottom: "18px"
            }}>Our Story</div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: COLORS.navy, lineHeight: 1.2, marginBottom: "28px" }}>
              From a Workshop to UP's Leading HVAC Partner
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", color: COLORS.slate400, lineHeight: 1.8, fontSize: "1.02rem", fontWeight: 300 }}>
              <p>What started as a humble air conditioning service workshop in Bareilly in 2017 has grown into one of the region's leading HVAC solutions providers. LIMRA Sales And Services was founded with a simple belief: everyone deserves reliable, energy-efficient comfort.</p>
              <p>Over the years, we've built deep partnerships with the world's finest brands — Daikin, Mitsubishi Heavy, Carrier, Midea, and more — becoming their authorized dealer and installation partner for residential and large-scale commercial projects.</p>
              <p>From cooling a single room to engineering climate control for airports and five-star hotels, our team of 50+ certified technicians delivers solutions that are designed to last, built to perform, and backed by our unwavering service commitment.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ padding: "80px 24px", background: COLORS.white }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{
              display: "inline-block",
              background: "rgba(29,78,216,0.1)", border: "1px solid rgba(29,78,216,0.25)",
              color: COLORS.blue, fontWeight: 700, fontSize: "0.72rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "5px 14px", borderRadius: "100px", marginBottom: "18px"
            }}>Our Values</div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: COLORS.navy, lineHeight: 1.2 }}>What Drives Us</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {values.map((v, i) => (
              <motion.div key={v.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } } }}
                style={{
                  background: COLORS.white, border: `1px solid ${COLORS.slate100}`,
                  borderRadius: "18px", padding: "28px",
                  boxShadow: "0 2px 16px rgba(29,78,216,0.07)",
                  position: "relative", overflow: "hidden"
                }}>
                <div style={{ height: "3px", position: "absolute", top: 0, left: 0, right: 0, background: `linear-gradient(90deg, ${COLORS.navy}, ${COLORS.blueLight})` }} />
                <div style={{
                  width: "48px", height: "48px", borderRadius: "12px",
                  background: COLORS.blueSky, display: "flex", alignItems: "center",
                  justifyContent: "center", marginBottom: "16px"
                }}>
                  <v.icon size={22} style={{ color: COLORS.blue }} />
                </div>
                <h3 style={{ fontWeight: 700, color: COLORS.navy, marginBottom: "8px", fontSize: "1rem" }}>{v.title}</h3>
                <p style={{ fontSize: "0.875rem", color: COLORS.slate400, lineHeight: 1.65 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ padding: "80px 24px", background: COLORS.slate50 }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{
              display: "inline-block",
              background: "rgba(29,78,216,0.1)", border: "1px solid rgba(29,78,216,0.25)",
              color: COLORS.blue, fontWeight: 700, fontSize: "0.72rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "5px 14px", borderRadius: "100px", marginBottom: "18px"
            }}>Milestones</div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: COLORS.navy, lineHeight: 1.2 }}>Our Journey</h2>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {milestones.map((m, i) => (
              <motion.div key={m.year}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } } }}
                style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <div style={{
                  flexShrink: 0, width: "64px", height: "64px", borderRadius: "50%",
                  background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.blue} 100%)`,
                  color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: "0.8rem",
                  boxShadow: "0 6px 20px rgba(29,78,216,0.28)"
                }}>
                  {m.year}
                </div>
                <div style={{
                  paddingTop: "14px", flex: 1,
                  borderBottom: i < milestones.length - 1 ? `1px solid ${COLORS.slate100}` : "none",
                  paddingBottom: "24px"
                }}>
                  <p style={{ color: COLORS.navy, fontWeight: 500, lineHeight: 1.6 }}>{m.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: "96px 24px", textAlign: "center",
        background: "linear-gradient(135deg, #0B1F4B 0%, #1A3580 50%, #1D4ED8 100%)",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.1,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px", pointerEvents: "none"
        }} />
        <div style={{ maxWidth: "600px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#ffffff", marginBottom: "16px" }}>
            Ready to Work With Us?
          </h2>
          <p style={{ color: "rgba(219,234,254,0.75)", marginBottom: "36px", fontSize: "1.05rem", fontWeight: 300 }}>
            Whether it's a residential split AC or a commercial VRV system — we've got you covered.
          </p>
        

<a
  href="tel:+919839171701"
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 36px",
    background: COLORS.white,
    color: COLORS.navy,
    fontWeight: 700,
    fontSize: "0.95rem",
    borderRadius: "100px",
    textDecoration: "none",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-3px) scale(1.03)";
    e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.25)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0) scale(1)";
    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
  }}
>
  <Phone
    size={18}
    style={{ transition: "transform 0.3s ease" }}
    className="phone-icon"
  />
  Get a Free Consultation
</a>
        </div>
      </section>
    </main>

    
  </>
);

export default About;