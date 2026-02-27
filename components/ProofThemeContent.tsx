"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Download, X, Cpu, Fingerprint, Activity, Network, Archive, Database, Code2, Github, Linkedin } from "lucide-react"
import { PROJECTS, CERTS } from "@/lib/data"
import { handleResumeDownload } from "@/lib/utils"

// --- Data overrides for deeper explanations ---
const PROOF_SKILLS = [
    { name: "Python", desc: "Core backend & data processing logic. Architecting scalable pipelines and ML model integration systems." },
    { name: "HTML, CSS, JavaScript", desc: "Crafting fully responsive, interactive membranes. Translating computational output into human-readable visual interfaces." },
    { name: "Flask", desc: "Fast, lightweight API endpoint generation. Connecting heavy cloud GPU processes securely to web frontends." },
    { name: "Streamlit", desc: "Rapid prototyping of data applications. Turning python scripts into interactive ML dashboards instantly." },
    { name: "TensorFlow", desc: "Building and training deep neural networks. Leveraging tensors for scalable pattern recognition." },
    { name: "PyTorch", desc: "Dynamic computational graphs. Preferred framework for generative AI research and rapid architectural iteration." },
    { name: "Kaggle", desc: "Sourcing verified datasets, competing in predictive modeling, and analyzing public kernels for benchmark data." },
    { name: "Colab", desc: "Cloud GPU utilization for bypassing local hardware constraints during intensive training and generation loops." },
    { name: "Stable Diffusion XL", desc: "Latent text-to-image diffusion logic. Harnessing generative priors for high-fidelity visual synthesis." },
    { name: "GitHub", desc: "Version control, collaboration, and continuous integration. Maintaining clean, deployable code repositories." }
]

const PROOF_EDU = [
    { school: "Malwa Institute of Technology", degree: "Bachelor of Information Technology", score: "CGPA 6.70" },
    { school: "Motherland School", degree: "12th Science", score: "67%" },
    { school: "Little Wonders Convent School", degree: "10th", score: "65%" }
]

// Animated Typewriter
const TerminalText = ({ text, delay = 0, speed = 40 }: { text: string, delay?: number, speed?: number }) => {
    const [displayed, setDisplayed] = useState("")

    useEffect(() => {
        let i = 0
        const t = setTimeout(() => {
            const int = setInterval(() => {
                setDisplayed(text.substring(0, i + 1))
                i++
                if (i >= text.length) clearInterval(int)
            }, speed)
            return () => clearInterval(int)
        }, delay * 1000)
        return () => clearTimeout(t)
    }, [text, delay, speed])

    return <span>{displayed}</span>
}

