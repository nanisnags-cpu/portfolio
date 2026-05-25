import { ReactNode } from "react";
import { motion } from "motion/react";

interface AnimatedSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export function AnimatedSection({ children, id, className = "" }: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`py-24 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        {children}
      </div>
    </motion.section>
  );
}

export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      className="mb-16 md:mb-20"
    >
      {subtitle && (
        <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
          <span className="inline-block w-5 h-px bg-violet-500/60 rounded-full" />
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-5xl lg:text-6xl max-w-3xl leading-[1.1]">
        {title}
      </h2>
      {/* Animated accent line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "3rem" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="mt-6 h-1 rounded-full bg-gradient-to-r from-violet-500 to-pink-400"
      />
    </motion.div>
  );
}
