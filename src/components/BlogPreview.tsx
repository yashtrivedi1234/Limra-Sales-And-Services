import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const BlogPreview = () => {
  const featured = blogPosts.slice(0, 3);

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <p className="text-accent font-bold text-sm tracking-widest uppercase mb-2">From Our Blog</p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground">HVAC Insights & Tips</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featured.map((post, i) => (
            <motion.article
              key={post.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { delay: i * 0.1, duration: 0.5 } } }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-shadow h-full"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
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
                  <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-accent transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mt-10"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-full text-sm hover:opacity-90 transition-opacity"
          >
            View All Articles <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreview;
