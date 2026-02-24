// brandsData.ts

export interface BrandFeature {
  icon: string;
  title: string;
  desc: string;
  bg: string;
  iconColor: string;
}

export interface BrandProduct {
  title: string;
  desc: string;
  image: string;
  featuresList: string[];
}

export interface BrandData {
  brandName: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  features: BrandFeature[];
  products: BrandProduct[];
}

export const brandsData: Record<string, BrandData> = {
  'daikin-vrv-systems': {
    brandName: "Daikin",
    title: "Daikin VRV Systems",
    subtitle: "Advanced Japanese Cooling Technology",
    description: "Experience the pinnacle of commercial and residential cooling. Daikin's VRV systems offer independent temperature control for multiple zones, ensuring maximum energy efficiency and personalized comfort.",
    heroImage: "https://placehold.co/600x400/eef2f6/112d4e?text=Daikin+VRV",
    features: [
      { icon: 'star', title: "Japanese Precision", desc: "Engineered for unmatched reliability and quiet operation", bg: "bg-blue-100", iconColor: "text-blue-600" },
      { icon: 'rupee', title: "Energy Efficient", desc: "Advanced inverter technology saves power", bg: "bg-green-100", iconColor: "text-green-600" },
      { icon: 'heart', title: "Zone Control", desc: "Independent cooling for different rooms", bg: "bg-purple-100", iconColor: "text-purple-600" },
      { icon: 'trophy', title: "Global Leader", desc: "Trusted worldwide for commercial cooling", bg: "bg-yellow-100", iconColor: "text-yellow-600" }
    ],
    products: [
      {
        title: "VRV Home Systems",
        desc: "Premium central air conditioning for residences",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=VRV+Home",
        featuresList: ["Space Saving", "Quiet Operation", "High COP"]
      },
      {
        title: "Inverter Split ACs",
        desc: "High-wall units for individual rooms",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Daikin+Split",
        featuresList: ["Coanda Airflow", "PM 2.5 Filter", "Neo Swing Compressor"]
      },
      {
        title: "Cassette ACs",
        desc: "Ceiling mounted cooling for large spaces",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Cassette+AC",
        featuresList: ["360 Degree Airflow", "Uniform Cooling", "Aesthetic Design"]
      }
    ]
  },
  'mitsubishi-heavy': {
    brandName: "Mitsubishi",
    title: "Mitsubishi Heavy Industries",
    subtitle: "Heavy Duty Performance & Reliability",
    description: "Built to last under extreme conditions. Mitsubishi Heavy Industries delivers robust air conditioning solutions that provide powerful cooling, rapid temperature drop, and industrial-grade durability for your home.",
    heroImage: "https://placehold.co/600x400/eef2f6/112d4e?text=Mitsubishi+Heavy",
    features: [
      { icon: 'trophy', title: "Heavy Duty", desc: "Designed to operate in temperatures up to 55°C", bg: "bg-red-100", iconColor: "text-red-600" },
      { icon: 'star', title: "Long Reach Airflow", desc: "Powerful fan motors for deep room cooling", bg: "bg-blue-100", iconColor: "text-blue-600" },
      { icon: 'rupee', title: "Durable Build", desc: "100% copper components for long life", bg: "bg-orange-100", iconColor: "text-orange-600" },
      { icon: 'heart', title: "Clean Air", desc: "Self-clean operation and allergen filters", bg: "bg-teal-100", iconColor: "text-teal-600" }
    ],
    products: [
      {
        title: "Heavy Duty Split ACs",
        desc: "Extreme cooling for harsh summers",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Heavy+Duty+Split",
        featuresList: ["Jet Flow Technology", "High Ambient Cooling", "Anti-Microbial Fan"]
      },
      {
        title: "Premium Inverter ACs",
        desc: "Smart cooling with energy savings",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Premium+Inverter",
        featuresList: ["3D Auto Airflow", "Eco Mode", "Silent Operation"]
      },
      {
        title: "Tower ACs",
        desc: "Floor standing units for large halls",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Tower+AC",
        featuresList: ["High Capacity", "Wide Angle Swing", "Easy Maintenance"]
      }
    ]
  },
  'carrier': {
    brandName: "Carrier",
    title: "Carrier Air Conditioning",
    subtitle: "The Inventors of Modern Air Conditioning",
    description: "Trust the brand that invented modern air conditioning. Carrier offers innovative, highly efficient cooling systems designed to provide optimal comfort while keeping energy consumption low.",
    heroImage: "https://placehold.co/600x400/eef2f6/112d4e?text=Carrier+AC",
    features: [
      { icon: 'star', title: "Pioneering Tech", desc: "Over 100 years of cooling innovation", bg: "bg-blue-100", iconColor: "text-blue-600" },
      { icon: 'heart', title: "Flexicool Inverter", desc: "Adjust cooling capacity based on requirement", bg: "bg-green-100", iconColor: "text-green-600" },
      { icon: 'rupee', title: "Cost Effective", desc: "High ISEER ratings for lower electricity bills", bg: "bg-emerald-100", iconColor: "text-emerald-600" },
      { icon: 'trophy', title: "Rapid Cooling", desc: "Insta Cool mode for immediate relief", bg: "bg-cyan-100", iconColor: "text-cyan-600" }
    ],
    products: [
      {
        title: "Flexicool Split ACs",
        desc: "Convertible cooling technology",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Flexicool+AC",
        featuresList: ["4-in-1 Convertible", "PM 2.5 Filter", "Aqua Clear Protection"]
      },
      {
        title: "Window ACs",
        desc: "Efficient cooling in a compact form",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Carrier+Window",
        featuresList: ["Energy Saver Mode", "Exhaust Command", "Copper Condenser"]
      },
      {
        title: "Cassette ACs",
        desc: "Sleek ceiling integration",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Carrier+Cassette",
        featuresList: ["360° Air Flow", "Built-in Drain Pump", "Fresh Air Intake"]
      }
    ]
  },
  'amstrad': {
    brandName: "Amstrad",
    title: "Amstrad Next Generation Cooling",
    subtitle: "Inspired by Technology",
    description: "Amstrad brings next-generation technology to your home. Designed for the modern consumer, these ACs feature smart connectivity, heavy-duty cooling performance, and sleek aesthetics.",
    heroImage: "https://placehold.co/600x400/eef2f6/112d4e?text=Amstrad+AC",
    features: [
      { icon: 'star', title: "Next Gen Tech", desc: "Wi-Fi enabled smart air conditioners", bg: "bg-indigo-100", iconColor: "text-indigo-600" },
      { icon: 'trophy', title: "Heavy Duty", desc: "Cooling even at 60°C ambient temperature", bg: "bg-red-100", iconColor: "text-red-600" },
      { icon: 'heart', title: "Eco-Friendly", desc: "Uses R32 green refrigerant", bg: "bg-green-100", iconColor: "text-green-600" },
      { icon: 'rupee', title: "100% Copper", desc: "Inner grooved copper for better heat exchange", bg: "bg-orange-100", iconColor: "text-orange-600" }
    ],
    products: [
      {
        title: "Smart Inverter ACs",
        desc: "Voice controlled via Alexa & Google Home",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Smart+AC",
        featuresList: ["Wi-Fi Control", "Hidden Display", "Gold Fin Protection"]
      },
      {
        title: "Heavy Duty Split ACs",
        desc: "Built for extreme Indian summers",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Amstrad+Split",
        featuresList: ["60°C Cooling", "Stabilizer Free", "Turbo Cool"]
      },
      {
        title: "Portable ACs",
        desc: "Cooling that moves with you",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Portable+AC",
        featuresList: ["Plug & Play", "Caster Wheels", "Dehumidifier Mode"]
      }
    ]
  },
  'midea': {
    brandName: "Midea",
    title: "Midea Air Conditioning",
    subtitle: "Global Leader in Air Treatment",
    description: "As one of the world's largest appliance manufacturers, Midea offers reliable, feature-rich air conditioners that deliver exceptional value and cutting-edge inverter technology for your living spaces.",
    heroImage: "https://placehold.co/600x400/eef2f6/112d4e?text=Midea+AC",
    features: [
      { icon: 'star', title: "Global Expertise", desc: "Trusted by millions across the world", bg: "bg-blue-100", iconColor: "text-blue-600" },
      { icon: 'rupee', title: "iEco Mode", desc: "Ultra-low energy consumption overnight", bg: "bg-green-100", iconColor: "text-green-600" },
      { icon: 'heart', title: "Flash Cooling", desc: "High-frequency compressor startup", bg: "bg-cyan-100", iconColor: "text-cyan-600" },
      { icon: 'trophy', title: "Dual Filter", desc: "High density and cold catalyst filters", bg: "bg-slate-200", iconColor: "text-slate-600" }
    ],
    products: [
      {
        title: "Xtreme Save ACs",
        desc: "Maximum energy savings without compromising comfort",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Xtreme+Save",
        featuresList: ["Smart SavE Mode", "Gear Shift", "Precise Temp Control"]
      },
      {
        title: "Blanc Series",
        desc: "Minimalist design with powerful airflow",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Blanc+Series",
        featuresList: ["Super Cool", "Follow Me Feature", "Self-Cleaning"]
      },
      {
        title: "Window ACs",
        desc: "Classic cooling updated with modern tech",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Midea+Window",
        featuresList: ["Auto Restart", "Sleep Mode", "Timer Function"]
      }
    ]
  },
  'godrej': {
    brandName: "Godrej",
    title: "Godrej Appliances",
    subtitle: "Thoughtful Cooling for Indian Homes",
    description: "Godrej has been a part of Indian households for decades. Our air conditioners are thoughtfully designed keeping Indian weather, power fluctuations, and environmental sustainability in mind.",
    heroImage: "https://placehold.co/600x400/eef2f6/112d4e?text=Godrej+AC",
    features: [
      { icon: 'heart', title: "Earth Friendly", desc: "Pioneers in using R290 & R32 green refrigerants", bg: "bg-green-100", iconColor: "text-green-600" },
      { icon: 'trophy', title: "Anti-Viral Filter", desc: "Nano-coated filter removes 99.9% viral particles", bg: "bg-blue-100", iconColor: "text-blue-600" },
      { icon: 'star', title: "Heavy Duty", desc: "Uninterrupted cooling at 52°C", bg: "bg-orange-100", iconColor: "text-orange-600" },
      { icon: 'rupee', title: "Anti-Corrosion", desc: "Blue fin coating on evaporator and condenser", bg: "bg-teal-100", iconColor: "text-teal-600" }
    ],
    products: [
      {
        title: "5-in-1 Convertible",
        desc: "Adjust capacity from 40% to 110%",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Godrej+Convertible",
        featuresList: ["I-Sense Technology", "100% Copper", "Silent Operation"]
      },
      {
        title: "Hot & Cold ACs",
        desc: "Comfort for all weather conditions",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Hot+and+Cold",
        featuresList: ["Twin Rotary Compressor", "Wide Operating Range", "Defrost Sensor"]
      },
      {
        title: "Fixed Speed ACs",
        desc: "Economical and powerful cooling",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Fixed+Speed",
        featuresList: ["Acoustic Jacket", "Anti-Microbial Coating", "Smart Diagnostics"]
      }
    ]
  },
  'cruise': {
    brandName: "Cruise",
    title: "Cruise Professional Cooling",
    subtitle: "Premium Air Conditioning Solutions",
    description: "Specializing in premium and portable air conditioning. Cruise offers versatile, high-performance cooling units tailored for both residential spaces and demanding commercial environments.",
    heroImage: "https://placehold.co/600x400/eef2f6/112d4e?text=Cruise+AC",
    features: [
      { icon: 'star', title: "VarioQ Inverter", desc: "Advanced variable speed compressor", bg: "bg-blue-100", iconColor: "text-blue-600" },
      { icon: 'trophy', title: "Rust-O-Shield", desc: "Multi-layer protection against corrosion", bg: "bg-slate-200", iconColor: "text-slate-600" },
      { icon: 'heart', title: "AeroFan Tech", desc: "Aerodynamic blades for wider air throw", bg: "bg-cyan-100", iconColor: "text-cyan-600" },
      { icon: 'rupee', title: "Easy Care", desc: "Filter clean indicator and easy access", bg: "bg-emerald-100", iconColor: "text-emerald-600" }
    ],
    products: [
      {
        title: "Portable ACs",
        desc: "India's leading portable air conditioners",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Cruise+Portable",
        featuresList: ["No Installation Required", "4-in-1 Function", "Touch Control Panel"]
      },
      {
        title: "VarioQ Split ACs",
        desc: "Premium inverter splits with high aesthetics",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Cruise+Split",
        featuresList: ["PM 2.5 Filter", "Hidden LED", "4D Auto Swing"]
      },
      {
        title: "Tower ACs",
        desc: "Sleek floor standing units",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Cruise+Tower",
        featuresList: ["Powerful Air Throw", "LCD Display", "Child Lock"]
      }
    ]
  },
  'voltas': {
    brandName: "Voltas",
    title: "Voltas Air Conditioning",
    subtitle: "A TATA Enterprise | India's No.1 AC Brand",
    description: "Experience India's most trusted air conditioning brand. Voltas combines decades of innovation with understanding of Indian climate to deliver superior cooling solutions in Bareilly and across Uttar Pradesh.",
    heroImage: "https://placehold.co/600x400/eef2f6/112d4e?text=Voltas+AC+Unit",
    features: [
      { icon: 'trophy', title: "India's No.1 AC Brand", desc: "Market leader with the highest market share in India", bg: "bg-orange-100", iconColor: "text-orange-500" },
      { icon: 'heart', title: "Made for India", desc: "Specially designed for Indian climate and conditions", bg: "bg-blue-100", iconColor: "text-blue-600" },
      { icon: 'rupee', title: "Value for Money", desc: "Premium features at affordable prices", bg: "bg-slate-200", iconColor: "text-slate-600" },
      { icon: 'star', title: "Trusted Quality", desc: "Decades of experience serving Indian families", bg: "bg-orange-100", iconColor: "text-orange-500" }
    ],
    products: [
      {
        title: "Inverter Split ACs",
        desc: "Energy-efficient cooling with smart features",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Inverter+AC",
        featuresList: ["5-Star Rating", "Copper Condenser", "Smart Connectivity"]
      },
      {
        title: "Split Air Conditioners",
        desc: "Reliable cooling for Indian homes",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Split+AC",
        featuresList: ["Made for India", "Dust Filter", "Stabilizer Free Operation"]
      },
      {
        title: "Window ACs",
        desc: "Affordable cooling solutions",
        image: "https://placehold.co/400x300/eef2f6/112d4e?text=Window+AC",
        featuresList: ["High Cooling Capacity", "Easy Maintenance", "Value for Money"]
      }
    ]
  }
};