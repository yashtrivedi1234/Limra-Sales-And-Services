import { Tag, ChevronRight, BookOpen, Wrench, Thermometer, Wind, Zap } from "lucide-react";
import { useGetBlogsQuery } from "@/store/api";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface ApiBlogPost {
  _id: string; id?: string; slug?: string; title: string;
  content: string | string[]; category: string; image: string;
  createdAt: string; updatedAt?: string; author?: string;
  readTime?: string; date?: string; featured?: boolean;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Maintenance": return <Wrench size={22} />;
    case "Buying Guide": return <Zap size={22} />;
    case "Tips & Tricks": return <Thermometer size={22} />;
    case "Commercial HVAC": return <Wind size={22} />;
    default: return <BookOpen size={22} />;
  }
};

// Category badge keeps its own colorMap (semantic colors, not brand)
function CategoryBadge({ category }: { category: string }) {
  const colorMap: Record<string, string> = {
    "Maintenance": "#e07830",
    "Buying Guide": "#1a3a5c",
    "Tips & Tricks": "#2e7d32",
    "Commercial HVAC": "#6a1b9a",
  };
  const color = colorMap[category] || "hsl(var(--brand-dark))";

  return (
    <span
      style={{ background: color }}
      className="inline-flex items-center gap-1 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
    >
      <Tag size={11} /> {category}
    </span>
  );
}

function BlogCard({ post }: { post: ApiBlogPost }) {
  let excerpt = "Read more about " + post.title;
  if (post.content && Array.isArray(post.content) && post.content.length > 0) {
    excerpt = post.content[0];
  } else if (typeof post.content === "string") {
    excerpt = post.content;
  }

  return (
    // ✅ SEO: Changed <div> → <article> for self-contained blog post content.
    // This gives search engines a clear semantic signal that each card is
    // an independent, indexable piece of content.
    <article
      className="bg-card rounded-2xl overflow-hidden flex flex-col group"
      style={{
        border: "1px solid hsl(var(--border))",
        boxShadow: "0 4px 16px hsl(var(--brand-dark) / 0.07)",
        transition: "box-shadow 0.3s, transform 0.3s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px hsl(var(--brand-dark) / 0.13)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px hsl(var(--brand-dark) / 0.07)";
      }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
        <div
          className="absolute top-4 left-4 z-10 rounded-xl p-2"
          style={{ background: "hsl(var(--brand-dark))", color: "white" }}
        >
          {getCategoryIcon(post.category)}
        </div>
        {post.featured && (
          <div className="absolute top-4 right-4 z-10 text-white text-xs font-bold px-3 py-1 rounded-full" style={{ background: "#e07830" }}>
            Featured
          </div>
        )}
        <img
          src={post.image}
          alt={`${post.title} - HVAC blog article`}
          loading="lazy"
          decoding="async"
          width="600"
          height="350"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <CategoryBadge category={post.category || "Uncategorized"} />
        </div>

        {/* h3 — override to DM Serif for editorial card title */}
        <h3
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontWeight: 400,
            color: "hsl(var(--brand-dark))",
            fontSize: "1.125rem",
            marginBottom: "8px",
            lineHeight: 1.4,
            transition: "color 0.2s",
          }}
          className="group-hover:text-[hsl(var(--primary))]"
        >
          {post.title}
        </h3>

        <p
          className="body-text"
          style={{
            fontSize: "0.875rem", color: "hsl(var(--muted-foreground))",
            marginBottom: "16px", flex: 1,
            display: "-webkit-box", WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}
        >
          {excerpt}
        </p>

        {/* ✅ Safety: Added rel="noopener noreferrer" — prevents the linked page
            from accessing window.opener, a best practice for all navigational links. */}
        <Link
          aria-label={`Read article: ${post.title}`}
          to={`/blog/${post.slug || post._id}`}
          rel="noopener noreferrer"
          className="mt-auto w-full flex items-center justify-center gap-2 rounded-xl py-2 text-sm font-semibold transition"
          style={{
            border: "2px solid hsl(var(--brand-dark))",
            color: "hsl(var(--brand-dark))",
            background: "transparent",
            borderRadius: "var(--radius)",
            textDecoration: "none"
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "hsl(var(--brand-dark))";
            (e.currentTarget as HTMLElement).style.color = "white";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "hsl(var(--brand-dark))";
          }}
        >
          <BookOpen size={15} /> Read Article <ChevronRight size={14} />
        </Link>
      </div>
    </article> // ✅ Closes <article>
  );
}

export default function BlogPreview() {
  const { data: blogPosts = [], isLoading, error } = useGetBlogsQuery();
  const recentPosts = blogPosts.slice(0, 3);

  if (isLoading || error || recentPosts.length === 0) return null;

  return (
    <section style={{ paddingTop: "30px", paddingBottom: "30px", paddingLeft: "0", paddingRight: "0", background: "hsl(var(--brand-light))" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          <div style={{
            display: "inline-block",
            background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.25)",
            color: "hsl(var(--primary))", fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.18em", textTransform: "uppercase" as const,
            padding: "5px 14px", borderRadius: "100px", marginBottom: "18px",
          }}>
            Our Blog
          </div>

          {/* h2 — global: DM Serif Display, 400, brand-dark */}
          <h2 style={{ marginBottom: "16px", marginTop: 0 }}>
            Latest Insights &amp; Updates
          </h2>

          {/* ✅ Safety: Added rel="noopener noreferrer" to the "View All" link as well. */}
          <Link
            to="/blog"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: "hsl(var(--primary))", fontWeight: 700,
              fontSize: "0.9rem", textDecoration: "none",
            }}
          >
            View All Articles <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {recentPosts.map((post: ApiBlogPost, i: number) => (
            <motion.div
              key={post._id || post.id}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}