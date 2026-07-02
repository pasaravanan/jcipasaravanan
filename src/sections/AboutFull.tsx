import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Users, Wrench } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const skills = [
  { name: "Project Management", color: "hsl(222,68%,22%)", bg: "rgba(30,55,130,0.08)" },
  { name: "Public Relations",   color: "hsl(170,72%,28%)", bg: "rgba(19,124,110,0.08)" },
  { name: "Leadership",         color: "hsl(38,71%,38%)",  bg: "rgba(201,146,42,0.1)"  },
  { name: "Time Management",    color: "hsl(14,70%,42%)",  bg: "rgba(180,70,40,0.08)"  },
  { name: "Communication",      color: "hsl(222,68%,22%)", bg: "rgba(30,55,130,0.08)"  },
  { name: "Critical Thinking",  color: "hsl(170,72%,28%)", bg: "rgba(19,124,110,0.08)" },
  { name: "Teamwork",           color: "hsl(38,71%,38%)",  bg: "rgba(201,146,42,0.1)"  },
];

const mentored = ["Students & Teachers", "LIC Agents", "Entrepreneurs", "Small Scale Industries", "Employers"];

const jciItems = [
  { year: "2016", role: "Treasurer", org: "JCI Karaikal" },
  { year: "2017", role: "President", org: "JCI Karaikal" },
  { year: "2018", role: "Zone Director", org: "JJ Zone 23" },
  { year: "2018", role: "ZTWS Graduate", org: "Zone Trainer Workshop" },
];

