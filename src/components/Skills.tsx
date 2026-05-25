import { siteData } from "../data";
import { motion } from "motion/react";
import { AnimatedSection, SectionHeading } from "./AnimatedSection";
import { Award, GraduationCap, CheckCircle2 } from "lucide-react";

export function Skills() {
  return (
    <AnimatedSection id="skills" className="bg-zinc-50/50 dark:bg-[#040209]/50 block transition-colors relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl -z-10" />

      <SectionHeading subtitle="Expertise" title="Skills That Drive Results" />

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {Object.entries(siteData.skills).map(([category, skills], ci) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: ci * 0.08 }}
            className="card-glow shimmer-card group bg-white dark:bg-[#0d0a16] rounded-[2rem] p-8 border border-zinc-200/40 dark:border-white/5 shadow-sm hover:shadow-lg hover:shadow-violet-500/5 hover:border-violet-200/50 dark:hover:border-violet-500/20 transition-all duration-300"
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-6 border-b border-zinc-200/40 dark:border-white/5 pb-4 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors">
              {category}
            </h3>
            <ul className="space-y-3">
              {(skills as string[]).map((skill, si) => (
                <motion.li
                  key={skill}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: ci * 0.06 + si * 0.05 }}
                  className="skill-item flex items-center gap-3 text-zinc-700 dark:text-zinc-300 font-medium text-sm"
                >
                  <CheckCircle2 size={15} className="text-violet-500 dark:text-violet-400 flex-shrink-0" />
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Achievements & Certifications */}
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Achievements */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400">
              <Award size={22} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Achievements</h3>
          </motion.div>

          <div className="space-y-5">
            {siteData.achievements.map((acc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="card-glow shimmer-card bg-white dark:bg-[#0d0a16] rounded-3xl p-6 border border-violet-100/40 dark:border-white/5 shadow-sm hover:shadow-md hover:shadow-violet-500/8 hover:border-violet-200/60 dark:hover:border-violet-500/20 relative overflow-hidden group transition-all duration-300"
              >
                {/* Animated blob */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-violet-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-[2] group-hover:bg-violet-500/8 transition-all duration-500" />

                {/* Pulse dot */}
                <div className="flex items-center gap-2 mb-2 relative z-10">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-violet-500">Achievement</span>
                </div>

                <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-1.5 relative z-10 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors">
                  {acc.title}
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed relative z-10">
                  {acc.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400">
              <GraduationCap size={22} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Certifications</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-glow bg-zinc-900 dark:bg-[#0d0a16] text-white rounded-[2rem] p-8 md:p-10 border border-transparent dark:border-white/5 overflow-hidden relative"
          >
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-60 h-60 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <ul className="space-y-5 relative z-10">
              {siteData.certifications.map((cert, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="group flex items-start gap-4 py-2 border-b border-white/5 last:border-0 hover:border-violet-500/20 transition-colors"
                >
                  <div className="flex-shrink-0 mt-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-400">
                    <span className="text-[10px] font-bold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-white leading-relaxed transition-colors">
                    {cert}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
