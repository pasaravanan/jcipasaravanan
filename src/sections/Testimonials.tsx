import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const featured = {
  name: "Suresh M.",
  location: "Entrepreneur, Karaikal",
  initials: "SM",
  text: "As a business owner, I had no time for financial planning. Saravanan sir made it remarkably simple — LIC for protection, UTI for long-term growth. He handled everything from paperwork to policy review. I couldn't have asked for a more dedicated financial advisor.",
};

const testimonials = [
  {
    name: "Ramesh K.",
    location: "Karaikal",
    initials: "RK",
    text: "Mr. Saravanan helped my family choose the right LIC policies and Star Health plan. The process was smooth and he explained everything clearly.",
  },
  {
    name: "Priya S.",
    location: "Working Professional",
    initials: "PS",
    text: "He explained UTI mutual funds in simple language and helped me start a disciplined SIP. Very knowledgeable and patient consultant.",
  },
  {
    name: "Mahesh V.",
    location: "Karaikal",
    initials: "MV",
    text: "Very patient and honest. Cleared all my doubts about LIC and retirement planning. I feel confident about my family's financial future.",
  },
  {
    name: "Lakshmi R.",
    location: "Homemaker",
    initials: "LR",
    text: "I feel more secure with proper insurance and investment planning. Saravanan took the time to truly understand our family's needs.",
  },
];

const Testimonials = () => (
  <section id="testimonials" className="section-pad relative overflow-hidden"
    style={{ background: "linear-gradient(155deg, hsl(335,70%,96%) 0%, hsl(310,60%,95%) 35%, hsl(275,60%,95%) 65%, hsl(335,60%,96%) 100%)" }}>

    {/* Decorative blobs */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-16 right-1/3 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "hsl(335,80%,70%)" }} />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full opacity-15 blur-3xl"
        style={{ background: "hsl(280,80%,70%)" }} />
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
          <span className="label-tag mb-4 inline-block">Testimonials</span>
          <h2 className="section-heading">
            What My Clients<br /><span className="gold-text">Say About Me</span>
          </h2>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4" style={{ border: "1px solid #e8eaf0" }}>
          <div>
            <div className="flex gap-0.5 mb-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-[hsl(38,71%,47%)] text-[hsl(38,71%,47%)]" />)}
            </div>
            <p className="text-[12px] text-[hsl(215,16%,52%)]">Trusted by 500+ families</p>
          </div>
        </div>
      </motion.div>

      {/* Featured testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mb-8 overflow-hidden rounded-2xl p-8 md:p-12"
        style={{
          background: "linear-gradient(135deg, hsl(222,68%,17%) 0%, hsl(222,60%,22%) 100%)",
        }}
      >
        {/* Large quote icon */}
        <Quote
          size={80}
          className="absolute right-8 top-6 opacity-10"
          style={{ color: "hsl(38,71%,47%)" }}
        />

        {/* Stars */}
        <div className="mb-5 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="fill-[hsl(38,71%,47%)] text-[hsl(38,71%,47%)]" />
          ))}
        </div>

        <p className="mb-8 font-display text-xl font-normal italic leading-relaxed text-white md:text-2xl md:leading-relaxed">
          "{featured.text}"
        </p>

        <div className="flex items-center gap-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-[hsl(222,68%,15%)]"
            style={{ background: "linear-gradient(135deg, hsl(38,71%,52%), hsl(38,80%,62%))" }}
          >
            {featured.initials}
          </div>
          <div>
            <p className="font-semibold text-white">{featured.name}</p>
            <p className="text-[12px] text-white/55">{featured.location}</p>
          </div>
        </div>
      </motion.div>

      {/* Mini cards grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.09 }}
            className="group rounded-2xl bg-white p-5 transition-all duration-300"
            style={{ border: "1px solid #e8eaf0", boxShadow: "0 2px 12px rgba(12,30,74,0.05)" }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "hsl(38,71%,47%,0.35)";
              el.style.boxShadow = "0 10px 32px rgba(12,30,74,0.10)";
              el.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "#e8eaf0";
              el.style.boxShadow = "0 2px 12px rgba(12,30,74,0.05)";
              el.style.transform = "translateY(0)";
            }}
          >
            {/* Stars */}
            <div className="mb-3 flex gap-0.5">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={12} className="fill-[hsl(38,71%,47%)] text-[hsl(38,71%,47%)]" />
              ))}
            </div>

            <p className="mb-4 text-[13px] leading-relaxed text-[hsl(215,16%,44%)] italic">"{t.text}"</p>

            {/* Author */}
            <div className="flex items-center gap-2.5 border-t border-[#e8eaf0] pt-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold"
                style={{
                  background: "linear-gradient(135deg, hsl(222,68%,20%), hsl(222,60%,30%))",
                  color: "#fff",
                }}
              >
                {t.initials}
              </div>
              <div>
                <p className="text-[13px] font-semibold" style={{ color: "hsl(222,68%,17%)" }}>{t.name}</p>
                <p className="text-[11px] text-[hsl(215,16%,52%)]">{t.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