const AboutFull = () => (
  <section id="about" className="section-pad relative overflow-hidden"
    style={{ background: "linear-gradient(155deg, hsl(38,82%,95%) 0%, hsl(45,78%,94%) 35%, hsl(55,72%,95%) 65%, hsl(38,68%,96%) 100%)" }}>

    {/* Decorative blobs */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-16 -left-16 h-80 w-80 rounded-full opacity-25 blur-3xl"
        style={{ background: "hsl(38,90%,68%)" }} />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "hsl(50,80%,65%)" }} />
    </div>
    <div className="container relative mx-auto px-5">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14"
      >
        <span className="label-tag mb-4 inline-block">About Me</span>
        <h2 className="section-heading">
          The Consultant<br /><span className="gold-text">Behind Your Future</span>
        </h2>
      </motion.div>

      {/* ── Asymmetric bio split ── */}
      <div className="mb-16 grid gap-10 lg:grid-cols-[380px_1fr] lg:gap-16">
        {/* Left – photo with floating cards */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto lg:mx-0"
        >
          {/* Photo */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              boxShadow: "0 24px 64px rgba(12,30,74,0.14)",
              border: "3px solid hsl(38,71%,47%)",
            }}
          >
            <img
              src={profilePhoto}
              alt="JC.HGF.PA.SARAVANAN"
              className="h-[420px] w-full object-cover"
              style={{ objectPosition: "top center" }}
            />
            {/* Caption overlay */}
            <div
              className="absolute inset-x-0 bottom-0 px-5 py-5"
              style={{ background: "linear-gradient(to top, rgba(12,30,74,0.85), transparent)" }}
            >
              <p className="font-display text-base font-normal text-white">JC.HGF.PA.SARAVANAN</p>
              <p className="text-[11px] text-white/65">HRD Trainer · Financial Consultant · Karaikal</p>
            </div>
          </div>

          {/* Floating badge – top left */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-5 top-10 rounded-xl bg-white px-4 py-3 shadow-lg"
            style={{ border: "1px solid #e8eaf0" }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(215,16%,52%)]">JCI President</p>
            <p className="text-sm font-bold" style={{ color: "hsl(222,68%,17%)" }}>Karaikal 2017</p>
          </motion.div>

          {/* Floating badge – bottom right */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-5 bottom-16 rounded-xl px-4 py-3 shadow-lg"
            style={{
              background: "linear-gradient(135deg, hsl(38,71%,47%), hsl(38,78%,56%))",
            }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(222,68%,15%)]">Experience</p>
            <p className="text-sm font-bold text-[hsl(222,68%,15%)]">10+ Years</p>
          </motion.div>
        </motion.div>

        {/* Right – bio text + skills */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <p className="mb-5 text-base leading-relaxed text-[hsl(215,16%,42%)]">
            I am a <strong className="font-semibold text-[hsl(222,68%,17%)]">Human Resource Development (HRD) Trainer</strong> and{" "}
            <strong className="font-semibold text-[hsl(222,68%,17%)]">Financial Consultant</strong> based in Karaikal. With over a decade of experience in LIC and UTI Mutual Fund, I have helped hundreds of families and professionals build financially secure futures.
          </p>
          <p className="mb-8 text-base leading-relaxed text-[hsl(215,16%,42%)]">
            I have trained thousands of students, entrepreneurs, and professionals across India in Life Skills — Time Management, Goal Setting, Interpersonal Skills, Problem Solving, and Spoken English. This unique blend of training experience and financial knowledge helps me communicate complex products in simple, clear language.
          </p>

          {/* Skills chips */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <Wrench size={15} style={{ color: "hsl(38,71%,42%)" }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[hsl(215,16%,52%)]">Key Skills</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map(s => (
                <span
                  key={s.name}
                  className="rounded-full px-3 py-1 text-[12px] font-semibold"
                  style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}22` }}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          {/* Mentored */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Users size={15} style={{ color: "hsl(38,71%,42%)" }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[hsl(215,16%,52%)]">Mentored Groups</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {mentored.map(m => (
                <span
                  key={m}
                  className="rounded-full px-3 py-1 text-[12px] font-medium"
                  style={{ background: "#f7f8fc", color: "hsl(222,55%,30%)", border: "1px solid #e8eaf0" }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── JCI Credentials Timeline ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 rounded-2xl p-8"
        style={{ background: "#f7f8fc", border: "1px solid #e8eaf0" }}
      >
        <div className="mb-6 flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ background: "rgba(201,146,42,0.12)" }}
          >
            <Briefcase size={18} style={{ color: "hsl(38,71%,42%)" }} />
          </div>
          <h3 className="font-display text-xl font-normal" style={{ color: "hsl(222,68%,17%)" }}>
            JCI Leadership & Credentials
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {jciItems.map((item, i) => (
            <div
              key={i}
              className="rounded-xl bg-white p-4"
              style={{ border: "1px solid #e8eaf0" }}
            >
              <span
                className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-2"
                style={{ background: "rgba(201,146,42,0.1)", color: "hsl(38,71%,38%)" }}
              >
                {item.year}
              </span>
              <p className="text-[13px] font-bold" style={{ color: "hsl(222,68%,17%)" }}>{item.role}</p>
              <p className="text-[12px] text-[hsl(215,16%,52%)]">{item.org}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-[13px] leading-relaxed text-[hsl(215,16%,50%)]">
          Also completed a <strong className="text-[hsl(222,68%,22%)]">Four-Week Entrepreneurship Development Programme</strong> at Trichy Regional Engineering College (1991).
        </p>
      </motion.div>

      {/* ── Entrepreneurship Dev Programme ── */}

      {/* ── ASK Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: "linear-gradient(135deg, hsl(38,71%,47%) 0%, hsl(38,78%,56%) 100%)",
        }}
      >
        {/* Pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(hsl(222,68%,17%) 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative grid gap-6 px-8 py-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[hsl(222,68%,17%)]">
              ASK Philosophy
            </p>
            <h3 className="font-display text-2xl font-normal text-[hsl(222,68%,15%)] md:text-3xl">
              Attitude · Skills · Knowledge
            </h3>
            <p className="mt-3 max-w-lg text-sm text-[hsl(222,68%,20%)]">
              I strongly believe that the right combination of Attitude, Skills & Knowledge is the foundation of every successful financial decision.
            </p>
          </div>
          <a href="#contact" className="shrink-0 rounded-xl bg-[hsl(222,68%,17%)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[hsl(222,60%,22%)] hover:shadow-lg">
            Work With Me
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutFull;
