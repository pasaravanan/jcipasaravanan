// Star Health premium indicative calculator

export type StarPlan = "familyOptima" | "redCarpet" | "youngStar" | "comprehensive";
export type CityTier = "metro" | "nonMetro";

export interface StarInput {
  eldestAge: number;
  members: number;
  sumInsured: number;
  plan: StarPlan;
  tier: CityTier;
  preExisting: boolean;
}

export interface StarResult {
  basePremium: number;
  loading: number;
  gst: number;
  annualPremium: number;
  monthlyPremium: number;
}

export const STAR_PLAN_LABELS: Record<StarPlan, string> = {
  familyOptima: "Family Health Optima",
  redCarpet: "Senior Citizen Red Carpet",
  youngStar: "Young Star",
  comprehensive: "Comprehensive",
};

// Base rate per ₹100,000 SI by age band (indicative annual rate for 1 adult)
function ageBandRate(age: number): number {
  if (age <= 25) return 480;
  if (age <= 35) return 620;
  if (age <= 45) return 880;
  if (age <= 55) return 1450;
  if (age <= 65) return 2350;
  if (age <= 75) return 3400;
  return 4200;
}

const PLAN_FACTOR: Record<StarPlan, number> = {
  familyOptima: 1.0,
  redCarpet: 1.35,
  youngStar: 0.85,
  comprehensive: 1.25,
};

const TIER_FACTOR: Record<CityTier, number> = {
  metro: 1.15,
  nonMetro: 1.0,
};

// Additional members: each extra adult/child adds fractional cost
function membersFactor(members: number) {
  // 1 member = 1.0; each additional = +0.55 for adult-equivalent (approx)
  return 1 + Math.max(0, members - 1) * 0.55;
}

export function calculateStar(input: StarInput): StarResult {
  const { eldestAge, members, sumInsured, plan, tier, preExisting } = input;
  const perLakh = ageBandRate(eldestAge);
  const siLakh = sumInsured / 100000;
  // SI slab damping (higher SI → lower marginal cost per lakh)
  const siFactor = 0.55 + 0.45 * Math.pow(5 / Math.max(siLakh, 1), 0.35);
  const base =
    perLakh * siLakh * siFactor * PLAN_FACTOR[plan] * TIER_FACTOR[tier] * membersFactor(members);
  const loading = preExisting ? base * 0.25 : 0;
  const subtotal = base + loading;
  const gst = subtotal * 0.18;
  const annualPremium = Math.round(subtotal + gst);
  return {
    basePremium: Math.round(base),
    loading: Math.round(loading),
    gst: Math.round(gst),
    annualPremium,
    monthlyPremium: Math.round(annualPremium / 12),
  };
}