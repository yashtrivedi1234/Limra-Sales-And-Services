import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BRAND } from '@/lib/colors';

interface CTAProps {
  phoneNumber?: string;
  onConsultationClick?: () => void;
}

const CTASection: React.FC<CTAProps> = ({
  phoneNumber = "+91-9236477974",
  onConsultationClick,
}) => {
  const navigate = useNavigate();
  const handleConsultationClick = onConsultationClick || (() => navigate('/contact'));
  return (
    <section style={{ width: "100%", background: BRAND.bgSoft, padding: "64px 24px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            position: "relative", overflow: "hidden",
            background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.darkMid} 50%, ${BRAND.primary} 100%)`,
            borderRadius: "32px", padding: "clamp(48px, 6vw, 64px) clamp(32px, 5vw, 64px)",
            boxShadow: `0 24px 64px ${BRAND.primary}47`,
          }}
        >
          <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "280px", height: "280px", background: `${BRAND.primary}2E`, borderRadius: "50%", filter: "blur(48px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "280px", height: "280px", background: `${BRAND.dark}66`, borderRadius: "50%", filter: "blur(48px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: BRAND.accentOnDark, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 16px", borderRadius: "100px", marginBottom: "16px" }}>
              Get In Touch
            </div>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.2rem)", color: BRAND.white, lineHeight: 1.15, marginBottom: "20px" }}>
              Ready to Transform Your Business?
            </h2>
            <p style={{ fontSize: "1.05rem", color: BRAND.textOnDark, maxWidth: "520px", margin: "0 auto 32px", lineHeight: 1.75, fontWeight: 400 }}>
              Let's discuss how our HVAC solutions can elevate comfort in your space and keep your customers and team happy year-round.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "28px" }}>
              <button onClick={handleConsultationClick} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", background: BRAND.white, color: BRAND.dark, fontWeight: 700, fontSize: "0.95rem", borderRadius: "12px", border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", transition: "all 0.2s" }}>
                Get Free Consultation <ArrowRight size={17} />
              </button>
              <a href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 32px", background: "transparent", color: BRAND.white, fontWeight: 700, fontSize: "0.95rem", borderRadius: "12px", border: "2px solid rgba(255,255,255,0.35)", cursor: "pointer", textDecoration: "none", transition: "all 0.2s" }}>
                <Phone size={17} /> Call {phoneNumber}
              </a>
            </div>

            
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
