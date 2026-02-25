import { motion } from "framer-motion";
import amstrad from "@/assets/amstrad.png";
import blueStar from "@/assets/blue-star.png";
import carrier from "@/assets/carrier.png";
import daikin from "@/assets/dalkin.png";
import hitachi from "@/assets/hitachi.png";
import midea from "@/assets/Midea.png";
import mitsubishi from "@/assets/mitsubishi.png";
import voltas from "@/assets/voltas.png";

const COLORS = {
  navy: "#0B1F4B",
  blue: "#1D4ED8",
  blueLight: "#3B82F6",
  blueSky: "#DBEAFE",
  bluePale: "#EFF6FF",
  white: "#FFFFFF",
  slate50: "#F8FAFF",
  slate100: "#E8EFFF",
};

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
    <section
      style={{
        padding: "72px 0",
        background: COLORS.white,
        overflow: "hidden",
        position: "relative",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "48px", padding: "0 24px" }}>
        <div
          style={{
            display: "inline-block",
            background: "rgba(29,78,216,0.1)",
            border: "1px solid rgba(29,78,216,0.25)",
            color: COLORS.blue,
            fontWeight: 700,
            fontSize: "0.72rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding: "5px 14px",
            borderRadius: "100px",
            marginBottom: "14px",
          }}
        >
          Trusted Brands
        </div>

        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            color: COLORS.navy,
            lineHeight: 1.2,
          }}
        >
          We Work With The Best
        </h2>
      </div>

      {/* Fade edges */}
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: "0",
          zIndex: 10,
          left: 0,
          right: "auto",
          width: "96px",
          background: "linear-gradient(to right, #ffffff, transparent)",
        }}
      />
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: "96px",
          zIndex: 10,
          background: "linear-gradient(to left, #ffffff, transparent)",
        }}
      />

      {/* Marquee */}
      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            gap: "16px",
            width: "max-content",
            animation: "marquee 28s linear infinite",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.animationPlayState = "running")
          }
        >
          {doubled.map((brand, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                flexShrink: 0,
                width: "170px",
                background: COLORS.bluePale,
                border: `1px solid ${COLORS.slate100}`,
                borderRadius: "16px",
                cursor: "pointer",
                textAlign: "center",
                padding: "12px 10px", // 🔽 reduced padding
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(29,78,216,0.06)",
              }}
            >
              {/* Logo */}
              <div
                style={{
                  height: "72px", // 🔼 increased height
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "4px", // 🔽 reduced gap
                }}
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  style={{
                    maxHeight: "60px", // 🔼 larger logo
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Bottom accent line */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  height: "3px",
                  width: "0",
                  background: `linear-gradient(90deg, ${COLORS.navy}, ${COLORS.blueLight})`,
                  borderRadius: "2px",
                  transition: "width 0.3s",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

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