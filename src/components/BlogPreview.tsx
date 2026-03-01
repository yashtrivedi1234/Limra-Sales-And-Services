import { Link, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Clock, Tag, ChevronRight } from "lucide-react";
import { useGetBlogsQuery } from "@/store/api";
import { BRAND } from "@/lib/colors";
import Loader from "@/components/ui/Loader";
import { useRef, useState } from "react";

/* ─── Directional variants ─────────────────────────────────────── */
const categoryVariant = {
  rest: { opacity: 0, x: -28 },
  hover: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const titleVariant = {
  rest: { opacity: 0, y: 26 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut", delay: 0.07 } },
};

const excerptVariant = {
  rest: { opacity: 0, y: -20 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.36, ease: "easeOut", delay: 0.13 } },
};

const ctaVariant = {
  rest: { opacity: 0, x: 24 },
  hover: { opacity: 1, x: 0, transition: { duration: 0.33, ease: "easeOut", delay: 0.2 } },
};

const overlayVariant = {
  rest: { background: `linear-gradient(to top, rgba(10,10,20,0.60) 0%, rgba(10,10,20,0.15) 60%, transparent 100%)` },
  hover: { background: `linear-gradient(to top, rgba(10,10,20,0.92) 0%, rgba(10,10,20,0.45) 55%, transparent 100%)` },
};

const imageVariant = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/* ─── Magnetic 3D Card ─────────────────────────────────────────── */
const MagneticCard = ({
  children,
  style,
  onClick,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });
  const scale = useSpring(hovered ? 1.03 : 1, { stiffness: 300, damping: 25 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{
        ...style,
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: 1000,
        cursor: "pointer",
      }}
    >
      {children}
    </motion.div>
  );
};

/* ─── Shimmer line ──────────────────────────────────────────────── */
const ShimmerLine = () => (
  <motion.div
    style={{
      height: "2px",
      background: `linear-gradient(90deg, transparent, ${BRAND.primary}, transparent)`,
      marginBottom: "48px",
      borderRadius: "2px",
    }}
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, ease: "easeInOut" }}
  />
);

