import React from 'react';
import { Phone, ArrowLeft, Thermometer, Wind, PhoneCall } from 'lucide-react';

// --- Types ---
interface ResidentialProduct {
  id: string;
  title: string;
  description: string;
  brands: string[];
  imageUrl: string;
  icon: React.ReactNode;
}

interface CommercialProduct {
  id: string;
  title: string;
  tag: string;
  description: string;
  features: string[];
  imageUrl: string;
  icon: React.ReactNode;
}

// --- Mock Data ---
const residentialProducts: ResidentialProduct[] = [
  {
    id: '1',
    title: 'Inverter Split Air Conditioners',
    description: 'Energy-efficient inverter technology split ACs with variable speed',
    brands: ['Daikin', 'Mitsubishi Heavy', 'Carrier', 'Amstrad', 'Midea', 'Godrej'],
    imageUrl: 'https://images.unsplash.com/photo-1620021382417-66c3c7370a59?auto=format&fit=crop&q=80&w=800',
    icon: <Thermometer className="w-5 h-5 text-white" />
  },
  {
    id: '2',
    title: 'Non-Inverter Split Air Conditioners',
    description: 'Fixed speed split ACs for consistent cooling performance',
    brands: ['Daikin', 'Mitsubishi Heavy', 'Carrier', 'Amstrad', 'Midea', 'Godrej'],
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b46a0eb?auto=format&fit=crop&q=80&w=800',
    icon: <Thermometer className="w-5 h-5 text-white" />
  },
  {
    id: '3',
    title: 'Cassette Air Conditioners',
    description: 'Ceiling-mounted cassette ACs for uniform cooling',
    brands: ['Daikin', 'Carrier', 'Mitsubishi Heavy', 'Cruise'],
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    icon: <Wind className="w-5 h-5 text-white" />
  }
];

const commercialProducts: CommercialProduct[] = [
  {
    id: '1',
    title: 'VRV Systems',
    tag: 'Daikin Exclusive',
    description: 'Variable Refrigerant Volume systems for maximum efficiency',
    features: ['Multi-zone control', 'Energy recovery', 'Heat pump technology'],
    imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=800',
    icon: <Wind className="w-5 h-5 text-white" />
  },
  {
    id: '2',
    title: 'Chillers',
    tag: 'Multi-Brand',
    description: 'Industrial cooling solutions for large facilities',
    features: ['Water-cooled chillers', 'Air-cooled systems', 'Modular designs'],
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    icon: <Wind className="w-5 h-5 text-white" />
  },
  {
    id: '3',
    title: 'Heat Pumps',
    tag: 'Daikin & Carrier',
    description: 'Energy-efficient heating and cooling systems',
    features: ['Inverter technology', 'All-season comfort', 'Eco-friendly refrigerant'],
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800',
    icon: <Wind className="w-5 h-5 text-white" />
  }
];

// --- Components ---

const HeroSection = () => (
  <div className="relative bg-gradient-to-r from-[#1e4b7a] to-[#7fa1c3] py-20 px-6 sm:px-12 lg:px-24">
    {/* Optional background image overlay would go here */}
    <div className="relative z-10 max-w-4xl">
      <div className="flex items-center gap-3 text-white mb-4">
        <ArrowLeft className="w-6 h-6 cursor-pointer hover:text-gray-200" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Our Products</h1>
      </div>
      <p className="text-white/90 text-lg max-w-2xl mb-8 leading-relaxed">
        Explore our comprehensive range of HVAC solutions, air conditioners, water systems, and air purification products from leading brands.
      </p>
      <button className="bg-[#f97316] hover:bg-[#ea580c] text-white font-medium py-3 px-6 rounded-md flex items-center gap-2 transition-colors">
        <PhoneCall className="w-5 h-5" />
        Get Free Consultation
      </button>
    </div>
  </div>
);

const ResidentialProducts = () => (
  <div className="max-w-7xl mx-auto py-16 px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {residentialProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="relative h-56 bg-gray-200">
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-[#1e4b7a] p-2 rounded-lg">
              {product.icon}
            </div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-[#1e4b7a] mb-2">{product.title}</h3>
            <p className="text-gray-600 text-sm mb-6 flex-grow">{product.description}</p>
            
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-3">Available Brands:</p>
              <div className="flex flex-wrap gap-2">
                {product.brands.map((brand, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CommercialProducts = () => (
  <div className="bg-gray-50/50 py-16 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#1e4b7a] mb-4">Commercial HVAC Solutions</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Specialized HVAC systems for commercial spaces including gyms, salons, hospitals, schools, hotels, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {commercialProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="relative h-56 bg-gray-200">
              <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#1e4b7a] p-2 rounded-lg">
                {product.icon}
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-[#1e4b7a]">{product.title}</h3>
                <span className="bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                  {product.tag}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-6">{product.description}</p>
              
              <ul className="space-y-2 mb-8 flex-grow">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] mr-2 flex-shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="w-full py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                <Phone className="w-4 h-4" />
                Get Quote
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CTASection = () => (
  <div className="bg-[#0f447a] py-16 px-6 text-center">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Perfect HVAC Solution?</h2>
      <p className="text-white/80 mb-8">Get expert consultation and competitive pricing on all products</p>
      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button className="w-full sm:w-auto bg-[#f97316] hover:bg-[#ea580c] text-white font-medium py-3 px-8 rounded-md flex items-center justify-center gap-2 transition-colors">
          <Phone className="w-5 h-5" />
          Call for Free Site Visit
        </button>
        <button className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white font-medium py-3 px-8 rounded-md border border-white transition-colors">
          Request Quote
        </button>
      </div>
    </div>
  </div>
);

// --- Main App ---
export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <HeroSection />
      <ResidentialProducts />
      <CommercialProducts />
      <CTASection />
    </div>
  );
}