import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo1 from "../assets/logo1.png";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenSubmenu(null);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl shadow-lg border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo1}
            alt="LIMRA Sales & Services"
            className="h-12 w-auto object-contain"
          />
          <span
            className={`text-lg font-bold whitespace-nowrap transition-colors duration-500 ${
              scrolled ? "text-foreground" : "text-foreground"
            }`}
          >
            LIMRA Sales & Services
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.submenu ? (
              <div key={link.name} className="relative group">
                <span
                  className={`cursor-pointer font-medium px-3 py-2 rounded-lg flex items-center gap-1 transition-colors duration-300 hover:bg-accent/10 ${
                    location.pathname.startsWith(link.path)
                      ? "text-accent"
                      : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {link.name}
                  <ChevronDown size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                </span>
                <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
                  <div className="bg-background/80 backdrop-blur-xl border border-border/50 shadow-xl rounded-xl overflow-hidden min-w-[200px]">
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-accent/10 transition-colors"
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
                className={`font-medium px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-accent/10 ${
                  location.pathname === link.path
                    ? "text-accent"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            )
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+919839171701"
            className="hidden sm:flex items-center gap-2 px-5 py-2 bg-accent text-accent-foreground text-sm font-semibold rounded-full hover:shadow-glow-accent transition-shadow duration-300"
          >
            <Phone size={14} />
            Call Now
          </a>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-accent/10 transition-colors"
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
            className="lg:hidden bg-background/90 backdrop-blur-xl border-t border-border/50 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) =>
                link.submenu ? (
                  <div key={link.name}>
                    <button
                      onClick={() =>
                        setOpenSubmenu(openSubmenu === link.name ? null : link.name)
                      }
                      className="w-full flex items-center justify-between px-4 py-3 font-semibold text-foreground/80 hover:text-foreground rounded-lg hover:bg-accent/10 transition-colors"
                    >
                      {link.name}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          openSubmenu === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openSubmenu === link.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          {link.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              onClick={() => setMenuOpen(false)}
                              className="block px-8 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors"
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
                    className={`block px-4 py-3 rounded-lg font-medium transition-colors hover:bg-accent/10 ${
                      location.pathname === link.path
                        ? "text-accent"
                        : "text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              )}
              <a
                href="tel:+919839171701"
                className="flex sm:hidden items-center justify-center gap-2 mt-4 px-5 py-3 bg-accent text-accent-foreground text-sm font-semibold rounded-full"
              >
                <Phone size={14} />
                Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SiteHeader;
