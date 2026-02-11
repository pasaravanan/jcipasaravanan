import { motion } from "framer-motion";
import { Shield, TrendingUp, HeartPulse, CheckCircle } from "lucide-react";
import licLogo from "@/assets/lic-logo.png";
import utiLogo from "@/assets/uti-logo.png";
import starHealthLogo from "@/assets/star-health-logo.png";

const licPoints = [
  "Personal guidance to choose the right LIC policy",
  "Term Insurance – high cover, reasonable premium",
  "Endowment & Money-back policies for savings",
  "Child education & marriage plans",
  "Retirement & pension plans",
  "Tax-saving benefits under Section 80C",
  "Help with documentation and proposal forms",
  "Policy review for existing LIC policyholders",
];

const utiPoints = [
  "SIP (Systematic Investment Plan) for long-term wealth creation",
  "Lump sum investments for specific goals",
  "Goal-based planning: children's education, marriage, retirement, house",
  "Risk profiling – conservative, moderate, aggressive",
  "Regular portfolio review and guidance",
];

const starPoints = [
  "Individual and family floater plans",
  "Coverage for hospitalization and major illnesses",
  "Cashless hospital network support",
  "Guidance on selecting sum insured and plan type",
  "Help with claim process and documentation",
];

const sections = [
  {
    id: "lic",
    icon: Shield,
    title: "LIC Life Insurance Services",
    logo: licLogo,
    logoAlt: "LIC Logo",
    intro: "LIC of India is the most trusted name in life insurance. As your dedicated LIC consultant, I help you choose the right policy that matches your family's needs, income and goals.",
    points: licPoints,
    cta: "Confused about LIC policies? Get a free LIC plan consultation today.",
    gradient: "from-primary/5 to-transparent",
    accentColor: "text-primary",
    borderColor: "border-primary/20",
  },
  {
    id: "uti",
    icon: TrendingUp,
    title: "UTI Mutual Fund Services",
    logo: utiLogo,
    logoAlt: "UTI Mutual Fund Logo",
    intro: "UTI Mutual Fund offers a wide range of schemes for every investor profile. I help you plan disciplined investments so your money works hard for your future.",
    points: utiPoints,
    cta: "Start your UTI mutual fund investment with proper planning and guidance.",
    gradient: "from-teal/5 to-transparent",
    accentColor: "text-teal",
    borderColor: "border-teal/20",
  },
  {
    id: "star",
    icon: HeartPulse,
    title: "Star Health Insurance Services",
    logo: starHealthLogo,
    logoAlt: "Star Health Insurance Logo",
    intro: "Medical emergencies can happen anytime. Star Health Insurance gives you financial protection with comprehensive health coverage for individuals and families.",
    points: starPoints,
    cta: "Choose the right Star Health insurance policy before a medical emergency happens.",
    gradient: "from-coral/5 to-transparent",
    accentColor: "text-coral",
    borderColor: "border-coral/20",
  },
];

const DetailedServices = () => (
  <div id="detailed-services">
    {sections.map((s, idx) => (
      <section key={s.id} className={`border-b border-border py-16 last:border-b-0 bg-gradient-to-r ${s.gradient}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-4xl px-4"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className={`rounded-lg bg-card p-3 shadow-sm border ${s.borderColor}`}>
              <s.icon className={`h-8 w-8 ${s.accentColor}`} />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">{s.title}</h2>
          </div>

          <div className="mb-6 flex h-20 w-44 items-center justify-center rounded-lg border border-border bg-card p-3 shadow-sm">
            <img src={s.logo} alt={s.logoAlt} className="max-h-14 max-w-full object-contain" />
          </div>

          <p className="mb-6 text-lg leading-relaxed text-muted-foreground">{s.intro}</p>

          <ul className="mb-8 grid gap-3 sm:grid-cols-2">
            {s.points.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-2 text-foreground"
              >
                <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <span>{p}</span>
              </motion.li>
            ))}
          </ul>

          <p className={`mb-4 text-lg font-semibold italic ${s.accentColor}`}>{s.cta}</p>

          <a
            href="#contact"
            className="inline-flex items-center rounded-lg bg-gold px-6 py-3 font-semibold text-gold-foreground shadow transition-all hover:scale-105 hover:shadow-lg"
          >
            Get a Free Consultation
          </a>
        </motion.div>
      </section>
    ))}
  </div>
);

export default DetailedServices;
