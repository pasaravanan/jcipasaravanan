import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-navy text-navy-foreground">
    <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-3">
      <div>
        <h3 className="mb-3 font-display text-xl font-bold text-gold">JC.HGF.PA.SARAVANAN</h3>
        <p className="text-sm leading-relaxed text-navy-foreground/80">
          Financial Consultant – LIC, UTI Mutual Fund & Star Health Insurance. Helping families secure their future from Karaikal.
        </p>
      </div>
      <div>
        <h4 className="mb-3 font-display text-lg font-semibold text-gold">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          {[
            { to: "/", label: "Home" },
            { to: "/services", label: "Financial Services" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="text-navy-foreground/80 transition-colors hover:text-gold">{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="mb-3 font-display text-lg font-semibold text-gold">Contact</h4>
        <ul className="space-y-2 text-sm text-navy-foreground/80">
          <li className="flex items-start gap-2"><Phone size={16} className="mt-0.5 shrink-0 text-gold" /> +91 7010105335</li>
          <li className="flex items-start gap-2"><Mail size={16} className="mt-0.5 shrink-0 text-gold" /> pasaravananlic@gmail.com</li>
          <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-gold" /> Atchaya, LIC Premium Point, Karaikal – 609602</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-navy-foreground/10 py-4 text-center text-xs text-navy-foreground/50">
      © {new Date().getFullYear()} JC.HGF.PA.SARAVANAN – Financial Consultant. All rights reserved.
    </div>
  </footer>
);

export default Footer;
