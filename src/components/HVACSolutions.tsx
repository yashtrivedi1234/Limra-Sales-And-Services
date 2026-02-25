import { Phone, Wind, Droplets, ThermometerSun, AirVent, Building2, Home } from "lucide-react";

const COLORS = {
  navy: "#0B1F4B",
  blue: "#1D4ED8",
  blueLight: "#3B82F6",
  blueSky: "#DBEAFE",
  bluePale: "#EFF6FF",
  white: "#FFFFFF",
  slate100: "#E8EFFF",
  slate200: "#C7D8F8",
  slate400: "#6B8AC7",
  slate600: "#3A5A9C",
};

const residentialItems = [
  { icon: <Wind size={16} />, label: "Split ACs (1-5 Ton)" },
  { icon: <Wind size={16} />, label: "Window ACs" },
  { icon: <Wind size={16} />, label: "Portable ACs" },
  { icon: <Droplets size={16} />, label: "Water Coolers & Dispensers" },
  { icon: <Wind size={16} />, label: "Air Purifiers & Water Softeners" },
];

const commercialItems = [
  { icon: <Building2 size={16} />, label: "Daikin VRV Systems" },
  { icon: <Wind size={16} />, label: "Cassette & Ductable ACs" },
  { icon: <ThermometerSun size={16} />, label: "Chillers & Heat Pumps" },
  { icon: <Building2 size={16} />, label: "Floor Standing ACs" },
  { icon: <AirVent size={16} />, label: "Ventilation Systems" },
];

function SolutionCard({ title, items, primaryBtnLabel, imageUrl, badgeIcon }) {
  return (
    <div style={{
      background: COLORS.white, borderRadius: "20px",
      border: `1px solid ${COLORS.slate100}`, overflow: "hidden",
      display: "flex", flexDirection: "column",
      boxShadow: "0 2px 16px rgba(29,78,216,0.08)",
      transition: "all 0.3s"
    }}>
      {/* Image */}
      <div style={{ position: "relative", width: "100%", height: "200px", overflow: "hidden" }}>
        <img
          src={imageUrl} alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(11,31,75,0.1), rgba(11,31,75,0.45))" }} />
        {/* Badge icon */}
        <div style={{
          position: "absolute", top: 12, left: 12, width: "38px", height: "38px",
          background: COLORS.white, borderRadius: "10px",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(29,78,216,0.15)"
        }}>
          {badgeIcon}
        </div>
        {/* Blue top border */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "4px",
          background: `linear-gradient(90deg, ${COLORS.navy}, ${COLORS.blueLight})`
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: "28px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: COLORS.navy, marginBottom: "20px" }}>{title}</h3>
        <ul style={{ flex: 1, marginBottom: "24px", display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0 }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", color: COLORS.slate600, fontSize: "0.88rem" }}>
              <span style={{ color: COLORS.blue }}>{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            background: COLORS.navy, color: COLORS.white, fontWeight: 600,
            padding: "12px 16px", borderRadius: "10px", border: "none",
            cursor: "pointer", fontSize: "0.88rem", transition: "background 0.2s"
          }}>
            <Phone size={15} /> {primaryBtnLabel}
          </button>
          <button style={{
            flex: 1, background: COLORS.bluePale, color: COLORS.blue, fontWeight: 600,
            padding: "12px 16px", borderRadius: "10px",
            border: `1px solid ${COLORS.slate200}`, cursor: "pointer",
            fontSize: "0.88rem", transition: "background 0.2s"
          }}>
            View Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HVACSolutions() {
  return (
    <section style={{ padding: "100px 0", background: COLORS.white, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(29,78,216,0.1)", border: "1px solid rgba(29,78,216,0.25)",
            color: "#1D4ED8", fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "5px 14px", borderRadius: "100px", marginBottom: "18px"
          }}>
            Solutions
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)", color: COLORS.navy, lineHeight: 1.15, marginBottom: "12px"
          }}>
            Complete HVAC Solutions
          </h2>
          <p style={{ color: COLORS.slate400, fontSize: "1.05rem" }}>
            From residential comfort to large commercial projects, we've got you covered.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
          <SolutionCard
            title="Residential Solutions"
            items={residentialItems}
            primaryBtnLabel="Get Home Quote"
            imageUrl="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80"
            badgeIcon={<Home size={18} style={{ color: COLORS.blue }} />}
          />
          <SolutionCard
            title="Commercial & VRV Systems"
            items={commercialItems}
            primaryBtnLabel="Get Commercial Quote"
            imageUrl="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80"
            badgeIcon={<Building2 size={18} style={{ color: COLORS.blue }} />}
          />
        </div>
      </div>
    </section>
  );
}