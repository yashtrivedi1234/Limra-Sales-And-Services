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

  const heroY = useTransform(heroProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading article...</div>;
  if (!post) return <Navigate to="/blog" replace />;
  const relatedPosts = blogPosts.filter((p: any) => p.slug !== slug && String(p._id) !== slug).slice(0, 3);
  
  // Fake views counter setup
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

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900" ref={containerRef}>
      {/* 2️⃣ Hero Section (Immersive) */}
      <section ref={heroRef} className="relative w-full h-[85vh] min-h-[600px] flex justify-center items-end overflow-hidden bg-slate-900">
        {/* Parallax Image */}
        <motion.div className="absolute inset-0 w-full h-[120%]" style={{ y: heroY }}>
          <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-80" />
        </motion.div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        
        {/* Floating Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none animate-pulse duration-10000" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[80px] mix-blend-screen pointer-events-none" />

        <motion.div className="relative z-10 w-full max-w-5xl px-6 pb-24 sm:pb-32" style={{ opacity: heroOpacity }}>
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-8 text-sm font-semibold tracking-wide">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md mb-6"
            >
              <Tag size={12} /> {post.category}
            </motion.span>
            
            <SplitHeading text={post.title} />

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center gap-6 sm:gap-8 text-slate-300 text-sm font-medium"
            >
              <div className="flex items-center gap-2"><Calendar size={16} className="text-blue-400" /> {post.date ? new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : new Date(post.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
              <div className="flex items-center gap-2"><Clock size={16} className="text-blue-400" /> {post.readTime || "5 min"}</div>
              <div className="flex items-center gap-2"><User size={16} className="text-blue-400" /> {post.author || "Admin"}</div>
              <div className="flex items-center gap-2"><Eye size={16} className="text-blue-400" /> {views.toLocaleString()} views</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 3️⃣ Article Container Card */}
      <main className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-24 pb-24">
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

          {/* 4️⃣ Share Strip (Inline) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-10 border-b border-slate-100">
            <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Share this article</span>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Bookmark].map((Icon, i) => (
                <button key={i} className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 text-slate-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">
                  <Icon size={16} />
                </button>
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

                {/* Pull Quote after 2nd paragraph */}
                {i === 1 && para.length > 50 && (
                  <blockquote className="my-12 pl-6 sm:pl-8 py-4 sm:py-6 border-l-4 border-blue-600 bg-gradient-to-r from-blue-50 to-transparent rounded-r-2xl">
                    <p className="text-xl sm:text-2xl font-serif italic text-slate-900 leading-snug m-0">
                      "{para.slice(0, 120)}..."
                    </p>
                  </blockquote>
                )}

                {/* Decorative Divider Mid-Article */}
                {i === Math.floor(post.content.length / 2) && (
                  <div className="flex justify-center items-center gap-4 my-16 text-blue-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span className="w-2.5 h-2.5 rounded-full bg-current" />
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  </div>
                )}
              </motion.div>
            )) : <p>{post.content}</p>}
          </div>

          {/* 5️⃣ Tags Section */}
          <div className="flex flex-wrap gap-3 mt-16 pt-8 border-t border-slate-100">
            {["HVAC", post.category, "Tips", "Expert Advice", "Home Comfort"].map(tag => (
              <span key={tag} className="px-5 py-2 rounded-full border border-slate-200 text-xs font-bold tracking-widest uppercase text-slate-500 hover:border-blue-600 hover:text-blue-600 transition-colors cursor-pointer bg-slate-50 hover:bg-white">
                {tag}
              </span>
            ))}
          </div>

          {/* 6️⃣ Author Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-100 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 group"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-700 to-cyan-400 flex items-center justify-center text-white text-3xl font-serif shrink-0 shadow-xl shadow-blue-500/20 group-hover:scale-105 transition-transform">
              {post.author.charAt(0)}
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-slate-900 mb-1">{post.author || "Admin"}</h4>
              <p className="text-sm text-slate-500 mb-4">HVAC Specialist & Senior Technician</p>
              <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto sm:mx-0">
                With over a decade of experience, {(post.author || "Admin").split(' ')[0]} shares insights to help you maximize efficiency and comfort in your spaces.
              </p>
            </div>
            <button className="px-6 py-2.5 rounded-full border-2 border-slate-900 text-slate-900 font-bold text-sm tracking-wide hover:bg-slate-900 hover:text-white transition-colors shrink-0">
              Follow
            </button>
          </motion.div>

          {/* 7️⃣ Conversion CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-16 p-8 sm:p-12 rounded-3xl bg-slate-900 relative overflow-hidden group border border-slate-800"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
            <div className="relative z-10 text-center">
              <h3 className="text-2xl sm:text-3xl font-serif text-white mb-3">Need personalized expert advice?</h3>
              <p className="text-slate-400 mb-8 max-w-sm mx-auto text-sm sm:text-base">
                Our certified HVAC specialists are ready to help you optimize your comfort and energy efficiency today.
              </p>
              <a href="tel:+919839171701" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 text-white font-bold tracking-wide hover:bg-blue-500 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-1 transition-all duration-300">
                📞 Talk to an Expert
              </a>
            </div>
          </motion.div>

        </motion.div>
      </main>

      {/* 8️⃣ Related Articles Section */}
      {relatedPosts.length > 0 && (
        <section className="w-full max-w-6xl mx-auto px-6 py-24 sm:py-32">
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
                        <Clock size={14} /> {rp.readTime || "5 min"}
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

      {/* 9️⃣ Scroll-to-Top Button */}
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