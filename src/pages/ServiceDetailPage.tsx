import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Wrench, ShieldCheck, MapPin, Settings2, Wind,
  ArrowLeft, CheckCircle2, Star, Phone, Calendar,
  Shield, Zap, ArrowUpRight, Clock
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetServicesQuery } from "@/store/api";
import Loader from "@/components/ui/Loader";

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'ShieldCheck': return ShieldCheck;
    case 'MapPin': return MapPin;
    case 'Settings2': return Settings2;
    case 'Wind': return Wind;
    default: return Wrench;
  }
};

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: services = [], isLoading } = useGetServicesQuery();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (isLoading) return <Loader fullScreen />;

  const service = services.find((s: any) => s.slug === slug);

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="font-['DM_Sans',sans-serif] text-[rgba(8,42,69,0.48)]">Service not found.</p>
      </div>
    );
  }

  const Icon = renderIcon(service.icon);
  const hue = service.accentHue || "195";
  const hsl = `hsl(${hue}, 65%, 40%)`;
  const related = services.filter((s: any) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
      `}</style>
      <div className="min-h-screen relative overflow-x-hidden bg-[#F4FAFE] text-[#082A45] font-['DM_Sans',sans-serif] antialiased">
        <div
          className="fixed inset-0 opacity-[0.022] pointer-events-none z-[1]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")' }}
        />

        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        <div
          className="fixed -top-[200px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none z-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(186,230,253,0.35) 0%, transparent 70%)' }}
        />

        <div className="relative z-[2] max-w-[1200px] mx-auto px-6 pb-[100px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >

            <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12 items-start mb-[72px] mt-[45px]">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full py-[5px] px-4 text-[0.68rem] font-semibold tracking-[0.12em] uppercase mb-5 bg-[#E8F6FC] border border-[rgba(6,149,205,0.12)] text-[#0E3D5E]">
                  <Icon size={12} color={hsl} />
                  <span style={{ color: hsl }}>{service.badge}</span>
                </div>

                <h1 className="font-['DM_Serif_Display',serif] text-[clamp(2.4rem,5vw,3.6rem)] font-normal tracking-[-0.01em] leading-[1.1] mb-3 text-[#082A45]">{service.title}</h1>
                <p className="text-[#0695CD] font-semibold text-[0.9rem] uppercase tracking-[0.06em] mb-[22px]">{service.tagline}</p>
                <p className="text-[#0E3D5E] text-base leading-[1.85] max-w-[560px] mb-[36px] font-normal">{service.longDesc}</p>

                <div className="flex flex-wrap gap-5 items-center">
                  <div className="flex items-center gap-[7px] text-[0.88rem] text-[#0E3D5E]">
                    <Star size={15} color="#d97706" fill="#d97706" />
                    <strong className="font-['DM_Serif_Display',serif] font-normal">{service.rating}</strong>
                    <span className="text-[rgba(8,42,69,0.48)] text-[0.83rem]">({service.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-[7px] text-[0.88rem] text-[#0E3D5E]">
                    <Clock size={14} color="#0695CD" />
                    <span className="text-[rgba(8,42,69,0.48)]">{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-[7px] text-[0.88rem] text-[#0E3D5E]">
                    <Zap size={14} color="#0695CD" />
                    <strong className="font-['DM_Serif_Display',serif] font-normal">{service.price}</strong>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-[#ffffff] border border-[rgba(6,149,205,0.12)] rounded-[20px] py-8 px-7 shadow-[0_4px_12px_rgba(6,149,205,0.08),0_2px_4px_rgba(6,149,205,0.04)] sticky top-6 mt-[45px]"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="font-['DM_Serif_Display',serif] text-[2rem] font-normal text-[#082A45] mb-1">{service.price}</div>
                <div className="text-[rgba(8,42,69,0.48)] text-[0.82rem] mb-7">{service.duration}</div>

                <a href={`/book?service=${service.slug}`} className="flex items-center justify-center gap-2 w-full p-[15px] rounded-xl bg-[#0695CD] text-[#ffffff] font-semibold text-[0.93rem] font-['DM_Sans',sans-serif] border-none cursor-pointer mb-2.5 shadow-[0_4px_14px_rgba(3,105,161,0.25)] transition-all duration-200 no-underline hover:bg-[#0284c7] hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(3,105,161,0.3)]">
                  <Calendar size={15} /> Book Now
                </a>
                <a href="tel:+919236477974" className="flex items-center justify-center gap-2 w-full p-[14px] rounded-xl bg-[#E8F6FC] text-[#082A45] font-medium text-[0.88rem] font-['DM_Sans',sans-serif] border border-[rgba(6,149,205,0.12)] cursor-pointer transition-all duration-200 no-underline hover:bg-[#daeefa] hover:border-[rgba(6,149,205,0.25)]">
                  <Phone size={14} /> Call Us
                </a>

                <div className="mt-6 pt-5 border-t border-[rgba(6,149,205,0.12)]">
                  {[
                    { icon: Shield, text: "Certified technicians" },
                    { icon: Star, text: "Satisfaction guarantee" },
                  ].map(({ icon: I, text }) => (
                    <div key={text} className="flex items-center gap-[9px] mb-2.5 text-[rgba(8,42,69,0.48)] text-[0.82rem]">
                      <I size={13} color="#0695CD" />
                      {text}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="mb-[72px]">
              <h2 className="font-['DM_Serif_Display',serif] text-[1.7rem] font-normal tracking-[-0.01em] mb-8 text-[#082A45] flex items-center gap-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-[rgba(6,149,205,0.12)]">What's Included</h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-3">
                {service.highlights?.map((h: string, i: number) => (
                  <motion.div
                    key={h}
                    className="flex items-center gap-[14px] py-4 px-5 rounded-[14px] bg-[#ffffff] border border-[rgba(6,149,205,0.12)] shadow-[0_1px_3px_rgba(6,149,205,0.06),0_1px_2px_rgba(6,149,205,0.04)]"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <div className="w-7 h-7 rounded-full bg-[#E8F6FC] border border-[#B3E0F2] flex items-center justify-center shrink-0">
                      <CheckCircle2 size={14} color="#0695CD" />
                    </div>
                    <span className="text-[0.88rem] font-medium text-[#0E3D5E]">{h}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mb-[72px]">
              <h2 className="font-['DM_Serif_Display',serif] text-[1.7rem] font-normal tracking-[-0.01em] mb-8 text-[#082A45] flex items-center gap-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-[rgba(6,149,205,0.12)]">How It Works</h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
                {service.process?.map((p: any, i: number) => (
                  <motion.div
                    key={p.step}
                    className="p-6 rounded-[18px] bg-[#ffffff] border border-[rgba(6,149,205,0.12)] relative overflow-hidden shadow-[0_1px_3px_rgba(6,149,205,0.06),0_1px_2px_rgba(6,149,205,0.04)] transition-all duration-200 hover:shadow-[0_4px_12px_rgba(6,149,205,0.08),0_2px_4px_rgba(6,149,205,0.04)] hover:border-[rgba(6,149,205,0.25)]"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <div className="absolute top-3 right-4 font-['DM_Serif_Display',serif] text-[3.5rem] font-normal text-[rgba(0,0,0,0.04)] leading-none select-none">{p.step}</div>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#E8F6FC] border border-[#B3E0F2] mb-3.5 text-[0.7rem] font-bold text-[#0695CD] font-['DM_Sans',sans-serif] tracking-[0.04em]">{p.step}</div>
                    <h4 className="font-['DM_Serif_Display',serif] text-base font-normal mb-2 text-[#082A45]">{p.title}</h4>
                    <p className="text-[rgba(8,42,69,0.48)] text-[0.85rem] leading-[1.75]">{p.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mb-[72px]">
              <h2 className="font-['DM_Serif_Display',serif] text-[1.7rem] font-normal tracking-[-0.01em] mb-8 text-[#082A45] flex items-center gap-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-[rgba(6,149,205,0.12)]">Other Services</h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3">
                {related.map((s: any, i: number) => {
                  const RelIcon = renderIcon(s.icon);
                  return (
                    <motion.div
                      key={s.slug}
                      className="flex items-center gap-4 py-[18px] px-5 rounded-[16px] bg-[#ffffff] border border-[rgba(6,149,205,0.12)] cursor-pointer transition-all duration-300 shadow-[0_1px_3px_rgba(6,149,205,0.06),0_1px_2px_rgba(6,149,205,0.04)] hover:border-[rgba(3,105,161,0.3)] hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(6,149,205,0.08),0_2px_4px_rgba(6,149,205,0.04)]"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      onClick={() => navigate(`/service/${s.slug}`)}
                    >
                      <div className="w-11 h-11 rounded-xl bg-[#E8F6FC] border border-[#B3E0F2] flex items-center justify-center shrink-0">
                        <RelIcon size={18} color="#0695CD" />
                      </div>
                      <div className="flex-1">
                        <div className="font-['DM_Serif_Display',serif] font-normal text-[0.95rem] mb-[2px] text-[#082A45]">{s.title}</div>
                        <div className="text-[rgba(8,42,69,0.48)] text-[0.78rem]">{s.price}</div>
                      </div>
                      <ArrowUpRight size={15} color="#0695CD" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}