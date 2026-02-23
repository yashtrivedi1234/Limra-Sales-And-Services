import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

const quickLinks = ["Home", "Products", "Services", "Projects", "Rentals", "Contact"];
const socialLinks = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
];

const SiteFooter = () => (
  <motion.footer
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-primary pt-20 pb-8"
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div>
          <h3 className="font-display text-2xl font-bold text-primary-foreground mb-4">
            Khandelwal<br />Distributors
          </h3>
          <p className="text-primary-foreground/50 text-sm leading-relaxed">
            Your trusted HVAC partner since 1998. Authorized dealers for India's top cooling brands.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-primary-foreground mb-4">Quick Links</h4>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="relative text-sm text-primary-foreground/50 hover:text-accent transition-colors inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Bareilly */}
        <div>
          <h4 className="font-display font-bold text-primary-foreground mb-4">Bareilly Office</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/50">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-accent flex-shrink-0" /> Civil Lines, Bareilly, UP 243001</li>
            <li className="flex items-center gap-2"><Phone size={16} className="text-accent flex-shrink-0" /> +91 98370 XXXXX</li>
            <li className="flex items-center gap-2"><Mail size={16} className="text-accent flex-shrink-0" /> info@khandelwaldist.com</li>
          </ul>
        </div>

        {/* Shahjahanpur */}
        <div>
          <h4 className="font-display font-bold text-primary-foreground mb-4">Shahjahanpur Office</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/50">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-accent flex-shrink-0" /> Main Market, Shahjahanpur, UP 242001</li>
            <li className="flex items-center gap-2"><Phone size={16} className="text-accent flex-shrink-0" /> +91 98370 XXXXX</li>
          </ul>
          <div className="flex gap-3 mt-6">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href="#"
                className="w-10 h-10 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 flex items-center justify-center text-primary-foreground/40 hover:text-accent hover:border-accent/40 transition-all duration-300"
                aria-label={s.label}
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-primary-foreground/30">
          © {new Date().getFullYear()} Khandelwal Distributors. All rights reserved.
        </p>
        <p className="text-xs text-primary-foreground/30">
          Authorized Dealers — Daikin · Mitsubishi · Carrier · Voltas · Midea · Godrej
        </p>
      </div>
    </div>
  </motion.footer>
);

export default SiteFooter;
