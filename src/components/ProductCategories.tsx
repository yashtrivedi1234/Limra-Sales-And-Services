import { motion } from "framer-motion";
import { Wind, Building2, Snowflake, Fan, ThermometerSun, AirVent } from "lucide-react";

const categories = [
  { icon: Snowflake, title: "Inverter Split AC", type: "Residential", desc: "Energy-efficient cooling for homes" },
  { icon: Building2, title: "VRV / VRF Systems", type: "Commercial", desc: "Multi-zone climate control" },
  { icon: AirVent, title: "Cassette AC", type: "Commercial", desc: "Ceiling-mounted 360° airflow" },
  { icon: Wind, title: "Ductable AC", type: "Commercial", desc: "Centralized ducted solutions" },
  { icon: Fan, title: "Portable AC", type: "Residential", desc: "Flexible & moveable units" },
  { icon: ThermometerSun, title: "Tower AC", type: "Residential", desc: "Powerful floor-standing cooling" },
];

const ProductCategories = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-semibold uppercase tracking-widest text-accent">Our Products</span>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mt-3">
          Cooling Solutions for Every Need
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ rotateX: 3, rotateY: -3, scale: 1.02 }}
            className="group relative p-8 rounded-2xl bg-card border border-border hover:border-accent/40 hover:shadow-glow-accent transition-all duration-300 overflow-hidden cursor-pointer"
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent mb-4 bg-accent/10 px-3 py-1 rounded-full">
              {cat.type}
            </span>
            <cat.icon className="text-foreground mb-4" size={36} strokeWidth={1.5} />
            <h3 className="font-display text-xl font-bold text-foreground mb-2">{cat.title}</h3>
            <p className="text-muted-foreground text-sm mb-6">{cat.desc}</p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              className="absolute bottom-0 left-0 right-0 p-4"
            >
              <span className="block text-center text-sm font-semibold text-accent group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                Explore Category →
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductCategories;
