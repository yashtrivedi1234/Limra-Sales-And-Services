import { useState } from "react";
import {
  Thermometer,
  Wind,
  Zap,
  Phone,
  Star,
  ChevronRight,
  ArrowLeft,
  AirVent,
  Columns,
  Move,
  SquareStack,
  MonitorSpeaker,
} from "lucide-react";

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

const categories: Category[] = [
  {
    id: "inverter-split",
    icon: <Thermometer size={22} />,
    title: "Inverter Split Air Conditioners",
    description: "Energy-efficient inverter technology split ACs with variable speed",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
    brands: ["Daikin", "Mitsubishi Heavy", "Carrier", "Amstrad", "Midea", "Godrej"],
    products: [
      { name: "Daikin FTXS35K Inverter", ton: "1.5 Ton", price: "₹38,000", stars: 5 },
      { name: "Carrier Inverter Neo", ton: "1 Ton", price: "₹32,000", stars: 5 },
    ],
  },
  {
    id: "non-inverter-split",
    icon: <Thermometer size={22} />,
    title: "Non-Inverter Split Air Conditioners",
    description: "Fixed speed split ACs for consistent cooling performance",
    image: "https://images.unsplash.com/photo-1631545806609-aa1f62a2f5a1?w=600&q=80",
    brands: ["Daikin", "Mitsubishi Heavy", "Carrier", "Amstrad", "Midea", "Godrej"],
    products: [
      { name: "Carrier Estrella", ton: "1.5 Ton", price: "₹25,000", stars: 3 },
      { name: "Godrej Fixed Speed", ton: "1 Ton", price: "₹22,000", stars: 3 },
    ],
  },
  {
    id: "cassette",
    icon: <Wind size={22} />,
    title: "Cassette Air Conditioners",
    description: "Ceiling-mounted cassette ACs for uniform cooling",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    brands: ["Daikin", "Carrier", "Mitsubishi Heavy", "Cruise"],
    products: [
      { name: "Daikin FCVF50ARV16", ton: "2 Ton", price: "₹85,000", stars: 5 },
      { name: "Carrier Cassette 42KCC036", ton: "3 Ton", price: "₹95,000", stars: 3 },
    ],
  },
  {
    id: "floor-standing",
    icon: <AirVent size={22} />,
    title: "Floor Standing Air Conditioners",
    description: "Powerful floor-mounted ACs for large spaces",
    image: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?w=600&q=80",
    brands: ["Daikin", "Mitsubishi Heavy", "Carrier"],
    products: [
      { name: "Daikin FVA100A", ton: "3 Ton", price: "₹1,25,000", stars: 5 },
      { name: "Carrier Floor Mount 48", ton: "4 Ton", price: "₹1,40,000", stars: 4 },
    ],
  },
  {
    id: "window",
    icon: <Zap size={22} />,
    title: "Window Air Conditioners",
    description: "Compact window ACs perfect for smaller spaces",
    image: "https://images.unsplash.com/photo-1613690399151-65ea69478674?w=600&q=80",
    brands: ["Carrier", "Godrej", "Amstrad", "Cruise"],
    products: [
      { name: "Carrier Estrella Window", ton: "1.5 Ton", price: "₹18,000", stars: 4 },
      { name: "Godrej GWC 18", ton: "1.5 Ton", price: "₹16,000", stars: 3 },
    ],
  },
  {
    id: "portable",
    icon: <Move size={22} />,
    title: "Portable Air Conditioners",
    description: "Mobile ACs that can be moved anywhere",
    image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=80",
    brands: ["Cruise"],
    products: [
      { name: "Cruise Portable 1.5T", ton: "1.5 Ton", price: "₹28,000", stars: 3 },
    ],
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={13}
          className={i <= count ? "text-orange-400 fill-orange-400" : "text-gray-300 fill-gray-200"}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1">{count} Star</span>
    </div>
  );
}

function ProductCard({ cat }: { cat: Category }) {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-slate-100"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <div className="absolute top-4 left-4 z-10 bg-[#1a3a5c] text-white rounded-xl p-2.5 shadow-lg">
          {cat.icon}
        </div>
        <img
          src={cat.image}
          alt={cat.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-[#1a3a5c] font-bold text-lg mb-1.5 leading-snug"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {cat.title}
        </h3>
        <p className="text-slate-500 text-sm mb-4">{cat.description}</p>

        {/* Brands */}
        <div className="mb-4">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-2">Available Brands</p>
          <div className="flex flex-wrap gap-1.5">
            {cat.brands.map((b) => (
              <span
                key={b}
                className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        {cat.products.length > 0 && (
          <div className="mb-4 flex-1">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-2">Featured Products</p>
            <div className="space-y-2">
              {cat.products.map((p) => (
                <div
                  key={p.name}
                  className="bg-slate-50 rounded-xl px-3 py-2.5 flex items-center justify-between border border-slate-100 hover:border-[#e07830]/40 hover:bg-orange-50/30 transition-colors cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#1a3a5c]">{p.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-400">{p.ton}</span>
                      <StarRating count={p.stars} />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#e07830] whitespace-nowrap ml-2">{p.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <button className="mt-auto w-full flex items-center justify-center gap-2 border-2 border-[#1a3a5c] text-[#1a3a5c] rounded-xl py-2.5 text-sm font-semibold hover:bg-[#1a3a5c] hover:text-white transition-all duration-200 group">
          <Phone size={15} />
          Get Quote
          <ChevronRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
        </button>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Products" },
    { id: "split", label: "Split ACs" },
    { id: "cassette", label: "Cassette" },
    { id: "floor-standing", label: "Floor Standing" },
    { id: "window", label: "Window" },
    { id: "portable", label: "Portable" },
  ];

  const filterMap: Record<string, string[]> = {
    all: categories.map((c) => c.id),
    split: ["inverter-split", "non-inverter-split"],
    cassette: ["cassette"],
    "floor-standing": ["floor-standing"],
    window: ["window"],
    portable: ["portable"],
  };

  const visible = categories.filter((c) => filterMap[activeFilter]?.includes(c.id));

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f5f7fa", minHeight: "100vh" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,400&display=swap"
        rel="stylesheet"
      />

      {/* Hero Banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0d2744 0%, #1a3a5c 50%, #1e4976 100%)",
          minHeight: 280,
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -right-20 -top-20 rounded-full opacity-10"
          style={{ width: 400, height: 400, background: "radial-gradient(circle, #4a9fd4, transparent)" }}
        />
        <div
          className="absolute right-40 bottom-0 rounded-full opacity-5"
          style={{ width: 300, height: 300, background: "radial-gradient(circle, #fff, transparent)" }}
        />

        {/* Ghost AC icons */}
        <div className="absolute right-8 bottom-0 flex gap-4 items-end opacity-10">
          {[100, 80, 120, 90, 110].map((h, i) => (
            <div key={i} className="bg-white rounded-lg" style={{ width: 60, height: h }} />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-14">
          <button className="flex items-center gap-1 text-white/60 text-sm mb-4 hover:text-white transition-colors">
            <ArrowLeft size={14} />
            Back
          </button>
          <h1
            className="text-5xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Our Products
          </h1>
          <p className="text-white/70 max-w-md mb-7 text-base leading-relaxed">
            Explore our comprehensive range of HVAC solutions, air conditioners, water systems, and air purification
            products from leading brands.
          </p>
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{ background: "#e07830" }}
          >
            <Phone size={15} />
            Get Free Consultation
          </button>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeFilter === f.id
                  ? "bg-[#1a3a5c] text-white border-[#1a3a5c] shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:border-[#1a3a5c] hover:text-[#1a3a5c]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <p className="text-slate-400 text-sm mb-6">
          Showing <span className="font-semibold text-slate-700">{visible.length}</span> product categories
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((cat) => (
            <ProductCard key={cat.id} cat={cat} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#1a3a5c] mt-10 py-12 text-center">
        <h2 className="text-white text-2xl font-black mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
          Need Help Choosing?
        </h2>
        <p className="text-white/60 text-sm mb-6">
          Our experts will help you find the perfect AC for your space and budget.
        </p>
        <button
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:brightness-110"
          style={{ background: "#e07830" }}
        >
          <Phone size={15} />
          Call Us Now
        </button>
      </div>
    </div>
  );
}