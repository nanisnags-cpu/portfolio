import { siteData } from "../data";
import { motion } from "motion/react";

export function Process() {
  return (
    <section
      id="process"
      className="aurora-bg py-24 md:py-32 relative overflow-hidden"
    >
      {/* Aurora orbs — kept subtle in background only */}
      <div className="aurora-orb-1 absolute top-[-80px] left-[5%]  w-[420px] h-[420px] rounded-full bg-violet-700/18  blur-[110px] pointer-events-none" />
      <div className="aurora-orb-2 absolute top-[20%]  right-[8%]  w-[350px] h-[350px] rounded-full bg-pink-600/12    blur-[100px] pointer-events-none" />
      <div className="aurora-orb-3 absolute bottom-[-60px] left-[25%] w-[380px] h-[380px] rounded-full bg-violet-900/20  blur-[110px] pointer-events-none" />
      <div className="aurora-orb-4 absolute top-[40%]  left-[50%]  w-[300px] h-[300px] rounded-full bg-pink-700/10    blur-[90px]  pointer-events-none" />
      <div className="aurora-orb-5 absolute bottom-[5%] right-[20%] w-[280px] h-[280px] rounded-full bg-violet-600/12  blur-[80px]  pointer-events-none" />

      {/* Dot-grid overlay */}
      <div className="absolute inset-0 pattern-dots opacity-25 pointer-events-none" />

      {/* Wide container */}
      <div className="mx-auto max-w-[90rem] px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mb-16 md:mb-20"
        >
          <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-pink-400">
            <span className="inline-block w-5 h-px bg-pink-400/60 rounded-full" />
            My Process
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl max-w-3xl leading-[1.1]">
            How I Turn Ideas into Reality
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-6 h-1 rounded-full bg-gradient-to-r from-violet-500 to-pink-500"
          />
        </motion.div>

        {/* 6-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {siteData.process.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              whileHover={{ y: -7 }}
              className="group relative rounded-3xl p-6 flex flex-col cursor-default transition-all duration-300
                bg-white/5 border border-white/8
                hover:bg-[#1a0a2e]/80 hover:border-pink-500/30
                backdrop-blur-sm overflow-hidden"
            >
              {/* Subtle top-left violet glow on hover */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-violet-500/0 group-hover:bg-violet-500/20 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

              {/* Violet-to-pink gradient border line on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-violet-500/0 via-pink-500/60 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              {/* Step number watermark */}
              <div className="text-5xl font-mono font-bold mb-5 leading-none select-none text-white/8 group-hover:text-pink-500/20 transition-colors duration-300">
                0{i + 1}
              </div>

              {/* Accent dot — violet/pink only */}
              <div className="w-2 h-2 rounded-full mb-4 bg-gradient-to-br from-violet-400 to-pink-500
                group-hover:scale-150 group-hover:shadow-md group-hover:shadow-pink-500/40
                transition-all duration-300 flex-shrink-0" />

              <h3 className="text-sm font-bold mb-2 text-white leading-snug relative z-10 group-hover:text-pink-100 transition-colors">
                {step.title}
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed relative z-10 group-hover:text-zinc-200 transition-colors flex-1">
                {step.desc}
              </p>

              {/* Step label */}
              <div className="mt-4 text-[9px] font-bold uppercase tracking-widest text-zinc-600 group-hover:text-pink-500/60 transition-colors font-mono">
                Step {String(i + 1).padStart(2, "0")}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connector dots row — violet/pink only */}
        <div className="hidden lg:flex items-center mt-5">
          {siteData.process.map((_, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="w-2 h-2 rounded-full flex-shrink-0 bg-gradient-to-br from-violet-500 to-pink-500 shadow-sm shadow-pink-500/30" />
              {i < siteData.process.length - 1 && (
                <div className="flex-1 h-px bg-gradient-to-r from-violet-500/30 to-pink-500/20" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
