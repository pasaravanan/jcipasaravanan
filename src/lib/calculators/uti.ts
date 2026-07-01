// UTI Mutual Fund - SIP / Lump Sum calculator

export type UTIMode = "sip" | "lumpsum";

export interface UTIInput {
  mode: UTIMode;
  amount: number; // monthly for SIP, principal for lumpsum
  years: number;
  ratePct: number; // annual %
  stepUpPct?: number; // yearly step-up for SIP
}

export interface UTIResult {
  invested: number;
  maturity: number;
  returns: number;
  yearlyBreakdown: { year: number; invested: number; value: number }[];
}

export function calculateUTI(input: UTIInput): UTIResult {
  const { mode, amount, years, ratePct, stepUpPct = 0 } = input;
  const monthlyRate = ratePct / 100 / 12;
  const yearlyBreakdown: UTIResult["yearlyBreakdown"] = [];

  if (mode === "lumpsum") {
    const r = ratePct / 100;
    let value = amount;
    for (let y = 1; y <= years; y++) {
      value = amount * Math.pow(1 + r, y);
      yearlyBreakdown.push({ year: y, invested: amount, value: Math.round(value) });
    }
    const maturity = Math.round(value);
    return { invested: amount, maturity, returns: maturity - amount, yearlyBreakdown };
  }

  // SIP with optional yearly step-up
  let corpus = 0;
  let invested = 0;
  let monthly = amount;
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      corpus = (corpus + monthly) * (1 + monthlyRate);
      invested += monthly;
    }
    yearlyBreakdown.push({ year: y, invested: Math.round(invested), value: Math.round(corpus) });
    monthly = monthly * (1 + stepUpPct / 100);
  }
  const maturity = Math.round(corpus);
  const investedR = Math.round(invested);
  return { invested: investedR, maturity, returns: maturity - investedR, yearlyBreakdown };
}