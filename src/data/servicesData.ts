import { Wrench, ShieldCheck, MapPin, Clock, Settings2, Wind, LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ServiceProcess {
  step: string;
  title: string;
  desc: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  icon: LucideIcon;
  badge: string;
  title: string;
  tagline: string;
  desc: string;
  longDesc: string;
  highlights: string[];
  duration: string;
  price: string;
  rating: number;
  reviews: number;
  process: ServiceProcess[];
  faqs: ServiceFAQ[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
export const services: Service[] = [
  {
    slug:        "expert-installation",
    icon:        Wrench,
    badge:       "Most Popular",
    title:       "Expert Installation",
    tagline:     "Precision from day one.",
    desc:        "Certified technicians with precision setup for optimal performance and longevity.",
    longDesc:    "Our installation service is built around doing it right the first time. Every job starts with an on-site walkthrough, where our technician confirms the optimal placement for airflow, drain routing, and electrical load. We use manufacturer-approved tools and materials, torque-test every flare fitting, and run a full commissioning cycle before we leave. You get a photographic job report and a two-year workmanship warranty on top of the brand warranty.",
    highlights:  ["Certified technicians", "Same-day availability", "Post-install testing", "2-year workmanship warranty"],
    duration:    "2–4 hrs",
    price:       "From ₹1,499",
    rating:      4.9,
    reviews:     347,
    process: [
      { step: "01", title: "Site assessment",    desc: "Technician surveys the room, checks electrical panel and drain options." },
      { step: "02", title: "Unit positioning",   desc: "Indoor and outdoor unit placement optimised for airflow and noise." },
      { step: "03", title: "Wiring & piping",    desc: "Copper piping flared and brazed; electrical wiring to code." },
      { step: "04", title: "Leak & vacuum test", desc: "Nitrogen pressure test + deep vacuum before releasing refrigerant." },
      { step: "05", title: "Commissioning",      desc: "Full test cycle, temperature verification, remote pairing." },
      { step: "06", title: "Handover & report",  desc: "Photo report emailed; warranty card & care tips handed over." },
    ],
    faqs: [
      { q: "How long does installation take?",  a: "Typically 2–4 hours for a standard split AC. Multi-head or ducted systems may take a full day." },
      { q: "Do I need to be home?",             a: "Yes for the first 30 minutes (site check) and the last 15 minutes (handover). You don't need to supervise the whole job." },
      { q: "Is drilling included?",             a: "Yes — wall drilling for pipe routing is included at no extra charge." },
      { q: "What if my unit develops a fault?", a: "Our 2-year workmanship warranty covers any fault that originates from the installation. One call and we come back free of charge." },
    ],
  },
  {
    slug:        "maintenance-repair",
    icon:        ShieldCheck,
    badge:       "Recommended",
    title:       "Maintenance & Repair",
    tagline:     "Keep it running at peak.",
    desc:        "Scheduled servicing, gas top-ups, deep cleaning and swift troubleshooting.",
    longDesc:    "A neglected AC works 25–40% harder, consuming more power while delivering less comfort. Our maintenance visit covers every component: filters are deep-washed, the evaporator coil is foamed and rinsed, the condenser fins are combed straight, refrigerant pressure is verified, and all electrical contacts are checked for corrosion. We hand you a printed health card so you know exactly where your unit stands.",
    highlights:  ["Filter deep-clean", "Refrigerant top-up", "PCB diagnostics", "Full health report"],
    duration:    "1–3 hrs",
    price:       "From ₹799",
    rating:      4.8,
    reviews:     892,
    process: [
      { step: "01", title: "Filter wash",          desc: "Filters removed, jet-washed, dried and refitted." },
      { step: "02", title: "Coil cleaning",         desc: "Evaporator foamed; condenser fins combed and rinsed." },
      { step: "03", title: "Drain flush",           desc: "Condensate pan and drain line cleared and sanitised." },
      { step: "04", title: "Gas check",             desc: "Refrigerant pressure verified; top-up if within included allowance." },
      { step: "05", title: "Electrical check",      desc: "Capacitors, contactors, PCB and thermostat tested." },
      { step: "06", title: "Health card handover",  desc: "Printed report listing every parameter checked." },
    ],
    faqs: [
      { q: "How often should I service my AC?", a: "Twice a year — once before summer and once at the end of the season — is ideal for most households." },
      { q: "Is gas top-up always needed?",       a: "Not always. We check pressure first; top-up is only done if levels are below spec." },
      { q: "Can I book same-day?",               a: "Yes, subject to technician availability in your area." },
      { q: "What's not covered?",                a: "Major part replacements (compressor, PCB board) are quoted separately after diagnosis." },
    ],
  },
  {
    slug:        "free-site-visit",
    icon:        MapPin,
    badge:       "Free",
    title:       "Free Site Visit",
    tagline:     "The right fit, every time.",
    desc:        "Complimentary assessment of your space to recommend the perfect cooling solution.",
    longDesc:    "Buying the wrong capacity AC is one of the most common — and costly — mistakes homeowners make. An undersized unit runs continuously and still can't cool the room; an oversized one short-cycles, fails to dehumidify and wears out faster. Our free site visit eliminates the guesswork: we calculate your room's heat load, factor in occupancy, window orientation and insulation, and recommend the exact tonnage and model that will save you money for years.",
    highlights:  ["Load calculation", "Unit size advisory", "Ducting feasibility", "No-obligation quote"],
    duration:    "30–60 min",
    price:       "Complimentary",
    rating:      5.0,
    reviews:     214,
    process: [
      { step: "01", title: "Book a slot",           desc: "Choose a convenient time via our booking form or WhatsApp." },
      { step: "02", title: "Technician arrives",    desc: "Our expert visits your home at the agreed time." },
      { step: "03", title: "Heat load calculation", desc: "Room dimensions, window area, sun orientation, and occupancy measured." },
      { step: "04", title: "Site feasibility",      desc: "Pipe routing, power point and outdoor unit placement evaluated." },
      { step: "05", title: "Recommendation",        desc: "Tonnage, brand and model shortlist presented on the spot." },
      { step: "06", title: "Quote delivered",        desc: "Itemised quote emailed within the hour — no obligation." },
    ],
    faqs: [
      { q: "Is there really no charge?",            a: "Absolutely none. No hidden fees, no obligation to buy from us." },
      { q: "How long does the visit take?",          a: "Usually 30–45 minutes, slightly longer for large homes or commercial spaces." },
      { q: "Can I get a quote for multiple rooms?",  a: "Yes — just let us know when booking and we'll allocate extra time." },
      { q: "What if I decide not to proceed?",       a: "No problem at all. We'll leave you with the report for future reference." },
    ],
  },
  {
    slug:        "emergency-service",
    icon:        Clock,
    badge:       "24 / 7",
    title:       "Emergency Service",
    tagline:     "Help when you need it most.",
    desc:        "Round-the-clock support because breakdowns don't wait for business hours.",
    longDesc:    "Whether it's 2 AM and your bedroom AC has quit, or a mid-afternoon heatwave has knocked out the office units, our emergency team picks up every call and dispatches the nearest available technician. Our vans carry the most common replacement parts — capacitors, contactors, motors, PCB modules — so most jobs are resolved in a single visit.",
    highlights:  ["60-min response SLA", "Night & weekend coverage", "Spare parts on-van", "Priority queue"],
    duration:    "On-demand",
    price:       "From ₹999",
    rating:      4.7,
    reviews:     563,
    process: [
      { step: "01", title: "Call or WhatsApp", desc: "Reach us at any hour — the line is always open." },
      { step: "02", title: "Dispatch",          desc: "Nearest technician assigned and ETA confirmed within 10 minutes." },
      { step: "03", title: "Diagnosis",         desc: "Fault identified on arrival using diagnostic tools." },
      { step: "04", title: "Repair",            desc: "Most faults fixed on the spot with van-stocked parts." },
      { step: "05", title: "Test run",          desc: "Unit run through full cooling cycle to confirm the fix." },
      { step: "06", title: "Job report",        desc: "Digital report emailed immediately after job completion." },
    ],
    faqs: [
      { q: "What counts as an emergency?",        a: "Any situation where your AC has stopped working or is behaving unsafely (burning smell, water leak, sparking)." },
      { q: "Is the ₹999 the total cost?",         a: "₹999 is the call-out fee. Parts and labour are quoted transparently before any work begins." },
      { q: "Do you cover weekends and holidays?", a: "Yes — 365 days a year, including public holidays." },
      { q: "How fast is the 60-minute SLA?",      a: "60 minutes from the time you call to a technician arriving, within our service zones." },
    ],
  },
  {
    slug:        "amc-plans",
    icon:        Settings2,
    badge:       "Save 30%",
    title:       "AMC Plans",
    tagline:     "One plan, zero worries.",
    desc:        "Annual Maintenance Contracts that cover unlimited service calls, parts, and priority support.",
    longDesc:    "An AMC turns unpredictable AC expenses into a single fixed annual fee. You get two scheduled services per unit, unlimited breakdown call-outs, parts at our cost price and priority scheduling — no waiting behind walk-in customers. Most AMC holders recover the plan cost in their first emergency call-out.",
    highlights:  ["Unlimited service calls", "Parts at cost price", "Priority scheduling", "Dedicated account manager"],
    duration:    "Year-round",
    price:       "From ₹2,999/yr",
    rating:      4.9,
    reviews:     128,
    process: [
      { step: "01", title: "Choose plan",         desc: "Silver, Gold or Platinum — we explain what each covers." },
      { step: "02", title: "Baseline inspection", desc: "Full health check on all covered units before plan starts." },
      { step: "03", title: "Schedule service 1",  desc: "First planned service done at your chosen date." },
      { step: "04", title: "Priority support",    desc: "Your calls are routed to the priority queue automatically." },
      { step: "05", title: "Mid-year service",    desc: "Second planned service scheduled at mid-contract." },
      { step: "06", title: "Annual review",       desc: "End-of-year report and renewal discussion." },
    ],
    faqs: [
      { q: "Can I add units mid-contract?",      a: "Yes — additional units are added on a pro-rated basis." },
      { q: "What's not covered?",                a: "Compressor replacement and structural modifications are excluded. Everything else is included." },
      { q: "Is there a minimum number of units?",a: "No minimum — you can start with a single unit." },
      { q: "Can I cancel early?",                a: "Yes, with 30 days notice. We'll refund the unused months pro-rata." },
    ],
  },
  {
    slug:        "air-quality",
    icon:        Wind,
    badge:       "New",
    title:       "Air Quality Upgrade",
    tagline:     "Breathe cleaner, live better.",
    desc:        "HEPA filter retrofits, UV sanitisation modules and smart air-quality monitoring.",
    longDesc:    "Standard AC filters capture only large particles. Our air quality upgrade adds a HEPA-grade filtration layer that traps PM2.5, allergens, bacteria and mould spores — then a UV-C module sterilises whatever tries to pass through. A compact sensor clips to your existing unit and feeds real-time AQI data to your phone, so you always know what you're breathing.",
    highlights:  ["HEPA retrofitting", "UV-C sanitisation", "PM2.5 monitoring", "Allergen reduction"],
    duration:    "1–2 hrs",
    price:       "From ₹2,199",
    rating:      4.8,
    reviews:     76,
    process: [
      { step: "01", title: "Compatibility check", desc: "Technician confirms your unit can accept the upgrade kit." },
      { step: "02", title: "HEPA fitment",         desc: "Factory-sized HEPA media panel installed in the return air path." },
      { step: "03", title: "UV-C module",          desc: "UV lamp positioned at the coil; timer wired to existing control." },
      { step: "04", title: "Sensor placement",     desc: "Air quality sensor mounted; Wi-Fi paired to your phone." },
      { step: "05", title: "Calibration",          desc: "Sensor calibrated against a reference instrument." },
      { step: "06", title: "App setup",            desc: "App installed, alerts configured, baseline AQI recorded." },
    ],
    faqs: [
      { q: "Does this fit any brand of AC?",       a: "We support 95% of split AC models sold in India. Compatibility is confirmed during booking." },
      { q: "Does it reduce cooling efficiency?",   a: "The HEPA panel is sized to maintain rated airflow, so performance impact is negligible (<3%)." },
      { q: "How often do filters need replacing?", a: "HEPA panels last 12–18 months under normal use. UV bulbs last ~9,000 hours." },
      { q: "Does the sensor need Wi-Fi?",          a: "Yes — it uses your home Wi-Fi to push data to the app. Offline logging is also stored on the device." },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns the service matching the given slug, or undefined if not found */
export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** All slugs — useful for generateStaticParams / getStaticPaths */
export const serviceSlugs: string[] = services.map((s) => s.slug);