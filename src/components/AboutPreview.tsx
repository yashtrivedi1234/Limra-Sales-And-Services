import { motion } from "framer-motion";
import { Shield, Award, Users, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { value: "9+", label: "Years Experience" },
  { value: "5000+", label: "Projects Completed" },
  { value: "50+", label: "Expert Technicians" },
  { value: "8+", label: "Premium Brands" },
];

const values = [
  { icon: Shield, title: "Reliability", desc: "Comprehensive warranties and responsive after-sales support on every installation." },
  { icon: Award, title: "Excellence", desc: "Only premium brands and certified technicians — no shortcuts on quality." },
  { icon: Users, title: "Customer First", desc: "Every solution tailored to your space, budget, and comfort requirements." },
  { icon: Target, title: "Innovation", desc: "Latest energy-efficient and smart HVAC technologies, always ahead of the curve." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const AboutPreview = () => (
  <section className="py-24 bg-background overflow-hidden">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">

      {/* Section Label + Heading */}
      <div className="max-w-3xl mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent font-bold text-sm tracking-widest uppercase mb-3"
        >
          Who We Are
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight mb-6"
        >
          Building Comfort <br className="hidden sm:block" />
          Since 2017
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-muted-foreground text-lg leading-relaxed"
        >
          LIMRA Sales And Services is Bareilly's most trusted HVAC partner — delivering premium air conditioning solutions for homes, offices, hospitals, hotels, and industrial facilities across Uttar Pradesh.
        </motion.p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-muted rounded-2xl px-6 py-8 text-center border border-border"
          >
            <p className="text-4xl md:text-5xl font-black text-accent leading-none mb-2">{s.value}</p>
            <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Values Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <v.icon size={22} className="text-accent" />
            </div>
            <h3 className="font-bold text-foreground mb-2 text-base">{v.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA Link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <Link
          to="/about"
          className="inline-flex items-center gap-2 text-accent font-bold hover:gap-3 transition-all duration-200 text-sm group"
        >
          Learn More About Us
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

    </div>
  </section>
);

export default AboutPreview;