import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const SERVICE_ID  = "service_kajxumb";
const TEMPLATE_ID = "template_fgzngre";
const PUBLIC_KEY  = "4xjOt5tRNPz7jBmuq";

const serviceLabels: Record<string, string> = {
  lic:   "LIC Insurance",
  uti:   "UTI Mutual Fund",
  star:  "Star Health Insurance",
  other: "Other Financial Service",
};

const contactItems = [
  {
    icon: Phone,
    label: "Primary / WhatsApp",
    value: "+91 7010105335",
    href: "tel:+917010105335",
    sub: "+91 9842362462",
    subHref: "tel:+919842362462",
  },
  {
    icon: Mail,
    label: "Email",
    value: "pasaravananlic@gmail.com",
    href: "mailto:pasaravananlic@gmail.com",
  },
  {
    icon: MapPin,
    label: "Office Address",
    value: "Atchaya, LIC Premium Point, Anantham Illam, 22, Besant Nagar, Karaikal – 609602",
  },
  {
    icon: Clock,
    label: "Consultation Hours",
    value: "Mon – Sat, 9 AM – 7 PM",
    sub: "Tamil & English",
  },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm]     = useState({ name: "", mobile: "", email: "", service: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const subject     = `Consultation Request – ${serviceLabels[form.service] || "General"}`;
      const fullMessage = `Name: ${form.name}\nMobile: ${form.mobile}\nEmail: ${form.email}\nService: ${serviceLabels[form.service] || "Not specified"}\n\nMessage:\n${form.message}`;
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name:  form.name,
        from_email: form.email || "Not provided",
        subject,
        message:    fullMessage,
      }, PUBLIC_KEY);
      toast({ title: "Request Sent!", description: "We will contact you shortly for your consultation." });
      setForm({ name: "", mobile: "", email: "", service: "", message: "" });
    } catch {
      toast({ title: "Failed to Send", description: "Please try WhatsApp or call us directly.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(155deg, hsl(222,70%,96%) 0%, hsl(238,65%,95%) 35%, hsl(215,68%,94%) 65%, hsl(225,65%,96%) 100%)" }}>

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ background: "hsl(238,80%,70%)" }} />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full opacity-15 blur-3xl"
          style={{ background: "hsl(215,80%,65%)" }} />
      </div>
      <div className="container relative mx-auto px-5">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="label-tag mb-4 inline-block">Get in Touch</span>
          <h2 className="section-heading">
            Book Your <span className="gold-text">Free Consultation</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[hsl(215,16%,50%)]">
            Whether you have a question about LIC, UTI funds, or health insurance — reach out and I'll guide you personally.
          </p>
        </motion.div>

        {/* CTA banner strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl px-7 py-5"
          style={{ background: "linear-gradient(135deg, hsl(38,71%,47%), hsl(38,78%,56%))" }}
        >
          <div>
            <p className="font-display text-xl font-normal text-[hsl(222,68%,15%)]">Quick Connect</p>
            <p className="text-[13px] text-[hsl(222,68%,20%)]">Call or WhatsApp for instant response</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+917010105335"
              className="inline-flex items-center gap-2 rounded-xl bg-[hsl(222,68%,17%)] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[hsl(222,60%,22%)] hover:shadow-md"
            >
              <Phone size={15} /> 7010105335
            </a>
            <a
              href="https://wa.me/919842362462"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25d366] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#1db954] hover:shadow-md"
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          {/* Left – navy info card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 flex flex-col rounded-2xl p-8 lg:order-1"
            style={{
              background: "linear-gradient(135deg, hsl(222,68%,16%) 0%, hsl(222,60%,21%) 100%)",
            }}
          >
            <h3 className="mb-2 font-display text-2xl font-normal text-white">Contact Details</h3>
            <p className="mb-8 text-[13px] text-white/50">Financial Consultant – LIC, UTI Mutual Fund & Star Health Insurance</p>

            <div className="flex flex-1 flex-col gap-6">
              {contactItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "rgba(201,146,42,0.18)", border: "1px solid rgba(201,146,42,0.25)" }}
                  >
                    <item.icon size={17} style={{ color: "hsl(38,80%,62%)" }} />
                  </div>
                  <div>
                    <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-semibold text-white transition-colors hover:text-[hsl(38,80%,62%)]"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-white/80">{item.value}</p>
                    )}
                    {item.sub && (
                      item.subHref ? (
                        <a href={item.subHref} className="mt-0.5 block text-[12px] text-white/50 hover:text-[hsl(38,80%,62%)]">
                          {item.sub}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-[12px] text-white/45">{item.sub}</p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom tagline */}
            <div
              className="mt-8 rounded-xl p-4"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[12px] italic text-white/60">
                "Financial clarity is one conversation away. Reach out today."
              </p>
            </div>
          </motion.div>

          {/* Right – form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 rounded-2xl p-8 lg:order-2"
            style={{
              background: "#fff",
              border: "1px solid #e8eaf0",
              boxShadow: "0 8px 40px rgba(12,30,74,0.08)",
            }}
          >
            <h3 className="mb-6 font-display text-2xl font-normal" style={{ color: "hsl(222,68%,17%)" }}>
              Request a Consultation
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[hsl(215,16%,52%)]">
                    Full Name *
                  </label>
                  <Input
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                    className="rounded-xl border-[#e8eaf0] focus-visible:ring-[hsl(38,71%,47%)]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[hsl(215,16%,52%)]">
                    Mobile Number *
                  </label>
                  <Input
                    placeholder="+91 XXXXX XXXXX"
                    type="tel"
                    value={form.mobile}
                    onChange={e => setForm({ ...form, mobile: e.target.value })}
                    required
                    className="rounded-xl border-[#e8eaf0] focus-visible:ring-[hsl(38,71%,47%)]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[hsl(215,16%,52%)]">
                  Email Address
                </label>
                <Input
                  placeholder="you@email.com"
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="rounded-xl border-[#e8eaf0] focus-visible:ring-[hsl(38,71%,47%)]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[hsl(215,16%,52%)]">
                  Service Interested In
                </label>
                <Select value={form.service} onValueChange={v => setForm({ ...form, service: v })}>
                  <SelectTrigger className="rounded-xl border-[#e8eaf0] focus:ring-[hsl(38,71%,47%)]">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lic">LIC Insurance</SelectItem>
                    <SelectItem value="uti">UTI Mutual Fund</SelectItem>
                    <SelectItem value="star">Star Health Insurance</SelectItem>
                    <SelectItem value="other">Other Financial Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[hsl(215,16%,52%)]">
                  Your Message
                </label>
                <Textarea
                  placeholder="Tell me about your financial goals or any specific questions…"
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="resize-none rounded-xl border-[#e8eaf0] focus-visible:ring-[hsl(38,71%,47%)]"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={sending}
                className="btn-gold w-full border-none"
                style={{ background: "linear-gradient(135deg, hsl(38,71%,47%), hsl(38,78%,56%))", color: "hsl(222,68%,15%)" }}
              >
                {sending ? "Sending Request…" : "Send Consultation Request"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
