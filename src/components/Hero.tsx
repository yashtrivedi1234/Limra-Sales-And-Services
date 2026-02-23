import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MessageCircle,
  ChevronRight,
  Wind,
  ShieldCheck,
  Activity,
} from "lucide-react";

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
  },
];

const Hero = () => {
  return (
    <section className="relative h-screen w-full max-w-full bg-[#f5f4f0] overflow-hidden flex items-center justify-center">
      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 relative z-20 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-300/60 bg-sky-50/80 shadow-sm"
        >
          <Wind size={14} className="text-sky-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-600">
            Limra Sales & Services
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-slate-900 leading-[0.85] tracking-tighter mb-10 select-none w-full overflow-hidden">
          ENGINEERED <br />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-slate-300">
            SILENCE.
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Bespoke climate solutions for high-end residential and industrial
          estates. Where technology meets uncompromising comfort.
        </motion.p>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">

          {/* ✅ Call Button -  */}
          <a
  href="tel:+919839171701"
  className="group relative px-10 py-5 bg-slate-900 text-white font-black rounded-full overflow-hidden transition-all hover:pr-14 active:scale-95 shadow-lg shadow-slate-300 flex items-center gap-2"
>
  <Phone size={18} fill="white" />
  <span className="text-sm">START CONSULTATION</span>

  <ChevronRight
    className="opacity-0 group-hover:opacity-100 transition-all duration-300"
    size={20}
  />
</a>

          {/* ✅ WhatsApp Chat Button -    */}
          <a
            href="https://wa.me/9839171701"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-slate-700 font-bold group hover:text-emerald-600 transition-colors"
          >
            <div className="h-12 w-12 rounded-full border border-slate-200 bg-white flex items-center justify-center group-hover:border-emerald-400 group-hover:bg-emerald-50 transition-all shadow-sm">
              <MessageCircle size={20} className="text-emerald-500" />
            </div>
            <span className="tracking-widest text-[10px] uppercase">
              Chat with expert
            </span>
          </a>
        </div>
      </div>

      {/* AMBIENT BACKGROUND DOTS */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.08) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
    </section>
  );
};

export default Hero;