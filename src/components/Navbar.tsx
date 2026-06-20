import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const links = [
  { label: "Home",       to: "/" },
  { label: "About",      to: "/about" },
  { label: "Services",   to: "/services" },
  { label: "Gallery",    to: "/gallery" },
  { label: "Membership", to: "/membership" },
  { label: "Donate",     to: "/donate" },
  { label: "Contact",    to: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  // On premium white theme navbar, we want dark/slate text for contrast
  const lightText = false;

  return (
    <>
      {/* Floating pill wrapper — positions the pill inside the viewport */}
      <motion.div
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 md:px-8"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.nav
          className={`
            w-full max-w-6xl flex items-center justify-between
            px-6 py-3 rounded-full
            transition-all duration-500
            ${scrolled
              ? "bg-white/95 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-slate-200/50"
              : "bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white/60"
            }
          `}
          layout
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo */}
          <NavLink
            to="/"
            className="font-display text-xl tracking-tight transition-colors duration-500 shrink-0 mr-6 text-slate-900"
          >
            Iraithuligal{" "}
            <span className="text-gold italic">Iyakkam</span>
          </NavLink>

          {/* Desktop nav links — flex, not absolute */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) =>
                  `relative text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-300 group whitespace-nowrap ${
                    isActive
                      ? "text-gold"
                      : "text-slate-800/80 hover:text-slate-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {/* Active underline dot */}
                    <span
                      className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[3px] w-[3px] rounded-full bg-gold transition-all duration-300 ${
                        isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right side — Donate CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Desktop donate button */}
            <NavLink
              to="/donate"
              className="
                hidden md:inline-flex items-center gap-2
                text-[9px] font-bold uppercase tracking-[0.35em]
                px-5 py-2.5 rounded-full
                transition-all duration-500
                bg-slate-950 text-white hover:bg-gold hover:text-slate-950 shadow-sm border border-slate-950/10
              "
            >
              Donate
            </NavLink>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-300 bg-slate-100/80 text-slate-900 border border-slate-200/50"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </motion.nav>
      </motion.div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-[hsl(40,33%,98%)]"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 flex items-center justify-center w-10 h-10 rounded-full bg-[hsl(40,15%,88%)] text-[hsl(220,25%,8%)]"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Brand */}
            <p className="font-display text-lg text-[hsl(220,25%,8%)]/40 tracking-tight">
              Iraithuligal <span className="italic text-gold">Iyakkam</span>
            </p>

            {links.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <NavLink
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `font-display text-3xl tracking-tight transition-colors hover:text-gold ${
                      isActive ? "text-gold" : "text-[hsl(220,25%,8%)]"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </motion.div>
            ))}

            <NavLink
              to="/donate"
              onClick={() => setOpen(false)}
              className="mt-4 px-8 py-3 rounded-full bg-[hsl(220,25%,8%)] text-[hsl(40,33%,98%)] text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gold hover:text-[hsl(220,25%,8%)] transition-all duration-400"
            >
              Donate Now
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
