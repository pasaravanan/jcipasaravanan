import { Star } from "lucide-react";

const testimonials = [
  { name: "Ramesh K.", location: "Karaikal", text: "Mr. Saravanan helped my family choose the right LIC policies and Star Health plan. The process was very smooth and he explained everything clearly." },
  { name: "Priya S.", location: "Working Professional", text: "He explained UTI mutual funds in simple language and helped me start a disciplined SIP. Very knowledgeable and patient consultant." },
  { name: "Mahesh V.", location: "Karaikal", text: "Very patient and honest. Cleared all my doubts about LIC and retirement planning. I now feel confident about my family's financial future." },
  { name: "Lakshmi R.", location: "Homemaker", text: "I feel more secure now with proper insurance and investment planning. Mr. Saravanan took the time to understand my family's needs." },
  { name: "Suresh M.", location: "Entrepreneur", text: "As a business owner I had no time for financial planning. Saravanan sir made it easy — LIC for protection, UTI for growth. Highly recommended!" },
];

const Testimonials = () => (
  <>
    <div className="bg-primary py-12 text-center">
      <h1 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">Testimonials</h1>
      <p className="mt-2 text-primary-foreground/70">What my clients say</p>
    </div>

    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-3 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="mb-4 italic text-muted-foreground">"{t.text}"</p>
              <p className="font-semibold text-foreground">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Testimonials;
