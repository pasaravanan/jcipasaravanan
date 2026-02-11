import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "#home", label: "Home" },
  { to: "#services", label: "Services" },
  { to: "#why-choose-me", label: "Why Choose Me" },
  { to: "#about", label: "About" },
  { to: "#testimonials", label: "Testimonials" },
  { to: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#home" className="flex flex-col leading-tight">
          <span className="font-display text-lg font-bold text-primary-foreground">JC.HGF.PA.SARAVANAN</span>
          <span className="text-xs text-gold">Financial Consultant</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <a
                href={link.to}
                className="rounded px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold hover:text-gold-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button className="text-primary-foreground lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-primary-foreground/20 bg-primary lg:hidden">
          <ul className="flex flex-col px-4 py-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <a
                  href={link.to}
                  onClick={() => setOpen(false)}
                  className="block rounded px-3 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
