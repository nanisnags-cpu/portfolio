import { useState, useEffect } from "react";
import { ArrowUp, Phone, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { siteData } from "../data";

const sections = ["hero", "about", "services", "process", "projects", "skills", "contact"];

export function FloatingWidget() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide top button
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }

      // Determine active section
      let current = "hero";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section top is above the middle of the viewport
          if (rect.top <= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      // Special case: if scrolled to the very bottom, set to contact
      if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 100) {
        current = "contact";
      }
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 sm:gap-4 z-50 pointer-events-none scale-75 sm:scale-100 origin-right transition-transform">
      {/* Dots Navigation Pill */}
      <div className="pointer-events-auto bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full p-3 py-5 flex flex-col gap-3 shadow-lg shadow-black/10 border border-zinc-200/50 dark:border-white/10">
        {sections.map((section, idx) => {
          const isActive = activeSection === section;
          return (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              aria-label={`Scroll to ${section}`}
              className="group relative flex items-center justify-center p-1"
            >
              <div 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive 
                    ? "bg-violet-600 dark:bg-violet-400 scale-125" 
                    : "bg-zinc-300 dark:bg-zinc-700 group-hover:bg-violet-300 dark:group-hover:bg-violet-500"
                }`}
              />
              {/* Tooltip */}
              <div className="absolute right-full mr-4 px-2 py-1 bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-wider rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {section === "hero" ? "Top" : section}
              </div>
            </button>
          );
        })}
      </div>

      {/* Contact Button */}
      <a
        href="#contact"
        className="pointer-events-auto flex items-center justify-center w-12 h-12 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full shadow-lg shadow-black/10 border border-zinc-200/50 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:text-violet-600 dark:hover:text-violet-400 hover:scale-110 active:scale-95 transition-all duration-300 group relative"
        aria-label="Contact"
      >
        <Phone size={18} className="group-hover:animate-bounce-slow" />
        <div className="absolute right-full mr-4 px-2 py-1 bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-wider rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Contact
        </div>
      </a>

      {/* Resume/PDF Button */}
      <a
        href="./N_Nagesh_Senior_Designer_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        download="N_Nagesh_Senior_Designer_Resume.pdf"
        className="pointer-events-auto flex items-center justify-center w-12 h-12 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full shadow-lg shadow-black/10 border border-zinc-200/50 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:text-violet-600 dark:hover:text-violet-400 hover:scale-110 active:scale-95 transition-all duration-300 group relative"
        aria-label="Resume"
      >
        <FileText size={18} />
        <div className="absolute right-full mr-4 px-2 py-1 bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-wider rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Resume
        </div>
      </a>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="pointer-events-auto absolute top-[calc(100%+40px)] flex items-center justify-center w-12 h-12 bg-violet-600 hover:bg-violet-500 text-white rounded-full shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-110 active:scale-95 transition-all duration-300 group"
            aria-label="Back to Top"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
