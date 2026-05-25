import { motion } from "motion/react";

export const toolLogos = [
  { name: "Photoshop",    icon: "Ps",  gradient: "from-blue-700 to-blue-400" },
  { name: "Illustrator",  icon: "Ai",  gradient: "from-orange-600 to-orange-400" },
  { name: "Figma",        icon: "F",   gradient: "from-pink-500 via-purple-500 to-blue-500" },
  { name: "Premiere Pro", icon: "Pr",  gradient: "from-purple-800 to-purple-500" },
  { name: "After Effects",icon: "Ae",  gradient: "from-indigo-800 to-indigo-500" },
  { name: "Adobe XD",     icon: "Xd",  gradient: "from-pink-600 to-purple-500" },
  { name: "CorelDRAW",    icon: "Cd",  gradient: "from-violet-600 to-violet-400" },
  { name: "Lightroom",    icon: "Lr",  gradient: "from-blue-600 to-blue-400" },
  { name: "WordPress",    icon: "W",   gradient: "from-slate-700 to-slate-500" },
  { name: "Elementor",    icon: "E",   gradient: "from-rose-600 to-rose-400" },
  { name: "Divi",         icon: "D",   gradient: "from-pink-500 to-purple-500" },
  { name: "Shopify",      icon: "S",   gradient: "from-violet-600 to-violet-400" },
  { name: "WooCommerce",  icon: "Woo", gradient: "from-purple-600 to-purple-400" },
  { name: "HTML5",        icon: "</>", gradient: "from-orange-600 to-orange-400" },
  { name: "CSS3",         icon: "{ }", gradient: "from-blue-600 to-blue-400" },
  { name: "JavaScript",   icon: "JS",  gradient: "from-yellow-400 to-yellow-300", textDark: true },
];

export function TechStack() {
  const mid = Math.ceil(toolLogos.length / 2);
  const row1 = toolLogos.slice(0, mid);
  const row2 = toolLogos.slice(mid);

  const infiniteRow1 = [...row1, ...row1, ...row1, ...row1];
  const infiniteRow2 = [...row2, ...row2, ...row2, ...row2];

  const renderCard = (tool: typeof toolLogos[0], idx: number) => (
    <div
      key={`${tool.name}-${idx}`}
      className="shimmer-card glow-violet flex items-center gap-4 min-w-[220px] px-5 py-3.5 rounded-2xl bg-white dark:bg-[#0d0a16] border border-zinc-200/40 dark:border-white/5 shadow-sm hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-violet-900/30 hover:border-violet-200/60 dark:hover:border-violet-500/25 transition-all duration-300 cursor-pointer group"
    >
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} ${tool.textDark ? "text-zinc-900" : "text-white"} font-bold text-xl shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
      >
        {tool.icon}
      </div>
      <span className="font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors text-sm">
        {tool.name}
      </span>
    </div>
  );

  return (
    <section className="py-24 bg-zinc-50 dark:bg-[#040209] transition-colors overflow-hidden relative">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.04)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl px-6 mb-16 text-center"
      >
        <span className="mb-4 block text-sm font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
          Tech &amp; Tools
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-5xl">
          Software &amp; Technologies
        </h2>
        <p className="mt-4 text-zinc-500 dark:text-zinc-400 text-base max-w-xl mx-auto">
          Industry-leading tools I use every day to craft world-class digital experiences.
        </p>
      </motion.div>

      <div className="marquee-container relative flex flex-col gap-5 w-full overflow-hidden py-2">
        {/* Edge fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-zinc-50 dark:from-[#040209] to-transparent z-10 pointer-events-none transition-colors" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-zinc-50 dark:from-[#040209] to-transparent z-10 pointer-events-none transition-colors" />

        {/* Row 1 – scrolling left */}
        <div className="flex w-max animate-marquee gap-5">
          {infiniteRow1.map((tool, idx) => renderCard(tool, idx))}
        </div>

        {/* Row 2 – scrolling right */}
        <div className="flex w-max animate-marquee-reverse gap-5">
          {infiniteRow2.map((tool, idx) => renderCard(tool, idx))}
        </div>
      </div>
    </section>
  );
}
