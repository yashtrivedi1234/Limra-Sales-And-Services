import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Thermometer,
  Wind,
  Zap,
  Phone,
  Star,
  ChevronRight,
  AirVent,
  Move,
  Droplets,
  Activity,
  Snowflake,
  Fan,
  Building2,
  Box,
  ThermometerSun,
  Droplet,
} from "lucide-react";

/* ================= TYPES ================= */

interface Product {
  name: string;
  ton: string;
  price: string;
  stars: number;
}

interface Category {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
  image: string;
  brands: string[];
  products: Product[];
}

/* ================= DATA ================= */

const categories: Category[] = [
  {
    id: "split-ac",
    icon: <Snowflake size={22} />,
    title: "Split AC",
    description:
      "Energy-efficient Split AC for homes and offices with powerful cooling performance.",
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
    brands: ["Daikin", "Voltas", "LG", "Samsung"],
    products: [],
  },
  {
    id: "window-ac",
    icon: <Box size={22} />,
    title: "Window AC",
    description:
      "Compact and budget-friendly Window AC for small rooms with easy installation.",
    image:
      "https://images.unsplash.com/photo-1613690399151-65ea69478674?w=600&q=80",
    brands: ["Carrier", "Godrej", "Blue Star"],
    products: [],
  },
  {
    id: "cassette-ac",
    icon: <AirVent size={22} />,
    title: "Cassette AC",
    description:
      "Ceiling-mounted Cassette AC for uniform 360° air distribution.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    brands: ["Daikin", "Mitsubishi", "Carrier"],
    products: [],
  },
  {
    id: "ductable-ac",
    icon: <Wind size={22} />,
    title: "Ductable AC",
    description:
      "Centralized ductable AC system for large areas and commercial spaces.",
    image:
      "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?w=600&q=80",
    brands: ["Daikin", "Blue Star"],
    products: [],
  },
  {
    id: "water-dispenser",
    icon: <Droplet size={22} />,
    title: "Water Dispenser",
    description:
      "Hot and cold water dispensers with energy-efficient cooling system.",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80",
    brands: ["Voltas", "Blue Star"],
    products: [],
  },
  {
    id: "ro-plant",
    icon: <Droplet size={22} />,
    title: "RO Plant",
    description:
      "Advanced RO plant systems for pure and safe drinking water.",
    image:
      "https://images.unsplash.com/photo-1581092334394-3c5a1d4d3f53?w=600&q=80",
    brands: ["Kent", "Aquaguard"],
    products: [],
  },
  {
    id: "tower-ac",
    icon: <ThermometerSun size={22} />,
    title: "Tower AC",
    description:
      "High-capacity Tower AC for large rooms and event spaces.",
    image:
      "https://images.unsplash.com/photo-1592431913827-7f2c7a2f9d73?w=600&q=80",
    brands: ["Blue Star", "Voltas"],
    products: [],
  },
  {
    id: "package-ac",
    icon: <Box size={22} />,
    title: "Package AC",
    description:
      "Heavy-duty Package AC for commercial buildings and malls.",
    image:
      "https://images.unsplash.com/photo-1581093458791-9d5c0b9d3b2b?w=600&q=80",
    brands: ["Carrier", "Daikin"],
    products: [],
  },
  {
    id: "vrv-vrf",
    icon: <Building2 size={22} />,
    title: "VRV / VRF System",
    description:
      "Advanced VRV/VRF system for multi-zone cooling.",
    image:
      "https://images.unsplash.com/photo-1529429617124-ae2b5c6cbbd1?w=600&q=80",
    brands: ["Daikin", "Mitsubishi"],
    products: [],
  },
  {
    id: "ahu",
    icon: <Fan size={22} />,
    title: "AHU (Air Handling Unit)",
    description:
      "High-performance AHU for centralized HVAC systems.",
    image:
      "https://images.unsplash.com/photo-1581091012184-7c3a5d6e1c4f?w=600&q=80",
    brands: ["Systemair", "Blue Star"],
    products: [],
  },
  {
    id: "cold-room",
    icon: <Snowflake size={22} />,
    title: "Cold Room",
    description:
      "Custom-built cold room solutions for storage and preservation.",
    image:
      "https://images.unsplash.com/photo-1581091870627-3c6a9f3a9d9c?w=600&q=80",
    brands: ["Blue Star", "Carrier"],
    products: [],
  },
  {
    id: "chiller",
    icon: <Snowflake size={22} />,
    title: "Chiller",
    description:
      "Industrial chiller systems for large-scale cooling applications.",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80",
    brands: ["Daikin", "Trane"],
    products: [],
  },
  {
    id: "air-cooled-chiller",
    icon: <Fan size={22} />,
    title: "Air-Cooled Chiller",
    description:
      "Efficient air-cooled chiller with low maintenance cost.",
    image:
      "https://images.unsplash.com/photo-1581093588401-22f4b8c7c2f6?w=600&q=80",
    brands: ["Blue Star", "Carrier"],
    products: [],
  },
  {
    id: "water-cooled-chiller",
    icon: <Droplets size={22} />,
    title: "Water-Cooled Chiller",
    description:
      "High-capacity water-cooled chiller for heavy-duty applications.",
    image:
      "https://images.unsplash.com/photo-1581092334651-6d0e3e5e6d1c?w=600&q=80",
    brands: ["Daikin", "Trane"],
    products: [],
  },
  {
    id: "ice-plant",
    icon: <Snowflake size={22} />,
    title: "Ice Plant",
    description:
      "Industrial ice plant for bulk ice production.",
    image:
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80",
    brands: ["Blue Star"],
    products: [],
  },
  {
    id: "panel-ac",
    icon: <Activity size={22} />,
    title: "Panel AC",
    description:
      "Compact panel AC for electrical control panels.",
    image:
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&q=80",
    brands: ["Pfannenberg"],
    products: [],
  },
  {
    id: "water-cooler",
    icon: <Droplets size={22} />,
    title: "Water Cooler",
    description:
      "Commercial water cooler for offices, schools, and public spaces.",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80",
    brands: ["Voltas", "Blue Star"],
    products: [],
  },
];

