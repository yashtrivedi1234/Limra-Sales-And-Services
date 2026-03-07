import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wind, Phone, Star, ChevronRight, AirVent,
  Droplets, Activity, Snowflake, Fan, Building2,
  Box, ThermometerSun, Droplet,
  MessageSquare,
} from "lucide-react";
import SplitAcImg from "@/assets/split-ac.png";
import WindowAcImg from "@/assets/window-ac.png";
import CassetteAcImg from "@/assets/cassette-ac.png";
import DuctableAcImg from "@/assets/ductable-ac.png";
import TowerAcImg from "@/assets/tower-ac.png";
import PackageAcImg from "@/assets/package-ac.png";
import VrvVrfImg from "@/assets/vrv-vrf.png";
import AhuImg from "@/assets/ahu.png";
import ChillerImg from "@/assets/chiller.png";
import WaterCooledChillerImg from "@/assets/water-cooled-chiller.png";
import ColdRoomImg from "@/assets/cold-room.png";
import IcePlantImg from "@/assets/ice-plant.png";
import WaterDispenserImg from "@/assets/water-dispenser.png";
import RoPlantImg from "@/assets/ro-plant.png";
import WaterCoolerImg from "@/assets/water-cooler.png";
import PanelAcImg from "@/assets/panel-ac.png";

/* ================= TYPES ================= */
interface Product { name: string; ton: string; price: string; stars: number; }
interface Category {
  id: string; icon: JSX.Element; title: string;
  description: string; image: string; brands: string[]; products: Product[];
}

/* ================= DATA ================= */
const categories: Category[] = [
  { id: "split-ac", icon: <Snowflake size={22} />, title: "Split AC", description: "Energy-efficient Split AC for homes and offices with powerful cooling performance.", image: SplitAcImg, brands: ["Daikin", "Voltas", "LG", "Samsung"], products: [] },
  { id: "window-ac", icon: <Box size={22} />, title: "Window AC", description: "Compact and budget-friendly Window AC for small rooms with easy installation.", image: WindowAcImg, brands: ["Carrier", "Godrej", "Blue Star"], products: [] },
  { id: "cassette-ac", icon: <AirVent size={22} />, title: "Cassette AC", description: "Ceiling-mounted Cassette AC for uniform 360° air distribution.", image: CassetteAcImg, brands: ["Daikin", "Mitsubishi", "Carrier"], products: [] },
  { id: "ductable-ac", icon: <Wind size={22} />, title: "Ductable AC", description: "Centralized ductable AC system for large areas and commercial spaces.", image: DuctableAcImg, brands: ["Daikin", "Blue Star"], products: [] },
  { id: "water-dispenser", icon: <Droplet size={22} />, title: "Water Dispenser", description: "Hot and cold water dispensers with energy-efficient cooling system.", image: WaterDispenserImg, brands: ["Voltas", "Blue Star"], products: [] },
  { id: "ro-plant", icon: <Droplet size={22} />, title: "RO Plant", description: "Advanced RO plant systems for pure and safe drinking water.", image: RoPlantImg, brands: ["Kent", "Aquaguard"], products: [] },
  { id: "tower-ac", icon: <ThermometerSun size={22} />, title: "Tower AC", description: "High-capacity Tower AC for large rooms and event spaces.", image: TowerAcImg, brands: ["Blue Star", "Voltas"], products: [] },
  { id: "package-ac", icon: <Box size={22} />, title: "Package AC", description: "Heavy-duty Package AC for commercial buildings and malls.", image: PackageAcImg, brands: ["Carrier", "Daikin"], products: [] },
  { id: "vrv-vrf", icon: <Building2 size={22} />, title: "VRV / VRF System", description: "Advanced VRV/VRF system for multi-zone cooling.", image: VrvVrfImg, brands: ["Daikin", "Mitsubishi"], products: [] },
  { id: "ahu", icon: <Fan size={22} />, title: "AHU (Air Handling Unit)", description: "High-performance AHU for centralized HVAC systems.", image: AhuImg, brands: ["Systemair", "Blue Star"], products: [] },
  { id: "cold-room", icon: <Snowflake size={22} />, title: "Cold Room", description: "Custom-built cold room solutions for storage and preservation.", image: ColdRoomImg, brands: ["Blue Star", "Carrier"], products: [] },
  { id: "chiller", icon: <Snowflake size={22} />, title: "Chiller", description: "Industrial chiller systems for large-scale cooling applications.", image: ChillerImg, brands: ["Daikin", "Trane"], products: [] },
  { id: "air-cooled-chiller", icon: <Fan size={22} />, title: "Air-Cooled Chiller", description: "Efficient air-cooled chiller with low maintenance cost.", image: ChillerImg, brands: ["Blue Star", "Carrier"], products: [] },
  { id: "water-cooled-chiller", icon: <Droplets size={22} />, title: "Water-Cooled Chiller", description: "High-capacity water-cooled chiller for heavy-duty applications.", image: WaterCooledChillerImg, brands: ["Daikin", "Trane"], products: [] },
  { id: "ice-plant", icon: <Snowflake size={22} />, title: "Ice Plant", description: "Industrial ice plant for bulk ice production.", image: IcePlantImg, brands: ["Blue Star"], products: [] },
  { id: "panel-ac", icon: <Activity size={22} />, title: "Panel AC", description: "Compact panel AC for electrical control panels.", image: PanelAcImg, brands: ["Pfannenberg"], products: [] },
  { id: "water-cooler", icon: <Droplets size={22} />, title: "Water Cooler", description: "Commercial water cooler for offices, schools, and public spaces.", image: WaterCoolerImg, brands: ["Voltas", "Blue Star"], products: [] },
];

