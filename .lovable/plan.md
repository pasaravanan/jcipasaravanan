# Prompt 2 — Financial Calculators

Add a "Financial Calculators" section to the single-page site with three calculators (LIC, UTI Mutual Fund, Star Health). Each supports live results, chart visualization, PDF export, and WhatsApp sharing.

## Placement & Navigation
- New section id `#calculators`, inserted **after "Our Financial Services"** and before `AboutIntro`.
- Add "Calculators" link to `Navbar.tsx` and `Footer.tsx`.
- Section header: "Free Financial Calculators — Plan Your Future in Seconds".

## UI Structure
- Tabbed layout (shadcn `Tabs`) with three tabs:
  1. **LIC Premium & Maturity**
  2. **UTI SIP / Lump Sum**
  3. **Star Health Premium Estimate**
- Each tab: left column = inputs (sliders + number inputs), right column = animated result summary card + Recharts visualization + action buttons.
- Framer-motion reveals to match rest of the site. Navy/gold/teal palette, matching existing sections.

## Calculators

### 1. LIC Premium & Maturity (`LICCalculator.tsx`)
Inputs: Age, Sum Assured, Policy Term (years), Premium Paying Term, Plan Type (Endowment / Term / Money Back / Jeevan Labh — select).
Logic (client-side approximation, clearly labeled "Indicative — actual premium as per LIC official quote"):
- Base premium rate table per plan × age bracket × term (built-in constant table).
- Annual premium = SA × rate ÷ 1000; plus GST (4.5% Y1, 2.25% Y2+).
- Maturity = SA + bonus (₹48/1000 × term for endowment plans, 0 for term).
Outputs: Annual/Monthly premium, Total premium paid, Maturity value, Net gain.
Chart: Bar chart comparing "Total Paid" vs "Maturity Value".

### 2. UTI SIP / Lump Sum (`UTICalculator.tsx`)
Mode toggle (RadioGroup): SIP | Lump Sum.
Inputs (SIP): Monthly Amount, Duration (years), Expected Return % (slider 8–18, default 12), Step-up % (optional).
Inputs (Lump Sum): Investment Amount, Duration, Expected Return %.
Logic: Standard SIP FV formula `M × [((1+i)^n − 1)/i] × (1+i)` with monthly compounding; step-up applied yearly. Lump Sum: `P × (1+r)^n`.
Outputs: Invested, Estimated Returns, Maturity Value.
Chart: Line chart (year-wise wealth growth) + donut (Invested vs Returns).

### 3. Star Health Premium (`StarHealthCalculator.tsx`)
Inputs: Age of eldest member, Members covered (1–6), Sum Insured (₹3L–₹1Cr select), Plan (Family Health Optima / Senior Citizen Red Carpet / Young Star / Comprehensive), City tier (Metro/Non-metro), Pre-existing conditions toggle.
Logic: Base rate table by age band × SI × plan factor × tier factor × PED loading (+25%). GST 18%.
Outputs: Annual premium (incl. GST), Monthly equivalent, Coverage summary.
Chart: Horizontal bar showing premium breakup (Base / Loading / GST).

## Actions on every result card
- **Download PDF** — uses `jspdf` + `jspdf-autotable`. Branded header (name, title, phones, LIC/UTI/Star logos), inputs table, results table, disclaimer, footer with contact CTA.
- **Share on WhatsApp** — opens `https://wa.me/919842362462?text=<encoded summary>` in new tab. Summary includes inputs + key results + link back to site.
- **Reset** button.

## Files to Create
```
src/sections/CalculatorsSection.tsx          (wrapper + tabs)
src/components/calculators/LICCalculator.tsx
src/components/calculators/UTICalculator.tsx
src/components/calculators/StarHealthCalculator.tsx
src/components/calculators/ResultCard.tsx    (shared result + actions)
src/lib/calculators/lic.ts                   (rate tables + math)
src/lib/calculators/uti.ts
src/lib/calculators/starHealth.ts
src/lib/pdfExport.ts                         (branded PDF builder)
src/lib/whatsappShare.ts
```

## Files to Modify
- `src/App.tsx` — mount `<CalculatorsSection />` after `<ServicesCards />`.
- `src/components/Navbar.tsx` + `src/components/Footer.tsx` — add "Calculators" nav link.

## Dependencies to Add
- `recharts` (charts) — check if already present, likely yes via shadcn.
- `jspdf`, `jspdf-autotable` (PDF export).

## Technical Notes
- All formulas encapsulated in `src/lib/calculators/*.ts` as pure functions, unit-testable.
- Inputs debounced via `useMemo` for instant recompute without lag.
- Disclaimer text on every calculator: "Indicative values only. Final quote subject to underwriting / market performance."
- Fully mobile-responsive: inputs stack above results on `<md`.
- Accessible: labels, aria-live on result numbers.

## Out of Scope
- No server-side persistence of calculator inputs.
- No login required to use calculators.
- Actual LIC/Star official rate APIs (using indicative rate tables).
