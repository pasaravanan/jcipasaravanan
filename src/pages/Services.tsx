import { Link } from "react-router-dom";
import { Shield, TrendingUp, HeartPulse, CheckCircle } from "lucide-react";

const licPoints = [
  "Personal guidance to choose the right LIC policy",
  "Term Insurance – high cover, reasonable premium",
  "Endowment & Money-back policies for savings",
  "Child education & marriage plans",
  "Retirement & pension plans",
  "Tax-saving benefits under Section 80C",
  "Help with documentation and proposal forms",
  "Policy review for existing LIC policyholders",
];

const utiPoints = [
  "SIP (Systematic Investment Plan) for long-term wealth creation",
  "Lump sum investments for specific goals",
  "Goal-based planning: children's education, marriage, retirement, house",
  "Risk profiling – conservative, moderate, aggressive",
  "Regular portfolio review and guidance",
];

const starPoints = [
  "Individual and family floater plans",
  "Coverage for hospitalization and major illnesses",
  "Cashless hospital network support",
  "Guidance on selecting sum insured and plan type",
  "Help with claim process and documentation",
];

const Section = ({
  icon: Icon,
  title,
  intro,
  points,
  cta,
  logoLabel,
  id,
}: {
  icon: typeof Shield;
  title: string;
  intro: string;
  points: string[];
  cta: string;
  logoLabel: string;
  id: string;
}) => (
  <section id={id} className="border-b border-border py-16 last:border-b-0">
    <div className="container mx-auto max-w-4xl px-4">
      <div className="mb-6 flex items-center gap-4">
        <div className="rounded-lg bg-primary/10 p-3">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">{title}</h2>
      </div>

      <div className="mb-4 inline-flex h-20 w-44 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted text-sm font-medium text-muted-foreground">
        {logoLabel}
      </div>

      <p className="mb-6 text-lg leading-relaxed text-muted-foreground">{intro}</p>

      <ul className="mb-8 grid gap-3 sm:grid-cols-2">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2 text-foreground">
            <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-gold" />
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <p className="mb-4 text-lg font-semibold italic text-primary">{cta}</p>

      <Link
        to="/contact"
        className="inline-flex items-center rounded-lg bg-gold px-6 py-3 font-semibold text-gold-foreground shadow transition-transform hover:scale-105"
      >
        Get a Free Consultation
      </Link>
    </div>
  </section>
);

const Services = () => (
  <>
    <div className="bg-primary py-12 text-center">
      <h1 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
        Financial Services
      </h1>
      <p className="mt-2 text-primary-foreground/70">Expert guidance in LIC, UTI Mutual Fund & Star Health Insurance</p>
    </div>

    <Section
      id="lic"
      icon={Shield}
      title="LIC Life Insurance Services"
      logoLabel="LIC Logo here"
      intro="LIC of India is the most trusted name in life insurance. As your dedicated LIC consultant, I help you choose the right policy that matches your family's needs, income and goals."
      points={licPoints}
      cta="Confused about LIC policies? Get a free LIC plan consultation today."
    />

    <Section
      id="uti"
      icon={TrendingUp}
      title="UTI Mutual Fund Services"
      logoLabel="UTI Mutual Fund Logo here"
      intro="UTI Mutual Fund offers a wide range of schemes for every investor profile. I help you plan disciplined investments so your money works hard for your future."
      points={utiPoints}
      cta="Start your UTI mutual fund investment with proper planning and guidance."
    />

    <Section
      id="star"
      icon={HeartPulse}
      title="Star Health Insurance Services"
      logoLabel="Star Health Insurance Logo here"
      intro="Medical emergencies can happen anytime. Star Health Insurance gives you financial protection with comprehensive health coverage for individuals and families."
      points={starPoints}
      cta="Choose the right Star Health insurance policy before a medical emergency happens."
    />
  </>
);

export default Services;
