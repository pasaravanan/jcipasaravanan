import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ResultCard from "./ResultCard";
import { calculateStar, CityTier, StarPlan, STAR_PLAN_LABELS } from "@/lib/calculators/starHealth";
import { downloadCalculatorPDF } from "@/lib/pdfExport";
import { shareOnWhatsApp, formatINR } from "@/lib/whatsappShare";

const SI_OPTIONS = [300000, 500000, 1000000, 1500000, 2500000, 5000000, 10000000];
const DEFAULTS = {
  eldestAge: 35, members: 2, sumInsured: 500000,
  plan: "familyOptima" as StarPlan, tier: "nonMetro" as CityTier, preExisting: false,
};

export default function StarHealthCalculator() {
  const [state, setState] = useState(DEFAULTS);
  const result = useMemo(() => calculateStar(state), [state]);

  const chart = [
    { name: "Base", value: result.basePremium, fill: "hsl(217, 71%, 45%)" },
    { name: "PED Loading", value: result.loading, fill: "hsl(11, 87%, 65%)" },
    { name: "GST (18%)", value: result.gst, fill: "hsl(174, 63%, 40%)" },
  ];

  const summary = `Star Health ${STAR_PLAN_LABELS[state.plan]} Estimate\nMembers: ${state.members} | Eldest Age: ${state.eldestAge}\nSum Insured: ₹${formatINR(state.sumInsured)}\nAnnual Premium: ₹${formatINR(result.annualPremium)}`;

  const onDownload = () =>
    downloadCalculatorPDF({
      title: "Star Health Premium Estimate",
      brand: "Star Health",
      inputs: [
        { label: "Plan", value: STAR_PLAN_LABELS[state.plan] },
        { label: "Age of Eldest Member", value: `${state.eldestAge} years` },
        { label: "Members Covered", value: state.members },
        { label: "Sum Insured", value: `₹ ${formatINR(state.sumInsured)}` },
        { label: "City Tier", value: state.tier === "metro" ? "Metro" : "Non-Metro" },
        { label: "Pre-existing Conditions", value: state.preExisting ? "Yes" : "No" },
      ],
      results: [
        { label: "Base Premium", value: result.basePremium },
        { label: "PED Loading", value: result.loading },
        { label: "GST (18%)", value: result.gst },
        { label: "Annual Premium", value: result.annualPremium, highlight: true },
        { label: "Monthly Equivalent", value: result.monthlyPremium },
      ],
      disclaimer:
        "Indicative premium only. Final Star Health premium is subject to medical underwriting, exact date of birth, plan variant and prevailing tariff.",
    });

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-5">
        <div>
          <Label>Plan</Label>
          <Select value={state.plan} onValueChange={(v) => setState({ ...state, plan: v as StarPlan })}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              {(Object.keys(STAR_PLAN_LABELS) as StarPlan[]).map((k) => (
                <SelectItem key={k} value={k}>{STAR_PLAN_LABELS[k]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <SliderField label="Age of Eldest Member" value={state.eldestAge} min={18} max={80} suffix=" yrs"
          onChange={(v) => setState({ ...state, eldestAge: v })} />

        <SliderField label="Members Covered" value={state.members} min={1} max={6}
          onChange={(v) => setState({ ...state, members: v })} />

        <div>
          <Label>Sum Insured</Label>
          <Select
            value={String(state.sumInsured)}
            onValueChange={(v) => setState({ ...state, sumInsured: +v })}
          >
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              {SI_OPTIONS.map((s) => (
                <SelectItem key={s} value={String(s)}>₹ {formatINR(s)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>City Tier</Label>
          <Select value={state.tier} onValueChange={(v) => setState({ ...state, tier: v as CityTier })}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="metro">Metro</SelectItem>
              <SelectItem value="nonMetro">Non-Metro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border p-3">
          <div>
            <Label className="cursor-pointer">Any Pre-existing Conditions?</Label>
            <p className="text-xs text-muted-foreground">Adds ~25% loading</p>
          </div>
          <Switch
            checked={state.preExisting}
            onCheckedChange={(v) => setState({ ...state, preExisting: v })}
          />
        </div>
      </div>

      <ResultCard
        brand="Star Health"
        rows={[
          { label: "Base Premium", value: result.basePremium },
          { label: "PED Loading", value: result.loading },
          { label: "GST (18%)", value: result.gst },
          { label: "Annual Premium", value: result.annualPremium, highlight: true },
          { label: "Monthly Equivalent", value: result.monthlyPremium },
        ]}
        chart={
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chart} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis type="number" fontSize={11} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" fontSize={12} width={90} />
              <Tooltip formatter={(v: number) => `₹ ${formatINR(v)}`} />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {chart.map((d, i) => <Cell key={i} fill={d.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        }
        disclaimer="Indicative. Final Star Health premium is subject to medical underwriting, plan variant and prevailing tariff."
        onDownload={onDownload}
        onShare={() => shareOnWhatsApp(summary)}
        onReset={() => setState(DEFAULTS)}
      />
    </div>
  );
}

function SliderField({ label, value, min, max, step = 1, suffix, onChange }: {
  label: string; value: number; min: number; max: number; step?: number; suffix?: string; onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="text-sm font-semibold text-primary">{value}{suffix ?? ""}</span>
      </div>
      <Slider className="mt-2" value={[value]} min={min} max={max} step={step}
        onValueChange={(v) => onChange(v[0])} />
    </div>
  );
}