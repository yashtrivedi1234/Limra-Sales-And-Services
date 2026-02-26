import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock,
  Tag,
  Calendar,
  User,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Bookmark,
  Eye,
  ChevronUp,
} from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

/* ─── Floating Orb decoration ─── */
const Orb = ({ style }) => (
  <div
    style={style}
    className="pointer-events-none absolute rounded-full blur-3xl opacity-20"
  />
);

/* ─── Animated character-split heading ─── */
const SplitHeading = ({ text }) => (
  <h1 className="split-heading">
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 60, rotateX: -90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 0.04 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: char === " " ? "inline" : "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </h1>
);

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readPct, setReadPct] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, 160]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const { scrollTop, scrollHeight, clientHeight } = el.parentElement || document.documentElement;
      const pct = Math.min(100, (scrollTop / (scrollHeight - clientHeight)) * 100);
      setReadPct(pct);
      setShowScrollTop(scrollTop > 400);
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (!post) return <Navigate to="/blog" replace />;
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      {/* ─── GLOBAL STYLES ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=DM+Serif+Display:ital,wght@0,400;1,400&display=swap');

        :root {
          --ink: #0b0a09;
          --paper: #faf8f4;
          --gold: #c9a84c;
          --gold-light: #e8c96b;
          --rust: #b24a2c;
          --muted: #6b6560;
          --border: rgba(201,168,76,0.2);
        }

        .blog-root { font-family: 'DM Sans', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }
        .display-font { font-family: 'DM Serif Display', Georgia, serif; }

        /* Progress bar */
        .progress-bar {
          position: fixed; top: 0; left: 0; height: 3px; background: linear-gradient(90deg, var(--gold), var(--gold-light), var(--rust));
          z-index: 9999; transition: width 0.1s linear;
          box-shadow: 0 0 12px var(--gold-light);
        }

        /* Hero */
        .hero-wrap { position: relative; height: 100vh; overflow: hidden; }
        .hero-img { position: absolute; inset: 0; width: 100%; height: 120%; object-fit: cover; will-change: transform; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(11,10,9,0.96) 20%, rgba(11,10,9,0.5) 60%, rgba(11,10,9,0.1) 100%); }
        .hero-content { position: absolute; bottom: 0; left: 0; right: 0; padding: clamp(2rem,6vw,5rem); max-width: 900px; }

        .split-heading {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(1.4rem, 2.8vw, 2.4rem);
          font-weight: 400;
          line-height: 1.25;
          color: #fff;
          perspective: 600px;
          margin: 0.75rem 0 1.5rem;
          max-width: 650px;
        }

        .category-pill {
          display: inline-flex; align-items: center; gap: 6px;
          border: 1px solid var(--gold); color: var(--gold);
          padding: 4px 14px; border-radius: 100px; font-size: 11px;
          letter-spacing: 2px; text-transform: uppercase; font-weight: 500;
          background: rgba(201,168,76,0.08); backdrop-filter: blur(6px);
        }

        /* Article card */
        .article-card {
          background: #fff;
          border: 1px solid rgba(11,10,9,0.08);
          border-radius: 24px;
          box-shadow: 0 32px 80px rgba(11,10,9,0.08), 0 4px 16px rgba(11,10,9,0.04);
          padding: clamp(2rem, 5vw, 4rem);
          position: relative;
          overflow: hidden;
        }
        .article-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--rust));
        }

        /* Drop cap */
        .article-body > p:first-child::first-letter {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 5.5rem; font-weight: 400;
          float: left; line-height: 0.8;
          margin: 0.12em 0.1em 0 0;
          color: var(--gold);
          text-shadow: 2px 2px 0 rgba(178,74,44,0.15);
        }

        .article-body p {
          font-size: 1.075rem; line-height: 1.85;
          color: #2a2724; margin-bottom: 1.75rem;
          font-weight: 300;
        }

        /* Pull quote */
        .pull-quote {
          border-left: 4px solid var(--gold);
          margin: 2.5rem 0;
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, rgba(201,168,76,0.06), transparent);
          border-radius: 0 12px 12px 0;
        }
        .pull-quote p {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 1.3rem !important;
          font-style: italic;
          color: var(--ink) !important;
          margin: 0 !important;
        }

        /* Author */
        .author-box {
          display: flex; gap: 1.25rem; align-items: center;
          padding: 1.5rem; border-radius: 16px;
          background: linear-gradient(135deg, #fdfbf7, #f5f0e8);
          border: 1px solid var(--border);
          margin-top: 3rem;
        }
        .author-avatar {
          width: 56px; height: 56px; border-radius: 50%;
          background: linear-gradient(135deg, var(--gold), var(--rust));
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 1.4rem; color: #fff; font-weight: 400;
          flex-shrink: 0;
        }

        /* CTA */
        .expert-cta {
          margin-top: 3rem;
          padding: 2.5rem;
          border-radius: 20px;
          background: linear-gradient(135deg, var(--ink) 0%, #1f1a15 100%);
          position: relative; overflow: hidden; text-align: center;
        }
        .expert-cta::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.25) 0%, transparent 70%);
        }
        .cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 28px; border-radius: 100px;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          color: var(--ink); font-weight: 700; font-size: 0.875rem;
          text-decoration: none; letter-spacing: 0.5px;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(201,168,76,0.4);
        }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(201,168,76,0.5); }

        /* Related */
        .related-card {
          border-radius: 20px; overflow: hidden;
          border: 1px solid rgba(11,10,9,0.07);
          background: #fff;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s;
          text-decoration: none; display: block;
        }
        .related-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(11,10,9,0.12); }
        .related-card img { width: 100%; aspect-ratio: 16/9; object-fit: cover; transition: transform 0.5s; }
        .related-card:hover img { transform: scale(1.06); }

        /* Meta chips */
        .meta-chip { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--muted); }

        /* Divider ornament */
        .ornament { text-align: center; margin: 2.5rem 0; color: var(--gold); font-size: 1.2rem; letter-spacing: 12px; opacity: 0.5; }

        /* Scroll-to-top */
        .scroll-top {
          position: fixed; bottom: 2rem; right: 2rem; z-index: 999;
          width: 44px; height: 44px; border-radius: 50%;
          background: var(--ink); color: var(--gold);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; border: 1px solid var(--border);
          box-shadow: 0 4px 20px rgba(11,10,9,0.3);
          transition: transform 0.2s;
        }
        .scroll-top:hover { transform: translateY(-3px); }

        /* Reading time badge */
        .read-badge {
          position: absolute; top: -1.5rem; right: 2rem;
          background: linear-gradient(135deg, var(--gold), var(--rust));
          color: #fff; padding: 0.5rem 1.2rem;
          border-radius: 100px; font-size: 11px; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          box-shadow: 0 4px 16px rgba(178,74,44,0.4);
        }

        /* Noise grain overlay */
        .grain { position: fixed; inset: 0; z-index: -1; opacity: 0.025; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* DM Serif Display headings inside article */
        .article-card h2,
        .article-card h3 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-weight: 400;
        }
      `}</style>

      {/* ─── PROGRESS BAR ─── */}
      <div className="progress-bar" style={{ width: `${readPct}%` }} />

      {/* ─── GRAIN ─── */}
      <div className="grain" />

      <main className="blog-root" ref={containerRef}>
        {/* ════════════ HERO ════════════ */}
        <div className="hero-wrap">
          <motion.img
            ref={heroRef}
            src={post.image}
            alt={post.title}
            className="hero-img"
            style={{ y: heroY }}
          />
          <div className="hero-overlay" />

          {/* Floating orbs */}
          <Orb style={{ width: 400, height: 400, background: "#c9a84c", top: "20%", left: "-10%", animationDuration: "8s" }} />
          <Orb style={{ width: 300, height: 300, background: "#b24a2c", bottom: "30%", right: "-5%", animationDuration: "12s" }} />

          <motion.div className="hero-content" style={{ opacity: heroOpacity }}>
            {/* Back link */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Link
                to="/blog"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.6)", fontSize: 13, textDecoration: "none", marginBottom: "1.25rem", letterSpacing: "1px", textTransform: "uppercase" }}
                onMouseEnter={e => e.currentTarget.style.color = "#c9a84c"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
              >
                <ArrowLeft size={14} />
                Back to Journal
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <span className="category-pill">
                <Tag size={10} />
                {post.category}
              </span>
            </motion.div>

            <SplitHeading text={post.title} />

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", color: "rgba(255,255,255,0.55)", fontSize: 13 }}
            >
              {[
                { icon: <Calendar size={13} />, text: new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
                { icon: <Clock size={13} />, text: post.readTime },
                { icon: <User size={13} />, text: post.author },
                { icon: <Eye size={13} />, text: "3.2k views" },
              ].map((m, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {m.icon} {m.text}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ════════════ ARTICLE ════════════ */}
        <section style={{ position: "relative", zIndex: 10, marginTop: "-5rem" }}>
          <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 1.5rem" }}>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="article-card"
              style={{ position: "relative" }}
            >
              <div className="read-badge">✦ {post.readTime}</div>

              {/* Share strip */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(11,10,9,0.07)" }}>
                <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--muted)" }}>Share this article</span>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  {[Facebook, Twitter, Linkedin, Bookmark].map((Icon, i) => (
                    <button key={i} style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.3)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "var(--gold)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"; }}>
                      <Icon size={13} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Article body */}
              <div className="article-body">
                {post.content.map((para, i) => (
                  <>
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ delay: i * 0.05, duration: 0.6 }}
                    >
                      {para}
                    </motion.p>
                    {/* Insert a pull quote after 2nd paragraph */}
                    {i === 1 && (
                      <motion.div
                        className="pull-quote"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                      >
                        <p>"{para.slice(0, 120)}..."</p>
                      </motion.div>
                    )}
                    {/* Ornament divider after middle paragraph */}
                    {i === Math.floor(post.content.length / 2) - 1 && (
                      <div className="ornament">✦ ✦ ✦</div>
                    )}
                  </>
                ))}
              </div>

              {/* Tags */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid rgba(11,10,9,0.07)" }}>
                {["HVAC", post.category, "Tips", "Expert Advice"].map(tag => (
                  <span key={tag} style={{ padding: "4px 12px", borderRadius: 100, border: "1px solid rgba(201,168,76,0.35)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "var(--gold)", fontWeight: 500 }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author box */}
              <motion.div
                className="author-box"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              >
                <div className="author-avatar">{post.author.charAt(0)}</div>
                <div>
                  <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "1.05rem", marginBottom: 2 }}>{post.author}</p>
                  <p style={{ fontSize: 12, color: "var(--muted)", letterSpacing: 0.5 }}>HVAC Specialist & Industry Expert</p>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <span style={{ fontSize: 11, color: "var(--gold)", border: "1px solid var(--gold)", padding: "4px 12px", borderRadius: 100, letterSpacing: 1, textTransform: "uppercase" }}>Follow</span>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                className="expert-cta"
                initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              >
                <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.5rem", fontWeight: 400, color: "#fff", marginBottom: "0.5rem", position: "relative" }}>
                  Need expert advice?
                </p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", marginBottom: "1.5rem", position: "relative" }}>
                  Our HVAC specialists are ready to help you choose the perfect AC system.
                </p>
                <a href="tel:+919839171701" className="cta-btn" style={{ position: "relative" }}>
                  📞 Talk to an Expert
                </a>
              </motion.div>
            </motion.div>

            {/* ════════ RELATED POSTS ════════ */}
            {relatedPosts.length > 0 && (
              <motion.section
                style={{ margin: "5rem 0 4rem" }}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-80px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
                  <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.75rem", fontWeight: 400 }}>Related Articles</span>
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(201,168,76,0.4), transparent)" }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
                  {relatedPosts.map((rp, i) => (
                    <motion.div
                      key={rp.slug}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link to={`/blog/${rp.slug}`} className="related-card">
                        <div style={{ overflow: "hidden" }}>
                          <img src={rp.image} alt={rp.title} loading="lazy" />
                        </div>
                        <div style={{ padding: "1.1rem 1.25rem 1.25rem" }}>
                          <span style={{ fontSize: 10, color: "var(--gold)", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>{rp.category}</span>
                          <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "0.95rem", marginTop: "0.4rem", lineHeight: 1.35, color: "var(--ink)" }}>{rp.title}</p>
                          <span style={{ fontSize: 11, color: "var(--muted)", display: "flex", alignItems: "center", gap: 4, marginTop: "0.75rem" }}>
                            <Clock size={10} /> {rp.readTime}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </section>
      </main>

      {/* ─── SCROLL TO TOP ─── */}
      {showScrollTop && (
        <motion.button
          className="scroll-top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ChevronUp size={18} />
        </motion.button>
      )}
    </>
  );
};

export default BlogPost;