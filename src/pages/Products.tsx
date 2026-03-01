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
    id: "inverter-split",
    icon: <Thermometer size={22} />,
    title: "Inverter Split Air Conditioners",
    description: "Energy-efficient inverter technology split ACs",
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
    brands: ["Daikin", "Carrier", "Midea", "Godrej"],
    products: [
      { name: "Daikin FTXS35K", ton: "1.5 Ton", price: "₹38,000", stars: 5 },
      { name: "Carrier Neo", ton: "1 Ton", price: "₹32,000", stars: 4 },
    ],
  },
  {
    id: "cassette",
    icon: <Wind size={22} />,
    title: "Cassette Air Conditioners",
    description: "Ceiling-mounted cassette ACs",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    brands: ["Daikin", "Carrier"],
    products: [
      { name: "Daikin FCVF50", ton: "2 Ton", price: "₹85,000", stars: 5 },
    ],
  },
  {
    id: "window",
    icon: <Zap size={22} />,
    title: "Window Air Conditioners",
    description: "Compact window ACs",
    image:
      "https://images.unsplash.com/photo-1613690399151-65ea69478674?w=600&q=80",
    brands: ["Carrier", "Godrej"],
    products: [
      { name: "Carrier Window", ton: "1.5 Ton", price: "₹18,000", stars: 4 },
    ],
  },
  {
    id: "floor-standing",
    icon: <AirVent size={22} />,
    title: "Floor Standing AC",
    description: "Powerful ACs for large spaces",
    image:
      "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?w=600&q=80",
    brands: ["Daikin"],
    products: [
      { name: "Daikin FVA100A", ton: "3 Ton", price: "₹1,25,000", stars: 5 },
    ],
  },
  {
    id: "portable",
    icon: <Move size={22} />,
    title: "Portable AC",
    description: "Mobile ACs",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
    brands: ["Cruise"],
    products: [
      { name: "Cruise Portable", ton: "1.5 Ton", price: "₹28,000", stars: 3 },
    ],
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