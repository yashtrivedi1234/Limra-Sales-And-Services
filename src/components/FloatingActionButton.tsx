import { useState } from "react";
import { Phone, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingActionButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <>
            <motion.a
              key="whatsapp"
              initial={{ opacity: 0, y: 20, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.5 }}
              transition={{ delay: 0.05 }}
              href="https://wa.me/919839171701"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 w-12 rounded-full bg-[hsl(145,63%,42%)] text-primary-foreground shadow-lg flex items-center justify-center hover:bg-[hsl(145,63%,36%)] transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={22} />
            </motion.a>
            <motion.a
              key="call"
              initial={{ opacity: 0, y: 20, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.5 }}
              href="tel:+919839171701"
              className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
              aria-label="Call"
            >
              <Phone size={22} />
            </motion.a>
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="h-14 w-14 rounded-full bg-accent text-white shadow-xl flex items-center justify-center hover:shadow-2xl transition-shadow"
        animate={{ rotate: open ? 45 : 0 }}
        aria-label="Contact options"
      >
        {open ? <X size={26} /> : <MessageCircle size={26} />}
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;
