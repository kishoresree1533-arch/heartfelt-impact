import ScrollReveal from "./ScrollReveal";

import founderLogo from "@/assets/founder-logo.png";

const FounderSection = () => {
  return (
    <section id="founder" className="bg-background pt-12 pb-16 md:pt-16 md:pb-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
          <ScrollReveal direction="left">
            <div className="relative group flex justify-center items-center p-8 bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-primary/5">
              <div className="absolute -inset-4 bg-gold/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative w-full max-w-md aspect-square overflow-hidden transition-all duration-[1.5s] rounded-xl flex justify-center items-center p-4">
                <img
                  src={founderLogo}
                  alt="Iraithuligal Iyakkam Logo"
                  className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-[2s] group-hover:scale-105"
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3} direction="right">
            <div className="relative">
              <span className="font-display text-9xl text-gold/5 leading-none absolute -top-16 -left-12 pointer-events-none select-none">“</span>
              <p className="font-display text-2xl italic leading-relaxed text-foreground md:text-3xl">
                Our vision is to build a compassionate society where every individual is valued and respected.
                We strive to ensure that no one is left without food, care, or support.
                <br /><br />
                We aim to stand with the needy during their most difficult times.
                We believe in creating lasting impact through humanity and service.
                <br /><br />
                Our goal is to ensure dignity and hope for every life we touch.
              </p>
              <div className="mt-16 flex items-center gap-6">
                <div className="h-px w-12 bg-gold" />
                <div>
                  <p className="font-display text-xl tracking-tight">S.Karthikeyan .BBA</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-gold-light font-bold text-nowrap">Founder & Managing Trustee</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
