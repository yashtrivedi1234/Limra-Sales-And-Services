import { motion } from "framer-motion";

const brands = [
  { name: "Daikin", tagline: "Innovation for Good" },
  { name: "Mitsubishi Heavy", tagline: "Change for the Better" },
  { name: "Carrier", tagline: "Turn to the Experts" },
  { name: "Voltas", tagline: "All Weather Champion" },
  { name: "Midea", tagline: "Make Yourself at Home" },
  { name: "Godrej", tagline: "Brighter Living" },
];

const BrandMarquee = () => {
  const doubled = [...brands, ...brands];

  return (
    <section className="py-12 bg-card border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 mb-6">
        <p className="text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Authorized Dealer For
        </p>
      </div>
      <div className="marquee-track gap-8">
        {doubled.map((brand, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1 }}
            className="flex-shrink-0 px-10 py-5 mx-4 rounded-xl border border-border bg-background hover:border-accent/40 hover:shadow-glow-accent transition-all duration-300 cursor-pointer group"
          >
            <div className="font-display text-xl font-bold text-foreground group-hover:text-accent transition-colors">
              {brand.name}
            </div>
            <div className="text-xs text-muted-foreground mt-1">{brand.tagline}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BrandMarquee;
