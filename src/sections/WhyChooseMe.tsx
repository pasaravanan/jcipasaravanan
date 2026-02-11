import { motion } from "framer-motion";
import { Award, Users, Brain, HeartHandshake, Lightbulb, CheckCircle } from "lucide-react";

const reasons = [
  { icon: Award, title: "Experienced LIC & UTI Consultant", desc: "Years of hands-on experience in LIC life insurance and UTI mutual fund planning.", color: "text-primary" },
  { icon: HeartHandshake, title: "End-to-End Support", desc: "From policy selection to paperwork to after-sales service — I handle everything.", color: "text-gold" },
  { icon: Brain, title: "HRD Trainer Background", desc: "My training background lets me explain complex financial products in simple, understandable language.", color: "text-teal" },
  { icon: Users, title: "Trained Thousands", desc: "Worked with students, professionals and entrepreneurs — I understand different financial needs.", color: "text-coral" },
  { icon: Lightbulb, title: "Honest, Long-term Advice", desc: "I focus on what's right for you, not just what sells. Long-term client relationships are my priority.", color: "text-primary" },
  { icon: CheckCircle, title: "ASK Approach", desc: "Attitude, Skills & Knowledge — I help clients build the right financial mindset for lasting success.", color: "text-gold" },
];

const WhyChooseMe = () => (
  <section id="why-choose-me" className="bg-gradient-to-br from-[hsl(210,30%,96%)] via-[hsl(16,40%,96%)] to-[hsl(43,50%,95%)] py-16">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Why <span className="text-gold">Choose Me</span>
        </h2>
        <p className="mt-2 text-muted-foreground">Your trusted financial partner in Karaikal</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className="mb-3 inline-flex rounded-lg bg-muted p-3">
              <r.icon className={`h-6 w-6 ${r.color}`} />
            </div>
            <h3 className="mb-2 font-display text-lg font-bold text-foreground">{r.title}</h3>
            <p className="text-sm text-muted-foreground">{r.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-12 rounded-2xl bg-gradient-to-r from-primary via-primary to-navy px-8 py-10 text-center"
      >
        <p className="font-display text-2xl font-bold italic text-gold md:text-3xl">
          "Right Financial Advice. Right LIC Plan. Right Time."
        </p>
      </motion.div>
    </div>
  </section>
);

export default WhyChooseMe;
