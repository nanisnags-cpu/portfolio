import { siteData } from "../data";
import { motion } from "motion/react";
import { AnimatedSection, SectionHeading } from "./AnimatedSection";
import { Mail, Phone, Linkedin, ArrowRight, Send } from "lucide-react";

export function Contact() {
  return (
    <AnimatedSection id="contact" className="bg-white dark:bg-[#040209] transition-colors">
      <div className="relative rounded-[3rem] overflow-hidden">
        {/* Main dark card */}
        <div className="bg-zinc-900 dark:bg-[#0c0914] p-8 md:p-16 lg:p-20 relative overflow-hidden text-white pattern-dots border border-transparent dark:border-white/5 rounded-[3rem]">

          {/* Decorative ambient blobs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/15 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 block text-sm font-semibold uppercase tracking-widest text-violet-400">
                Get In Touch
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                Have a Project<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">in Mind?</span>
              </h2>
              <p className="text-base text-zinc-400 mb-12 max-w-md leading-relaxed">
                I am open to remote roles, freelance projects, and long-term collaborations. Let's build something amazing together.
              </p>

              {/* Contact links */}
              <div className="space-y-5">
                {[
                  {
                    href: `mailto:${siteData.contact.email}`,
                    icon: Mail,
                    label: siteData.contact.email,
                    external: false,
                  },
                  {
                    href: `tel:${siteData.contact.phone}`,
                    icon: Phone,
                    label: siteData.contact.phone,
                    external: false,
                  },
                  {
                    href: siteData.contact.linkedin,
                    icon: Linkedin,
                    label: "LinkedIn Profile",
                    external: true,
                  },
                ].map(({ href, icon: Icon, label, external }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="group flex items-center gap-4 text-zinc-300 hover:text-white transition-all duration-300"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/8 group-hover:bg-violet-500/20 group-hover:scale-110 transition-all duration-300 border border-white/8 group-hover:border-violet-500/30">
                      <Icon size={18} className="group-hover:text-violet-400 transition-colors" />
                    </div>
                    <span className="nav-link text-base font-medium transition-transform duration-300 group-hover:translate-x-1">{label}</span>
                  </motion.a>
                ))}
              </div>

              {/* Divider with decorative badge */}
              <div className="mt-12 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                  Available Now
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
            </motion.div>

            {/* Right: Form with glassmorphism */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white/6 backdrop-blur-2xl rounded-[2rem] border border-white/10 p-8 md:p-10 shadow-xl shadow-black/20"
            >
              <h3 className="text-xl font-semibold mb-6 text-white">Send a Message</h3>

              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = `mailto:${siteData.contact.email}`;
                }}
              >
                {/* Name */}
                <div className="group">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2 group-focus-within:text-violet-400 transition-colors">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className="input-glow w-full bg-white/6 border border-white/12 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 transition-all hover:border-white/20 text-sm"
                  />
                </div>

                {/* Email */}
                <div className="group">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2 group-focus-within:text-violet-400 transition-colors">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="input-glow w-full bg-white/6 border border-white/12 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 transition-all hover:border-white/20 text-sm"
                  />
                </div>

                {/* Message */}
                <div className="group">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2 group-focus-within:text-violet-400 transition-colors">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="input-glow w-full bg-white/6 border border-white/12 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 transition-all resize-none hover:border-white/20 text-sm"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group relative w-full flex items-center justify-center gap-2.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 overflow-hidden"
                >
                  {/* Button shine sweep */}
                  <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] bg-white/10 skew-x-12 transition-transform duration-700 ease-out" />
                  <Send size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  Send Message
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
