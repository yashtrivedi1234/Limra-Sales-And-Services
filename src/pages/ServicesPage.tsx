import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Wrench, ShieldCheck, MapPin, Settings2, Wind,
  Clock, Star, Sparkles, ArrowUpRight, TrendingUp, Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetServicesQuery } from "@/store/api";
import Loader from "@/components/ui/Loader";
import CTASection from "@/components/CTASection";

interface Service {
  slug: string; _id?: string; icon: string; title: string;
  tagline: string; desc: string; badge?: string; badgeColor?: string;
  accentHue?: string; rating?: string; reviews?: string;
  duration?: string; price: string; features?: string[]; highlights?: string[];
}

const iconMap: Record<string, React.ElementType> = { ShieldCheck, MapPin, Settings2, Wind, Wrench };
const renderIcon = (name: string): React.ElementType => iconMap[name] ?? Wrench;

const STATS = [
  { num: "5000+", label: "Projects Successfully Delivered", icon: <TrendingUp size={14} style={{ color: "hsl(var(--primary))" }} /> },
  { num: "4.8/5", label: "Customer Satisfaction Rating", icon: <Star size={14} fill="#d97706" color="#d97706" /> },
  { num: "24–48", label: "Hrs Service Response Time", icon: <Clock size={14} style={{ color: "hsl(var(--primary))" }} /> },
  { num: "6", label: "Services Offered", icon: <Award size={14} style={{ color: "hsl(var(--primary))" }} /> },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function ServiceCard({ service, onClick, index, isHovered, onHover }: {
  service: Service; onClick: (slug: string) => void; index: number;
  isHovered: boolean; onHover: (slug: string | null) => void;
}) {
  const Icon = renderIcon(service.icon);
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onHoverStart={() => onHover(service.slug)}
      onHoverEnd={() => onHover(null)}
      onClick={() => onClick(service.slug)}
      className="group relative flex flex-col rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 bg-card"
      style={{
        border: `1px solid ${isHovered ? "hsl(var(--brand-sky))" : "hsl(var(--primary) / 0.12)"}`,
        boxShadow: isHovered
          ? "0 20px 48px hsl(var(--primary) / 0.12), 0 4px 12px hsl(var(--primary) / 0.06)"
          : "0 2px 8px hsl(var(--primary) / 0.05)",
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 inset-x-0 h-[3px] transition-opacity duration-300"
        style={{
          background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--brand-sky)))",
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div className="p-7 flex flex-col flex-1">

        {/* h2 — override to DM Serif for editorial card title feel */}
        <h2
          style={{
            fontFamily: "DM Serif Display",
            fontWeight: 400,
            color: "hsl(var(--primary))",
            fontSize: "1.3rem",
            lineHeight: 1.3,
            marginBottom: "12px",
          }}
        >
          {service.title}
        </h2>

        {/* body-text class: Inter, base/lg, leading-relaxed */}
        <p
          className="body-text"
          style={{ fontSize: "0.86rem", color: "hsl(var(--foreground) / 0.55)", marginBottom: "20px" }}
        >
          {service.desc}
        </p>

        <div className="flex-1" />

        {/* Footer row */}
        <div
          className="flex items-center justify-between pt-5 mt-auto"
          style={{ borderTop: "1px solid hsl(var(--border))" }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); navigate("/contact"); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[0.75rem] font-bold tracking-wide transition-all duration-200"
            style={{
              background: isHovered ? "hsl(var(--primary))" : "transparent",
              color: isHovered ? "white" : "hsl(var(--primary))",
              border: "1.5px solid hsl(var(--primary))",
              cursor: "pointer",
            }}
          >
            Enquiry Now <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function ServicesPage(): React.ReactElement {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const navigate = useNavigate();
  const { data: apiServices = [], isLoading } = useGetServicesQuery();
  const services: Service[] = [...apiServices].reverse();

  if (isLoading) return <Loader />;

  return (
    <div className="relative min-h-screen bg-background">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden bg-hero-gradient"
        style={{ padding: "80px 0 64px" }}
      >
        {/* dot pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10 max-w-[1180px] mx-auto px-6 text-center">




          {/* h1 — global: DM Serif Display, 400, brand-dark. Override color white + sky for hero */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ color: "white", marginBottom: "20px" }}
          >
            Complete HVAC Solutions<br />
            <span style={{ color: "hsl(var(--brand-sky))" }}>Designed for Performance</span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2, duration: 0.4 }}
            className="w-12 h-[3px] mx-auto rounded-full mb-5"
            style={{ background: "hsl(var(--brand-sky))", opacity: 0.6 }}
          />

          {/* body-text */}
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="body-text max-w-[680px] mx-auto mb-10"
            style={{ color: "hsl(var(--brand-sky) / 0.8)" }}
          >
            From installation and commissioning to preventive maintenance and emergency repairs —
            we deliver certified expertise, transparent pricing, and dependable service you can trust.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-6 py-4 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
            }}
          >
            {STATS.map((s, i) => (
              <React.Fragment key={s.num}>
                {i > 0 && (
                  <div className="w-px h-6 hidden sm:block" style={{ background: "rgba(255,255,255,0.15)" }} />
                )}
                <div className="flex items-center gap-3">
                  {s.icon}
                  <div className="flex flex-col leading-tight">
                    {/* Stat number — DM Serif for editorial weight, white */}
                    <span
                      style={{
                        fontFamily: "'DM Serif Display', Georgia, serif",
                        fontWeight: 400,
                        fontSize: "1.2rem",
                        color: "white",
                      }}
                    >
                      {s.num}
                    </span>
                    {/* Stat label — body text, muted */}
                    <span
                      className="text-[0.75rem]"
                      style={{ color: "hsl(var(--brand-sky) / 0.7)" }}
                    >
                      {s.label}
                    </span>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <div className="relative z-10 max-w-[1180px] mx-auto px-6 py-5">
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}
        >
          {services.map((service, i) => (
            <ServiceCard
              key={service.slug || service._id}
              service={service}
              onClick={() => navigate("/contact")}
              index={i}
              isHovered={hoveredSlug === service.slug}
              onHover={setHoveredSlug}
            />
          ))}
        </div>

        <CTASection />
      </div>
    </div>
  );
}