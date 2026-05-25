import { siteData } from "../data";
import { motion } from "motion/react";
import { Code, Layers, Smartphone, Globe, PenTool, LayoutTemplate } from "lucide-react";
import { AnimatedSection, SectionHeading } from "./AnimatedSection";

const ICONS: Record<string, any> = {
  "Palette": PenTool,
  "Megaphone": Smartphone,
  "Monitor": LayoutTemplate,
  "Server": Globe,
  "Code": Code,
  "Film": Layers
};

export function Services() {
  return (
    <AnimatedSection id="services" className="bg-zinc-50/50 dark:bg-[#040209]/50 relative overflow-hidden transition-colors">
      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/8 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/6 rounded-full blur-3xl -z-10" />

      <SectionHeading subtitle="What I Do" title="Complete Digital Solutions for Modern Businesses" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {siteData.services.map((service, i) => {
          const Icon = ICONS[service.icon] || Code;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="card-glow shimmer-card group relative rounded-3xl border border-zinc-200/50 dark:border-white/5 bg-white dark:bg-[#0d0a16] p-8 shadow-sm hover:shadow-xl hover:shadow-violet-500/8 dark:hover:shadow-violet-900/20 hover:border-violet-200/80 dark:hover:border-violet-500/25 transition-all duration-300 cursor-default"
            >
              {/* Top corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-[3rem] rounded-tr-3xl bg-violet-500/0 group-hover:bg-violet-500/5 transition-colors duration-500" />

              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 dark:bg-[#040209] text-zinc-700 dark:text-zinc-300 group-hover:bg-violet-600 group-hover:text-white dark:group-hover:bg-violet-500 dark:group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-violet-500/30 group-hover:shadow-lg"
              >
                <Icon size={22} />
              </motion.div>

              {/* Step number */}
              <span className="absolute top-7 right-8 text-5xl font-extrabold text-zinc-100 dark:text-white/5 select-none group-hover:text-violet-500/10 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors relative z-10">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 relative z-10">
                {service.description}
              </p>

              {/* Bottom accent line */}
              <div className="mt-6 h-px bg-gradient-to-r from-violet-500/0 via-violet-500/30 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
