import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { Utensils, Droplets, Leaf, HandHeart } from "lucide-react";

const stats = [
  { icon: Utensils,  number: 5000, suffix: "+", label: "Meals Served",                  color: "text-amber-600",  bg: "bg-amber-50",  border: "border-amber-200" },
  { icon: Droplets,  number: 3000, suffix: "+", label: "Blood Donations",               color: "text-rose-500",   bg: "bg-rose-50",   border: "border-rose-200"  },
  { icon: Leaf,      number: 2000, suffix: "+", label: "Trees Planted",                 color: "text-emerald-600",bg: "bg-emerald-50",border: "border-emerald-200"},
  { icon: HandHeart, number: 1500, suffix: "+", label: "Last Rights Performed",         color: "text-gold",       bg: "bg-amber-50",  border: "border-amber-200" },
];

const AnimatedNumber = ({ target, suffix, color }: { target: number; suffix: string; color: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 2500 / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref} className={`font-display text-3xl font-semibold ${color} transition-colors duration-700`}>
      {count.toLocaleString()}{suffix}
    </div>
  );
};

const ImpactSection = () => {
  return (
    <section id="impact" className="bg-white py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-8">

        {/* Label + title — compact inline row */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold mb-2">Our Legacy</p>
              <h2 className="font-display text-3xl font-medium text-primary md:text-4xl leading-tight">
                Compassion in <span className="italic text-gold">Action</span>
              </h2>
            </div>
            <p className="text-sm font-light text-muted-foreground max-w-xs text-right hidden sm:block">
              Numbers that represent real lives touched across Tamil Nadu.
            </p>
          </div>
        </ScrollReveal>

        {/* Stat strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1} direction="up">
              <div className={`group relative flex items-center gap-5 px-6 py-6 rounded-2xl border ${stat.border} ${stat.bg} hover:shadow-lg transition-all duration-500 hover:-translate-y-1 w-full`}>
                {/* Icon */}
                <div className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} border ${stat.border} shadow-sm transition-transform duration-500 group-hover:scale-110`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                {/* Number + label */}
                <div>
                  <AnimatedNumber target={stat.number} suffix={stat.suffix} color={stat.color} />
                  <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground/70 mt-0.5 leading-tight">
                    {stat.label}
                  </p>
                </div>
                {/* Subtle corner accent */}
                <div className={`absolute bottom-0 left-0 h-0.5 w-0 ${stat.color.replace("text-", "bg-")} rounded-full transition-all duration-700 group-hover:w-full opacity-40`} />
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ImpactSection;
