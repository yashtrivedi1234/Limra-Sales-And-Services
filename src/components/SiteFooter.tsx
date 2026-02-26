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
      .limra-footer a { text-decoration: none !important; transition: color 0.2s !important; }
      .limra-footer ul { list-style: none !important; padding: 0 !important; margin: 0 !important; }
      .limra-footer-link {
        color: rgba(255,255,255,0.65) !important;
        font-size: 0.875rem !important;
        display: block !important;
        font-family: 'DM Sans', sans-serif !important;
      }
      .limra-footer-link:hover { color: #ffffff !important; }
      .limra-footer-heading {
        font-size: 0.72rem !important;
        font-weight: 700 !important;
        color: #ffffff !important;
        margin-bottom: 18px !important;
        letter-spacing: 0.14em !important;
        text-transform: uppercase !important;
      }
      .limra-social-icon { color: rgba(255,255,255,0.65); transition: color 0.2s; }
      .limra-social-icon:hover { color: #ffffff; }
    `}</style>

    <motion.footer
      className="limra-footer"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      style={{
        background: "linear-gradient(160deg,#0B1F4B 0%,#0F2460 60%,#0B1F4B 100%)",
        color: "#fff",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 32px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: 40,
        }}>

          {/* Brand */}
          <motion.div variants={colVariants}>
            <Link to="/" style={{ fontWeight: 700, color: "#fff" }}>
              LIMRA Sales & Services
            </Link>

            <p style={{ color: "rgba(255,255,255,0.65)", margin: "12px 0" }}>
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
                <li key={p}>
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
                <li key={p}>
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
              <li style={{ display: "flex", gap: 10 }}>
                <Phone size={14} />
                <a href="tel:+919839171701" className="limra-footer-link">
                  +91 9839171701
                </a>
              </li>

              <li style={{ display: "flex", gap: 10 }}>
                <Mail size={14} />
                <a href="mailto:info@limrasales.com" className="limra-footer-link">
                  info@limrasales.com
                </a>
              </li>

              {/* ✅ FIXED ADDRESS LINK */}
              <li style={{ display: "flex", gap: 10 }}>
                <MapPin size={14} />
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
                <li key={l.label}>
                  <Link to={l.to} className="limra-footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>

      {/* Bottom */}
      <div style={{
        background: "#05091A",
        padding: 16,
        textAlign: "center",
        fontSize: 12,
        color: "rgba(255,255,255,0.55)"
      }}>
        © {new Date().getFullYear()} LIMRA Sales & Services | Designed by
        <a
          href="https://www.codecrafter.co.in/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: 6 }}
        >
          <img src={cclogo} alt="CodeCrafter" style={{ width: 70 }} />
        </a>
      </div>
    </motion.footer>
  </>
);

export default SiteFooter;