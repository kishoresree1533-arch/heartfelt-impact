import { ShieldCheck, Info, Heart } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const DonationSection = () => {
  return (
    <section id="donate" className="relative bg-[#0A0A0A] py-16 md:py-32 overflow-hidden">
      {/* Background elegant glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-8 font-display">
        <ScrollReveal>
          <div className="flex flex-col items-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.6em] text-gold-light mb-6 opacity-60">Support Our Cause</p>
            <h2 className="text-center text-5xl font-medium tracking-tighter md:text-8xl text-white leading-[0.95]">
              Today, You Can <br />
              <span className="italic text-gold italic">Rewrite a Life</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mx-auto max-w-5xl overflow-hidden border border-white/5 bg-white/[0.01] backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.6)] rounded-sm">
            <div className="grid md:grid-cols-2 divide-x divide-white/5">
              {/* Bank Details Chapter */}
              <div className="p-12 lg:p-24 transition-all duration-700 hover:bg-white/[0.02]">
                <div className="flex items-center gap-4 mb-16">
                   <div className="h-px w-8 bg-gold/30" />
                   <h3 className="text-xs uppercase tracking-[0.4em] text-gold-light font-bold">Bank Transfer</h3>
                </div>
                <div className="space-y-12">
                  {[
                    ["Account Name", "Iraithuligal Iyakkam Trust"],
                    ["Account Number", "9876 5432 1012 3456"],
                    ["IFSC Code", "IDIB000M123"],
                    ["Bank Name", "Indian Bank (T.Nagar Branch)"],
                  ].map(([label, value]) => (
                    <div key={label} className="group border-b border-white/5 pb-6 transition-all duration-700 hover:border-gold/30">
                      <p className="text-[9px] uppercase tracking-[0.5em] text-white/20 mb-3 group-hover:text-gold-light transition-colors duration-500">{label}</p>
                      <p className="text-xl md:text-2xl text-white/90 tracking-tight font-light transition-all duration-500 group-hover:translate-x-1">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct UPI Chapter */}
              <div className="p-12 lg:p-24 flex flex-col items-center justify-center text-center transition-all duration-700 hover:bg-white/[0.02]">
                <div className="flex items-center gap-4 mb-16">
                   <div className="h-px w-8 bg-gold/30" />
                   <h3 className="text-xs uppercase tracking-[0.4em] text-gold-light font-bold">Direct UPI</h3>
                </div>
                
                <div className="group relative p-10 bg-white shadow-2xl transition-all duration-700 hover:shadow-[0_0_80px_rgba(212,175,55,0.2)] rounded-sm">
                  <div className="grid grid-cols-10 gap-1.5 grayscale transition-all duration-700 group-hover:grayscale-0">
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div key={i} className={`h-3 w-3 ${Math.random() > 0.4 ? 'bg-black' : 'bg-transparent'}`} />
                    ))}
                  </div>
                  <div className="mt-8 border-t border-black/5 pt-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">Scan to Support</p>
                  </div>
                </div>

                <div className="mt-12">
                  <p className="text-2xl md:text-3xl italic tracking-tighter text-gold-light transition-all duration-[1s] hover:scale-105 cursor-pointer">
                    heartfeltimpact@upi
                  </p>
                  <p className="mt-4 text-[9px] uppercase tracking-[0.4em] text-white/20">Instant Settlement</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Global Trust Ribbon */}
        <ScrollReveal delay={0.3} className="mt-24 flex flex-wrap items-center justify-center gap-16 md:gap-24 opacity-40 hover:opacity-100 transition-opacity duration-1000">
          <div className="flex items-center gap-4">
             <ShieldCheck className="h-4 w-4 text-gold-light" />
             <p className="text-[9px] uppercase tracking-[0.4em] text-white font-medium">100% Transparency</p>
          </div>
          <div className="flex items-center gap-4">
             <Info className="h-4 w-4 text-gold-light" />
             <p className="text-[9px] uppercase tracking-[0.4em] text-white font-medium">Secure Portal</p>
          </div>
          <div className="flex items-center gap-4">
             <Heart className="h-4 w-4 text-gold-light" />
             <p className="text-[9px] uppercase tracking-[0.4em] text-white font-medium">Direct Field Impact</p>
          </div>
        </ScrollReveal>

        <div className="mt-20 flex flex-col items-center">
          <button className="group relative overflow-hidden bg-gold px-24 py-7 font-bold uppercase tracking-[0.5em] text-[10px] text-black transition-all duration-700 hover:scale-105 hover:shadow-[0_20px_60px_rgba(212,175,55,0.3)] rounded-full">
            <span className="relative z-10 transition-colors duration-700 group-hover:text-black">Donate Now</span>
            <div className="absolute inset-0 -translate-x-full bg-white transition-transform duration-700 group-hover:translate-x-0" />
          </button>
          <p className="mt-10 text-[10px] font-light tracking-[0.4em] text-white/20 uppercase italic">"Every heart matters"</p>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
