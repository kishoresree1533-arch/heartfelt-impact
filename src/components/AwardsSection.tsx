import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Trophy, Star, Award, Medal, BadgeCheck, Ribbon, X, ChevronLeft, ChevronRight } from "lucide-react";

// Reuse the same DSC gallery images
import dsc1 from "@/assets/fwd/DSC gallery images/DSC_0123.JPG.jpeg";
import dsc2 from "@/assets/fwd/DSC gallery images/DSC_0129.JPG.jpeg";
import dsc3 from "@/assets/fwd/DSC gallery images/DSC_0141.JPG.jpeg";
import dsc4 from "@/assets/fwd/DSC gallery images/DSC_0190.JPG.jpeg";
import img1 from "@/assets/fwd/DSC gallery images/IMG_20250929_233351.jpg.jpeg";
import img2 from "@/assets/fwd/DSC gallery images/IMG_20250929_233504.jpg.jpeg";

const awards = [
  {
    icon: Trophy,
    from: "Government Authority",
    title: "Excellence in Social Service",
    year: "2023",
  },
  {
    icon: Medal,
    from: "District Administration",
    title: "Outstanding Humanitarian Initiative",
    year: "2022",
  },
  {
    icon: Star,
    from: "Community Leaders",
    title: "Blood Donation Champion Award",
    year: "2022",
  },
  {
    icon: Award,
    from: "State NGO Council",
    title: "Best Volunteer Organisation",
    year: "2023",
  },
  {
    icon: BadgeCheck,
    from: "Health Department",
    title: "Lifesaving Service Recognition",
    year: "2024",
  },
  {
    icon: Ribbon,
    from: "Civil Society Forum",
    title: "5 Years of Dedicated Service",
    year: "2026",
  },
];

const galleryImages = [dsc1, dsc2, dsc3, dsc4, img1, img2];

const AwardsSection = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((i) => ((i ?? 0) - 1 + galleryImages.length) % galleryImages.length);
  const next = () => setLightbox((i) => ((i ?? 0) + 1) % galleryImages.length);
  return (
    <section className="relative bg-[#faf8f5] py-16 md:py-24 overflow-hidden">

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-100/60 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-8">

        {/* ── Header ── */}
        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-12 items-end mb-16 md:mb-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold mb-5">
                Recognition & Honours
              </p>
              <h2 className="font-display text-4xl font-medium text-primary md:text-6xl leading-[1.05]">
                Five Years of <br />
                <span className="italic text-gold">Recognised Service</span>
              </h2>
            </div>
            <div className="lg:pl-10 lg:border-l border-border">
              <p className="text-base font-light leading-relaxed text-muted-foreground max-w-md">
                Over the past five years, the Irai Thuligal Movement has been
                actively serving society through blood donation support and various
                humanitarian initiatives. In recognition of our dedicated service
                and social commitment, we have been honored with numerous awards
                and appreciations from government authorities, organisations, and
                community leaders. These recognitions inspire us to continue our
                mission with greater dedication and compassion.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Main layout: award cards left + photo collage right ── */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Award cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {awards.map((award, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="up">
                <div className="group relative flex flex-col h-full rounded-2xl border border-border bg-white px-6 py-6 shadow-sm hover:shadow-xl hover:border-gold/40 hover:-translate-y-1 transition-all duration-500 overflow-hidden">

                  {/* Top colour bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon + year row */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 border border-gold/20 group-hover:bg-gold/20 transition-all duration-400 group-hover:scale-110">
                      <award.icon className="h-5 w-5 text-gold" />
                    </div>
                    <span className="font-display text-3xl font-medium text-primary/[0.06] leading-none select-none">
                      {award.year}
                    </span>
                  </div>

                  {/* From */}
                  <p className="text-[9px] uppercase tracking-[0.45em] text-gold font-bold mb-2">
                    {award.from}
                  </p>

                  {/* Title */}
                  <h3 className="font-display text-base text-primary leading-snug group-hover:text-gold transition-colors duration-400">
                    {award.title}
                  </h3>

                  {/* Bottom sweep */}
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-700 group-hover:w-full opacity-40" />
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Photo collage */}
          <ScrollReveal direction="right" delay={0.1}>
            <div className="grid grid-cols-2 gap-3">
              {/* Large image spanning 2 rows */}
              <div
                className="row-span-2 group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 cursor-zoom-in"
                onClick={() => openLightbox(0)}
              >
                <img
                  src={galleryImages[0]}
                  alt="Award ceremony"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ minHeight: "300px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-400 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/40">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                  </span>
                </div>
                {/* Gold corner */}
                <div className="absolute top-3 left-3 h-px w-8 bg-gold opacity-70" />
                <div className="absolute top-3 left-3 w-px h-8 bg-gold opacity-70" />
              </div>

              {/* Smaller images */}
              {galleryImages.slice(1, 5).map((src, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 cursor-zoom-in"
                  onClick={() => openLightbox(i + 1)}
                >
                  <img
                    src={src}
                    alt="Recognition moment"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ minHeight: "140px" }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-400 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/40">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom quote strip */}
            <motion.div
              className="mt-4 rounded-2xl border border-gold/25 bg-amber-50/80 px-6 py-5 flex items-center gap-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Trophy className="h-8 w-8 text-gold shrink-0" />
              <div>
                <p className="font-display text-base italic text-primary/80 leading-snug">
                  "These recognitions inspire us to serve humanity with greater
                  dedication and compassion."
                </p>
                <p className="text-[9px] uppercase tracking-[0.4em] text-gold font-bold mt-2">
                  — Irai Thuligal Movement
                </p>
              </div>
            </motion.div>
          </ScrollReveal>

        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Image */}
            <motion.div
              className="relative max-w-5xl max-h-[90vh] w-full mx-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[lightbox]}
                alt="Award"
                className="w-full h-full object-contain rounded-2xl shadow-2xl max-h-[80vh]"
              />

              {/* Gold corner accents */}
              <div className="absolute top-3 left-3 h-px w-10 bg-gold" />
              <div className="absolute top-3 left-3 w-px h-10 bg-gold" />
              <div className="absolute bottom-3 right-3 h-px w-10 bg-gold" />
              <div className="absolute bottom-3 right-3 w-px h-10 bg-gold" />

              {/* Counter */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full border border-white/20">
                {lightbox + 1} / {galleryImages.length}
              </div>
            </motion.div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-gold hover:border-gold transition-all duration-300 z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-gold hover:border-gold transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-gold hover:border-gold transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default AwardsSection;
