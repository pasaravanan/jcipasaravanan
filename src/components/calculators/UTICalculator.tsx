import { useMemo, useState } from "react";
import {
  Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend,
} from "recharts";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ResultCard from "./ResultCard";
import { calculateUTI, UTIMode } from "@/lib/calculators/uti";
import { downloadCalculatorPDF } from "@/lib/pdfExport";
import { shareOnWhatsApp, formatINR } from "@/lib/whatsappShare";

const DEFAULTS = { mode: "sip" as UTIMode, amount: 5000, years: 15, ratePct: 12, stepUpPct: 0 };

export default function UTICalculator() {
  const [state, setState] = useState(DEFAULTS);
  const result = useMemo(() => calculateUTI(state), [state]);

  const summary = `UTI Mutual Fund ${state.mode === "sip" ? "SIP" : "Lump Sum"} Estimate\n${state.mode === "sip" ? `Monthly: ₹${formatINR(state.amount)}` : `Investment: ₹${formatINR(state.amount)}`} | ${state.years}y @ ${state.ratePct}%\nInvested: ₹${formatINR(result.invested)}\nMaturity: ₹${formatINR(result.maturity)}\nReturns: ₹${formatINR(result.returns)}`;

  const onDownload = () =>
    downloadCalculatorPDF({
      title: `UTI Mutual Fund ${state.mode === "sip" ? "SIP" : "Lump Sum"} Projection`,
      brand: "UTI",
      inputs: [
        { label: "Mode", value: state.mode === "sip" ? "Monthly SIP" : "Lump Sum" },
        {
          label: state.mode === "sip" ? "Monthly Investment" : "Investment Amount",
          value: `₹ ${formatINR(state.amount)}`,
        },
        { label: "Duration", value: `${state.years} years` },
        { label: "Expected Return", value: `${state.ratePct}% p.a.` },
        ...(state.mode === "sip" && state.stepUpPct
          ? [{ label: "Annual Step-up", value: `${state.stepUpPct}%` }]
          : []),
      ],
      results: [
        { label: "Total Invested", value: result.invested },
        { label: "Estimated Returns", value: result.returns },
        { label: "Maturity Value", value: result.maturity, highlight: true },
      ],
      disclaimer:
        "Mutual fund investments are subject to market risks. Read all scheme related documents carefully. Returns shown are indicative projections at the assumed rate and not guaranteed.",
    });

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-5">
        <div>
          <Label>Investment Mode</Label>
          <RadioGroup
            value={state.mode}
            onValueChange={(v) => setState({ ...state, mode: v as UTIMode })}
            className="mt-2 grid grid-cols-2 gap-3"
          >
            {(["sip", "lumpsum"] as UTIMode[]).map((m) => (
              <label
                key={m}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 transition-colors ${
                  state.mode === m ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <RadioGroupItem value={m} id={`uti-${m}`} />
                <span className="text-sm font-medium">{m === "sip" ? "Monthly SIP" : "Lump Sum"}</span>
              </label>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label>{state.mode === "sip" ? "Monthly Amount (₹)" : "Investment Amount (₹)"}</Label>
          <Input
            type="number"
            min={500}
            step={500}
            value={state.amount}
            onChange={(e) => setState({ ...state, amount: Math.max(500, +e.target.value || 0) })}
            className="mt-1"
          />
          <p className="mt-1 text-xs text-muted-foreground">₹ {formatINR(state.amount)}</p>
        </div>

        <SliderField label="Duration" value={state.years} min={1} max={35} suffix=" yrs"
          onChange={(v) => setState({ ...state, years: v })} />
        <SliderField label="Expected Return" value={state.ratePct} min={6} max={20} step={0.5} suffix="%"
          onChange={(v) => setState({ ...state, ratePct: v })} />
        {state.mode === "sip" && (
          <SliderField label="Annual Step-up" value={state.stepUpPct} min={0} max={20} suffix="%"
            onChange={(v) => setState({ ...state, stepUpPct: v })} />
        )}
      </div>

      <ResultCard
        brand="UTI"
        rows={[
          { label: "Total Invested", value: result.invested },
          { label: "Estimated Returns", value: result.returns },
          { label: "Maturity Value", value: result.maturity, highlight: true },
        ]}
        chart={
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={result.yearlyBreakdown}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="year" fontSize={11} />
              <YAxis fontSize={11} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip formatter={(v: number) => `₹ ${formatINR(v)}`} labelFormatter={(l) => `Year ${l}`} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="invested" stroke="hsl(217, 71%, 45%)" strokeWidth={2} name="Invested" dot={false} />
              <Line type="monotone" dataKey="value" stroke="hsl(43, 76%, 47%)" strokeWidth={3} name="Value" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        }
        disclaimer="Mutual fund investments are subject to market risks. Projections assume a constant annual return and do not guarantee actual performance."
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
        <span className="text-sm font-semibold text-primary">{value}{suffix}</span>
      </div>
      <Slider className="mt-2" value={[value]} min={min} max={max} step={step}
        onValueChange={(v) => onChange(v[0])} />
    </div>
  );
}