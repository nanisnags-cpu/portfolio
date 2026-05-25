import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const { theme, toggleTheme } = useTheme();

  const isLight = theme === "light";
  const showActiveNavbar = scrolled || isLight;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about",    label: "About" },
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Work" },
    { href: "#skills",   label: "Skills" },
    { href: "#contact",  label: "Contact" },
  ];

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-purple-400 to-pink-400 origin-left z-50"
        style={{ scaleX }}
      />

      <header
        className={`fixed top-[2px] left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          showActiveNavbar
            ? "bg-white/90 dark:bg-[#040209]/85 backdrop-blur-xl border-b border-zinc-200/60 dark:border-white/5 py-3 shadow-sm dark:shadow-none"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="group flex items-center gap-1"
          >
            <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${showActiveNavbar ? "text-zinc-900 dark:text-zinc-50" : "text-white"}`}>
              N Nagesh
            </span>
            <span className="text-violet-500 text-2xl font-bold group-hover:animate-bounce-slow transition-all">.</span>
          </motion.a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className={`nav-link transition-colors duration-200 ${
                  showActiveNavbar
                    ? "text-zinc-600 hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-300"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${
                showActiveNavbar
                  ? "text-zinc-600 hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-500/10"
                  : "text-zinc-300 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "light"
                ? <Moon size={19} />
                : <Sun size={19} />}
            </button>

            {/* CTA button */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className={`group hidden md:inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${
                showActiveNavbar
                  ? "bg-violet-600 text-white hover:bg-violet-500 shadow-md shadow-violet-500/20"
                  : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/15"
              }`}
            >
              Let's Talk
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </div>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const links = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-white dark:bg-[#040209] border-t border-zinc-100 dark:border-white/5 py-14 transition-colors">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              N Nagesh<span className="text-violet-500">.</span>
            </div>
            <p className="text-sm text-zinc-400 dark:text-zinc-500 text-center md:text-left">
              Senior Visual &amp; Web Designer
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-sm text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copy */}
          <p className="text-xs text-zinc-400 dark:text-zinc-600 text-center md:text-right">
            © {currentYear} N Nagesh. All rights reserved.
          </p>
        </div>

        {/* Bottom gradient line */}
        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />
      </div>
    </footer>
  );
}
