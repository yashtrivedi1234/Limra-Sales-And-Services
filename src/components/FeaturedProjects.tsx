import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BRAND } from "@/lib/colors";

import { useGetProjectsQuery } from "@/store/api";
import Loader from "@/components/ui/Loader";

// ─── Per-card content animation variants ────────────────────────────────────
const clientVariant = {
  rest: { opacity: 0, x: -30 },
  hover: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const titleVariant = {
  rest: { opacity: 0, y: 28 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut", delay: 0.07 } },
};

const locationVariant = {
  rest: { opacity: 0, y: -20 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut", delay: 0.14 } },
};

const arrowVariant = {
  rest: { opacity: 0, x: 20 },
  hover: { opacity: 1, x: 0, transition: { duration: 0.32, ease: "easeOut", delay: 0.2 } },
};

const overlayVariant = {
  rest: { background: `linear-gradient(to top, rgba(10,10,20,0.55) 0%, rgba(10,10,20,0.10) 60%, transparent 100%)` },
  hover: { background: `linear-gradient(to top, rgba(10,10,20,0.88) 0%, rgba(10,10,20,0.38) 55%, transparent 100%)` },
};

const imageVariant = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

import { useNavigate } from "react-router-dom";

// ─── Single Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, i }: { project: any; i: number }) {
  const navigate = useNavigate();
  return (
    <motion.div
      onClick={() => navigate("/case-studies")}
      key={project._id || project.title}
      initial="rest"
      whileHover="hover"
      animate="rest"
      style={{
        cursor: "pointer",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: `0 4px 24px ${BRAND.primary}1A`,
        background: BRAND.white,
        position: "relative",
      }}
    >
      {/* Entry animation wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1 }}
        style={{ height: "100%" }}
      >
        {/* Image container */}
        <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>

          {/* Zoom image */}
          <motion.img
            variants={imageVariant}
            src={project.featuredImage || project.images?.[0] || ""}
            alt={project.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transformOrigin: "center center",
            }}
          />

          {/* Overlay darkens on hover */}
          <motion.div
            variants={overlayVariant}
            transition={{ duration: 0.45 }}
            style={{ position: "absolute", inset: 0 }}
          />

          {/* Content layer */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "24px 20px 20px",
            }}
          >
            {/* Client — slides in from LEFT */}
            

            {/* Title — slides in from BOTTOM */}
            <motion.h3
              variants={titleVariant}
              style={{
                color: BRAND.white,
                fontSize: "1.25rem",
                marginBottom: "4px",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </motion.h3>

            {/* Arrow CTA — slides in from RIGHT */}
            <motion.div
              variants={arrowVariant}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: BRAND.accentOnDark,
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              View Project <ArrowRight size={14} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function FeaturedProjects() {
  const { data: projects = [], isLoading } = useGetProjectsQuery();
  const featured = projects.slice(0, 3);

  if (isLoading) return <Loader />;
  if (featured.length === 0) return null;

  return (
    <section style={{ padding: "64px 0", background: "rgb(215 242 255 / 58%)", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
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
            View All Projects <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }}>
          {featured.map((project: any, i: number) => (
            <ProjectCard key={project._id || project.title} project={project} i={i} />
          ))}
        </div>

      </div>
    </section>
  );
}