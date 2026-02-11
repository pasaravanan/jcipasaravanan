import { CheckCircle, Award, Users, Brain, HeartHandshake, Lightbulb } from "lucide-react";

const reasons = [
  { icon: Award, title: "Experienced LIC & UTI Consultant", desc: "Years of hands-on experience in LIC life insurance and UTI mutual fund planning." },
  { icon: HeartHandshake, title: "End-to-End Support", desc: "From policy selection to paperwork to after-sales service — I handle everything." },
  { icon: Brain, title: "HRD Trainer Background", desc: "My training background lets me explain complex financial products in simple, understandable language." },
  { icon: Users, title: "Trained Thousands", desc: "Worked with students, professionals and entrepreneurs — I understand different financial needs." },
  { icon: Lightbulb, title: "Honest, Long-term Advice", desc: "I focus on what's right for you, not just what sells. Long-term client relationships are my priority." },
  { icon: CheckCircle, title: "ASK Approach", desc: "Attitude, Skills & Knowledge — I help clients build the right financial mindset for lasting success." },
];

const WhyChooseMe = () => (
  <>
    <div className="bg-primary py-12 text-center">
      <h1 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">Why Choose Me</h1>
      <p className="mt-2 text-primary-foreground/70">Your trusted financial partner in Karaikal</p>
    </div>

    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-3 inline-flex rounded-lg bg-gold/15 p-3">
                <r.icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold text-foreground">{r.title}</h3>
              <p className="text-sm text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-primary px-8 py-10 text-center">
          <p className="font-display text-2xl font-bold italic text-gold md:text-3xl">
            "Right Financial Advice. Right LIC Plan. Right Time."
          </p>
        </div>
      </div>
    </section>
  </>
);

export default WhyChooseMe;
