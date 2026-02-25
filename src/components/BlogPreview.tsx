import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const BlogPreview = () => {
  const featured = blogPosts.slice(0, 3);

  return (
    <section style={{
      padding: "96px 0",
      background: COLORS.slate50,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>

        {/* Header */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <div style={{
            display: "inline-block",
            background: "rgba(29,78,216,0.1)", border: "1px solid rgba(29,78,216,0.25)",
            color: COLORS.blue, fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "5px 14px", borderRadius: "100px", marginBottom: "16px"
          }}>
            From Our Blog
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: COLORS.navy, lineHeight: 1.15
          }}>
            HVAC Insights & Tips
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px", maxWidth: "1100px", margin: "0 auto 48px"
        }}>
          {featured.map((post, i) => (
            <motion.article
              key={post.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }
              }}
            >
              <Link
                to={`/blog/${post.slug}`}
                style={{ textDecoration: "none", display: "block", height: "100%" }}
              >
                <div style={{
                  background: COLORS.white,
                  border: `1px solid ${COLORS.slate100}`,
                  borderRadius: "20px", overflow: "hidden",
                  height: "100%", display: "flex", flexDirection: "column",
                  boxShadow: "0 2px 16px rgba(29,78,216,0.07)",
                  transition: "all 0.3s",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(29,78,216,0.14)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(29,78,216,0.07)";
                  }}
                >
                  {/* Top blue accent */}
                  <div style={{
                    height: "3px",
                    background: `linear-gradient(90deg, ${COLORS.navy}, ${COLORS.blueLight})`
                  }} />

                  {/* Image */}
                  <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                    <img
                      src={post.image} alt={post.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", display: "block" }}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: "5px",
                        padding: "4px 10px", borderRadius: "100px",
                        background: COLORS.blueSky, color: COLORS.blue,
                        fontWeight: 700, fontSize: "0.72rem"
                      }}>
                        <Tag size={10} /> {post.category}
                      </span>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: "5px",
                        fontSize: "0.75rem", color: COLORS.slate400
                      }}>
                        <Clock size={10} /> {post.readTime}
                      </span>
                    </div>

                    <h3 style={{
                      fontWeight: 700, color: COLORS.navy, marginBottom: "10px",
                      fontSize: "1rem", lineHeight: 1.45,
                      display: "-webkit-box", WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical", overflow: "hidden"
                    }}>
                      {post.title}
                    </h3>

                    <p style={{
                      fontSize: "0.87rem", color: COLORS.slate400,
                      lineHeight: 1.65, flex: 1,
                      display: "-webkit-box", WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical", overflow: "hidden"
                    }}>
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ textAlign: "center" }}
        >
          <Link
            to="/blog"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "13px 28px",
              background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.blue} 100%)`,
              color: COLORS.white, fontWeight: 700, fontSize: "0.9rem",
              borderRadius: "100px", textDecoration: "none",
              boxShadow: "0 8px 24px rgba(29,78,216,0.3)",
              transition: "opacity 0.2s"
            }}
          >
            View All Articles <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreview;