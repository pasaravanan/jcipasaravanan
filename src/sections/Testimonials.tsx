import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Ramesh K.", location: "Karaikal", text: "Mr. Saravanan helped my family choose the right LIC policies and Star Health plan. The process was very smooth and he explained everything clearly." },
  { name: "Priya S.", location: "Working Professional", text: "He explained UTI mutual funds in simple language and helped me start a disciplined SIP. Very knowledgeable and patient consultant." },
  { name: "Mahesh V.", location: "Karaikal", text: "Very patient and honest. Cleared all my doubts about LIC and retirement planning. I now feel confident about my family's financial future." },
  { name: "Lakshmi R.", location: "Homemaker", text: "I feel more secure now with proper insurance and investment planning. Mr. Saravanan took the time to understand my family's needs." },
  { name: "Suresh M.", location: "Entrepreneur", text: "As a business owner I had no time for financial planning. Saravanan sir made it easy — LIC for protection, UTI for growth. Highly recommended!" },
];

const Testimonials = () => (
  <section id="testimonials" className="bg-gradient-to-br from-[hsl(43,40%,96%)] via-[hsl(210,30%,96%)] to-[hsl(174,30%,95%)] py-16">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Client <span className="text-gold">Testimonials</span>
        </h2>
        <p className="mt-2 text-muted-foreground">What my clients say</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className="mb-3 flex gap-1">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="mb-4 italic text-muted-foreground">"{t.text}"</p>
            <div className="border-t border-border pt-3">
              <p className="font-semibold text-foreground">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
