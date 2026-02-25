import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';

const COLORS = {
  navy: "#0B1F4B",
  blue: "#1D4ED8",
  blueLight: "#3B82F6",
  white: "#FFFFFF",
  slate50: "#F8FAFF",
};

interface CTAProps {
  phoneNumber?: string;
  onConsultationClick?: () => void;
}

const CTASection: React.FC<CTAProps> = ({
  phoneNumber = "+91-9236477974",
  onConsultationClick,
}) => {
  return (
    <section style={{
      width: "100%",
      background: COLORS.slate50,
      padding: "80px 24px",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #0B1F4B 0%, #1A3580 50%, #1D4ED8 100%)",
          borderRadius: "32px",
          padding: "72px 64px",
          boxShadow: "0 24px 64px rgba(29,78,216,0.28)",
        }}>

          {/* Blobs */}
          <div style={{
            position: "absolute", top: "-60px", right: "-60px",
            width: "280px", height: "280px",
            background: "rgba(59,130,246,0.18)",
            borderRadius: "50%", filter: "blur(48px)", pointerEvents: "none"
          }} />
          <div style={{
            position: "absolute", bottom: "-60px", left: "-60px",
            width: "280px", height: "280px",
            background: "rgba(11,31,75,0.4)",
            borderRadius: "50%", filter: "blur(48px)", pointerEvents: "none"
          }} />

          {/* Dot pattern */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.15,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px", pointerEvents: "none"
          }} />

          <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>

            {/* Pill */}
            <div style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "#93C5FD", fontWeight: 700, fontSize: "0.72rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "5px 16px", borderRadius: "100px", marginBottom: "24px"
            }}>
              Get In Touch
            </div>

            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              color: COLORS.white, lineHeight: 1.15, marginBottom: "20px",
            }}>
              Ready to Transform{" "}
              <span style={{ color: "#93C5FD" }}>Your Business?</span>
            </h2>

            <p style={{
              fontSize: "1.05rem", color: "rgba(219,234,254,0.8)",
              maxWidth: "520px", margin: "0 auto 40px",
              lineHeight: 1.75, fontWeight: 300,
            }}>
              Let's discuss how our HVAC solutions can elevate comfort in your space
              and keep your customers and team happy year-round.
            </p>

            <div style={{
              display: "flex", flexWrap: "wrap",
              alignItems: "center", justifyContent: "center",
              gap: "14px", marginBottom: "28px"
            }}>
              <button
                onClick={onConsultationClick}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "14px 32px", background: COLORS.white,
                  color: COLORS.navy, fontWeight: 700, fontSize: "0.95rem",
                  borderRadius: "12px", border: "none", cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)", transition: "all 0.2s",
                }}
              >
                Get Free Consultation
                <ArrowRight size={17} />
              </button>

              <a
                href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "13px 32px", background: "transparent",
                  color: COLORS.white, fontWeight: 700, fontSize: "0.95rem",
                  borderRadius: "12px", border: "2px solid rgba(255,255,255,0.35)",
                  cursor: "pointer", textDecoration: "none", transition: "all 0.2s"
                }}
              >
                <Phone size={17} />
                Call {phoneNumber}
              </a>
            </div>

            <p style={{
              fontSize: "0.75rem", color: "rgba(219,234,254,0.45)",
              fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase"
            }}>
              No strings attached &nbsp;•&nbsp; Expert Advice
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;