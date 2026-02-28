import { motion } from "framer-motion";
import { useGetBrandsQuery } from "@/store/api";

import { BRAND } from "@/lib/colors";
import Loader from "@/components/ui/Loader";

const BrandMarquee = () => {
  const { data: brands = [], isLoading } = useGetBrandsQuery();
  const doubled = [...brands, ...brands];

  if (isLoading) return <Loader />;
  if (brands.length === 0) return null;

  return (
      <section style={{ padding: "64px 0", background: BRAND.white, overflow: "hidden", position: "relative", fontFamily: "'DM Serif Display', serif" }}>
      <div style={{ textAlign: "center", marginBottom: "32px", padding: "0 24px" }}>
        <div style={{ display: "inline-block", background: `${BRAND.primary}1A`, border: `1px solid ${BRAND.primary}40`, color: BRAND.primary, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "100px", marginBottom: "14px" }}>
          Trusted Brands
        </div>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.2rem)", color: BRAND.dark, lineHeight: 1.15 }}>
            We Work With The Best
          </h2>
      </div>

      {/* Fade edges */}
      <div style={{ pointerEvents: "none", position: "absolute", inset: "0", zIndex: 10, left: 0, right: "auto", width: "96px", background: "linear-gradient(to right, #ffffff, transparent)" }} />
      <div style={{ pointerEvents: "none", position: "absolute", top: 0, bottom: 0, right: 0, width: "96px", zIndex: 10, background: "linear-gradient(to left, #ffffff, transparent)" }} />

      <div style={{ overflow: "hidden" }}>
        <div
          style={{ display: "flex", gap: "16px", width: "max-content", animation: "marquee 28s linear infinite" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "running")}
        >
          {doubled.map((brand: any, i: number) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                flexShrink: 0, width: "170px",
                background: BRAND.primaryPale, border: `1px solid ${BRAND.slate100}`,
                borderRadius: "16px", cursor: "pointer", textAlign: "center",
                padding: "12px 10px", position: "relative", overflow: "hidden",
                boxShadow: `0 2px 12px ${BRAND.primary}0F`,
              }}
            >
              <div style={{ height: "72px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "4px" }}>
                <img src={brand.heroImage || brand.image} alt={brand.brandName || brand.name} loading="lazy" style={{ maxHeight: "60px", maxWidth: "100%", objectFit: "contain" }} />
              </div>
              <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", height: "3px", width: "0", background: `linear-gradient(90deg, ${BRAND.dark}, ${BRAND.primary})`, borderRadius: "2px", transition: "width 0.3s" }} />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </section>
  );
};

export default BrandMarquee;
