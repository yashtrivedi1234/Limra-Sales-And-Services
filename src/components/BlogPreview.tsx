import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { BRAND } from "@/lib/colors";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const BlogPreview = () => {
  const featured = blogPosts.slice(0, 3);

  return (
    <section style={{ padding: "96px 0", background: BRAND.bgSoft, fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ display: "inline-block", background: `${BRAND.primary}1A`, border: `1px solid ${BRAND.primary}40`, color: BRAND.primary, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "100px", marginBottom: "16px" }}>
            From Our Blog
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: BRAND.dark, lineHeight: 1.15 }}>
            HVAC Insights & Tips
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", maxWidth: "1100px", margin: "0 auto 48px" }}>
          {featured.map((post, i) => (
            <motion.article
              key={post.slug}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } } }}
            >
              <Link to={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <div
                  style={{
                    background: BRAND.white, border: `1px solid ${BRAND.slate100}`,
                    borderRadius: "20px", overflow: "hidden", height: "100%",
                    display: "flex", flexDirection: "column",
                    boxShadow: `0 2px 16px ${BRAND.primary}12`, transition: "all 0.3s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px ${BRAND.primary}24`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 16px ${BRAND.primary}12`; }}
                >
                  <div style={{ height: "3px", background: `linear-gradient(90deg, ${BRAND.dark}, ${BRAND.primary})` }} />
                  <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                    <img src={post.image} alt={post.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", display: "block" }} />
                  </div>
                  <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 10px", borderRadius: "100px", background: BRAND.primarySky, color: BRAND.primary, fontWeight: 700, fontSize: "0.72rem" }}>
                        <Tag size={10} /> {post.category}
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.75rem", color: BRAND.slate400 }}>
                        <Clock size={10} /> {post.readTime}
                      </span>
                    </div>
                    <h3 style={{ fontWeight: 700, color: BRAND.dark, marginBottom: "10px", fontSize: "1rem", lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {post.title}
                    </h3>
                    <p style={{ fontSize: "0.87rem", color: BRAND.slate400, lineHeight: 1.65, flex: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: "center" }}>
          <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 28px", background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)`, color: BRAND.white, fontWeight: 700, fontSize: "0.9rem", borderRadius: "100px", textDecoration: "none", boxShadow: `0 8px 24px ${BRAND.primary}4D`, transition: "opacity 0.2s" }}>
            View All Articles <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreview;
