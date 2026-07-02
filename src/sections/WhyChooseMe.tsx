import { motion } from "framer-motion";
import { Award, Users, Brain, HeartHandshake, Lightbulb, CheckCircle2, TrendingUp, Clock, Star } from "lucide-react";

const bigStats = [
  { value: "500+", label: "Families Secured",    icon: Users,      color: "hsl(222,68%,22%)" },
  { value: "10+",  label: "Years Experience",     icon: Clock,      color: "hsl(38,71%,42%)"  },
  { value: "3",    label: "Trusted Brands",       icon: Star,       color: "hsl(170,72%,28%)" },
  { value: "1000+",label: "People Trained",       icon: TrendingUp, color: "hsl(14,70%,42%)"  },
];

const reasons = [
  {
    num: "01",
    icon: Award,
    title: "Experienced LIC & UTI Consultant",
    desc: "Years of hands-on experience helping families and professionals with LIC life insurance and UTI mutual fund planning.",
    color: "hsl(222,68%,22%)",
  },
  {
    num: "02",
    icon: HeartHandshake,
    title: "End-to-End Support",
    desc: "From policy selection and documentation to after-sales service — I manage every step so you don't have to worry.",
    color: "hsl(38,71%,42%)",
  },
  {
    num: "03",
    icon: Brain,
    title: "HRD Trainer Background",
    desc: "My trainer background means I explain complex financial products in clear, simple language that anyone can understand.",
    color: "hsl(170,72%,28%)",
  },
  {
    num: "04",
    icon: Users,
    title: "Trained Thousands",
    desc: "I've worked with students, professionals, and entrepreneurs — which gives me a deep understanding of diverse financial needs.",
    color: "hsl(14,70%,42%)",
  },
  {
    num: "05",
    icon: Lightbulb,
    title: "Honest, Long-term Advice",
    desc: "I focus on what's genuinely right for your situation — not what earns the highest commission. Your trust is my priority.",
    color: "hsl(222,68%,22%)",
  },
  {
    num: "06",
    icon: CheckCircle2,
    title: "The ASK Approach",
    desc: "Attitude + Skills + Knowledge — I apply this philosophy to help every client build a confident financial mindset.",
    color: "hsl(38,71%,42%)",
  },
];

const WhyChooseMe = () => (
  <section id="why-choose-me" className="section-pad relative overflow-hidden"
    style={{ background: "linear-gradient(155deg, hsl(250,70%,96%) 0%, hsl(265,65%,95%) 35%, hsl(280,60%,96%) 65%, hsl(250,65%,95%) 100%)" }}>

    {/* Decorative blobs */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-0 right-0 h-80 w-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "hsl(265,80%,70%)" }} />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full opacity-15 blur-3xl"
        style={{ background: "hsl(250,80%,70%)" }} />
    </div>
    <div className="container relative mx-auto px-5">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14 text-center"
      >
        <span className="label-tag mb-4 inline-block">Why Choose Me</span>
        <h2 className="section-heading">
          The <span className="gold-text">Trusted Choice</span>
          <br />for Financial Planning
        </h2>
      </motion.div>

      {/* Big stat strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {bigStats.map((s, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white p-6 text-center"
            style={{
              border: "1px solid #e8eaf0",
              boxShadow: "0 2px 12px rgba(12,30,74,0.06)",
            }}
          >
            <div
              className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: s.color + "12", border: `1.5px solid ${s.color}25` }}
            >
              <s.icon size={22} style={{ color: s.color }} />
            </div>
            <div className="font-display text-3xl font-normal" style={{ color: "hsl(222,68%,17%)" }}>{s.value}</div>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[hsl(215,16%,52%)]">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Numbered reason cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r, i) => (
          <motion.div
            key={r.num}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group relative rounded-2xl bg-white p-6 transition-all duration-300"
            style={{ border: "1px solid #e8eaf0", boxShadow: "0 2px 12px rgba(12,30,74,0.05)" }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "0 12px 36px rgba(12,30,74,0.11)";
              el.style.borderColor = r.color + "40";
              el.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "0 2px 12px rgba(12,30,74,0.05)";
              el.style.borderColor = "#e8eaf0";
              el.style.transform = "translateY(0)";
            }}
          >
            {/* Big number watermark */}
            <span
              className="absolute right-5 top-4 font-display text-5xl font-normal leading-none select-none"
              style={{ color: r.color, opacity: 0.07 }}
            >
              {r.num}
            </span>

            <div
              className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
              style={{ background: r.color + "12", border: `1.5px solid ${r.color}25` }}
            >
              <r.icon size={20} style={{ color: r.color }} />
            </div>

            <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: r.color }}>
              {r.num}
            </p>
            <h3 className="mb-2 font-display text-lg font-normal" style={{ color: "hsl(222,68%,17%)" }}>{r.title}</h3>
            <p className="text-[13px] leading-relaxed text-[hsl(215,16%,50%)]">{r.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Quote banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mt-14 overflow-hidden rounded-2xl px-10 py-12 text-center"
        style={{
          background: "linear-gradient(135deg, hsl(222,68%,17%) 0%, hsl(222,60%,22%) 100%)",
        }}
      >
        {/* Decorative elements */}
        <div className="absolute left-8 top-6 font-display text-8xl font-normal leading-none text-white opacity-[0.06]">"</div>
        <div className="absolute right-8 bottom-2 font-display text-8xl font-normal leading-none text-white opacity-[0.06]">"</div>

        <p className="relative font-display text-2xl font-normal italic text-white md:text-3xl">
          "Right Financial Advice. Right LIC Plan.{" "}
          <span style={{ color: "hsl(38,80%,60%)" }}>Right Time.</span>"
        </p>
        <p className="relative mt-3 text-[12px] font-semibold uppercase tracking-widest text-white/50">
          — JC.HGF.PA.SARAVANAN
        </p>
      </motion.div>
    </div>
  </section>
);

export default WhyChooseMe;
