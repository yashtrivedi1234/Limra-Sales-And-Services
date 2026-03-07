import { motion } from "framer-motion";
import { Download, MapPin, Building2, Thermometer, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { BRAND } from "@/lib/colors";
import jsPDF from "jspdf";
import { useGetProjectsQuery } from "@/store/api";
import Loader from "@/components/ui/Loader";

function generatePDF(study: any) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  doc.setFillColor(8, 42, 69);
  doc.rect(0, 0, pageWidth, 45, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("LIMRA SALES AND SERVICES", margin, 20);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Project Report", margin, 30);
  doc.text(`${study.category} | ${study.completionYear}`, margin, 37);

  y = 60;
  doc.setTextColor(8, 42, 69);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(study.title || study.name, margin, y);
  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`Location: ${study.location}  |  System: ${study.systemType}  |  Scale: ${study.units}`, margin, y);
  y += 15;
  doc.setDrawColor(6, 149, 205);
  doc.setLineWidth(1.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 15;

  doc.setTextColor(8, 42, 69);
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

  doc.setTextColor(8, 42, 69);
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

  doc.setTextColor(8, 42, 69);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Key Results", margin, y);
  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  study.results.forEach((r) => {
    doc.setFillColor(6, 149, 205);
    doc.circle(margin + 2, y - 1.5, 1.5, "F");
    doc.text(r, margin + 8, y);
    y += 7;
  });

  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("LIMRA Sales And Services | Bareilly & Shahjahanpur, UP | www.limrasales.com", margin, footerY);

  doc.save(`${(study.title || study.name || 'study').replace(/\s+/g, "-").toLowerCase()}-case-study.pdf`);
}

const CaseStudies = () => {
  const { data: projects = [], isLoading } = useGetProjectsQuery();

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <main style={{ fontFamily: "'Inter', sans-serif", background: BRAND.bgSoft, minHeight: "100vh" }}>

      {/* ── Header ── */}
      <section style={{
        background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.darkMid} 50%, ${BRAND.primary} 100%)`,
        padding: "80px 32px",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.08,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "32px 32px", pointerEvents: "none"
        }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>
         

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)",
              color: BRAND.accentOnDark, fontWeight: 700, fontSize: "0.72rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "5px 16px", borderRadius: "100px", marginBottom: "18px"
            }}>Portfolio</div>
            <h1 style={{
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              color: BRAND.white, lineHeight: 1.1, marginBottom: "16px", fontWeight: 800
            }}>
              Projects
            </h1>
            <p style={{ color: BRAND.textOnDark, maxWidth: "540px", fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.7 }}>
              Explore our featured HVAC projects — from universities to luxury resorts. Download detailed projects reports as PDFs.
            </p>
          </motion.div>
        </div>

        <div style={{
          position: "absolute", bottom: -2, left: 0, right: 0, height: "70px",
          background: BRAND.bgSoft, clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0% 100%)"
        }} />
      </section>

      {/* ── Project Cards ── */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px" }}>
          {projects.map((study: any, i: number) => (
            <motion.article key={study._id || study.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 60 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                background: BRAND.white,
                borderRadius: "20px",
                border: `1px solid ${BRAND.slate100}`,
                overflow: "hidden",
                boxShadow: `0 4px 24px ${BRAND.primary}14`,
                transition: "box-shadow 0.4s"
              }}>
              {/* Image */}
              <div style={{ position: "relative", overflow: "hidden", minHeight: "280px" }}>
                <img src={study.featuredImage || study.images?.[0] || study.image} alt={study.title || study.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${BRAND.dark}80 0%, ${BRAND.dark}0D 60%)` }} />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${BRAND.dark}, ${BRAND.primary})` }} />
                <div style={{ position: "absolute", top: "16px", left: "16px" }}>
                  <span style={{
                    background: BRAND.dark, color: BRAND.white,
                    fontSize: "0.7rem", fontWeight: 700,
                    padding: "5px 14px", borderRadius: "100px",
                    letterSpacing: "0.08em"
                  }}>
                    {study.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "16px" }}>
                    {[
                      { icon: <MapPin size={13} />, text: study.location || "Various Locations" },
                      { icon: <Building2 size={13} />, text: study.client || study.units || "Commercial" },
                      { icon: <Thermometer size={13} />, text: study.systemType || "HVAC System" },
                    ].map((m, idx) => (
                      <span key={idx} style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.8rem", color: BRAND.slate400 }}>
                        <span style={{ color: BRAND.primary }}>{m.icon}</span> {m.text}
                      </span>
                    ))}
                  </div>

                  <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", color: BRAND.dark, marginBottom: "20px", fontWeight: 700 }}>
                    {study.title || study.name}
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
                    {[{ label: "Project Details", text: study.description || study.challenge }].map(item => (
                      <div key={item.label}>
                        <h3 style={{ fontWeight: 700, color: BRAND.dark, fontSize: "0.875rem", marginBottom: "5px" }}>{item.label}</h3>
                        <p style={{ fontSize: "0.875rem", color: BRAND.slate400, lineHeight: 1.65 }}>{item.text}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 style={{ fontWeight: 700, color: BRAND.dark, fontSize: "0.875rem", marginBottom: "10px" }}>Key Results</h3>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      {(study.results || ["Successfully installed and commissioned", "On-time completion", "Energy-efficient operation"]).map((r: string, idx: number) => (
                        <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.82rem", color: BRAND.slate400 }}>
                          <span style={{ marginTop: "5px", width: "7px", height: "7px", borderRadius: "50%", background: BRAND.primary, flexShrink: 0, display: "block" }} />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: `1px solid ${BRAND.slate100}` }}>
                  <button onClick={() => generatePDF(study)}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "8px",
                      background: `linear-gradient(135deg, ${BRAND.dark}, ${BRAND.primary})`,
                      color: BRAND.white, padding: "11px 22px",
                      borderRadius: "10px", border: "none", cursor: "pointer",
                      fontWeight: 600, fontSize: "0.875rem",
                      boxShadow: `0 4px 14px ${BRAND.primary}48`,
                      transition: "all 0.2s", fontFamily: "'Inter', sans-serif"
                    }}>
                    <Download size={15} />
                    Download Project PDF
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CaseStudies;
