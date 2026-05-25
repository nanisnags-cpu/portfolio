import { siteData } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedSection, SectionHeading } from "./AnimatedSection";
import { Code, ExternalLink, Monitor, Palette, Play, FileText } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ProjectModal } from "./ProjectModal";

interface VideoThumbnailProps {
  src: string;
  isHovered: boolean;
  className?: string;
}

function VideoThumbnail({ src, isHovered, className = "" }: VideoThumbnailProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (!isHovered) {
        video.currentTime = 1.5;
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    if (isHovered) {
      video.play().catch(() => {});
    } else {
      video.pause();
      if (video.readyState >= 1) {
        video.currentTime = 1.5;
      }
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [isHovered]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  );
}

const filterCategories = ["All", "Websites", "News Letter", "Logos", "Brochures", "Banners & Posters", "Product Design", "Video"];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const isCompactGrid = ["Logos", "Brochures", "Banners & Posters", "Product Design", "News Letter"].includes(activeFilter);

  const filteredProjects = siteData.projects.filter(p => 
    activeFilter === "All" ? true : p.tags.includes(activeFilter)
  );

  return (
    <AnimatedSection id="projects" className="bg-white dark:bg-[#040209] transition-colors">
      <SectionHeading subtitle="Featured Work" title="Real Projects. Real Impact." />
      
      <div className="mb-12 flex overflow-x-auto pb-4 gap-2 snap-x scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {filterCategories.map((filter, fi) => (
          <motion.button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: fi * 0.04 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`shimmer-card rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
              activeFilter === filter
                ? "bg-violet-600 dark:bg-violet-500 text-white shadow-md shadow-violet-500/25"
                : "bg-zinc-100 dark:bg-[#0d0a16] text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-violet-600 dark:hover:text-violet-400 border border-transparent hover:border-violet-200/50 dark:hover:border-violet-500/20"
            }`}
          >
            {filter}
          </motion.button>
        ))}
      </div>

      {activeFilter === "All" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filterCategories.slice(1).map((category) => {
              let coverProject = siteData.projects.find(p => p.tags.includes(category));
              if (category === "Logos") {
                coverProject = siteData.projects.find(p => p.image.toLowerCase().includes("home of nature logo")) || coverProject;
              }
              if (!coverProject) return null;
              
              const count = siteData.projects.filter(p => p.tags.includes(category)).length;
              const isCategoryHovered = hoveredCategory === category;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45 }}
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  onMouseEnter={() => setHoveredCategory(category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="card-glow shimmer-card group relative cursor-pointer overflow-hidden rounded-[2rem] bg-zinc-50 dark:bg-[#0d0a16] border border-zinc-200/40 dark:border-white/5 aspect-[4/3] flex flex-col justify-between p-4 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/8 dark:hover:shadow-violet-900/20 hover:border-violet-200/60 dark:hover:border-violet-500/25 transition-all duration-300"
                >
                  {/* Premium Inner Image Frame */}
                  <div className="relative w-full h-[62%] overflow-hidden rounded-2xl border border-zinc-200/30 dark:border-transparent bg-white dark:bg-[#0d0a16]/40 shadow-sm">
                    {coverProject.videoUrl ? (
                      <VideoThumbnail
                        src={coverProject.videoUrl}
                        isHovered={isCategoryHovered}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <img 
                        src={coverProject.image}
                        alt={category}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    )}
                  </div>
                  
                  {/* Clean Content Area */}
                  <div className="px-1 flex items-center justify-between pb-1">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                        {count} {count === 1 ? "Project" : "Projects"}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        {category}
                      </h3>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-violet-50 dark:bg-violet-950/40 border border-violet-100/30 dark:border-transparent flex items-center justify-center text-violet-600 dark:text-violet-400 hover:scale-105 transition-all shadow-sm">
                      <ExternalLink size={12} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div className={`grid gap-6 md:gap-10 ${isCompactGrid ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-2"}`}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => {
              const isProjectHovered = hoveredProject === project.title;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  key={project.title}
                  onClick={() => setSelectedProject(project)}
                  onMouseEnter={() => setHoveredProject(project.title)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={`card-glow shimmer-card group relative cursor-pointer overflow-hidden rounded-[2.5rem] bg-zinc-50 dark:bg-[#0d0a16] border border-zinc-200/40 dark:border-white/5 flex flex-col hover:border-violet-200/60 dark:hover:border-violet-500/20 hover:shadow-2xl hover:shadow-violet-500/8 dark:hover:shadow-violet-900/20 transition-all duration-300 ${isCompactGrid ? "p-4 sm:p-6" : "p-6 justify-between"}`}
                >
                <div>
                  {/* Image Frame */}
                  {project.image && (
                    <div className={`w-full rounded-2xl overflow-hidden shadow-sm flex flex-col transition-all group-hover:shadow-md ${project.tags.includes("Websites") ? "border border-zinc-200/40 dark:border-transparent bg-white dark:bg-[#0d0a16] mb-6" : isCompactGrid ? "bg-white dark:bg-[#0d0a16]/40 p-2" : "bg-white dark:bg-[#0d0a16]/40 border border-zinc-200/30 dark:border-transparent p-2 sm:p-4 mb-6"}`}>
                      {/* Browser Header Bar - ONLY FOR WEBSITES */}
                      {project.tags.includes("Websites") && (
                        <div className="h-9 px-4 bg-zinc-100/50 dark:bg-zinc-900 border-b border-zinc-200/30 dark:border-transparent flex items-center justify-between">
                          <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 block"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 block"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-violet-500/80 block"></span>
                          </div>
                          <div className="w-1/2 h-5 rounded bg-white dark:bg-[#040209] border border-zinc-200/20 dark:border-transparent flex items-center justify-center text-[10px] text-zinc-400 dark:text-zinc-500 font-mono truncate px-4">
                            {project.link !== "#" ? project.link.replace("https://", "") : `${project.title.toLowerCase().replace(/\s+/g, "")}.com`}
                          </div>
                          <div className="w-8"></div>
                        </div>
                      )}
                      
                      {/* Inner Window Frame */}
                      <div 
                        className={`relative overflow-hidden bg-zinc-100 dark:bg-zinc-900/50 ${project.tags.includes("Websites") ? "aspect-[16/10]" : "aspect-[4/3] sm:aspect-square flex items-center justify-center mix-blend-multiply dark:mix-blend-normal rounded-xl p-4"}`}
                      >
                        {project.videoUrl ? (
                          <VideoThumbnail
                            src={project.videoUrl}
                            isHovered={isProjectHovered}
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out rounded-xl"
                          />
                        ) : (
                          <img 
                            src={project.image} 
                            alt={`${project.title} Preview`}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className={`w-full h-full ${
                              project.tags.includes("Websites") 
                                ? "object-cover object-top group-hover:object-bottom transition-all duration-[10s] ease-in-out" 
                                : "object-contain group-hover:scale-105 transition-all duration-500 ease-out drop-shadow-sm"
                            }`}
                          />
                        )}
                        {/* Interactive hover overlay */}
                        <div className={`absolute inset-0 bg-black/10 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center ${project.tags.includes("Websites") ? "" : "rounded-xl"}`}>
                          <span className="rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-4 py-2 text-xs font-semibold tracking-wider text-zinc-900 dark:text-zinc-50 shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            {project.videoUrl ? (
                              <>Play Video <Play size={12} className="fill-current" /></>
                            ) : project.link !== "#" ? (
                              <>Explore Live Site <ExternalLink size={12} /></>
                            ) : (
                              <>Preview Details <ExternalLink size={12} /></>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                {!isCompactGrid && (
                  <>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="rounded-full bg-white dark:bg-zinc-800 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-300 shadow-sm border border-zinc-200/40 dark:border-transparent">
                          {tag}
                        </span>
                      ))}
                      {project.platform && (
                        <span className="rounded-full bg-violet-50 dark:bg-violet-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 shadow-sm border border-violet-100/20 dark:border-transparent">
                          {project.platform}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 mb-1">{project.title}</h3>
                    <div className="text-violet-600 dark:text-violet-400 font-medium text-xs uppercase tracking-wider mb-4 block">{project.role}</div>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8 max-w-lg">{project.description}</p>
                  </>
                )}
              </div>

              {!isCompactGrid && (
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-200/30 dark:border-white/5 group-hover:border-violet-200/40 dark:group-hover:border-violet-500/15 transition-colors">
                  {project.videoUrl ? (
                    <div className="flex items-center gap-3 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-750 transition-colors">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 dark:bg-violet-500/10 shadow-sm text-violet-600 dark:text-violet-400">
                        <Play size={16} className="fill-current ml-0.5" />
                      </div>
                      <span>Watch Video Clip</span>
                    </div>
                  ) : project.pdfUrl ? (
                    <div className="flex items-center gap-3 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-750 transition-colors">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 dark:bg-violet-500/10 shadow-sm text-violet-600 dark:text-violet-400">
                        <FileText size={16} />
                      </div>
                      <span>View PDF Brochure</span>
                    </div>
                  ) : project.link && project.link !== "#" ? (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 dark:bg-violet-500/10 shadow-sm text-violet-600 dark:text-violet-400 hover:scale-105 transition-transform">
                        <ExternalLink size={16} />
                      </div>
                      <span>Visit Live Website</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 text-sm font-medium text-zinc-400 dark:text-zinc-600 cursor-not-allowed">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800/40 text-zinc-400 dark:text-zinc-600">
                        <Monitor size={16} />
                      </div>
                      <span>WordPress Preview Only</span>
                    </div>
                  )}
                  
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
                    {project.videoUrl ? "Motion Work" : project.platform?.includes("WordPress") ? "CMS Build" : "Creative UX"}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
      </div>
      )}

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </AnimatedSection>
  );
}
