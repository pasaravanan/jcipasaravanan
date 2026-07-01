import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { to: "#home", label: "Home" },
  { to: "#services", label: "Services" },
  { to: "#calculators", label: "Calculators" },
  { to: "#gallery", label: "Gallery" },
  { to: "#instagram", label: "Instagram" },
  { to: "#why-choose-me", label: "Why Choose Me" },
  { to: "#about", label: "About" },
  { to: "#testimonials", label: "Testimonials" },
  { to: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg shadow-lg border-b border-border"
          : "bg-white/70 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[hsl(217,71%,35%)] shadow-md">
            <span className="font-display text-lg font-bold text-white">S</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
              JC.HGF.PA.SARAVANAN
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gold">
              Financial Consultant
            </span>
          </div>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <a
                href={link.to}
                className="relative rounded-lg px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary hover:bg-primary/5"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a
              href="#contact"
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-primary to-[hsl(217,71%,35%)] px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:scale-105"
            >
              Get Started
            </a>
          </li>
        </ul>

        <button
          className="rounded-lg p-2 text-foreground hover:bg-muted transition-colors lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-border bg-white/95 backdrop-blur-lg lg:hidden"
        >
          <ul className="flex flex-col px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <a
                  href={link.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-gradient-to-r from-primary to-[hsl(217,71%,35%)] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md"
              >
                Get Started
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
