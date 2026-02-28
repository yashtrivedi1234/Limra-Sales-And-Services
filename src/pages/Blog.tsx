import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { useGetBlogsQuery } from "@/store/api";
import { BRAND } from "@/lib/colors";
import React from 'react';
import Loader from "@/components/ui/Loader";

const Blog = () => {
  const { data: blogPosts = [], isLoading } = useGetBlogsQuery();

  if (isLoading) return <Loader />;

  return (
  <main style={{ fontFamily: "'Inter', sans-serif" }}>

    {/* ── Hero ── */}
    <section style={{
      background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.darkMid} 50%, ${BRAND.primary} 100%)`,
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
          style={{ color: BRAND.accentOnDark, fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
          Our Blog
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: BRAND.white, lineHeight: 1.1, marginBottom: "20px", fontWeight: 800 }}>
          HVAC Insights &amp; Tips
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ color: BRAND.textOnDark, fontSize: "1.05rem", fontWeight: 300 }}>
          Expert advice on air conditioning, maintenance, and energy efficiency.
        </motion.p>
      </div>
      <div style={{
        position: "absolute", bottom: -2, left: 0, right: 0, height: "70px",
        background: BRAND.bgSoft, clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0% 100%)"
      }} />
    </section>

    {/* ── Blog Grid ── */}
    <section style={{ padding: "80px 24px", background: BRAND.bgSoft }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
          {blogPosts.map((post: any, i: number) => (
            <motion.article key={post.slug || post._id}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } } }}>
              <Link to={`/blog/${post.slug || post._id}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <div style={{
                  background: BRAND.white, borderRadius: "20px",
                  border: `1px solid ${BRAND.slate100}`, overflow: "hidden",
                  height: "100%", display: "flex", flexDirection: "column",
                  boxShadow: `0 2px 16px ${BRAND.primary}14`,
                  transition: "all 0.3s"
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 36px ${BRAND.primary}22`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 16px ${BRAND.primary}14`;
                  }}>
                  <div style={{ height: "3px", background: `linear-gradient(90deg, ${BRAND.dark}, ${BRAND.primary})` }} />
                  <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", background: BRAND.slate100 }}>
                    <img src={post.image} alt={post.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s" }}
                    />
                    <div style={{ position: "absolute", top: "14px", left: "14px", zIndex: 10 }}>
                      <span style={{
                        background: BRAND.dark, color: BRAND.white,
                        fontSize: "0.7rem", fontWeight: 700,
                        padding: "5px 12px", borderRadius: "100px",
                        letterSpacing: "0.05em"
                      }}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "14px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.78rem", color: BRAND.slate400 }}>
                        <Calendar size={12} /> {post.date || "1 November 2024"}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.78rem", color: BRAND.slate400 }}>
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>
                    <h2 style={{
                      fontWeight: 700, color: BRAND.dark,
                      marginBottom: "10px", fontSize: "1.05rem",
                      lineHeight: 1.4, flex: 1,
                      display: "-webkit-box", WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical", overflow: "hidden"
                    }}>
                      {post.title}
                    </h2>
                    <p style={{
                      fontSize: "0.875rem", color: BRAND.slate400, lineHeight: 1.65,
                      marginBottom: "20px",
                      display: "-webkit-box", WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical", overflow: "hidden"
                    }}>
                      {post.excerpt}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "14px", borderTop: `1px solid ${BRAND.slate100}` }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {post.tags?.slice(0, 2).map((tag, idx) => (
                          <span key={idx} style={{
                            fontSize: "0.7rem", fontWeight: 600,
                            border: `1px solid ${BRAND.slate100}`,
                            color: BRAND.slate400,
                            padding: "3px 10px", borderRadius: "100px",
                            background: BRAND.primaryPale
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.85rem", fontWeight: 600, color: BRAND.primary, whiteSpace: "nowrap" }}>
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
  );
};

export default Blog;
