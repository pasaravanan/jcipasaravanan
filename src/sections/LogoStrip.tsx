import { motion } from "framer-motion";
import licLogo from "@/assets/lic-logo.png";
import utiLogo from "@/assets/uti-logo.png";
import starHealthLogo from "@/assets/star-health-logo.png";

const logos = [
  { name: "LIC", src: licLogo },
  { name: "UTI Mutual Fund", src: utiLogo },
  { name: "Star Health Insurance", src: starHealthLogo },
];

const LogoStrip = () => (
  <section className="bg-muted py-8">
    <div className="container mx-auto px-4 text-center">
      <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Solutions for you from:</p>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {logos.map((logo, i) => (
          <motion.div
            key={logo.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="flex h-24 w-48 items-center justify-center rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <img src={logo.src} alt={logo.name} className="max-h-16 max-w-full object-contain" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default LogoStrip;
