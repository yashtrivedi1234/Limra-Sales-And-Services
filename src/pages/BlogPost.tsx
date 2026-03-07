import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  ArrowLeft,
  Tag,
  Facebook,
  Twitter,
  Linkedin,
  ChevronUp,
} from "lucide-react";
import { useGetBlogsQuery } from "@/store/api";
import CTASection from "@/components/CTASection";

const SplitHeading = ({ text }: { text: string }) => (
  <h1
    style={{
      color: "white",        /* override global brand-dark → white for hero */
      marginBottom: "2rem",
      letterSpacing: "-0.02em",
    }}
  >
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 40, rotateX: -90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 0.02 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: char === " " ? "inline" : "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </h1>
);

const BlogPost = () => {
  const { slug } = useParams();
  const { data: blogPosts = [], isLoading } = useGetBlogsQuery();

  const post = blogPosts.find((p: any) => p.slug === slug || String(p._id) === slug);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const [showScrollTop, setShowScrollTop] = useState(false);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        Loading article...
      </div>
    );
  if (!post) return <Navigate to="/blog" replace />;

  const relatedPosts = blogPosts
    .filter((p: any) => p.slug !== slug && String(p._id) !== slug)
    .slice(0, 3);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(post.title || "");

  const socialButtons = [
    {
      Icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: "Share on Facebook",
      hoverBg: "#1877F2",
    },
    {
      Icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      label: "Share on Twitter / X",
      hoverBg: "#1DA1F2",
    },
    {
      Icon: Linkedin,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      label: "Share on LinkedIn",
      hoverBg: "#0A66C2",
    },
  ];

  return (
    <div
      className="bg-background min-h-screen"
      style={{ color: "hsl(var(--foreground))" }}
      ref={containerRef}
    >
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          width: "100%",
          height: "85vh",
          minHeight: "600px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          overflow: "hidden",
          background: "var(--hero-gradient)",
        }}
      >
        {/* Orbs */}
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "25%",
            width: "500px",
            height: "500px",
            background: "hsl(0 0% 100% / 0.1)",
            borderRadius: "50%",
            filter: "blur(100px)",
            pointerEvents: "none",
            animation: "pulse 3s infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "25%",
            right: "25%",
            width: "400px",
            height: "400px",
            background: "hsl(var(--brand-sky) / 0.1)",
            borderRadius: "50%",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, hsl(var(--brand-dark) / 0.8), transparent)",
          }}
        />

        <motion.div
          style={{
            opacity: heroOpacity,
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: "64rem",
            padding: "0 1.5rem 6rem",
          }}
        >
          <Link
            to="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "hsl(var(--brand-sky))",
              textDecoration: "none",
              marginBottom: "2rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "white")}
            onMouseLeave={e =>
              ((e.currentTarget as HTMLElement).style.color = "hsl(var(--brand-sky))")
            }
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "100px",
                border: "1px solid hsl(0 0% 100% / 0.3)",
                background: "hsl(0 0% 100% / 0.1)",
                color: "white",
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                backdropFilter: "blur(12px)",
                marginBottom: "1.5rem",
              }}
            >
              <Tag size={12} /> {post.category}
            </motion.span>

            <SplitHeading text={post.title} />
          </div>
        </motion.div>
      </section>

      {/* ── ARTICLE CARD ── */}
      <main
        style={{
          position: "relative",
          zIndex: 20,
          width: "100%",
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 1rem 0.5rem",
          marginTop: "-4rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            background: "hsl(var(--card))",
            borderRadius: "calc(var(--radius) * 2)",
            boxShadow: "0 25px 60px hsl(var(--brand-dark) / 0.1)",
            padding: "clamp(1.5rem, 4vw, 4rem)",
            border: "1px solid hsl(var(--border))",
            position: "relative",
          }}
        >
          {/* Top gradient accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(to right, hsl(var(--brand-dark)), hsl(var(--primary)))",
              borderRadius: "calc(var(--radius) * 2) calc(var(--radius) * 2) 0 0",
            }}
          />

          {/* Read time badge */}
          <div
            style={{
              position: "absolute",
              top: "-16px",
              right: "2rem",
              background: "hsl(var(--brand-dark))",
              color: "white",
              padding: "6px 20px",
              borderRadius: "100px",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              boxShadow: "0 8px 20px hsl(var(--brand-dark) / 0.2)",
            }}
          >
            {post.readTime} Read
          </div>

          {/* ── Share strip ── */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              paddingBottom: "2rem",
              marginBottom: "2.5rem",
              borderBottom: "1px solid hsl(var(--border))",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "hsl(var(--muted-foreground))",
              }}
            >
              Share this article
            </span>
            <div style={{ display: "flex", gap: "12px" }}>
              {socialButtons.map(({ Icon, href, label, hoverBg }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "1px solid hsl(var(--border))",
                    color: "hsl(var(--muted-foreground))",
                    textDecoration: "none",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = hoverBg;
                    el.style.borderColor = hoverBg;
                    el.style.color = "white";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "transparent";
                    el.style.borderColor = "hsl(var(--border))";
                    el.style.color = "hsl(var(--muted-foreground))";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Article body ── */}
          <div
            className="body-text"
            style={{
              color: "hsl(var(--foreground) / 0.75)",
              fontWeight: 300,
              maxWidth: "56rem",
              margin: "0 auto",
            }}
          >
            {post.content && Array.isArray(post.content) ? (
              post.content.map((para: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  style={{ marginBottom: "2rem" }}
                >
                  {i === 0 ? (
                    <p
                      style={{ margin: 0 }}
                      className="first-letter:text-6xl sm:first-letter:text-7xl first-letter:font-serif first-letter:font-bold first-letter:pr-3 first-letter:mt-2 first-letter:float-left first-line:tracking-wide"
                      // first-letter color via inline since CSS var can't be used in Tailwind first-letter directly
                    >
                      {para}
                    </p>
                  ) : (
                    <p style={{ margin: 0 }}>{para}</p>
                  )}

                  {i === 1 && para.length > 50 && (
                    <blockquote
                      style={{
                        margin: "3rem 0",
                        paddingLeft: "2rem",
                        paddingTop: "1.5rem",
                        paddingBottom: "1.5rem",
                        borderLeft: "4px solid hsl(var(--primary))",
                        background: "hsl(var(--brand-light))",
                        borderRadius: "0 calc(var(--radius) * 1.5) calc(var(--radius) * 1.5) 0",
                      }}
                    >
                      <p
                        className="heading-2"
                        style={{
                          fontStyle: "italic",
                          color: "hsl(var(--brand-dark))",
                          lineHeight: 1.4,
                          margin: 0,
                        }}
                      >
                        "{para.slice(0, 120)}..."
                      </p>
                    </blockquote>
                  )}

                  {i === 1 && post.image && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      style={{
                        margin: "2.5rem 0",
                        borderRadius: "calc(var(--radius) * 1.5)",
                        overflow: "hidden",
                        boxShadow: "0 20px 40px hsl(var(--brand-dark) / 0.1)",
                        border: "1px solid hsl(var(--border))",
                      }}
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                          maxHeight: "520px",
                          display: "block",
                        }}
                      />
                    </motion.div>
                  )}
                </motion.div>
              ))
            ) : (
              <p>{post.content}</p>
            )}
          </div>

          {/* ── Tags ── */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "4rem",
              paddingTop: "2rem",
              borderTop: "1px solid hsl(var(--border))",
            }}
          >
            {["HVAC", post.category, "Tips", "Expert Advice", "Home Comfort"].map(tag => (
              <span
                key={tag}
                style={{
                  padding: "6px 20px",
                  borderRadius: "100px",
                  border: "1px solid hsl(var(--border))",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "hsl(var(--muted-foreground))",
                  background: "hsl(var(--muted))",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "hsl(var(--primary))";
                  el.style.color = "hsl(var(--primary))";
                  el.style.background = "hsl(var(--brand-light))";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "hsl(var(--border))";
                  el.style.color = "hsl(var(--muted-foreground))";
                  el.style.background = "hsl(var(--muted))";
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <CTASection />
        </motion.div>
      </main>

      {/* ── Related Articles ── */}
      {relatedPosts.length > 0 && (
        <section
          style={{
            width: "100%",
            maxWidth: "72rem",
            margin: "0 auto",
            padding: "2.5rem 1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "1.5rem",
              marginBottom: "3rem",
            }}
          >
            <div>
              <h2 style={{ marginBottom: "8px", marginTop: 0 }}>
                Read Next
              </h2>
              <p className="body-text" style={{ color: "hsl(var(--muted-foreground))", margin: 0 }}>
                Discover more expert insights from our team
              </p>
            </div>
            <Link
              to="/blog"
              style={{
                padding: "10px 24px",
                borderRadius: "100px",
                border: "1px solid hsl(var(--border))",
                color: "hsl(var(--foreground))",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.875rem",
                letterSpacing: "0.03em",
                transition: "background 0.2s",
              }}
              onMouseEnter={e =>
                ((e.currentTarget as HTMLElement).style.background = "hsl(var(--muted))")
              }
              onMouseLeave={e =>
                ((e.currentTarget as HTMLElement).style.background = "transparent")
              }
            >
              View All Posts
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {relatedPosts.map((rp: any, i: number) => (
              <motion.div
                key={rp.slug || rp._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Link
                  to={`/blog/${rp.slug || rp._id}`}
                  style={{ textDecoration: "none", display: "block", height: "100%" }}
                >
                  <div
                    style={{
                      background: "hsl(var(--card))",
                      borderRadius: "calc(var(--radius) * 1.5)",
                      overflow: "hidden",
                      border: "1px solid hsl(var(--border))",
                      boxShadow: "0 2px 8px hsl(var(--brand-dark) / 0.06)",
                      transition: "all 0.5s",
                      height: "100%",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(-8px)";
                      el.style.boxShadow = "0 24px 48px hsl(var(--brand-dark) / 0.12)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "0 2px 8px hsl(var(--brand-dark) / 0.06)";
                    }}
                  >
                    <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
                      <img
                        src={rp.image}
                        alt={rp.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.7s ease-out",
                          display: "block",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                      />
                    </div>
                    <div style={{ padding: "1.5rem 2rem" }}>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "hsl(var(--primary))",
                          display: "block",
                          marginBottom: "0.75rem",
                        }}
                      >
                        {rp.category}
                      </span>
                      <h3
                        style={{
                          fontSize: "1.1rem",
                          lineHeight: 1.4,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          margin: 0,
                        }}
                      >
                        {rp.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Scroll-to-Top ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              position: "fixed",
              bottom: "2.5rem",
              right: "2.5rem",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "hsl(var(--brand-dark))",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px hsl(var(--brand-dark) / 0.3)",
              border: "none",
              cursor: "pointer",
              zIndex: 50,
              transition: "background 0.2s",
            }}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLElement).style.background = "hsl(var(--primary))")
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLElement).style.background = "hsl(var(--brand-dark))")
            }
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPost;