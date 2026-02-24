// BrandDetail.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, Trophy, Heart, IndianRupee, Star, CheckCircle2 } from 'lucide-react';
import { brandsData } from '../data/brandsdata';

// Helper function with typed arguments
const renderIcon = (iconName: string, className: string): React.ReactNode => {
  switch (iconName) {
    case 'trophy': return <Trophy size={24} className={className} />;
    case 'heart': return <Heart size={24} className={className} />;
    case 'rupee': return <IndianRupee size={24} className={className} />;
    case 'star': return <Star size={24} className={className} />;
    default: return <Star size={24} className={className} />;
  }
};

export default function BrandDetail() {
  // Strongly type the params object
  const { slug } = useParams<{ slug: string }>();
  
  // Lookup the brand data. We need to check if slug exists to satisfy TS.
  const brand = slug ? brandsData[slug] : undefined;

  // Fallback for missing brands or undefined slugs
  if (!brand) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Brand not found</h2>
        <p className="text-slate-500 mb-6">We couldn't find details for "{slug}".</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50">
      {/* 1. Hero Section */}
      <section className="bg-[#eef2f6] py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-4xl font-extrabold text-[#112d4e] flex items-center gap-3">
                <span className="text-blue-600 italic tracking-tighter uppercase">{brand.brandName}</span> 
                {brand.title}
              </h1>
              <p className="text-blue-800 font-semibold mt-1 text-sm">{brand.subtitle}</p>
            </div>
            <p className="text-slate-600 leading-relaxed max-w-lg">
              {brand.description}
            </p>
            <button className="bg-[#f97316] hover:bg-[#ea580c] text-white px-6 py-3 rounded-md font-medium flex items-center gap-2 transition-colors">
              <Phone size={18} />
              Get {brand.brandName} Quote
            </button>
          </div>
          <div className="flex-1">
            <img 
              src={brand.heroImage} 
              alt={brand.title} 
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#112d4e] mb-10">Why Choose {brand.brandName} in Bareilly?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {brand.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-4 p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className={`p-3 rounded-lg ${feature.bg}`}>
                {renderIcon(feature.icon, feature.iconColor)}
              </div>
              <div>
                <h3 className="font-bold text-[#112d4e]">{feature.title}</h3>
                <p className="text-slate-500 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Product Range Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#112d4e] mb-10">{brand.brandName} Product Range</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {brand.products.map((product, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-slate-100 flex items-center justify-center p-4">
                   <img src={product.image} alt={product.title} className="max-h-full object-contain mix-blend-multiply" />
                </div>
                <div className="p-6 border-t border-slate-100">
                  <h3 className="font-bold text-xl text-[#112d4e] mb-1">{product.title}</h3>
                  <p className="text-slate-500 text-sm mb-4">{product.desc}</p>
                  <ul className="space-y-2">
                    {product.featuresList.map((item, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={16} className="text-orange-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Footer CTA Section */}
      <section className="bg-[#0b3c68] py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Choose India's Most Trusted AC Brand</h2>
        <p className="text-blue-100 mb-8">Experience superior cooling designed for Indian homes in Bareilly</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="bg-slate-100 hover:bg-white text-[#0b3c68] px-6 py-3 rounded-md font-semibold flex items-center gap-2 transition-colors">
            <Phone size={18} /> Get Best Price
          </button>
          <button className="bg-transparent hover:bg-[#1a4f80] text-white border border-white px-6 py-3 rounded-md font-semibold transition-colors">
            Compare Models
          </button>
        </div>
      </section>
    </div>
  );
}