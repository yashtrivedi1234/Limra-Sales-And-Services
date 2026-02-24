import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Wind,
  MapPin,
  Clock,
  CheckCircle,
  Thermometer,
  Zap,
  ArrowRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type ServiceOption = { id: string; label: string; icon: React.ReactNode };
type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const services: ServiceOption[] = [
  { id: "residential", label: "Residential AC", icon: <Wind size={15} /> },
  { id: "commercial", label: "Commercial HVAC", icon: <Zap size={15} /> },
  { id: "vrv", label: "VRV / VRF Systems", icon: <Thermometer size={15} /> },
  { id: "amc", label: "Service & AMC", icon: <CheckCircle size={15} /> },
  { id: "chiller", label: "Chiller Systems", icon: <Wind size={15} /> },
  { id: "other", label: "Other", icon: <MessageSquare size={15} /> },
];

const contactDetails = [
  {
    icon: <Phone size={20} />,
    label: "Call Us",
    value: "+91 98391 71701",
    sub: "Mon–Sat, 9am–7pm",
  },
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "info@limraservices.com",
    sub: "Reply within 24 hrs",
  },
  {
    icon: <MapPin size={20} />,
    label: "Visit",
    value: "Bareilly, Uttar Pradesh",
    sub: "Serving all of UP",
  },
  {
    icon: <Clock size={20} />,
    label: "Hours",
    value: "9:00 AM – 7:00 PM",
    sub: "Monday to Saturday",
  },
];

// ─── Field ────────────────────────────────────────────────────────────────────
const Field = ({
  id,
  label,
  type = "text",
  icon,
  value,
  onChange,
  required = false,
}: {
  id: string;
  label: string;
  type?: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300"
        style={{
          boxShadow: focused
            ? "0 0 0 2px #3b82f6, 0 0 20px 2px rgba(59,130,246,0.15)"
            : "0 0 0 1.5px rgba(203,213,225,1)",
        }}
      />
      <span
        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 z-10 ${focused ? "text-blue-600" : "text-slate-400"}`}
      >
        {icon}
      </span>
      <label
        htmlFor={id}
        className={`absolute left-12 z-10 pointer-events-none font-semibold transition-all duration-200 ${
          active
            ? "top-2.5 text-[10px] tracking-[0.12em] uppercase text-blue-600"
            : "top-1/2 -translate-y-1/2 text-sm text-slate-500"
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full rounded-xl pl-12 pr-4 pt-7 pb-3 text-sm text-slate-900 outline-none caret-blue-600"
        style={{ background: "#ffffff" }}
      />
    </div>
  );
};

// ─── TextareaField ────────────────────────────────────────────────────────────
const TextareaField = ({
  id,
  label,
  icon,
  value,
  onChange,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300"
        style={{
          boxShadow: focused
            ? "0 0 0 2px #3b82f6, 0 0 20px 2px rgba(59,130,246,0.15)"
            : "0 0 0 1.5px rgba(203,213,225,1)",
        }}
      />
      <span
        className={`absolute left-4 top-5 transition-colors duration-200 z-10 ${focused ? "text-blue-600" : "text-slate-400"}`}
      >
        {icon}
      </span>
      <label
        htmlFor={id}
        className={`absolute left-12 z-10 pointer-events-none font-semibold transition-all duration-200 ${
          active
            ? "top-3 text-[10px] tracking-[0.12em] uppercase text-blue-600"
            : "top-5 text-sm text-slate-500"
        }`}
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full rounded-xl pl-12 pr-4 pt-8 pb-4 text-sm text-slate-900 outline-none caret-blue-600 resize-none"
        style={{ background: "#ffffff" }}
      />
    </div>
  );
};

// ─── ServicePicker ────────────────────────────────────────────────────────────
const ServicePicker = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <p className="text-[10px] tracking-[0.14em] uppercase text-slate-500 mb-3 font-bold pl-0.5">
      Select Service
    </p>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
      {services.map((s) => {
        const sel = value === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onChange(sel ? "" : s.id)}
            className="relative flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: sel
                ? "rgba(59,130,246,0.1)"
                : "rgba(255,255,255,1)",
              border: sel
                ? "1.5px solid #3b82f6"
                : "1.5px solid rgba(203,213,225,1)",
              color: sel ? "#1d4ed8" : "#64748b",
              boxShadow: sel ? "0 4px 12px rgba(59,130,246,0.12)" : "none",
            }}
          >
            <span className={sel ? "text-blue-600" : "text-slate-400"}>
              {s.icon}
            </span>
            {s.label}
            {sel && (
              <motion.span
                layoutId="dot"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-600"
              />
            )}
          </button>
        );
      })}
    </div>
  </div>
);

