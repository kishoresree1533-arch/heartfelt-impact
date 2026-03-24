import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { number: 12000, suffix: "+", label: "Lives Changed" },
  { number: 8500, suffix: "+", label: "Meals Served" },
  { number: 3200, suffix: "+", label: "Children Supported" },
  { number: 45, suffix: "", label: "Villages Reached" },
];

const AnimatedNumber = ({ target, suffix }: { target: number; suffix: string }) => {
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
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref} className="font-display text-5xl font-medium md:text-7xl">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

const ImpactSection = () => {
  return (
    <section className="bg-dark-section py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p className="text-center text-sm uppercase tracking-[0.3em] text-gold">Our Impact</p>
          <h2 className="mt-4 text-center font-display text-3xl font-medium text-primary-foreground md:text-5xl">
            Numbers That Tell a Story
          </h2>
        </ScrollReveal>

        <div className="mt-20 grid grid-cols-2 gap-12 md:grid-cols-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.15} className="text-center">
              <AnimatedNumber target={stat.number} suffix={stat.suffix} />
              <p className="mt-3 text-sm font-light uppercase tracking-[0.2em] text-primary-foreground/60">
                {stat.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
