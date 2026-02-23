import { motion } from "framer-motion";
import { Wrench, ShieldCheck, MapPin, Clock } from "lucide-react";

const services = [
  { icon: Wrench, title: "Expert Installation", desc: "Certified technicians with precision setup for optimal performance and longevity." },
  { icon: ShieldCheck, title: "Maintenance & Repair", desc: "Scheduled servicing, gas top-ups, deep cleaning and swift troubleshooting." },
  { icon: MapPin, title: "Free Site Visit", desc: "Complimentary assessment of your space to recommend the perfect cooling solution." },
  { icon: Clock, title: "24/7 Emergency Service", desc: "Round-the-clock support because breakdowns don't wait for business hours." },
];

const Services = () => (
  <section className="relative py-24 bg-primary overflow-hidden">
    {/* Parallax grid */}
    <motion.div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
      initial={{ y: 0 }}
      whileInView={{ y: -30 }}
      viewport={{ once: false }}
      transition={{ duration: 1.5 }}
    />

    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-semibold uppercase tracking-widest text-accent">What We Do</span>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground mt-3">
          Professional Services
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 100 }}
            className="group relative p-8 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 hover:border-accent/50 transition-all duration-500 overflow-hidden"
          >
            {/* Glow border sweep */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <s.icon className="text-accent" size={28} />
              </div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-3">{s.title}</h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
