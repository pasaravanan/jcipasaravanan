import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const HeroSection = () => (
  <section id="home" className="relative overflow-hidden bg-gradient-to-br from-[hsl(210,40%,96%)] via-[hsl(43,50%,97%)] to-[hsl(174,30%,95%)]">
    {/* Decorative shapes */}
    <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/10 to-teal/10 blur-3xl" />
    <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-gradient-to-tr from-gold/15 to-coral/10 blur-3xl" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-primary/5 to-teal/5 blur-3xl" />

    <div className="container relative mx-auto grid items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28 lg:py-32">
      {/* Photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="order-2 flex justify-center md:order-1 md:justify-start"
      >
        <div className="relative">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/20 via-gold/20 to-teal/20 blur-xl" />
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary via-gold to-teal opacity-30" />
          <img
            src={profilePhoto}
            alt="JC.HGF.PA.SARAVANAN – Financial Consultant"
            className="relative h-72 w-72 rounded-2xl border-4 border-white/80 object-cover shadow-2xl md:h-80 md:w-80"
          />
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute -bottom-4 -right-4 rounded-xl bg-white px-4 py-2 shadow-lg border border-border"
          >
            <p className="text-xs font-semibold text-muted-foreground">Trusted by</p>
            <p className="text-lg font-bold text-primary">500+ Families</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="order-1 text-center md:order-2 md:text-left"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5"
        >
          <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
          <span className="text-sm font-semibold text-primary">Available for Consultation</span>
        </motion.div>

        <h1 className="mb-5 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
          Your Trusted{" "}
          <span className="bg-gradient-to-r from-primary to-[hsl(217,71%,40%)] bg-clip-text text-transparent">
            Financial Consultant
          </span>{" "}
          in Karaikal
        </h1>

        <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
          Specialised in{" "}
          <span className="font-semibold text-primary">LIC Life Insurance</span>,{" "}
          <span className="font-semibold text-teal">UTI Mutual Funds</span> &{" "}
          <span className="font-semibold text-coral">Star Health Insurance</span>
        </p>

        <p className="mb-8 text-base text-muted-foreground/80">
          Helping families and professionals choose the right plans to secure their future with honest, personalised guidance.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-[hsl(217,71%,35%)] px-7 py-3.5 font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
          >
            Book a Free Consultation
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="tel:+917010105335"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary/20 bg-white/60 px-7 py-3.5 font-semibold text-primary shadow-sm backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-white hover:shadow-md"
          >
            <Phone size={18} />
            Call Now
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
