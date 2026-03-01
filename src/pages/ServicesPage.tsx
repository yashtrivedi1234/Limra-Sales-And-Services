import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench, ShieldCheck, MapPin, Settings2, Wind,
  Clock, Star, Sparkles, ArrowUpRight, CheckCircle2, TrendingUp, Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetServicesQuery } from "@/store/api";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Service {
  slug: string;
  _id?: string;
  icon: string;
  title: string;
  tagline: string;
  desc: string;
  badge?: string;
  badgeColor?: string;
  accentHue?: string;
  rating?: string;
  reviews?: string;
  duration?: string;
  price: string;
  features?: string[];
  highlights?: string[];
}

interface ServiceCardProps {
  service: Service;
  onClick: (slug: string) => void;
  index: number;
  isHovered: boolean;
  onHover: (slug: string | null) => void;
}

interface StatItem {
  num: string;
  label: string;
  icon?: React.ReactNode;
}

// ─── ICON MAP ─────────────────────────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  MapPin,
  Settings2,
  Wind,
  Wrench,
};

const renderIcon = (name: string): React.ElementType =>
  iconMap[name] ?? Wrench;

// ─── CARD COMPONENT ───────────────────────────────────────────────────────────
const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onClick,
  index,
  isHovered,
  onHover,
}) => {
  const Icon = renderIcon(service.icon);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.075,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
      onHoverStart={() => onHover(service.slug)}
      onHoverEnd={() => onHover(null)}
      onClick={() => onClick(service.slug)}
      className="group relative flex flex-col rounded-2xl cursor-pointer overflow-hidden border transition-all duration-300"
      style={{
        background: "rgb(215 242 255 / 58%)",
        borderColor: isHovered
          ? "rgba(6,149,205,0.30)"
          : "rgba(6,149,205,0.13)",
        boxShadow: isHovered
          ? "0 20px 48px rgba(6,149,205,0.13), 0 4px 12px rgba(6,149,205,0.08)"
          : "0 2px 8px rgba(6,149,205,0.06), 0 1px 2px rgba(6,149,205,0.04)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Top accent strip */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] transition-opacity duration-300"
        style={{
          background: "linear-gradient(90deg, transparent, #0695CD, transparent)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Corner glow */}
      <div
        className="absolute -top-12 -right-12 w-36 h-36 rounded-full transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6,149,205,0.18) 0%, transparent 70%)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div className="p-7 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          {/* Icon */}
          <div
            className="flex items-center justify-center w-12 h-12 rounded-[14px] border transition-all duration-300"
            style={{
              background: isHovered
                ? "rgba(6,149,205,0.15)"
                : "rgba(6,149,205,0.08)",
              borderColor: isHovered
                ? "rgba(6,149,205,0.35)"
                : "rgba(6,149,205,0.18)",
            }}
          >
            <Icon size={20} color="#0695CD" />
          </div>

          {/* Badge */}
          <span
            className="text-[0.65rem] font-bold tracking-[0.11em] uppercase px-3 py-1.5 rounded-full border"
            style={{
              color: service.badgeColor ?? "#d97706",
              borderColor: `${service.badgeColor ?? "#d97706"}35`,
              background: `${service.badgeColor ?? "#d97706"}12`,
            }}
          >
            {service.badge ?? "Standard"}
          </span>
        </div>

        {/* Title & tagline */}
        <p
          className="text-[0.7rem] font-bold uppercase tracking-[0.12em] mb-1"
          style={{ color: "#0695CD" }}
        >
          {service.tagline}
        </p>
        <h2
          className="text-[1.35rem] font-semibold leading-snug mb-3"
          style={{
            color: "#082A45",
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          {service.title}
        </h2>
        <p
          className="text-[0.865rem] leading-relaxed mb-5"
          style={{ color: "rgba(8,42,69,0.52)" }}
        >
          {service.desc}
        </p>

        {/* Feature pills */}
        {(service.features || service.highlights) && (
          <ul className="flex flex-wrap gap-2 mb-6">
            {(service.features || service.highlights || []).map((f) => (
              <li
                key={f}
                className="flex items-center gap-1.5 text-[0.72rem] font-medium px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(6,149,205,0.09)",
                  color: "#0E3D5E",
                  border: "1px solid rgba(6,149,205,0.15)",
                }}
              >
                <CheckCircle2 size={10} color="#0695CD" />
                {f}
              </li>
            ))}
          </ul>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-5 mt-auto"
          style={{ borderTop: "1px solid rgba(6,149,205,0.12)" }}
        >
          <div className="flex items-center gap-3.5">
            <span className="flex items-center gap-1 text-[0.78rem]" style={{ color: "rgba(8,42,69,0.5)" }}>
              <Clock size={12} color="#0695CD" />
              {service.duration ?? "2 hrs"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span
              className="text-[1rem] font-semibold"
              style={{
                color: "#082A45",
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontWeight: 400,
              }}
            >
              {service.price}
            </span>
            <motion.div
              animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-250"
              style={{
                background: isHovered ? "#0695CD" : "rgba(6,149,205,0.1)",
                border: `1px solid ${isHovered ? "#0695CD" : "rgba(6,149,205,0.22)"}`,
              }}
            >
              <ArrowUpRight size={14} color={isHovered ? "#fff" : "#0695CD"} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// ─── STATS BAR ────────────────────────────────────────────────────────────────
const STATS: StatItem[] = [
  { num: "10,000+", label: "Jobs completed", icon: <TrendingUp size={13} color="#0695CD" /> },
  { num: "4.85", label: "Average rating", icon: <Star size={13} fill="#d97706" color="#d97706" /> },
  { num: "48 hrs", label: "Avg. response", icon: <Clock size={13} color="#0695CD" /> },
  { num: "6", label: "Services offered", icon: <Award size={13} color="#0695CD" /> },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ServicesPage(): React.ReactElement {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const navigate = useNavigate();

  const { data: apiServices = [], isLoading } = useGetServicesQuery();
  const services: Service[] = apiServices;

  const handleSelect = (slug: string): void => {
    navigate(`/service/${slug}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: "#F0F9FF" }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 rounded-full border-2 border-transparent"
          style={{ borderTopColor: "#0695CD" }}
        />
      </div>
    );
  }

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div
        className="relative min-h-screen overflow-x-hidden"
        style={{ background: "linear-gradient(160deg, #EBF7FF 0%, #F7FCFF 50%, #EEF8FF 100%)" }}
      >
        {/* Grid texture */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,149,205,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(6,149,205,0.045) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Radial glow */}
        <div
          className="fixed pointer-events-none z-0"
          style={{
            top: "-180px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "860px",
            height: "560px",
            background:
              "radial-gradient(ellipse at center, rgba(6,149,205,0.12) 0%, transparent 68%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-[1180px] mx-auto px-6 pb-28">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* ── HERO ── */}
            <header className="pt-20 pb-16 text-center">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[0.68rem] font-bold tracking-[0.14em] uppercase mb-7"
                style={{
                  background: "rgb(215 242 255 / 58%)",
                  border: "1px solid rgba(6,149,205,0.22)",
                  color: "#0695CD",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Sparkles size={11} />
                Premium AC Services
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.06] tracking-tight mb-5"
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontWeight: 400,
                  color: "#082A45",
                }}
              >
                Every Service
                <br />
                <em className="italic" style={{ color: "#0695CD" }}>
                  You Need
                </em>
              </motion.h1>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.22, duration: 0.4 }}
                className="w-12 h-[3px] mx-auto rounded-full mb-6"
                style={{ background: "#0695CD", opacity: 0.55 }}
              />

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-[1rem] leading-[1.8] max-w-[440px] mx-auto"
                style={{ color: "rgba(8,42,69,0.52)", fontWeight: 400 }}
              >
                From day-one installation to year-round maintenance — certified technicians, transparent pricing.
              </motion.p>

              {/* Stats bar */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34 }}
                className="inline-flex flex-wrap items-center justify-center gap-6 mt-10 px-8 py-4 rounded-full"
                style={{
                  background: "rgb(215 242 255 / 58%)",
                  border: "1px solid rgba(6,149,205,0.16)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 2px 12px rgba(6,149,205,0.07)",
                }}
              >
                {STATS.map((s, i) => (
                  <React.Fragment key={s.num}>
                    {i > 0 && (
                      <div
                        className="hidden sm:block w-px h-6"
                        style={{ background: "rgba(6,149,205,0.15)" }}
                      />
                    )}
                    <div className="flex items-center gap-2 text-[0.82rem] whitespace-nowrap">
                      {s.icon}
                      <span
                        className="text-[1.1rem]"
                        style={{
                          fontFamily: "'DM Serif Display', Georgia, serif",
                          color: "#082A45",
                          fontWeight: 400,
                        }}
                      >
                        {s.num}
                      </span>
                      <span style={{ color: "rgba(8,42,69,0.48)" }}>{s.label}</span>
                    </div>
                  </React.Fragment>
                ))}
              </motion.div>
            </header>

            {/* ── SERVICES GRID ── */}
            <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
              {services.map((service, i) => (
                <ServiceCard
                  key={service.slug || service._id}
                  service={service}
                  onClick={handleSelect}
                  index={i}
                  isHovered={hoveredSlug === service.slug}
                  onHover={setHoveredSlug}
                />
              ))}
            </div>

            {/* ── BOTTOM CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-16 text-center"
            >
              <p
                className="text-[0.85rem] mb-4"
                style={{ color: "rgba(8,42,69,0.45)" }}
              >
                Not sure which service you need?
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[0.88rem] font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{
                  background: "#0695CD",
                  color: "#ffffff",
                  boxShadow: "0 4px 16px rgba(6,149,205,0.35)",
                }}
              >
                <Sparkles size={15} />
                Get a Free Consultation
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}