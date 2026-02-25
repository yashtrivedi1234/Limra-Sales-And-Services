import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const COLORS = {
  navy: "#0B1F4B",
  blue: "#1D4ED8",
  blueLight: "#3B82F6",
  white: "#FFFFFF",
  slate50: "#F8FAFF",
  slate100: "#E8EFFF",
  slate400: "#6B8AC7",
};

const projects = [
  {
    name: "Invertis University",
    location: "Bareilly, UP",
    units: "200+ Units",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
  },
  {
    name: "Jim Corbett Marriott Resort",
    location: "Jim Corbett, Uttarakhand",
    units: "150+ Units",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  },
  {
    name: "Bareilly Airport",
    location: "Bareilly, UP",
    units: "80+ Units",
    image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=80",
  },
  {
    name: "Bareilly Haat",
    location: "Bareilly, UP",
    units: "120+ Units",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
];

export default function FeaturedProjects() {
  const scrollRef = useRef(null);

  return (
    <section style={{ padding: "100px 0", background: COLORS.slate50, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <div style={{
            display: "inline-block",
            background: "rgba(29,78,216,0.1)", border: "1px solid rgba(29,78,216,0.25)",
            color: "#1D4ED8", fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "5px 14px", borderRadius: "100px", marginBottom: "18px"
          }}>
            Portfolio
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)", color: COLORS.navy, lineHeight: 1.15, marginBottom: "16px"
          }}>
            Featured Projects
          </h2>
          <Link
            to="/case-studies"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: COLORS.blue, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none"
            }}
          >
            View All Case Studies <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        style={{
          display: "flex", gap: "20px",
          overflowX: "auto", padding: "0 48px 16px",
          scrollbarWidth: "none", msOverflowStyle: "none"
        }}
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
            style={{
              flexShrink: 0, width: "380px", cursor: "pointer",
              borderRadius: "20px", overflow: "hidden",
              boxShadow: "0 4px 24px rgba(29,78,216,0.10)"
            }}
          >
            <div style={{ position: "relative", aspectRatio: "4/3" }}>
              <img
                src={project.image} alt={project.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s" }}
              />
              {/* Blue-tinted overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(11,31,75,0.85) 0%, rgba(11,31,75,0.2) 50%, rgba(29,78,216,0.05) 100%)"
              }} />
              {/* Blue top border */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "4px",
                background: `linear-gradient(90deg, ${COLORS.navy}, ${COLORS.blueLight})`
              }} />
              {/* Text */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px" }}>
                <span style={{
                  display: "inline-block", fontSize: "0.72rem", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.12em",
                  color: "#93C5FD", marginBottom: "6px"
                }}>
                  {project.units}
                </span>
                <h3 style={{
                  fontFamily: "'DM Serif Display', serif",
                  color: COLORS.white, fontSize: "1.25rem", marginBottom: "4px"
                }}>
                  {project.name}
                </h3>
                <p style={{ color: "rgba(219,234,254,0.65)", fontSize: "0.85rem" }}>{project.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}