import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/Logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Our Story", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Products", path: "/product" },
  // { name: "Projects", path: "/case-studies" },
  { name: "Blog", path: "/blog" },
  { name: "Contact Us", path: "/contact" },
];

const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const activeLinkColor = (path: string) =>
    location.pathname === path ? "hsl(var(--primary))" : "hsl(var(--brand-dark))";

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      boxShadow: "0 2px 24px hsl(var(--primary) / 0.1)",
      borderBottom: "1px solid hsl(var(--border))",
    }}>
      <div style={{
        maxWidth: "1280px", margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "80px", gap: "16px",
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
          <img src={Logo} alt="LIMRA Sales & Services" style={{ height: "70px", width: "auto" }} />
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1, justifyContent: "center" }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              style={{
                fontWeight: 500, fontSize: "1rem",
                padding: "6px 11px", borderRadius: "8px",
                color: activeLinkColor(link.path),
                textDecoration: "none", whiteSpace: "nowrap",
                lineHeight: 1, transition: "color 0.2s",
              }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <a
            className="desktop-enquiry"
            href="tel:+919236477974"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "12px 26px",
              background: "linear-gradient(135deg, hsl(var(--brand-dark)) 0%, hsl(var(--primary)) 100%)",
              color: "white", fontSize: "1rem", fontWeight: 700,
              borderRadius: "100px", textDecoration: "none",
              whiteSpace: "nowrap", lineHeight: 1,
              boxShadow: "0 6px 20px hsl(var(--primary) / 0.3)",
            }}
          >
            <Phone size={18} /> Enquiry Now
          </a>

          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            style={{
              padding: "8px",
              borderRadius: "8px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "hsl(var(--brand-dark))",
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
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: "rgba(255,255,255,0.97)", borderTop: "1px solid hsl(var(--border))" }}
          >
            <div style={{ padding: "16px 24px" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block", padding: "12px 16px", fontWeight: 600,
                    color: location.pathname === link.path ? "hsl(var(--primary))" : "hsl(var(--brand-dark))",
                    textDecoration: "none",
                  }}
                >
                  {link.name}
                </Link>
              ))}

              <a
                href="tel:+919236477974"
                aria-label="Call LIMRA Sales and Services"
                style={{
                  display: "flex", justifyContent: "center", alignItems: "center", gap: "8px",
                  marginTop: "16px", padding: "13px",
                  background: "linear-gradient(135deg, hsl(var(--brand-dark)) 0%, hsl(var(--primary)) 100%)",
                  color: "white", fontWeight: 700, borderRadius: "100px", textDecoration: "none",
                }}
              >
                <Phone size={15} /> Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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