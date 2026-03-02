import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Wrench, ShieldCheck, MapPin, Settings2, Wind,
  Clock, Star, Sparkles, ArrowUpRight, CheckCircle2, TrendingUp, Award, Phone
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetServicesQuery } from "@/store/api";
import Loader from "@/components/ui/Loader";
import { BRAND } from "@/lib/colors";
import CTASection from "@/components/CTASection";

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

const iconMap: Record<string, React.ElementType> = { ShieldCheck, MapPin, Settings2, Wind, Wrench };
const renderIcon = (name: string): React.ElementType => iconMap[name] ?? Wrench;

const STATS = [
  { num: "5000+", label: "Projects Successfully Delivered", icon: <TrendingUp size={14} color={BRAND.primary} /> },
  { num: "4.8/5", label: "Customer Satisfaction Rating", icon: <Star size={14} fill="#d97706" color="#d97706" /> },
  { num: "24–48", label: "Hrs Service Response Time", icon: <Clock size={14} color={BRAND.primary} /> },
  { num: "6", label: "Services Offered", icon: <Award size={14} color={BRAND.primary} /> },
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
      className="group relative flex flex-col rounded-2xl cursor-pointer overflow-hidden transition-all duration-300"
      style={{
        background: BRAND.white,
        border: `1px solid ${isHovered ? BRAND.primarySky : "rgba(6,149,205,0.12)"}`,
        boxShadow: isHovered
          ? `0 20px 48px rgba(6,149,205,0.12), 0 4px 12px rgba(6,149,205,0.06)`
          : `0 2px 8px rgba(6,149,205,0.05)`,
      }}
    >
      {/* Top accent */}
      <div className="absolute top-0 inset-x-0 h-[3px] transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.primaryLight})`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-5">

        </div>


        <h2
          className="text-[1.3rem] leading-snug mb-3"
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontWeight: 400,
            color: BRAND.primary
          }}
        >
          {service.title}
        </h2>
        <p className="text-[0.86rem] leading-relaxed mb-5" style={{ color: `${BRAND.dark}85` }}>{service.desc}</p>

        <div className="flex-1" />

        <div className="flex items-center justify-between pt-5 mt-auto" style={{ borderTop: `1px solid ${BRAND.slate100}` }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/contact");
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[0.75rem] font-bold tracking-wide transition-all duration-200"
            style={{
              background: isHovered ? BRAND.primary : "transparent",
              color: isHovered ? BRAND.white : BRAND.primary,
              border: `1.5px solid ${BRAND.primary}`,
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
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: BRAND.bgSoft }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{
        background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.darkMid} 50%, ${BRAND.primary} 100%)`,
        padding: "80px 0 64px",
      }}>
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="relative z-10 max-w-[1180px] mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[0.68rem] font-bold tracking-[0.14em] uppercase mb-6 mt-6"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: BRAND.accentOnDark }}>
              <Sparkles size={12} /> PREMIUM HVAC & COOLING SERVICES
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.08] tracking-tight mb-5"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, color: BRAND.white }}>
            Complete HVAC Solutions<br />
            <em className="italic" style={{ color: BRAND.accentOnDark }}>Designed for Performance</em>
          </motion.h1>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2, duration: 0.4 }}
            className="w-12 h-[3px] mx-auto rounded-full mb-5" style={{ background: BRAND.accentOnDark, opacity: 0.6 }} />

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="text-[1rem] leading-[1.8] max-w-[680px] mx-auto mb-10" style={{ color: BRAND.textOnDark }}>
            From installation and commissioning to preventive maintenance and emergency repairs —
            we deliver certified expertise, transparent pricing, and dependable service you can trust.
          </motion.p>

          {/* Stats - no scroll, wraps on small screens */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-6  py-4 rounded-2xl"
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
                    <span
                      className="text-[1.2rem]"
                      style={{
                        fontFamily: "'DM Serif Display', Georgia, serif",
                        color: BRAND.white,
                        fontWeight: 400,
                      }}
                    >
                      {s.num}
                    </span>

                    <span
                      className="text-[0.75rem]"
                      style={{ color: BRAND.textOnDarkMuted }}
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

      {/* Services Grid */}
      <div className="relative z-10 max-w-[1180px] mx-auto px-6 py-16">
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
          {services.map((service, i) => (
            <ServiceCard
              key={service.slug || service._id}
              service={service}
              onClick={() => navigate("/contact")}
              index={i} isHovered={hoveredSlug === service.slug} onHover={setHoveredSlug} />
          ))}
        </div>

        {/* Bottom CTA */}
        <CTASection />
      </div>
    </div>
  );
}