// ─── Success ──────────────────────────────────────────────────────────────────
const SuccessScreen = ({ onReset }: { onReset: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="flex flex-col items-center justify-center text-center py-20 px-8"
  >
    <div className="relative mb-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
        className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(59,130,246,0.1)",
          border: "2px solid rgba(59,130,246,0.3)",
        }}
      >
        <CheckCircle size={44} className="text-blue-600" />
      </motion.div>
    </div>
    <motion.h3
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="text-3xl font-black text-slate-900 mb-3"
    >
      Message Received!
    </motion.h3>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.55 }}
      className="text-slate-600 mb-10 max-w-xs leading-relaxed text-sm"
    >
      Our expert team will reach out within 24 hours to discuss your HVAC
      requirements.
    </motion.p>
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.65 }}
      onClick={onReset}
      className="text-sm text-blue-600 hover:text-blue-700 font-bold underline underline-offset-4 transition-colors"
    >
      Send another message →
    </motion.button>
  </motion.div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ContactUs() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof FormState) => (v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  const reset = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const canSubmit = !loading && form.name.trim() && form.email.trim();

  return (
    <div className="min-h-screen font-sans" style={{ background: "#f8fafc" }}>
      {/* ── Background Decoration ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(2,132,199,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(59,130,246,0.15) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mt-4">
            Let's Build Your
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Perfect Climate.
            </span>
          </h1>
          <p className="text-slate-600 text-lg max-w-lg mx-auto leading-relaxed mt-4">
            9+ years of HVAC expertise. Tell us what you need and we'll take
            care of the rest.
          </p>
        </motion.div>

        {/* ── Layout ── */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* LEFT */}
          <motion.aside
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Contact details */}
            <div
              className="rounded-2xl p-6 bg-white"
              style={{
                border: "1px solid rgba(203,213,225,0.6)",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.03)",
              }}
            >
              <h2 className="text-slate-900 font-bold text-base mb-6">
                Contact Details
              </h2>
              <div className="space-y-6">
                {contactDetails.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-blue-600"
                      style={{
                        background: "rgba(59,130,246,0.08)",
                        border: "1px solid rgba(59,130,246,0.15)",
                      }}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-slate-400 font-bold mb-0.5">
                        {c.label}
                      </p>
                      <p className="text-slate-900 text-sm font-bold leading-snug">
                        {c.value}
                      </p>
                      <p className="text-slate-500 text-xs">{c.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div
              className="rounded-2xl p-6 bg-white"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
                border: "1px solid rgba(59,130,246,0.15)",
              }}
            >
              <p className="text-[10px] tracking-widest uppercase text-blue-600 font-bold mb-4">
                Authorized Dealers
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "Daikin", "Mitsubishi", "Carrier", "Midea", "Hitachi", "Blue Star"
                ].map((b) => (
                  <span
                    key={b}
                    className="px-3 py-1 rounded-full text-xs font-semibold text-blue-700 bg-white border border-blue-100 shadow-sm"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">
                Authorized partner for sales & service — your factory warranty is
                always guaranteed.
              </p>
            </div>

            {/* Trust */}
            <div
              className="rounded-2xl p-5 bg-white space-y-3"
              style={{
                border: "1px solid rgba(203,213,225,0.4)",
              }}
            >
              {[
                "5000+ satisfied clients across UP",
                "Response guaranteed within 24 hours",
                "Free site inspection for commercial projects",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2.5">
                  <CheckCircle size={14} className="text-blue-500 shrink-0" />
                  <span className="text-slate-600 text-xs font-medium">{t}</span>
                </div>
              ))}
            </div>
          </motion.aside>

          {/* RIGHT: Form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 rounded-2xl bg-white"
            style={{
              border: "1px solid rgba(203,213,225,0.6)",
              boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05)",
            }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessScreen key="success" onReset={reset} />
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="p-6 sm:p-10"
                >
                  <div className="mb-8">
                    <h2 className="text-slate-900 font-black text-2xl mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Describe your needs and a real expert will call you back.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field
                        id="name"
                        label="Full Name"
                        icon={<User size={16} />}
                        value={form.name}
                        onChange={set("name")}
                        required
                      />
                      <Field
                        id="phone"
                        label="Phone Number"
                        type="tel"
                        icon={<Phone size={16} />}
                        value={form.phone}
                        onChange={set("phone")}
                      />
                    </div>

                    <Field
                      id="email"
                      label="Email Address"
                      type="email"
                      icon={<Mail size={16} />}
                      value={form.email}
                      onChange={set("email")}
                      required
                    />

                    <ServicePicker
                      value={form.service}
                      onChange={set("service")}
                    />

                    <TextareaField
                      id="message"
                      label="Describe your project…"
                      icon={<MessageSquare size={16} />}
                      value={form.message}
                      onChange={set("message")}
                    />

                    {/* Submit btn */}
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="group relative w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-sm text-white tracking-wide overflow-hidden transition-all duration-300 mt-2"
                      style={{
                        background: canSubmit
                          ? "linear-gradient(135deg,#1d4ed8 0%,#3b82f6 100%)"
                          : "#cbd5e1",
                        boxShadow: canSubmit
                          ? "0 10px 20px -5px rgba(59,130,246,0.4)"
                          : "none",
                        cursor: canSubmit ? "pointer" : "not-allowed",
                      }}
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white"
                        />
                      ) : (
                        <>
                          <Send size={16} className="group-hover:translate-x-0.5 transition-transform" />
                          <span>Send Message — Free Consultation</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-slate-400 pt-2">
                      Privacy First: We never share your contact details with 3rd parties.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}