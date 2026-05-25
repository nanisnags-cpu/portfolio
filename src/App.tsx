/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar, Footer } from "./components/Layout";
import { Hero, About } from "./components/Hero";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { Projects } from "./components/Projects";
import { TechStack } from "./components/TechStack";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { ThemeProvider } from "./context/ThemeContext";
import { FloatingWidget } from "./components/FloatingWidget";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 font-sans selection:bg-violet-200 selection:text-violet-900 text-zinc-900 dark:bg-[#040209] dark:text-zinc-50 transition-colors duration-300 relative">
        <Navbar />
        <FloatingWidget />
        <main>
          <Hero />
          <About />
          <Services />
          <Process />
          <Projects />
          <TechStack />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
