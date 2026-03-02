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
  { num: "10,000+", label: "Jobs completed", icon: <TrendingUp size={14} color={BRAND.primary} /> },
  { num: "4.85", label: "Average rating", icon: <Star size={14} fill="#d97706" color="#d97706" /> },
  { num: "48 hrs", label: "Avg. response", icon: <Clock size={14} color={BRAND.primary} /> },
  { num: "6", label: "Services offered", icon: <Award size={14} color={BRAND.primary} /> },
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
          <div className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300"
            style={{
              background: isHovered ? `${BRAND.primary}18` : BRAND.primaryPale,
              border: `1px solid ${isHovered ? `${BRAND.primary}40` : BRAND.slate100}`,
            }}
          >
            <Icon size={22} color={BRAND.primary} />
          </div>
          {service.badge && (
            <span className="text-[0.62rem] font-bold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full"
              style={{
                color: BRAND.primary,
                background: BRAND.primaryPale,
                border: `1px solid ${BRAND.slate100}`,
              }}
            >
              {service.badge}
            </span>
          )}
        </div>

        <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] mb-1" style={{ color: BRAND.primary }}>{service.tagline}</p>
        <h2 className="text-[1.3rem] leading-snug mb-3" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, color: BRAND.dark }}>{service.title}</h2>
        <p className="text-[0.86rem] leading-relaxed mb-5" style={{ color: `${BRAND.dark}85` }}>{service.desc}</p>

        {(service.features || service.highlights) && (
          <ul className="flex flex-wrap gap-2 mb-5">
            {(service.features || service.highlights || []).slice(0, 4).map((f) => (
              <li key={f} className="flex items-center gap-1.5 text-[0.7rem] font-medium px-2.5 py-1 rounded-full"
                style={{ background: BRAND.primaryPale, color: BRAND.darkMid, border: `1px solid ${BRAND.slate100}` }}
              >
                <CheckCircle2 size={10} color={BRAND.primary} />{f}
              </li>
            ))}
          </ul>
        )}

        <div className="flex-1" />

        <div className="flex items-center justify-between pt-5 mt-auto" style={{ borderTop: `1px solid ${BRAND.slate100}` }}>
          <div className="flex items-center gap-1.5 text-[0.78rem]" style={{ color: `${BRAND.dark}70` }}>
            <Clock size={12} color={BRAND.primary} />
            {service.duration ?? "2 hrs"}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[1rem]" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, color: BRAND.dark }}>{service.price}</span>
            <motion.div animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200"
              style={{
                background: isHovered ? BRAND.primary : BRAND.primaryPale,
                border: `1px solid ${isHovered ? BRAND.primary : BRAND.slate100}`,
              }}
            >
              <ArrowUpRight size={14} color={isHovered ? BRAND.white : BRAND.primary} />
            </motion.div>
          </div>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[0.68rem] font-bold tracking-[0.14em] uppercase mb-6"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: BRAND.accentOnDark }}>
              <Sparkles size={12} /> Premium AC Services
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.08] tracking-tight mb-5"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, color: BRAND.white }}>
            Every Service<br />
            <em className="italic" style={{ color: BRAND.accentOnDark }}>You Need</em>
          </motion.h1>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2, duration: 0.4 }}
            className="w-12 h-[3px] mx-auto rounded-full mb-5" style={{ background: BRAND.accentOnDark, opacity: 0.6 }} />

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="text-[1rem] leading-[1.8] max-w-[480px] mx-auto mb-10" style={{ color: BRAND.textOnDark }}>
            From day-one installation to year-round maintenance — certified technicians, transparent pricing.
          </motion.p>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="inline-flex flex-wrap items-center justify-center gap-6 px-8 py-4 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}>
            {STATS.map((s, i) => (
              <React.Fragment key={s.num}>
                {i > 0 && <div className="hidden sm:block w-px h-6" style={{ background: "rgba(255,255,255,0.15)" }} />}
                <div className="flex items-center gap-2 text-[0.82rem] whitespace-nowrap">
                  {s.icon}
                  <span className="text-[1.1rem]" style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: BRAND.white, fontWeight: 400 }}>{s.num}</span>
                  <span style={{ color: BRAND.textOnDarkMuted }}>{s.label}</span>
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
            <ServiceCard key={service.slug || service._id} service={service} onClick={(slug) => navigate(`/service/${slug}`)}
              index={i} isHovered={hoveredSlug === service.slug} onHover={setHoveredSlug} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }} className="mt-16 text-center">
          <p className="text-[0.88rem] mb-5" style={{ color: `${BRAND.dark}70` }}>Not sure which service you need?</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[0.88rem] font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: `linear-gradient(135deg, ${BRAND.dark}, ${BRAND.primary})`, color: BRAND.white, boxShadow: `0 6px 20px ${BRAND.primary}40` }}>
              <Sparkles size={15} /> Get Free Consultation
            </button>
            <a href="tel:+919236477974"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[0.88rem] font-semibold transition-all duration-200 hover:opacity-90 no-underline"
              style={{ background: BRAND.white, color: BRAND.dark, border: `1px solid ${BRAND.slate100}`, boxShadow: `0 2px 8px rgba(6,149,205,0.08)` }}>
              <Phone size={15} color={BRAND.primary} /> Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
