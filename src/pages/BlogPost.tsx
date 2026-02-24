import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag, Calendar, User } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <SiteHeader />
      <main className="pt-16">
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        {/* Article */}
        <article className="relative -mt-24 z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-xl p-6 md:p-10 shadow-lg"
            >
              {/* Back */}
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft size={14} />
                Back to Blog
              </Link>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 text-accent font-semibold">
                  <Tag size={10} />
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar size={10} />
                  {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={10} />
                  {post.readTime}
                </span>
                <span className="inline-flex items-center gap-1">
                  <User size={10} />
                  {post.author}
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-black text-foreground leading-tight mb-8">
                {post.title}
              </h1>

              <div className="prose prose-slate max-w-none">
                {post.content.map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-5 text-[15px]">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10 p-6 bg-primary rounded-xl text-primary-foreground text-center">
                <p className="font-bold mb-2">Need expert advice?</p>
                <p className="text-primary-foreground/70 text-sm mb-4">
                  Our HVAC specialists are ready to help you make the right choice.
                </p>
                <a
                  href="tel:+919839171701"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-bold rounded-full text-sm hover:opacity-90 transition-opacity"
                >
                  Talk to an Expert
                </a>
              </div>
            </motion.div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16 mb-16">
                <h3 className="text-xl font-bold text-foreground mb-6">Related Articles</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {relatedPosts.map((rp) => (
                    <Link
                      key={rp.slug}
                      to={`/blog/${rp.slug}`}
                      className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={rp.image}
                          alt={rp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-foreground text-sm group-hover:text-accent transition-colors leading-snug">
                          {rp.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
};

export default BlogPost;
