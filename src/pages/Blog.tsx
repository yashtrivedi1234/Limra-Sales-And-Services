import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
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

const Blog = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=DM+Serif+Display:ital@0;1&display=swap');
      .blog-page { font-family: 'DM Sans', sans-serif; }
    `}</style>

    <main className="blog-page" style={{ paddingTop: "68px" }}>

      {/* ── Hero ── */}
      <section style={{
        background: "linear-gradient(135deg, #0B1F4B 0%, #1A3580 50%, #1D4ED8 100%)",
        padding: "80px 24px 100px",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.08,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "32px 32px", pointerEvents: "none"
        }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "680px", margin: "0 auto" }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ color: "#93C5FD", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
            Our Blog
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#ffffff", lineHeight: 1.1, marginBottom: "20px" }}>
            HVAC Insights &amp; Tips
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ color: "rgba(219,234,254,0.75)", fontSize: "1.05rem", fontWeight: 300 }}>
            Expert advice on air conditioning, maintenance, and energy efficiency.
          </motion.p>
        </div>
        <div style={{
          position: "absolute", bottom: -2, left: 0, right: 0, height: "70px",
          background: COLORS.slate50, clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0% 100%)"
        }} />
      </section>

      {/* ── Blog Grid ── */}
      <section style={{ padding: "80px 24px", background: COLORS.slate50 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px"
          }}>
            {blogPosts.map((post, i) => (
              <motion.article key={post.slug}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } } }}>
                <Link to={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                  <div
                    style={{
                      background: COLORS.white, borderRadius: "20px",
                      border: `1px solid ${COLORS.slate100}`, overflow: "hidden",
                      height: "100%", display: "flex", flexDirection: "column",
                      boxShadow: "0 2px 16px rgba(29,78,216,0.07)",
                      transition: "all 0.3s"
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 36px rgba(29,78,216,0.13)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(29,78,216,0.07)";
                    }}
                  >
                    {/* Top blue bar */}
                    <div style={{ height: "3px", background: `linear-gradient(90deg, ${COLORS.navy}, ${COLORS.blueLight})` }} />

                    {/* Image with category badge */}
                    <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", background: COLORS.slate100 }}>
                      <img src={post.image} alt={post.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s" }}
                      />
                      <div style={{ position: "absolute", top: "14px", left: "14px", zIndex: 10 }}>
                        <span style={{
                          background: COLORS.navy, color: "#ffffff",
                          fontSize: "0.7rem", fontWeight: 700,
                          padding: "5px 12px", borderRadius: "100px",
                          letterSpacing: "0.05em"
                        }}>
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                      {/* Meta */}
                      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "14px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.78rem", color: COLORS.slate400 }}>
                          <Calendar size={12} /> {post.date || "1 November 2024"}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.78rem", color: COLORS.slate400 }}>
                          <Clock size={12} /> {post.readTime}
                        </span>
                      </div>

                      <h2 style={{
                        fontWeight: 700, color: COLORS.navy,
                        marginBottom: "10px", fontSize: "1.05rem",
                        lineHeight: 1.4, flex: 1,
                        display: "-webkit-box", WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical", overflow: "hidden"
                      }}>
                        {post.title}
                      </h2>

                      <p style={{
                        fontSize: "0.875rem", color: COLORS.slate400, lineHeight: 1.65,
                        marginBottom: "20px",
                        display: "-webkit-box", WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical", overflow: "hidden"
                      }}>
                        {post.excerpt}
                      </p>

                      {/* Bottom row */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "14px", borderTop: `1px solid ${COLORS.slate100}` }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {post.tags?.slice(0, 2).map((tag, idx) => (
                            <span key={idx} style={{
                              fontSize: "0.7rem", fontWeight: 600,
                              border: `1px solid ${COLORS.slate100}`,
                              color: COLORS.slate400,
                              padding: "3px 10px", borderRadius: "100px",
                              background: COLORS.bluePale
                            }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.85rem", fontWeight: 600, color: COLORS.blue, whiteSpace: "nowrap" }}>
                          Read Article <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  </>
);

export default Blog;