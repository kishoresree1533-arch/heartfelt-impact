import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const links = [
  { label: "Home",     to: "/" },
  { label: "About",    to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Gallery",  to: "/gallery" },
  { label: "Donate",   to: "/donate" },
  { label: "Contact",  to: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // On the home page, the hero is dark so we want light text when not scrolled
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const lightText = isHome && !scrolled;

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? "bg-background/95 border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
          <NavLink
            to="/"
            className={`font-display text-2xl tracking-tight transition-all duration-700 ${
              lightText ? "text-primary-foreground" : "text-primary"
            }`}
          >
            Iraithuligal <span className="text-gold italic">Iyakkam</span>
          </NavLink>

          {/* Desktop */}
          <div className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) =>
                  `text-[11px] font-bold uppercase tracking-[0.3em] transition-colors hover:text-gold ${
                    isActive
                      ? "text-gold"
                      : lightText
                      ? "text-primary-foreground/80"
                      : "text-foreground/80"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden ${lightText ? "text-primary-foreground" : "text-foreground"}`}
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
              <NavLink
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-display text-2xl transition-colors hover:text-gold ${
                    isActive ? "text-gold" : "text-foreground"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
