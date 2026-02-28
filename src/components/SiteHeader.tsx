import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

import logo1 from "../assets/logo1.png";
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
            src={logo1}
            alt="LIMRA Sales & Services"
            style={{ height: "44px", width: "auto" }}
          />
          <span
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: BRAND.dark,
              whiteSpace: "nowrap",
            }}
          >
            LIMRA Sales & Services
          </span>
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
                fontSize: "0.875rem",
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
          {/* Auth Buttons */}
          <SignedOut>
            <span className="desktop-auth" style={{ display: "flex", gap: "8px" }}>
            <SignInButton mode="modal">
              <button
                style={{
                  padding: "7px 16px",
                  borderRadius: "999px",
                  border: `1.5px solid ${BRAND.primary}`,
                  background: "transparent",
                  color: BRAND.primary,
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                }}
              >
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button
                style={{
                  padding: "7px 16px",
                  borderRadius: "999px",
                  border: "none",
                  background: BRAND.primary,
                  color: BRAND.white,
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                }}
              >
                Sign Up
              </button>
            </SignUpButton>
            </span>
          </SignedOut>

          <span className="desktop-auth">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </span>

          {/* Enquiry Button */}
          <a
            className="desktop-enquiry"
            href="tel:+919839171701"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 18px",
              background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)`,
              color: BRAND.white,
              fontSize: "0.85rem",
              fontWeight: 700,
              borderRadius: "100px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              lineHeight: 1,
              boxShadow: `0 4px 16px ${BRAND.primary}4D`,
            }}
          >
            <Phone size={13} /> Enquiry Now
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

              {/* Mobile Auth */}
              <div style={{ marginTop: "16px" }}>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="mobile-auth-btn">Sign In</button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="mobile-auth-btn primary">Sign Up</button>
                  </SignUpButton>
                </SignedOut>

                <SignedIn>
                  <div style={{ padding: "12px 16px" }}>
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
              </div>

              {/* Mobile Call */}
              <a
                href="tel:+919839171701"
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
        .desktop-auth { display: none !important; }
        .desktop-enquiry { display: none !important; }
        .mobile-auth-btn {
          width: 100%;
          padding: 10px;
          margin-bottom: 8px;
          border-radius: 999px;
          border: 1.5px solid ${BRAND.primary};
          background: transparent;
          color: ${BRAND.primary};
          font-weight: 600;
          cursor: pointer;
        }
        .mobile-auth-btn.primary {
          background: ${BRAND.primary};
          color: white;
          border: none;
        }
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
          .desktop-auth { display: flex !important; }
          .desktop-enquiry { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
};

export default SiteHeader;