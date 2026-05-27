import { Heart, Droplets, Stethoscope } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import servicesImage from "@/assets/services_causes_banner.png";

const services = [
  {
    icon: Heart,
    number: "01",
    title: "Nutrition",
    tagline: "No Child Goes Hungry",
    desc: "Ensuring no one in our community goes to bed hungry — one nutritious, dignity-filled meal at a time. We believe a full plate is the foundation of a hopeful life.",
    accent: "from-amber-500/10 to-amber-600/5",
    iconColor: "text-amber-500",
    borderColor: "border-amber-500/20",
    hoverBorder: "group-hover:border-amber-500/60",
    stat: "500+",
    statLabel: "Meals Served",
  },
  {
    icon: Stethoscope,
    number: "02",
    title: "Medical Care",
    tagline: "Healing Beyond Reach",
    desc: "Bringing essential healthcare, modern medicine, and healing to the most remote and underserved areas — because life-saving care should not be a privilege.",
    accent: "from-rose-500/10 to-rose-600/5",
    iconColor: "text-rose-500",
    borderColor: "border-rose-500/20",
    hoverBorder: "group-hover:border-rose-500/60",
    stat: "1,200+",
    statLabel: "Lives Supported",
  },
  {
    icon: Droplets,
    number: "03",
    title: "Eco-Development",
    tagline: "Roots for Tomorrow",
    desc: "Building self-sufficient, dignified, and thriving communities across the rural landscape — every tree planted is a breath of hope for the next generation.",
    accent: "from-emerald-500/10 to-emerald-600/5",
    iconColor: "text-emerald-500",
    borderColor: "border-emerald-500/20",
    hoverBorder: "group-hover:border-emerald-500/60",
    stat: "300+",
    statLabel: "Trees Planted",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="bg-warm-alt overflow-hidden">
      {/* ── Header ── */}
      <div className="mx-auto max-w-7xl px-8 pt-16 md:pt-24 pb-12">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <p className="text-xs uppercase tracking-[0.5em] text-gold-light font-bold mb-5">Our Causes</p>
            <h2 className="font-display text-4xl font-medium tracking-tight md:text-7xl text-primary leading-tight">
              A Legacy of <br className="hidden md:block" />
              <span className="italic text-gold">Compassion</span>
            </h2>
            <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-muted-foreground/80">
              Every act of kindness ripples outward. These are the pillars through which we transform lives — one community at a time.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* ── Hero Image - Full Bleed ── */}
      <ScrollReveal direction="up">
        <div className="group relative w-full mb-12 md:mb-20">
          <div className="relative overflow-hidden aspect-[21/9] md:aspect-[32/11] shadow-2xl">
            <img
              src={servicesImage}
              alt="Our volunteers in action"
              className="h-full w-full object-cover object-center grayscale-[10%] transition-transform duration-[2s] group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-section/70 via-dark-section/30 to-transparent" />
            {/* Overlay text on image */}
            <div className="absolute inset-0 flex items-end p-10 md:p-20">
              <div className="max-w-7xl mx-auto w-full">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-gold font-bold mb-4">Iraithuligal Iyakkam</p>
                <p className="font-display text-2xl md:text-5xl lg:text-6xl text-white/95 italic leading-tight max-w-2xl drop-shadow-lg">
                  "Serving humanity is the highest form of devotion."
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ── 3 Service Cards ── */}
      <div className="mx-auto max-w-7xl px-8 pb-20 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.15} direction="up">
              <div
                className={`group relative flex flex-col h-full p-8 md:p-10 rounded-sm border ${s.borderColor} ${s.hoverBorder} bg-gradient-to-br ${s.accent} transition-all duration-700 hover:shadow-2xl hover:-translate-y-1`}
              >
                {/* Number watermark */}
                <span className="absolute top-6 right-8 font-display text-7xl font-bold text-primary/5 leading-none select-none pointer-events-none">
                  {s.number}
                </span>

                {/* Icon */}
                <div className={`mb-8 flex h-14 w-14 items-center justify-center rounded-sm border ${s.borderColor} bg-white/60 backdrop-blur-sm transition-all duration-500 group-hover:scale-110`}>
                  <s.icon className={`h-6 w-6 ${s.iconColor}`} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className={`text-[10px] font-bold uppercase tracking-[0.4em] ${s.iconColor} mb-3`}>
                    {s.tagline}
                  </p>
                  <h3 className="font-display text-3xl tracking-tight text-primary mb-5 group-hover:text-gold transition-colors duration-500">
                    {s.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-muted-foreground/80">
                    {s.desc}
                  </p>
                </div>

                {/* Stat */}
                <div className={`mt-10 pt-6 border-t ${s.borderColor} flex items-end justify-between`}>
                  <div>
                    <p className={`font-display text-4xl font-medium ${s.iconColor}`}>{s.stat}</p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 mt-1">{s.statLabel}</p>
                  </div>
                  <div className={`h-8 w-8 rounded-full border ${s.borderColor} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0`}>
                    <span className={`text-xs ${s.iconColor}`}>→</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
