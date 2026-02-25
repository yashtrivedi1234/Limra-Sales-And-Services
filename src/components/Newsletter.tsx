import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Newsletter = () => {
  const [loading, setLoading] = useState(false);

  // ✅ Email validation regex
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();

    // 🔴 Frontend validation
    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      // 🟡 Handle duplicate email
      if (res.status === 409) {
        toast.warning(data.message || "Already subscribed");
        return;
      }

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // 🟢 Success
      toast.success("Subscribed successfully 🎉");
      e.target.reset();
    } catch (error) {
      toast.error(error.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-muted/50 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            Stay Updated with Latest HVAC Trends
          </h2>

          <p className="text-muted-foreground mb-8 text-lg">
            Subscribe to our newsletter for industry insights, product updates,
            maintenance tips, and exclusive offers.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto"
            onSubmit={handleSubmit}
          >
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all shadow-sm"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-accent text-accent-foreground font-bold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap shadow-sm disabled:opacity-60"
            >
              <span>{loading ? "Subscribing..." : "Subscribe"}</span>
              <Send size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;