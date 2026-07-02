import licLogo from "@/assets/lic-logo.png";
import utiLogo from "@/assets/uti-logo.png";
import starHealthLogo from "@/assets/star-health-logo.png";

const baseLogos = [
  { name: "LIC of India",            src: licLogo },
  { name: "UTI Mutual Fund",         src: utiLogo },
  { name: "Star Health Insurance",   src: starHealthLogo },
];

// Repeat 8 times to ensure a massive width (24 items) for seamless looping on wide screens
const logos = Array(8).fill(baseLogos).flat();

const LogoStrip = () => {
  const stripBg = "linear-gradient(180deg, hsl(220,30%,98%) 0%, hsl(38,45%,97%) 100%)";
  return (
    <section className="relative overflow-hidden border-y py-8"
      style={{ background: stripBg, borderColor: "rgba(100,80,180,0.1)" }}>
      <div className="container mx-auto mb-5 px-5 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[hsl(215,16%,52%)]">
          Authorised Consultant for
        </p>
      </div>

      {/* Fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10" style={{ background: `linear-gradient(to right, ${stripBg.replace('linear-gradient(', '').split(')')[0]})` }} />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10" style={{ background: "linear-gradient(to right, hsl(220,30%,98%), transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10" style={{ background: "linear-gradient(to left, hsl(38,45%,97%), transparent)" }} />

      {/* Marquee track */}
      <div className="flex overflow-hidden">
        <div className="flex animate-marquee items-center gap-14 pr-14 whitespace-nowrap shrink-0">
          {logos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex h-16 w-44 shrink-0 items-center justify-center rounded-xl bg-white px-4 shadow-sm"
              style={{ border: "1px solid rgba(150,130,220,0.15)" }}
            >
              <img src={logo.src} alt={logo.name} className="max-h-10 max-w-full object-contain" />
            </div>
          ))}
        </div>
        <div className="flex animate-marquee items-center gap-14 pr-14 whitespace-nowrap shrink-0" aria-hidden="true">
          {logos.map((logo, i) => (
            <div
              key={`${logo.name}-dup-${i}`}
              className="flex h-16 w-44 shrink-0 items-center justify-center rounded-xl bg-white px-4 shadow-sm"
              style={{ border: "1px solid rgba(150,130,220,0.15)" }}
            >
              <img src={logo.src} alt={logo.name} className="max-h-10 max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoStrip;
