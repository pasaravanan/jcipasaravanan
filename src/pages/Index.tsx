import { Link } from "react-router-dom";
import { Shield, TrendingUp, HeartPulse } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";
import LogoStrip from "@/components/LogoStrip";

const services = [
  {
    icon: Shield,
    title: "LIC Life Insurance",
    tag: "Main Service",
    desc: "Protection for your family with term plans, savings plans, child plans and retirement solutions through LIC.",
  },
  {
    icon: TrendingUp,
    title: "UTI Mutual Funds",
    desc: "Grow your wealth through SIPs and well-planned mutual fund investments tailored to your goals.",
  },
  {
    icon: HeartPulse,
    title: "Star Health Insurance",
    desc: "Protect your health and finances with the right medical insurance and claim support.",
  },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--gold)/0.15),transparent_60%)]" />
        <div className="container relative mx-auto grid items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="order-2 flex justify-center md:order-1 md:justify-start">
            <img
              src={profilePhoto}
              alt="JC.HGF.PA.SARAVANAN – Financial Consultant"
              className="h-64 w-64 rounded-2xl border-4 border-gold object-cover shadow-2xl md:h-80 md:w-80"
            />
          </div>
          <div className="order-1 text-center md:order-2 md:text-left">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">Financial Consultant</p>
            <h1 className="mb-4 font-display text-3xl font-bold leading-tight text-primary-foreground md:text-4xl lg:text-5xl">
              Financial Consultant in Karaikal – Specialised in LIC, UTI Mutual Funds & Star Health Insurance
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground/80">
              Helping families and professionals choose the right LIC life insurance, mutual fund investments and health insurance to secure their future.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-gold px-6 py-3 font-semibold text-gold-foreground shadow-lg transition-transform hover:scale-105"
              >
                Book a LIC Consultation
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-lg border-2 border-primary-foreground/30 px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                View All Financial Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Strip */}
      <LogoStrip />

      {/* Service Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-foreground">
            Our <span className="text-gold">Financial Services</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                {s.tag && (
                  <span className="mb-2 inline-block rounded-full bg-gold/20 px-3 py-0.5 text-xs font-bold text-gold">
                    {s.tag}
                  </span>
                )}
                <h3 className="mb-2 font-display text-xl font-bold text-foreground">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Short Intro */}
      <section className="bg-muted py-16">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-display text-2xl font-bold text-foreground">About Your Financial Consultant</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            JC.HGF.PA.SARAVANAN is a Karaikal-based Financial Consultant helping individuals, families and entrepreneurs with LIC life insurance, UTI mutual fund investments and Star Health Insurance. With strong experience in both finance and training, he explains complex financial products in simple language and helps clients choose the right plan for their needs.
          </p>
          <Link to="/about" className="mt-6 inline-block font-semibold text-primary hover:text-gold">
            Learn more about me →
          </Link>
        </div>
      </section>
    </>
  );
};

export default Index;
