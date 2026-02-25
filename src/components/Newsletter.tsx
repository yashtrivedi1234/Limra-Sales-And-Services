import { motion } from "framer-motion";
import { Send, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const COLORS = {
  navy: "#0B1F4B",
  blue: "#1D4ED8",
  blueLight: "#3B82F6",
  blueSky: "#DBEAFE",
  bluePale: "#EFF6FF",
  white: "#FFFFFF",
  slate50: "#F8FAFF",
  slate100: "#E8EFFF",
  slate200: "#C7D8F8",
  slate400: "#6B8AC7",
};

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Newsletter = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value.trim();

    if (!email) { toast.error("Email is required"); return; }
    if (!validateEmail(email)) { toast.error("Please enter a valid email"); return; }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.status === 409) { toast.warning(data.message || "Already subscribed"); return; }
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      toast.success("Subscribed successfully 🎉");
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      toast.error(error.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{
      padding: "80px 24px",
      background: COLORS.white,
      borderTop: `1px solid ${COLORS.slate100}`,
      borderBottom: `1px solid ${COLORS.slate100}`,
      fontFamily: "'DM Sans', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Background blobs */}
      <div style={{
        position: "absolute", top: "-80px", right: "-80px",
        width: "320px", height: "320px",
        background: "rgba(219,234,254,0.5)",
        borderRadius: "50%", filter: "blur(64px)", pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: "-80px", left: "-80px",
        width: "320px", height: "320px",
        background: "rgba(219,234,254,0.35)",
        borderRadius: "50%", filter: "blur(64px)", pointerEvents: "none"
      }} />

      <div style={{
        maxWidth: "640px", margin: "0 auto",
        textAlign: "center", position: "relative", zIndex: 10
      }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          {/* Icon */}
       

          {/* Pill */}
          <div style={{
            display: "inline-block",
            background: "rgba(29,78,216,0.1)", border: "1px solid rgba(29,78,216,0.25)",
            color: COLORS.blue, fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "5px 14px", borderRadius: "100px", marginBottom: "20px"
          }}>
            Newsletter
          </div>

          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            color: COLORS.navy, lineHeight: 1.15, marginBottom: "16px"
          }}>
            Stay Updated with Latest HVAC Trends
          </h2>

          <p style={{
            color: COLORS.slate400, fontSize: "1.05rem",
            lineHeight: 1.75, marginBottom: "36px", fontWeight: 300
          }}>
            Subscribe for industry insights, product updates, maintenance tips, and exclusive offers.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex", flexWrap: "wrap",
              gap: "10px", justifyContent: "center"
            }}
          >
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
              required
              style={{
                flex: "1 1 240px",
                padding: "13px 20px",
                borderRadius: "10px",
                border: `1.5px solid ${COLORS.slate200}`,
                background: COLORS.slate50,
                color: COLORS.navy,
                fontSize: "0.95rem",
                outline: "none",
                fontFamily: "'DM Sans', sans-serif",
                transition: "border-color 0.2s",
              }}
              onFocus={e => (e.target as HTMLElement).style.borderColor = COLORS.blue}
              onBlur={e => (e.target as HTMLElement).style.borderColor = COLORS.slate200}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "13px 28px",
                background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.blue} 100%)`,
                color: COLORS.white, fontWeight: 700, fontSize: "0.95rem",
                borderRadius: "10px", border: "none", cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.65 : 1,
                boxShadow: "0 8px 20px rgba(29,78,216,0.28)",
                whiteSpace: "nowrap",
                fontFamily: "'DM Sans', sans-serif",
                transition: "opacity 0.2s"
              }}
            >
              <span>{loading ? "Subscribing..." : "Subscribe"}</span>
              <Send size={17} />
            </button>
          </form>

          {/* Footer note */}
          <p style={{
            marginTop: "20px", fontSize: "0.78rem",
            color: COLORS.slate400, fontWeight: 500
          }}>
            No spam, ever. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;