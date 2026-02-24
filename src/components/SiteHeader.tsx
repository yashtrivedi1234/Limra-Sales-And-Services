import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import FlowingMenu from "./ui/FlowingMenu";

/* =========================
   Menu Items
========================= */
const menuItems = [
  {
    text: "Home",
    link: "/",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
  },
  {
    text: "About",
    link: "/about",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
  },
  {
    text: "Blog",
    link: "/blog",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
  },
  {
    text: "Case Studies",
    link: "/case-studies",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
  },
  {
    text: "Shop",
    link: "/shop",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
  },
];

const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  /* =========================
     Lock scroll when menu open
  ========================= */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  /* =========================
     Close menu on route change (optional)
  ========================= */
  const handleCloseMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link
            to="/"
            className="font-display font-bold text-lg text-foreground tracking-tight"
          >
            LIMRA <span className="text-accent">Sales & Services</span>
          </Link>

          {/* CTA + Menu Toggle */}
          <div className="flex items-center gap-3">
            {/* Call Button */}
            <a
              href="tel:+919839171701"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground text-sm font-bold rounded-full hover:opacity-90 transition-opacity"
            >
              <Phone size={14} />
              Call Now
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ================= FULLSCREEN MENU ================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
          >
            {/* Overlay click closes menu */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={handleCloseMenu}
            />

            {/* Flowing Menu */}
            <div className="relative h-full">
              <FlowingMenu
                items={menuItems}
                speed={18}
                textColor="#ffffff"
                bgColor="#060010"
                marqueeBgColor="#ffffff"
                marqueeTextColor="#060010"
                borderColor="#222"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteHeader;