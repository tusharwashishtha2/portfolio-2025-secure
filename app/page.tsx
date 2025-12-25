"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Download, Mail, MapPin, X, GraduationCap, Code2, Cpu, ExternalLink, Linkedin, Github } from "lucide-react"
import Link from "next/link"
import LiquidBackground from "../components/LiquidBackground"
import LiquidSVG from "../components/LiquidSVG"
import GalaxyBackground from "../components/GalaxyBackground"
import NeuralToggle from "../components/NeuralToggle"

// --- DATA (Ported from V110 HTML) ---
const SKILLS = [
  { name: "Python", desc: "Scripting & Backend Logic" },
  { name: "JavaScript", desc: "DOM & Interactivity" },
  { name: "HTML5", desc: "Semantic Structure" },
  { name: "CSS3", desc: "Layout & Animation" },
  { name: "Flask", desc: "RESTful APIs" },
  { name: "Streamlit", desc: "Data Apps" },
  { name: "TensorFlow", desc: "Deep Learning" },
  { name: "PyTorch", desc: "Neural Networks" },
  { name: "Generic AI", desc: "Stable Diffusion XL" },
  { name: "GitHub", desc: "Version Control" },
  { name: "Kaggle", desc: "Datasets" },
  { name: "Colab", desc: "Cloud GPU" },
]

const EDUCATION = [
  {
    title: "Bachelor of Technology (IT)",
    meta: "Malwa Institute of Technology // CGPA 6.70",
    desc: "Focused on Data Structures, Algorithms, and System Design. Built a strong theoretical foundation in computer science principles."
  },
  {
    title: "Higher Secondary (12th Science)",
    meta: "Motherland School // 67%",
    desc: "Specialized in Physics and Mathematics, developing analytical problem-solving skills."
  },
  {
    title: "Secondary School (10th)",
    meta: "Little Wonders Convent // 65%",
    desc: "Early foundations in logic and general sciences."
  }
]

const PROJECTS = [
  {
    title: "Bird Species Identification",
    tech: "CNN • RNN • Flask • Streamlit",
    desc: "A multi-modal classification system capable of identifying 450 bird species. The architecture fuses visual data (processed via ResNet50 CNN) with audio spectrograms (processed via RNN) to achieve high-accuracy predictions.",
    key: "Kaggle Datasets, Transfer Learning, Audio-Visual Fusion.",
    img1: "/assets/project_bird_blue.png",
    img2: "/assets/project_bird_dark.png"
  },
  {
    title: "SDXL Text-to-Image Generator",
    tech: "Stable Diffusion XL • Colab GPU • Ngrok",
    desc: "A distributed generative AI pipeline. To bypass local hardware limits, the inference engine runs on a Google Colab T4 GPU. A Flask API is exposed via Ngrok tunneling, consumed by a local Streamlit frontend for real-time image synthesis.",
    key: "Distributed Cloud Compute, Latent Diffusion.",
    img1: "/assets/project_genai_input.png",
    img2: "/assets/project_genai_output.png"
  },
  {
    title: "Bhole Guru (Spiritual E-Commerce)",
    tech: "React.js • Node.js • Cloudinary",
    desc: "A full-stack e-commerce platform for spiritual artifacts. Features a custom admin dashboard for real-time inventory management, authentication, and an optimized checkout flow. Designed with a 'Temple Corridor' aesthetic to match the brand's identity.",
    key: "Online Store, Admin Panel, Secure Login.",
    images: [
      "/assets/bhole_guru_home.png",
      "/assets/bhole_guru_pillars.png",
      "/assets/bhole_guru_about.png",
      "/assets/bhole_guru_shop.png"
    ]
  },
  {
    title: "The Legacy Core (V1)",
    tech: "HTML5 • CSS3 • Vanilla JS",
    desc: "My genesis portfolio built entirely from scratch without frameworks. It demonstrates raw mastery of styling, layout engines, and responsive design principles before I evolved to the Next.js ecosystem. A testament to understanding the fundamentals.",
    key: "Pure CSS Architecture, Hand-coded Animations.",
    img1: "/assets/legacy_home.png",
    img2: "/assets/legacy_projects.png"
  }
]

const CERTS = [
  { img: "/assets/cert_aws.png", label: "AWS CERTIFIED" },
  { img: "/assets/cert_python_skillup.png", label: "PYTHON SKILLUP" },
  { img: "/assets/cert_scaler.png", label: "SCALER ACADEMY" },
  { img: "/assets/cert_udemy.png", label: "PYTHON BOOTCAMP" },
  { img: "/assets/cert_linkedin.png", label: "LINKEDIN SKILL" },
]

// --- COMPONENTS ---

// Glass Card Utility (Dual Mode)
const GlassCard = ({ children, className = "", hover = false, neural = false }: { children: React.ReactNode, className?: string, hover?: boolean, neural?: boolean }) => (
  <div className={`
      backdrop-blur-xl border rounded-2xl p-8
      ${neural
      ? "bg-black/40 border-orange-500/20 shadow-[0_0_15px_rgba(255,128,0,0.1)] text-cyan-50"
      : "bg-white/90 border-black/10 shadow-sm text-slate-900"
    }
      ${hover ? `transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-default group ${neural ? "hover:bg-black/60 hover:shadow-orange-500/20 hover:border-orange-500/60" : "hover:bg-white hover:shadow-black/5"}` : ""}
      ${className}
    `}>
    {children}
  </div>
)

// Section Title (Dual Mode)
const SectionTitle = ({ number, title, neural = false }: { number: string; title: string, neural?: boolean }) => (
  <div className="flex items-baseline gap-4 mb-12">
    <span className={`font-mono text-sm ${neural ? "text-orange-500" : "text-black"}`}>{number}</span>
    <h2 className={`text-4xl md:text-5xl font-bold tracking-tight ${neural ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400" : "text-black border-b-2 border-black pb-2"}`}>
      {title}
    </h2>
  </div>
)

export default function Portfolio() {
  const [modalImg, setModalImg] = useState<string | null>(null)
  const [neuralMode, setNeuralMode] = useState(false) // THE MATRIX SWITCH

  // Persist Neural Mode
  const isMounted = useRef(false)

  useEffect(() => {
    const saved = localStorage.getItem("neuralMode")
    if (saved === "true") setNeuralMode(true)
    isMounted.current = true
  }, [])

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("neuralMode", String(neuralMode))
    }
  }, [neuralMode])

  // Disable scroll when modal open
  useEffect(() => {
    if (modalImg) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [modalImg])

  return (
    <div className={`relative min-h-screen font-sans transition-colors duration-1000 ${neuralMode ? "bg-black text-orange-50 selection:bg-orange-500/30" : "text-slate-900 selection:bg-blue-500/30"}`}>

      {/* 0. THE SWITCH */}
      <NeuralToggle active={neuralMode} toggle={() => setNeuralMode(!neuralMode)} />

      {/* 1. BACKGROUND ENGINE (Swappable) */}
      <AnimatePresence mode="wait">
        {neuralMode ? (
          <motion.div key="quantum" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="fixed inset-0 z-0">
            <GalaxyBackground />
          </motion.div>
        ) : (
          <motion.div key="liquid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="fixed inset-0 z-0">
            <LiquidBackground />
            <div className="fixed inset-0 pointer-events-none z-[1] opacity-0"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. CONTENT DISTORTION ENGINE (Only in Light Mode) */}
      {!neuralMode && <LiquidSVG />}

      {/* 4. MAIN CONTENT */}
      <main
        className="relative z-10 container mx-auto px-6 py-20 flex flex-col gap-32 overflow-x-hidden"
        style={!neuralMode ? { filter: "url(#liquid-warp)" } : {}}
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
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-bold leading-none tracking-tighter break-words">
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${neuralMode ? "from-orange-600 via-white to-orange-600" :
                  "from-slate-900 via-slate-600 to-slate-900"
                  }`}>
                  TUSHAR
                </span>
                <br />
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${neuralMode ? "from-orange-600 via-white to-orange-600" :
                  "from-slate-900 via-slate-600 to-slate-900"
                  }`}>
                  WASHISHTHA
                </span>
              </h1>

              <div className={`h-full border-l-2 pl-6 pr-4 space-y-4 ${neuralMode ? "border-orange-500/50" : "border-blue-600"}`}>
                <p className={`text-lg sm:text-xl font-light ${neuralMode ? "text-orange-200" : "text-slate-600"}`}>
                  Entry-Level Front-End & Python Developer
                </p>
                <p className={`text-lg sm:text-xl font-light ${neuralMode ? "text-blue-200" : "text-slate-600"}`}>
                  Focused on <span className={`font-medium ${neuralMode ? "text-orange-400" : "text-blue-600"}`}>Web Development, AI & Machine Learning</span>
                </p>
                <p className={`text-lg sm:text-xl font-light ${neuralMode ? "text-purple-200" : "text-slate-600"}`}>
                  Ready to Learn and Collaborate
                </p>

                {/* SOCIAL LINKS */}
                <div className="flex gap-4 pt-2">
                  <a
                    href="https://www.linkedin.com/in/tushar-washishtha-a04192305"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-all duration-300 ${neuralMode
                      ? "bg-orange-900/20 text-orange-400 hover:bg-orange-500 hover:text-white border border-orange-500/30"
                      : "bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white"
                      }`}
                  >
                    <Linkedin size={24} />
                  </a>
                  <a
                    href="https://github.com/tusharwashishtha2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-all duration-300 ${neuralMode
                      ? "bg-orange-900/20 text-orange-400 hover:bg-orange-500 hover:text-white border border-orange-500/30"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-900 hover:text-white"
                      }`}
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
                  ${neuralMode
                    ? "bg-orange-950/30 border-orange-500 text-orange-100"
                    : "bg-gradient-to-r from-blue-500/10 to-transparent border-blue-600 text-slate-700"
                  }
                `}
              >
                <p className="text-lg italic leading-relaxed text-justify">
                  “I specialize in building projects using modern <strong className={`not-italic ${neuralMode ? "text-orange-400" : "text-blue-600"}`}>AI-assisted development</strong>,
                  focusing on problem-solving, debugging, and delivering <strong className={`not-italic ${neuralMode ? "text-orange-400" : "text-blue-600"}`}>working solutions</strong> rather than just writing code line-by-line.”
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
          <SectionTitle number="01" title="ABOUT ME" neural={neuralMode} />
          <div className={`text-xl md:text-2xl font-light leading-relaxed space-y-8 text-justify ${neuralMode ? "text-orange-100/80" : "text-slate-600"}`}>
            <p>
              I operate at the intersection of structural engineering and creative logic. My foundation is built on
              <strong className={`font-normal ${neuralMode ? "text-orange-400" : "text-slate-900"}`}> HTML5</strong> and <strong className={`font-normal ${neuralMode ? "text-orange-400" : "text-slate-900"}`}>CSS3</strong>.
              However, I view <strong className={`font-normal ${neuralMode ? "text-orange-400" : "text-slate-900"}`}>JavaScript</strong> as the nervous system—it breathes life into the static grid.
            </p>
            <p>
              Beyond the browser, my thinking is powered by <strong className={`font-normal ${neuralMode ? "text-orange-400" : "text-slate-900"}`}>Python</strong>.
              I use it to solve challenges, architect backends with <strong className={`font-normal ${neuralMode ? "text-orange-400" : "text-slate-900"}`}>Flask</strong>, and experiment with
              <strong className={`font-normal ${neuralMode ? "text-orange-400" : "text-slate-900"}`}> AI & Machine Learning</strong>.
            </p>
            <p>
              I am a builder by nature. My philosophy is simple: learn by doing, break things to understand them, and write code that is clean and functional.
            </p>
          </div>
        </section>

        {/* EDUCATION */}
        <section>
          <SectionTitle number="02" title="EDUCATION TIMELINE" neural={neuralMode} />
          <div className={`max-w-3xl border-l ml-4 pl-12 space-y-16 ${neuralMode ? "border-orange-900" : "border-slate-300"}`}>
            {EDUCATION.map((ed, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className={`absolute -left-[53px] top-2 w-5 h-5 rounded-full border-2 ${neuralMode ? "bg-black border-orange-500 shadow-[0_0_10px_#f97316]" : "bg-white border-blue-500 shadow-[0_0_10px_#3b82f6]"}`}></div>
                <GlassCard hover neural={neuralMode}>
                  <h3 className="text-2xl font-bold mb-1">{ed.title}</h3>
                  <span className={`block mb-4 font-mono text-sm ${neuralMode ? "text-orange-400" : "text-blue-600"}`}>{ed.meta}</span>
                  <p className={`text-justify ${neuralMode ? "text-orange-100/70" : "text-slate-600"}`}>{ed.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section>
          <SectionTitle number="03" title="TECHNICAL ARSENAL" neural={neuralMode} />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {SKILLS.map((skill, i) => (
              <GlassCard key={i} className="p-6 text-center" hover neural={neuralMode}>
                <h4 className="font-bold text-lg mb-1">{skill.name}</h4>
                <p className={`text-xs uppercase tracking-wider ${neuralMode ? "text-orange-200/50" : "text-slate-500"}`}>{skill.desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section>
          <SectionTitle number="04" title="FEATURED PROJECTS" neural={neuralMode} />
          <div className="space-y-32">
            {PROJECTS.map((proj, i) => (
              <div key={i} className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="grid grid-cols-2 gap-4">
                  {(proj.images || [proj.img1, proj.img2]).map((img, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className={`rounded-xl overflow-hidden cursor-pointer shadow-lg ${neuralMode ? "shadow-orange-500/20 border-orange-500/30 border" : "shadow-blue-500/20"}`}
                      onClick={() => setModalImg(img)}
                    >
                      <img src={img} alt="Project" className="w-full h-auto object-cover" />
                    </motion.div>
                  ))}
                </div>
                <GlassCard neural={neuralMode}>
                  <h3 className="text-3xl font-bold mb-4">{proj.title}</h3>
                  <p className={`font-mono text-xs uppercase tracking-widest mb-6 ${neuralMode ? "text-orange-400" : "text-blue-600"}`}>{proj.tech}</p>
                  <p className={`mb-6 leading-relaxed text-justify ${neuralMode ? "text-orange-100/70" : "text-slate-600"}`}>{proj.desc}</p>
                  <div className={`border-t pt-4 ${neuralMode ? "border-orange-900" : "border-slate-200"}`}>
                    <p className={`text-sm ${neuralMode ? "text-orange-200/50" : "text-slate-500"}`}><strong className={neuralMode ? "text-orange-100" : "text-slate-900"}>Key Tech:</strong> {proj.key}</p>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </section>

        {/* CERTS */}
        <section>
          <SectionTitle number="05" title="CERTIFICATIONS" neural={neuralMode} />
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {CERTS.map((cert, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border shadow-sm hover:shadow-md group ${neuralMode ? "border-orange-900 bg-black/40 shadow-orange-500/10" : "border-slate-200"}`}
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
          <SectionTitle number="06" title="WORKFLOW & TOOLS" neural={neuralMode} />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "VS Code", desc: "My primary IDE. Configured with Pylint, Prettier, and GitLens." },
              { title: "GitHub", desc: "Version control is non-negotiable. Feature branches and clean history." },
              { title: "Google Colab", desc: "My cloud laboratory. Essential for training deep learning models." }
            ].map((t, i) => (
              <GlassCard key={i} className="" hover neural={neuralMode}>
                <h3 className="text-xl font-bold mb-2">{t.title}</h3>
                <p className={`text-sm ${neuralMode ? "text-orange-100/60" : "text-slate-500"}`}>{t.desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="flex justify-center pb-20">
          <GlassCard className="max-w-2xl w-full text-center py-16 flex flex-col items-center" neural={neuralMode}>
            <h2 className="text-4xl font-light mb-12">LETS COLLABORATE</h2>

            <div className="space-y-8 mb-12 w-full flex flex-col items-center">
              <div className="flex flex-col items-center">
                <p className={`text-xs tracking-[0.2em] mb-2 ${neuralMode ? "text-orange-500" : "text-slate-500"}`}>EMAIL</p>
                <a href="mailto:tusharwashishtha2@gmail.com" className={`text-xl md:text-4xl transition-colors break-all text-center ${neuralMode ? "hover:text-orange-400" : "hover:text-blue-600"}`}>
                  tusharwashishtha2@gmail.com
                </a>
              </div>
              <div className="flex flex-col items-center">
                <p className={`text-xs tracking-[0.2em] mb-2 ${neuralMode ? "text-orange-500" : "text-slate-500"}`}>LOCATION</p>
                <span className="text-2xl text-center">Indore, India</span>
              </div>
            </div>

            <a
              href="/assets/Tushar_Resume.pdf?v=final_fix"
              download="Tushar_Resume.pdf"
              className={`inline-flex items-center gap-2 border px-8 py-4 rounded-full transition-all duration-300 font-bold tracking-widest text-sm ${neuralMode ? "border-orange-500/50 hover:bg-orange-500 hover:text-black" : "border-slate-300 hover:bg-slate-900 hover:text-white"}`}
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
    </div>
  )
}
