import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactHero = () => (
  <section className="relative h-screen w-full overflow-hidden flex items-center">

    {/* Background image — hands together / community connection */}
    <div className="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=90&w=1920&auto=format&fit=crop"
        alt="Contact us"
        className="h-full w-full object-cover object-center"
        width={1920}
        height={1080}
      />
      {/* Subtle left tint for text readability only */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
    </div>

    {/* Gold decorative line — left edge */}
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold to-transparent z-20 opacity-60" />

    {/* Content */}
    <div className="relative z-10 mx-auto max-w-7xl px-8 w-full py-24 pt-40">
      <div className="max-w-2xl">

        {/* Label */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="h-px w-10 bg-gold" />
          <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold">
            Get In Touch
          </p>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="font-display text-5xl font-medium leading-[1.05] text-white sm:text-6xl md:text-7xl mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          We're Here to <br />
          <span className="italic text-gold">Listen & Help</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base font-light leading-relaxed text-white/70 max-w-lg mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Whether you want to volunteer, partner, donate, or simply say hello —
          our door is always open. Reach out and let's build something meaningful together.
        </motion.p>

        {/* Quick contact chips */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {[
            { icon: Phone,   text: "+91 98765 43210",              href: "tel:+919876543210"                          },
            { icon: Mail,    text: "iraithuligaliyakkam@gmail.com", href: "mailto:iraithuligaliyakkam@gmail.com"       },
            { icon: MapPin,  text: "Tamil Nadu, India",             href: null                                         },
          ].map(({ icon: Icon, text, href }) => (
            href ? (
              <a
                key={text}
                href={href}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/90 text-xs font-light hover:bg-gold/20 hover:border-gold/40 transition-all duration-300"
              >
                <Icon className="h-3.5 w-3.5 text-gold shrink-0" />
                {text}
              </a>
            ) : (
              <div
                key={text}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/90 text-xs font-light"
              >
                <Icon className="h-3.5 w-3.5 text-gold shrink-0" />
                {text}
              </div>
            )
          ))}
        </motion.div>
      </div>
    </div>


  </section>
);

const Contact = () => {
  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col w-full max-w-[100vw]">
      <Navbar />
      <ContactHero />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Contact;
