import { motion } from "framer-motion";

const AboutIntro = () => (
  <section className="bg-gradient-to-br from-muted via-background to-muted py-16">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="container mx-auto max-w-3xl px-4 text-center"
    >
      <h2 className="mb-4 font-display text-2xl font-bold text-foreground">About Your Financial Consultant</h2>
      <p className="text-lg leading-relaxed text-muted-foreground">
        JC.HGF.PA.SARAVANAN is a Karaikal-based Financial Consultant helping individuals, families and entrepreneurs with LIC life insurance, UTI mutual fund investments and Star Health Insurance. With strong experience in both finance and training, he explains complex financial products in simple language and helps clients choose the right plan for their needs.
      </p>
      <a href="#about" className="mt-6 inline-block font-semibold text-primary hover:text-gold transition-colors">
        Learn more about me →
      </a>
    </motion.div>
  </section>
);

export default AboutIntro;
