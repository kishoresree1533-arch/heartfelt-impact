import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

import dsc1 from "@/assets/fwd/DSC gallery images/DSC_0123.JPG.jpeg";
import dsc2 from "@/assets/fwd/DSC gallery images/DSC_0129.JPG.jpeg";
import dsc3 from "@/assets/fwd/DSC gallery images/DSC_0141.JPG.jpeg";
import dsc4 from "@/assets/fwd/DSC gallery images/DSC_0190.JPG.jpeg";
import img1 from "@/assets/fwd/DSC gallery images/IMG_20250929_233351.jpg.jpeg";
import img2 from "@/assets/fwd/DSC gallery images/IMG_20250929_233504.jpg.jpeg";
import img3 from "@/assets/fwd/DSC gallery images/IMG_20250929_233629.jpg.jpeg";
import img4 from "@/assets/fwd/DSC gallery images/IMG_20250929_233642.jpg.jpeg";
import img5 from "@/assets/fwd/DSC gallery images/IMG_20250929_233803.jpg.jpeg";
import gal1 from "@/assets/gallery image/IMG_20260326_124213.jpg - Copy.jpeg";
import gal2 from "@/assets/gallery image/IMG_20260326_124227.jpg.jpeg";
import gal3 from "@/assets/gallery image/IMG_20260326_124237.jpg.jpeg";
import gal4 from "@/assets/gallery image/IMG_20260326_124248.jpg.jpeg";
import donorDay1 from "@/assets/gallery image/world_blood_donor_day_1.jpg";
import donorDay2 from "@/assets/gallery image/world_blood_donor_day_2.jpg";

const photos = [
  { src: dsc1, span: "row-span-2", delay: 0    },
  { src: dsc2, span: "",           delay: 0.08  },
  { src: dsc3, span: "",           delay: 0.12  },
  { src: dsc4, span: "row-span-2", delay: 0.06  },
  { src: img1, span: "",           delay: 0.16  },
  { src: img2, span: "",           delay: 0.20  },
  { src: img3, span: "",           delay: 0.14  },
  { src: img4, span: "",           delay: 0.18  },
  { src: img5, span: "",           delay: 0.22  },
  { src: gal1, span: "row-span-2", delay: 0.10  },
  { src: gal2, span: "",           delay: 0.24  },
  { src: gal3, span: "",           delay: 0.26  },
  { src: gal4, span: "",           delay: 0.28  },
  { src: donorDay1, span: "row-span-2", delay: 0.15 },
  { src: donorDay2, span: "",           delay: 0.30 },
];

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const total = photos.length;
  const prev = () => setLightbox((i) => ((i ?? 0) - 1 + total) % total);
  const next = () => setLightbox((i) => ((i ?? 0) + 1) % total);

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-14">
            <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold mb-4">Captures of Care</p>
            <h2 className="font-display text-4xl font-medium text-primary md:text-6xl leading-tight">
              Moments of <span className="italic text-gold">Transformation</span>
            </h2>
            <div className="mt-6 h-px w-14 bg-gold/40" />
            <p className="mt-6 text-base font-normal text-muted-foreground max-w-lg">
              Every photograph is a testament to resilience, compassion, and the quiet dignity of lives being changed — one moment at a time.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] gap-3">
          {photos.map((photo, i) => (
            <ScrollReveal key={i} delay={photo.delay} direction="none" className={`${photo.span} h-full`}>
              <div
                className="group relative overflow-hidden rounded-2xl h-full shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-zoom-in"
                onClick={() => setLightbox(i)}
              >
                <img src={photo.src} alt="" className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500 rounded-2xl flex items-center justify-center">
                  <ZoomIn className="h-7 w-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                </div>
                <div className="absolute top-3 left-3 h-px w-0 bg-gold transition-all duration-500 group-hover:w-8 opacity-80" />
                <div className="absolute top-3 left-3 w-px h-0 bg-gold transition-all duration-500 group-hover:h-8 opacity-80" />
                <div className="absolute bottom-3 right-3 h-px w-0 bg-gold transition-all duration-500 group-hover:w-8 opacity-80" />
                <div className="absolute bottom-3 right-3 w-px h-0 bg-gold transition-all duration-500 group-hover:h-8 opacity-80" />
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
              className="relative max-w-5xl w-full mx-6"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={photos[lightbox].src} alt="" className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl" />

              {/* Gold corner accents */}
              <div className="absolute top-3 left-3 h-px w-10 bg-gold" /><div className="absolute top-3 left-3 w-px h-10 bg-gold" />
              <div className="absolute bottom-3 right-3 h-px w-10 bg-gold" /><div className="absolute bottom-3 right-3 w-px h-10 bg-gold" />

              {/* Counter */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full border border-white/20">
                {lightbox + 1} / {total}
              </div>

              {/* Close button — inside the image frame, top-right */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm border border-white/30 text-white hover:bg-gold hover:border-gold transition-all duration-300 z-20"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>

            {/* Prev / Next */}
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-gold hover:border-gold transition-all duration-300"><ChevronLeft className="h-6 w-6" /></button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-gold hover:border-gold transition-all duration-300"><ChevronRight className="h-6 w-6" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
