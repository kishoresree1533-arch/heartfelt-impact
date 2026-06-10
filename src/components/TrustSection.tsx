import { CheckCircle2, Shield, Users, TrendingUp, Heart } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const trustPoints = [
  { icon: CheckCircle2, text: "Community focused programs" },
  { icon: Shield,       text: "Transparent initiatives" },
  { icon: Heart,        text: "Real impact stories" },
  { icon: TrendingUp,   text: "Responsible contribution usage" },
];

const stats = [
  { value: "100%", label: "Funds to Communities", icon: Shield },
  { value: "5+",   label: "Years of Service",     icon: TrendingUp },
  { value: "50+",  label: "Active Volunteers",    icon: Users },
  { value: "10K+", label: "Lives Touched",        icon: Heart },
];

const TrustSection = () => {
  return (
    <section className="relative bg-white py-16 md:py-24 overflow-hidden">

      {/* Soft background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-amber-50/80 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-emerald-50/60 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-8">

        {/* ── Top label + heading centred ── */}
        <ScrollReveal>
          <div className="text-center mb-14 md:mb-18">
            <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold mb-4">
              Built on Integrity
            </p>
            <h2 className="font-display text-4xl font-medium text-primary md:text-6xl leading-tight">
              Your Trust <span className="italic text-gold">Creates Impact</span>
            </h2>
            <div className="mx-auto mt-6 h-px w-14 bg-gold/40" />
            <p className="mt-6 text-base font-light leading-relaxed text-muted-foreground max-w-lg mx-auto">
              Every contribution is handled responsibly to create meaningful
              and measurable change in the lives of those who need it most.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.1} direction="up">
              <div className="group relative flex flex-col items-center text-center rounded-2xl border border-border bg-[#faf8f5] px-6 py-8 hover:border-gold/50 hover:bg-amber-50/60 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                {/* Icon */}
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 border border-gold/20 group-hover:bg-gold/20 transition-all duration-500">
                  <s.icon className="h-4 w-4 text-gold" />
                </div>
                {/* Value */}
                <p className="font-display text-4xl md:text-5xl font-medium text-primary group-hover:text-gold transition-colors duration-500 mb-2">
                  {s.value}
                </p>
                {/* Label */}
                <p className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground/70 leading-relaxed">
                  {s.label}
                </p>
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold transition-all duration-700 group-hover:w-full opacity-50" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ── Trust points row ── */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trustPoints.map((p, i) => (
              <div
                key={i}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-white px-5 py-4 hover:border-gold/40 hover:bg-amber-50/40 transition-all duration-400 shadow-sm hover:shadow-md"
              >
                <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-gold/10 border border-gold/20 group-hover:bg-gold/20 transition-all duration-400">
                  <p.icon className="h-4 w-4 text-gold" />
                </div>
                <span className="text-sm font-light text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                  {p.text}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default TrustSection;
