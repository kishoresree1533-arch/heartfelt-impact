import { motion } from "framer-motion";

interface PageHeroProps {
  label: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  image: string;
  objectPosition?: string;
}

const PageHero = ({ label, title, highlight, subtitle, image, objectPosition = "center" }: PageHeroProps) => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          style={{ objectPosition }}
          width={1920}
          height={1080}
        />
        {/* Cinematic overlay — heavier on left for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/10" />
        {/* Subtle bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Gold decorative line — left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold to-transparent z-20 opacity-60" />

      {/* Content — left aligned */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 w-full py-24">
        <div className="max-w-2xl">

          {/* Label */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="h-px w-10 bg-gold" />
            <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold">
              {label}
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="font-display text-5xl font-medium leading-[1.05] text-white sm:text-6xl md:text-7xl mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}{" "}
            {highlight && (
              <>
                <br />
                <span className="italic text-gold">{highlight}</span>
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              className="text-base font-light leading-relaxed text-white/70 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              {subtitle}
            </motion.p>
          )}

        </div>
      </div>

    </section>
  );
};

export default PageHero;
