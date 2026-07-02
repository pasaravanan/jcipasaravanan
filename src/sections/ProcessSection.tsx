import { motion } from "framer-motion";
import { MessageSquare, ClipboardList, ShieldCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Free Consultation",
    desc: "We start with a one-on-one discussion — in person, phone, or WhatsApp — to understand your financial goals, income, and family needs.",
    color: "hsl(222,68%,22%)",
    bg: "#eef1f8",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Personalised Plan",
    desc: "Based on your profile, I recommend the right LIC policy, UTI fund SIP, or Star Health plan — with clear illustrations and no hidden jargon.",
    color: "hsl(38,71%,42%)",
    bg: "#fdf6ec",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Secure Your Future",
    desc: "I handle all documentation, proposal submission, and after-sales service. You focus on life — I take care of your financial security.",
    color: "hsl(170,72%,28%)",
    bg: "#eaf4f2",
  },
];

const ProcessSection = () => (
  <section className="section-pad relative overflow-hidden"
    style={{ background: "linear-gradient(155deg, hsl(175,68%,93%) 0%, hsl(185,72%,92%) 40%, hsl(200,65%,93%) 70%, hsl(215,60%,95%) 100%)" }}>

    {/* Decorative blobs */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-16 left-1/4 h-72 w-72 rounded-full opacity-25 blur-3xl"
        style={{ background: "hsl(175,80%,65%)" }} />
      <div className="absolute bottom-0 right-1/4 h-60 w-60 rounded-full opacity-20 blur-3xl"
        style={{ background: "hsl(200,80%,65%)" }} />
    </div>
    <div className="container relative mx-auto px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14 text-center"
      >
        <span className="label-tag mb-4 inline-block">How It Works</span>
        <h2 className="section-heading">
          Simple <span className="gold-text">3-Step Process</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[hsl(215,16%,50%)]">
          From your first question to a fully secured financial plan — the process is simple, transparent, and entirely guided by me.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="relative grid gap-8 md:grid-cols-3">
        {/* Connecting dashed line (desktop) */}
        <div
          className="absolute top-12 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] hidden h-px md:block"
          style={{
            backgroundImage: "repeating-linear-gradient(to right, hsl(38,71%,47%) 0, hsl(38,71%,47%) 8px, transparent 8px, transparent 16px)",
          }}
        />

        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative flex flex-col items-center text-center"
          >
            {/* Circle with number + icon */}
            <div className="relative mb-6">
              <div
                className="flex h-24 w-24 items-center justify-center rounded-full"
                style={{ background: step.bg, border: `2px solid ${step.color}25` }}
              >
                <step.icon size={34} style={{ color: step.color }} />
              </div>
              <div
                className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-md"
                style={{ background: step.color }}
              >
                {step.number}
              </div>
            </div>

            <h3 className="mb-3 font-display text-xl font-normal" style={{ color: "hsl(222,68%,17%)" }}>
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-[hsl(215,16%,50%)]">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-14 text-center"
      >
        <a href="#contact" className="btn-gold">
          Start Your Journey Today
        </a>
      </motion.div>
    </div>
  </section>
);

export default ProcessSection;
