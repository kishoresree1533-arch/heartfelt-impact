import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { ArrowUpRight, Heart } from "lucide-react";
import ctaImage from "@/assets/chapter-real-1.jpg";

const VolunteerCTA = () => {
  return (
    <section className="bg-white py-10 md:py-14 px-6 md:px-12">
      <ScrollReveal direction="up">
        <div className="relative overflow-hidden rounded-3xl mx-auto max-w-7xl shadow-2xl min-h-[340px] md:min-h-[380px]">

          {/* Background image */}
          <img
            src={ctaImage}
            alt="Tamil Nadu community"
            className="absolute inset-0 h-full w-full object-cover object-center"
            width={1600}
            height={900}
          />

          {/* Layered overlays for premium depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Gold top-left corner accent */}
          <div className="absolute top-6 left-6 h-px w-14 bg-gold opacity-70" />
          <div className="absolute top-6 left-6 w-px h-14 bg-gold opacity-70" />
          {/* Gold bottom-right corner accent */}
          <div className="absolute bottom-6 right-6 h-px w-14 bg-gold opacity-70" />
          <div className="absolute bottom-6 right-6 w-px h-14 bg-gold opacity-70" />

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 px-10 md:px-16 py-14 md:py-16 h-full">

            {/* Left */}
            <div className="max-w-lg">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-gold/40 bg-gold/10 backdrop-blur-sm">
                <Heart className="h-3 w-3 text-gold fill-gold" />
                <span className="text-[9px] uppercase tracking-[0.5em] text-gold font-bold">Join the Movement</span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.05] mb-5">
                Be More Than <br />
                <span className="italic text-gold">A Donor</span>
              </h2>

              <p className="text-sm md:text-base font-light leading-relaxed text-white/55 max-w-sm">
                Join our mission and become part of creating lasting positive
                change. Your presence matters as much as your contribution.
              </p>
            </div>

            {/* Right — buttons */}
            <motion.div
              className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start gap-4 shrink-0"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Link
                to="/contact"
                className="group relative overflow-hidden flex items-center gap-3 rounded-full border border-white/40 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.45em] text-white backdrop-blur-sm hover:border-gold transition-all duration-500 hover:text-primary"
              >
                <span className="relative z-10">Become Volunteer</span>
                <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <div className="absolute inset-0 rounded-full -translate-y-full bg-gold transition-transform duration-500 group-hover:translate-y-0" />
              </Link>

              <Link
                to="/donate"
                className="group relative overflow-hidden flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[10px] font-bold uppercase tracking-[0.45em] text-primary shadow-lg hover:shadow-gold/30 transition-all duration-500"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-500">Donate Now</span>
                <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <div className="absolute inset-0 rounded-full -translate-x-full bg-white transition-transform duration-500 group-hover:translate-x-0" />
              </Link>
            </motion.div>

          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default VolunteerCTA;
