import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    name: "Invertis University",
    location: "Bareilly, UP",
    units: "200+ Units",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
  },
  {
    name: "Jim Corbett Marriott Resort",
    location: "Jim Corbett, Uttarakhand",
    units: "150+ Units",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  },
  {
    name: "Bareilly Airport",
    location: "Bareilly, UP",
    units: "80+ Units",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&q=80",
  },
  {
    name: "Bareilly Haat",
    location: "Bareilly, UP",
    units: "120+ Units",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
];

const FeaturedProjects = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12"
        >
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">Portfolio</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mt-3">
              Featured Projects
            </h2>
          </div>
          <Link
            to="/case-studies"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
          >
            View All Case Studies <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-4 sm:px-8 pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
            className="flex-shrink-0 w-[85vw] sm:w-[400px] lg:w-[450px] snap-start group cursor-pointer"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              {/* Image reveal block */}
              <motion.div
                className="absolute inset-0 bg-accent z-10"
                initial={{ x: 0 }}
                whileInView={{ x: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.3, duration: 0.6, ease: "easeInOut" }}
              />
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {project.units}
                </span>
                <h3 className="font-display text-xl font-bold text-primary-foreground mt-1">{project.name}</h3>
                <p className="text-primary-foreground/60 text-sm">{project.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