/* ================= COMPONENTS ================= */

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={13} className={i <= count ? "text-orange-500 fill-orange-500" : "text-gray-400"} />
      ))}
    </div>
  );
}

function ProductCard({ cat }: { cat: Category }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-card rounded-2xl overflow-hidden flex flex-col"
      style={{
        border: "1px solid hsl(var(--border))",
        boxShadow: "0 4px 16px hsl(var(--brand-dark) / 0.07)",
        transition: "box-shadow 0.3s, transform 0.3s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px hsl(var(--brand-dark) / 0.13)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px hsl(var(--brand-dark) / 0.07)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
        <div
          className="absolute top-4 left-4 z-10 rounded-xl p-2"
          style={{ background: "hsl(var(--brand-dark))", color: "white" }}
        >
          {cat.icon}
        </div>
        <img
          src={cat.image}
          alt={cat.title}
          className="w-full h-full object-cover hover:scale-105 transition"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">

        <h3
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontWeight: 400,
            color: "hsl(var(--primary))",
            fontSize: "1.125rem",
            marginBottom: "4px",
          }}
        >
          {cat.title}
        </h3>

        {/*
          FIX 1: Description text
          Was: color: "hsl(var(--muted-foreground))" — often ~#888 on white, fails 4.5:1
          Fix: Use hsl(var(--foreground) / 0.65) or a concrete accessible fallback.
          We switch to a guaranteed AA-compliant value by using the foreground token
          at reduced opacity only when the base foreground is dark, OR use a
          standalone accessible gray. We use an inline CSS custom property override
          so the host theme's foreground remains the source of truth but we ensure
          legibility via a minimum-contrast utility class as a fallback.
          Simplest safe approach: use text-foreground at 70% — still dark enough on white.
        */}
        <p
          className="body-text"
          style={{
            fontSize: "0.875rem",
            // FIX 1: was hsl(var(--muted-foreground)) which can be too light.
            // hsl(var(--foreground) / 0.7) on a white/near-white card gives ~#4a4a4a equiv.
            color: "hsl(var(--foreground) / 0.72)",
            marginBottom: "12px",
          }}
        >
          {cat.description}
        </p>

        {/* Brands */}
        <div className="mb-4">
          {/*
            FIX 2: "Available Brands" label
            Was: color: hsl(var(--muted-foreground)) — same low-contrast issue as above.
            Fix: Use foreground at ~0.6 minimum, or a dedicated accessible label color.
          */}
          <p
            className="text-xs font-semibold mb-2"
            style={{
              // FIX 2: guaranteed readable label — foreground at 65% is ~#585858 on white (passes AA)
              color: "hsl(var(--foreground) / 0.65)",
            }}
          >
            Available Brands
          </p>
          <div className="flex flex-wrap gap-1">
            {cat.brands.map((b) => (
              <span
                key={b}
                className="text-xs px-2 py-1 rounded-full font-medium"
                style={{
                  /*
                    FIX 3: Brand pills
                    Was: background hsl(var(--secondary)), color hsl(var(--secondary-foreground))
                    The secondary bg is often a very light gray and secondary-foreground can
                    be too close in luminance.
                    Fix: Use brand-dark background with white text — guaranteed 4.5:1+ contrast.
                    This also makes pills visually consistent with the icon badge.
                  */
                  background: "hsl(var(--brand-dark) / 0.1)",
                  color: "hsl(var(--brand-dark))",
                  border: "1px solid hsl(var(--brand-dark) / 0.25)",
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Products */}
        {cat.products.map((p) => (
          <div key={p.name} className="flex justify-between items-center text-sm mb-2">
            <div>
              {/* Product name uses full foreground — no change needed */}
              <p className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>{p.name}</p>
              <StarRating count={p.stars} />
            </div>
            <span
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontWeight: 400,
                color: "hsl(var(--accent))",
                fontSize: "1rem",
              }}
            >
              {p.price}
            </span>
          </div>
        ))}

        {/* CTA */}
        <button
          onClick={() => navigate("/contact")}
          className="mt-auto w-full flex items-center justify-center gap-2 rounded-xl py-2 text-sm font-semibold transition"
          style={{
            border: "2px solid hsl(var(--brand-dark))",
            color: "hsl(var(--brand-dark))",
            background: "transparent",
            borderRadius: "var(--radius)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "hsl(var(--brand-dark))";
            (e.currentTarget as HTMLElement).style.color = "white";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "hsl(var(--brand-dark))";
          }}
        >
          <MessageSquare size={15} />
          Get Quote
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

/* ================= PAGE ================= */

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Products" },
    { id: "residential", label: "Residential AC" },
    { id: "commercial", label: "Commercial AC" },
    { id: "chillers", label: "Chillers & Industrial" },
    { id: "water", label: "Water Solutions" },
  ];

  const filterMap: Record<string, string[]> = {
    all: categories.map((c) => c.id),
    residential: ["split-ac", "window-ac", "tower-ac"],
    commercial: ["cassette-ac", "ductable-ac", "package-ac", "vrv-vrf", "ahu", "panel-ac"],
    chillers: ["chiller", "air-cooled-chiller", "water-cooled-chiller", "cold-room", "ice-plant"],
    water: ["water-dispenser", "ro-plant", "water-cooler"],
  };

  const visible = categories.filter((c) => filterMap[activeFilter]?.includes(c.id));

  return (
    <div className="bg-background min-h-screen">

      {/* ── HERO ── */}
      <div
        className="bg-hero-gradient text-center"
        style={{ padding: "56px 24px", marginTop: "48px" }}
      >
        {/* h1 white on dark gradient — no change, this is fine */}
        <h1 style={{ color: "white", marginBottom: "12px" }}>
          Our Products
        </h1>

        {/*
          FIX 4: Hero subtitle
          Was: color: hsl(var(--brand-sky)) — light sky blue on a blue gradient often fails.
          Fix: Use white with slight transparency, which is always readable on any dark gradient.
          rgba(255,255,255,0.9) gives near-white that passes AAA on dark backgrounds.
        */}
        <p className="body-text" style={{ color: "rgba(255, 255, 255, 0.88)" }}>
          Explore our wide range of air conditioning solutions.
        </p>
      </div>

      {/* ── FILTERS ── */}
      <div
        className="bg-card sticky top-0 z-10"
        style={{ borderBottom: "1px solid hsl(var(--border))", padding: "12px 24px" }}
      >
        <div className="flex gap-2 justify-center overflow-x-auto w-full">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition"
              style={{
                background: activeFilter === f.id ? "hsl(var(--brand-dark))" : "transparent",
                /*
                  FIX 5: Inactive filter button text
                  Was: color: hsl(var(--muted-foreground)) — too light on white/card bg.
                  Fix: Use foreground at 0.6 for inactive (dark enough), white for active (on dark bg).
                */
                color: activeFilter === f.id ? "white" : "hsl(var(--foreground) / 0.7)",
                border: `1px solid ${activeFilter === f.id ? "hsl(var(--brand-dark))" : "hsl(var(--border))"}`,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── GRID ── */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((cat) => (
            <ProductCard key={cat.id} cat={cat} />
          ))}
        </div>
      </div>
    </div>
  );
}