export default function ProofThemeContent() {
    const [bootPhase, setBootPhase] = useState(0)
    const [modalImg, setModalImg] = useState<string | null>(null)

    useEffect(() => {
        const t1 = setTimeout(() => setBootPhase(1), 1000)
        const t2 = setTimeout(() => setBootPhase(2), 2500)
        const t3 = setTimeout(() => setBootPhase(3), 4000)
        const t4 = setTimeout(() => setBootPhase(4), 6000)
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
    }, [])

    if (bootPhase < 4) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030504] text-[#2bff6b] font-mono p-6">
                <div className="w-full max-w-lg">
                    <div className="flex items-center gap-4 mb-10 opacity-50">
                        <Terminal size={24} />
                        <span className="tracking-[0.3em]">DIAGNOSTIC_MODE_AUTHORIZATION</span>
                    </div>
                    <div className="space-y-4 text-sm md:text-base tracking-widest">
                        {bootPhase >= 0 && <p className="opacity-80">&gt;<TerminalText text=" INITIALIZING PROOF ENGINE..." speed={30} /></p>}
                        {bootPhase >= 1 && <p className="opacity-80">&gt;<TerminalText text=" VERIFYING IDENTITY ARTIFACTS..." speed={30} /></p>}
                        {bootPhase >= 2 && <p className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">&gt; <TerminalText text=" SYSTEM ONLINE" speed={30} /></p>}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <main className="relative z-10 w-full min-h-screen text-[#8fa094] font-mono selection:bg-[#2bff6b]/30">

            {/* SPACER FOR TOP */}
            <div className="h-32"></div>

            {/* HERO - IDENTITY REVEAL */}
            <section className="min-h-[70vh] flex flex-col items-center justify-center relative px-6 w-full max-w-7xl mx-auto mb-40">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="flex flex-col items-center text-center space-y-12"
                >
                    <div className="flex items-center gap-4 text-[#2bff6b] tracking-[0.5em] text-xs uppercase opacity-70 mb-4 border border-[#2bff6b]/20 px-6 py-2 rounded-full bg-[#030504]">
                        <Fingerprint size={16} /> ENTITY CLASSIFICATION: CLASS A DEVELOPER
                    </div>

                    <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-[#e1f0e5] drop-shadow-[0_0_20px_rgba(43,255,107,0.1)] leading-none break-words">
                        TUSHAR
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#e1f0e5] to-[#4a6b54]">
                            WASHISHTHA
                        </span>
                    </h1>

                    <div className="h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-[#2bff6b]/50 to-transparent my-8 opacity-50 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#030504] border border-[#2bff6b] rounded-full flex items-center justify-center">
                            <div className="w-1 h-1 bg-[#2bff6b] rounded-full animate-ping"></div>
                        </div>
                    </div>

                    <p className="text-xl md:text-2xl tracking-[0.2em] font-light text-[#aabdb1] uppercase max-w-3xl leading-relaxed text-justify">
                        Python + Front-End + AI Developer
                        <br />
                        <span className="text-[#2bff6b] text-sm md:text-base opacity-80 mt-4 block">Focused on Web, AI, ML, and System Design.</span>
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mt-8 opacity-80">
                        <a href="/assets/Tushar_Washishtha_Resume_Fixed.pdf" download="Tushar_Washishtha_Resume_Fixed.pdf" onClick={handleResumeDownload} className="flex items-center gap-3 px-6 py-3 border border-[#2bff6b]/30 bg-[#2bff6b]/5 hover:bg-[#2bff6b]/20 hover:border-[#2bff6b] text-[#2bff6b] text-xs tracking-widest uppercase transition-all duration-300">
                            <Download size={14} /> EXTRACT_RESUME
                        </a>
                        <a href="https://github.com/TUSHARWASHISHTHA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 border border-[#2bff6b]/30 bg-[#2bff6b]/5 hover:bg-[#2bff6b]/20 hover:border-[#2bff6b] text-[#2bff6b] text-xs tracking-widest uppercase transition-all duration-300">
                            <Github size={14} /> GITHUB_UPLINK
                        </a>
                        <a href="https://www.linkedin.com/in/tusharwashishtha/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 border border-[#2bff6b]/30 bg-[#2bff6b]/5 hover:bg-[#2bff6b]/20 hover:border-[#2bff6b] text-[#2bff6b] text-xs tracking-widest uppercase transition-all duration-300">
                            <Linkedin size={14} /> LINKEDIN_NODE
                        </a>
                    </div>
                </motion.div>

                {/* Profile Image Node */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className="mt-20 relative group cursor-pointer"
                    onClick={() => setModalImg("/assets/tushar_photo.jpg")}
                >
                    <div className="absolute -inset-4 border border-[#2bff6b]/30 rounded-full scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 animate-[spin_10s_linear_infinite]"></div>
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border border-[#2bff6b] p-2 bg-[#030504] relative z-10">
                        <img src="/assets/tushar_photo.jpg" alt="Profile" className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100" />
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#030504] border border-[#2bff6b]/50 text-[#2bff6b] text-[10px] tracking-widest px-3 py-1 rounded whitespace-nowrap z-50 shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                        VISUAL_RECORD.JPG
                    </div>
                </motion.div>
            </section>

            {/* STATE 01 - VERIFIED IDENTITY */}
            <section className="w-full py-32 border-t border-[#2bff6b]/10 bg-gradient-to-b from-[#2bff6b]/[0.02] to-transparent relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2bff6b]/30 to-transparent"></div>
                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <h2 className="text-sm tracking-[0.4em] text-[#2bff6b] mb-16 flex items-center gap-4">
                        <span className="w-8 h-px bg-[#2bff6b]/50"></span>
                        STATE 01 // VERIFIED IDENTITY
                    </h2>

                    <div className="text-lg md:text-2xl leading-[2] tracking-wide text-[#aabdb1] space-y-12 font-sans font-light">
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                            I operate as a bridge between pure architectural logic and human-facing interfaces. My core foundation is built upon deep <strong className="text-white font-normal uppercase tracking-widest">Python</strong> development expertise, enabling me to engineer backend pipelines, orchestrate data streams, and build resilient logic engines.
                        </motion.p>
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                            Simultaneously, I translate these computational structures into accessible realities using strict <strong className="text-white font-normal uppercase tracking-widest">HTML, CSS, and JavaScript</strong> principles. A system is only as powerful as the interface through which it is controlled.
                        </motion.p>
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                            My progression extends heavily into <strong className="text-[#2bff6b] font-normal uppercase tracking-widest drop-shadow-[0_0_8px_rgba(43,255,107,0.4)]">AI & Machine Learning</strong>. I do not just theorize; I prioritize practical deployment. From setting up ngrok tunnels for cloud GPU instances to integrating API endpoints via Flask, I focus on building end-to-end applications that leverage the latest generative priorities and classification algorithms.
                        </motion.p>
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                            Driven by a relentless research mindset, a passion for Web + AI integration, and an open, collaborative attitude, I am engineered to adapt, solve, and execute.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* STATE 02 - ACADEMIC RECORD */}
            <section className="w-full py-32 border-t border-[#2bff6b]/10 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-sm tracking-[0.4em] text-[#2bff6b] mb-16 flex items-center gap-4">
                        <span className="w-8 h-px bg-[#2bff6b]/50"></span>
                        STATE 02 // ACADEMIC RECORD
                    </h2>

                    <div className="space-y-6">
                        {PROOF_EDU.map((edu, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.2 }}
                                className="flex flex-col md:flex-row justify-between md:items-center p-8 bg-[#030504] border border-[#2bff6b]/20 hover:border-[#2bff6b]/60 transition-colors group relative overflow-hidden"
                            >
                                <div className="absolute left-0 top-0 w-1 h-full bg-[#2bff6b] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="space-y-2 mb-4 md:mb-0">
                                    <h3 className="text-xl md:text-2xl text-white tracking-widest uppercase">{edu.degree}</h3>
                                    <p className="text-[#aabdb1] tracking-wider text-sm">{edu.school}</p>
                                </div>
                                <div className="text-right">
                                    <span className="inline-block px-4 py-2 bg-[#2bff6b]/10 text-[#2bff6b] border border-[#2bff6b]/30 tracking-[0.2em] text-sm uppercase">
                                        [ {edu.score} ]
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STATE 03 - CAPABILITY MATRIX */}
            <section className="w-full py-32 border-t border-[#2bff6b]/10 relative bg-gradient-to-b from-transparent to-[#2bff6b]/[0.02]">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-sm tracking-[0.4em] text-[#2bff6b] mb-20 flex items-center justify-center gap-4 text-center">
                        <span className="w-8 h-px bg-[#2bff6b]/50"></span>
                        STATE 03 // CAPABILITY MATRIX
                        <span className="w-8 h-px bg-[#2bff6b]/50"></span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {PROOF_SKILLS.map((skill, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                className="p-6 border border-[#2bff6b]/10 bg-[#050a07] hover:bg-[#0a140d] group transition-colors relative overflow-hidden flex items-start gap-4"
                            >
                                <div className="mt-1 text-[#2bff6b] opacity-50 group-hover:opacity-100 transition-opacity">
                                    <Cpu size={20} />
                                </div>
                                <div className="space-y-3 relative z-10 w-full">
                                    <div className="flex items-center justify-between border-b border-[#2bff6b]/20 pb-2">
                                        <h4 className="text-white tracking-widest uppercase font-semibold">{skill.name}</h4>
                                        <span className="text-[10px] text-[#2bff6b] opacity-0 group-hover:opacity-100 transition-opacity tracking-widest">ACTIVE_NODE</span>
                                    </div>
                                    <p className="text-sm text-[#8fa094] leading-relaxed text-justify tracking-wide group-hover:text-[#aabdb1] transition-colors">{skill.desc}</p>
                                </div>
                                {/* Hover scanline */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#2bff6b] -translate-y-full group-hover:animate-[scan_2s_linear_infinite] opacity-50"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STATE 04 - PROOF ENGINE (PROJECTS) */}
            <section className="w-full py-32 border-t border-[#2bff6b]/10 relative">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-sm tracking-[0.4em] text-[#2bff6b] mb-24 flex items-center gap-4">
                        <span className="w-8 h-px bg-[#2bff6b]/50"></span>
                        STATE 04 // PROOF ENGINE (PROJECTS)
                    </h2>

                    <div className="space-y-40">
                        {/* PROJECT 1: BIRD SPECIES IDENTIFIER */}
                        <div className="flex flex-col xl:flex-row gap-16 relative">
                            {/* Live Animation Overlay / Visuals */}
                            <div className="w-full xl:w-5/12 space-y-6">
                                <div
                                    className="aspect-video w-full border border-[#2bff6b]/40 bg-[#030504] relative group cursor-pointer overflow-hidden p-2"
                                    onClick={() => setModalImg(PROJECTS[0]?.img1 || "")} // Fallback based on typical mapping
                                >
                                    <div className="absolute inset-0 bg-[#2bff6b]/10 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none"></div>
                                    <motion.div animate={{ height: ["100%", "20%", "70%", "40%", "90%"] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute bottom-0 left-0 w-full bg-[#2bff6b]/5 mix-blend-screen z-10 pointer-events-none"></motion.div>
                                    <img src={PROJECTS[0]?.img1 || ""} alt="Bird Project" className="w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-0 transition-all duration-700 relative z-0" />
                                    <div className="absolute top-4 left-4 z-30 bg-black/80 text-[#2bff6b] text-xs px-2 py-1 border border-[#2bff6b]/50 flex items-center gap-2">
                                        <Activity size={12} className="animate-pulse" /> LIVE WAVEFORM DATA_STREAM
                                    </div>
                                </div>
                                <div
                                    className="aspect-video w-full border border-[#2bff6b]/20 bg-[#030504] relative group cursor-pointer overflow-hidden p-2 opacity-80 hover:opacity-100"
                                    onClick={() => setModalImg(PROJECTS[0]?.img2 || PROJECTS[0]?.img1 || "")}
                                >
                                    <img src={PROJECTS[0]?.img2 || PROJECTS[0]?.img1 || ""} alt="Bird Project UI" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                                </div>
                            </div>

                            {/* Deep Explanation */}
                            <div className="w-full xl:w-7/12 border-l border-[#2bff6b]/20 pl-8 md:pl-12 space-y-12">
                                <div>
                                    <h3 className="text-3xl md:text-5xl font-bold text-white tracking-widest mb-4">BIRD SPECIES IDENTIFIER</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {['Python', 'Streamlit', 'CNN', 'RNN', 'Multimodal'].map((t, i) => (
                                            <span key={i} className="text-xs tracking-widest uppercase text-[#2bff6b] bg-[#2bff6b]/10 border border-[#2bff6b]/30 px-3 py-1">{t}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-8 text-lg text-[#aabdb1] leading-[1.8] font-sans font-light">
                                    <div>
                                        <h4 className="text-[#2bff6b] font-mono text-sm tracking-[0.2em] mb-3 uppercase border-b border-[#2bff6b]/20 pb-2">Analysis // The Problem</h4>
                                        <p>Identifying bird species robustly in the wild is traditionally bottlenecked by uni-modal constraints. Classifying purely by image fails in dense foliage, while purely audio-based models struggle with environmental noise over-saturation.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[#2bff6b] font-mono text-sm tracking-[0.2em] mb-3 uppercase border-b border-[#2bff6b]/20 pb-2">Architecture // Resolution</h4>
                                        <p>I engineered a Multimodal Fusion logic architecture. A Convolutional Neural Network (CNN) extracts spatial hierarchies from input imagery, while a Recurrent Neural Network (RNN) sequentially processes audio spectrograms to capture temporal audio features. These two latent representations are fused in a final dense layer to output highly accurate predictions.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[#2bff6b] font-mono text-sm tracking-[0.2em] mb-3 uppercase border-b border-[#2bff6b]/20 pb-2">Deployment & Results</h4>
                                        <p>The entire pipeline is deployed via a responsive Streamlit application, allowing real-world users to upload dual data types simultaneously format. The multimodal approach resulted in a demonstrably higher accuracy ceiling compared to standard single-vector baselines.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PROJECT 2: SDXL TEXT TO IMAGE */}
                        <div className="flex flex-col xl:flex-row-reverse gap-16 relative">
                            {/* Live Animation Overlay / Visuals */}
                            <div className="w-full xl:w-5/12 space-y-6">
                                <div
                                    className="aspect-square w-full border border-[#2bff6b]/40 bg-[#030504] relative group cursor-pointer overflow-hidden p-2 flex items-center justify-center"
                                    onClick={() => setModalImg(PROJECTS[1]?.img1 || PROJECTS[1]?.images?.[0] || "")}
                                >
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-black to-black opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 pointer-events-none"></div>
                                    {/* Diffusing latent space animation */}
                                    <motion.div
                                        animate={{ filter: ["blur(40px) brightness(0.5)", "blur(10px) brightness(1.2)", "blur(0px) brightness(1)"] }}
                                        transition={{ repeat: Infinity, duration: 4, repeatType: "reverse", ease: "easeInOut" }}
                                        className="absolute inset-0 z-20 pointer-events-none"
                                    >
                                        <div className="w-full h-full bg-[#2bff6b]/5 mix-blend-overlay"></div>
                                    </motion.div>

                                    <img src={PROJECTS[1]?.img1 || PROJECTS[1]?.images?.[0] || ""} alt="SDXL Generation" className="w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-0 transition-all duration-1000 relative z-0" />

                                    <div className="absolute bottom-4 left-4 z-30 bg-black/80 text-white text-xs px-4 py-2 border border-white/50 font-sans tracking-widest backdrop-blur-md">
                                        <span className="text-[#2bff6b] animate-pulse">●</span> DIFFUSING LATENT SPACE...
                                    </div>
                                </div>
                            </div>

                            {/* Deep Explanation */}
                            <div className="w-full xl:w-7/12 border-r border-[#2bff6b]/20 pr-8 md:pr-12 space-y-12 text-right">
                                <div className="flex flex-col items-end">
                                    <h3 className="text-3xl md:text-5xl font-bold text-white tracking-widest mb-4">TEXT-TO-IMAGE (SDXL)</h3>
                                    <div className="flex flex-wrap justify-end gap-3">
                                        {['Stable Diffusion XL', 'Flask', 'Colab', 'Ngrok', 'Streamlit'].map((t, i) => (
                                            <span key={i} className="text-xs tracking-widest uppercase text-[#2bff6b] bg-[#2bff6b]/10 border border-[#2bff6b]/30 px-3 py-1">{t}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-8 text-lg text-[#aabdb1] leading-[1.8] font-sans font-light">
                                    <div>
                                        <h4 className="text-[#2bff6b] font-mono text-sm tracking-[0.2em] mb-3 uppercase border-b border-[#2bff6b]/20 pb-2">Constraints // Hardware Ceiling</h4>
                                        <p>Running state-of-the-art latent text-to-image diffusion models (SDXL) locally requires immense VRAM, bottlenecking development on standard hardware constraints.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[#2bff6b] font-mono text-sm tracking-[0.2em] mb-3 uppercase border-b border-[#2bff6b]/20 pb-2">Architecture // Bypass Network</h4>
                                        <p>To bypass local limits, I executed the heavy PyTorch inference backend on isolated Google Colab GPU instances. I wrapped the inference scripts in a customized Flask API. Because Colab instances do not have static public IPs, I piped the localized Flask server through a secure Ngrok TCP tunnel to expose the generation endpoint to the open internet.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[#2bff6b] font-mono text-sm tracking-[0.2em] mb-3 uppercase border-b border-[#2bff6b]/20 pb-2">Interface // Execution</h4>
                                        <p>The user interacts with a clean, low-latency Streamlit frontend hosted independently. Prompt handling strings are formatted from the UI, blasted securely across the Ngrok tunnel, processed by the SDXL Colab pipeline, and returned as a high-fidelity visual synthesis in under seconds. A flawless separation of Heavy Compute and Light UI presentation.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PROJECT 3: BHOLE GURU E-COMMERCE */}
                        <div className="flex flex-col xl:flex-row gap-16 relative">
                            {/* Live Animation Overlay / Visuals */}
                            <div className="w-full xl:w-5/12 space-y-6">
                                <div
                                    className="aspect-video w-full border border-[#2bff6b]/40 bg-[#030504] relative group cursor-pointer overflow-hidden p-2"
                                    onClick={() => setModalImg(PROJECTS[2]?.images?.[0] || PROJECTS[2]?.img1 || "")}
                                >
                                    <div className="absolute inset-0 bg-[#2bff6b]/10 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none"></div>
                                    <motion.div animate={{ height: ["100%", "20%", "70%", "40%", "90%"] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute bottom-0 left-0 w-full bg-[#2bff6b]/5 mix-blend-screen z-10 pointer-events-none"></motion.div>
                                    <img src={PROJECTS[2]?.images?.[0] || PROJECTS[2]?.img1 || ""} alt="Bhole Guru Project" className="w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-0 transition-all duration-700 relative z-0" />
                                    <div className="absolute top-4 left-4 z-30 bg-black/80 text-[#2bff6b] text-xs px-2 py-1 border border-[#2bff6b]/50 flex items-center gap-2">
                                        <Database size={12} className="animate-pulse" /> CLOUD_INVENTORY_SYNC
                                    </div>
                                </div>
                                <div
                                    className="aspect-video w-full border border-[#2bff6b]/20 bg-[#030504] relative group cursor-pointer overflow-hidden p-2 opacity-80 hover:opacity-100"
                                    onClick={() => setModalImg(PROJECTS[2]?.images?.[1] || PROJECTS[2]?.img2 || "")}
                                >
                                    <img src={PROJECTS[2]?.images?.[1] || PROJECTS[2]?.img2 || ""} alt="Bhole Guru UI" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                                </div>
                            </div>

                            {/* Deep Explanation */}
                            <div className="w-full xl:w-7/12 border-l border-[#2bff6b]/20 pl-8 md:pl-12 space-y-12">
                                <div>
                                    <h3 className="text-3xl md:text-5xl font-bold text-white tracking-widest mb-4">BHOLE GURU E-COMMERCE</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {['React.js', 'Node.js', 'Cloudinary', 'Responsive'].map((t, i) => (
                                            <span key={i} className="text-xs tracking-widest uppercase text-[#2bff6b] bg-[#2bff6b]/10 border border-[#2bff6b]/30 px-3 py-1">{t}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-8 text-lg text-[#aabdb1] leading-[1.8] font-sans font-light">
                                    <div>
                                        <h4 className="text-[#2bff6b] font-mono text-sm tracking-[0.2em] mb-3 uppercase border-b border-[#2bff6b]/20 pb-2">Requirement // Digital Sanctuary</h4>
                                        <p>A specialized architectural mandate requiring a full-stack e-commerce deployment capable of secure transactions while maintaining a deeply specific "Temple Corridor" visual vernacular.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[#2bff6b] font-mono text-sm tracking-[0.2em] mb-3 uppercase border-b border-[#2bff6b]/20 pb-2">Architecture // State & Data</h4>
                                        <p>Engineered with React.js components governing state. The backend utilizes Node.js orchestration mapped to remote databases for inventory logistics. Asset media streams are parsed and optimized via Cloudinary CDN channels to ensure low-latency loads despite high-resolution artifacts.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[#2bff6b] font-mono text-sm tracking-[0.2em] mb-3 uppercase border-b border-[#2bff6b]/20 pb-2">Interface // Control Systems</h4>
                                        <p>Includes a bespoke administrative dashboard. Administrators hold verified privileges to alter real-time inventory schemas without raw database manipulation, ensuring robust digital commerce.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PROJECT 4: LEGACY CORE */}
                        <div className="flex flex-col xl:flex-row-reverse gap-16 relative">
                            {/* Live Animation Overlay / Visuals */}
                            <div className="w-full xl:w-5/12 space-y-6">
                                <div
                                    className="aspect-video w-full border border-[#2bff6b]/40 bg-[#030504] relative group cursor-pointer overflow-hidden p-2 flex items-center justify-center"
                                    onClick={() => setModalImg(PROJECTS[3]?.img1 || PROJECTS[3]?.images?.[0] || "")}
                                >
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-black to-black opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 pointer-events-none"></div>

                                    <img src={PROJECTS[3]?.img1 || PROJECTS[3]?.images?.[0] || ""} alt="Legacy Core UI" className="w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-0 transition-all duration-1000 relative z-0" />

                                    <div className="absolute bottom-4 left-4 z-30 bg-black/80 text-white text-xs px-4 py-2 border border-white/50 font-sans tracking-widest backdrop-blur-md flex items-center gap-2">
                                        <Code2 size={12} className="text-[#2bff6b] animate-pulse" /> EXAMINING PURE DOM LOGIC...
                                    </div>
                                </div>
                            </div>

                            {/* Deep Explanation */}
                            <div className="w-full xl:w-7/12 border-r border-[#2bff6b]/20 pr-8 md:pr-12 space-y-12 text-right">
                                <div className="flex flex-col items-end">
                                    <h3 className="text-3xl md:text-5xl font-bold text-white tracking-widest mb-4">THE LEGACY CORE (V1)</h3>
                                    <div className="flex flex-wrap justify-end gap-3">
                                        {['HTML5', 'CSS3', 'Vanilla JS', 'DOM Logic'].map((t, i) => (
                                            <span key={i} className="text-xs tracking-widest uppercase text-[#2bff6b] bg-[#2bff6b]/10 border border-[#2bff6b]/30 px-3 py-1">{t}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-8 text-lg text-[#aabdb1] leading-[1.8] font-sans font-light">
                                    <div>
                                        <h4 className="text-[#2bff6b] font-mono text-sm tracking-[0.2em] mb-3 uppercase border-b border-[#2bff6b]/20 pb-2">Genesis // Foundation</h4>
                                        <p>Before adopting high-level abstraction frameworks like React or Next.js, it is critical to interface directly with the basic constraints of the browser engine.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[#2bff6b] font-mono text-sm tracking-[0.2em] mb-3 uppercase border-b border-[#2bff6b]/20 pb-2">Architecture // Raw Execution</h4>
                                        <p>Constructed entirely using native Web APIs. Structural layout, stateful behaviors, and interactive physics were hardcoded using raw DOM access and optimized stylesheet cascading. No external dependencies or render loops were utilized.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[#2bff6b] font-mono text-sm tracking-[0.2em] mb-3 uppercase border-b border-[#2bff6b]/20 pb-2">Analysis // Evolution</h4>
                                        <p>This deployment stands as a foundational artifact demonstrating an uncompromised understanding of base-level styling and procedural scripting, validating the underlying structure before building complex reactive applications.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* STATE 05 - CERTIFICATION VAULT */}
            <section className="w-full py-32 border-t border-[#2bff6b]/10 bg-[#030504]">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-sm tracking-[0.4em] text-[#2bff6b] mb-16 flex items-center justify-center gap-4 text-center">
                        <span className="w-8 h-px bg-[#2bff6b]/50"></span>
                        STATE 05 // CERTIFICATION VAULT
                        <span className="w-8 h-px bg-[#2bff6b]/50"></span>
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {CERTS.map((cert, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group cursor-pointer flex flex-col items-center gap-4"
                                onClick={() => setModalImg(cert.img || "")}
                            >
                                <div className="w-full aspect-square border border-[#2bff6b]/30 bg-[#050a07] p-2 relative overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[#2bff6b]/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-[#2bff6b] -translate-y-full group-hover:animate-[scan_2s_linear_infinite] z-20"></div>
                                    <Archive size={30} className="absolute text-[#2bff6b]/10 z-0" />
                                    <img src={cert.img || ""} alt={cert.label || "Certificate"} className="w-full h-full object-contain relative z-10 opacity-70 group-hover:opacity-100 transition-opacity mix-blend-screen" />
                                </div>
                                <span className="text-xs uppercase tracking-[0.2em] text-[#8fa094] group-hover:text-white transition-colors text-center">{cert.label || "CERTIFICATE"}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STATE 06 - CONTACT & EXPORT */}
            <section className="w-full py-40 border-t border-[#2bff6b]/10 relative bg-gradient-to-t from-[#2bff6b]/[0.05] to-transparent">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-20">
                    <h2 className="text-sm tracking-[0.4em] text-[#2bff6b] flex items-center justify-center gap-4 text-center">
                        <span className="w-8 h-px bg-[#2bff6b]/50"></span>
                        STATE 06 // SYSTEM EXPORT // TERMINATE
                        <span className="w-8 h-px bg-[#2bff6b]/50"></span>
                    </h2>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
                        <a
                            href="mailto:tusharwashishtha2@gmail.com"
                            className="w-full md:w-auto px-12 py-6 bg-[#030504] border border-[#2bff6b]/40 text-white tracking-[0.3em] uppercase hover:bg-[#2bff6b] hover:text-black hover:border-[#2bff6b] transition-all duration-300 relative group overflow-hidden"
                        >
                            <span className="relative z-10 font-bold">INITIATE COMMUNICATION</span>
                            <div className="absolute inset-0 bg-[#2bff6b]/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"></div>
                        </a>

                        <a
                            href="/assets/Tushar_Washishtha_Resume_Fixed.pdf"
                            download="Tushar_Washishtha_Resume_Fixed.pdf"
                            onClick={handleResumeDownload}
                            className="w-full md:w-auto px-12 py-6 bg-[#030504] border border-[#2bff6b]/40 text-[#2bff6b] tracking-[0.3em] uppercase hover:bg-[#2bff6b] hover:text-black hover:border-[#2bff6b] transition-all duration-300 relative group flex items-center justify-center gap-4"
                        >
                            <Download size={18} />
                            <span className="relative z-10 font-bold">EXPORT VERIFIED PROFILE</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* FULLSCREEN EXAMINE MODAL */}
            <AnimatePresence>
                {modalImg && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[#030504]/95 p-6 cursor-zoom-out"
                        onClick={() => setModalImg(null)}
                    >
                        {/* High-tech modal frame */}
                        <div className="relative max-w-full max-h-[90vh] inline-flex items-center justify-center p-2 border border-[#2bff6b]/30 bg-[#050a07] shadow-[0_0_50px_rgba(43,255,107,0.15)]" onClick={(e) => e.stopPropagation()}>
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#2bff6b] -translate-x-1 -translate-y-1"></div>
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#2bff6b] translate-x-1 -translate-y-1"></div>
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#2bff6b] -translate-x-1 translate-y-1"></div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#2bff6b] translate-x-1 translate-y-1"></div>

                            <motion.img
                                initial={{ scale: 0.95, opacity: 0, filter: "sepia(100%) hue-rotate(90deg) saturate(200%)" }}
                                animate={{ scale: 1, opacity: 1, filter: "sepia(0%) hue-rotate(0deg) saturate(100%)" }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                src={modalImg}
                                className="max-w-full max-h-[85vh] object-contain cursor-default"
                            />
                        </div>
                        <button className="absolute top-8 right-8 text-[#2bff6b]/50 hover:text-[#2bff6b] hover:rotate-90 transition-all duration-500">
                            <X size={48} strokeWidth={1} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    )
}
