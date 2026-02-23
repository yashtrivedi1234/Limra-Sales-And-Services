import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, ChevronRight, Wind, ShieldCheck, Activity } from "lucide-react";

const slides = [
  {
    url: "https://images.unsplash.com/photo-1581094288338-2314dddb7ee1?q=80&w=2070",
    title: "Industrial",
  },
  {
    url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069",
    title: "Residential",
  },
  {
    url: "https://images.unsplash.com/photo-1504328332780-fe4d749d612b?q=80&w=2070",
    title: "Maintenance",
  }
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Auto Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Mouse Parallax Effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center"
    >
      {/* 1. BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: 0.4, 
              scale: 1.05,
              x: mousePos.x,
              y: mousePos.y 
            }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img 
              src={slides[index].url} 
              className="w-full h-full object-cover" 
              alt="Background" 
            />
          </motion.div>
        </AnimatePresence>
        {/* Dark Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]/40" />
      </div>

      {/* 2. FLOATING UI ELEMENTS */}
      <div className="absolute top-32 right-[10%] z-30 hidden lg:block">
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Activity size={20} />
            </div>
            <div>
              <p className="text-white text-[10px] font-bold uppercase tracking-widest">System Health</p>
              <p className="text-emerald-400 text-sm font-mono font-bold">OPTIMAL 99.2%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. MAIN CONTENT */}
      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10"
        >
          <Wind size={14} className="text-blue-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-200">
            Limra Sales & Services
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.85] tracking-tighter mb-10 select-none">
          ENGINEERED <br />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
            SILENCE.
          </span>
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Bespoke climate solutions for high-end residential and industrial estates. 
          Where technology meets uncompromising comfort.
        </motion.p>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <button className="group relative px-10 py-5 bg-white text-black font-black rounded-full overflow-hidden transition-all hover:pr-14 active:scale-95">
            <span className="relative z-10 flex items-center gap-2 text-sm">
              <Phone size={18} fill="black" /> START CONSULTATION
            </span>
            <ChevronRight className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all duration-300" size={20} />
          </button>
          
          <button className="flex items-center gap-3 text-white font-bold group hover:text-emerald-400 transition-colors">
            <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all">
              <MessageCircle size={20} className="text-emerald-400" />
            </div>
            <span className="tracking-widest text-[10px] uppercase">Chat with expert</span>
          </button>
        </div>
      </div>

      {/* 4. PROGRESS FOOTER */}
      <div className="absolute bottom-12 left-0 w-full px-12 flex items-end justify-between z-30">
        <div className="flex gap-6">
          {slides.map((_, i) => (
            <div key={i} className="group cursor-pointer" onClick={() => setIndex(i)}>
              <p className={`text-[10px] font-black mb-2 transition-colors ${index === i ? 'text-blue-400' : 'text-white/20'}`}>
                0{i + 1}
              </p>
              <div className="h-[2px] w-20 md:w-32 bg-white/10 relative overflow-hidden rounded-full">
                {index === i && (
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="absolute inset-0 bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:flex flex-col items-end gap-2 opacity-40 hover:opacity-100 transition-opacity cursor-help">
          <ShieldCheck size={28} className="text-blue-400" />
          <p className="text-[10px] font-black text-white tracking-[0.3em]">ISO 9001:2015</p>
        </div>
      </div>

      {/* AMBIENT BACKGROUND DOTS */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
    </section>
  );
};

export default Hero;