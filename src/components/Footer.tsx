import { Heart, ShieldCheck, Mail, ArrowUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#080808] py-16 md:py-24 overflow-hidden text-white font-display">
      {/* Background elegant touch */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-8">
        <ScrollReveal>
          <div className="grid gap-20 lg:grid-cols-12 mb-16">
            {/* Brand Signature */}
            <div className="lg:col-span-5">
              <a href="#" className="font-display text-4xl font-medium tracking-tighter">
                Heartfelt <span className="italic text-gold italic">Impact</span>
              </a>
              <p className="mt-10 max-w-sm text-xl font-light leading-relaxed text-white/40 md:text-2xl">
                Redefining the future of rural Tamil Nadu through dignity, nutrition, and education.
              </p>
              
              <div className="mt-12 flex flex-col gap-4">
                 <div className="flex items-center gap-4 text-white/30 hover:text-gold transition-colors duration-500 cursor-pointer">
                    <Mail className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-widest">contact@heartfeltimpact.org</span>
                 </div>
                 <div className="flex items-center gap-4 text-white/30">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-widest text-[#888]">Verified NGO (80G/12A Export)</span>
                 </div>
              </div>
            </div>

            {/* Navigation Column */}
            <div className="lg:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold mb-12">The Mission</p>
              <div className="flex flex-col gap-6">
                {[
                  { label: "Our Narrative", href: "#story" },
                  { label: "Real Work", href: "#real-impact" },
                  { label: "The Founder", href: "#founder" },
                  { label: "Impact Stats", href: "#impact" }
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-4 text-lg text-white/60 transition-all duration-500 hover:text-white"
                  >
                    <div className="h-px w-0 bg-gold transition-all duration-500 group-hover:w-6" />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Action Column */}
            <div className="lg:col-span-3 lg:col-start-10">
              <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold mb-12">Take Action</p>
              <div className="flex flex-col gap-6">
                {[
                  { label: "Donate Now", href: "#donate" },
                  { label: "Volunteer Hub", href: "#contact" },
                  { label: "CSR Inquiry", href: "#contact" },
                  { label: "Contact Us", href: "#contact" }
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-4 text-lg text-white/60 transition-all duration-500 hover:text-white"
                  >
                    <div className="h-px w-0 bg-gold transition-all duration-500 group-hover:w-6" />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar: Ethics & Legal */}
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 order-3 md:order-1">
              © {new Date().getFullYear()} Iraithuligal Iyakkam. <br className="md:hidden"/> All Rights Reserved.
            </p>
            
            <div className="flex items-center gap-4 order-2">
               <div className="h-[1px] w-12 bg-white/10 hidden md:block" />
               <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.5em] text-gold font-bold">
                 Made with <Heart className="h-3 w-3 animate-pulse text-gold" /> for humanity
               </p>
               <div className="h-[1px] w-12 bg-white/10 hidden md:block" />
            </div>

            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-gold transition-all duration-700 order-1 md:order-3 hover:scale-105"
            >
              Return to Top
              <div className="relative h-12 w-12 flex items-center justify-center rounded-none border border-white/10 group-hover:border-gold transition-all overflow-hidden group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                 <ArrowUp className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-black" />
                 <div className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 group-hover:translate-y-0" />
              </div>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;
