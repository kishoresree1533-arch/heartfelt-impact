import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import impactImage from "@/assets/impact_joyful_tamil_children.png";
import { Utensils, Droplets, Leaf, HandHeart } from "lucide-react";

const stats = [
  { icon: Utensils, number: 5000, suffix: "+", label: "Meals Served" },
  { icon: Droplets, number: 3000, suffix: "+", label: "Emergency Blood Donations" },
  { icon: Leaf, number: 2000, suffix: "+", label: "Trees Planted" },
  { icon: HandHeart, number: 1500, suffix: "+", label: "Dignified Last Rights Performed" },
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
    const duration = 2500;
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
    <div ref={ref} className="font-display text-5xl font-medium md:text-7xl text-white group-hover:text-gold transition-colors duration-700">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

const ImpactSection = () => {
  return (
    <section id="impact" className="relative overflow-hidden bg-[#0A0A0A] py-16 md:py-24">
      {/* Background with optimized contrast */}
      <div className="absolute inset-0">
        <img 
          src={impactImage}
          alt="Impact background"
          className="h-full w-full object-cover opacity-30 grayscale transition-transform duration-[20s] hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center mb-16 text-center">
            <p className="text-xs uppercase tracking-[0.6em] text-gold font-bold mb-8">Our Legacy of Service</p>
            <h2 className="font-display text-5xl font-medium text-white md:text-8xl leading-none">
              Compassion in <span className="italic text-gold">Action</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="group relative flex flex-col items-center text-center">
                
                <div className="mb-12 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 backdrop-blur-md ring-1 ring-white/10 group-hover:bg-gold/20 group-hover:ring-gold/40 transition-all duration-700">
                   <stat.icon className="h-7 w-7 text-gold-light group-hover:text-gold transition-all duration-700" />
                </div>

                <div className="flex flex-col items-center space-y-6">
                  <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                  
                  <div className="h-px w-12 bg-gold/30 group-hover:w-20 group-hover:bg-gold transition-all duration-700" />
                  
                  <div className="h-12 flex items-center justify-center">
                    <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors duration-700 leading-relaxed max-w-[200px] text-balance">
                      {stat.label}
                    </p>
                  </div>
                </div>

                {/* Subtle Background Accent */}
                <span className="absolute -top-12 -left-4 font-display text-[10rem] text-white/[0.03] pointer-events-none select-none">
                  {i + 1}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
