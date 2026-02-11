import { motion } from "framer-motion";
import profilePhoto from "@/assets/profile-photo.jpg";

const HeroSection = () => (
  <section id="home" className="relative overflow-hidden bg-gradient-to-br from-primary via-[hsl(220,50%,15%)] to-navy">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--gold)/0.15),transparent_60%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--teal)/0.1),transparent_50%)]" />
    <div className="container relative mx-auto grid items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="order-2 flex justify-center md:order-1 md:justify-start"
      >
        <div className="relative">
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-gold via-teal to-gold opacity-60 blur-lg" />
          <img
            src={profilePhoto}
            alt="JC.HGF.PA.SARAVANAN – Financial Consultant"
            className="relative h-64 w-64 rounded-2xl border-4 border-gold object-cover shadow-2xl md:h-80 md:w-80"
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="order-1 text-center md:order-2 md:text-left"
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">Financial Consultant</p>
        <h1 className="mb-4 font-display text-3xl font-bold leading-tight text-primary-foreground md:text-4xl lg:text-5xl">
          Financial Consultant in Karaikal – Specialised in{" "}
          <span className="text-gold">LIC</span>, <span className="text-teal">UTI Mutual Funds</span> &{" "}
          <span className="text-coral">Star Health Insurance</span>
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-primary-foreground/80">
          Helping families and professionals choose the right LIC life insurance, mutual fund investments and health insurance to secure their future.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg bg-gold px-6 py-3 font-semibold text-gold-foreground shadow-lg transition-all hover:scale-105 hover:shadow-gold/30"
          >
            Book a LIC Consultation
          </a>
          <a
            href="#detailed-services"
            className="inline-flex items-center justify-center rounded-lg border-2 border-primary-foreground/30 px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            View All Financial Services
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
