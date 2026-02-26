import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Star } from "lucide-react";
import cclogo from "../assets/cc-logo.png";



const residentialProducts = [
  "Inverter Split AC", "Non-Inverter Split AC", "Window AC",
  "Portable AC", "Water Coolers", "Air Purifiers & Water Softeners",
  "Alkaline RO Systems", "Solar Water Heaters",
];

const commercialProducts = [
  "VRV Systems", "Cassette AC", "Ductable AC", "Floor Standing AC",
  "Chiller Systems", "AHU Systems", "Heat Pumps",
  "Ventilation & HRV", "Cold Rooms", "Deep Freezers",
];

const quickLinks = [
  "All Products", "Our Projects", "Privacy Policy",
  "Terms & Conditions", "Refund Policy",
];

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const colVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const SiteFooter = () => (
  <>
    <style>{`
      /* Scoped overrides — prevents global Tailwind/CSS from breaking footer colors */
      .limra-footer,
      .limra-footer * {
        box-sizing: border-box;
      }
      .limra-footer a {
        text-decoration: none !important;
        transition: color 0.2s !important;
      }
      .limra-footer ul {
        list-style: none !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      .limra-footer-link {
        color: rgba(255, 255, 255, 0.65) !important;
        font-size: 0.875rem !important;
        display: block !important;
        font-family: 'DM Sans', sans-serif !important;
      }
      .limra-footer-link:hover {
        color: #ffffff !important;
      }
      .limra-footer-heading {
        font-size: 0.72rem !important;
        font-weight: 700 !important;
        color: #ffffff !important;
        margin: 0 0 18px 0 !important;
        padding: 0 !important;
        letter-spacing: 0.14em !important;
        text-transform: uppercase !important;
        font-family: 'DM Sans', sans-serif !important;
      }
      .limra-bottom-link {
        color: rgba(255, 255, 255, 0.6) !important;
        font-size: 0.8rem !important;
        text-decoration: none !important;
        transition: color 0.2s !important;
      }
      .limra-bottom-link:hover {
        color: #ffffff !important;
      }
      .limra-bottom-link-white {
        color: #ffffff !important;
        font-weight: 600 !important;
      }
      .limra-bottom-link-blue {
        color: #93C5FD !important;
        font-weight: 600 !important;
      }
      .limra-social-icon {
        color: rgba(255, 255, 255, 0.65) !important;
        display: flex !important;
        align-items: center !important;
        transition: color 0.2s !important;
      }
      .limra-social-icon:hover {
        color: #ffffff !important;
      }
    `}</style>

    <motion.footer
      className="limra-footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={containerVariants}
      style={{
        background: "linear-gradient(160deg, #0B1F4B 0%, #0F2460 60%, #0B1F4B 100%)",
        color: "#ffffff",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
        display: "block",
        width: "100%",
      }}
    >
      {/* Dot pattern overlay */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0.09,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Top gradient accent line */}
      <div style={{
        height: "3px", position: "relative", zIndex: 1,
        background: "linear-gradient(90deg, #0B1F4B 0%, #1D4ED8 30%, #3B82F6 50%, #1D4ED8 70%, #0B1F4B 100%)",
      }} />

      {/* ── Main grid ── */}
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "64px 32px 56px",
        position: "relative", zIndex: 2,
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(165px, 1fr))",
          gap: "40px 28px",
        }}>

          {/* ── Brand column ── */}
          <motion.div variants={colVariants}>
            <a href="#" style={{ display: "inline-block", marginBottom: "14px" }}>
              <span style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "1.05rem", fontWeight: 700,
                color: "#ffffff",
                borderBottom: "1px solid rgba(255,255,255,0.35)",
                paddingBottom: "3px",
              }}>
                LIMRA Sales &amp; Services
              </span>
            </a>
            <p style={{
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.75, marginBottom: "16px",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Your trusted partner for all HVAC and air conditioning needs.
              Authorized dealer for premium brands with expert installation and service.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "20px" }}>
              <Star size={14} style={{ color: "#60A5FA", flexShrink: 0 }} fill="#60A5FA" />
              <span style={{
                fontSize: "0.875rem", fontWeight: 600, color: "#ffffff",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                9+ Years of Excellence
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="limra-social-icon">
                  <s.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          

          {/* ── Residential ── */}
          <motion.div variants={colVariants}>
            <p className="limra-footer-heading">Residential</p>
            <ul>
              {residentialProducts.map((p) => (
                <li key={p} style={{ marginBottom: "9px" }}>
                  <a href="#" className="limra-footer-link">{p}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Commercial ── */}
          <motion.div variants={colVariants}>
            <p className="limra-footer-heading">Commercial</p>
            <ul>
              {commercialProducts.map((p) => (
                <li key={p} style={{ marginBottom: "9px" }}>
                  <a href="#" className="limra-footer-link">{p}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Contact + Quick Links ── */}
          <motion.div variants={colVariants}>
            <p className="limra-footer-heading">Contact Info</p>
            <ul style={{ marginBottom: "28px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <Phone size={14} style={{ color: "#60A5FA", flexShrink: 0 }} />
                <a href="tel:+919839171701" className="limra-footer-link" style={{ display: "inline" }}>
                  +91 9839171701
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <Mail size={14} style={{ color: "#60A5FA", flexShrink: 0 }} />
                <a href="mailto:info@limrasales.com" className="limra-footer-link" style={{ display: "inline", wordBreak: "break-all" }}>
                  info@limrasales.com
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <MapPin size={14} style={{ color: "#60A5FA", flexShrink: 0, marginTop: "2px" }} />
                <span style={{
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.65)",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  Civil Lines, Bareilly, UP 243001
                </span>
              </li>
            </ul>

            
            <p className="limra-footer-heading ">Quick Links</p>
            <ul>
              {quickLinks.map((l) => (
                <li key={l} style={{ marginBottom: "9px" }}>
                  <a href="#" className="limra-footer-link">{l}</a>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <motion.div
        variants={colVariants}
        style={{
          background: "#05091A",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "16px 32px",
          position: "relative", zIndex: 2,
        }}
      >
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px 8px",
          textAlign: "center",
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.55)",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          <span>
            Copyright © {new Date().getFullYear()} LIMRA Sales And Services. All rights reserved.
          </span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
          <span>Designed By</span>
          <Link
            to="https://www.codecrafter.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Code Crafter"
            style={{ display: "inline-flex", alignItems: "center", lineHeight: 1 }}
          >
            <img
              src={cclogo}
              alt="CodeCrafter Logo"
              style={{
                width: "80px",
                objectFit: "contain",
                transition: "transform 0.2s",
                verticalAlign: "middle",
                filter: "brightness(0) invert(1) opacity(0.75)",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.08)"}
              onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"}
            />
          </Link>
        </div>
      </motion.div>

    </motion.footer>
  </>
);

export default SiteFooter;