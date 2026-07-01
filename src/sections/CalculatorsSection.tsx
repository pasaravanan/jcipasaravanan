import { motion } from "framer-motion";
import { Calculator, Shield, TrendingUp, HeartPulse } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LICCalculator from "@/components/calculators/LICCalculator";
import UTICalculator from "@/components/calculators/UTICalculator";
import StarHealthCalculator from "@/components/calculators/StarHealthCalculator";

const CalculatorsSection = () => (
  <section
    id="calculators"
    className="bg-gradient-to-br from-[hsl(217,60%,97%)] via-white to-[hsl(43,76%,96%)] py-16"
  >
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
          <Calculator className="h-3.5 w-3.5" /> Free Tools
        </span>
        <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Financial <span className="text-gold">Calculators</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Plan your future in seconds. Estimate LIC premiums & maturity, project UTI mutual fund
          growth and get an instant Star Health quote — then download as PDF or share on WhatsApp.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-border bg-white/70 p-4 shadow-lg backdrop-blur md:p-8"
      >
        <Tabs defaultValue="lic">
          <TabsList className="mb-8 grid w-full grid-cols-3">
            <TabsTrigger value="lic" className="flex items-center gap-1.5 text-xs md:text-sm">
              <Shield className="h-4 w-4" /> <span className="hidden sm:inline">LIC</span>
              <span className="sm:hidden">LIC</span>
            </TabsTrigger>
            <TabsTrigger value="uti" className="flex items-center gap-1.5 text-xs md:text-sm">
              <TrendingUp className="h-4 w-4" /> UTI
            </TabsTrigger>
            <TabsTrigger value="star" className="flex items-center gap-1.5 text-xs md:text-sm">
              <HeartPulse className="h-4 w-4" /> <span>Star Health</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="lic"><LICCalculator /></TabsContent>
          <TabsContent value="uti"><UTICalculator /></TabsContent>
          <TabsContent value="star"><StarHealthCalculator /></TabsContent>
        </Tabs>
      </motion.div>
    </div>
  </section>
);

export default CalculatorsSection;