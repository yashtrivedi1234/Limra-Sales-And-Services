import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, Trophy, Heart, IndianRupee, Star, CheckCircle2, ArrowRight, Shield, ChevronRight } from 'lucide-react';
import { brandsData } from '../data/brandsdata';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const renderIcon = (iconName: string, className: string): React.ReactNode => {
  switch (iconName) {
    case 'trophy': return <Trophy size={24} className={className} />;
    case 'heart': return <Heart size={24} className={className} />;
    case 'rupee': return <IndianRupee size={24} className={className} />;
    case 'star': return <Star size={24} className={className} />;
    default: return <Star size={24} className={className} />;
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function BrandDetail() {
  const { slug } = useParams<{ slug: string }>();
  const brand = slug ? brandsData[slug] : undefined;

  if (!brand) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center bg-background">
          <h2 className="text-3xl font-bold text-foreground mb-4">Brand not found</h2>
          <p className="text-muted-foreground mb-6">We couldn't find details for "{slug}".</p>
          <Link to="/" className="bg-accent text-accent-foreground px-6 py-2 rounded-md hover:opacity-90 transition">
            Go Back Home
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="w-full bg-background">
        {/* Breadcrumb */}
        <div className="bg-muted/50 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/" className="hover:text-foreground transition-colors">Brands</Link>
            <ChevronRight size={14} />
            <span className="text-foreground font-medium">{brand.brandName}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-hero-gradient relative overflow-hidden py-20 px-4 md:px-8">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-accent blur-[100px]" />
            <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-primary-foreground blur-[120px]" />
          </div>
          
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
            <motion.div 
              className="flex-1 space-y-6"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm border border-accent/30">
                <Shield size={14} />
                Authorized Dealer in Bareilly
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight">
                <span className="text-gradient-accent">{brand.brandName}</span>
                <br />
                {brand.title}
              </h1>
              <p className="text-primary-foreground/70 font-medium text-sm tracking-wide uppercase">
                {brand.subtitle}
              </p>
              <p className="text-primary-foreground/60 leading-relaxed max-w-lg text-base">
                {brand.description}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a 
                  href="tel:+919839171701"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-glow-accent hover:shadow-glow-accent-strong"
                >
                  <Phone size={18} />
                  Get {brand.brandName} Quote
                </a>
                <a
                  href={`https://wa.me/919839171701?text=Hi, I'm interested in ${brand.brandName} products`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border border-primary-foreground/20 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all backdrop-blur-sm"
                >
                  WhatsApp Us
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl" />
                <img 
                  src={brand.heroImage} 
                  alt={brand.title} 
                  className="w-full rounded-2xl shadow-2xl object-cover relative z-10 border border-primary-foreground/10"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Why Choose</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              {brand.brandName} in Bareilly
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {brand.features.map((feature, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group flex items-start gap-5 p-6 bg-card border border-border rounded-xl hover:shadow-lg hover:border-accent/30 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300 shrink-0">
                  {renderIcon(feature.icon, "")}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Product Range Section */}
        <section className="bg-muted/40 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-widest">Our Collection</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                {brand.brandName} Product Range
              </h2>
              <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full" />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {brand.products.map((product, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-52 bg-muted/60 flex items-center justify-center p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors duration-300" />
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="max-h-full object-contain relative z-10 group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-6 border-t border-border">
                    <h3 className="font-bold text-xl text-foreground mb-1">{product.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{product.desc}</p>
                    <ul className="space-y-2.5">
                      {product.featuresList.map((item, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2.5 text-sm text-foreground/80">
                          <CheckCircle2 size={16} className="text-accent shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="tel:+919839171701"
                      className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-lg text-sm font-semibold transition-colors"
                    >
                      <Phone size={15} />
                      Enquire Now
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA Section */}
        <section className="bg-hero-gradient relative overflow-hidden py-20 px-4 text-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent blur-[150px]" />
          </div>
          <motion.div
            className="relative z-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Experience <span className="text-gradient-accent">{brand.brandName}</span>?
            </h2>
            <p className="text-primary-foreground/60 mb-8 text-lg">
              Get the best deals on {brand.brandName} air conditioners in Bareilly with expert installation & service.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="tel:+919839171701"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3.5 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-glow-accent hover:shadow-glow-accent-strong"
              >
                <Phone size={18} /> Call for Best Price
              </a>
              <Link
                to="/contact"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border border-primary-foreground/20 px-8 py-3.5 rounded-lg font-semibold transition-all backdrop-blur-sm"
              >
                Visit Showroom
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </PageTransition>
  );
}
