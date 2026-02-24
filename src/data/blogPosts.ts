export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "inverter-vs-non-inverter-ac",
    title: "Inverter vs Non-Inverter AC: Which Should You Buy in 2025?",
    excerpt: "Understanding the key differences in energy efficiency, cooling performance, and long-term savings between inverter and non-inverter air conditioners.",
    content: [
      "Choosing between an inverter and non-inverter AC is one of the most common dilemmas homeowners face. With rising electricity costs and increasing environmental awareness, making the right choice has never been more important.",
      "An inverter AC uses a variable-speed compressor that adjusts its speed based on the room's cooling demand. Instead of switching on and off repeatedly, it runs continuously at varying speeds — resulting in quieter operation, faster cooling, and significantly lower electricity bills (up to 30-50% savings).",
      "Non-inverter ACs, on the other hand, use a fixed-speed compressor that operates in a simple on/off cycle. While they're cheaper upfront, their running costs are considerably higher over time. They also tend to be noisier and provide less consistent temperatures.",
      "For rooms used more than 8 hours daily — like bedrooms and living rooms — an inverter AC pays for itself within 2-3 years through electricity savings alone. For rarely used guest rooms or small offices, a non-inverter may still be a practical choice.",
      "At LIMRA Sales And Services, we recommend top-rated inverter models from Daikin, Carrier, and Mitsubishi Heavy that combine premium performance with industry-leading energy ratings. Our team helps you pick the perfect tonnage and model for your specific space."
    ],
    category: "Buying Guide",
    date: "2025-02-15",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1631545806609-834bf53923ea?q=80&w=800",
    author: "LIMRA Team",
  },
  {
    slug: "vrv-systems-commercial-buildings",
    title: "Why VRV Systems Are the Future of Commercial Cooling",
    excerpt: "How Variable Refrigerant Volume technology is revolutionizing climate control in offices, hotels, hospitals, and large commercial spaces.",
    content: [
      "Variable Refrigerant Volume (VRV) systems represent the pinnacle of commercial HVAC technology. Originally developed by Daikin in 1982, VRV systems have become the gold standard for large-scale climate control worldwide.",
      "Unlike traditional central air conditioning, VRV systems allow individual zone control — meaning different rooms or floors can be set to different temperatures simultaneously. This provides unmatched comfort and eliminates energy waste from cooling unoccupied spaces.",
      "A single VRV outdoor unit can connect to dozens of indoor units across multiple floors, dramatically reducing installation complexity and rooftop space requirements. The systems also offer both heating and cooling from the same unit, making them ideal for year-round climate management.",
      "Energy savings with VRV systems typically range from 30-55% compared to conventional central AC systems. For a large commercial building, this translates to lakhs of rupees in annual savings — making the higher initial investment extremely worthwhile.",
      "LIMRA Sales And Services is an authorized Daikin VRV installer with over 15 years of experience in commercial projects. From system design to installation and ongoing maintenance, we handle every aspect of your commercial cooling needs."
    ],
    category: "Commercial HVAC",
    date: "2025-01-28",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1504328332780-fe4d749d612b?q=80&w=800",
    author: "LIMRA Team",
  },
  {
    slug: "ac-maintenance-tips",
    title: "7 Essential AC Maintenance Tips to Cut Your Electricity Bill",
    excerpt: "Simple maintenance practices that can extend your AC's life by years and reduce energy consumption by up to 25%.",
    content: [
      "Regular AC maintenance isn't just about keeping your unit running — it's about maximizing efficiency, reducing electricity bills, and preventing expensive breakdowns. Here are seven tips every AC owner should follow.",
      "1. Clean or replace filters every month during heavy use. Dirty filters restrict airflow, forcing your AC to work harder and consume more energy. A clean filter alone can improve efficiency by 5-15%.",
      "2. Schedule professional servicing at least twice a year — ideally before summer and after monsoon. A technician will check refrigerant levels, clean coils, inspect electrical connections, and ensure optimal performance.",
      "3. Keep the outdoor unit clear of debris, leaves, and obstructions. The condenser needs adequate airflow to release heat. Maintain at least 2 feet of clearance around the unit.",
      "4. Set your thermostat to 24-25°C instead of the lowest setting. Every degree below 24°C increases energy consumption by 3-5%. Use the 'auto' fan mode for the best balance of comfort and efficiency.",
      "5. Seal gaps around windows and doors in air-conditioned rooms. Air leaks force your AC to work harder to maintain temperature, wasting energy and money.",
      "6. Use curtains or blinds to block direct sunlight. Solar heat gain through windows can increase your cooling load by 30% or more.",
      "7. Consider upgrading to a 5-star rated inverter AC if your unit is more than 8-10 years old. Modern units are dramatically more efficient and will pay for themselves through energy savings."
    ],
    category: "Maintenance",
    date: "2025-01-10",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800",
    author: "LIMRA Team",
  },
  {
    slug: "right-ac-tonnage-for-room",
    title: "How to Choose the Right AC Tonnage for Your Room",
    excerpt: "A practical guide to calculating the correct AC capacity based on room size, insulation, sun exposure, and occupancy.",
    content: [
      "Buying an AC with the wrong tonnage is one of the most common and costly mistakes. An undersized AC will struggle to cool your room and run non-stop, while an oversized one will cycle on and off too frequently — both wasting energy and shortening the unit's lifespan.",
      "The basic rule of thumb: you need approximately 1 ton of cooling for every 100-120 sq ft of room area. But this is just a starting point — several factors can increase your cooling requirement.",
      "Sun exposure matters significantly. A room with large west-facing windows receiving direct afternoon sun may need 20-30% more cooling capacity. Similarly, rooms on the top floor under a concrete roof absorb more heat.",
      "Occupancy and heat-generating equipment also factor in. A home office with a computer, printer, and two people generates more heat than an empty bedroom. Commercial spaces with many occupants need proportionally more cooling.",
      "Insulation quality plays a crucial role too. Well-insulated rooms with double-glazed windows retain cool air better, potentially allowing you to choose a slightly smaller unit. Poorly insulated rooms with gaps leak cool air rapidly.",
      "At LIMRA Sales And Services, we offer free site surveys to calculate the exact cooling load for your space. Our engineers consider all variables to recommend the perfect AC tonnage, brand, and model — ensuring optimal comfort and efficiency."
    ],
    category: "Buying Guide",
    date: "2024-12-20",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ee1?q=80&w=800",
    author: "LIMRA Team",
  },
];
