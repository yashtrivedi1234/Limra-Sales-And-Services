import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        
        {/* Logo */}
        <Link to="/" className="text-lg font-bold">
          LIMRA <span className="text-blue-600">Sales & Services</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) =>
            link.submenu ? (
              <div key={link.name} className="relative group inline-block">
                {/* Parent */}
                <span className="cursor-pointer font-medium py-2 block">
                  {link.name}
                </span>

                {/* Dropdown */}
                <div className="absolute left-0 top-full hidden group-hover:block bg-white border shadow-md rounded-md min-w-[200px]">
                  {link.submenu.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.path}
                      className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={link.name} to={link.path} className="font-medium py-2">
                {link.name}
              </Link>
            )
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Call Button */}
          <a
            href="tel:+919839171701"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full"
          >
            <Phone size={14} />
            Call Now
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t">
          {navLinks.map((link) =>
            link.submenu ? (
              <div key={link.name}>
                <p className="px-4 py-2 font-semibold">{link.name}</p>
                {link.submenu.map((sub) => (
                  <Link
                    key={sub.name}
                    to={sub.path}
                    onClick={() => setMenuOpen(false)}
                    className="block px-6 py-2 text-sm hover:bg-gray-100"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {link.name}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
};

export default SiteHeader;