// ─── ApplicationDetailPage.tsx ────────────────────────────────────────────────
import { motion } from "framer-motion";
import { Hotel, Cross, GraduationCap, Dumbbell, Scissors, Briefcase, ShoppingBag, BarChart2, ArrowLeft, Thermometer, Wind, Zap, Shield, CheckCircle2, ArrowRight, Server, Warehouse } from "lucide-react";
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
    "hospitals-clinics": {
        icon: <Cross size={36} strokeWidth={1.5} />,
        label: "Healthcare HVAC Solutions",
        color: "#EF4444",
        heroDesc: "Hospitals and healthcare facilities require highly controlled indoor environments to maintain hygiene, infection control, and patient comfort. Our HVAC systems are designed to maintain precise temperature, humidity control, and air filtration standards required for medical environments.",
        cards: [
            { icon: <Shield size={24} strokeWidth={1.5} />, title: "Hospitals & Medical Colleges", desc: "Specialized HVAC installations ensuring continuous fresh air circulation, HEPA filtration compatibility, and reliable performance for critical healthcare operations." },
            { icon: <Wind size={24} strokeWidth={1.5} />, title: "Clinics & Diagnostic Labs", desc: "Precision-controlled environments for diagnostic centers with strict temperature and humidity regulation to protect sensitive equipment and samples." },
            { icon: <Thermometer size={24} strokeWidth={1.5} />, title: "Operation Theatres", desc: "Positive/negative pressure rooms with HEPA filtration ensuring sterile conditions for operation theatres and surgical suites." },
            { icon: <Zap size={24} strokeWidth={1.5} />, title: "ICUs & Patient Rooms", desc: "Negative pressure isolation rooms with dedicated air handling and continuous fresh air supply to prevent cross-contamination in ICUs and patient wards." },
        ],
        features: ["NABH compliance ready", "99.97% HEPA filtration", "Redundant system design", "Continuous air quality monitoring"],
    },
    "hotels-restaurants": {
        icon: <Hotel size={36} strokeWidth={1.5} />,
        label: "Hospitality & Hotel HVAC Solutions",
        color: "#F59E0B",
        heroDesc: "Hotels, resorts, and hospitality venues require efficient climate control to provide guests with a comfortable and pleasant stay. Our HVAC systems are designed to maintain consistent cooling, quiet operation, and efficient ventilation across guest rooms, banquet halls, restaurants, and lobbies.",
        cards: [
            { icon: <Thermometer size={24} strokeWidth={1.5} />, title: "Hotels & Resorts", desc: "Individually controlled HVAC units for every guest room and resort space ensuring personalized temperature comfort and a premium guest experience round the clock." },
            { icon: <Wind size={24} strokeWidth={1.5} />, title: "Banquet Halls", desc: "High-capacity air handling for large gatherings with precise humidity and temperature regulation to keep events comfortable regardless of occupancy." },
            { icon: <Zap size={24} strokeWidth={1.5} />, title: "Restaurants & Cafes", desc: "Integrated ventilation and exhaust solutions for dining areas and commercial kitchens, balancing air quality with efficient energy usage." },
            { icon: <Shield size={24} strokeWidth={1.5} />, title: "Conference Halls", desc: "Smart climate systems for conference halls with occupancy-adaptive controls ensuring optimal comfort during events and meetings." },
        ],
        features: ["24/7 operational reliability", "Energy-efficient inverter technology", "Silent operation < 28dB", "Smart BMS integration"],
    },
    "offices-it-parks": {
        icon: <Briefcase size={36} strokeWidth={1.5} />,
        label: "Commercial Office HVAC Solutions",
        color: "#6366F1",
        heroDesc: "Modern office buildings require efficient HVAC systems to create productive and comfortable working environments. Our systems maintain consistent temperature, proper ventilation, and energy-efficient cooling across corporate offices, IT parks, and commercial complexes.",
        cards: [
            { icon: <Wind size={24} strokeWidth={1.5} />, title: "Corporate Offices", desc: "VAV systems with smart zoning adapting to occupancy patterns across large open workspaces, supporting employee productivity and comfort." },
            { icon: <Thermometer size={24} strokeWidth={1.5} />, title: "IT Parks", desc: "Precision cooling solutions for IT park campuses with demand-controlled ventilation and energy-efficient operation for large-scale deployments." },
            { icon: <Zap size={24} strokeWidth={1.5} />, title: "Co-working Spaces", desc: "Flexible zone-controlled systems for co-working environments, adjusting automatically to fluctuating occupancy throughout the day." },
            { icon: <Shield size={24} strokeWidth={1.5} />, title: "Commercial Complexes", desc: "Full BMS integration with IoT dashboards for real-time energy monitoring and predictive maintenance across multi-tenant commercial buildings." },
        ],
        features: ["BMS & IoT integration", "LEED certification support", "Demand-controlled ventilation", "Predictive maintenance alerts"],
    },
    "retail-stores": {
        icon: <ShoppingBag size={36} strokeWidth={1.5} />,
        label: "Retail & Mall HVAC Solutions",
        color: "#F97316",
        heroDesc: "Retail environments experience heavy footfall and require reliable cooling and ventilation systems. Our HVAC systems are designed to maintain a pleasant shopping experience by ensuring consistent temperature control and effective air circulation.",
        cards: [
            { icon: <Thermometer size={24} strokeWidth={1.5} />, title: "Shopping Malls", desc: "Central plant solutions for shopping malls with efficient chiller and AHU configurations, maintaining uniform comfort across large retail floors." },
            { icon: <Wind size={24} strokeWidth={1.5} />, title: "Retail Showrooms", desc: "Uniform temperature distribution eliminating hot and cold spots across showroom floors, enhancing the customer browsing experience." },
            { icon: <Shield size={24} strokeWidth={1.5} />, title: "Supermarkets", desc: "Integrated HVAC and refrigeration management for supermarkets, balancing comfort for shoppers while protecting perishable product displays." },
            { icon: <Zap size={24} strokeWidth={1.5} />, title: "Multiplex Cinemas", desc: "High-capacity air conditioning for multiplex theatres ensuring consistent comfort across varying audience sizes and occupancy schedules." },
        ],
        features: ["High foot-traffic rated", "Energy metering per zone", "Rapid temperature recovery", "Low maintenance design"],
    },
    "industrial-buildings": {
        icon: <BarChart2 size={36} strokeWidth={1.5} />,
        label: "Industrial & Manufacturing HVAC Solutions",
        color: "#14B8A6",
        heroDesc: "Industrial facilities require HVAC systems for temperature control, humidity regulation, and proper ventilation to maintain production quality and worker safety. Our HVAC solutions support factories, pharmaceutical units, and food processing plants with durable and high-capacity systems.",
        cards: [
            { icon: <Wind size={24} strokeWidth={1.5} />, title: "Manufacturing Plants", desc: "High-volume evaporative or mechanical cooling for large manufacturing and assembly areas, ensuring worker safety and production quality." },
            { icon: <Thermometer size={24} strokeWidth={1.5} />, title: "Pharmaceutical Facilities", desc: "Cleanroom-grade HVAC with strict temperature, humidity, and particulate control meeting GMP standards for pharmaceutical manufacturing." },
            { icon: <Zap size={24} strokeWidth={1.5} />, title: "Food Processing Units", desc: "Hygienic HVAC systems with corrosion-resistant construction maintaining precise conditions for food safety and processing compliance." },
            { icon: <Shield size={24} strokeWidth={1.5} />, title: "Electronics Manufacturing", desc: "ESD-safe, humidity-controlled environments for electronics manufacturing protecting sensitive components throughout the production process." },
        ],
        features: ["ATEX-rated options", "Corrosion-resistant builds", "High ambient operation", "Remote monitoring ready"],
    },
    "schools-colleges": {
        icon: <GraduationCap size={36} strokeWidth={1.5} />,
        label: "Educational Institution HVAC Solutions",
        color: "#3B82F6",
        heroDesc: "Educational institutions require comfortable indoor environments to support effective learning. Our HVAC systems ensure proper ventilation and temperature control for classrooms, lecture halls, libraries, and laboratories, designed for energy efficiency and long-term reliability.",
        cards: [
            { icon: <Wind size={24} strokeWidth={1.5} />, title: "Schools", desc: "Fresh air ventilation with CO₂ monitoring for school classrooms, maintaining optimal oxygen levels to support student focus and active learning." },
            { icon: <Thermometer size={24} strokeWidth={1.5} />, title: "Colleges", desc: "Large-volume air conditioning for college auditoriums, lecture halls, and examination centres with reliable year-round performance." },
            { icon: <Shield size={24} strokeWidth={1.5} />, title: "Universities", desc: "Campus-wide HVAC solutions with centralized BMS management covering libraries, research labs, and administrative buildings." },
            { icon: <Zap size={24} strokeWidth={1.5} />, title: "Training Institutes", desc: "Specialized ventilation for vocational workshops, computer labs, and training rooms with scheduled operation timers for efficient energy use." },
        ],
        features: ["Low noise for quiet zones", "CO₂ & air quality sensors", "Energy-star rated units", "Scheduled operation timers"],
    },
    "data-centers": {
        icon: <Server size={36} strokeWidth={1.5} />,
        label: "Data Center HVAC Solutions",
        color: "#8B5CF6",
        heroDesc: "Data centers require precision cooling systems to prevent overheating of servers and critical IT equipment. Our HVAC solutions provide reliable temperature control, humidity management, and uninterrupted cooling for IT infrastructure to ensure continuous server performance and data security.",
        cards: [
            { icon: <Thermometer size={24} strokeWidth={1.5} />, title: "Data Centers", desc: "Precision cooling with N+1 redundancy maintaining critical temperature and humidity levels across enterprise data center facilities." },
            { icon: <Shield size={24} strokeWidth={1.5} />, title: "Server Rooms", desc: "Compact precision air conditioning units for server rooms with hot/cold aisle containment strategies for maximum cooling efficiency." },
            { icon: <Wind size={24} strokeWidth={1.5} />, title: "Network Operation Centers", desc: "Continuous, redundant HVAC systems for NOCs ensuring uninterrupted cooling with automatic failover for mission-critical operations." },
            { icon: <Zap size={24} strokeWidth={1.5} />, title: "Humidity Management", desc: "Precision humidity control systems preventing static buildup and condensation that can damage sensitive IT hardware and storage systems." },
        ],
        features: ["N+1 redundancy design", "Precision ±0.5°C control", "24/7 monitoring & alerts", "Hot/cold aisle compatibility"],
    },
    "warehouses-cold-storage": {
        icon: <Warehouse size={36} strokeWidth={1.5} />,
        label: "Warehouse & Cold Storage HVAC Solutions",
        color: "#0EA5E9",
        heroDesc: "Warehouses and cold storage facilities require controlled environments to maintain product quality and prevent spoilage. Our HVAC systems help maintain consistent temperature and humidity levels for storage and logistics operations.",
        cards: [
            { icon: <Thermometer size={24} strokeWidth={1.5} />, title: "Cold Storage Units", desc: "Industrial refrigeration systems maintaining precise low-temperature environments for perishable goods, pharmaceuticals, and temperature-sensitive products." },
            { icon: <Wind size={24} strokeWidth={1.5} />, title: "Logistics Warehouses", desc: "Large-volume climate control for logistics hubs ensuring comfortable worker conditions and protecting stored inventory from humidity fluctuations." },
            { icon: <Shield size={24} strokeWidth={1.5} />, title: "Food Storage Facilities", desc: "HACCP-compliant refrigeration and HVAC systems for food storage, maintaining strict temperature and humidity standards for food safety." },
            { icon: <Zap size={24} strokeWidth={1.5} />, title: "Distribution Centers", desc: "Zoned climate control for distribution centers separating temperature requirements across different product storage and dispatch areas." },
        ],
        features: ["Wide temperature range", "Energy-efficient compressors", "Humidity precision control", "Remote temperature logging"],
    },
};

// ─── Slug Map ──────────────────────────────────────────────────────────────────
const slugMap: Record<string, string> = {
    "Healthcare HVAC Solutions": "hospitals-clinics",
    "Hospitality & Hotel HVAC Solutions": "hotels-restaurants",
    "Commercial Office HVAC Solutions": "offices-it-parks",
    "Retail & Mall HVAC Solutions": "retail-stores",
    "Industrial & Manufacturing HVAC Solutions": "industrial-buildings",
    "Educational Institution HVAC Solutions": "schools-colleges",
    "Data Center HVAC Solutions": "data-centers",
    "Warehouse & Cold Storage HVAC Solutions": "warehouses-cold-storage",
    // Legacy mappings
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