import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Tag,
  ChevronRight,
  BookOpen,
  Wrench,
  Thermometer,
  Wind,
  Droplets,
  Zap,
  Star,
  Snowflake,
  HelpCircle,
} from "lucide-react";
import { useGetBlogsQuery } from "@/store/api";

/* ================= TYPES ================= */

export interface ApiBlogPost {
  _id: string;
  id?: string;
  slug?: string;
  title: string;
  content: string | string[];
  category: string;
  image: string;
  createdAt: string;
  updatedAt?: string;
  author?: string;
  readTime?: string;
  date?: string;
  featured?: boolean;
}

/* ================= HELPERS & COMPONENTS ================= */

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Maintenance": return <Wrench size={22} />;
    case "Buying Guide": return <Zap size={22} />;
    case "Tips & Tricks": return <Thermometer size={22} />;
    case "Commercial HVAC": return <Wind size={22} />;
    default: return <BookOpen size={22} />;
  }
};

function CategoryBadge({ category }: { category: string }) {
  const colorMap: Record<string, string> = {
    "Maintenance": "#e07830",
    "Buying Guide": "#1a3a5c",
    "Tips & Tricks": "#2e7d32",
    "Commercial HVAC": "#6a1b9a",
  };
  const color = colorMap[category] || "#1a3a5c";

  return (
    <span
      style={{ background: color }}
      className="inline-flex items-center gap-1 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
    >
      <Tag size={11} />
      {category}
    </span>
  );
}

function BlogCard({ post }: { post: ApiBlogPost }) {
  const navigate = useNavigate();

  // Handle missing or complex content formats to extract a meaningful excerpt
  let excerpt = "Read more about " + post.title;
  if (post.content && Array.isArray(post.content) && post.content.length > 0) {
    excerpt = post.content[0];
  } else if (typeof post.content === "string") {
    excerpt = post.content;
  }

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col border cursor-pointer group"
      onClick={() => navigate(`/blog/${post.slug || post._id}`)}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <div className="absolute top-4 left-4 z-10 bg-[#1a3a5c] text-white rounded-xl p-2">
          {getCategoryIcon(post.category)}
        </div>
        {post.featured && (
          <div className="absolute top-4 right-4 z-10 bg-[#e07830] text-white text-xs font-bold px-3 py-1 rounded-full">
            Featured
          </div>
        )}
        <img
          src={post.image || "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80"}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category + Read Time */}
        <div className="flex items-center justify-between mb-3">
          <CategoryBadge category={post.category || "Uncategorized"} />
          <span className="text-slate-400 text-xs flex items-center gap-1">
            <Clock size={12} />
            {post.readTime || "5 min read"}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
          className="text-[#1a3a5c] text-lg mb-2 leading-snug group-hover:text-[#e07830] transition-colors"
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-slate-500 text-sm mb-4 flex-1 line-clamp-3">
          {excerpt}
        </p>

        {/* Author + Date */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-4 border-t pt-3">
          <span className="font-medium text-slate-600">{post.author || "Admin"}</span>
          <span>{post.date ? new Date(post.date).toLocaleDateString() : new Date(post.createdAt || Date.now()).toLocaleDateString()}</span>
        </div>

        {/* CTA */}
        <button
          className="mt-auto w-full flex items-center justify-center gap-2 border-2 border-[#1a3a5c] text-[#1a3a5c] rounded-xl py-2 text-sm font-semibold hover:bg-[#1a3a5c] hover:text-white transition"
        >
          <BookOpen size={15} />
          Read Article
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

/* ================= PAGE ================= */

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BRAND } from "@/lib/colors";

export default function BlogPreview() {
  const { data: blogPosts = [], isLoading, error } = useGetBlogsQuery();

  // Take the 3 most recent posts
  const recentPosts = blogPosts.slice(0, 3);

  if (isLoading || error || recentPosts.length === 0) return null;

  return (
    <section style={{ padding: "64px 0", background: "rgb(215 242 255 / 58%)", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>

        {/* Header */}
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
            Our Blog
          </div>

          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            color: BRAND.dark,
            lineHeight: 1.15,
            marginBottom: "16px"
          }}>
            Latest Insights & Updates
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

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
        }}>
          {recentPosts.map((post: ApiBlogPost, i: number) => (
            <motion.div
              key={post._id || post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

