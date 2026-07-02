import { motion } from "framer-motion";
import { Shield, TrendingUp, HeartPulse, CheckCircle2, ArrowRight } from "lucide-react";
import licLogo from "@/assets/lic-logo.png";
import utiLogo from "@/assets/uti-logo.png";
import starHealthLogo from "@/assets/star-health-logo.png";

const sections = [
  {
    id: "lic",
    icon: Shield,
    color: "hsl(222,68%,22%)",
    lightBg: "#eef1f8",
    logo: licLogo,
    logoAlt: "LIC of India",
    title: "LIC Life Insurance Services",
    intro: "LIC of India is the most trusted name in life insurance. As your dedicated LIC consultant, I provide personalised guidance to select the policy that best matches your family's needs, income, and long-term goals.",
    points: [
      "Personal guidance to choose the right LIC policy",
      "Term Insurance – high cover, reasonable premium",
      "Endowment & Money-back savings policies",
      "Child education & marriage plans",
      "Retirement & pension solutions",
      "Tax savings under Section 80C",
      "Help with documentation & proposal forms",
      "Policy review for existing LIC policyholders",
    ],
    cta: "Confused about LIC policies? Get a free consultation.",
    ctaBg: "linear-gradient(135deg, hsl(222,68%,22%), hsl(222,60%,30%))",
    bg: "navy",
    blobColor: "hsl(222,80%,70%)",
  },
  {
    id: "uti",
    icon: TrendingUp,
    color: "hsl(170,72%,28%)",
    lightBg: "#eaf4f2",
    logo: utiLogo,
    logoAlt: "UTI Mutual Fund",
    title: "UTI Mutual Fund Services",
    intro: "UTI Mutual Fund offers a wide range of investment schemes for every investor profile. I help you plan disciplined, goal-based investments so your money works harder for your future.",
    points: [
      "SIP – systematic investment for long-term wealth",
      "Lump sum investments for specific goals",
      "Goal-based: education, marriage, retirement, home",
      "Risk profiling – conservative to aggressive",
      "Regular portfolio review & rebalancing",
    ],
    cta: "Start your UTI SIP with proper planning and expert guidance.",
    ctaBg: "linear-gradient(135deg, hsl(170,72%,28%), hsl(170,65%,36%))",
    bg: "teal",
    blobColor: "hsl(170,80%,60%)",
  },
  {
    id: "star",
    icon: HeartPulse,
    color: "hsl(14,70%,42%)",
    lightBg: "#f7efed",
    logo: starHealthLogo,
    logoAlt: "Star Health Insurance",
    title: "Star Health Insurance Services",
    intro: "Medical emergencies can strike anytime. Star Health Insurance provides comprehensive financial protection with the right coverage for individuals and entire families — and I guide you through every step.",
    points: [
      "Individual & family floater health plans",
      "Coverage for hospitalisation & major illnesses",
      "Cashless hospital network access",
      "Expert guidance on selecting sum insured",
      "End-to-end claim process assistance",
    ],
    cta: "Don't wait for an emergency — choose the right health plan today.",
    ctaBg: "linear-gradient(135deg, hsl(14,70%,44%), hsl(14,65%,52%))",
    bg: "coral",
    blobColor: "hsl(14,80%,65%)",
  },
];

const DetailedServices = () => (
  <div id="detailed-services">
    {sections.map((s, idx) => (
      <section
        key={s.id}
        className="section-pad border-t relative overflow-hidden"
        style={{
          borderColor: "rgba(0,0,0,0.06)",
          background: s.bg === "navy"
            ? "linear-gradient(155deg, hsl(250,70%,96%) 0%, hsl(265,65%,95%) 35%, hsl(280,60%,96%) 65%, hsl(250,65%,95%) 100%)"
            : s.bg === "teal"
            ? "linear-gradient(155deg, hsl(175,68%,93%) 0%, hsl(185,72%,92%) 40%, hsl(200,65%,93%) 70%, hsl(215,60%,95%) 100%)"
            : "linear-gradient(155deg, hsl(335,70%,96%) 0%, hsl(310,60%,95%) 35%, hsl(275,60%,95%) 65%, hsl(335,60%,96%) 100%)"
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="container mx-auto max-w-5xl px-5"
        >
          <div className={`grid gap-12 lg:grid-cols-2 ${idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            {/* Content side */}
            <div>
              {/* Header */}
              <div className="mb-6 flex items-center gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                  style={{ background: s.lightBg, border: `1.5px solid ${s.color}25` }}
                >
                  <s.icon size={28} style={{ color: s.color }} />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-normal leading-tight md:text-3xl" style={{ color: "hsl(222,68%,17%)" }}>
                    {s.title}
                  </h2>
                  <div className="mt-1 h-[2px] w-16 rounded-full" style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
                </div>
              </div>

              <p className="mb-7 text-[15px] leading-relaxed text-[hsl(215,16%,45%)]">{s.intro}</p>

              {/* Feature list */}
              <ul className="mb-8 space-y-3">
                {s.points.map(p => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 text-[14px] text-[hsl(222,55%,28%)]"
                  >
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: s.color }} />
                    {p}
                  </motion.li>
                ))}
              </ul>

              <p className="mb-5 text-sm font-semibold italic" style={{ color: s.color }}>{s.cta}</p>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
                style={{ background: s.ctaBg }}
              >
                Get a Free Consultation <ArrowRight size={14} />
              </a>
            </div>

            {/* Visual side – logo card + decorative */}
            <div className="flex flex-col items-center justify-center gap-5">
              <div
                className="flex w-full max-w-xs items-center justify-center rounded-2xl p-10"
                style={{ background: s.lightBg, border: `1px solid ${s.color}18` }}
              >
                <img src={s.logo} alt={s.logoAlt} className="max-h-24 max-w-[200px] object-contain" />
              </div>

              {/* Stat highlight */}
              <div
                className="w-full max-w-xs rounded-2xl p-6 text-center"
                style={{ background: "#fff", border: "1px solid #e8eaf0", boxShadow: "0 4px 20px rgba(12,30,74,0.07)" }}
              >
                <p className="font-display text-4xl font-normal" style={{ color: s.color }}>
                  {s.id === "lic" ? "500+" : s.id === "uti" ? "₹Cr+" : "100+"}
                </p>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-wider text-[hsl(215,16%,52%)]">
                  {s.id === "lic" ? "Policies Managed" : s.id === "uti" ? "Assets Guided" : "Health Plans"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    ))}
  </div>
);

export default DetailedServices;
