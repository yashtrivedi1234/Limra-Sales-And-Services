import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-ac-unit.jpg";

const useCounter = (target: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          tick();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
};

const headline = "Professional HVAC Solutions & Air Conditioning Services";

const Hero = () => {
  const installations = useCounter(50, 2500);
  const projects = useCounter(500, 2500);
  const years = useCounter(25, 2000);

  const metrics = [
    { ...installations, suffix: "K+", label: "Installations", multiplier: "K" },
    { ...projects, suffix: "+", label: "Projects", multiplier: "" },
    { ...years, suffix: "+", label: "Years Experience", multiplier: "" },
  ];

  return (
    <section className="relative min-h-screen bg-hero-gradient overflow-hidden flex items-center">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-24">
          {/* Left content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
              <span className="text-sm font-medium text-accent">Authorized Dealer — Top Global Brands</span>
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6">
              {headline.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.015, duration: 0.3 }}
                  className="text-primary-foreground"
                >
                  {char}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-lg sm:text-xl text-primary-foreground/70 max-w-lg mb-10 leading-relaxed"
            >
              Your trusted partner for residential &amp; commercial cooling solutions.
              Expert installation, maintenance &amp; 24/7 emergency support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-accent-foreground font-semibold text-lg shadow-glow-accent hover:shadow-glow-accent-strong transition-all duration-300 hover:-translate-y-0.5">
                <Phone size={20} />
                Free Consultation
              </button>
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-primary-foreground/20 text-primary-foreground font-semibold text-lg hover:bg-primary-foreground/10 transition-all duration-300">
                <MessageCircle size={20} />
                WhatsApp
              </button>
            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex gap-8 sm:gap-12 mt-14 pt-8 border-t border-primary-foreground/10"
            >
              {metrics.map((m, i) => (
                <div key={i} ref={m.ref}>
                  <div className="text-3xl sm:text-4xl font-display font-bold text-accent">
                    {m.count}{m.multiplier}{m.suffix.replace("K", "")}
                  </div>
                  <div className="text-sm text-primary-foreground/50 mt-1">{m.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right image */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="absolute w-[500px] h-[500px] rounded-full bg-accent/10 blur-[100px]" />
            <motion.img
              src={heroImage}
              alt="Modern VRV Air Conditioning System"
              className="relative z-10 w-full max-w-lg rounded-2xl shadow-2xl"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown className="text-primary-foreground/30" size={28} />
      </motion.div>
    </section>
  );
};

export default Hero;
