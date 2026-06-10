import { Shield, Sprout, Heart, ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const promises = [
  {
    icon: Heart,
    title: "Community First",
    desc: "We focus on real needs and meaningful support, placing people at the heart of every decision we make.",
    number: "01",
    accent: "#CC9933",
    iconBg: "bg-amber-50",
    iconBorder: "border-amber-200",
    iconColor: "text-gold",
    pill: "bg-amber-50 text-amber-700 border-amber-200",
    bar: "bg-gold",
  },
  {
    icon: Sprout,
    title: "Sustainable Change",
    desc: "Creating lasting solutions that empower communities to grow and thrive for generations to come.",
    number: "02",
    accent: "#16a34a",
    iconBg: "bg-emerald-50",
    iconBorder: "border-emerald-200",
    iconColor: "text-emerald-600",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    bar: "bg-emerald-500",
  },
  {
    icon: Shield,
    title: "Every Life Matters",
    desc: "Bringing hope, dignity, and care to every individual — regardless of circumstance or background.",
    number: "03",
    accent: "#e11d48",
    iconBg: "bg-rose-50",
    iconBorder: "border-rose-200",
    iconColor: "text-rose-500",
    pill: "bg-rose-50 text-rose-700 border-rose-200",
    bar: "bg-rose-500",
  },
];

const PromiseSection = () => {
  return (
    <section className="relative bg-white py-20 md:py-28 overflow-hidden">

      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-50/60 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-emerald-50/40 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-8">

        {/* ── Two-column header ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16 md:mb-20">
          <ScrollReveal direction="left">
            <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold mb-5">
              Our Commitment
            </p>
            <h2 className="font-display text-4xl font-medium text-primary md:text-6xl leading-[1.05]">
              Our Promise To <br />
              <span className="italic text-gold">Humanity</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="lg:pl-10 lg:border-l border-border">
              <p className="text-base font-light leading-relaxed text-muted-foreground max-w-md">
                We work towards creating lasting change by supporting communities
                with essential needs, education and healthcare — because every life
                deserves dignity.
              </p>
              {/* Small trust badge row */}
              <div className="mt-8 flex flex-wrap gap-3">
                {["Since 2021", "Tamil Nadu", "Verified NGO"].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 rounded-full border border-gold/30 bg-amber-50 text-[10px] uppercase tracking-[0.35em] text-gold font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Premium cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promises.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.15} direction="up">
              <div className="group relative flex flex-col h-full rounded-2xl border border-border bg-white shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 overflow-hidden">

                {/* Coloured top bar */}
                <div className={`h-1 w-full ${p.bar} opacity-70 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="flex flex-col flex-1 p-8">
                  {/* Top row — icon + number */}
                  <div className="flex items-start justify-between mb-8">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${p.iconBg} border ${p.iconBorder} transition-all duration-500 group-hover:scale-110 shadow-sm`}>
                      <p.icon className={`h-6 w-6 ${p.iconColor}`} />
                    </div>
                    <span className="font-display text-6xl font-bold text-primary/[0.06] leading-none select-none">
                      {p.number}
                    </span>
                  </div>

                  {/* Pill tag */}
                  <span className={`self-start mb-5 px-3 py-1 rounded-full border text-[9px] uppercase tracking-[0.4em] font-bold ${p.pill}`}>
                    {p.title}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-2xl text-primary mb-4 leading-snug group-hover:text-gold transition-colors duration-500">
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm font-light leading-relaxed text-muted-foreground flex-1">
                    {p.desc}
                  </p>

                  {/* Bottom arrow link */}
                  <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <span className={`text-xs font-bold uppercase tracking-[0.35em] ${p.iconColor}`}>
                      Learn More
                    </span>
                    <ArrowRight className={`h-3.5 w-3.5 ${p.iconColor}`} />
                  </div>
                </div>

                {/* Hover glow bottom */}
                <div className={`absolute bottom-0 left-0 right-0 h-px ${p.bar} opacity-0 group-hover:opacity-60 transition-opacity duration-700`} />
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PromiseSection;
