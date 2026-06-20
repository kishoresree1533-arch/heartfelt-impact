import ScrollReveal from "./ScrollReveal";
import servicesImage from "@/assets/services_causes_banner.png";

const ServicesSection = () => {
  return (
    <section id="services" className="bg-white overflow-hidden py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT — label + heading + paragraph ── */}
          <ScrollReveal direction="left">
            <p className="text-xs uppercase tracking-[0.6em] text-gold font-bold mb-6">
              Our Causes
            </p>
            <h2 className="font-display text-5xl font-medium tracking-tight md:text-7xl text-primary leading-[1.05] mb-8">
              A Legacy of <br />
              <span className="italic text-gold">Compassion</span>
            </h2>
            <div className="h-px w-12 bg-gold/40 mb-8" />
            <p className="text-base font-normal leading-relaxed text-muted-foreground max-w-md">
              Every act of kindness ripples outward. These are the pillars
              through which we transform lives — one community at a time.
            </p>
          </ScrollReveal>

          {/* ── RIGHT — square image only ── */}
          <ScrollReveal direction="right">
            <div className="group relative overflow-hidden rounded-2xl aspect-square shadow-2xl">
              <img
                src={servicesImage}
                alt="Volunteers in action"
                className="h-full w-full object-cover object-center transition-all duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute inset-0 flex items-end p-8">
                <p className="font-display text-xl md:text-2xl italic text-white/90 leading-snug max-w-xs">
                  "Serving humanity is the highest form of devotion."
                </p>
              </div>
              {/* Gold corner accents */}
              <div className="absolute top-4 left-4 h-px w-10 bg-gold" />
              <div className="absolute top-4 left-4 w-px h-10 bg-gold" />
              <div className="absolute bottom-4 right-4 h-px w-10 bg-gold" />
              <div className="absolute bottom-4 right-4 w-px h-10 bg-gold" />
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
