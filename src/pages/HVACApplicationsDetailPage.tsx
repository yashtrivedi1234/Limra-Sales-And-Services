// ─── ApplicationDetailPage.tsx ────────────────────────────────────────────────
import { motion } from "framer-motion";
import { Hotel, Cross, GraduationCap, Dumbbell, Scissors, Briefcase, ShoppingBag, BarChart2, ArrowLeft, Thermometer, Wind, Zap, Shield, CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { BRAND } from "@/lib/colors";

// ─── Application Data ──────────────────────────────────────────────────────────
const applicationData: Record<string, {
    icon: React.ReactNode;
    label: string;
    color: string;
    heroDesc: string;
    cards: { icon: React.ReactNode; title: string; desc: string }[];
    features: string[];
}> = {
    "hotels-restaurants": {
        icon: <Hotel size={36} strokeWidth={1.5} />,
        label: "Hotels & Restaurants",
        color: "#F59E0B",
        heroDesc: "Premium climate control solutions for hospitality environments that demand comfort, efficiency, and guest satisfaction 24/7.",
        cards: [
            { icon: <Thermometer size={24} strokeWidth={1.5} />, title: "Guest Room Comfort", desc: "Individually controlled HVAC units for every guest room ensuring personalized temperature comfort round the clock." },
            { icon: <Wind size={24} strokeWidth={1.5} />, title: "Banquet & Event Halls", desc: "High-capacity air handling for large gatherings with precise humidity and temperature regulation." },
            { icon: <Zap size={24} strokeWidth={1.5} />, title: "Kitchen Ventilation", desc: "Heavy-duty exhaust and makeup air systems designed for commercial kitchen environments." },
            { icon: <Shield size={24} strokeWidth={1.5} />, title: "Lobby & Common Areas", desc: "Central air distribution systems that maintain uniform comfort across lobbies, corridors, and lounges." },
        ],
        features: ["24/7 operational reliability", "Energy-efficient inverter technology", "Silent operation < 28dB", "Smart BMS integration"],
    },
    "hospitals-clinics": {
        icon: <Cross size={36} strokeWidth={1.5} />,
        label: "Hospitals & Clinics",
        color: "#EF4444",
        heroDesc: "Medical-grade HVAC systems ensuring sterile environments, infection control, and critical care compliance.",
        cards: [
            { icon: <Shield size={24} strokeWidth={1.5} />, title: "OT & ICU Pressurization", desc: "Positive/negative pressure rooms with HEPA filtration for operation theatres and intensive care units." },
            { icon: <Wind size={24} strokeWidth={1.5} />, title: "Air Purification", desc: "HEPA + UV-C based air purification systems eliminating 99.97% of airborne pathogens." },
            { icon: <Thermometer size={24} strokeWidth={1.5} />, title: "Pharmacy Cold Rooms", desc: "Precision temperature-controlled storage environments for sensitive medical supplies and vaccines." },
            { icon: <Zap size={24} strokeWidth={1.5} />, title: "Isolation Wards", desc: "Negative pressure isolation rooms with dedicated air handling to prevent cross-contamination." },
        ],
        features: ["NABH compliance ready", "99.97% HEPA filtration", "Redundant system design", "Continuous air quality monitoring"],
    },
    "schools-colleges": {
        icon: <GraduationCap size={36} strokeWidth={1.5} />,
        label: "Schools & Colleges",
        color: "#3B82F6",
        heroDesc: "Healthy and comfortable learning environments that enhance student focus and academic performance.",
        cards: [
            { icon: <Wind size={24} strokeWidth={1.5} />, title: "Classrooms", desc: "Fresh air ventilation with CO₂ monitoring to maintain optimal oxygen levels for active learning environments." },
            { icon: <Thermometer size={24} strokeWidth={1.5} />, title: "Auditoriums & Halls", desc: "Large-volume air conditioning for assembly halls, auditoriums, and examination centres." },
            { icon: <Shield size={24} strokeWidth={1.5} />, title: "Libraries", desc: "Humidity-controlled environments protecting books and providing quiet, comfortable study spaces." },
            { icon: <Zap size={24} strokeWidth={1.5} />, title: "Labs & Workshops", desc: "Specialized ventilation for chemistry labs, computer labs, and vocational workshops with fume extraction." },
        ],
        features: ["Low noise for quiet zones", "CO₂ & air quality sensors", "Energy-star rated units", "Scheduled operation timers"],
    },
    "gyms-fitness": {
        icon: <Dumbbell size={36} strokeWidth={1.5} />,
        label: "Gyms & Fitness Centers",
        color: "#10B981",
        heroDesc: "High-performance ventilation and cooling systems built for high-occupancy, high-intensity fitness environments.",
        cards: [
            { icon: <Wind size={24} strokeWidth={1.5} />, title: "Workout Floors", desc: "High-volume fresh air supply with powerful air circulation to handle sweat, odour, and CO₂ buildup." },
            { icon: <Thermometer size={24} strokeWidth={1.5} />, title: "Locker Rooms", desc: "Humidity extraction and dehumidification systems for changing rooms and shower areas." },
            { icon: <Shield size={24} strokeWidth={1.5} />, title: "Swimming Pools", desc: "Natatorium dehumidification systems preventing structural damage and maintaining swimmer comfort." },
            { icon: <Zap size={24} strokeWidth={1.5} />, title: "Yoga & Studios", desc: "Precise temperature control for hot yoga, pilates, and specialised fitness studio environments." },
        ],
        features: ["High air exchange rates", "Dehumidification built-in", "Odour elimination filters", "Corrosion-resistant units"],
    },
    "salons-spas": {
        icon: <Scissors size={36} strokeWidth={1.5} />,
        label: "Salons & Spas",
        color: "#EC4899",
        heroDesc: "Luxurious climate solutions that create the perfect ambience for relaxation and wellness experiences.",
        cards: [
            { icon: <Thermometer size={24} strokeWidth={1.5} />, title: "Treatment Rooms", desc: "Whisper-quiet precision cooling for massage, facial, and body treatment private rooms." },
            { icon: <Wind size={24} strokeWidth={1.5} />, title: "Chemical Fume Control", desc: "Dedicated exhaust systems removing salon chemicals, dyes, and nail care fumes safely." },
            { icon: <Shield size={24} strokeWidth={1.5} />, title: "Steam & Sauna Areas", desc: "Moisture management systems controlling humidity in steam rooms and sauna areas." },
            { icon: <Zap size={24} strokeWidth={1.5} />, title: "Reception & Retail", desc: "Elegant concealed ducting maintaining a luxurious aesthetic in customer-facing spaces." },
        ],
        features: ["Silent operation < 25dB", "Aromatherapy-compatible", "Concealed installation", "Individual zone control"],
    },
    "offices-it-parks": {
        icon: <Briefcase size={36} strokeWidth={1.5} />,
        label: "Offices & IT Parks",
        color: "#6366F1",
        heroDesc: "Smart HVAC systems for modern workplaces maximizing employee productivity and energy savings.",
        cards: [
            { icon: <Wind size={24} strokeWidth={1.5} />, title: "Open Plan Offices", desc: "VAV systems with smart zoning adapting to occupancy patterns across large open workspaces." },
            { icon: <Thermometer size={24} strokeWidth={1.5} />, title: "Server Rooms & Data Centers", desc: "Precision cooling with N+1 redundancy maintaining critical temperature and humidity for servers." },
            { icon: <Zap size={24} strokeWidth={1.5} />, title: "Conference Rooms", desc: "Rapid cooling systems with occupancy sensors automatically adjusting to meeting room usage." },
            { icon: <Shield size={24} strokeWidth={1.5} />, title: "Building Automation", desc: "Full BMS integration with IoT dashboards for real-time energy monitoring and predictive maintenance." },
        ],
        features: ["BMS & IoT integration", "LEED certification support", "Demand-controlled ventilation", "Predictive maintenance alerts"],
    },
    "retail-stores": {
        icon: <ShoppingBag size={36} strokeWidth={1.5} />,
        label: "Retail Stores",
        color: "#F97316",
        heroDesc: "Inviting retail climates that keep shoppers comfortable longer, driving dwell time and purchase decisions.",
        cards: [
            { icon: <Thermometer size={24} strokeWidth={1.5} />, title: "Showroom Floors", desc: "Uniform temperature distribution across large retail floors eliminating hot and cold spots." },
            { icon: <Wind size={24} strokeWidth={1.5} />, title: "Storage & Back-of-House", desc: "Climate control for stock rooms protecting inventory from humidity and temperature fluctuations." },
            { icon: <Shield size={24} strokeWidth={1.5} />, title: "Food Courts & Cafes", desc: "Integrated ventilation and exhaust solutions for food service areas within retail complexes." },
            { icon: <Zap size={24} strokeWidth={1.5} />, title: "Mall Common Areas", desc: "Central plant solutions for shopping malls with efficient chiller and AHU configurations." },
        ],
        features: ["High foot-traffic rated", "Energy metering per zone", "Rapid temperature recovery", "Low maintenance design"],
    },
    "industrial-buildings": {
        icon: <BarChart2 size={36} strokeWidth={1.5} />,
        label: "Industrial Buildings",
        color: "#14B8A6",
        heroDesc: "Robust industrial ventilation and process cooling solutions for manufacturing and warehouse environments.",
        cards: [
            { icon: <Wind size={24} strokeWidth={1.5} />, title: "Factory Floors", desc: "High-volume evaporative or mechanical cooling for large manufacturing and assembly areas." },
            { icon: <Thermometer size={24} strokeWidth={1.5} />, title: "Warehouses & Cold Storage", desc: "Industrial refrigeration and climate control maintaining product quality in storage facilities." },
            { icon: <Zap size={24} strokeWidth={1.5} />, title: "Process Cooling", desc: "Precision process chillers and cooling towers for manufacturing equipment and industrial processes." },
            { icon: <Shield size={24} strokeWidth={1.5} />, title: "Hazardous Area Ventilation", desc: "ATEX-rated ventilation systems for paint booths, chemical plants, and explosive atmosphere zones." },
        ],
        features: ["ATEX-rated options", "Corrosion-resistant builds", "High ambient operation", "Remote monitoring ready"],
    },
};

// ─── Slug Map ──────────────────────────────────────────────────────────────────
const slugMap: Record<string, string> = {
    "Hotels & Restaurants": "hotels-restaurants",
    "Hospitals & Clinics": "hospitals-clinics",
    "Schools & Colleges": "schools-colleges",
    "Gyms & Fitness Centers": "gyms-fitness",
    "Salons & Spas": "salons-spas",
    "Offices & IT Parks": "offices-it-parks",
    "Retail Stores": "retail-stores",
    "Industrial Buildings": "industrial-buildings",
};

export function getApplicationSlug(label: string): string {
    return slugMap[label] ?? label.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// ─── Page Component ────────────────────────────────────────────────────────────
export function HVACApplicationsDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    if (!slug) {
        return (
            <div style={{ minHeight: "100vh", background: BRAND.white, fontFamily: "'DM Sans', sans-serif" }}>
                {/* Header Section */}
                <div style={{ background: "#1a3a5c", padding: "80px clamp(24px, 5vw, 48px) 64px", textAlign: "center", color: "#fff" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: BRAND.accentOnDark || "#60A5FA", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 16px", borderRadius: "100px", marginBottom: "18px", marginTop: "64px"}}>
                                Industries & Applications
                            </div>
                            <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", lineHeight: 1.1, marginBottom: "16px" }}>
                                Commercial HVAC Solutions
                            </h1>
                            <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "600px", margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.7 }}>
                                Explore how we provide specialized climate control and ventilation systems across diverse commercial and industrial sectors.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Listing Grid */}
                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px clamp(24px, 5vw, 48px)" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
                        {Object.entries(applicationData).map(([key, item], i) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.5 }}
                                whileHover={{ y: -8, boxShadow: `0 20px 48px ${item.color}20` }}
                                onClick={() => navigate(`/hvac-applications/${key}`)}
                                style={{
                                    background: BRAND.white,
                                    borderRadius: "24px",
                                    padding: "32px",
                                    border: `1px solid ${BRAND.slate100}`,
                                    cursor: "pointer",
                                    transition: "all 0.3s",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                    boxShadow: `0 4px 20px rgba(0,0,0,0.04)`
                                }}
                            >
                                <div style={{
                                    width: "64px", height: "64px", borderRadius: "18px",
                                    background: `${item.color}15`, color: item.color,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    marginBottom: "20px"
                                }}>
                                    {item.icon}
                                </div>
                                <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.25rem", color: BRAND.dark, marginBottom: "12px" }}>
                                    {item.label}
                                </h3>
                                <p style={{ fontSize: "0.88rem", color: BRAND.slate600, lineHeight: 1.6, marginBottom: "20px" }}>
                                    {item.heroDesc.split(".")[0]}.
                                </p>
                                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "6px", color: item.color, fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                    View Details <ArrowRight size={14} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const data = applicationData[slug ?? ""];

    if (!data) {
        return (
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
                <div style={{ textAlign: "center" }}>
                    <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "2rem", color: BRAND.dark }}>Application not found</h2>
                    <button onClick={() => navigate("/hvac-applications")} style={{ marginTop: "16px", padding: "10px 24px", borderRadius: "100px", border: "none", background: BRAND.primary, color: "#fff", cursor: "pointer", fontWeight: 600 }}>
                        View All Applications
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", background: BRAND.white, fontFamily: "'DM Sans', sans-serif" }}>
            {/* ── Hero Section ── */}
            <div style={{ background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${data.color}33 100%)`, padding: "64px clamp(24px, 5vw, 48px) 56px", position: "relative", overflow: "hidden" }}>
                {/* decorative circle */}
                <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: `${data.color}18`, pointerEvents: "none" }} />
                <div style={{ maxWidth: "1200px", margin: "0 auto" , marginTop: "30px"}}>
                    

                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "72px", height: "72px", borderRadius: "20px", background: `${data.color}22`, border: `1.5px solid ${data.color}55`, color: data.color, marginBottom: "20px" }}>
                            {data.icon}
                        </div>
                        <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 5vw, 3.4rem)", color: "#fff", lineHeight: 1.15, marginBottom: "16px" }}>
                            {data.label}
                        </h1>
                        <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.72)", maxWidth: "560px", lineHeight: 1.7 }}>
                            {data.heroDesc}
                        </p>
                    </motion.div>

                    {/* Feature Pills */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "32px" }}>
                        {data.features.map((f, i) => (
                            <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "100px", padding: "6px 14px", fontSize: "0.78rem", color: "#fff", fontWeight: 500, backdropFilter: "blur(6px)" }}>
                                <CheckCircle2 size={12} style={{ color: data.color }} /> {f}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* ── Cards Grid ── */}
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px clamp(24px, 5vw, 48px)" }}>
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "40px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: `${data.color}1A`, border: `1px solid ${data.color}40`, color: data.color, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "100px", marginBottom: "14px" }}>
                        Our Solutions
                    </div>
                    <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: BRAND.dark }}>
                        Tailored for {data.label}
                    </h2>
                </motion.div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
                    {data.cards.map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            whileHover={{ y: -6, boxShadow: `0 16px 40px ${data.color}20` }}
                            style={{
                                background: BRAND.primaryPale,
                                borderRadius: "20px",
                                padding: "28px 24px",
                                border: `1px solid ${BRAND.slate100}`,
                                transition: "all 0.25s",
                            }}
                        >
                            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "14px", background: `${data.color}18`, color: data.color, marginBottom: "16px" }}>
                                {card.icon}
                            </div>
                            <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "1.1rem", color: BRAND.dark, marginBottom: "10px", lineHeight: 1.3 }}>
                                {card.title}
                            </h3>
                            <p style={{ fontSize: "0.85rem", color: BRAND.slate600, lineHeight: 1.7, margin: 0 }}>
                                {card.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HVACApplicationsDetailPage;