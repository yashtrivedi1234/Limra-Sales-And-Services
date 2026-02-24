import React from 'react';
import { Award, Users, ShieldCheck, Zap } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Industry Leader",
      description: "Recognized as the leading digital signage provider in UP",
      icon: <Award className="w-8 h-8 text-white" />
    },
    {
      id: 2,
      title: "200+ Happy Clients",
      description: "Serving businesses across multiple industries",
      icon: <Users className="w-8 h-8 text-white" />
    },
    {
      id: 3,
      title: "Quality Assured",
      description: "ISO certified with 24/7 support and warranty",
      icon: <ShieldCheck className="w-8 h-8 text-white" />
    },
    {
      id: 4,
      title: "Latest Technology",
      description: "Cutting-edge LED displays and smart solutions",
      icon: <Zap className="w-8 h-8 text-white" />
    }
  ];

  return (
    <section className="py-16 bg-white font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex flex-col items-center">
            <span>
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600">Choose Us</span>
            </span>
            {/* Gradient Underline */}
            <div className="h-1 w-32 bg-gradient-to-r from-emerald-500 to-blue-600 mt-2 rounded-full"></div>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover what sets Digital Signage Solutions UP apart — innovation, reliability, and a commitment to excellence in every display.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-gray-50 border border-gray-100 rounded-xl p-8 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Icon Container with Gradient */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              
              {/* Text Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;