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
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary z-0">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          style={{ objectPosition }}
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-black/25 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          className="mb-4 text-xs font-body tracking-[0.5em] uppercase text-gold-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {label}
        </motion.p>

        <motion.h1
          className="mb-4 max-w-4xl text-4xl font-display font-medium leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}{" "}
          {highlight && (
            <span className="font-display italic text-gold-light">{highlight}</span>
          )}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="max-w-xl text-base font-light leading-relaxed text-white/60 md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
