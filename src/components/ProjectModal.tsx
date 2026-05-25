import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, ChevronLeft, ChevronRight, FileText, Check, Copy, Sparkles, Award, Gift, Clock, ShieldCheck, Mail, BookOpen, LayoutGrid } from "lucide-react";

export interface ProjectModalProps {
  project: {
    title: string;
    tags: string[];
    image: string;
    link: string;
    description?: string;
    role?: string;
    platform?: string;
    videoUrl?: string;
    pdfUrl?: string;
    gallery?: string[];
  };
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "detail">(() => {
    return project.gallery && project.gallery.length > 0 ? "grid" : "detail";
  });

  // Newsletter interactive states
  const [claimedOffer, setClaimedOffer] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [newsletterTab, setNewsletterTab] = useState<string>("article");

  // Reset newsletter tab when project changes
  useEffect(() => {
    setNewsletterTab("article");
    setClaimedOffer(null);
    setCopiedCode(null);
  }, [project]);

  // Auto-detect YouTube/Vimeo embed URL
  const getEmbedUrl = (url?: string) => {
    if (!url) return null;
    if (url.includes("/embed/")) return url;

    // YouTube matches
    let match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
    }

    // Vimeo matches
    match = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/i);
    if (match && match[1]) {
      return `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
    }

    return null;
  };

  const embedUrl = getEmbedUrl(project.videoUrl);
  const isVideo = !!project.videoUrl;
  const isNewsletter = project.tags.includes("News Letter");
  const hasGallery = !!project.gallery && project.gallery.length > 0;
  const activeMediaSrc = hasGallery && project.gallery ? project.gallery[currentImageIndex] : project.image;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;
    if (!containerRef.current || !imageRef.current) return;
    
    const container = containerRef.current;
    const image = imageRef.current;
    
    if (image.offsetHeight <= container.offsetHeight) return;

    const rect = container.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    
    const percentage = Math.max(0, Math.min(1, mouseY / container.offsetHeight));
    const maxScroll = image.offsetHeight - container.offsetHeight;
    
    setScrollY(-(percentage * maxScroll));
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.gallery) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.gallery!.length - 1 : prev - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.gallery) {
      setCurrentImageIndex((prev) => 
        prev === project.gallery!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const renderNewsletterContent = (title: string) => {
    const emailHeader = (subject: string, from: string, date: string) => {
      const fromName = from.split(" <")[0];
      const fromEmail = from.includes(" <") ? from.split(" <")[1].replace(">", "") : from;
      return (
        <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-4 font-sans text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-semibold text-sm">
                {fromName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {fromName} <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono font-normal">&lt;{fromEmail}&gt;</span>
                </div>
                <div className="text-[10px] text-zinc-400 dark:text-zinc-500">To: subscriber@domain.com</div>
              </div>
            </div>
            <div className="text-[10px] font-mono text-zinc-400">{date}</div>
          </div>
          <div className="mt-3 p-2 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between shadow-sm">
            <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">Subject:</span> {subject}
            </div>
            <div className="flex items-center gap-1 text-emerald-650 dark:text-emerald-400 font-mono text-[9px] bg-emerald-50 dark:bg-emerald-950/45 px-2 py-0.5 rounded-full border border-emerald-500/10">
              <ShieldCheck size={11} /> Verified Sender
            </div>
          </div>
        </div>
      );
    };

    const handleCopyCode = (code: string) => {
      navigator.clipboard.writeText(code).then(() => {
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
      }).catch(err => {
        console.error("Failed to copy code: ", err);
      });
    };

    if (title.includes("SCOM")) {
      const activeTab = newsletterTab === "article" || newsletterTab === "syllabus" || newsletterTab === "offers" ? newsletterTab : "article";
      return (
        <div className="flex flex-col h-full font-sans bg-zinc-950 text-zinc-300 select-text">
          {emailHeader("SCOM Ops Insights - Hybrid Monitoring & Azure SCOM MI", "Nagesh @ SCOM Specialist <newsletter@scomspecialist.com>", "May 24, 2026")}
          
          {/* Newsletter Banner */}
          <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-zinc-900">
            <img 
              src="./Banners & Posters/SCOM Specialist Training – Advanced Designs (1).png" 
              alt="SCOM Specialist Banner" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <span className="bg-blue-650 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded border border-blue-500/20 uppercase tracking-widest">OPS INSIGHTS</span>
              <span className="bg-zinc-900/90 text-zinc-350 font-mono text-[9px] px-2 py-0.5 rounded border border-zinc-800">ISSUE #24</span>
            </div>
          </div>

          {/* SCOM Tabs Navigation */}
          <div className="flex border-b border-zinc-900 bg-zinc-900/20 p-1 gap-1">
            {[
              { id: "article", label: "Tuning Article", icon: Mail },
              { id: "syllabus", label: "Training Syllabus", icon: BookOpen },
              { id: "offers", label: "Special Deals", icon: Gift }
            ].map((t) => {
              const IconComp = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setNewsletterTab(t.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30 scale-[1.02]" 
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                  }`}
                >
                  <IconComp size={13} />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* SCOM Content Body */}
          <div className="p-6 md:p-8 space-y-6">
            {activeTab === "article" && (
              <div className="space-y-5 animate-fadeIn">
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
                  Tuning Your Hybrid Cloud: Why Azure Monitor SCOM Managed Instance (MI) is the Future
                </h2>
                <p className="text-sm leading-relaxed text-zinc-350">
                  Many enterprises face a crucial decision point. They have built comprehensive, custom monitoring ecosystems over 15+ years using on-premises **System Center Operations Manager (SCOM)**. Yet, cloud initiatives demand integration with modern observability stacks.
                </p>
                
                <div className="bg-blue-950/20 border border-blue-900/30 rounded-xl p-4 flex gap-3.5 items-start">
                  <div className="p-2 bg-blue-900/30 rounded-lg text-blue-400 shrink-0 animate-pulse">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-widest text-blue-400 mb-1">Key Insight: 100% Pack Compatibility</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      SCOM Managed Instance runs natively on Azure, leveraging Azure SQL Managed Instance under the hood. It allows you to import your customized Management Packs (MPs) directly with zero configuration loss.
                    </p>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-white mt-6 mb-2">3 Steps to Optimize Alerts & Noise</h3>
                <p className="text-xs text-zinc-400">
                  Alert fatigue is the number one cause of missed server downtime. Before executing a cloud migration, implement these three cleanup guidelines to streamline alert structures:
                </p>
                <ol className="space-y-3.5 pl-4 list-decimal text-xs text-zinc-300">
                  <li>
                    <strong className="text-white">Isolate System Activity:</strong> Tune CPU and Memory thresholds based on historical load. Avoid standard 90% static triggers; implement double-threshold or dynamic baselines.
                  </li>
                  <li>
                    <strong className="text-white">Audit Rule Discoveries:</strong> Limit discovery intervals. Run discoveries every 12 to 24 hours instead of hourly to minimize processor cycles on management servers.
                  </li>
                  <li>
                    <strong className="text-white">Enable Alert Auto-Resolve:</strong> Bind alerts to diagnostic workflows so self-healing scripts trigger automatically before generating administrator tickets.
                  </li>
                </ol>

                <div className="border-t border-zinc-900 pt-6 flex justify-between items-center text-[11px] text-zinc-550 font-mono">
                  <span>Author: Nagesh N.</span>
                  <span>Read time: 4 mins</span>
                </div>
              </div>
            )}

            {activeTab === "syllabus" && (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                  <div>
                    <h2 className="text-lg font-bold text-white">SCOM Advanced Console Authoring Training</h2>
                    <p className="text-xs text-zinc-400">12-Week Intensive Hands-on Curriculum</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-blue-950 text-blue-400 border border-blue-900/40 px-2 py-1 rounded">LEVEL: ADVANCED</span>
                </div>

                <div className="space-y-4">
                  {[
                    { week: "Weeks 1 - 3", title: "Management Pack Architecture", desc: "Understanding the XML structure, schema constraints, elements, templates, and base libraries." },
                    { week: "Weeks 4 - 6", title: "Custom Workflows & Scripting", desc: "Building PowerShell-backed discoveries, monitors, and rules with cookdown optimization." },
                    { week: "Weeks 7 - 9", title: "Azure Monitor SCOM MI Integration", desc: "Coexistence architectures, migrating custom monitoring logs, and configuring hybrid alerts." },
                    { week: "Weeks 10 - 12", title: "UI Customization & REST API Dashboards", desc: "Engineering custom widgets, dashboards, and reporting trees using standard REST interfaces." }
                  ].map((w, idx) => (
                    <div key={idx} className="flex gap-4 p-3 bg-zinc-900/30 border border-zinc-900/60 rounded-xl">
                      <div className="text-[10px] font-mono font-bold text-blue-500 shrink-0 uppercase tracking-wider w-20 pt-0.5">
                        {w.week}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-white">{w.title}</h4>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{w.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "offers" && (
              <div className="space-y-5 animate-fadeIn">
                <h2 className="text-lg font-bold text-white">Exclusive SCOM Training & Consultancy Promotions</h2>
                <p className="text-xs text-zinc-400">We offer corporate teams custom programs and audit support to ensure smooth systems operations.</p>
                
                {/* Coupon Card */}
                <div className="bg-gradient-to-br from-blue-950/30 to-violet-950/20 border border-blue-900/40 rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-650/10 rounded-full blur-2xl" />
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded border border-blue-800/30">PROMO CODE</span>
                      <h3 className="text-base font-bold text-white mt-1.5">20% Off Advanced Training Course</h3>
                    </div>
                    <span className="text-2xl font-bold text-blue-400 font-mono">-20%</span>
                  </div>

                  <div className="flex items-center gap-2 bg-zinc-950 p-2.5 rounded-lg border border-zinc-900">
                    <span className="text-sm font-mono font-bold tracking-widest text-white flex-1 text-center select-all">SCOM20</span>
                    <button
                      onClick={() => handleCopyCode("SCOM20")}
                      className="p-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center justify-center gap-1.5 px-3.5 text-xs font-bold"
                    >
                      {copiedCode === "SCOM20" ? (
                        <>
                          <Check size={12} /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={12} /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="mt-4 text-[10px] text-zinc-550 flex items-center gap-1.5 font-mono">
                    <Clock size={11} /> Offer valid until June 30, 2026. Limit 1 per team.
                  </div>
                </div>

                {/* Claim Offer Button */}
                <div className="bg-zinc-900/40 border border-zinc-900 p-4 rounded-xl text-center space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Ready to Get Started?</h4>
                  <p className="text-[11px] text-zinc-400">Claim this promotion now to book an initial training consultation and receive your course enrollment materials.</p>
                  
                  {claimedOffer === "SCOM20" ? (
                    <div className="bg-emerald-950/40 border border-emerald-900/40 p-3.5 rounded-lg text-emerald-450 text-xs font-semibold flex items-center justify-center gap-2">
                      <Award size={14} className="animate-bounce" /> Spot Reserved! Course materials sent to subscriber@domain.com
                    </div>
                  ) : (
                    <button
                      onClick={() => setClaimedOffer("SCOM20")}
                      className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white py-2.5 px-4 rounded-lg text-xs font-bold transition-all shadow-md shadow-blue-900/20"
                    >
                      Claim & Reserve 20% Spot
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Email Footer */}
          <div className="border-t border-zinc-900 bg-zinc-950 p-6 font-sans text-[10px] text-zinc-500 text-center space-y-2.5">
            <div className="flex justify-center gap-4 text-zinc-400">
              <a href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>Manage Preferences</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>Unsubscribe</a>
            </div>
            <p className="leading-relaxed">
              You are receiving this operational dispatch because you opted in to SCOM Specialist advisory logs. <br />
              © 2026 SCOM Specialist Ltd. All rights reserved. Registered Office: London, UK.
            </p>
          </div>
        </div>
      );
    }

    if (title.includes("Taxonomy")) {
      const activeTab = newsletterTab === "article" || newsletterTab === "feasibility" || newsletterTab === "offers" ? newsletterTab : "article";
      return (
        <div className="flex flex-col h-full font-sans bg-[#13110E] text-[#B8B4AE] select-text">
          {emailHeader("Taxonomy Business Advisory Digest - Dubai Dropshipping Special", "Taxonomy Advisory <info@taxonomybusiness.com>", "May 24, 2026")}
          
          {/* Newsletter Banner */}
          <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-[#2C2720]">
            <img 
              src="./Banners & Posters/Taxonomy June banners Dropshipping Journey in the UAE (1).png" 
              alt="Taxonomy Banner" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#13110E] via-[#13110E]/30 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <span className="bg-[#B38F4D] text-black font-mono text-[9px] font-bold px-2 py-0.5 rounded border border-[#C5A566]/20 uppercase tracking-widest">ADVISORY DIGEST</span>
              <span className="bg-[#1C1814] text-[#B8B4AE] font-mono text-[9px] px-2 py-0.5 rounded border border-[#2D2821]">ISSUE #12</span>
            </div>
          </div>

          {/* Taxonomy Tabs Navigation */}
          <div className="flex border-b border-[#231F1A] bg-[#1A1713] p-1 gap-1">
            {[
              { id: "article", label: "UAE Dropshipping", icon: Mail },
              { id: "feasibility", label: "Setup Checklist", icon: BookOpen },
              { id: "offers", label: "Consultation Special", icon: Gift }
            ].map((t) => {
              const IconComp = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setNewsletterTab(t.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? "bg-[#B38F4D] text-black shadow-lg shadow-[#B38F4D]/25 scale-[1.02]" 
                      : "text-[#B8B4AE] hover:bg-[#1A1713] hover:text-white"
                  }`}
                >
                  <IconComp size={13} />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Taxonomy Content Body */}
          <div className="p-6 md:p-8 space-y-6">
            {activeTab === "article" && (
              <div className="space-y-5 animate-fadeIn">
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
                  Navigating the UAE Dropshipping Boom: Business Licenses & Taxes in 2026
                </h2>
                <p className="text-sm leading-relaxed text-[#B8B4AE]">
                  The e-commerce landscape across the Gulf Cooperation Council (GCC) is evolving at lightning speed. Dubai remains the premier gateway, offering access to high-density consumer markets, world-class logistics facilities, and clear trade structures.
                </p>
                
                <div className="bg-[#B38F4D]/5 border border-[#B38F4D]/20 rounded-xl p-4 flex gap-3.5 items-start">
                  <div className="p-2 bg-[#B38F4D]/10 rounded-lg text-[#D5B06C] shrink-0 animate-pulse">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-widest text-[#D5B06C] mb-1">Corporate Tax Regulation</h4>
                    <p className="text-xs text-[#A8A49E] leading-relaxed">
                      Effective since 2024 and continuing into 2026, companies registered in UAE Free Zones are subject to a **9% corporate tax** rate on taxable profits exceeding AED 375,000. However, qualifying free zone persons (QFZPs) can maintain a 0% rate on qualifying income.
                    </p>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-white mt-6 mb-2">Free Zone Selection: Finding Your Hub</h3>
                <p className="text-xs text-[#A8A49E]">
                  Setting up a dropshipping storefront requires picking a license authority that supports e-commerce operations. Here are the leading options for international merchants:
                </p>
                <div className="space-y-4">
                  {[
                    { zone: "Meydan Free Zone (MFZ)", benefit: "Direct address inside central Dubai. Very cheap e-commerce licenses with instant IBAN setups." },
                    { zone: "IFZA (International Free Zone Authority)", benefit: "Ideal for remote entrepreneurs. Flexible visas and simple regulatory updates." },
                    { zone: "Shams (Sharjah Media City)", benefit: "Perfect for media-heavy storefronts. Very fast registration processes." }
                  ].map((z, idx) => (
                    <div key={idx} className="border-l-2 border-[#B38F4D] pl-3 py-0.5">
                      <strong className="text-white text-xs block">{z.zone}</strong>
                      <span className="text-[11px] text-[#A8A49E]">{z.benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#2C2720] pt-6 flex justify-between items-center text-[11px] text-[#78746F] font-mono">
                  <span>Author: Taxonomy Advisory</span>
                  <span>Read time: 5 mins</span>
                </div>
              </div>
            )}

            {activeTab === "feasibility" && (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex justify-between items-center border-b border-[#2C2720] pb-3">
                  <div>
                    <h2 className="text-lg font-bold text-white">Advisory Setup Protocol</h2>
                    <p className="text-xs text-[#A8A49E]">Licensing and bank setup stages</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-[#B38F4D]/10 text-[#D5B06C] border border-[#B38F4D]/20 px-2 py-1 rounded">COMPLIANCE CODE: GCC-ECOM</span>
                </div>

                <div className="space-y-4">
                  {[
                    { step: "Stage 01", title: "Entity Registration & Name Approval", desc: "Select 3 prospective corporate names and submit trade license applications. Free Zone approval typically requires 48 to 72 hours." },
                    { step: "Stage 02", title: "E-Commerce License Issuance", desc: "Receive the trade license, memorandum of association (MOA), and certificate of incorporation. This officially registers your business with the DED." },
                    { step: "Stage 03", title: "Corporate Banking & Gateways", desc: "Establish corporate bank accounts with local providers (Wio, Mashreq, HSBC) and connect payment processors like Stripe UAE or Checkout.com." }
                  ].map((s, idx) => (
                    <div key={idx} className="flex gap-4 p-3.5 bg-[#1C1814] border border-[#2D2821] rounded-xl">
                      <div className="text-[10px] font-mono font-bold text-[#B38F4D] shrink-0 uppercase tracking-wider w-16 pt-0.5">
                        {s.step}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-white">{s.title}</h4>
                        <p className="text-[11px] text-[#A8A49E] leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "offers" && (
              <div className="space-y-5 animate-fadeIn">
                <h2 className="text-lg font-bold text-white">Corporate Setup Consultations</h2>
                <p className="text-xs text-[#A8A49E]">Book a detailed consulting session to audit your business structuring and free zone options.</p>
                
                {/* Coupon Card */}
                <div className="bg-gradient-to-br from-[#1C1814] to-[#25201A] border border-[#3E3526] rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#B38F4D]/5 rounded-full blur-2xl" />
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase bg-[#B38F4D]/20 text-[#D5B06C] px-2 py-0.5 rounded border border-[#B38F4D]/10">EXCLUSIVE AUDIT</span>
                      <h3 className="text-base font-bold text-white mt-1.5">Free Dubai License Checkup</h3>
                    </div>
                    <span className="text-xl font-bold text-[#D5B06C] font-mono">FREE</span>
                  </div>

                  <div className="flex items-center gap-2 bg-black p-2.5 rounded-lg border border-[#2D2821]">
                    <span className="text-sm font-mono font-bold tracking-widest text-white flex-1 text-center select-all">TAXODUBAI</span>
                    <button
                      onClick={() => handleCopyCode("TAXODUBAI")}
                      className="p-1.5 rounded bg-[#B38F4D] hover:bg-[#C5A566] text-black transition-all flex items-center justify-center gap-1.5 px-3.5 text-xs font-bold"
                    >
                      {copiedCode === "TAXODUBAI" ? (
                        <>
                          <Check size={12} /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={12} /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="mt-4 text-[10px] text-[#78746F] flex items-center gap-1.5 font-mono">
                    <Clock size={11} /> Consultation slot is reserved for 3 days once copied.
                  </div>
                </div>

                {/* Claim Offer Button */}
                <div className="bg-[#1C1814] border border-[#2D2821] p-4 rounded-xl text-center space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Schedule Your Consultation</h4>
                  <p className="text-[11px] text-[#A8A49E]">Claim this slot now to reserve your audit call with a senior corporate tax advisor.</p>
                  
                  {claimedOffer === "TAXODUBAI" ? (
                    <div className="bg-emerald-950/40 border border-emerald-900/40 p-3.5 rounded-lg text-emerald-450 text-xs font-semibold flex items-center justify-center gap-2">
                      <Award size={14} className="animate-bounce" /> Audit Slot Reserved! Confirmation sent to subscriber@domain.com
                    </div>
                  ) : (
                    <button
                      onClick={() => setClaimedOffer("TAXODUBAI")}
                      className="w-full bg-[#B38F4D] hover:bg-[#C5A566] active:scale-[0.99] text-black py-2.5 px-4 rounded-lg text-xs font-bold transition-all shadow-md shadow-[#B38F4D]/10"
                    >
                      Claim Free Audit Consultation
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Email Footer */}
          <div className="border-t border-[#2C2720] bg-black p-6 font-sans text-[10px] text-[#78746F] text-center space-y-2.5">
            <div className="flex justify-center gap-4 text-[#B8B4AE]">
              <a href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>Legal Compliance</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>Privacy Settings</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>Unsubscribe</a>
            </div>
            <p className="leading-relaxed">
              Taxonomy Business Advisory Digest is sent to subscribers. <br />
              © 2026 Taxonomy Advisory Services. Boulevard Plaza Tower 1, Downtown Dubai, UAE.
            </p>
          </div>
        </div>
      );
    }

    if (title.includes("TopQore")) {
      const activeTab = newsletterTab === "article" || newsletterTab === "audit" || newsletterTab === "offers" ? newsletterTab : "article";
      return (
        <div className="flex flex-col h-full font-sans bg-[#0B0F17] text-[#94A3B8] select-text">
          {emailHeader("TopQore Tech Pulse - WordPress Optimization & Speed", "TopQore Team <support@topqore.com>", "May 24, 2026")}
          
          {/* Newsletter Banner */}
          <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-[#1E293B]">
            <img 
              src="./projects/topqore.webp" 
              alt="TopQore Banner" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/30 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <span className="bg-[#10B981] text-[#0B0F17] font-mono text-[9px] font-bold px-2 py-0.5 rounded border border-[#10B981]/20 uppercase tracking-widest">DEV & HOSTING</span>
              <span className="bg-[#0F172A] text-[#94A3B8] font-mono text-[9px] px-2 py-0.5 rounded border border-[#1E293B]">ISSUE #42</span>
            </div>
          </div>

          {/* TopQore Tabs Navigation */}
          <div className="flex border-b border-[#1E293B] bg-[#0F172A] p-1 gap-1">
            {[
              { id: "article", label: "Dev Guide", icon: Mail },
              { id: "audit", label: "Audit Protocol", icon: BookOpen },
              { id: "offers", label: "Cloud Hosting Deals", icon: Gift }
            ].map((t) => {
              const IconComp = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setNewsletterTab(t.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? "bg-[#10B981] text-black shadow-lg shadow-[#10B981]/30 scale-[1.02]" 
                      : "text-[#94A3B8] hover:bg-[#0F172A] hover:text-white"
                  }`}
                >
                  <IconComp size={13} />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* TopQore Content Body */}
          <div className="p-6 md:p-8 space-y-6">
            {activeTab === "article" && (
              <div className="space-y-5 animate-fadeIn">
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
                  WordPress Core Web Vitals Checklist: Achieve 95+ PageSpeed Scores
                </h2>
                <p className="text-sm leading-relaxed text-[#94A3B8]">
                  Website performance directly drives organic SEO search rankings and conversion ratios. While page builder frameworks like Elementor and Divi speed up UI building, they often introduce script bloating if not configured correctly.
                </p>
                
                <div className="bg-[#10B981]/5 border border-[#10B981]/25 rounded-xl p-4 flex gap-3.5 items-start">
                  <div className="p-2 bg-[#10B981]/10 rounded-lg text-[#34D399] shrink-0 animate-pulse">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-widest text-[#34D399] mb-1">Developer-Level Cache Curation</h4>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Always implement Redis Object Cache to reduce MySQL database lookups. Standard cache plug-ins only handle HTML caching. Database calls (e.g. settings queries, product loops) must be stored in memory for real speed.
                    </p>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-white mt-6 mb-2">3 Critical Optimization Checkpoints</h3>
                <ol className="space-y-3.5 pl-4 list-decimal text-xs text-[#8492A6]">
                  <li>
                    <strong className="text-white">Defer Non-Critical Javascript:</strong> Delay load scripts like analytics tracking, Facebook pixel trackers, and customer service chats until user interaction (first mouse move or scroll).
                  </li>
                  <li>
                    <strong className="text-white">Implement WebP/AVIF Image Pipelines:</strong> Transition standard PNG/JPG media items to modern formats. Configure server-side image scaling to match the viewport dimensions.
                  </li>
                  <li>
                    <strong className="text-white">Eliminate CSS Layout Shifts:</strong> Set fixed aspect-ratios for banners, logos, and advertising containers. This prevents Largest Contentful Paint delays and user misclicks.
                  </li>
                </ol>

                <div className="border-t border-[#1E293B] pt-6 flex justify-between items-center text-[11px] text-[#475569] font-mono">
                  <span>Author: TopQore Developers</span>
                  <span>Read time: 3.5 mins</span>
                </div>
              </div>
            )}

            {activeTab === "audit" && (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex justify-between items-center border-b border-[#1E293B] pb-3">
                  <div>
                    <h2 className="text-lg font-bold text-white">TopQore Performance Audit Protocol</h2>
                    <p className="text-xs text-[#94A3B8]">Standard testing cycles for customized setups</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/20 px-2 py-1 rounded">VERSION 2.4</span>
                </div>

                <div className="space-y-4">
                  {[
                    { phase: "Phase 1", title: "Diagnostic Audit", desc: "Execute Google Lighthouse, WebPageTest, and GTmetrix sweeps to isolate database locks, unused files, and TTFB delays." },
                    { phase: "Phase 2", title: "CSS & Script Tuning", desc: "Perform script tree shaking. Defer jQuery and modern UI engines. Minify styling assets to avoid layout recalculation loops." },
                    { phase: "Phase 3", title: "Server & CDN Configurations", desc: "Optimize server processes. Configure Redis object buffers, Gzip/Brotli file compressions, and Edge caching routers." }
                  ].map((p, idx) => (
                    <div key={idx} className="flex gap-4 p-3.5 bg-[#0F172A] border border-[#1E293B] rounded-xl">
                      <div className="text-[10px] font-mono font-bold text-[#10B981] shrink-0 uppercase tracking-wider w-16 pt-0.5">
                        {p.phase}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-white">{p.title}</h4>
                        <p className="text-[11px] text-[#64748B] leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "offers" && (
              <div className="space-y-5 animate-fadeIn">
                <h2 className="text-lg font-bold text-white">Cloud Hosting & Migration Offers</h2>
                <p className="text-xs text-[#94A3B8]">Accelerate your site speed by migrating to TopQore's performance-tuned cloud hosting environment.</p>
                
                {/* Coupon Card */}
                <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B]/60 border border-[#10B981]/30 rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#10B981]/10 rounded-full blur-2xl" />
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase bg-[#10B981]/25 text-[#34D399] px-2 py-0.5 rounded border border-[#10B981]/10">MIGRATION PASS</span>
                      <h3 className="text-base font-bold text-white mt-1.5">50% Off First 3 Months Managed Hosting</h3>
                    </div>
                    <span className="text-2xl font-bold text-[#34D399] font-mono">-50%</span>
                  </div>

                  <div className="flex items-center gap-2 bg-black p-2.5 rounded-lg border border-[#1E293B]">
                    <span className="text-sm font-mono font-bold tracking-widest text-white flex-1 text-center select-all">TOPQORE50</span>
                    <button
                      onClick={() => handleCopyCode("TOPQORE50")}
                      className="p-1.5 rounded bg-[#10B981] hover:bg-[#059669] text-[#0B0F17] transition-all flex items-center justify-center gap-1.5 px-3.5 text-xs font-bold"
                    >
                      {copiedCode === "TOPQORE50" ? (
                        <>
                          <Check size={12} /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={12} /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="mt-4 text-[10px] text-[#64748B] flex items-center gap-1.5 font-mono">
                    <Clock size={11} /> Offer includes free site migration by our dev team.
                  </div>
                </div>

                {/* Claim Offer Button */}
                <div className="bg-[#0F172A] border border-[#1E293B] p-4 rounded-xl text-center space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Reserve Your Migration Slot</h4>
                  <p className="text-[11px] text-[#94A3B8]">Claim this discount now to schedule your site's speed optimization and server migration.</p>
                  
                  {claimedOffer === "TOPQORE50" ? (
                    <div className="bg-emerald-950/40 border border-emerald-900/40 p-3.5 rounded-lg text-emerald-450 text-xs font-semibold flex items-center justify-center gap-2">
                      <Award size={14} className="animate-bounce" /> Migration Reserved! Our team will contact you within 24 hours.
                    </div>
                  ) : (
                    <button
                      onClick={() => setClaimedOffer("TOPQORE50")}
                      className="w-full bg-[#10B981] hover:bg-[#059669] active:scale-[0.99] text-black py-2.5 px-4 rounded-lg text-xs font-bold transition-all shadow-md shadow-[#10B981]/15"
                    >
                      Claim 50% Hosting Discount
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Email Footer */}
          <div className="border-t border-[#1E293B] bg-black p-6 font-sans text-[10px] text-[#475569] text-center space-y-2.5">
            <div className="flex justify-center gap-4 text-[#94A3B8]">
              <a href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>Hosting Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>Network Status</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>Unsubscribe</a>
            </div>
            <p className="leading-relaxed">
              TopQore Tech Pulse is a newsletter sent to system administrators. <br />
              © 2026 TopQore BV. Science Park Amsterdam, Netherlands.
            </p>
          </div>
        </div>
      );
    }

    const activeTab = newsletterTab === "article" || newsletterTab === "ingredients" || newsletterTab === "offers" ? newsletterTab : "article";
    return (
      <div className="flex flex-col h-full font-sans bg-[#FAF9F6] text-[#4A3E3D] select-text">
        {emailHeader("Home of Nature - Cold-Pressed Oils & Organic Skincare", "Home of Nature <wellness@homeofnature.com>", "May 24, 2026")}
        
        {/* Newsletter Banner */}
        <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-[#E6DEC9]">
          <img 
            src="./Product design/Home of nature Designs (1).png" 
            alt="Home of Nature Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/20 to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="bg-[#4A5D4E] text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded border border-[#4A5D4E]/20 uppercase tracking-widest">WELLNESS DIGEST</span>
            <span className="bg-[#EAE6DF] text-[#4A5D4E] font-mono text-[9px] px-2 py-0.5 rounded border border-[#DDD]">ISSUE #18</span>
          </div>
        </div>

        {/* Nature Tabs Navigation */}
        <div className="flex border-b border-[#E6E2D8] bg-[#EAE6DF]/60 p-1 gap-1">
          {[
            { id: "article", label: "Botanical Wisdom", icon: Mail },
            { id: "ingredients", label: "Ingredient Glossary", icon: BookOpen },
            { id: "offers", label: "Organic Bundles", icon: Gift }
          ].map((t) => {
            const IconComp = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setNewsletterTab(t.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive 
                    ? "bg-[#4A5D4E] text-white shadow-lg shadow-[#4A5D4E]/25 scale-[1.02]" 
                    : "text-[#555] hover:bg-[#EAE6DF] hover:text-[#2C3E30]"
                }`}
              >
                <IconComp size={13} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Nature Content Body */}
        <div className="p-6 md:p-8 space-y-6">
          {activeTab === "article" && (
            <div className="space-y-5 animate-fadeIn">
              <h2 className="text-xl md:text-2xl font-bold text-[#2C3E30] tracking-tight leading-tight">
                Embracing Botanicals: Why Cold-Pressed Ingredients Matter for Skin Health
              </h2>
              <p className="text-sm leading-relaxed text-[#5A524E]">
                In a cosmetics market saturated with chemical solvents and synthetic fillers, the return to organic purity is a necessity. Cold-pressed skincare ingredients retain their molecular integrity, matching the skin's protective lipid barrier.
              </p>
              
              <div className="bg-[#4A5D4E]/5 border border-[#4A5D4E]/20 rounded-xl p-4 flex gap-3.5 items-start">
                <div className="p-2 bg-[#4A5D4E]/10 rounded-lg text-[#4A5D4E] shrink-0 animate-pulse">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-widest text-[#2C3E30] mb-1">Cold-Pressing Advantage</h4>
                  <p className="text-xs text-[#5A524E] leading-relaxed">
                    By extracting botanical oils without thermal processing or chemical solvents, delicate vitamins, essential fatty acids, and active enzymes remain intact, offering deep nourishment.
                  </p>
                </div>
              </div>

              <h3 className="text-base font-semibold text-[#2C3E30] mt-6 mb-2">Essential Botanical Oils and Their Profiles</h3>
              <p className="text-xs text-[#5A524E]">
                Our skincare line features wild-harvested botanical oils formulated to soothe inflammation and stimulate collagen synthesis:
              </p>
              <div className="space-y-4">
                {[
                  { oil: "Jojoba Esters", benefit: "Identical to human sebum, jojoba locks in moisture without clogging pores." },
                  { oil: "Rosehip Seed Extract", benefit: "Vibrant with natural vitamin C and trans-retinoic acid for cell turnover." },
                  { oil: "Calendula Flower", benefit: "Deeply soothing, calendula calms skin sensitivity and redness." }
                ].map((o, idx) => (
                  <div key={idx} className="border-l-2 border-[#4A5D4E] pl-3 py-0.5">
                    <strong className="text-[#2C3E30] text-xs block">{o.oil}</strong>
                    <span className="text-[11px] text-[#5A524E]">{o.benefit}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E6E2D8] pt-6 flex justify-between items-center text-[11px] text-[#8C847E] font-mono">
                <span>Author: Wellness Editors</span>
                <span>Read time: 3 mins</span>
              </div>
            </div>
          )}

          {activeTab === "ingredients" && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex justify-between items-center border-b border-[#E6E2D8] pb-3">
                <div>
                  <h2 className="text-lg font-bold text-[#2C3E30]">Botanical Ingredient Glossary</h2>
                  <p className="text-xs text-[#5A524E]">Pure, organic ingredients for cellular defense</p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-[#4A5D4E]/10 text-[#4A5D4E] border border-[#4A5D4E]/20 px-2 py-1 rounded">100% ORGANIC</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Organic Rosehip", use: "Fine lines, elasticity, hyperpigmentation repair" },
                  { title: "Cold-Pressed Jojoba", use: "Barrier protection, light hydration, non-comedogenic" },
                  { title: "Lavender Hydrosol", use: "Redness soothing, evening skin tone, hydration boost" },
                  { title: "Chamomile Extract", use: "Calming inflammation, repairing compromised skin barriers" }
                ].map((i, idx) => (
                  <div key={idx} className="p-3 bg-[#EAE6DF]/30 border border-[#E6E2D8] rounded-xl space-y-1">
                    <h4 className="text-xs font-bold text-[#2C3E30]">{i.title}</h4>
                    <p className="text-[11px] text-[#6A625E] leading-relaxed">{i.use}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "offers" && (
            <div className="space-y-5 animate-fadeIn">
              <h2 className="text-lg font-bold text-[#2C3E30]">Special Skincare Bundle Promotions</h2>
              <p className="text-xs text-[#5A524E]">Claim a discount code on our certified organic botanical serum kits, complete with eco-friendly shipping.</p>
              
              {/* Coupon Card */}
              <div className="bg-gradient-to-br from-[#EAE6DF]/50 to-[#FAF9F6] border border-[#D4C3B3] rounded-xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#4A5D4E]/5 rounded-full blur-2xl" />
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase bg-[#4A5D4E]/10 text-[#4A5D4E] px-2 py-0.5 rounded border border-[#4A5D4E]/20">LIMITED EDITION</span>
                    <h3 className="text-base font-bold text-[#2C3E30] mt-1.5">15% Discount on Botanical Bundle</h3>
                  </div>
                  <span className="text-2xl font-bold text-[#4A5D4E] font-mono">-15%</span>
                </div>

                <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-[#E6E2D8]">
                  <span className="text-sm font-mono font-bold tracking-widest text-[#2C3E30] flex-1 text-center select-all">BOTANICAL15</span>
                  <button
                    onClick={() => handleCopyCode("BOTANICAL15")}
                    className="p-1.5 rounded bg-[#4A5D4E] hover:bg-[#3D4C40] text-white transition-all flex items-center justify-center gap-1.5 px-3.5 text-xs font-bold"
                  >
                    {copiedCode === "BOTANICAL15" ? (
                      <>
                        <Check size={12} /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={12} /> Copy
                      </>
                    )}
                  </button>
                </div>
                
                <div className="mt-4 text-[10px] text-[#7A726E] flex items-center gap-1.5 font-mono">
                  <Clock size={11} /> Offer includes free glass pipette applicator.
                </div>
              </div>

              {/* Claim Offer Button */}
              <div className="bg-[#EAE6DF]/40 border border-[#E6E2D8] p-4 rounded-xl text-center space-y-3">
                <h4 className="text-xs font-bold text-[#2C3E30] uppercase tracking-wider">Secure Your Organic Bundle</h4>
                <p className="text-[11px] text-[#5A524E]">Claim this promo code now to automatically apply the discount and reserve a shipping kit.</p>
                
                {claimedOffer === "BOTANICAL15" ? (
                  <div className="bg-emerald-800/10 border border-emerald-800/20 p-3.5 rounded-lg text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2">
                    <Award size={14} className="animate-bounce" /> Bundle Reserved! Checkout link sent to subscriber@domain.com
                  </div>
                ) : (
                  <button
                    onClick={() => setClaimedOffer("BOTANICAL15")}
                    className="w-full bg-[#4A5D4E] hover:bg-[#3D4C40] active:scale-[0.99] text-white py-2.5 px-4 rounded-lg text-xs font-bold transition-all shadow-md shadow-[#4A5D4E]/10"
                  >
                    Claim 15% Bundle Discount
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Email Footer */}
        <div className="border-t border-[#E6E2D8] bg-[#EAE6DF]/40 p-6 font-sans text-[10px] text-[#7A726E] text-center space-y-2.5">
          <div className="flex justify-center gap-4 text-[#4A5D4E]">
            <a href="#" className="hover:text-black transition-colors" onClick={(e) => e.preventDefault()}>Ingredients Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-black transition-colors" onClick={(e) => e.preventDefault()}>Eco Recycling</a>
            <span>•</span>
            <a href="#" className="hover:text-black transition-colors" onClick={(e) => e.preventDefault()}>Unsubscribe</a>
          </div>
          <p className="leading-relaxed">
            Wellness Digest is sent to subscribers of Home of Nature. <br />
            © 2026 Home of Nature Organic LLC. Grasmere, Lake District, UK.
          </p>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/45 dark:bg-black/80 backdrop-blur-md p-4 md:p-10"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-6xl h-full max-h-[85vh] bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-2xl flex ${viewMode === 'grid' ? 'flex-col' : 'flex-col md:grid md:grid-cols-3'}`}
      >
        {viewMode === "grid" && hasGallery ? (
          <div className="w-full h-full overflow-y-auto p-6 md:p-10">
            <div className="flex justify-between items-center mb-8 sticky top-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md py-4 z-10 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">{project.title}</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Select a banner to view details</p>
              </div>
              <button 
                onClick={onClose} 
                className="p-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-300 transition-all shadow-sm"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-10">
              {project.gallery!.map((img, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03, duration: 0.3 }}
                  onClick={() => {
                    setCurrentImageIndex(idx);
                    setViewMode("detail");
                  }}
                  className="aspect-square bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer group border border-zinc-200/50 dark:border-zinc-800/50 hover:border-violet-500/50 transition-all shadow-sm hover:shadow-xl hover:shadow-violet-500/20 flex items-center justify-center"
                >
                  <img src={img} alt={`Gallery ${idx}`} loading="lazy" className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Back Button (Floating on Mobile) */}
            {hasGallery && (
              <button 
                onClick={() => setViewMode("grid")} 
                className="absolute top-4 left-4 z-50 p-2.5 bg-white/80 hover:bg-zinc-100 dark:bg-black/60 dark:hover:bg-zinc-800/80 border border-zinc-200/50 dark:border-white/5 rounded-full text-zinc-800 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all shadow-md md:hidden"
              >
                <LayoutGrid size={20} />
              </button>
            )}

            {/* Close Button (Floating on Mobile) */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 z-50 p-2.5 bg-white/80 hover:bg-zinc-100 dark:bg-black/60 dark:hover:bg-zinc-800/80 border border-zinc-200/50 dark:border-white/5 rounded-full text-zinc-800 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all shadow-md md:hidden"
            >
              <X size={20} />
            </button>

        {/* Media Left Area (2/3 width on Desktop) */}
        <div className="relative md:col-span-2 h-[45vh] md:h-full bg-zinc-50/50 dark:bg-zinc-900/40 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800">
          
          {isNewsletter ? (
            /* Newsletter Mode */
            <div className="w-full h-full overflow-y-auto p-4 md:p-8 bg-zinc-100 dark:bg-zinc-900">
              <div className="mx-auto max-w-xl bg-white dark:bg-zinc-950 rounded-2xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 text-left">
                {renderNewsletterContent(project.title)}
              </div>
            </div>
          ) : isVideo ? (
            /* Video Mode */
            <div className="w-full h-full flex items-center justify-center p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950">
              {embedUrl ? (
                <div className="w-full h-full aspect-video md:aspect-auto max-w-full max-h-full rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800/80">
                  <iframe
                    src={embedUrl}
                    title={project.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <video
                  src={project.videoUrl}
                  controls
                  autoPlay
                  className="max-w-full max-h-full rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800/85"
                />
              )}
            </div>
          ) : (
            /* Image / Gallery Mode */
            <div 
              ref={containerRef}
              onMouseMove={project.tags.includes("Websites") && !hasGallery ? handleMouseMove : undefined}
              className={`relative w-full h-full ${
                project.tags.includes("Websites") && !hasGallery 
                  ? "md:cursor-ns-resize overflow-y-auto md:overflow-hidden custom-scrollbar" 
                  : "flex items-center justify-center p-6 md:p-10 select-none"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeMediaSrc}
                  ref={imageRef}
                  src={activeMediaSrc}
                  alt={project.title}
                  initial={{ opacity: 0 }}
                  className={
                    project.tags.includes("Websites") && !hasGallery
                      ? "w-full h-auto object-cover md:absolute md:top-0 md:left-0 shadow-lg"
                      : "max-w-full max-h-full object-contain rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800/30"
                  }
                  animate={
                    project.tags.includes("Websites") && !hasGallery
                      ? { opacity: 1, y: scrollY }
                      : { opacity: 1, scale: 1 }
                  }
                  transition={
                    project.tags.includes("Websites") && !hasGallery
                      ? { y: { type: "tween", ease: "easeOut", duration: 0.5 }, opacity: { duration: 0.3 } }
                      : { duration: 0.3 }
                  }
                />
              </AnimatePresence>

              {/* Website Panning Guide Overlay */}
              {project.tags.includes("Websites") && !hasGallery && (
                <div className="hidden md:flex absolute inset-x-0 bottom-6 justify-center pointer-events-none transition-opacity duration-500 hover:opacity-0">
                  <span className="bg-black/75 backdrop-blur-md text-white/95 px-4 py-2 rounded-full text-xs flex items-center gap-2 border border-white/5 shadow-lg">
                    <span className="animate-bounce">↕</span> Move mouse to scroll website view
                  </span>
                </div>
              )}

              {/* Gallery Controls */}
              {hasGallery && project.gallery && project.gallery.length > 1 && (
                <>
                  {/* Arrows */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 p-2.5 rounded-full bg-white/80 hover:bg-white dark:bg-black/60 dark:hover:bg-zinc-800/90 text-zinc-800 dark:text-white transition-all shadow-md border border-zinc-200/50 dark:border-white/5 hover:scale-105 z-20"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 p-2.5 rounded-full bg-white/80 hover:bg-white dark:bg-black/60 dark:hover:bg-zinc-800/90 text-zinc-800 dark:text-white transition-all shadow-md border border-zinc-200/50 dark:border-white/5 hover:scale-105 z-20"
                    aria-label="Next Page"
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* Dots / Pagination */}
                  <div className="absolute bottom-6 flex gap-2 z-20 bg-white/70 dark:bg-black/45 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-200/40 dark:border-white/5">
                    {project.gallery.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          idx === currentImageIndex 
                            ? "bg-violet-500 w-5" 
                            : "bg-zinc-400/50 dark:bg-white/40 hover:bg-zinc-650 dark:hover:bg-white/80"
                        }`}
                        aria-label={`Go to page ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Page Counter Indicator */}
                  <div className="absolute top-6 right-6 bg-white/80 dark:bg-black/60 backdrop-blur-md text-zinc-700 dark:text-white/90 text-[11px] font-mono font-medium px-3 py-1 rounded-full border border-zinc-200/50 dark:border-white/5">
                    Page {currentImageIndex + 1} of {project.gallery.length}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Info Right Area (1/3 width on Desktop) */}
        <div className="md:col-span-1 h-[40vh] md:h-full flex flex-col justify-between bg-zinc-50/30 dark:bg-zinc-950 p-6 md:p-8 overflow-y-auto">
          {/* Top Info */}
          <div className="space-y-6">
            <div className="hidden md:flex justify-between items-center">
              {hasGallery ? (
                <button 
                  onClick={() => setViewMode("grid")} 
                  className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 rounded-lg text-xs font-semibold text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-all border border-zinc-200 dark:border-zinc-800 shadow-sm"
                >
                  <LayoutGrid size={14} /> View All Banners
                </button>
              ) : <div />}
              <button 
                onClick={onClose} 
                className="p-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 rounded-full text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-all border border-zinc-200 dark:border-zinc-800 shadow-sm"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-[9px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 px-2.5 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-tight">
                {project.title}
              </h2>
              {project.role && (
                <p className="text-xs uppercase font-bold tracking-widest text-violet-600 dark:text-violet-400 mt-2">
                  {project.role}
                </p>
              )}
            </div>

            {project.description && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Project Overview</h4>
                <p className="text-sm leading-relaxed text-zinc-650 dark:text-zinc-300">
                  {project.description}
                </p>
              </div>
            )}

            {project.platform && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Built With / Software</h4>
                <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {project.platform}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Footer */}
          {(project.pdfUrl || (project.link && project.link !== "#") || project.videoUrl) && (
            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-900 flex flex-col gap-3">
              {project.pdfUrl && (
                <a 
                  href={project.pdfUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm py-3 px-4 rounded-xl transition-all shadow-md hover:scale-[1.01] active:scale-[0.99]"
                >
                  <FileText size={16} /> View PDF Brochure
                </a>
              )}

              {project.link && project.link !== "#" && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/80 border border-zinc-800 dark:border-zinc-800 text-white font-medium text-sm py-3 px-4 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  Launch Website <ExternalLink size={14} />
                </a>
              )}

              {project.videoUrl && (
                <div className="text-center text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                  {project.videoUrl.includes("youtube.com") || project.videoUrl.includes("vimeo") 
                    ? "Interactive video stream player" 
                    : "Local video player"}
                </div>
              )}
            </div>
          )}
        </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
