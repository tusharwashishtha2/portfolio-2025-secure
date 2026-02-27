"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Download, Mail, MapPin, X, GraduationCap, Code2, Cpu, ExternalLink, Linkedin, Github } from "lucide-react"
import Link from "next/link"
import GalaxyBackground from "../components/GalaxyBackground"
import VisionBackground from "../components/VisionBackground"
import NeuralBackground from "../components/NeuralBackground"
import AiBackground from "../components/AiBackground"
import NeuralThemeContent from "../components/NeuralThemeContent"
import AiThemeContent from "../components/AiThemeContent"
import ProofBackground from '../components/ProofBackground'
import ProofThemeContent from '../components/ProofThemeContent'
import LespBackground from "@/components/LespBackground"
import LespThemeContent from "@/components/LespThemeContent"
import GodBackground from "@/components/GodBackground"
import GodThemeContent from "@/components/GodThemeContent"
import AliveBackground from "@/components/AliveBackground"
import AliveThemeContent from "@/components/AliveThemeContent"
import PaperBackground from "@/components/PaperBackground"
import PaperThemeContent from "@/components/PaperThemeContent"
import HiddenBackground from "@/components/HiddenBackground"
import HiddenThemeContent from "@/components/HiddenThemeContent"
import ProgressionBackground from "@/components/ProgressionBackground"
import ProgressionThemeContent from "@/components/ProgressionThemeContent"
import NeuralToggle from "../components/NeuralToggle"
import { handleResumeDownload } from "@/lib/utils"

// --- DATA (Imported from lib/data) ---
import { SKILLS, EDUCATION, PROJECTS, CERTS } from "@/lib/data"

// --- COMPONENTS ---

// Glass Card Utility (Dual Mode)
const GlassCard = ({ children, className = "", hover = false, themeConfig }: { children: React.ReactNode, className?: string, hover?: boolean, themeConfig?: any }) => (
  <div className={`
      backdrop-blur-xl border rounded-2xl p-8
      ${themeConfig?.cardBg || "bg-white/90 border-black/10 shadow-sm text-slate-900"}
      ${hover ? `transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-default group ${themeConfig?.cardHover || "hover:bg-white hover:shadow-black/5"}` : className}
    `}>
    {children}
  </div>
)

// Section Title (Dual Mode)
const SectionTitle = ({ number, title, neural = false, themeConfig }: { number: string; title: string, neural?: boolean, themeConfig?: any }) => (
  <div className="flex items-baseline gap-4 mb-12">
    <span className={`font-mono text-sm ${themeConfig?.primaryText || (neural ? "text-orange-500" : "text-black")}`}>{number}</span>
    <h2 className={`text-4xl md:text-5xl font-bold tracking-tight ${themeConfig?.titleText || (neural ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400" : "text-black border-b-2 border-black pb-2")}`}>
      {title}
    </h2>
  </div>
)

