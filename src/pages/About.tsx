import { Briefcase, GraduationCap, Users, Wrench } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const mentored = ["Students & Teachers", "LIC Agents", "Entrepreneurs", "Small Scale Industries", "Employers"];
const skills = ["Project Management", "Public Relations", "Teamwork", "Time Management", "Leadership", "Effective Communication", "Critical Thinking"];

const About = () => (
  <>
    <div className="bg-primary py-12 text-center">
      <h1 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">About Me</h1>
    </div>

    <section className="py-16">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Bio */}
        <div className="mb-12 flex flex-col items-center gap-8 md:flex-row">
          <img src={profilePhoto} alt="JC.HGF.PA.SARAVANAN" className="h-48 w-48 shrink-0 rounded-2xl border-4 border-gold object-cover shadow-lg" />
          <div className="space-y-4 text-muted-foreground">
            <p>I am a <strong className="text-foreground">Human Resource Development (HRD) Trainer</strong> and <strong className="text-foreground">Financial Consultant</strong> based in Karaikal. I have worked as a Financial Consultant in the LIC and UTI Mutual Fund sector, helping families and professionals plan for their future.</p>
            <p>I have trained college and school students, entrepreneurs and professionals in life skills across India with more than 10 years of experience. I have trained thousands of students in Time Management, Goal Setting, Interpersonal Skills, Problem Solving and Spoken English.</p>
          </div>
        </div>

        {/* JCI */}
        <div className="mb-12 rounded-xl border border-border bg-muted p-8">
          <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-foreground">
            <Briefcase className="h-5 w-5 text-gold" /> JCI Leadership & Credentials
          </h2>
          <ul className="grid gap-2 text-muted-foreground sm:grid-cols-2">
            <li>• Treasurer, JCI Karaikal – 2016</li>
            <li>• President, JCI Karaikal – 2017</li>
            <li>• Zone Director – JJ, Zone 23 – 2018</li>
            <li>• Graduate of the Zone Trainer Workshop (ZTWS) – 2018</li>
            <li className="sm:col-span-2">• Four Week Entrepreneurship Development Programme at Trichy Regional Engineering College (1991)</li>
          </ul>
        </div>

        {/* Mentored & Skills */}
        <div className="mb-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-foreground">
              <Users className="h-5 w-5 text-gold" /> Mentored
            </h2>
            <ul className="space-y-2">
              {mentored.map((m) => (
                <li key={m} className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-gold" /> {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-foreground">
              <Wrench className="h-5 w-5 text-gold" /> Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ASK */}
        <div className="rounded-xl bg-primary p-8 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-gold">Attitude · Skills · Knowledge</p>
          <p className="text-primary-foreground">
            I strongly believe that <strong>Attitude, Skills & Knowledge (ASK)</strong> are key to success in life and finance.
          </p>
        </div>

        {/* Closing */}
        <div className="mt-12 rounded-xl border border-gold/30 bg-gold/5 p-8">
          <p className="text-lg leading-relaxed text-foreground">
            All this experience helps me guide my clients better as a Financial Consultant. I combine my training background with financial knowledge to help people clearly understand LIC life insurance, mutual funds and health insurance, so they can make confident, informed decisions for their future.
          </p>
        </div>
      </div>
    </section>
  </>
);

export default About;
