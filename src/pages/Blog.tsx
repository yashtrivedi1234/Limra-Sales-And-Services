import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Blog = () => (
  <>
    <SiteHeader />
    <main className="pt-16">
      {/* Hero */}
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { delay: i * 0.1, duration: 0.5 } } }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 text-accent font-semibold">
                        <Tag size={10} />
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={10} />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      Read More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>
);

export default Blog;