const THEMES: Record<string, any> = {
  vision: {
    name: "Default",
    bg: "bg-[#f5f5f7] text-[#1d1d1f] selection:bg-[#0071e3]/30",
    primaryText: "text-[#0071e3]",
    border: "border-[#d2d2d7]",
    cardBg: "bg-white/60 backdrop-blur-2xl border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)] text-[#1d1d1f]",
    cardHover: "hover:bg-white/80 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]",
    titleText: "text-transparent bg-clip-text bg-gradient-to-r from-[#1d1d1f] to-[#86868b]",
    metaText: "text-[#86868b]",
    nameGradient: "from-[#1d1d1f] via-[#424245] to-[#1d1d1f]",
    socialBtn: "bg-white/80 backdrop-blur-xl text-[#1d1d1f] hover:bg-[#0071e3] hover:text-white shadow-sm border border-white/50",
    socialBtnGit: "bg-white/80 backdrop-blur-xl text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white shadow-sm border border-white/50",
    plaque: "bg-white/70 backdrop-blur-2xl border-[#0071e3] text-[#1d1d1f] shadow-lg border-l-[3px]",
    timelineDot: "bg-[#f5f5f7] border-[#0071e3] shadow-[0_0_8px_rgba(0,113,227,0.4)]",
    timelineBorder: "border-[#d2d2d7]",
    certCard: "bg-white/50 backdrop-blur-xl border-white/50 shadow-sm",
    resumeBtn: "bg-[#0071e3] text-white hover:bg-[#0077ED] border-transparent shadow-md hover:shadow-lg",
    emailLink: "hover:text-[#0071e3]",
    projectImageHover: "shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-white/50 border",
    projectTech: "text-[#0071e3]"
  },
  god: {
    name: "Cursor Tracker",
    bg: "bg-[#02040a] text-cyan-50 selection:bg-cyan-500/30",
  },
  galaxy: {
    name: "Galaxy background",
    bg: "bg-black text-orange-50 selection:bg-orange-500/30",
    primaryText: "text-orange-400",
    border: "border-orange-500",
    cardBg: "bg-black/40 border-orange-500/20 shadow-[0_0_15px_rgba(255,128,0,0.1)] text-cyan-50",
    cardHover: "hover:bg-black/60 hover:shadow-orange-500/20 hover:border-orange-500/60",
    titleText: "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400",
    metaText: "text-orange-100/70",
    nameGradient: "from-orange-600 via-white to-orange-600",
    socialBtn: "bg-orange-900/20 text-orange-400 hover:bg-orange-500 hover:text-white border border-orange-500/30",
    socialBtnGit: "bg-orange-900/20 text-orange-400 hover:bg-orange-500 hover:text-white border border-orange-500/30",
    plaque: "bg-orange-950/30 border-orange-500 text-orange-100",
    timelineDot: "bg-black border-orange-500 shadow-[0_0_10px_#f97316]",
    timelineBorder: "border-orange-900",
    certCard: "border-orange-900 bg-black/40 shadow-orange-500/10",
    resumeBtn: "border-orange-500/50 hover:bg-orange-500 hover:text-black",
    emailLink: "hover:text-orange-400",
    projectImageHover: "shadow-orange-500/20 border-orange-500/30 border",
    projectTech: "text-orange-400"
  },
  neural: {
    name: "Interconnected Nodes",
    bg: "bg-[#050008] text-[#e0aaff] selection:bg-[#9d4edd]/30",
    primaryText: "text-[#e0aaff]",
    border: "border-[#9d4edd]",
    cardBg: "bg-black/40 backdrop-blur-2xl border-[#3b1252]/50 text-[#e2d5ec]",
    cardHover: "hover:bg-[#1a0524]/60 hover:shadow-[0_0_40px_rgba(157,78,221,0.2)]",
    titleText: "text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c8b6ff]",
    metaText: "text-[#d8bbff]",
    nameGradient: "from-white via-[#e0c3fc] to-[#712b9c]",
    socialBtn: "bg-black/50 border-[#9d4edd]/50 hover:bg-[#9d4edd] hover:text-white",
    socialBtnGit: "bg-black/50 border-[#9d4edd]/50 hover:bg-white hover:text-black",
    plaque: "bg-gradient-to-r from-[#9d4edd]/10 to-transparent border-[#9d4edd] text-[#e0aaff]",
    timelineDot: "bg-black border-[#9d4edd] shadow-[0_0_15px_rgba(157,78,221,0.5)]",
    timelineBorder: "border-[#3b1252]",
    certCard: "bg-black/40 border-[#3b1252]",
    resumeBtn: "border-[#9d4edd] text-[#e0aaff] hover:border-white hover:text-white",
    emailLink: "hover:text-white",
    projectImageHover: "shadow-[0_0_40px_rgba(157,78,221,0.2)]",
    projectTech: "text-[#e0aaff]"
  },
  ai: {
    name: "Dashboard Panels",
    bg: "bg-[#0a0a0c] text-slate-300 selection:bg-[#06b6d4]/30",
    primaryText: "text-white",
    border: "border-white/10",
    cardBg: "bg-white/5 backdrop-blur-xl border-white/10 text-slate-300",
    cardHover: "hover:bg-white/10 hover:border-[#06b6d4]/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    titleText: "text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400",
    metaText: "text-[#06b6d4]",
    nameGradient: "from-white via-slate-300 to-slate-500",
    socialBtn: "bg-white/5 border-white/10 text-slate-400 hover:bg-[#06b6d4]/10 hover:text-[#06b6d4] hover:border-[#06b6d4]/50",
    socialBtnGit: "bg-white/5 border-white/10 text-slate-400 hover:bg-[#06b6d4]/10 hover:text-[#06b6d4] hover:border-[#06b6d4]/50",
    plaque: "bg-black/50 border-emerald-500/30 text-emerald-400",
    timelineDot: "bg-[#0a0a0c] border-[#06b6d4] shadow-[0_0_15px_rgba(6,182,212,0.2)]",
    timelineBorder: "border-white/10",
    certCard: "border-white/10",
    resumeBtn: "border-[#06b6d4]/50 text-[#06b6d4] hover:bg-[#06b6d4]/10 hover:border-[#06b6d4]",
    emailLink: "hover:text-[#06b6d4]",
    projectImageHover: "shadow-[0_0_30px_rgba(6,182,212,0.2)] border-[#06b6d4]/30",
    projectTech: "text-[#06b6d4]"
  },
  proof: {
    name: "Hacker Mode",
    bg: "bg-[#030504] text-[#8fa094] selection:bg-[#2bff6b]/30",
    primaryText: "text-[#e1f0e5]",
    border: "border-[#2bff6b]/20",
    cardBg: "bg-[#050a07]/80 backdrop-blur-md border border-[#2bff6b]/20 text-[#8fa094]",
    cardHover: "hover:bg-[#0a140d]/80 hover:border-[#2bff6b]/60 hover:shadow-[0_0_20px_rgba(43,255,107,0.1)]",
    titleText: "text-[#e1f0e5] font-mono",
    metaText: "text-[#2bff6b]",
    nameGradient: "from-[#e1f0e5] to-[#8fa094]",
    socialBtn: "bg-transparent border-[#2bff6b]/40 text-[#2bff6b] hover:bg-[#2bff6b]/10",
    socialBtnGit: "bg-transparent border-[#2bff6b]/40 text-[#2bff6b] hover:bg-[#2bff6b]/10",
    plaque: "bg-black border-[#2bff6b]/50 text-[#2bff6b]",
    timelineDot: "bg-[#030504] border-[#2bff6b] shadow-[0_0_10px_rgba(43,255,107,0.4)]",
    timelineBorder: "border-[#2bff6b]/20",
    certCard: "border-[#2bff6b]/20",
    resumeBtn: "border-[#2bff6b] text-[#2bff6b] hover:bg-[#2bff6b] hover:text-black",
    emailLink: "hover:text-[#2bff6b]",
    projectImageHover: "shadow-[0_0_30px_rgba(43,255,107,0.2)] border-[#2bff6b]/50",
    projectTech: "text-[#2bff6b]"
  },

  lesp: {
    name: "Scanning lines",
    bg: "bg-[#020202] text-[#a3a3a3] selection:bg-white/20",
    primaryText: "text-white",
    border: "border-white/10",
    cardBg: "bg-black/40 border border-white/10 text-[#a3a3a3]",
    cardHover: "hover:bg-black/80 hover:border-white/40 shadow-none",
    titleText: "text-white font-mono uppercase tracking-[0.4em]",
    metaText: "text-[#888888]",
    nameGradient: "from-white to-[#333333]",
    socialBtn: "bg-transparent border-white/20 text-[#888888] hover:text-white hover:border-white",
    socialBtnGit: "bg-transparent border-white/20 text-[#888888] hover:text-white hover:border-white",
    plaque: "bg-black border-white/20 text-[#a3a3a3]",
    timelineDot: "bg-[#020202] border-white shadow-none",
    timelineBorder: "border-white/10",
    certCard: "border-white/10",
    resumeBtn: "border-white text-white hover:bg-white hover:text-black",
    emailLink: "hover:text-[#b3b3b3]",
    projectImageHover: "border-white/30 blur-0",
    projectTech: "text-white"
  },
  alive: {
    name: "System",
    bg: "bg-black text-cyan-50 selection:bg-cyan-500/30"
  },
  paper: {
    name: "Paper drawing",
    bg: "bg-[#F4EFE6] text-slate-800 selection:bg-slate-800/20"
  },
  hidden: {
    name: "Flash light",
    bg: "bg-[#030303] text-slate-400 selection:bg-white/10"
  },
  progression: {
    name: "Unlock levels",
    bg: "bg-[#020617] text-slate-300 selection:bg-cyan-900/50 selection:text-cyan-100"
  }
}

