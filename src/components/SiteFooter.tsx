import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Star } from "lucide-react";

const brands = [
  "Daikin (VRV Systems)",
  "Mitsubishi Heavy",
  "Carrier",
  "Amstrad",
  "Midea",
  "Godrej",
  "Cruise",
  "Voltas",
];

const residentialProducts = [
  "Inverter Split AC",
  "Non-Inverter Split AC",
  "Window AC",
  "Portable AC",
  "Water Coolers",
  "Air Purifiers & Water Softeners",
  "Alkaline RO Systems",
  "Solar Water Heaters",
];

const commercialProducts = [
  "VRV Systems",
  "Cassette AC",
  "Ductable AC",
  "Floor Standing AC",
  "Chiller Systems",
  "AHU Systems",
  "Heat Pumps",
  "Ventilation & HRV",
  "Cold Rooms",
  "Deep Freezers",
];

const quickLinks = [
  "All Products",
  "Our Projects",
  "Privacy Policy",
  "Terms & Conditions",
  "Refund Policy",
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
  <motion.footer
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    variants={containerVariants}
    className="bg-primary text-white border-t border-border"
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* Brand Column */}
        <motion.div variants={colVariants} className="lg:col-span-1">
          <a href="#" className="inline-block mb-4">
            <h3 className="text-lg font-bold text-white underline underline-offset-2 decoration-white">
              LIMRA Sales &amp; Services
            </h3>
          </a>
          <p className="text-sm text-white/70 leading-relaxed mb-4">
            Your trusted partner for all HVAC and air conditioning needs. Authorized dealer for premium brands with expert installation and service.
          </p>
          <div className="flex items-center gap-1.5 mb-5">
            <Star size={16} className="text-orange-400 fill-orange-400" />
            <span className="text-sm font-semibold text-white">9+ Years of Excellence</span>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="text-white/70 hover:text-white transition-colors duration-200"
              >
                <s.icon size={20} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Our Brands */}
        <motion.div variants={colVariants}>
          <h4 className="text-sm font-bold text-white mb-4">Our Brands</h4>
          <ul className="space-y-2.5">
            {brands.map((b) => (
              <li key={b}>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors duration-200">
                  {b}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Residential Products */}
        <motion.div variants={colVariants}>
          <h4 className="text-sm font-bold text-white mb-4">Residential Products</h4>
          <ul className="space-y-2.5">
            {residentialProducts.map((p) => (
              <li key={p}>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors duration-200">
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Commercial Products */}
        <motion.div variants={colVariants}>
          <h4 className="text-sm font-bold text-white mb-4">Commercial Products</h4>
          <ul className="space-y-2.5">
            {commercialProducts.map((p) => (
              <li key={p}>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors duration-200">
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info + Quick Links */}
        <motion.div variants={colVariants}>
          <h4 className="text-sm font-bold text-white mb-4">Contact Info</h4>
          <ul className="space-y-3 mb-7">
            <li className="flex items-center gap-2.5 text-sm text-white/70">
              <Phone size={14} className="text-orange-400 flex-shrink-0" />
              <a href="tel:+919839171701" className="hover:text-white transition-colors">
                +91 9839171701
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-sm text-white/70">
              <Mail size={14} className="text-orange-400 flex-shrink-0" />
              <a href="mailto:info@limrasales.com" className="hover:text-white transition-colors break-all">
                info@limrasales.com
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-white/70">
              <MapPin size={14} className="text-orange-400 flex-shrink-0 mt-0.5" />
              <span>Civil Lines, Bareilly, UP 243001</span>
            </li>
          </ul>

          <h4 className="text-sm font-bold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l}>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors duration-200">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>

    {/* Bottom Bar */}
    <motion.div variants={colVariants} className="bg-black border-t border-white/10 py-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-1.5 text-sm text-white/70 text-center flex-wrap">
        <span>© {new Date().getFullYear()} LIMRA Sales And Services. All rights reserved.</span>
        <span className="hidden sm:inline text-white/30">|</span>
        <a href="#" className="text-white hover:underline font-medium">Licensed HVAC Contractor</a>
        <span className="text-white/30">|</span>
        <a href="#" className="text-orange-400 hover:underline font-medium">Authorized Dealer</a>
        <span className="text-white/30">|</span>
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <span className="text-white/30">|</span>
        <a href="#" className="hover:text-white transition-colors">Terms &amp; Conditions</a>
        <span className="text-white/30">|</span>
        <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
      </div>
    </motion.div>
  </motion.footer>
);

export default SiteFooter;