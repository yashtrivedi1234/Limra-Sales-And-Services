import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Logo from "../assets/Logo.png";
import { BRAND } from "@/lib/colors";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Our Story", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Products", path: "/product" },
  { name: "Projects", path: "/case-studies" },
  { name: "Blog", path: "/blog" },
  { name: "Contact Us", path: "/contact" },
];

const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinkColor = (path: string) =>
    location.pathname === path ? BRAND.primary : BRAND.dark;

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: `0 2px 24px ${BRAND.primary}1A`,
        borderBottom: `1px solid ${BRAND.slate100}`,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "68px",
          gap: "16px",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <img
            src={Logo}
            alt="LIMRA Sales & Services"
            style={{ height: "70px", width: "auto" }}
          />

        </Link>

        {/* Desktop Navigation — centered, single line */}
        <nav
          className="desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              style={{
                fontWeight: 500,
                fontSize: "1rem",
                padding: "6px 11px",
                borderRadius: "8px",
                color: navLinkColor(link.path),
                textDecoration: "none",
                whiteSpace: "nowrap",
                lineHeight: 1,
                transition: "color 0.2s",
              }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexShrink: 0,
          }}
        >


          {/* Enquiry Button */}
          <a
            className="desktop-enquiry"
            href="tel:+919236477974"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 26px", 
              background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)`,
              color: BRAND.white,
              fontSize: "1rem",       
              fontWeight: 700,
              borderRadius: "100px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              lineHeight: 1,
              boxShadow: `0 6px 20px ${BRAND.primary}4D`, 
            }}
          >
            <Phone size={18} />   
            Enquiry Now
          </a>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              padding: "8px",
              borderRadius: "8px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: BRAND.dark,
              display: "none",
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "rgba(255,255,255,0.97)",
              borderTop: `1px solid ${BRAND.slate100}`,
            }}
          >
            <div style={{ padding: "16px 24px" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "12px 16px",
                    fontWeight: 600,
                    color:
                      location.pathname === link.path
                        ? BRAND.primary
                        : BRAND.dark,
                    textDecoration: "none",
                  }}
                >
                  {link.name}
                </Link>
              ))}



              {/* Mobile Call */}
              <a
                href="tel:+919236477974"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "16px",
                  padding: "13px",
                  background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)`,
                  color: BRAND.white,
                  fontWeight: 700,
                  borderRadius: "100px",
                  textDecoration: "none",
                }}
              >
                <Phone size={15} /> Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive Styles */}
      <style>{`
        .desktop-nav { display: none !important; }
        .mobile-menu-btn { display: flex !important; }
        .desktop-enquiry { display: none !important; }
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
          .desktop-enquiry { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
};

export default SiteHeader;