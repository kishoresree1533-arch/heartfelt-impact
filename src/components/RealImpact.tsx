import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

import fwdImage1 from "../assets/fwd/633320.jpg";
import fwdImage2 from "../assets/fwd/633321.jpg";
import fwdImage3 from "../assets/fwd/633322.jpg";
import fwdImage4 from "../assets/fwd/633323.jpg";
import fwdImage5 from "../assets/fwd/633324.jpg";
import fwdImage6 from "../assets/fwd/633325.jpg";
import fwdImage7 from "../assets/fwd/633326.jpg";
import fwdImage8 from "../assets/fwd/633327.jpg";

const realWorkImages = [
  { src: fwdImage1, title: "Humanitarian Aid",            category: "Rural Development" },
  { src: fwdImage2, title: "Empowerment Program",         category: "Education" },
  { src: fwdImage3, title: "Mobile Medical Care",         category: "Healthcare" },
  { src: fwdImage4, title: "Nutritional Support",         category: "Community" },
  { src: fwdImage5, title: "Sustainable Living",          category: "Livelihood" },
  { src: fwdImage6, title: "Village Upliftment",          category: "Infrastructure" },
  { src: fwdImage7, title: "Skills & Vocational Training",category: "Social Change" },
  { src: fwdImage8, title: "Dignity & Support",           category: "Medical Care" },
];

const RealImpact = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const total = realWorkImages.length;
  const prev = () => setLightbox((i) => ((i ?? 0) - 1 + total) % total);
  const next = () => setLightbox((i) => ((i ?? 0) + 1) % total);

  return (
    <section id="real-impact" className="bg-[#faf8f5] pt-12 pb-12 md:pt-16 md:pb-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-8">
        <ScrollReveal>
          <p className="text-center text-sm uppercase tracking-[0.4em] text-gold">Real Actions</p>
          <h2 className="mt-4 text-center font-display text-4xl font-medium tracking-tight md:text-6xl text-primary">
            Our Work in the <span className="italic text-gold">Field</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-base font-normal text-muted-foreground">
            Transparency is at the heart of our mission. Explore authentic moments of change we are creating across Tamil Nadu.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {realWorkImages.map((work, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div
                className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-zoom-in"
                onClick={() => setLightbox(i)}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={work.src}
                    alt={work.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-400 flex items-center justify-center rounded-2xl">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                </div>
                {/* Gold corner accents */}
                <div className="absolute top-3 left-3 h-px w-0 bg-gold transition-all duration-500 group-hover:w-8 opacity-80" />
                <div className="absolute top-3 left-3 w-px h-0 bg-gold transition-all duration-500 group-hover:h-8 opacity-80" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-3xl w-full mx-6"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={realWorkImages[lightbox].src} alt={realWorkImages[lightbox].title} className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl" />
              {/* Gold corners */}
              <div className="absolute top-3 left-3 h-px w-10 bg-gold" /><div className="absolute top-3 left-3 w-px h-10 bg-gold" />
              <div className="absolute bottom-3 right-3 h-px w-10 bg-gold" /><div className="absolute bottom-3 right-3 w-px h-10 bg-gold" />
              {/* Caption */}
              <div className="absolute bottom-5 left-5 bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
                <p className="text-[9px] uppercase tracking-[0.4em] text-gold font-bold">{realWorkImages[lightbox].category}</p>
                <p className="text-sm text-white font-light">{realWorkImages[lightbox].title}</p>
              </div>
              {/* Counter */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full border border-white/20">
                {lightbox + 1} / {total}
              </div>
            </motion.div>
            <button onClick={() => setLightbox(null)} className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-gold hover:border-gold transition-all duration-300 z-10"><X className="h-5 w-5" /></button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-gold hover:border-gold transition-all duration-300"><ChevronLeft className="h-6 w-6" /></button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-gold hover:border-gold transition-all duration-300"><ChevronRight className="h-6 w-6" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RealImpact;
