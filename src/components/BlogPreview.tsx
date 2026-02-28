import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { useGetBlogsQuery } from "@/store/api";
import { BRAND } from "@/lib/colors";
import Loader from "@/components/ui/Loader";

const BlogPreview = () => {
  const { data: blogPosts = [], isLoading } = useGetBlogsQuery();
  const featured = blogPosts.slice(0, 3);

  if (isLoading) return <Loader />;
  if (featured.length === 0) return null;

  return (
    <section style={{ padding: "64px 0", background: BRAND.bgSoft, fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
        
        {/* Header (Matched with FeaturedProjects) */}
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
            From Our Blog
          </div>

          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            color: BRAND.dark,
            lineHeight: 1.15,
            marginBottom: "16px"
          }}>
            HVAC Insights & Tips
          </h2>

          <Link
            to="/blog"
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
            View All Articles <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* GRID LAYOUT (Matched with FeaturedProjects) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          {featured.map((post: any, i: number) => (
            <Link 
              to={`/blog/${post.slug || post._id}`} 
              key={post.slug || post._id}
              style={{ textDecoration: "none", display: "block" }}
            >
              <motion.div
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
                  {/* Background Image */}
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Gradient Overlay */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(to top, ${BRAND.dark}E6 0%, ${BRAND.dark}66 50%, ${BRAND.primary}0D 100%)`
                }} />

                {/* Content Overlay */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "24px"
                }}>
                  {/* Category & Read Time */}
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "12px", 
                    marginBottom: "8px" 
                  }}>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: BRAND.primary, // Using primary color to stand out against dark overlay
                    }}>
                      <Tag size={12} /> {post.category || "Blog"}
                    </span>
                    
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.7)"
                    }}>
                      <Clock size={12} /> {post.readTime || "5 min"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    color: BRAND.white,
                    fontSize: "1.25rem",
                    marginBottom: "8px",
                    fontWeight: 700,
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}>
                    {post.title}
                  </h3>

                  {/* Optional: Short Excerpt (You can remove this if you strictly want just the title like the projects) */}
                  <p style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.85rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    margin: 0
                  }}>
                    {post.excerpt || (Array.isArray(post.content) ? post.content[0]?.slice(0, 80) : post.content?.slice(0, 80))}...
                  </p>
                </div>
              </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;