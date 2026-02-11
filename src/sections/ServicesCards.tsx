import { motion } from "framer-motion";
import { Shield, TrendingUp, HeartPulse } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "LIC Life Insurance",
    tag: "Main Service",
    desc: "Protection for your family with term plans, savings plans, child plans and retirement solutions through LIC.",
    color: "from-primary to-primary/80",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: TrendingUp,
    title: "UTI Mutual Funds",
    desc: "Grow your wealth through SIPs and well-planned mutual fund investments tailored to your goals.",
    color: "from-teal to-teal/80",
    iconBg: "bg-teal/10",
    iconColor: "text-teal",
  },
  {
    icon: HeartPulse,
    title: "Star Health Insurance",
    desc: "Protect your health and finances with the right medical insurance and claim support.",
    color: "from-coral to-coral/80",
    iconBg: "bg-coral/10",
    iconColor: "text-coral",
  },
];

const ServicesCards = () => (
  <section id="services" className="py-16">
    <div className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center font-display text-3xl font-bold text-foreground"
      >
        Our <span className="text-gold">Financial Services</span>
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-xl"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.color}`} />
            <div className={`mb-4 inline-flex rounded-lg ${s.iconBg} p-3`}>
              <s.icon className={`h-7 w-7 ${s.iconColor}`} />
            </div>
            {s.tag && (
              <span className="mb-2 inline-block rounded-full bg-gold/20 px-3 py-0.5 text-xs font-bold text-gold">
                {s.tag}
              </span>
            )}
            <h3 className="mb-2 font-display text-xl font-bold text-foreground">{s.title}</h3>
            <p className="text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesCards;
