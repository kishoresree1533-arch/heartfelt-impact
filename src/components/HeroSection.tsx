import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/premium_hero_tamil.png";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with slow zoom */}
      <div className="absolute inset-0 bg-primary z-0">
        <img
          src={heroImage}
          alt="Emotional cinematic moment"
          className="h-full w-full object-cover animate-slow-zoom"
          width={1920}
          height={1080}
        />
        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/60 via-transparent to-black/70 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="overflow-hidden">
          <motion.p
            className="mb-8 text-xs font-body tracking-[0.5em] uppercase text-gold-light"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Since 2021 — A Legacy of Care
          </motion.p>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            className="mb-6 max-w-5xl text-4xl font-display font-medium leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Changing Lives <br />
            <span className="font-display italic text-gold-light">One Story at a Time</span>
          </motion.h1>
        </div>

        <motion.p
          className="max-w-xl text-lg font-light leading-relaxed text-white/70 md:text-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          We provide more than just aid; we provide a future. <br />
          Join us in rewriting the narrative for thousands across Tamil Nadu.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col items-center gap-6 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <a
            href="#donate"
            className="group relative overflow-hidden bg-gold px-12 py-5 text-[10px] font-bold uppercase tracking-[0.5em] text-primary transition-all duration-700 hover:scale-105 hover:bg-white rounded-full shadow-lg hover:shadow-gold/20"
          >
            <span className="relative z-10 transition-colors duration-700 group-hover:text-black">Donate Now</span>
            <div className="absolute inset-0 -translate-x-full bg-white transition-transform duration-700 group-hover:translate-x-0" />
          </a>
          <a
            href="#story"
            className="group relative overflow-hidden border border-white/40 px-12 py-5 text-[10px] font-bold uppercase tracking-[0.5em] text-white transition-all duration-700 hover:scale-105 hover:border-gold hover:text-black rounded-full hover:shadow-lg hover:shadow-white/10"
          >
            <span className="relative z-10">See Our Work</span>
            <div className="absolute inset-0 -translate-y-full bg-gold transition-transform duration-700 group-hover:translate-y-0" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 2.5 }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
      >
        <ChevronDown className="h-6 w-6 text-primary-foreground/60" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
