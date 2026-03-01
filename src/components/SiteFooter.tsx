import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, UserCheck, ArrowRight, Clock, Shield } from "lucide-react";
import cclogo from "../assets/cc-logo.png";
import logo1 from "../assets/logo1.png";
import { BRAND } from "@/lib/colors";
import { useGetServicesQuery, useGetProjectsQuery } from "@/store/api";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Our Story", to: "/about" },
  { label: "All Products", to: "/shop" },
  { label: "Our Projects", to: "/case-studies" },
  { label: "Brands", to: "/brands" },
  { label: "Blog", to: "/blog" },
  { label: "Contact Us", to: "/contact" },
];

const policyLinks = [
  { label: "Privacy Policy", to: "#" },
  { label: "Terms & Conditions", to: "#" },
  { label: "Refund Policy", to: "#" },
];

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const colVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const SiteFooter = () => {
  const { data: services, isLoading: servicesLoading, isError: servicesError } = useGetServicesQuery();
  const { data: projects, isLoading: projectsLoading, isError: projectsError } = useGetProjectsQuery();

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      style={{ background: `linear-gradient(160deg, ${BRAND.dark} 0%, #051B30 50%, ${BRAND.dark} 100%)` }}
    >
      {/* Top accent line */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.primaryLight}, ${BRAND.primary})` }} />

      {/* CTA Strip */}
     

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14">
        <div
          className="grid gap-10"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
        >
          {/* Brand Column */}
          <motion.div variants={colVariants} className="sm:col-span-1 lg:pr-6">
            <Link to="/" className="flex items-center gap-3 mb-5" style={{ textDecoration: "none" }}>
              <img src={logo1} alt="LIMRA" style={{ height: 40, width: "auto" }} />
              <span className="text-base font-bold text-white whitespace-nowrap">
                LIMRA Sales & Services
              </span>
            </Link>

            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>
              Established in 2017, we are Bareilly's most trusted HVAC partner — delivering expert AC installation, maintenance, and sales for homes & businesses.
            </p>

            {/* Trust badges */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-2.5 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                <Shield size={14} style={{ color: BRAND.primaryLight }} />
                <span>9+ Years of Trusted Service</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                <Clock size={14} style={{ color: BRAND.primaryLight }} />
                <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.55)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${BRAND.primary}30`;
                    e.currentTarget.style.borderColor = `${BRAND.primary}50`;
                    e.currentTarget.style.color = BRAND.primaryLight;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={colVariants}>
            <p className="text-[11px] font-bold text-white uppercase tracking-[0.16em] mb-5">Quick Links</p>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm flex items-center gap-1.5 transition-all duration-200"
                    style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = BRAND.primaryLight; e.currentTarget.style.transform = "translateX(3px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.transform = "translateX(0)"; }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={colVariants}>
            <p className="text-[11px] font-bold text-white uppercase tracking-[0.16em] mb-5">Our Services</p>
            {servicesLoading ? (
              <div className="space-y-2.5">
                {[1,2,3].map(i => <div key={i} className="h-4 rounded" style={{ background: "rgba(255,255,255,0.06)", width: `${60 + i * 10}%` }} />)}
              </div>
            ) : servicesError ? (
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>Unable to load services</p>
            ) : (
              <ul className="space-y-2.5">
                {services && services.length > 0 ? (
                  services.slice(0, 6).map((s: any) => (
                    <li key={s._id || s.id}>
                      <Link
                        to={`/service/${s.slug}`}
                        className="text-sm transition-all duration-200"
                        style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = BRAND.primaryLight; e.currentTarget.style.transform = "translateX(3px)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.transform = "translateX(0)"; }}
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>No services available.</li>
                )}
              </ul>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={colVariants}>
            <p className="text-[11px] font-bold text-white uppercase tracking-[0.16em] mb-5">Contact Us</p>
            <ul className="space-y-4 mb-6">
              <li>
                <a
                  href="tel:+919839171701"
                  className="flex items-start gap-3 transition-colors duration-200 group"
                  style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = BRAND.primaryLight}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${BRAND.primary}15` }}>
                    <Phone size={14} style={{ color: BRAND.primaryLight }} />
                  </div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Phone</p>
                    <p className="text-sm font-medium">+91 9839171701</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@limrasales.com"
                  className="flex items-start gap-3 transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = BRAND.primaryLight}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${BRAND.primary}15` }}>
                    <Mail size={14} style={{ color: BRAND.primaryLight }} />
                  </div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Email</p>
                    <p className="text-sm font-medium">info@limrasales.com</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Civil+Lines,+Bareilly,+UP+243001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = BRAND.primaryLight}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${BRAND.primary}15` }}>
                    <MapPin size={14} style={{ color: BRAND.primaryLight }} />
                  </div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Location</p>
                    <p className="text-sm font-medium">Civil Lines, Bareilly, UP 243001</p>
                  </div>
                </a>
              </li>
            </ul>

            {/* Admin Login */}
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <UserCheck size={14} /> Admin Portal
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.25)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              © {new Date().getFullYear()} LIMRA Sales & Services. All rights reserved.
            </p>

            {/* Policy Links */}
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {policyLinks.map((l, i) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="text-xs transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = BRAND.primaryLight}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <a
              href="https://www.codecrafter.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all duration-500 hover:-translate-y-1 shadow-[0_8px_30px_rgba(255,255,255,0.05)] border border-white/10 bg-white/[0.04] backdrop-blur-md overflow-hidden"
              style={{ textDecoration: "none" }}
            >
              <span className="text-[10px] font-medium tracking-[0.2em] text-white/80 transition-colors duration-500 uppercase z-10">
                Designed by
              </span>
              
              <div className="relative flex items-center z-10">
                {/* Expanded smooth cinematic glow behind logo */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/0 via-white/20 to-white/0 blur-xl opacity-100 transition-all duration-700 ease-out scale-110" />
                
                <img 
                  src={cclogo} 
                  alt="CodeCrafter" 
                  className="w-[85px] opacity-100 scale-105 transition-all duration-500 filter brightness-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] relative z-10" 
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default SiteFooter;
