import { motion } from "framer-motion";
import { Briefcase, Users, Wrench } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const mentored = ["Students & Teachers", "LIC Agents", "Entrepreneurs", "Small Scale Industries", "Employers"];
const skills = [
  { name: "Project Management", color: "bg-primary/10 text-primary" },
  { name: "Public Relations", color: "bg-teal/10 text-teal" },
  { name: "Teamwork", color: "bg-gold/20 text-gold" },
  { name: "Time Management", color: "bg-coral/10 text-coral" },
  { name: "Leadership", color: "bg-primary/10 text-primary" },
  { name: "Effective Communication", color: "bg-teal/10 text-teal" },
  { name: "Critical Thinking", color: "bg-gold/20 text-gold" },
];

const AboutFull = () => (
  <section id="about" className="py-16">
    <div className="container mx-auto max-w-4xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          About <span className="text-gold">Me</span>
        </h2>
      </motion.div>

      {/* Bio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 flex flex-col items-center gap-8 md:flex-row"
      >
        <div className="relative shrink-0">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-gold via-teal to-coral opacity-50 blur" />
          <img src={profilePhoto} alt="JC.HGF.PA.SARAVANAN" className="relative h-48 w-48 rounded-2xl border-4 border-gold object-cover shadow-lg" />
        </div>
        <div className="space-y-4 text-muted-foreground">
          <p>I am a <strong className="text-foreground">Human Resource Development (HRD) Trainer</strong> and <strong className="text-foreground">Financial Consultant</strong> based in Karaikal. I have worked as a Financial Consultant in the LIC and UTI Mutual Fund sector, helping families and professionals plan for their future.</p>
          <p>I have trained college and school students, entrepreneurs and professionals in life skills across India with more than 10 years of experience. I have trained thousands of students in Time Management, Goal Setting, Interpersonal Skills, Problem Solving and Spoken English.</p>
        </div>
      </motion.div>

      {/* JCI */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 rounded-xl border border-border bg-gradient-to-r from-muted to-background p-8"
      >
        <h3 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <Briefcase className="h-5 w-5 text-gold" /> JCI Leadership & Credentials
        </h3>
        <ul className="grid gap-2 text-muted-foreground sm:grid-cols-2">
          <li>• Treasurer, JCI Karaikal – 2016</li>
          <li>• President, JCI Karaikal – 2017</li>
          <li>• Zone Director – JJ, Zone 23 – 2018</li>
          <li>• Graduate of the Zone Trainer Workshop (ZTWS) – 2018</li>
          <li className="sm:col-span-2">• Four Week Entrepreneurship Development Programme at Trichy Regional Engineering College (1991)</li>
        </ul>
      </motion.div>

      {/* Mentored & Skills */}
      <div className="mb-12 grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-border bg-card p-6 shadow-sm"
        >
          <h3 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-foreground">
            <Users className="h-5 w-5 text-gold" /> Mentored
          </h3>
          <ul className="space-y-2">
            {mentored.map((m) => (
              <li key={m} className="flex items-center gap-2 text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-gold to-coral" /> {m}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-border bg-card p-6 shadow-sm"
        >
          <h3 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-foreground">
            <Wrench className="h-5 w-5 text-gold" /> Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s.name} className={`rounded-full ${s.color} px-3 py-1 text-sm font-medium`}>{s.name}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ASK */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-xl bg-gradient-to-r from-primary to-navy p-8 text-center"
      >
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-gold">Attitude · Skills · Knowledge</p>
        <p className="text-primary-foreground">
          I strongly believe that <strong>Attitude, Skills & Knowledge (ASK)</strong> are key to success in life and finance.
        </p>
      </motion.div>

      {/* Closing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 rounded-xl border border-gold/30 bg-gradient-to-r from-gold/5 to-teal/5 p-8"
      >
        <p className="text-lg leading-relaxed text-foreground">
          All this experience helps me guide my clients better as a Financial Consultant. I combine my training background with financial knowledge to help people clearly understand LIC life insurance, mutual funds and health insurance, so they can make confident, informed decisions for their future.
        </p>
      </motion.div>
    </div>
  </section>
);

export default AboutFull;
