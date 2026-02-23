import { motion } from "framer-motion";
import amstrad from "@/assets/amstrad.png";
import blueStar from "@/assets/blue-star.png";
import carrier from "@/assets/carrier.png";
import daikin from "@/assets/dalkin.png";   
import hitachi from "@/assets/hitachi.png";
import midea from "@/assets/Midea.png";
import mitsubishi from "@/assets/mitsubishi.png";
import voltas from "@/assets/voltas.png";

const brands = [
  { name: "Daikin", subtitle: "Premium VRV Systems", image: daikin },
  { name: "Mitsubishi Heavy", subtitle: "Heavy Duty Commercial", image: mitsubishi },
  { name: "Carrier", subtitle: "Reliable Cooling", image: carrier },
  { name: "Voltas", subtitle: "India's No.1 AC", image: voltas },
  { name: "Amstrad", subtitle: "Quality + Competitive Price", image: amstrad },
  { name: "Midea", subtitle: "Economical & Smart", image: midea },
  { name: "Blue Star", subtitle: "Nobody Cools Better", image: blueStar },
  { name: "Hitachi", subtitle: "Inspire the Next", image: hitachi },
];

const BrandMarquee = () => {
  const doubled = [...brands, ...brands];

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white overflow-hidden relative">
      {/* Heading */}
      <div className="text-center mb-10 px-4">
        <p className="text-xs font-semibold tracking-[0.2em] text-blue-500 uppercase mb-2">
          Trusted Brands
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          We Work With The Best
        </h2>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-slate-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />

      {/* Marquee wrapper */}
      <div className="overflow-hidden">
        <div
          className="flex gap-5 w-max"
          style={{
            animation: "marquee 28s linear infinite",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.animationPlayState =
              "paused")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.animationPlayState =
              "running")
          }
        >
          {doubled.map((brand, i) => (
            <motion.div
              key={i}
              whileHover={{
                y: -10,
                scale: 1.07,
                boxShadow:
                  "0 20px 40px -10px rgba(59,130,246,0.2), 0 8px 16px -6px rgba(0,0,0,0.1)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex-shrink-0 w-[170px] bg-white border border-gray-100 rounded-2xl cursor-pointer text-center p-5 group relative"
              style={{
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Logo */}
              <div className="h-14 flex items-center justify-center mb-3 relative z-10">
                <img
                  src={brand.image}
                 
                  className="max-h-11 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>


              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 bg-blue-400 rounded-full transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default BrandMarquee;