import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Brand {
  name: string;
  image: string;
}

// ─── Data — replace `image` values with your actual imports ───────────────────
import amstrad    from "@/assets/amstrad.png";
import blueStar   from "@/assets/blue-star.png";
import carrier    from "@/assets/carrier.png";
import daikin     from "@/assets/dalkin.png";
import hitachi    from "@/assets/hitachi.png";
import midea      from "@/assets/Midea.png";
import mitsubishi from "@/assets/mitsubishi.png";
import voltas     from "@/assets/voltas.png";

const brands: Brand[] = [
  { name: "Daikin",           image: daikin     },
  { name: "Mitsubishi Heavy", image: mitsubishi },
  { name: "Carrier",          image: carrier    },
  { name: "Voltas",           image: voltas     },
  { name: "Amstrad",          image: amstrad    },
  { name: "Midea",            image: midea      },
  { name: "Blue Star",        image: blueStar   },
  { name: "Hitachi",          image: hitachi    },
];

// ─── Card ─────────────────────────────────────────────────────────────────────
const BrandCard: React.FC<{ brand: Brand; index: number }> = ({ brand, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ scale: 1.06, y: -6 }}
    style={{
      background: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "28px 20px",
      cursor: "pointer",
      aspectRatio: "1 / 1",
      boxShadow: "0 2px 16px rgba(15,23,42,0.07)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Top shimmer accent */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "10%",
        right: "10%",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)",
      }}
    />

    {/* Hover glow */}
    <motion.div
      whileHover={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "18px",
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
        transition: "opacity 0.3s ease",
      }}
    />

    <img
      src={brand.image}
      alt={brand.name}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        display: "block",
      }}
    />
  </motion.div>
);

// ─── Main Section ─────────────────────────────────────────────────────────────
const Brand: React.FC = () => {
  return (
    <section
      style={{
        background: "#f1f5f9",
        minHeight: "100vh",
        padding: "80px 40px",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle dot grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      {/* Soft radial center highlight */}
      <div
        style={{
          position: "absolute",
          top: "0%",
          left: "50%",
          transform: "translate(-50%, 0)",
          width: "800px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(219,234,254,0.8) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: "center", marginBottom: "56px", position: "relative" }}
      >
        <span
          style={{
            display: "inline-block",
            background: "rgba(29,78,216,0.08)",
            border: "1px solid rgba(29,78,216,0.2)",
            color: "#1d4ed8",
            fontWeight: 700,
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "5px 16px",
            borderRadius: "100px",
            marginBottom: "16px",
          }}
        >
          Trusted Partners
        </span>

        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "#0f172a",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}
        >
          Our Brands
        </h2>

        {/* underline accent */}
        <div
          style={{
            margin: "14px auto 0",
            width: "48px",
            height: "3px",
            borderRadius: "2px",
            background: "linear-gradient(90deg, #1d4ed8, #60a5fa)",
          }}
        />
      </motion.div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "16px",
          maxWidth: "1100px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {brands.map((brand, i) => (
          <BrandCard key={brand.name} brand={brand} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Brand;