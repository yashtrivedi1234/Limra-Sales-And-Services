import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock,
  Tag,
  Calendar,
  User,
  Facebook,
  Twitter,
  Linkedin,
  Bookmark,
  Eye,
  ChevronUp,
} from "lucide-react";
import { useGetBlogsQuery } from "@/store/api";
import { BRAND } from "@/lib/colors";
import CTASection from "@/components/CTASection";

const SplitHeading = ({ text }: { text: string }) => (
  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 font-serif tracking-tight">
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
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [views, setViews] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = 3245;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setViews(end);
        clearInterval(timer);
      } else {
        setViews(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading article...</div>;
  if (!post) return <Navigate to="/blog" replace />;
  const relatedPosts = blogPosts.filter((p: any) => p.slug !== slug && String(p._id) !== slug).slice(0, 3);

  // Share URLs — built dynamically from current page URL
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(post.title || "");

  const socialButtons = [
    {
      Icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: "Share on Facebook",
      hoverClass: "hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white",
    },
    {
      Icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      label: "Share on Twitter / X",
      hoverClass: "hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white",
    },
    {
      Icon: Linkedin,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      label: "Share on LinkedIn",
      hoverClass: "hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900" ref={containerRef}>
      {/* Hero Section — Royal Blue */}
      <section
        ref={heroRef}
        className="relative w-full h-[85vh] min-h-[600px] flex justify-center items-end overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)` }}
      >
        {/* Floating Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-200/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Bottom fade for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent" />

        <motion.div className="relative z-10 w-full max-w-5xl px-6 pb-24 sm:pb-32" style={{ opacity: heroOpacity }}>
          <Link to="/blog" className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors mb-8 text-sm font-semibold tracking-wide">
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md mb-6"
            >
              <Tag size={12} /> {post.category}
            </motion.span>

            <SplitHeading text={post.title} />
          </div>
        </motion.div>
      </section>

      {/* Article Container Card */}
      <main className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-24 pb-2">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-slate-900/10 p-6 sm:p-12 md:p-16 border border-slate-100 relative"
        >
          {/* Gradient Top Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-t-2xl sm:rounded-t-3xl" />

          {/* Floating Read Time Badge */}
          <div className="absolute -top-4 right-8 bg-slate-900 text-white px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg shadow-slate-900/20">
            {post.readTime} Read
          </div>

          {/* Share Strip — with real working links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-10 border-b border-slate-100">
            <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Share this article</span>
            <div className="flex gap-3">
              {socialButtons.map(({ Icon, href, label, hoverClass }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 text-slate-500 transition-all duration-300 ${hoverClass}`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Article Typography */}
          <div className="text-slate-700 text-lg leading-[1.85] font-light space-y-8 max-w-4xl mx-auto">
            {post.content && Array.isArray(post.content) ? post.content.map((para: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                {i === 0 ? (
                  <p className="first-letter:text-6xl sm:first-letter:text-7xl first-letter:font-serif first-letter:font-bold first-letter:text-blue-600 first-letter:pr-3 first-letter:mt-2 first-letter:float-left first-line:tracking-wide">
                    {para}
                  </p>
                ) : (
                  <p>{para}</p>
                )}

                {i === 1 && para.length > 50 && (
                  <blockquote className="my-12 pl-6 sm:pl-8 py-4 sm:py-6 border-l-4 border-blue-600 bg-gradient-to-r from-blue-50 to-transparent rounded-r-2xl">
                    <p className="text-xl sm:text-2xl font-serif italic text-slate-900 leading-snug m-0">
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
                    className="my-10 rounded-2xl overflow-hidden shadow-xl shadow-slate-900/10 border border-slate-100"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-auto object-cover max-h-[520px]"
                    />
                  </motion.div>
                )}
              </motion.div>
            )) : <p>{post.content}</p>}
          </div>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-3 mt-16 pt-8 border-t border-slate-100">
            {["HVAC", post.category, "Tips", "Expert Advice", "Home Comfort"].map(tag => (
              <span key={tag} className="px-5 py-2 rounded-full border border-slate-200 text-xs font-bold tracking-widest uppercase text-slate-500 hover:border-blue-600 hover:text-blue-600 transition-colors cursor-pointer bg-slate-50 hover:bg-white">
                {tag}
              </span>
            ))}
          </div>

          {/* Conversion CTA */}
          <CTASection />

        </motion.div>
      </main>

      {/* Related Articles Section */}
      {relatedPosts.length > 0 && (
        <section className="w-full max-w-6xl mx-auto px-6 py-10 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 font-bold mb-2">Read Next</h2>
              <p className="text-slate-500">Discover more expert insights from our team</p>
            </div>
            <Link to="/blog" className="px-6 py-2.5 rounded-full border border-slate-200 text-slate-700 font-bold text-sm tracking-wide hover:bg-slate-50 transition-colors">
              View All Posts
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((rp: any, i: number) => (
              <motion.div
                key={rp.slug || rp._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Link to={`/blog/${rp.slug || rp._id}`} className="group block h-full bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col h-[calc(100%-60%)]">
                    <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-3 block">{rp.category}</span>
                    <h3 className="text-xl font-bold font-serif text-slate-900 mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{rp.title}</h3>
                    <div className="mt-auto flex items-center justify-between text-sm text-slate-500">
                      <div className="flex items-center gap-2">

                      </div>
                      <span className="text-blue-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-medium">Read Article →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xl shadow-slate-900/30 hover:bg-blue-600 transition-colors z-50 group"
          >
            <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPost;  