export default function Portfolio() {
  const [modalImg, setModalImg] = useState<string | null>(null)
  const [themeName, setThemeName] = useState("vision")

  const isMounted = useRef(false)
  const themeKeys = Object.keys(THEMES)
  const themeConfig = THEMES[themeName]

  // Persist Theme Mode
  useEffect(() => {
    isMounted.current = true
  }, [])

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("portfolioTheme", themeName)
    }
  }, [themeName])

  // Disable scroll when modal open
  useEffect(() => {
    if (modalImg) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [modalImg])

  const toggleTheme = () => {
    const currentIndex = themeKeys.indexOf(themeName)
    const nextIndex = (currentIndex + 1) % themeKeys.length
    setThemeName(themeKeys[nextIndex])
  }

  return (
    <div className={`relative min-h-screen font-sans transition-colors duration-1000 ${themeConfig?.bg || THEMES.vision.bg}`}>

      {/* 0. THE SWITCH */}
      <NeuralToggle
        currentThemeId={themeName}
        currentThemeName={themeConfig?.name}
        themes={Object.entries(THEMES).map(([id, config]) => ({ id, name: config.name }))}
        setTheme={(id: string) => setThemeName(id)}
      />

      {/* 1. BACKGROUND ENGINE (Swappable) */}
      <AnimatePresence mode="wait">
        {themeName === "galaxy" ? (
          <motion.div key="galaxy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="fixed inset-0 z-0 bg-black">
            <GalaxyBackground />
          </motion.div>
        ) : themeName === "vision" ? (
          <motion.div key="vision" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="fixed inset-0 z-0">
            <VisionBackground />
          </motion.div>
        ) : themeName === "neural" ? (
          <motion.div key="neural" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="fixed inset-0 z-0 bg-[#050008]">
            <NeuralBackground />
          </motion.div>
        ) : themeName === "ai" ? (
          <motion.div key="ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="fixed inset-0 z-0 bg-[#0a0a0c]">
            <AiBackground />
          </motion.div>
        ) : themeName === "proof" ? (
          <motion.div key="proof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="fixed inset-0 z-0 bg-[#030504]">
            <ProofBackground />
          </motion.div>
        ) : themeName === "lesp" ? (
          <motion.div key="lesp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="fixed inset-0 z-0 bg-[#020202]">
            <LespBackground />
          </motion.div>
        ) : themeName === "god" ? (
          <motion.div key="god" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="fixed inset-0 z-0 bg-[#02040a]">
            <GodBackground />
          </motion.div>
        ) : themeName === "alive" ? (
          <motion.div key="alive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="fixed inset-0 z-0 bg-black">
            <AliveBackground />
          </motion.div>
        ) : themeName === "paper" ? (
          <motion.div key="paper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="fixed inset-0 z-0 bg-[#F4EFE6]">
            <PaperBackground />
          </motion.div>
        ) : themeName === "hidden" ? (
          <motion.div key="hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="fixed inset-0 z-0 bg-[#030303]">
            <HiddenBackground />
          </motion.div>
        ) : themeName === "progression" ? (
          <motion.div key="progression" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="fixed inset-0 z-0 bg-[#020617]">
            <ProgressionBackground />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* 4. MAIN CONTENT */}
      {themeName === "ai" ? (
        <AiThemeContent />
      ) : themeName === "neural" ? (
        <NeuralThemeContent />
      ) : themeName === "proof" ? (
        <ProofThemeContent />
      ) : themeName === "lesp" ? (
        <LespThemeContent />
      ) : themeName === "god" ? (
        <GodThemeContent />
      ) : themeName === "alive" ? (
        <AliveThemeContent />
      ) : themeName === "paper" ? (
        <PaperThemeContent />
      ) : themeName === "hidden" ? (
        <HiddenThemeContent />
      ) : themeName === "progression" ? (
        <ProgressionThemeContent />
      ) : (
        <>
          <main
            className="relative z-10 container mx-auto px-6 py-20 flex flex-col gap-32 overflow-x-hidden"
          >

            {/* HERO */}
            <section className="min-h-[90vh] flex items-center">
              <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

                {/* TEXT CONTENT (Order 2 on Mobile, Order 1 on Desktop) */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="space-y-8 order-2 lg:order-1"
                >
                  <h1 className="text-4xl sm:text-7xl xl:text-8xl font-bold leading-none tracking-tighter break-words">
                    <span className={`bg-clip-text text-transparent bg-gradient-to-r ${themeConfig?.nameGradient || "from-slate-900 via-slate-600 to-slate-900"}`}>
                      TUSHAR
                    </span>
                    <br />
                    <span className={`bg-clip-text text-transparent bg-gradient-to-r ${themeConfig?.nameGradient || "from-slate-900 via-slate-600 to-slate-900"}`}>
                      WASHISHTHA
                    </span>
                  </h1>

                  <div className={`h-full border-l-2 pl-6 pr-4 space-y-4 border-blue-600 ${themeConfig?.timelineBorder ? `border-${themeConfig.timelineBorder.replace('border-', '')}/50` : 'border-blue-600'}`}>
                    <p className={`text-lg sm:text-xl font-light ${themeConfig?.metaText || "text-slate-600"}`}>
                      Entry-Level Front-End & Python Developer
                    </p>
                    <p className={`text-lg sm:text-xl font-light ${themeConfig?.metaText || "text-slate-600"}`}>
                      Focused on <span className={`font-medium ${themeConfig?.primaryText || "text-blue-600"}`}>Web Development, AI & Machine Learning</span>
                    </p>
                    <p className={`text-lg sm:text-xl font-light ${themeConfig?.metaText || "text-slate-600"}`}>
                      Ready to Learn and Collaborate
                    </p>

                    {/* SOCIAL LINKS */}
                    <div className="flex gap-4 pt-2">
                      <a
                        href="https://www.linkedin.com/in/tushar-washishtha-a04192305"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-full transition-all duration-300 ${themeConfig?.socialBtn || "bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white"}`}
                      >
                        <Linkedin size={24} />
                      </a>
                      <a
                        href="https://github.com/tusharwashishtha2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-full transition-all duration-300 ${themeConfig?.socialBtnGit || "bg-slate-100 text-slate-700 hover:bg-slate-900 hover:text-white"}`}
                      >
                        <Github size={24} />
                      </a>
                    </div>
                  </div>

                  {/* AI HIGHLIGHT (Glass Plaque) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className={`
                  border-l-4 p-6 rounded-r-lg backdrop-blur-md max-w-2xl
                  ${themeConfig?.plaque || "bg-gradient-to-r from-blue-500/10 to-transparent border-blue-600 text-slate-700"}
                `}
                  >
                    <p className="text-lg italic leading-relaxed text-justify">
                      “I specialize in building projects using modern <strong className={`not-italic ${themeConfig?.primaryText || "text-blue-600"}`}>AI-assisted development</strong>,
                      focusing on problem-solving, debugging, and delivering <strong className={`not-italic ${themeConfig?.primaryText || "text-blue-600"}`}>working solutions</strong> rather than just writing code line-by-line.”
                    </p>
                  </motion.div>

                  {/* COUNTERS */}
                  <div className="flex flex-nowrap justify-center gap-2 sm:gap-6 pt-8 w-full">
                    {[
                      { n: "4", l: "Major Projects" },
                      { n: "5", l: "Certifications" },
                      { n: "15+", l: "Technologies" }
                    ].map((c, i) => (
                      <div key={i} className="flex-1 text-center">
                        <span className="block text-3xl sm:text-4xl font-bold">{c.n}</span>
                        <span className="text-[10px] sm:text-sm text-slate-500 uppercase tracking-wider sm:tracking-widest whitespace-nowrap">{c.l}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* PROFILE CARD (Order 1 on Mobile, Order 2 on Desktop) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center lg:justify-end order-1 lg:order-2"
                >
                  <div className="relative w-72 h-72 md:w-96 md:h-[32rem] lg:-mt-16 lg:mr-16 rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/20 group">
                    <img src="/assets/tushar_photo.jpg" alt="Profile" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* ABOUT */}
            <section>
              <SectionTitle number="01" title="ABOUT ME" themeConfig={themeConfig} />
              <div className={`text-xl md:text-2xl font-light leading-relaxed space-y-8 text-justify ${themeConfig?.metaText || "text-slate-600"}`}>
                <p>
                  I operate at the intersection of structural engineering and creative logic. My foundation is built on
                  <strong className={`font-normal ${themeConfig?.primaryText || "text-slate-900"}`}> HTML5</strong> and <strong className={`font-normal ${themeConfig?.primaryText || "text-slate-900"}`}>CSS3</strong>.
                  However, I view <strong className={`font-normal ${themeConfig?.primaryText || "text-slate-900"}`}>JavaScript</strong> as the nervous system—it breathes life into the static grid.
                </p>
                <p>
                  Beyond the browser, my thinking is powered by <strong className={`font-normal ${themeConfig?.primaryText || "text-slate-900"}`}>Python</strong>.
                  I use it to solve challenges, architect backends with <strong className={`font-normal ${themeConfig?.primaryText || "text-slate-900"}`}>Flask</strong>, and experiment with
                  <strong className={`font-normal ${themeConfig?.primaryText || "text-slate-900"}`}> AI & Machine Learning</strong>.
                </p>
                <p>
                  I am a builder by nature. My philosophy is simple: learn by doing, break things to understand them, and write code that is clean and functional.
                </p>
              </div>
            </section>

            {/* EDUCATION */}
            <section>
              <SectionTitle number="02" title="EDUCATION TIMELINE" themeConfig={themeConfig} />
              <div className={`max-w-3xl border-l ml-4 pl-12 space-y-16 ${themeConfig?.timelineBorder || "border-slate-300"}`}>
                {EDUCATION.map((ed, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className={`absolute -left-[53px] top-2 w-5 h-5 rounded-full border-2 ${themeConfig?.timelineDot || "bg-white border-blue-500 shadow-[0_0_10px_#3b82f6]"}`}></div>
                    <GlassCard hover themeConfig={themeConfig}>
                      <h3 className="text-2xl font-bold mb-1">{ed.title}</h3>
                      <span className={`block mb-4 font-mono text-sm ${themeConfig?.primaryText || "text-blue-600"}`}>{ed.meta}</span>
                      <p className={`text-justify ${themeConfig?.metaText || "text-slate-600"}`}>{ed.desc}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* SKILLS */}
            <section>
              <SectionTitle number="03" title="TECHNICAL ARSENAL" themeConfig={themeConfig} />
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {SKILLS.map((skill, i) => (
                  <GlassCard key={i} className="p-6 text-center" hover themeConfig={themeConfig}>
                    <h4 className="font-bold text-lg mb-1">{skill.name}</h4>
                    <p className={`text-xs uppercase tracking-wider ${themeConfig?.metaText || "text-slate-500"}`}>{skill.desc}</p>
                  </GlassCard>
                ))}
              </div>
            </section>

            {/* PROJECTS */}
            <section>
              <SectionTitle number="04" title="FEATURED PROJECTS" themeConfig={themeConfig} />
              <div className="space-y-32">
                {PROJECTS.map((proj, i) => (
                  <div key={i} className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="grid grid-cols-2 gap-4">
                      {(proj.images || [proj.img1, proj.img2]).map((img, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          className={`rounded-xl overflow-hidden cursor-pointer shadow-lg ${themeConfig?.projectImageHover || "shadow-blue-500/20"}`}
                          onClick={() => setModalImg(img)}
                        >
                          <img src={img} alt="Project" className="w-full h-auto object-cover" />
                        </motion.div>
                      ))}
                    </div>
                    <GlassCard themeConfig={themeConfig}>
                      <h3 className="text-3xl font-bold mb-4">{proj.title}</h3>
                      <p className={`font-mono text-xs uppercase tracking-widest mb-6 ${themeConfig?.projectTech || "text-blue-600"}`}>{proj.tech}</p>
                      <p className={`mb-6 leading-relaxed text-justify ${themeConfig?.metaText || "text-slate-600"}`}>{proj.desc}</p>
                      <div className={`border-t pt-4 ${themeConfig?.timelineBorder || "border-slate-200"}`}>
                        <p className={`text-sm ${themeConfig?.metaText || "text-slate-500"}`}><strong className={themeConfig?.primaryText ? `text-${themeConfig.primaryText.split('-')[1]}-100` : "text-slate-900"}>Key Tech:</strong> {proj.key}</p>
                      </div>
                    </GlassCard>
                  </div>
                ))}
              </div>
            </section>

            {/* CERTS */}
            <section>
              <SectionTitle number="05" title="CERTIFICATIONS" themeConfig={themeConfig} />
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                {CERTS.map((cert, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border shadow-sm hover:shadow-md group ${themeConfig?.certCard || "border-slate-200"}`}
                    onClick={() => setModalImg(cert.img)}
                  >
                    <img src={cert.img} alt={cert.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs font-bold tracking-widest text-white">{cert.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* TOOLS */}
            <section>
              <SectionTitle number="06" title="WORKFLOW & TOOLS" themeConfig={themeConfig} />
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: "VS Code", desc: "My primary IDE. Configured with Pylint, Prettier, and GitLens." },
                  { title: "GitHub", desc: "Version control is non-negotiable. Feature branches and clean history." },
                  { title: "Google Colab", desc: "My cloud laboratory. Essential for training deep learning models." }
                ].map((t, i) => (
                  <GlassCard key={i} className="" hover themeConfig={themeConfig}>
                    <h3 className="text-xl font-bold mb-2">{t.title}</h3>
                    <p className={`text-sm ${themeConfig?.metaText || "text-slate-500"}`}>{t.desc}</p>
                  </GlassCard>
                ))}
              </div>
            </section>

            {/* CONTACT */}
            <section className="flex justify-center pb-20">
              <GlassCard className="max-w-2xl w-full text-center py-16 flex flex-col items-center" themeConfig={themeConfig}>
                <h2 className="text-4xl font-light mb-12">LETS COLLABORATE</h2>

                <div className="space-y-8 mb-12 w-full flex flex-col items-center">
                  <div className="flex flex-col items-center">
                    <p className={`text-xs tracking-[0.2em] mb-2 ${themeConfig?.primaryText || "text-slate-500"}`}>EMAIL</p>
                    <a href="mailto:tusharwashishtha2@gmail.com" className={`text-xl md:text-4xl transition-colors break-all text-center ${themeConfig?.emailLink || "hover:text-blue-600"}`}>
                      tusharwashishtha2@gmail.com
                    </a>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className={`text-xs tracking-[0.2em] mb-2 ${themeConfig?.primaryText || "text-slate-500"}`}>LOCATION</p>
                    <span className="text-2xl text-center">Indore, India</span>
                  </div>
                </div>

                <a
                  href="/assets/Tushar_Washishtha_Resume_Fixed.pdf"
                  download="Tushar_Washishtha_Resume_Fixed.pdf"
                  onClick={handleResumeDownload}
                  className={`inline-flex items-center gap-2 border px-8 py-4 rounded-full transition-all duration-300 font-bold tracking-widest text-sm ${themeConfig?.resumeBtn || "border-slate-300 hover:bg-slate-900 hover:text-white"}`}
                >
                  <Download size={18} /> DOWNLOAD RESUME PDF
                </a>
              </GlassCard>
            </section>
          </main>

          {/* MODAL */}
          <AnimatePresence>
            {modalImg && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                onClick={() => setModalImg(null)}
              >
                <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                  <X size={48} />
                </button>
                <motion.img
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  src={modalImg}
                  className="max-w-full max-h-[90vh] rounded shadow-2xl shadow-blue-500/10"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}
