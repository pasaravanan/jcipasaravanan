import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", mobile: "", email: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Thank you!", description: "Your consultation request has been received. We will contact you soon." });
    setForm({ name: "", mobile: "", email: "", service: "", message: "" });
  };

  return (
    <section id="contact" className="bg-gradient-to-br from-[hsl(215,25%,92%)] via-[hsl(43,50%,95%)] to-[hsl(174,30%,95%)] py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Get in <span className="text-gold">Touch</span>
          </h2>
          <p className="mt-2 text-muted-foreground">Get in touch for a free financial consultation</p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 font-display text-2xl font-bold text-foreground">Business Contact Details</h3>
            <div className="space-y-5 text-muted-foreground">
              <div>
                <p className="text-lg font-bold text-foreground">JC.HGF.PA.SARAVANAN</p>
                <p className="text-sm">Financial Consultant – LIC, UTI Mutual Fund & Star Health Insurance</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p>Primary / WhatsApp: <a href="tel:+917010105335" className="font-medium text-foreground hover:text-gold transition-colors">+91 7010105335</a></p>
                  <p>Alternate: <a href="tel:+919842362462" className="font-medium text-foreground hover:text-gold transition-colors">+91 9842362462</a></p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <a href="mailto:pasaravananlic@gmail.com" className="font-medium text-foreground hover:text-gold transition-colors">pasaravananlic@gmail.com</a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <p>Atchaya, LIC Premium Point,<br />Anantham Illam, 22, Besant Nagar,<br />Karaikal – 609602</p>
              </div>
              <a
                href="https://wa.me/919842362462"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 font-semibold text-teal-foreground shadow transition-all hover:scale-105"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>
            <p className="mt-6 text-sm italic text-muted-foreground">Consultation available in Tamil and English.</p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-border bg-card p-8 shadow-md"
          >
            <h3 className="mb-6 font-display text-2xl font-bold text-foreground">Request a Financial Consultation</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <Input placeholder="Mobile Number" type="tel" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} required />
              <Input placeholder="Email Address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Type of Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lic">LIC Insurance</SelectItem>
                  <SelectItem value="uti">UTI Mutual Fund</SelectItem>
                  <SelectItem value="star">Star Health Insurance</SelectItem>
                  <SelectItem value="other">Other Financial Service</SelectItem>
                </SelectContent>
              </Select>
              <Textarea placeholder="Your Message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <Button type="submit" className="w-full bg-gold text-gold-foreground hover:bg-gold/90" size="lg">
                Request a Financial Consultation
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
