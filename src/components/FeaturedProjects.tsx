import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BRAND } from "@/lib/colors";

const projects = [
  { name: "Invertis University", location: "Bareilly, UP", units: "200+ Units", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80" },
  { name: "Jim Corbett Marriott Resort", location: "Jim Corbett, Uttarakhand", units: "150+ Units", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80" },
  { name: "Bareilly Airport", location: "Bareilly, UP", units: "80+ Units", image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=80" },
];

export default function FeaturedProjects() {
  return (
    <section style={{ padding: "100px 0", background: BRAND.bgSoft, fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <div style={{
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
            marginBottom: "18px"
          }}>
            Portfolio
          </div>

          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            color: BRAND.dark,
            lineHeight: 1.15,
            marginBottom: "16px"
          }}>
           Featured Projects
          </h2>

          <Link
            to="/case-studies"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: BRAND.primary,
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none"
            }}
          >
            View All Case Studies <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* ✅ GRID LAYOUT */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              style={{
                cursor: "pointer",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: `0 4px 24px ${BRAND.primary}1A`,
                background: BRAND.white
              }}
            >
              <div style={{ position: "relative", aspectRatio: "4/3" }}>
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(to top, ${BRAND.dark}D9 0%, ${BRAND.dark}33 50%, ${BRAND.primary}0D 100%)`
                }} />

                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "20px"
                }}>
                  <span style={{
                    display: "inline-block",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: BRAND.accentOnDark,
                    marginBottom: "6px"
                  }}>
                    {project.units}
                  </span>

                  <h3 style={{
                    color: BRAND.white,
                    fontSize: "1.25rem",
                    marginBottom: "4px",
                    fontWeight: 700
                  }}>
                    {project.name}
                  </h3>

                  <p style={{
                    color: BRAND.textOnDarkMuted,
                    fontSize: "0.85rem"
                  }}>
                    {project.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}