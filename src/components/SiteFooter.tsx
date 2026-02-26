import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import cclogo from "../assets/cc-logo.png";
import { BRAND } from "@/lib/colors";

const residentialProducts = [
  "Inverter Split AC",
  "Non-Inverter Split AC",
  "Window AC",
  "Portable AC",
  "Water Coolers",
  "Air Purifiers & Water Softeners",
  "Alkaline RO Systems",
  "Solar Water Heaters",
];

const commercialProducts = [
  "VRV Systems",
  "Cassette AC",
  "Ductable AC",
  "Floor Standing AC",
  "Chiller Systems",
  "AHU Systems",
  "Heat Pumps",
  "Ventilation & HRV",
  "Cold Rooms",
  "Deep Freezers",
];

const quickLinks = [
  { label: "All Products", to: "/shop" },
  { label: "Our Projects", to: "/case-studies" },
  { label: "Privacy Policy", to: "#" },
  { label: "Terms & Conditions", to: "#" },
  { label: "Refund Policy", to: "#" },
  { label: "Brands", to: "/brands" },
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
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=DM+Serif+Display:ital,wght@0,400;1,400&display=swap');
      .limra-footer a { text-decoration: none !important; transition: color 0.2s !important; }
      .limra-footer ul { list-style: none !important; padding: 0 !important; margin: 0 !important; }
      .limra-footer-link { color: rgba(255,255,255,0.65) !important; font-size: 0.875rem !important; display: block !important; font-family: 'DM Sans', sans-serif !important; }
      .limra-footer-link:hover { color: #ffffff !important; }
      .limra-footer-heading { font-size: 0.72rem !important; font-weight: 700 !important; color: #ffffff !important; margin-bottom: 18px !important; letter-spacing: 0.14em !important; text-transform: uppercase !important; font-family: 'DM Sans', sans-serif !important; }
      .limra-social-icon { color: rgba(255,255,255,0.65); transition: color 0.2s; }
      .limra-social-icon:hover { color: #ffffff; }
    `}</style>

    <motion.footer
      className="limra-footer"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      style={{
        background: `linear-gradient(160deg, ${BRAND.dark} 0%, ${BRAND.darkMid} 60%, ${BRAND.dark} 100%)`,
        color: "#fff",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: 40,
          }}
        >
          {/* About */}
          <motion.div variants={colVariants}>
            <Link
              to="/"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "#fff",
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
            >
              LIMRA Sales &amp; Services
            </Link>
            <p style={{ color: "rgba(255,255,255,0.65)", margin: "12px 0", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", lineHeight: 1.7, fontWeight: 300 }}>
              Your trusted partner for all HVAC and air conditioning needs.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} className="limra-social-icon">
                  <s.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Residential */}
          <motion.div variants={colVariants}>
            <p className="limra-footer-heading">Residential</p>
            <ul>
              {residentialProducts.map((p) => (
                <li key={p} style={{ marginBottom: "6px" }}>
                  <Link
                    to={`/shop?product=${encodeURIComponent(p)}`}
                    className="limra-footer-link"
                  >
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Commercial */}
          <motion.div variants={colVariants}>
            <p className="limra-footer-heading">Commercial</p>
            <ul>
              {commercialProducts.map((p) => (
                <li key={p} style={{ marginBottom: "6px" }}>
                  <Link
                    to={`/shop?product=${encodeURIComponent(p)}`}
                    className="limra-footer-link"
                  >
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={colVariants}>
            <p className="limra-footer-heading">Contact Info</p>
            <ul style={{ marginBottom: 20 }}>
              <li style={{ display: "flex", gap: 10, marginBottom: "8px", alignItems: "flex-start" }}>
                <Phone size={14} style={{ marginTop: 3, flexShrink: 0 }} />
                <a href="tel:+919839171701" className="limra-footer-link">
                  +91 9839171701
                </a>
              </li>
              <li style={{ display: "flex", gap: 10, marginBottom: "8px", alignItems: "flex-start" }}>
                <Mail size={14} style={{ marginTop: 3, flexShrink: 0 }} />
                <a href="mailto:info@limrasales.com" className="limra-footer-link">
                  info@limrasales.com
                </a>
              </li>
              <li style={{ display: "flex", gap: 10, marginBottom: "8px", alignItems: "flex-start" }}>
                <MapPin size={14} style={{ marginTop: 3, flexShrink: 0 }} />
                <a
                  href="https://maps.google.com/?q=Civil+Lines,+Bareilly,+UP+243001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="limra-footer-link"
                >
                  Civil Lines, Bareilly, UP 243001
                </a>
              </li>
            </ul>

            <p className="limra-footer-heading">Quick Links</p>
            <ul>
              {quickLinks.map((l) => (
                <li key={l.label} style={{ marginBottom: "6px" }}>
                  <Link to={l.to} className="limra-footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          background: "#020D1A",
          padding: "16px 20px",
          fontSize: 12,
          color: "rgba(255,255,255,0.55)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          textAlign: "center",
          flexWrap: "wrap",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
        }}
      >
        <span>
          © {new Date().getFullYear()} LIMRA Sales &amp; Services | Designed by
        </span>

        <a
          href="https://www.codecrafter.co.in/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img src={cclogo} alt="CodeCrafter" style={{ width: 90 }} />
        </a>
      </div>
    </motion.footer>
  </>
);

export default SiteFooter;