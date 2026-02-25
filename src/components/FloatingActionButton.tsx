import { useState } from "react";
import { Phone, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = {
  navy: "#0B1F4B",
  blue: "#1D4ED8",
  blueLight: "#3B82F6",
  white: "#FFFFFF",
  whatsapp: "#25D366",
  whatsappDark: "#1ebe5d",
};

const FloatingActionButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      position: "fixed", bottom: "24px", right: "24px",
      zIndex: 50, display: "flex", flexDirection: "column",
      alignItems: "flex-end", gap: "12px",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <AnimatePresence>
        {open && (
          <>
            {/* WhatsApp */}
            <motion.a
              key="whatsapp"
              initial={{ opacity: 0, y: 16, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.05 }}
              href="https://wa.me/919839171701"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              style={{
                width: "50px", height: "50px", borderRadius: "50%",
                background: COLORS.whatsapp,
                color: COLORS.white, textDecoration: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 6px 20px rgba(37,211,102,0.45)",
                transition: "background 0.2s, transform 0.2s",
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.93 }}
            >
              <MessageCircle size={22} />
            </motion.a>

            {/* Call */}
            <motion.a
              key="call"
              initial={{ opacity: 0, y: 16, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              href="tel:+919839171701"
              aria-label="Call"
              style={{
                width: "50px", height: "50px", borderRadius: "50%",
                background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.blue} 100%)`,
                color: COLORS.white, textDecoration: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 6px 20px rgba(29,78,216,0.4)",
                transition: "box-shadow 0.2s",
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.93 }}
            >
              <Phone size={21} />
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setOpen(!open)}
        aria-label="Contact options"
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        style={{
          width: "58px", height: "58px", borderRadius: "50%",
          background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.blueLight} 100%)`,
          color: COLORS.white, border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: open
            ? "0 8px 32px rgba(29,78,216,0.5)"
            : "0 8px 28px rgba(29,78,216,0.38)",
          transition: "box-shadow 0.3s",
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.18 }}
              style={{ display: "flex" }}
            >
              <X size={26} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -45 }}
              transition={{ duration: 0.18 }}
              style={{ display: "flex" }}
            >
              <MessageCircle size={26} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;