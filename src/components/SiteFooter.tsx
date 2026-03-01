import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, UserCheck } from "lucide-react";
import cclogo from "../assets/cc-logo.png";
import { BRAND } from "@/lib/colors";
import { useGetServicesQuery, useGetProjectsQuery } from "@/store/api";

const quickLinks = [
  { label: "All Products", to: "/shop" },
  { label: "Our Projects", to: "/case-studies" },
  { label: "Privacy Policy", to: "#" },
  { label: "Terms & Conditions", to: "#" },
  { label: "Refund Policy", to: "#" },
  { label: "Brands", to: "/brands" },
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

const SiteFooter = () => {
  const { data: services, isLoading: servicesLoading, isError: servicesError } = useGetServicesQuery();
  const { data: projects, isLoading: projectsLoading, isError: projectsError } = useGetProjectsQuery();

  return (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=DM+Serif+Display:ital,wght@0,400;1,400&display=swap');
      .limra-footer a { text-decoration: none !important; transition: color 0.2s !important; }
      .limra-footer ul { list-style: none !important; padding: 0 !important; margin: 0 !important; }
      .limra-footer-link { color: rgba(255,255,255,0.65) !important; font-size: 0.875rem !important; display: block !important; font-family: 'DM Sans', sans-serif !important; }
      .limra-footer-link:hover { color: #ffffff !important; }
      .limra-footer-heading { font-size: 0.72rem !important; font-weight: 700 !important; color: #ffffff !important; margin-bottom: 18px !important; letter-spacing: 0.14em !important; text-transform: uppercase !important; font-family: 'DM Sans', sans-serif !important; }
      .limra-social-icon { color: rgba(255,255,255,0.65); transition: color 0.2s; }
      .limra-social-icon:hover { color: #ffffff; }
    `}</style>

    <motion.footer
      className="limra-footer"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      style={{
        background: `linear-gradient(160deg, ${BRAND.dark} 0%, ${BRAND.darkMid} 60%, ${BRAND.dark} 100%)`,
        color: "#fff",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: 40,
          }}
        >
          {/* About & Admin */}
          <motion.div variants={colVariants}>
            <Link
              to="/"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "#fff",
                whiteSpace: "nowrap",
                textDecoration: "none",
                display: "block",
                marginBottom: "20px"
              }}
            >
              LIMRA Sales &amp; Services
            </Link>

            <Link
              to="/admin"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: 6,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 24,
                backdropFilter: "blur(4px)",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <UserCheck size={18} />
              Admin Login
            </Link>

            <p style={{ color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", lineHeight: 1.7, fontWeight: 300 }}>
              Your trusted partner for all HVAC and air conditioning needs.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} className="limra-social-icon">
                  <s.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={colVariants}>
            <p className="limra-footer-heading">Services</p>
            {servicesLoading ? (
              <p className="limra-footer-link">Loading services...</p>
            ) : servicesError ? (
              <p className="limra-footer-link" style={{ color: "#ff4757" }}>Failed to load services</p>
            ) : (
              <ul>
                {services?.map((s: any) => (
                  <li key={s._id || s.id} style={{ marginBottom: "6px" }}>
                    <Link
                      to={`/service/${s.slug}`}
                      className="limra-footer-link"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          {/* Projects */}
          <motion.div variants={colVariants}>
            <p className="limra-footer-heading">Projects</p>
            {projectsLoading ? (
              <p className="limra-footer-link">Loading projects...</p>
            ) : projectsError ? (
              <p className="limra-footer-link" style={{ color: "#ff4757" }}>Failed to load projects</p>
            ) : (
              <ul>
                {projects?.map((p: any) => (
                  <li key={p._id || p.id} style={{ marginBottom: "6px" }}>
                    <Link
                      to="/case-studies"
                      className="limra-footer-link"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          {/* Contact */}
          <motion.div variants={colVariants}>
            <p className="limra-footer-heading">Get In Touch</p>
            <ul style={{ marginBottom: 20 }}>
              <li style={{ display: "flex", gap: 10, marginBottom: "8px", alignItems: "flex-start" }}>
                <Phone size={14} style={{ marginTop: 3, flexShrink: 0 }} />
                <a href="tel:+919839171701" className="limra-footer-link">
                  +91 9839171701
                </a>
              </li>
              <li style={{ display: "flex", gap: 10, marginBottom: "8px", alignItems: "flex-start" }}>
                <Mail size={14} style={{ marginTop: 3, flexShrink: 0 }} />
                <a href="mailto:info@limrasales.com" className="limra-footer-link">
                  info@limrasales.com
                </a>
              </li>
              <li style={{ display: "flex", gap: 10, marginBottom: "8px", alignItems: "flex-start" }}>
                <MapPin size={14} style={{ marginTop: 3, flexShrink: 0 }} />
                <a
                  href="https://maps.google.com/?q=Civil+Lines,+Bareilly,+UP+243001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="limra-footer-link"
                >
                  Civil Lines, Bareilly, UP 243001
                </a>
              </li>
            </ul>

            <p className="limra-footer-heading">Quick Links</p>
            <ul>
              {quickLinks.map((l) => (
                <li key={l.label} style={{ marginBottom: "6px" }}>
                  <Link to={l.to} className="limra-footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          background: "#020D1A",
          padding: "16px 20px",
          fontSize: 12,
          color: "rgba(255,255,255,0.55)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          textAlign: "center",
          flexWrap: "wrap",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
        }}
      >
        <span>
          © {new Date().getFullYear()} LIMRA Sales &amp; Services | Designed by
        </span>

        <a
          href="https://www.codecrafter.co.in/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img src={cclogo} alt="CodeCrafter" style={{ width: 90 }} />
        </a>
      </div>
    </motion.footer>
  </>
  );
};

export default SiteFooter;