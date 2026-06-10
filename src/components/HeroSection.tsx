import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/premium_hero_tamil.png";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with slow zoom */}
      <div className="absolute inset-0 bg-primary z-0">
        <img
          src={heroImage}
          alt="Emotional cinematic moment"
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        {/* Dark cinematic overlay — heavier on right for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/75 via-black/30 to-black/20 z-10" />
      </div>

      {/* Content — right-aligned */}
      <div className="relative z-10 flex h-full items-center justify-end px-8 md:px-16 lg:px-24">
        <div className="flex flex-col items-start text-left max-w-md">
          <div className="overflow-hidden">
            <motion.p
              className="mb-5 text-[10px] font-body tracking-[0.5em] uppercase text-gold-light"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Since 2021 — A Legacy of Care
            </motion.p>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              className="mb-4 text-3xl font-display font-medium leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Changing Lives <br />
              <span className="font-display italic text-gold-light">One Story at a Time</span>
            </motion.h1>
          </div>

          <motion.p
            className="max-w-sm text-sm font-light leading-relaxed text-white/70 md:text-base"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            We provide more than just aid; we provide a future.
            Join us in rewriting the narrative for thousands across Tamil Nadu.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <Link
              to="/donate"
              className="group relative overflow-hidden bg-gold px-8 py-4 text-[10px] font-bold uppercase tracking-[0.5em] text-primary transition-all duration-700 hover:scale-105 rounded-full shadow-lg hover:shadow-gold/20"
            >
              <span className="relative z-10 transition-colors duration-700 group-hover:text-black">Donate Now</span>
              <div className="absolute inset-0 -translate-x-full bg-white transition-transform duration-700 group-hover:translate-x-0" />
            </Link>
            <Link
              to="/about"
              className="group relative overflow-hidden border border-white/40 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.5em] text-white transition-all duration-700 hover:scale-105 hover:border-gold hover:text-black rounded-full"
            >
              <span className="relative z-10">See Our Work</span>
              <div className="absolute inset-0 -translate-y-full bg-gold transition-transform duration-700 group-hover:translate-y-0" />
            </Link>
          </motion.div>
        </div>
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
