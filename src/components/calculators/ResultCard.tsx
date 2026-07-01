import { Download, Share2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { formatINR } from "@/lib/whatsappShare";
import { ReactNode } from "react";

export interface ResultRow {
  label: string;
  value: number | string;
  currency?: boolean;
  highlight?: boolean;
}

interface Props {
  brand: "LIC" | "UTI" | "Star Health";
  rows: ResultRow[];
  chart: ReactNode;
  disclaimer: string;
  onDownload: () => void;
  onShare: () => void;
  onReset: () => void;
}

export default function ResultCard({
  brand,
  rows,
  chart,
  disclaimer,
  onDownload,
  onShare,
  onReset,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-gradient-to-br from-white to-[hsl(43,76%,98%)] p-6 shadow-lg"
    >
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-display text-lg font-bold text-navy">Your Estimate</h4>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {brand}
        </span>
      </div>

      <dl className="mb-4 space-y-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className={`flex items-center justify-between rounded-lg px-3 py-2 ${
              r.highlight ? "bg-gold/15 ring-1 ring-gold/40" : "bg-muted/40"
            }`}
          >
            <dt className="text-sm text-muted-foreground">{r.label}</dt>
            <dd
              aria-live="polite"
              className={`font-display font-bold ${
                r.highlight ? "text-lg text-navy" : "text-base text-foreground"
              }`}
            >
              {r.currency !== false && typeof r.value === "number"
                ? `₹ ${formatINR(r.value)}`
                : r.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mb-4 h-56 w-full">{chart}</div>

      <p className="mb-4 text-[11px] leading-relaxed text-muted-foreground">{disclaimer}</p>

      <div className="flex flex-wrap gap-2">
        <Button onClick={onDownload} className="flex-1 min-w-[130px] bg-primary hover:bg-primary/90">
          <Download className="mr-1.5 h-4 w-4" /> Download PDF
        </Button>
        <Button
          onClick={onShare}
          variant="outline"
          className="flex-1 min-w-[130px] border-teal text-teal hover:bg-teal/10"
        >
          <Share2 className="mr-1.5 h-4 w-4" /> WhatsApp
        </Button>
        <Button
          onClick={onReset}
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="mr-1.5 h-4 w-4" /> Reset
        </Button>
      </div>
    </motion.div>
  );
}