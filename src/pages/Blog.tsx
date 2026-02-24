import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react"; // Replaced Tag with Calendar
import { blogPosts } from "@/data/blogPosts";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Blog = () => (
  <>
    <main className="pt-16">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent font-bold text-sm tracking-widest uppercase mb-4">
            Our Blog
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-4"
          >
            HVAC Insights & Tips
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl mx-auto text-primary-foreground/70 text-lg"
          >
            Expert advice on air conditioning, maintenance, and energy efficiency.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Changed to 3 columns on large screens and removed max-w-5xl to let it expand */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { delay: i * 0.1, duration: 0.5 } } }}
                className="h-full"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Image Area with Floating Badge */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Category Badge over image */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-[#003B73] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Date & Read Time */}
                    <div className="flex items-center gap-4 mb-4 text-[13px] text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {post.date || "1 November 2024"} {/* Ensure 'date' is in your blogPosts data */}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title & Excerpt */}
                    <h2 className="text-[1.15rem] font-bold text-foreground mb-3 leading-snug group-hover:text-[#003B73] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>

                    {/* Bottom Row: Tags and Read Article (Pushed to bottom) */}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex flex-wrap gap-2">
                        {/* Make sure your blogPosts data has a 'tags' array, e.g., tags: ['VRV', 'Energy Efficiency'] */}
                        {post.tags?.slice(0, 2).map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="text-[11px] font-medium border border-border text-muted-foreground px-3 py-1 rounded-full bg-background"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:text-[#003B73] transition-colors whitespace-nowrap">
                        Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </span>
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