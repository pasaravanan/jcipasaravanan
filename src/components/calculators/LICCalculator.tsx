import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ResultCard from "./ResultCard";
import { calculateLIC, LIC_PLAN_LABELS, LICPlan } from "@/lib/calculators/lic";
import { downloadCalculatorPDF } from "@/lib/pdfExport";
import { shareOnWhatsApp, formatINR } from "@/lib/whatsappShare";

const DEFAULTS = { age: 30, sumAssured: 1000000, policyTerm: 20, premiumPayingTerm: 20, plan: "endowment" as LICPlan };

export default function LICCalculator() {
  const [state, setState] = useState(DEFAULTS);
  const result = useMemo(() => calculateLIC(state), [state]);

  const chartData = [
    { name: "Total Paid", value: result.totalPremium, fill: "hsl(217, 71%, 45%)" },
    { name: "Maturity", value: result.maturityValue, fill: "hsl(43, 76%, 47%)" },
  ];

  const summary = `LIC ${LIC_PLAN_LABELS[state.plan]} Estimate\nSA: ₹${formatINR(state.sumAssured)} | Age: ${state.age} | Term: ${state.policyTerm}y\nAnnual Premium: ₹${formatINR(result.annualPremium)}\nMaturity: ₹${formatINR(result.maturityValue)}`;

  const onDownload = () =>
    downloadCalculatorPDF({
      title: "LIC Premium & Maturity Estimate",
      brand: "LIC",
      inputs: [
        { label: "Age", value: state.age },
        { label: "Sum Assured", value: `₹ ${formatINR(state.sumAssured)}` },
        { label: "Policy Term", value: `${state.policyTerm} years` },
        { label: "Premium Paying Term", value: `${state.premiumPayingTerm} years` },
        { label: "Plan", value: LIC_PLAN_LABELS[state.plan] },
      ],
      results: [
        { label: "Annual Premium (incl. GST)", value: result.annualPremium },
        { label: "Monthly Premium", value: result.monthlyPremium },
        { label: "Total Premium Payable", value: result.totalPremium },
        { label: "Estimated Bonus", value: result.bonusAmount },
        { label: "Maturity Value", value: result.maturityValue, highlight: true },
        { label: "Net Gain", value: result.netGain },
      ],
      disclaimer:
        "Indicative values based on illustrative bonus rates. Actual premium & maturity as per official LIC policy quote and prevailing bonus declared by LIC of India.",
    });

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-5">
        <div>
          <Label>Plan Type</Label>
          <Select value={state.plan} onValueChange={(v) => setState({ ...state, plan: v as LICPlan })}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              {(Object.keys(LIC_PLAN_LABELS) as LICPlan[]).map((k) => (
                <SelectItem key={k} value={k}>{LIC_PLAN_LABELS[k]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <SliderField label="Age" value={state.age} min={18} max={65} step={1} suffix=" yrs"
          onChange={(v) => setState({ ...state, age: v })} />

        <div>
          <Label>Sum Assured (₹)</Label>
          <Input type="number" min={100000} step={50000} value={state.sumAssured}
            onChange={(e) => setState({ ...state, sumAssured: Math.max(100000, +e.target.value || 0) })}
            className="mt-1" />
          <p className="mt-1 text-xs text-muted-foreground">₹ {formatINR(state.sumAssured)}</p>
        </div>

        <SliderField label="Policy Term" value={state.policyTerm} min={5} max={40} step={1} suffix=" yrs"
          onChange={(v) => setState({ ...state, policyTerm: v, premiumPayingTerm: Math.min(state.premiumPayingTerm, v) })} />

        <SliderField label="Premium Paying Term" value={state.premiumPayingTerm} min={5} max={state.policyTerm} step={1} suffix=" yrs"
          onChange={(v) => setState({ ...state, premiumPayingTerm: v })} />
      </div>

      <ResultCard
        brand="LIC"
        rows={[
          { label: "Annual Premium", value: result.annualPremium },
          { label: "Monthly Premium", value: result.monthlyPremium },
          { label: "Total Paid Over Term", value: result.totalPremium },
          { label: "Maturity Value", value: result.maturityValue, highlight: true },
          { label: "Net Gain", value: result.netGain },
        ]}
        chart={
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={11} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip formatter={(v: number) => `₹ ${formatINR(v)}`} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((d, i) => <Cell key={i} fill={d.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        }
        disclaimer="Indicative only. Actual LIC premium and bonus vary by plan option, rider selection and underwriting."
        onDownload={onDownload}
        onShare={() => shareOnWhatsApp(summary)}
        onReset={() => setState(DEFAULTS)}
      />
    </div>
  );
}

function SliderField({ label, value, min, max, step, suffix, onChange }: {
  label: string; value: number; min: number; max: number; step: number; suffix?: string; onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="text-sm font-semibold text-primary">{value}{suffix}</span>
      </div>
      <Slider className="mt-2" value={[value]} min={min} max={max} step={step}
        onValueChange={(v) => onChange(v[0])} />
    </div>
  );
}