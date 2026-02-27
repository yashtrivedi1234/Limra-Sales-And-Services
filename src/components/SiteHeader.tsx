import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo1 from "../assets/logo1.png";
import { BRAND } from "@/lib/colors";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Our Story", path: "/about" },
  { name: "Services", path: "/services" },
  {
    name: "Products", path: "/product",
   
  },
  { name: "Projects", path: "/case-studies" },
  { name: "Blog", path: "/blog" },
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

  // ...existing code...

  useEffect(() => {
    setMenuOpen(false);
    setOpenSubmenu(null);
  }, [location.pathname]);

  const navLinkColor = (path: string, exact = true) => {
    const active = exact ? location.pathname === path : location.pathname.startsWith(path);
    if (active) return BRAND.primary;
    return BRAND.dark;
  };

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "all 0.4s ease",
      background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      boxShadow: `0 2px 24px ${BRAND.primary}1A`,
      borderBottom: `1px solid ${BRAND.slate100}`,
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img src={logo1} alt="LIMRA Sales & Services" style={{ height: "48px", width: "auto", objectFit: "contain" }} />
          <span style={{ fontSize: "1.05rem", fontWeight: 700, whiteSpace: "nowrap", color: BRAND.dark, transition: "color 0.4s" }}>
            LIMRA Sales &amp; Services
          </span>
        </Link>

        <nav style={{ display: "none", alignItems: "center", gap: "4px" }} className="desktop-nav">
          {navLinks.map((link) => (
              <Link key={link.name} to={link.path} style={{ fontWeight: 500, fontSize: "0.9rem", padding: "8px 12px", borderRadius: "8px", color: navLinkColor(link.path), textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = BRAND.slate100}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >{link.name}</Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a href="tel:+919839171701" style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "9px 20px", background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)`, color: BRAND.white, fontSize: "0.875rem", fontWeight: 700, borderRadius: "100px", textDecoration: "none", boxShadow: `0 4px 16px ${BRAND.primary}4D`, transition: "all 0.2s" }}>
            <Phone size={14} /> Enquiry Now
          </a>
          <button style={{ display: "none", padding: "8px", borderRadius: "8px", background: "transparent", border: "none", cursor: "pointer", color: BRAND.dark }} className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)", borderTop: `1px solid ${BRAND.slate100}`, overflow: "hidden" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 24px 24px" }}>
              {navLinks.map((link) => (
                  <Link key={link.name} to={link.path} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "12px 16px", borderRadius: "10px", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none", color: location.pathname === link.path ? BRAND.primary : BRAND.dark }}>{link.name}</Link>
              ))}
              <a href="tel:+919839171701" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "16px", padding: "13px", background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)`, color: BRAND.dark, fontSize: "0.9rem", fontWeight: 700, borderRadius: "100px", textDecoration: "none" }}>
                <Phone size={15} /> Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 1024px) { .desktop-nav { display: flex !important; } .mobile-menu-btn { display: none !important; } }
        @media (max-width: 1023px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: flex !important; } }
        .nav-group:hover .nav-dropdown { display: block !important; }
        .nav-group:hover > span { background: ${BRAND.primary}14; }
      `}</style>
    </header>
  );
};

export default SiteHeader;
