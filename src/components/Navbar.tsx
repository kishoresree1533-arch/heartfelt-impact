import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Story", href: "#story" },
  { label: "Impact", href: "#impact" },
  { label: "Gallery", href: "#gallery" },
  { label: "Real Work", href: "#real-impact" },
  { label: "Donate", href: "#donate" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${
          scrolled
            ? "bg-background/80 border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.03)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
          <a 
            href="#" 
            className={`font-display text-2xl tracking-tight transition-all duration-700 ${
              scrolled ? 'text-primary' : 'text-primary-foreground'
            }`}
          >
            Iraithuligal <span className="text-gold italic">Iyakkam</span>
          </a>

          {/* Desktop */}
          <div className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-colors hover:text-gold ${
                  scrolled ? 'text-foreground/80' : 'text-primary-foreground/80'
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden ${scrolled ? 'text-foreground' : 'text-primary-foreground'}`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl text-foreground transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
