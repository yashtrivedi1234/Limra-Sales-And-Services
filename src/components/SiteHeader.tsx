import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo1 from "../assets/logo1.png";

const COLORS = {
  navy: "#0B1F4B",
  blue: "#1D4ED8",
  blueLight: "#3B82F6",
  blueSky: "#DBEAFE",
  white: "#FFFFFF",
  slate50: "#F8FAFF",
  slate100: "#E8EFFF",
};

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  {
    name: "Product Categories",
    path: "/categories",
    submenu: [
      { name: "Residential", path: "/categories/residential" },
      { name: "Commercial", path: "/categories/commercial" },
    ],
  },
  {
    name: "Brands",
    path: "/brands",
    submenu: [
      { name: "Daikin", path: "/brand/daikin-vrv-systems" },
      { name: "Mitsubishi Heavy", path: "/brand/mitsubishi-heavy" },
      { name: "Carrier", path: "/brand/carrier" },
      { name: "Amstrad", path: "/brand/amstrad" },
      { name: "Midea", path: "/brand/midea" },
      { name: "Godrej", path: "/brand/godrej" },
      { name: "Cruise", path: "/brand/cruise" },
      { name: "Voltas", path: "/brand/voltas" },
    ],
  },
  { name: "Projects", path: "/case-studies" },
  { name: "Blogs", path: "/blog" },
  { name: "Contact Us", path: "/contact" },
];

const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();

  const isHome = location.pathname === "/";
const isBrandDetail = location.pathname.startsWith("/brand/");
const useWhiteText = (isHome || isBrandDetail) && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenSubmenu(null);
  }, [location.pathname]);

  const navLinkColor = (path: string, exact = true) => {
    const active = exact
      ? location.pathname === path
      : location.pathname.startsWith(path);
    if (active) return COLORS.blueLight;
    return useWhiteText ? "rgba(255,255,255,0.85)" : COLORS.navy;
  };

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "all 0.4s ease",
      background: scrolled
        ? "rgba(255,255,255,0.85)"
        : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      boxShadow: scrolled ? "0 2px 24px rgba(29,78,216,0.1)" : "none",
      borderBottom: scrolled ? `1px solid ${COLORS.slate100}` : "none",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "0 48px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        height: "68px"
      }}>

        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img src={logo1} alt="LIMRA Sales & Services" style={{ height: "48px", width: "auto", objectFit: "contain" }} />
          <span style={{
            fontSize: "1.05rem", fontWeight: 700, whiteSpace: "nowrap",
            fontFamily: "'DM Serif Display', serif",
            color: useWhiteText ? COLORS.white : COLORS.navy,
            transition: "color 0.4s"
          }}>
            LIMRA Sales &amp; Services
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "none", alignItems: "center", gap: "4px" }} className="desktop-nav">
          {navLinks.map((link) =>
            link.submenu ? (
              <div key={link.name} style={{ position: "relative" }} className="nav-group">
                <span style={{
                  cursor: "pointer", fontWeight: 500, fontSize: "0.9rem",
                  padding: "8px 12px", borderRadius: "8px",
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  color: navLinkColor(link.path, false),
                  transition: "all 0.2s"
                }}>
                  {link.name}
                  <ChevronDown size={13} style={{ opacity: 0.6 }} />
                </span>
                <div className="nav-dropdown" style={{
                  position: "absolute", left: 0, top: "100%",
                  paddingTop: "8px", display: "none"
                }}>
                  <div style={{
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(16px)",
                    border: `1px solid ${COLORS.slate100}`,
                    boxShadow: "0 12px 40px rgba(29,78,216,0.12)",
                    borderRadius: "14px", overflow: "hidden",
                    minWidth: "200px"
                  }}>
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        style={{
                          display: "block", padding: "10px 18px",
                          fontSize: "0.875rem", color: COLORS.navy,
                          textDecoration: "none", transition: "all 0.15s",
                          fontWeight: 500
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.background = COLORS.blueSky;
                          (e.currentTarget as HTMLElement).style.color = COLORS.blue;
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                          (e.currentTarget as HTMLElement).style.color = COLORS.navy;
                        }}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  fontWeight: 500, fontSize: "0.9rem",
                  padding: "8px 12px", borderRadius: "8px",
                  color: navLinkColor(link.path),
                  textDecoration: "none", transition: "all 0.2s"
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = scrolled ? COLORS.slate100 : "rgba(255,255,255,0.12)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                {link.name}
              </Link>
            )
          )}
        </nav>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a
            href="tel:+919839171701"
            style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              padding: "9px 20px",
              background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.blue} 100%)`,
              color: COLORS.white, fontSize: "0.875rem", fontWeight: 700,
              borderRadius: "100px", textDecoration: "none",
              boxShadow: "0 4px 16px rgba(29,78,216,0.3)",
              transition: "all 0.2s"
            }}
          >
            <Phone size={14} />
            Call Now
          </a>

          {/* Mobile hamburger */}
          <button
            style={{
              display: "none", padding: "8px", borderRadius: "8px",
              background: "transparent", border: "none", cursor: "pointer",
              color: useWhiteText ? COLORS.white : COLORS.navy
            }}
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(20px)",
              borderTop: `1px solid ${COLORS.slate100}`,
              overflow: "hidden"
            }}
          >
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 24px 24px" }}>
              {navLinks.map((link) =>
                link.submenu ? (
                  <div key={link.name}>
                    <button
                      onClick={() => setOpenSubmenu(openSubmenu === link.name ? null : link.name)}
                      style={{
                        width: "100%", display: "flex", alignItems: "center",
                        justifyContent: "space-between", padding: "12px 16px",
                        fontWeight: 600, fontSize: "0.95rem",
                        color: COLORS.navy, background: "transparent",
                        border: "none", borderRadius: "10px", cursor: "pointer",
                        transition: "background 0.2s"
                      }}
                    >
                      {link.name}
                      <ChevronDown
                        size={16}
                        style={{
                          transition: "transform 0.3s",
                          transform: openSubmenu === link.name ? "rotate(180deg)" : "rotate(0deg)"
                        }}
                      />
                    </button>
                    <AnimatePresence>
                      {openSubmenu === link.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ overflow: "hidden" }}
                        >
                          {link.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              onClick={() => setMenuOpen(false)}
                              style={{
                                display: "block", padding: "10px 32px",
                                fontSize: "0.875rem", color: COLORS.blue,
                                textDecoration: "none", borderRadius: "8px",
                                fontWeight: 500, transition: "background 0.15s"
                              }}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block", padding: "12px 16px",
                      borderRadius: "10px", fontWeight: 600, fontSize: "0.95rem",
                      textDecoration: "none", transition: "all 0.15s",
                      color: location.pathname === link.path ? COLORS.blue : COLORS.navy
                    }}
                  >
                    {link.name}
                  </Link>
                )
              )}
              <a
                href="tel:+919839171701"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: "8px", marginTop: "16px", padding: "13px",
                  background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.blue} 100%)`,
                  color: COLORS.white, fontSize: "0.9rem", fontWeight: 700,
                  borderRadius: "100px", textDecoration: "none"
                }}
              >
                <Phone size={15} /> Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for desktop nav hover — inlined for portability */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        .nav-group:hover .nav-dropdown { display: block !important; }
        .nav-group:hover > span { background: rgba(29,78,216,0.08); }
      `}</style>
    </header>
  );
};

export default SiteHeader;