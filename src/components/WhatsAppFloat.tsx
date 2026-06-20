import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919952840455";
const WHATSAPP_MESSAGE = "Hello! I visited your website and would like to know more about Irai Thuligal Movement.";

const WhatsAppFloat = () => {
  const [tooltip, setTooltip] = useState(true);

  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">

      {/* Tooltip bubble */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            className="relative flex items-center gap-2 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 pr-8 max-w-[220px]"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-800 leading-snug">Chat with us!</span>
              <span className="text-[10px] text-gray-400 mt-0.5">We reply instantly on WhatsApp</span>
            </div>
            {/* Close tooltip */}
            <button
              onClick={(e) => { e.stopPropagation(); setTooltip(false); }}
              className="absolute top-1.5 right-1.5 text-gray-300 hover:text-gray-500 transition-colors"
              aria-label="Close"
            >
              <X className="h-3 w-3" />
            </button>
            {/* Tail */}
            <div className="absolute -bottom-2 right-6 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp button */}
      <motion.button
        onClick={handleClick}
        className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl bg-[#25D366] hover:bg-[#20c25c] transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.5, type: "spring", stiffness: 200 }}
        aria-label="Chat on WhatsApp"
      >
        {/* Ping ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 32 32"
          className="h-7 w-7 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.003 2.667C8.639 2.667 2.667 8.638 2.667 16c0 2.338.633 4.617 1.833 6.609L2.667 29.333l6.896-1.807A13.275 13.275 0 0 0 16.003 29.333c7.364 0 13.33-5.971 13.33-13.333 0-7.362-5.966-13.333-13.33-13.333zm0 24.267a11.1 11.1 0 0 1-5.658-1.549l-.406-.24-4.093 1.073 1.093-3.987-.264-.41A11.069 11.069 0 0 1 4.934 16c0-6.106 4.963-11.067 11.069-11.067S27.072 9.894 27.072 16c0 6.107-4.963 11.067-11.069 11.067v-.133zm6.07-8.283c-.333-.167-1.967-.97-2.271-1.082-.303-.111-.524-.167-.744.167-.22.333-.855 1.082-1.048 1.303-.193.22-.387.25-.72.083-.333-.167-1.407-.518-2.68-1.651-.99-.882-1.659-1.971-1.854-2.304-.193-.333-.02-.513.146-.679.15-.149.333-.389.5-.583.167-.194.222-.333.333-.556.111-.222.056-.417-.028-.583-.083-.167-.744-1.796-1.02-2.458-.268-.644-.54-.556-.744-.566l-.633-.011c-.222 0-.583.083-.889.417-.305.333-1.166 1.138-1.166 2.774s1.194 3.219 1.36 3.44c.167.222 2.348 3.584 5.689 5.027.795.343 1.415.548 1.899.702.798.253 1.525.218 2.1.132.64-.096 1.967-.805 2.244-1.582.278-.777.278-1.443.194-1.582-.083-.14-.305-.222-.638-.389z" />
        </svg>
      </motion.button>
    </div>
  );
};

export default WhatsAppFloat;
