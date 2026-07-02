import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { to: "#home",         label: "Home" },
  { to: "#services",     label: "Financial Services" },
  { to: "#calculators",  label: "Free Calculators" },
  { to: "#about",        label: "About Me" },
  { to: "#testimonials", label: "Testimonials" },
  { to: "#contact",      label: "Contact" },
];

const services = [
  { label: "LIC Life Insurance",       to: "#services" },
  { label: "UTI Mutual Funds",         to: "#services" },
  { label: "Star Health Insurance",    to: "#services" },
  { label: "LIC Calculator",           to: "#calculators" },
  { label: "SIP Calculator",           to: "#calculators" },
  { label: "Free Consultation",        to: "#contact" },
];

const Footer = () => (
  <footer style={{ background: "linear-gradient(135deg, hsl(222,68%,14%) 0%, hsl(222,62%,18%) 100%)" }}>
    {/* Gold top line */}
    <div className="h-[2px]" style={{ background: "linear-gradient(90deg, transparent, hsl(38,71%,47%), transparent)" }} />

    {/* Main content */}
    <div className="container mx-auto grid gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
      {/* Brand */}
      <div className="sm:col-span-2 lg:col-span-1">
        <div className="mb-4 flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl font-display text-xl font-normal text-white"
            style={{ background: "linear-gradient(135deg, hsl(38,71%,47%), hsl(38,78%,56%))" }}
          >
            S
          </div>
          <div>
            <p className="text-[13px] font-bold text-white">JC.HGF.PA.SARAVANAN</p>
            <p className="text-[10px] text-white/45 uppercase tracking-wider">Financial Consultant</p>
          </div>
        </div>
        <p className="mb-6 text-[13px] leading-relaxed text-white/50">
          Helping families across Karaikal build financial security through LIC, UTI Mutual Funds, and Star Health Insurance.
        </p>
        {/* Social row */}
        <div className="flex gap-2.5">
          <a
            href="tel:+917010105335"
            className="flex h-9 w-9 items-center justify-center rounded-xl transition-all hover:scale-110"
            style={{ background: "rgba(201,146,42,0.15)", border: "1px solid rgba(201,146,42,0.25)" }}
            aria-label="Phone"
          >
            <Phone size={15} style={{ color: "hsl(38,78%,60%)" }} />
          </a>
          <a
            href="mailto:pasaravananlic@gmail.com"
            className="flex h-9 w-9 items-center justify-center rounded-xl transition-all hover:scale-110"
            style={{ background: "rgba(201,146,42,0.15)", border: "1px solid rgba(201,146,42,0.25)" }}
            aria-label="Email"
          >
            <Mail size={15} style={{ color: "hsl(38,78%,60%)" }} />
          </a>
          <a
            href="https://wa.me/919842362462"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-xl transition-all hover:scale-110"
            style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.25)" }}
            aria-label="WhatsApp"
          >
            <MessageCircle size={15} className="text-[#25d366]" />
          </a>
        </div>
      </div>

      {/* Quick links */}
      <div>
        <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "hsl(38,78%,60%)" }}>
          Quick Links
        </h4>
        <ul className="space-y-2.5">
          {quickLinks.map(l => (
            <li key={l.to}>
              <a
                href={l.to}
                className="text-[13px] text-white/50 transition-all hover:pl-1 hover:text-white/90"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Services */}
      <div>
        <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "hsl(38,78%,60%)" }}>
          Services
        </h4>
        <ul className="space-y-2.5">
          {services.map(s => (
            <li key={s.label}>
              <a
                href={s.to}
                className="text-[13px] text-white/50 transition-all hover:pl-1 hover:text-white/90"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact info */}
      <div>
        <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "hsl(38,78%,60%)" }}>
          Contact
        </h4>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <Phone size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(38,78%,55%)" }} />
            <div>
              <a href="tel:+917010105335" className="text-[13px] text-white/70 hover:text-white transition-colors">+91 7010105335</a>
              <br />
              <a href="tel:+919842362462" className="text-[12px] text-white/40 hover:text-white/70 transition-colors">+91 9842362462</a>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Mail size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(38,78%,55%)" }} />
            <a href="mailto:pasaravananlic@gmail.com" className="text-[13px] text-white/70 hover:text-white transition-colors">
              pasaravananlic@gmail.com
            </a>
          </li>
          <li className="flex items-start gap-3">
            <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(38,78%,55%)" }} />
            <p className="text-[13px] text-white/55 leading-relaxed">
              Atchaya, LIC Premium Point,<br />Karaikal – 609602
            </p>
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom bar */}
    <div
      className="border-t py-5"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-5">
        <p className="text-[12px] text-white/30">
          © {new Date().getFullYear()} JC.HGF.PA.SARAVANAN · Financial Consultant · All rights reserved.
        </p>
        <Link
          to="/admin"
          className="text-[10px] font-semibold uppercase tracking-wider text-white/20 transition-colors hover:text-white/50"
        >
          Admin
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