/* ================= COMPONENTS ================= */

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={13}
          className={
            i <= count ? "text-orange-400 fill-orange-400" : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}

function ProductCard({ cat }: { cat: Category }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col border">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <div className="absolute top-4 left-4 z-10 bg-[#1a3a5c] text-white rounded-xl p-2">
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
          style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
          className="text-[#1a3a5c] text-lg mb-1"
        >
          {cat.title}
        </h3>
        <p className="text-slate-500 text-sm mb-3">{cat.description}</p>

        {/* Brands */}
        <div className="mb-4">
          <p className="text-xs text-slate-400 font-semibold mb-2">
            Available Brands
          </p>
          <div className="flex flex-wrap gap-1">
            {cat.brands.map((b) => (
              <span
                key={b}
                className="text-xs bg-slate-100 px-2 py-1 rounded-full"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Products */}
        {cat.products.map((p) => (
          <div
            key={p.name}
            className="flex justify-between items-center text-sm mb-2"
          >
            <div>
              <p className="font-semibold">{p.name}</p>
              <StarRating count={p.stars} />
            </div>
            <span
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
              className="text-[#e07830] text-base"
            >
              {p.price}
            </span>
          </div>
        ))}

        {/* CTA */}
        <button
          onClick={() => navigate("/contact")}
          className="mt-auto w-full flex items-center justify-center gap-2 border-2 border-[#1a3a5c] text-[#1a3a5c] rounded-xl py-2 text-sm font-semibold hover:bg-[#1a3a5c] hover:text-white transition"
        >
          <Phone size={15} />
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
    { id: "all", label: "All" },
    { id: "split", label: "Split" },
    { id: "cassette", label: "Cassette" },
    { id: "window", label: "Window" },
    { id: "portable", label: "Portable" },
  ];

  const filterMap: Record<string, string[]> = {
    all: categories.map((c) => c.id),
    split: ["inverter-split"],
    cassette: ["cassette"],
    window: ["window"],
    portable: ["portable"],
  };

  const visible = categories.filter((c) =>
    filterMap[activeFilter]?.includes(c.id)
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=DM+Serif+Display:ital,wght@0,400;1,400&display=swap');
      `}</style>
      <div className="bg-[#f5f7fa] min-h-screen">
        {/* HERO */}
        <div className="bg-[#1a3a5c] text-white py-14 px-6 text-center mt-12">
          <h1
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            className="text-4xl mb-3"
          >
            Our Products
          </h1>
          <p className="text-white/70">
            Explore our wide range of air conditioning solutions.
          </p>
        </div>

        {/* FILTERS */}
        <div className="bg-white sticky top-0 z-10 border-b px-6 py-3 flex gap-2 justify-center overflow-x-auto w-full">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-full text-sm border font-medium whitespace-nowrap ${activeFilter === f.id
                  ? "bg-[#1a3a5c] text-white border-[#1a3a5c]"
                  : "text-slate-600 bg-white hover:bg-slate-50 border-slate-200"
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((cat) => (
              <ProductCard key={cat.id} cat={cat} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}