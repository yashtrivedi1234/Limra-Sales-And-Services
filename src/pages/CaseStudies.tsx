import { motion } from "framer-motion";
import { Download, MapPin, Building2, Thermometer, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

const caseStudies = [
  {
    id: 1,
    name: "Invertis University",
    location: "Bareilly, UP",
    units: "200+ Units",
    category: "Education",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    challenge:
      "Invertis University needed a centralized cooling solution for 15+ buildings across a sprawling campus, with varying load requirements for classrooms, labs, and auditoriums.",
    solution:
      "We deployed a hybrid VRV and ductable AC system with smart zoning controls, allowing independent climate management for each building while reducing energy consumption by 35%.",
    results: [
      "200+ units installed across 15 buildings",
      "35% reduction in energy consumption",
      "Centralized monitoring dashboard",
      "3-year AMC with 24/7 support",
    ],
    systemType: "VRV + Ductable Hybrid",
    completionYear: "2022",
  },
  {
    id: 2,
    name: "Jim Corbett Marriott Resort",
    location: "Jim Corbett, Uttarakhand",
    units: "150+ Units",
    category: "Hospitality",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    challenge:
      "A luxury resort in a wildlife sanctuary zone required whisper-quiet, eco-friendly cooling that blended with the natural surroundings and met strict environmental regulations.",
    solution:
      "We installed Daikin inverter VRV systems with low-noise outdoor units concealed in landscaped enclosures, paired with smart room-level thermostats for guest comfort control.",
    results: [
      "150+ units across 80 suites and common areas",
      "Noise levels under 25 dB in guest rooms",
      "Eco-compliant refrigerant systems",
      "Guest satisfaction score improved by 28%",
    ],
    systemType: "Daikin VRV IV",
    completionYear: "2023",
  },
  {
    id: 3,
    name: "Bareilly Airport",
    location: "Bareilly, UP",
    units: "80+ Units",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&q=80",
    challenge:
      "The newly expanded terminal building required high-capacity cooling for large open areas with high foot traffic, strict ventilation standards, and redundancy for critical zones.",
    solution:
      "We implemented a combination of high-capacity cassette ACs for the terminal and precision cooling for server and control rooms, all integrated with the building management system.",
    results: [
      "80+ units covering 50,000 sq ft",
      "99.9% uptime for critical zone cooling",
      "BMS integration for automated control",
      "Compliant with DGCA ventilation norms",
    ],
    systemType: "Cassette + Precision Cooling",
    completionYear: "2023",
  },
  {
    id: 4,
    name: "Bareilly Haat",
    location: "Bareilly, UP",
    units: "120+ Units",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    challenge:
      "A large commercial complex with mixed-use retail spaces, food courts, and office areas needed a flexible cooling system that could handle diverse loads and operating hours.",
    solution:
      "We designed a modular VRV system allowing individual shop owners to control their zones independently, with shared outdoor units to maximize space and reduce installation costs.",
    results: [
      "120+ units across 200+ retail spaces",
      "40% lower installation cost vs individual systems",
      "Independent zone billing for tenants",
      "Modular expansion capability",
    ],
    systemType: "Modular VRV System",
    completionYear: "2021",
  },
];

function generatePDF(study: (typeof caseStudies)[0]) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // Header
  doc.setFillColor(23, 37, 63); // primary navy
  doc.rect(0, 0, pageWidth, 45, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("LIMRA SALES AND SERVICES", margin, 20);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Case Study Report", margin, 30);
  doc.text(`${study.category} | ${study.completionYear}`, margin, 37);

  y = 60;

  // Project title
  doc.setTextColor(23, 37, 63);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(study.name, margin, y);
  y += 10;

  // Location & system info
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`Location: ${study.location}  |  System: ${study.systemType}  |  Scale: ${study.units}`, margin, y);
  y += 15;

  // Divider
  doc.setDrawColor(225, 150, 40);
  doc.setLineWidth(1.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 15;

  // Challenge
  doc.setTextColor(23, 37, 63);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("The Challenge", margin, y);
  y += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  const challengeLines = doc.splitTextToSize(study.challenge, contentWidth);
  doc.text(challengeLines, margin, y);
  y += challengeLines.length * 5 + 12;

  // Solution
  doc.setTextColor(23, 37, 63);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Our Solution", margin, y);
  y += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  const solutionLines = doc.splitTextToSize(study.solution, contentWidth);
  doc.text(solutionLines, margin, y);
  y += solutionLines.length * 5 + 12;

  // Results
  doc.setTextColor(23, 37, 63);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Key Results", margin, y);
  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  study.results.forEach((r) => {
    doc.setFillColor(225, 150, 40);
    doc.circle(margin + 2, y - 1.5, 1.5, "F");
    doc.text(r, margin + 8, y);
    y += 7;
  });

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("LIMRA Sales And Services | Bareilly & Shahjahanpur, UP | www.limrasales.com", margin, footerY);

  doc.save(`${study.name.replace(/\s+/g, "-").toLowerCase()}-case-study.pdf`);
}

const CaseStudies = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-8 text-sm"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Portfolio
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mt-3">
              Case Studies
            </h1>
            <p className="text-primary-foreground/60 mt-4 max-w-2xl text-lg">
              Explore our featured HVAC projects — from universities to luxury resorts. Download detailed case study reports as PDFs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:gap-16">
            {caseStudies.map((study, i) => (
              <motion.article
                key={study.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 60 }}
                className="grid lg:grid-cols-2 gap-8 bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                      {study.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-muted-foreground text-sm mb-3">
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={14} /> {study.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Building2 size={14} /> {study.units}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Thermometer size={14} /> {study.systemType}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                      {study.name}
                    </h2>

                    <div className="space-y-4 text-sm text-muted-foreground">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Challenge</h3>
                        <p>{study.challenge}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Solution</h3>
                        <p>{study.solution}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="font-semibold text-foreground text-sm mb-2">Key Results</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {study.results.map((r, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border">
                    <button
                      onClick={() => generatePDF(study)}
                      className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-accent/90 transition-colors shadow-glow-accent hover:shadow-glow-accent-strong"
                    >
                      <Download size={16} />
                      Download Case Study PDF
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CaseStudies;
