import { motion } from "framer-motion";
import { Calculator, Shield, TrendingUp, HeartPulse } from "lucide-react";
import { useState } from "react";
import LICCalculator from "@/components/calculators/LICCalculator";
import UTICalculator from "@/components/calculators/UTICalculator";
import StarHealthCalculator from "@/components/calculators/StarHealthCalculator";

const tabs = [
  {
    id: "lic",
    icon: Shield,
    label: "LIC Insurance",
    color: "hsl(222,68%,22%)",
    bg: "#eef1f8",
    desc: "Estimate your LIC premium and maturity value",
  },
  {
    id: "uti",
    icon: TrendingUp,
    label: "UTI Mutual Fund",
    color: "hsl(170,72%,28%)",
    bg: "#eaf4f2",
    desc: "Project your SIP growth over time",
  },
  {
    id: "star",
    icon: HeartPulse,
    label: "Star Health",
    color: "hsl(14,70%,42%)",
    bg: "#f7efed",
    desc: "Get an instant health insurance estimate",
  },
];

const CalculatorsSection = () => {
  const [active, setActive] = useState("lic");
  const current = tabs.find(t => t.id === active)!;

  return (
    <section id="calculators" className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(155deg, hsl(168,72%,94%) 0%, hsl(180,68%,93%) 40%, hsl(195,62%,94%) 70%, hsl(215,58%,95%) 100%)" }}>

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 right-0 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ background: "hsl(170,80%,60%)" }} />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full opacity-15 blur-3xl"
          style={{ background: "hsl(200,80%,65%)" }} />
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
            <span className="label-tag mb-4 flex w-fit items-center gap-2">
              <Calculator size={12} /> Free Tools
            </span>
            <h2 className="section-heading">
              Financial <span className="gold-text">Calculators</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[hsl(215,16%,50%)]">
            Estimate premiums, project wealth growth, and download your results as PDF or share on WhatsApp.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl"
          style={{ border: "1px solid #e8eaf0", boxShadow: "0 8px 40px rgba(12,30,74,0.08)" }}
        >
          <div className="grid lg:grid-cols-[280px_1fr]">
            {/* Left: vertical tab list */}
            <div
              className="flex flex-row overflow-x-auto lg:flex-col lg:overflow-x-visible"
              style={{ background: "#f7f8fc", borderRight: "1px solid #e8eaf0" }}
            >
              <div className="p-4 pb-0 lg:p-6 lg:pb-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[hsl(215,16%,52%)]">Select Calculator</p>
              </div>
              <div className="flex flex-row gap-2 p-4 pt-2 lg:flex-col lg:gap-3 lg:p-6 lg:pt-3">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActive(tab.id)}
                    className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left transition-all lg:w-full"
                    style={{
                      background: active === tab.id ? tab.color : "transparent",
                      color: active === tab.id ? "#fff" : "hsl(222,55%,30%)",
                      boxShadow: active === tab.id ? `0 4px 16px ${tab.color}40` : "none",
                    }}
                  >
                    <tab.icon size={18} />
                    <div className="hidden lg:block">
                      <p className="text-[13px] font-semibold leading-tight">{tab.label}</p>
                      <p className="mt-0.5 text-[11px] opacity-75">{tab.desc}</p>
                    </div>
                    <span className="lg:hidden text-[12px] font-semibold">{tab.label.split(" ")[0]}</span>
                  </button>
                ))}
              </div>

              {/* Promo box (desktop only) */}
              <div
                className="mx-6 mb-6 mt-auto hidden rounded-xl p-4 lg:block"
                style={{ background: current.bg, border: `1px solid ${current.color}20` }}
              >
                <p className="text-[11px] font-semibold" style={{ color: current.color }}>
                  Need help interpreting results?
                </p>
                <a href="#contact" className="mt-2 block text-[12px] font-bold underline underline-offset-2" style={{ color: current.color }}>
                  Book a free consultation →
                </a>
              </div>
            </div>

            {/* Right: calculator content */}
            <div className="p-6 lg:p-8">
              {active === "lic"  && <LICCalculator />}
              {active === "uti"  && <UTICalculator />}
              {active === "star" && <StarHealthCalculator />}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CalculatorsSection;