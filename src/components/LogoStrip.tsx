const logos = [
  { name: "LIC", label: "LIC Logo here" },
  { name: "UTI Mutual Fund", label: "UTI Mutual Fund Logo here" },
  { name: "Star Health Insurance", label: "Star Health Insurance Logo here" },
];

const LogoStrip = ({ title = "Solutions for you from:" }: { title?: string }) => (
  <section className="bg-muted py-8">
    <div className="container mx-auto px-4 text-center">
      <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">{title}</p>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="flex h-20 w-44 items-center justify-center rounded-lg border-2 border-dashed border-border bg-card p-4 text-center text-sm font-medium text-muted-foreground"
          >
            {logo.label}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LogoStrip;
