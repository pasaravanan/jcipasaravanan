import { useState, useEffect } from "react";
import { Menu, X, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "#home",         label: "Home" },
  { to: "#instagram",    label: "Instagram" },
  { to: "#calculators",  label: "Calculators" },
  { to: "#gallery",      label: "Gallery" },
  { to: "#services",     label: "Services" },
  { to: "#why-choose-me",label: "Why Me" },
  { to: "#about",        label: "About" },
  { to: "#testimonials", label: "Testimonials" },
  { to: "#contact",      label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]   = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracker
  useEffect(() => {
    const ids = navLinks.map(l => l.to.slice(1));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`); });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-[0_1px_32px_rgba(12,30,74,0.10)]" : ""
      }`}
      style={{
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(18px)",
        borderBottom: scrolled ? "1px solid #e8eaf0" : "1px solid transparent",
      }}
    >
      {/* Gold bottom accent bar */}
      <div
        className="absolute bottom-0 inset-x-0 transition-all duration-500"
        style={{
          height: scrolled ? "2px" : "0px",
          background: "linear-gradient(90deg, transparent 0%, hsl(38,71%,47%) 50%, transparent 100%)",
        }}
      />

      <div className="container mx-auto flex items-center justify-between gap-4 px-5 py-3">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group shrink-0">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl font-display text-xl font-normal text-white shadow-md transition-transform group-hover:scale-105"
            style={{ background: "linear-gradient(135deg, hsl(222,68%,17%), hsl(222,58%,26%))" }}
          >
            S
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="text-[11px] sm:text-[13px] font-bold tracking-wide transition-colors group-hover:text-[hsl(38,71%,42%)]"
              style={{ color: "hsl(222,68%,17%)" }}
            >
              JC.HGF.PA.SARAVANAN
            </span>
            <span className="mt-0.5 text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] text-[hsl(38,71%,44%)]">
              Financial Consultant
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map(link => (
            <a
              key={link.to}
              href={link.to}
              className="relative px-3 py-2 text-[12px] font-medium tracking-wide transition-colors rounded-lg hover:bg-neutral-100"
              style={{ color: active === link.to ? "hsl(38,71%,40%)" : "hsl(222,55%,35%)" }}
            >
              {link.label}
              {active === link.to && (
                <motion.span
                  layoutId="nav-dot"
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full"
                  style={{ background: "hsl(38,71%,47%)" }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+917010105335"
            className="hidden md:flex items-center gap-1.5 text-[12px] font-semibold"
            style={{ color: "hsl(222,68%,17%)" }}
          >
            <PhoneCall size={13} style={{ color: "hsl(38,71%,47%)" }} />
            7010105335
          </a>
          <a href="#contact" className="btn-gold hidden md:inline-flex px-5 py-2 text-[12px]">
            Free Consultation
          </a>
          <button
            className="rounded-xl border border-[#e8eaf0] p-2 transition-colors hover:bg-[#f7f8fc] lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={20} style={{ color: "hsl(222,68%,17%)" }} /> : <Menu size={20} style={{ color: "hsl(222,68%,17%)" }} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer - absolutely positioned to overlay content safely */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full border-b border-[#e8eaf0] bg-white shadow-xl lg:hidden z-50"
          >
            <div className="flex flex-col gap-1 px-5 py-4 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.to}
                  href={link.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-[#f7f8fc]"
                  style={{ color: active === link.to ? "hsl(38,71%,40%)" : "hsl(222,55%,30%)" }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-3 flex gap-2 border-t pt-3 border-[#e8eaf0]">
                <a href="tel:+917010105335" className="btn-outline flex-1 py-2.5 text-[12px] text-center justify-center">
                  Call
                </a>
                <a href="#contact" onClick={() => setOpen(false)} className="btn-gold flex-1 py-2.5 text-[12px] text-center justify-center">
                  Free Consult
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
