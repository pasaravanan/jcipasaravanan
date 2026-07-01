// LIC premium & maturity indicative calculator
// Indicative only; actual premium as per LIC official quote.

export type LICPlan = "endowment" | "term" | "moneyback" | "jeevanLabh";

export interface LICInput {
  age: number;
  sumAssured: number;
  policyTerm: number;
  premiumPayingTerm: number;
  plan: LICPlan;
}

export interface LICResult {
  annualPremium: number;
  monthlyPremium: number;
  totalPremium: number;
  maturityValue: number;
  netGain: number;
  bonusAmount: number;
}

// Base premium rate per ₹1000 SA — indicative averages by plan & age band.
// Rates rise with age and lower for term plans.
const BASE_RATES: Record<LICPlan, { max: number; rate: number }[]> = {
  endowment: [
    { max: 25, rate: 42 },
    { max: 35, rate: 48 },
    { max: 45, rate: 58 },
    { max: 55, rate: 74 },
    { max: 65, rate: 95 },
  ],
  term: [
    { max: 25, rate: 3.2 },
    { max: 35, rate: 4.5 },
    { max: 45, rate: 8.5 },
    { max: 55, rate: 16 },
    { max: 65, rate: 28 },
  ],
  moneyback: [
    { max: 25, rate: 55 },
    { max: 35, rate: 62 },
    { max: 45, rate: 74 },
    { max: 55, rate: 92 },
    { max: 65, rate: 115 },
  ],
  jeevanLabh: [
    { max: 25, rate: 50 },
    { max: 35, rate: 56 },
    { max: 45, rate: 68 },
    { max: 55, rate: 85 },
    { max: 65, rate: 108 },
  ],
};

// Term adjustment factor (longer PPT → slightly lower rate/yr)
function termFactor(term: number) {
  if (term <= 10) return 1.15;
  if (term <= 15) return 1.05;
  if (term <= 20) return 1.0;
  if (term <= 25) return 0.95;
  return 0.9;
}

function baseRate(plan: LICPlan, age: number) {
  const bands = BASE_RATES[plan];
  return (bands.find((b) => age <= b.max) ?? bands[bands.length - 1]).rate;
}

export const LIC_PLAN_LABELS: Record<LICPlan, string> = {
  endowment: "Endowment Plan",
  term: "Term Insurance",
  moneyback: "Money Back Plan",
  jeevanLabh: "Jeevan Labh",
};

export function calculateLIC(input: LICInput): LICResult {
  const { age, sumAssured, policyTerm, premiumPayingTerm, plan } = input;
  const rate = baseRate(plan, age) * termFactor(policyTerm);
  const basePremium = (sumAssured * rate) / 1000;
  // GST: 4.5% Y1, 2.25% Y2+ blended over PPT
  const gstBlend = premiumPayingTerm <= 1 ? 0.045 : (0.045 + 0.0225 * (premiumPayingTerm - 1)) / premiumPayingTerm;
  const annualPremium = Math.round(basePremium * (1 + gstBlend));
  const monthlyPremium = Math.round(annualPremium / 12);
  const totalPremium = annualPremium * premiumPayingTerm;

  // Bonus: endowment / moneyback / jeevanLabh accrue simple bonus; term = 0
  const bonusPerK =
    plan === "term" ? 0 : plan === "moneyback" ? 42 : plan === "jeevanLabh" ? 50 : 48;
  const bonusAmount = Math.round((sumAssured / 1000) * bonusPerK * policyTerm);
  const maturityValue = plan === "term" ? 0 : sumAssured + bonusAmount;
  const netGain = maturityValue - totalPremium;

  return { annualPremium, monthlyPremium, totalPremium, maturityValue, netGain, bonusAmount };
}