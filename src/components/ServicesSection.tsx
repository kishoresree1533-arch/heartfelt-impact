import { Heart, BookOpen, Droplets, Stethoscope } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const services = [
  { icon: Droplets, title: "Clean Water", desc: "Building wells and purification systems in remote villages" },
  { icon: BookOpen, title: "Education", desc: "Schools, supplies, and scholarships for underprivileged children" },
  { icon: Stethoscope, title: "Healthcare", desc: "Mobile clinics and medical camps in underserved areas" },
  { icon: Heart, title: "Community Care", desc: "Food programs, shelter, and emotional support for families" },
];

const ServicesSection = () => {
  return (
    <section className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p className="text-center text-sm uppercase tracking-[0.3em] text-gold">What We Do</p>
          <h2 className="mt-4 text-center font-display text-3xl font-medium md:text-5xl">
            Building Hope, One Step at a Time
          </h2>
        </ScrollReveal>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.1}>
              <div className="group border border-border p-8 transition-all duration-500 hover:border-gold hover:shadow-lg">
                <s.icon className="h-8 w-8 text-gold transition-transform duration-500 group-hover:scale-110" />
                <h3 className="mt-6 font-display text-xl">{s.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
