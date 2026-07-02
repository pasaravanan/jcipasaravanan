import { motion } from "framer-motion";
import { Shield, TrendingUp, HeartPulse, ArrowRight, CheckCircle2 } from "lucide-react";
import licLogo from "@/assets/lic-logo.png";
import utiLogo from "@/assets/uti-logo.png";
import starHealthLogo from "@/assets/star-health-logo.png";

const services = [
  {
    icon: Shield,
    color: "hsl(222,68%,22%)",
    lightBg: "#eef1f8",
    logo: licLogo,
    logoAlt: "LIC",
    title: "LIC Life Insurance",
    subtitle: "Protection & Savings",
    desc: "India's most trusted life insurer. Choose the right plan that matches your family's needs, income and future goals.",
    features: [
      "Term Insurance – high cover, low premium",
      "Endowment & money-back savings plans",
      "Child education & marriage plans",
      "Retirement & pension solutions",
      "Tax savings under Section 80C",
    ],
    cta: "Explore LIC Plans",
    border: "hsl(222,68%,22%)",
  },
  {
    icon: TrendingUp,
    color: "hsl(170,72%,28%)",
    lightBg: "#eaf4f2",
    logo: utiLogo,
    logoAlt: "UTI",
    title: "UTI Mutual Funds",
    subtitle: "Wealth Creation",
    desc: "Disciplined SIP investments aligned to your goals. I help you choose the right fund based on your risk profile.",
    features: [
      "SIP – systematic wealth creation",
      "Goal-based: education, home, retirement",
      "Risk profiling – conservative to aggressive",
      "Lump sum & systematic investments",
      "Regular portfolio review & rebalancing",
    ],
    cta: "Start Investing",
    border: "hsl(170,72%,28%)",
  },
  {
    icon: HeartPulse,
    color: "hsl(14,70%,42%)",
    lightBg: "#f7efed",
    logo: starHealthLogo,
    logoAlt: "Star Health",
    title: "Star Health Insurance",
    subtitle: "Health Protection",
    desc: "Comprehensive medical coverage for individuals and families. Full claim support from start to finish.",
    features: [
      "Individual & family floater plans",
      "Hospitalization & major illness cover",
      "Cashless hospital network",
      "Right sum insured guidance",
      "Complete claim process support",
    ],
    cta: "Get Health Cover",
    border: "hsl(14,70%,42%)",
  },
];

const ServicesCards = () => (
  <section id="services" className="section-pad relative overflow-hidden"
    style={{ background: "linear-gradient(155deg, hsl(250,70%,97%) 0%, hsl(265,65%,95%) 40%, hsl(220,60%,95%) 70%, hsl(38,60%,96%) 100%)" }}>

    {/* Decorative blobs */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "hsl(265,80%,70%)" }} />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full opacity-15 blur-3xl"
        style={{ background: "hsl(38,90%,65%)" }} />
    </div>
    <div className="container relative mx-auto px-5">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <span className="label-tag mb-4 block w-fit">Our Services</span>
          <h2 className="section-heading">
            Comprehensive<br /><span className="gold-text">Financial Services</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-[hsl(215,16%,50%)]">
          Three pillars of financial security, delivered with personal guidance and end-to-end support.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid gap-7 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="group flex flex-col rounded-2xl overflow-hidden bg-white transition-all duration-300"
            style={{
              border: "1px solid #e8eaf0",
              boxShadow: "0 2px 16px rgba(12,30,74,0.06)",
            }}
            whileHover={{ y: -6 }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = s.border + "55";
              el.style.boxShadow = `0 16px 48px rgba(12,30,74,0.12)`;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "#e8eaf0";
              el.style.boxShadow = "0 2px 16px rgba(12,30,74,0.06)";
            }}
          >
            {/* Card top – colored header */}
            <div className="relative px-7 pt-7 pb-5" style={{ background: s.lightBg }}>
              {/* Left border accent */}
              <div className="absolute left-0 inset-y-0 w-1 rounded-r-full" style={{ background: s.color }} />

              <div className="flex items-start justify-between gap-3">
                <div>
                  <div
                    className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: s.color + "18", border: `1.5px solid ${s.color}30` }}
                  >
                    <s.icon size={24} style={{ color: s.color }} />
                  </div>
                  <h3 className="font-display text-[1.35rem] font-normal leading-tight" style={{ color: "hsl(222,68%,17%)" }}>
                    {s.title}
                  </h3>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: s.color }}>
                    {s.subtitle}
                  </p>
                </div>
                <img src={s.logo} alt={s.logoAlt} className="h-10 w-24 object-contain shrink-0 mt-1 opacity-80" />
              </div>
            </div>

            {/* Card body */}
            <div className="flex flex-1 flex-col px-7 py-6">
              <p className="mb-5 text-sm leading-relaxed text-[hsl(215,16%,48%)]">{s.desc}</p>

              {/* Feature list */}
              <ul className="mb-6 flex-1 space-y-2.5">
                {s.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-[13px] text-[hsl(222,55%,28%)]">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: s.color }} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className="group/link mt-auto inline-flex items-center gap-2 text-[13px] font-semibold transition-all"
                style={{ color: s.color }}
              >
                {s.cta}
                <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesCards;
