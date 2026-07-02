import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield, TrendingUp, HeartPulse, CheckCircle } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

/* ── Animated counter hook ── */
function useCountUp(target: number, duration = 1500, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setVal(Math.floor(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, active]);
  return val;
}

const stats = [
  { target: 500,  suffix: "+", label: "Families Secured" },
  { target: 10,   suffix: "+", label: "Years Experience" },
  { target: 3,    suffix: "",  label: "Trusted Brands" },
  { target: 1000, suffix: "+", label: "People Trained" },
];

const services = [
  { icon: Shield,     label: "LIC Life Insurance",  color: "#1e3a8a", bg: "#eef1f8" },
  { icon: TrendingUp, label: "UTI Mutual Funds",     color: "#137c6e", bg: "#eaf4f2" },
  { icon: HeartPulse, label: "Star Health Insurance",color: "#b45309", bg: "#fdf3e7" },
];

const highlights = [
  "10+ years of financial consulting experience",
  "JCI President, Karaikal (2017)",
  "HRD Trainer — 1000+ people trained",
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const c0 = useCountUp(500,  1400, active);
  const c1 = useCountUp(10,   900,  active);
  const c2 = useCountUp(3,    600,  active);
  const c3 = useCountUp(1000, 1800, active);
  const counts = [c0, c1, c2, c3];

  return (
    <section id="home" className="relative overflow-hidden" ref={ref}
      style={{ background: "linear-gradient(155deg, hsl(38,82%,97%) 0%, hsl(250,70%,97%) 40%, hsl(200,65%,96%) 70%, hsl(38,70%,96%) 100%)" }}>

      {/* Colorful background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute -top-24 -left-24 h-96 w-96 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, hsl(250,80%,75%) 0%, transparent 70%)" }} />
        <div className="animate-blob animation-delay-2 absolute top-1/2 -right-32 h-80 w-80 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, hsl(38,90%,70%) 0%, transparent 70%)" }} />
        <div className="animate-blob animation-delay-4 absolute bottom-0 left-1/3 h-72 w-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(170,80%,65%) 0%, transparent 70%)" }} />
      </div>

      <div className="container relative mx-auto px-5 pb-8 pt-2 md:pb-16 md:pt-4 lg:pb-20 lg:pt-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">

          {/* ════════════════════════════════
              LEFT  —  Text content
          ════════════════════════════════ */}
          <div className="flex flex-col justify-center text-left lg:pr-6">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5"
            >
              <span className="label-tag">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                Available for Free Consultation
              </span>
            </motion.div>

            {/* Sub-header */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mb-2 text-[12px] font-bold uppercase tracking-[0.2em] text-[hsl(38,65%,40%)]"
            >
              JC.HGF.PA.SARAVANAN
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mb-5 font-display text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.1] text-[hsl(222,68%,16%)]"
            >
              Your Trusted <span className="shine-text">Financial</span> Consultant
              <span className="block font-display text-2xl sm:text-3xl text-[hsl(38,65%,40%)] mt-2">
                in Karaikal
              </span>
            </motion.h1>

            {/* Service pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mb-5 flex flex-wrap gap-2"
            >
              {services.map(s => (
                <span
                  key={s.label}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] sm:text-[12px] font-medium shadow-sm"
                  style={{ background: s.bg, border: `1px solid ${s.color}30`, color: s.color }}
                >
                  <s.icon size={12} />
                  {s.label}
                </span>
              ))}
            </motion.div>

            {/* Highlights list */}
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="mb-7 space-y-2"
            >
              {highlights.map(h => (
                <li key={h} className="flex items-center gap-2.5 text-[13px] sm:text-[14px]" style={{ color: "hsl(215,16%,40%)" }}>
                  <CheckCircle size={14} style={{ color: "hsl(38,71%,47%)", flexShrink: 0 }} />
                  {h}
                </li>
              ))}
            </motion.ul>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="mb-10 flex flex-wrap gap-3"
            >
              <a href="#contact" className="btn-gold text-[13px]">
                Book Free Consultation <ArrowRight size={15} />
              </a>
              <a href="tel:+917010105335" className="btn-outline text-[13px]">
                <Phone size={14} /> +91 7010105335
              </a>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-4 border-t pt-6"
              style={{ borderColor: "rgba(100,80,180,0.15)" }}
            >
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-display text-[1.8rem] sm:text-[2.2rem] font-normal leading-none text-[hsl(222,68%,17%)]">
                    {counts[i]}{s.suffix}
                  </span>
                  <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[hsl(215,16%,52%)]">
                    {s.label}
                  </span>
                  <div className="mt-2 h-0.5 w-6 rounded-full bg-[hsl(38,71%,47%)]" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* ════════════════════════════════
              RIGHT  —  Elegant framed photo
          ════════════════════════════════ */}
          <div className="flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[340px] md:max-w-[380px]"
            >
              {/* Purple glow behind photo */}
              <div className="absolute inset-0 rounded-[2rem] blur-2xl opacity-30"
                style={{ background: "linear-gradient(135deg, hsl(250,80%,70%), hsl(38,80%,65%))", transform: "scale(1.1)" }} />
              
              {/* Gold outline border accent */}
              <div className="absolute inset-0 rounded-[2rem]" style={{
                border: "2px dashed hsl(38,71%,47%)",
                transform: "rotate(1deg)",
                zIndex: 0,
                opacity: 0.5,
              }} />

              {/* Photo Box card */}
              <div className="relative z-10 overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_20px_60px_rgba(80,50,180,0.18)]"
                style={{ border: "1px solid rgba(200,185,255,0.4)" }}>
                <img
                  src={profilePhoto}
                  alt="JC.HGF.PA.SARAVANAN Financial Consultant"
                  className="w-full object-cover rounded-[1.5rem]"
                  style={{ height: "360px", objectPosition: "center top" }}
                />
                <div className="mt-4 text-center">
                  <p className="font-display text-lg font-normal text-[hsl(222,68%,17%)]">JC.HGF.PA.SARAVANAN</p>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(38,65%,40%)]">Financial Consultant</p>
                </div>
              </div>

              {/* Floating JCI Leadership Badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-6 -top-4 z-20 rounded-xl bg-white px-3.5 py-2.5 shadow-xl text-left"
                style={{ border: "1px solid rgba(200,185,255,0.5)" }}
              >
                <p className="text-[8px] font-bold uppercase tracking-widest text-neutral-400">JCI Leadership</p>
                <p className="text-[12px] font-bold text-[hsl(222,68%,17%)]">President 2017</p>
              </motion.div>

              {/* Floating Secured Families Badge */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute -right-6 bottom-16 z-20 rounded-xl px-4 py-2.5 shadow-xl text-white"
                style={{ background: "linear-gradient(135deg, hsl(250,68%,35%), hsl(250,60%,45%))" }}
              >
                <p className="text-[8px] font-bold uppercase tracking-widest text-white/60">Secured</p>
                <p className="text-[14px] font-bold font-display">500+ Families</p>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
