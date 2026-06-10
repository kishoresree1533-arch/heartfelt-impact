import { ShieldCheck, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 bg-[#080808] py-16 md:py-24 overflow-hidden text-white font-display">
      {/* Background elegant touch */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-8">
        <ScrollReveal>
          <div className="grid gap-20 lg:grid-cols-12">
            {/* Brand Signature */}
            <div className="lg:col-span-5">
              <Link to="/" className="font-display text-4xl font-medium tracking-tighter">
                Heartfelt <span className="italic text-gold italic">Impact</span>
              </Link>
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
                  { label: "About Us", to: "/about" },
                  { label: "Our Services", to: "/services" },
                  { label: "Gallery", to: "/gallery" },
                  { label: "Testimonials", to: "/testimonials" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="group flex items-center gap-4 text-lg text-white/60 transition-all duration-500 hover:text-white"
                  >
                    <div className="h-px w-0 bg-gold transition-all duration-500 group-hover:w-6" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Action Column */}
            <div className="lg:col-span-3 lg:col-start-10">
              <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold mb-12">Take Action</p>
              <div className="flex flex-col gap-6">
                {[
                  { label: "Donate Now", to: "/donate" },
                  { label: "Volunteer Hub", to: "/contact" },
                  { label: "CSR Inquiry", to: "/contact" },
                  { label: "Contact Us", to: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="group flex items-center gap-4 text-lg text-white/60 transition-all duration-500 hover:text-white"
                  >
                    <div className="h-px w-0 bg-gold transition-all duration-500 group-hover:w-6" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;
