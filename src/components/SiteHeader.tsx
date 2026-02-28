import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, User as UserIcon, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserAuth } from "@/context/AuthContext";

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
  const navigate = useNavigate();
  const { isAuthenticated, userEmail, logout } = useUserAuth();

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
          {!isAuthenticated ? (
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => navigate('/login')}
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

              <button
                onClick={() => navigate('/register')}
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
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#f8fafc", padding: "4px 12px", borderRadius: "999px", border: `1px solid ${BRAND.slate100}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: BRAND.dark, fontSize: "0.85rem", fontWeight: 500 }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: BRAND.primary, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <UserIcon size={14} />
                </div>
                <span className="hidden sm:inline-block max-w-[100px] truncate" title={userEmail || ''}>
                  {userEmail?.split('@')[0]}
                </span>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: BRAND.dark,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px",
                }}
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}

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
                {!isAuthenticated ? (
                  <>
                    <button onClick={() => navigate('/login')} className="mobile-auth-btn">Sign In</button>
                    <button onClick={() => navigate('/register')} className="mobile-auth-btn primary">Sign Up</button>
                  </>
                ) : (
                  <div style={{ padding: "12px 16px", borderTop: `1px solid ${BRAND.slate100}`, marginTop: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600 }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: BRAND.primary, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <UserIcon size={16} />
                        </div>
                        <span className="truncate max-w-[200px]">{userEmail}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        navigate('/');
                        setMenuOpen(false);
                      }}
                      className="mobile-auth-btn"
                      style={{ border: `1px solid #ef4444`, color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
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