import { siteData } from "../data";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative flex min-h-[80vh] lg:min-h-[85vh] items-center overflow-hidden pt-20 md:pt-24 bg-[#040209] bg-cover bg-center md:bg-[length:auto_100%] md:bg-right-bottom bg-no-repeat"
      style={{ backgroundImage: "url('/Hero section image.png')" }}
    >
      {/* Dark overlay – fades to transparent on the right */}
      <div className="absolute inset-0 bg-black/60 md:bg-transparent md:bg-gradient-to-r md:from-black/90 md:via-black/45 md:to-transparent z-0 pointer-events-none" />

      {/* Ambient glow behind text */}
      <div className="absolute left-0 top-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 -translate-y-1/4 z-0" />

      <div className="mx-auto max-w-[90rem] px-6 md:px-12 lg:px-16 xl:px-20 w-full relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="flex flex-col items-start text-left max-w-xl">

          {/* Availability badge */}
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
            </span>
            Available for new projects
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Senior Visual &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-pink-400 animate-gradient-text">
              Web Designer
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-8 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-md"
          >
            {siteData.hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 px-8 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-violet-500/40 hover:shadow-xl overflow-hidden"
            >
              {/* Button shine sweep */}
              <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] bg-white/10 skew-x-12 transition-transform duration-700 ease-out" />
              View My Work
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 px-8 text-sm font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8"
          >
            {siteData.about.stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: shows background hero image */}
        <div className="hidden md:block" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">Scroll</span>
        <ChevronDown size={18} className="text-violet-400 animate-bounce-slow" />
      </motion.div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white dark:bg-[#040209] transition-colors relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid md:grid-cols-[1.1fr_1.4fr] gap-12 lg:gap-20 items-start">

          {/* Left Column: Heading & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-5xl leading-[1.15]">
              A Designer Focused on Results,{" "}
              <span className="text-violet-600 dark:text-violet-400">Not Just Visuals.</span>
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {siteData.about.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="card-glow shimmer-card p-5 rounded-2xl bg-zinc-50/80 dark:bg-[#0d0a16] border border-zinc-200/50 dark:border-transparent flex items-center gap-6 shadow-sm hover:shadow-lg hover:shadow-violet-500/5 hover:border-violet-200/60 dark:hover:border-violet-500/20 transition-all duration-300 group"
                >
                  <div className="text-4xl font-extrabold tracking-tight text-violet-600 dark:text-violet-400 min-w-[75px] transition-transform duration-300 group-hover:scale-110">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 border-l border-zinc-200 dark:border-white/10 pl-6 py-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Paragraph Content & Quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="space-y-5">
              {siteData.about.content.map((p, i) => (
                <p key={i} className="text-zinc-600 dark:text-zinc-300 text-[15px] md:text-base leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <div className="relative p-6 md:p-8 rounded-3xl bg-zinc-50/80 dark:bg-[#0d0a16] border-l-4 border-violet-500 dark:border-violet-400 border border-zinc-200/30 dark:border-white/5 shadow-sm hover:shadow-md hover:shadow-violet-500/5 overflow-hidden mt-4 transition-all duration-300 group">
              <span className="absolute -top-2 right-4 text-8xl font-serif text-violet-500/10 select-none pointer-events-none group-hover:text-violet-500/15 transition-colors">❝</span>
              <p className="text-base md:text-[17px] font-medium text-zinc-800 dark:text-zinc-100 italic leading-relaxed relative z-10">
                "{siteData.about.closing}"
              </p>
              <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Core Philosophy
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
