import { Link, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Clock, Tag, ChevronRight } from "lucide-react";
import { useGetBlogsQuery } from "@/store/api";
import { BRAND } from "@/lib/colors";
import Loader from "@/components/ui/Loader";
import { useRef, useState } from "react";

/* ─── Magnetic 3D Card ─────────────────────────────────────────── */
const MagneticCard = ({ children, style, onClick }: { children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void }) => {
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

/* ─── BlogPreview ───────────────────────────────────────────────── */
const BlogPreview = () => {
  const { data: blogPosts = [], isLoading } = useGetBlogsQuery();
  const navigate = useNavigate();
  const featured = blogPosts.slice(0, 3);

  if (isLoading) return <Loader />;
  if (featured.length === 0) return null;

  return (
    <section
      style={{
        padding: "96px 0 80px",
        background: BRAND.bgSoft,
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
          {/* pill badge */}
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
            {/* Letter-by-letter stagger on "HVAC" */}
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

          {/* Animated "View All" link */}
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
          }}
        >
          {featured.map((post: any, i: number) => (
            <MagneticCard
              key={post.slug || post._id}
              onClick={() => navigate(`/blog/${post.slug || post._id}`)}
              style={{ display: "block" }}
            >
              <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.12,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ShineCard
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: `0 8px 32px ${BRAND.primary}18, 0 2px 8px rgba(0,0,0,0.08)`,
                      background: BRAND.white,
                    }}
                  >
                    {/* Image Container */}
                    <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                      <NumberBadge num={i} />

                      {/* Image with zoom on hover */}
                      <motion.img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />

                      {/* Dark gradient overlay */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: `linear-gradient(to top, ${BRAND.dark}F0 0%, ${BRAND.dark}55 55%, ${BRAND.primary}0D 100%)`,
                          zIndex: 1,
                        }}
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

                      {/* Content overlay */}
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: "28px 24px 24px",
                          zIndex: 3,
                        }}
                      >
                        {/* Category & Read Time */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "10px",
                          }}
                        >
                          <motion.span
                            whileHover={{ scale: 1.06 }}
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
                          </motion.span>

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
                        </div>

                        {/* Title */}
                        <h3
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
                        </h3>

                        {/* Excerpt */}
                        <p
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
                        </p>

                        {/* Read more CTA */}
                        <motion.div
                          whileHover="hover"
                          initial="rest"
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
                          Read Article
                          <motion.span
                            variants={{ rest: { x: 0 }, hover: { x: 5 } }}
                            transition={{ type: "spring", stiffness: 400 }}
                            style={{ display: "flex" }}
                          >
                            <ChevronRight size={15} />
                          </motion.span>
                        </motion.div>
                      </motion.div>
                    </div>
                  </ShineCard>
                </motion.div>
              </MagneticCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;