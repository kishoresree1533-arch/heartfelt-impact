import { motion } from "framer-motion";
import heroImage from "@/assets/hero-image.jpg";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with slow zoom */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Humanitarian worker holding hands with elderly person"
          className="h-full w-full object-cover animate-slow-zoom"
          width={1920}
          height={1080}
        />
        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          className="mb-6 text-sm font-body tracking-[0.3em] uppercase text-gold-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          A Call to Compassion
        </motion.p>

        <motion.h1
          className="max-w-4xl text-4xl font-display font-medium leading-tight tracking-tight text-primary-foreground sm:text-5xl md:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Someone Out There <br />
          <span className="italic text-gold-light">Needs You Today</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-lg text-lg font-light text-primary-foreground/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          A small act of kindness can change an entire life.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <a
            href="#donate"
            className="rounded-none border border-gold bg-gold px-10 py-4 text-sm font-medium uppercase tracking-[0.2em] text-primary transition-all duration-500 hover:bg-transparent hover:text-gold-light"
          >
            Donate Now
          </a>
          <a
            href="#story"
            className="rounded-none border border-primary-foreground/40 px-10 py-4 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground/90 transition-all duration-500 hover:border-gold-light hover:text-gold-light"
          >
            See Their Story
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