/* ─── Floating orbs background ────────────────────────────────── */
const FloatingOrbs = () => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
    {[
      { size: 320, top: "-80px", left: "-80px", delay: 0 },
      { size: 200, bottom: "40px", right: "10%", delay: 1.5 },
      { size: 140, top: "30%", right: "-40px", delay: 0.8 },
    ].map((orb, i) => (
      <motion.div
        key={i}
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
        style={{
          position: "absolute",
          width: orb.size,
          height: orb.size,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BRAND.primary}18 0%, transparent 70%)`,
          top: (orb as any).top,
          bottom: (orb as any).bottom,
          left: (orb as any).left,
          right: (orb as any).right,
          filter: "blur(40px)",
        }}
      />
    ))}
  </div>
);

/* ─── Number counter badge ─────────────────────────────────────── */
const NumberBadge = ({ num }: { num: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ type: "spring", delay: num * 0.15, stiffness: 260, damping: 20 }}
    style={{
      position: "absolute",
      top: "16px",
      left: "16px",
      zIndex: 10,
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      background: BRAND.primary,
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 900,
      fontSize: "0.8rem",
      letterSpacing: "0.05em",
      boxShadow: `0 4px 16px ${BRAND.primary}66`,
    }}
  >
    0{num + 1}
  </motion.div>
);

/* ─── Card Shine overlay on hover ──────────────────────────────── */
const ShineCard = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{ position: "relative", ...style, overflow: "hidden" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: visible
            ? `radial-gradient(circle 180px at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.13), transparent 70%)`
            : "transparent",
          transition: "background 0.15s ease",
          borderRadius: "inherit",
          zIndex: 5,
        }}
      />
    </div>
  );
};

/* ─── Single Blog Card ──────────────────────────────────────────── */
const BlogCard = ({ post, i }: { post: any; i: number }) => {
  const navigate = useNavigate();

  return (
    <MagneticCard
      key={post.slug || post._id}
      onClick={() => navigate(`/blog/${post.slug || post._id}`)}
      style={{ display: "block" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <ShineCard
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: `0 8px 32px ${BRAND.primary}18, 0 2px 8px rgba(0,0,0,0.08)`,
            background: BRAND.white,
          }}
        >
          {/* ── Hover wrapper for directional reveal ── */}
          <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}
          >
            <NumberBadge num={i} />

            {/* Zoom Image */}
            <motion.img
              variants={imageVariant}
              src={post.image}
              alt={post.title}
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
              style={{ position: "absolute", inset: 0, zIndex: 1 }}
            />

            {/* Animated accent line at top */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: `linear-gradient(90deg, ${BRAND.primary}, transparent)`,
                transformOrigin: "left",
                zIndex: 2,
              }}
            />

            {/* ── Content: directional reveal ── */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "28px 24px 24px",
                zIndex: 3,
              }}
            >
              {/* Category + Read time — slide from LEFT */}
              <motion.div
                variants={categoryVariant}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: BRAND.primary,
                    background: `${BRAND.primary}22`,
                    border: `1px solid ${BRAND.primary}44`,
                    padding: "3px 10px",
                    borderRadius: "100px",
                  }}
                >
                  <Tag size={10} /> {post.category || "Blog"}
                </span>

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "0.73rem",
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  <Clock size={11} /> {post.readTime || "5 min"}
                </span>
              </motion.div>

              {/* Title — slide from BOTTOM */}
              <motion.h3
                variants={titleVariant}
                style={{
                  color: "#fff",
                  fontSize: "1.18rem",
                  marginBottom: "8px",
                  fontWeight: 700,
                  lineHeight: 1.4,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {post.title}
              </motion.h3>

              {/* Excerpt — slide from TOP */}
              <motion.p
                variants={excerptVariant}
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "0.83rem",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  margin: "0 0 14px",
                  lineHeight: 1.5,
                }}
              >
                {post.excerpt ||
                  (Array.isArray(post.content)
                    ? post.content[0]?.slice(0, 80)
                    : post.content?.slice(0, 80))}
                ...
              </motion.p>

              {/* Read more CTA — slide from RIGHT */}
              <motion.div
                variants={ctaVariant}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  color: BRAND.primary,
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  letterSpacing: "0.04em",
                }}
              >
                Read Article <ChevronRight size={15} />
              </motion.div>
            </div>
          </motion.div>
        </ShineCard>
      </motion.div>
    </MagneticCard>
  );
};

/* ─── BlogPreview ───────────────────────────────────────────────── */
const BlogPreview = () => {
  const { data: blogPosts = [], isLoading } = useGetBlogsQuery();
  const featured = blogPosts.slice(0, 3);

  if (isLoading) return <Loader />;
  if (featured.length === 0) return null;

  return (
    <section
      style={{
        padding: "96px 0 80px",
        background: "rgb(215 242 255 / 58%)",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FloatingOrbs />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: "24px" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: `${BRAND.primary}18`,
              border: `1px solid ${BRAND.primary}40`,
              color: BRAND.primary,
              fontWeight: 700,
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "5px 16px",
              borderRadius: "100px",
              marginBottom: "20px",
            }}
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              ✦
            </motion.span>
            From Our Blog
          </motion.div>

          <h2
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              color: BRAND.dark,
              lineHeight: 1.12,
              marginBottom: "20px",
            }}
          >
            {"HVAC Insights & Tips".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.025, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char}
              </motion.span>
            ))}
          </h2>

          <motion.div whileHover="hover" initial="rest" style={{ display: "inline-block" }}>
            <Link
              to="/blog"
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
              View All Articles
              <motion.span
                variants={{ rest: { x: 0 }, hover: { x: 6 } }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{ display: "flex", alignItems: "center" }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        <ShimmerLine />

        {/* ── Grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
          {featured.map((post: any, i: number) => (
            <BlogCard key={post.slug || post._id} post={post} i={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogPreview;