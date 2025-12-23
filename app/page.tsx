"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Download, Mail, MapPin, X, GraduationCap, Code2, Cpu, ExternalLink } from "lucide-react"
import LiquidBackground from "../components/LiquidBackground"
import LiquidSVG from "../components/LiquidSVG"

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

// Glass Card Utility (High Contrast Light Mode)
function GlassCard({ children, className = "", hover = false }: { children: React.ReactNode, className?: string, hover?: boolean }) {
  return (
    <div className={`
      relative overflow-hidden
      bg-white/90 backdrop-blur-xl border border-black/10 rounded-2xl p-8 shadow-sm
      ${hover ? "transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-2xl hover:shadow-black/5 group cursor-default" : ""}
      ${className}
    `}>
      {children}
    </div>
  )
}

// Section Title (High Contrast)
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-4xl md:text-5xl font-light text-black mb-16 tracking-tight border-b border-black/10 pb-4 inline-block">
      {children}
    </h2>
  )
}

export default function Portfolio() {
  const [modalImg, setModalImg] = useState<string | null>(null)

  // Disable scroll when modal open
  useEffect(() => {
    if (modalImg) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [modalImg])

  return (
    <div className="relative min-h-screen text-slate-900 font-sans selection:bg-blue-500/30">

      {/* 1. THE LIQUID ENGINE (Background) */}
      <LiquidBackground />

      {/* 2. ATMOSPHERE OVERLAY (REMOVED FOR DEBUGGING/VISIBILITY) */}
      {/* <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-radial-[circle_at_center_transparent_0%_rgba(5,8,16,0.4)_100%]"></div>
      </div> */}

      {/* 3. CONTENT DISTORTION ENGINE */}
      <LiquidSVG />

      {/* 4. MAIN CONTENT (With Liquid Filter Applied) */}
      <main
        className="relative z-10 container mx-auto px-6 py-20 flex flex-col gap-32"
        style={{ filter: "url(#liquid-warp)" }}
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
              <h1 className="text-7xl md:text-9xl font-bold leading-none tracking-tighter">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900 animate-pulse">
                  TUSHAR
                </span>
                <br />
                WASHISHTHA
              </h1>

              <div className="border-l-2 border-blue-600 pl-6 space-y-2 text-slate-600 text-lg">
                <p>Entry-Level Front-End & Python Developer</p>
                <p className="text-blue-600">Focused on Web Development, AI & Machine Learning</p>
                <p>Ready to Learn and Collaborate</p>
              </div>

              {/* AI HIGHLIGHT (Glass Plaque) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="bg-gradient-to-r from-blue-500/10 to-transparent border-l-4 border-blue-600 p-6 rounded-r-lg backdrop-blur-md max-w-2xl"
              >
                <p className="text-lg text-slate-700 italic leading-relaxed text-justify">
                  “I specialize in building projects using modern <strong className="text-blue-600 not-italic">AI-assisted development</strong>,
                  focusing on problem-solving, debugging, and delivering <strong className="text-blue-600 not-italic">working solutions</strong> rather than just writing code line-by-line.”
                </p>
              </motion.div>

              {/* COUNTERS */}
              <div className="flex gap-12 pt-8">
                {[
                  { n: "2", l: "Major Projects" },
                  { n: "5", l: "Certifications" },
                  { n: "12", l: "Technologies" }
                ].map((c, i) => (
                  <div key={i}>
                    <span className="block text-4xl font-bold">{c.n}</span>
                    <span className="text-sm text-slate-500 uppercase tracking-widest">{c.l}</span>
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
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/20 group">
                <img src="/assets/tushar_photo.jpg" alt="Profile" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT */}
        <section>
          <SectionTitle>ABOUT ME</SectionTitle>
          <div className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed space-y-8 text-justify">
            <p>
              I operate at the intersection of structural engineering and creative logic. My foundation is built on
              <strong className="text-slate-900 font-normal"> HTML5</strong> and <strong className="text-slate-900 font-normal">CSS3</strong>.
              However, I view <strong className="text-slate-900 font-normal">JavaScript</strong> as the nervous system—it breathes life into the static grid.
            </p>
            <p>
              Beyond the browser, my thinking is powered by <strong className="text-slate-900 font-normal">Python</strong>.
              I use it to solve challenges, architect backends with <strong className="text-slate-900 font-normal">Flask</strong>, and experiment with
              <strong className="text-slate-900 font-normal"> AI & Machine Learning</strong>.
            </p>
            <p>
              I am a builder by nature. My philosophy is simple: learn by doing, break things to understand them, and write code that is clean and functional.
            </p>
          </div>
        </section>

        {/* EDUCATION */}
        <section>
          <SectionTitle>EDUCATION TIMELINE</SectionTitle>
          <div className="max-w-3xl border-l border-slate-300 ml-4 pl-12 space-y-16">
            {EDUCATION.map((ed, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-[53px] top-2 w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
                <GlassCard hover>
                  <h3 className="text-2xl font-bold mb-1">{ed.title}</h3>
                  <span className="text-blue-600 block mb-4 font-mono text-sm">{ed.meta}</span>
                  <p className="text-slate-600 text-justify">{ed.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section>
          <SectionTitle>TECHNICAL ARSENAL</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {SKILLS.map((skill, i) => (
              <GlassCard key={i} className="p-6 text-center" hover>
                <h4 className="font-bold text-lg mb-1">{skill.name}</h4>
                <p className="text-xs text-slate-500 uppercase tracking-wider">{skill.desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section>
          <SectionTitle>FEATURED PROJECTS</SectionTitle>
          <div className="space-y-32">
            {PROJECTS.map((proj, i) => (
              <div key={i} className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="grid grid-cols-2 gap-4">
                  {[proj.img1, proj.img2].map((img, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-blue-500/20"
                      onClick={() => setModalImg(img)}
                    >
                      <img src={img} alt="Project" className="w-full h-auto object-cover" />
                    </motion.div>
                  ))}
                </div>
                <GlassCard>
                  <h3 className="text-3xl font-bold mb-4">{proj.title}</h3>
                  <p className="text-blue-600 font-mono text-xs uppercase tracking-widest mb-6">{proj.tech}</p>
                  <p className="text-slate-600 mb-6 leading-relaxed text-justify">{proj.desc}</p>
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-sm text-slate-500"><strong className="text-slate-900">Key Tech:</strong> {proj.key}</p>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </section>

        {/* CERTS */}
        <section>
          <SectionTitle>CERTIFICATIONS</SectionTitle>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {CERTS.map((cert, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border border-slate-200 shadow-sm hover:shadow-md group"
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
          <SectionTitle>WORKFLOW & TOOLS</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "VS Code", desc: "My primary IDE. Configured with Pylint, Prettier, and GitLens." },
              { title: "GitHub", desc: "Version control is non-negotiable. Feature branches and clean history." },
              { title: "Google Colab", desc: "My cloud laboratory. Essential for training deep learning models." }
            ].map((t, i) => (
              <GlassCard key={i} className="" hover>
                <h3 className="text-xl font-bold mb-2">{t.title}</h3>
                <p className="text-slate-500 text-sm">{t.desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="flex justify-center pb-20">
          <GlassCard className="max-w-2xl w-full text-center py-16">
            <h2 className="text-4xl font-light mb-12">LETS COLLABORATE</h2>

            <div className="space-y-8 mb-12">
              <div>
                <p className="text-xs text-slate-500 tracking-[0.2em] mb-2">EMAIL</p>
                <a href="mailto:tusharwashishtha2@gmail.com" className="text-xl md:text-4xl hover:text-blue-600 transition-colors break-all">
                  tusharwashishtha2@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs text-slate-500 tracking-[0.2em] mb-2">LOCATION</p>
                <span className="text-2xl">Indore, India</span>
              </div>
            </div>

            <a
              href="/assets/Tushar_Resume.pdf"
              download="Tushar_Resume.pdf"
              className="inline-flex items-center gap-2 border border-slate-300 px-8 py-4 rounded-full hover:bg-slate-900 hover:text-white transition-all duration-300 font-bold tracking-widest text-sm"
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
