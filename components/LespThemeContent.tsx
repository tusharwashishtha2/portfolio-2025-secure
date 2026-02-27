"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Download, X, Cpu, Activity, Database, Network, Code2, Link, ShieldCheck, Zap } from "lucide-react"
import { PROJECTS, CERTS } from "@/lib/data"
import { handleResumeDownload } from "@/lib/utils"

const LESP_SKILLS = [
    { name: "Python", stats: "LOAD: 98% | LATENCY: 12ms", desc: "Core logic runtime. Engine for backend pipeline architecture, multi-threaded worker nodes, and scalable high-performance inference modeling. Direct integration with cloud hardware primitives." },
    { name: "HTML / CSS", stats: "DOM: SECURE | RENDERS: 60fps", desc: "Translating computational output into strict Document Object Model hierarchies. Applying optimized repaints and grid schemas to prevent Cumulative Layout Shift (CLS) across mobile and desktop boundaries." },
    { name: "JavaScript", stats: "V8: ACTIVE | MEM: 42MB", desc: "Orchestrating the interactive event loop. Managing asynchronous state changes, manipulating live DOM nodes, and binding client interactions to server-sent computational events in real-time." },
    { name: "Flask", stats: "WSGI: LIVE | WORKERS: 4", desc: "Lightweight, horizontally scalable API routing. Acting as the secure connective tissue between heavy cloud GPU environments and internet-facing application endpoints." },
    { name: "Streamlit", stats: "WIDGETS: SYNCED | RPC: OK", desc: "Rapid dashboard deployment architecture. Parsing complex matrix data and Python logic directly into responsive frontend representations without standard REST overhead." },
    { name: "TensorFlow", stats: "TENSORS: ALLOCATED | CUDA: TRUE", desc: "Deep neural network architecture mapping. Orchestrating multi-layered perceptrons and convolutional filters for scaled pattern recognition and classification routines." },
    { name: "PyTorch", stats: "AUTOGRAD: ON | GRAPHS: DYNAMIC", desc: "Dynamic computational graph allocation. Execution framework utilized for generative AI research, custom architectural looping, and unstable advanced modeling manipulation." },
    { name: "Stable Diffusion XL", stats: "LATENTS: DIFFUSING | STEPS: 50", desc: "Latent text-to-image diffusion physics. Iterative denoising logic leveraging massive generative prior data to synthesize high-fidelity visual representations from pure linguistic vectors." },
    { name: "Kaggle", stats: "DATA: 0.0 | KERNELS: INTACT", desc: "Dataset ingestion and kernel architecture analysis. Scraping verified multidimensional parameters and benchmarking local models against standardized external evaluation metrics." },
    { name: "Google Colab", stats: "TPU: INACTIVE | GPU: T4 ON", desc: "Bypassing local hardware thermal constraints. Injecting continuous training scripts into isolated Google cloud compute environments for unrestricted deep learning compilation." },
    { name: "GitHub", stats: "BRANCH: MAIN | HEAD: DETACHED", desc: "Distributed version control protocol. Managing asynchronous code states, integrating isolated pull requests, and maintaining strict immutable deployment history." }
]

const LESP_EDU = [
    { school: "Malwa Institute of Technology", degree: "Bachelor of Information Technology", score: "CGPA: 6.70", status: "COMPILED" },
    { school: "Motherland School", degree: "12th Science", score: "Percentage: 67%", status: "VERIFIED" },
    { school: "Little Wonders Convent School", degree: "10th", score: "Percentage: 65%", status: "VERIFIED" }
]

export default function LespThemeContent() {
    const [timeDelay, setTimeDelay] = useState(0)
    const [modalImg, setModalImg] = useState<string | null>(null)

    // Simulate system ticker
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeDelay(prev => prev + 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <main className="relative z-10 w-full min-h-screen text-[#a3a3a3] font-mono selection:bg-white/20">

            {/* SYSTEM HEADER */}
            <header className="fixed top-0 left-0 w-full bg-[#020202]/90 border-b border-white/10 backdrop-blur-md z-40 p-2 md:p-4 flex justify-between items-center text-[10px] md:text-xs pr-[120px] md:pr-[280px]">
                <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                    <span className="text-white tracking-widest hidden md:inline">SYSTEM STATUS: ACTIVE // ALL MODULES RUNNING</span>
                    <span className="text-white tracking-widest md:hidden">SYS_ACTIVE</span>
                </div>
                <div className="text-[#888] flex items-center gap-4">
                    <span>UPTIME: {timeDelay}s</span>
                    <span className="hidden md:inline">MEM: {(24 + Math.sin(timeDelay) * 2).toFixed(1)}GB / 32GB</span>
                    <span>CPU: {(12 + Math.cos(timeDelay) * 4).toFixed(0)}%</span>
                </div>
            </header>

            {/* HERO MODULE */}
            <section className="min-h-screen flex flex-col justify-center px-4 md:px-8 w-full max-w-5xl mx-auto pt-32 pb-20">
                <div className="border border-white/10 bg-[#050505]/80 p-6 md:p-12 relative overflow-hidden group mt-12 md:mt-0">
                    <div className="absolute top-0 right-0 p-2 text-[10px] text-[#444] font-mono">PID: 90241</div>
                    <h1 className="text-4xl sm:text-6xl md:text-[5.5rem] font-bold tracking-tighter text-white uppercase leading-none mb-6 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all break-words">
                        TUSHAR <br className="hidden md:block" /> WASHISHTHA
                    </h1>

                    <div className="h-px bg-white/20 w-full mb-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full w-24 bg-white/60 animate-[scan_2s_linear_infinite]"></div>
                    </div>

                    <p className="text-sm md:text-lg tracking-widest text-[#bbb] uppercase mb-4 w-full md:max-w-[68ch] leading-relaxed text-justify">
                        Entry-Level Front-End & Python Developer
                    </p>
                    <p className="text-xs md:text-sm tracking-widest text-[#888] uppercase flex flex-col md:flex-row gap-2 md:gap-6">
                        <span className="flex items-center gap-2"><Cpu size={14} className="text-green-500" /> SYSTEM ARCHITECTURE</span>
                        <span className="flex items-center gap-2"><Zap size={14} className="text-yellow-500" /> AI MODEL INFERENCE</span>
                        <span className="flex items-center gap-2"><Code2 size={14} className="text-blue-500" /> WEB DOM ENGINEERING</span>
                    </p>

                    <div className="mt-12 flex items-center gap-6">
                        <div
                            className="w-24 h-24 border border-white/20 cursor-pointer overflow-hidden group-hover:border-white/60 transition-colors relative"
                            onClick={() => setModalImg("/assets/tushar_photo.jpg")}
                        >
                            <div className="absolute inset-0 bg-white/5 animate-pulse z-10 pointer-events-none"></div>
                            <img src="/assets/tushar_photo.jpg" alt="Identity View" className="w-full h-full object-cover grayscale mix-blend-screen opacity-80" />
                            <div className="absolute bottom-0 left-0 bg-black text-[8px] text-white px-1">ID_VERIFIED</div>
                        </div>
                        <div className="text-[10px] text-[#666] uppercase space-y-1">
                            <p>ROOT/USERS/TW-01/IDENTITY.JPG</p>
                            <p>CLICK TO EXAMINE RAW ARTIFACT</p>
                            <p>ACCESS LEVEL: PUBLIC</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* MODULE 01 — CORE LOGIC */}
            <section className="w-full py-20 px-4 md:px-8 border-t border-white/10 bg-[#020202]">
                <div className="max-w-[68ch] mx-auto">
                    <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
                        <Activity size={18} className="text-white animate-pulse" />
                        <h2 className="text-sm tracking-[0.3em] text-white uppercase flex-1">Module 01 // Core Logic Execution</h2>
                        <span className="text-[10px] text-[#555]">ACTIVE THREAD</span>
                    </div>

                    <div className="text-sm md:text-base leading-[2] tracking-wide text-[#a3a3a3] font-mono text-justify space-y-8">
                        <p>
                            The underlying architecture of my development methodology operates on a strict dual-core protocol. The primary processing pipeline is built entirely upon <span className="text-white bg-white/10 px-1">Python</span>, providing the essential infrastructure to engineer robust backend engines, orchestrate vast asynchronous data streams, and enforce highly scaled machine learning inference models.
                        </p>
                        <p>
                            However, backend computational power holds no utility without a secure structural presentation layer. I translate these immense data outputs into human-readable visual interfaces utilizing disciplined execution of <span className="text-white bg-white/10 px-1">HTML, CSS, and JavaScript</span> protocols. Every DOM interaction is calculated; every flexbox grid is strictly engineered to prevent layout shifts. The interface must react, adapt, and process data synchronously without failing the user.
                        </p>
                        <p>
                            My architecture extends deeply into advanced system engineering via Artificial Intelligence. I do not theoretically map concepts; I execute them in active environments. By wrapping dense <span className="text-white bg-white/10 px-1">PyTorch</span> and <span className="text-white bg-white/10 px-1">TensorFlow</span> calculation matrices inside <span className="text-white bg-white/10 px-1">Flask</span> API routing and feeding the latency-optimized data to <span className="text-white bg-white/10 px-1">Streamlit</span> frontend sockets, I bring raw cloud GPU execution directly to the edge.
                        </p>
                        <p>
                            Driven by a relentless compulsion to optimize architectures and a collaborative networking attitude, I configure my own datasets iteratively using <span className="text-white bg-white/10 px-1">Kaggle</span> and rely upon isolated container instances like <span className="text-white bg-white/10 px-1">Google Colab</span> to deploy generative artificial parameters (like <span className="text-white bg-white/10 px-1">Stable Diffusion XL</span> workflows) when local hardware fails. Learning by building is the only verified pathway to execution.
                        </p>
                    </div>
                </div>
            </section>

            {/* MODULE 02 — EDUCATION */}
            <section className="w-full py-20 px-4 md:px-8 border-t border-white/10 bg-[#050505]">
                <div className="max-w-[68ch] mx-auto">
                    <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
                        <Database size={18} className="text-white opacity-60" />
                        <h2 className="text-sm tracking-[0.3em] text-white uppercase flex-1">Module 02 // Memory Allocation (Education)</h2>
                        <span className="text-[10px] text-[#555]">STATIC DATA</span>
                    </div>

                    <div className="space-y-6">
                        {LESP_EDU.map((edu, i) => (
                            <div key={i} className="border border-white/10 bg-black p-6 relative overflow-hidden group flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-white/30 transition-colors">
                                <div className="absolute left-0 top-0 w-1 h-full bg-white opacity-20 group-hover:opacity-100 transition-opacity"></div>
                                <div>
                                    <h3 className="text-white text-sm tracking-widest uppercase mb-1">{edu.degree}</h3>
                                    <p className="text-[#666] text-xs tracking-widest uppercase">{edu.school}</p>
                                </div>
                                <div className="flex flex-col md:items-end gap-1">
                                    <span className="text-white text-xs bg-white/10 px-2 py-1 tracking-[0.2em]">{edu.score}</span>
                                    <span className="text-[9px] text-green-500 tracking-widest">{edu.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MODULE 03 — SKILLS */}
            <section className="w-full py-20 px-4 md:px-8 border-t border-white/10 bg-[#020202]">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
                        <Cpu size={18} className="text-white animate-[spin_4s_linear_infinite]" />
                        <h2 className="text-sm tracking-[0.3em] text-white uppercase flex-1">Module 03 // Active Capabilities </h2>
                        <span className="text-[10px] text-[#555]">RUNNING PROCESSES</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {LESP_SKILLS.map((skill, i) => (
                            <div key={i} className="border border-white/10 bg-[#050505] p-5 relative overflow-hidden group">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-white text-xs tracking-[0.2em] uppercase font-bold">{skill.name}</h4>
                                    <span className="text-[10px] text-green-500 bg-green-500/10 px-2 py-0.5 border border-green-500/20">{skill.stats}</span>
                                </div>
                                <p className="text-xs text-[#888] leading-relaxed text-justify text-justify tracking-wide">{skill.desc}</p>
                                <div className="w-full bg-white/5 h-1 mt-4 relative overflow-hidden">
                                    <div className={`absolute top-0 left-0 h-full bg-white/40 w-[30%]`} style={{ animation: `scan ${2 + Math.random() * 2}s linear infinite` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MODULE 04 — PROJECTS */}
            <section className="w-full py-20 px-4 md:px-8 border-t border-white/10 bg-[#050505] relative z-10">
                <div className="max-w-[68ch] mx-auto">
                    <div className="flex items-center gap-4 mb-20 border-b border-white/10 pb-4">
                        <Network size={18} className="text-white animate-pulse" />
                        <h2 className="text-sm tracking-[0.3em] text-white uppercase flex-1">Module 04 // Deployed Architecture</h2>
                        <span className="text-[10px] text-[#555]">LIVE PIPELINES</span>
                    </div>

                    <div className="space-y-32">
                        {PROJECTS.map((proj, pIdx) => {
                            const images = proj.images || (proj.img1 && proj.img2 ? [proj.img1, proj.img2] : [])
                            return (
                                <div key={pIdx} className="space-y-6">
                                    <div className="border border-white/20 bg-black p-6">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-white/10 pb-4">
                                            <h3 className="text-xl md:text-2xl font-bold text-white tracking-widest uppercase">{proj.title}</h3>
                                            <span className="text-[10px] text-green-500 border border-green-500/30 bg-green-500/10 px-3 py-1 uppercase tracking-widest flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                                                EXECUTION LIVE
                                            </span>
                                        </div>

                                        <div className="text-xs tracking-[0.2em] text-[#888] mb-6 uppercase border-l-2 border-white/30 pl-3">
                                            {proj.tech}
                                        </div>

                                        {/* Execution Description */}
                                        <p className="text-sm leading-[1.8] text-[#a3a3a3] text-justify mb-8 tracking-wide">
                                            {proj.desc}
                                            <span className="block mt-4 text-white opacity-60">SYSTEM KEYWORDS: {proj.key}</span>
                                        </p>

                                        {/* Multi-Image Active Viewing Nodes */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {images.map((imgUrl, i) => (
                                                <div
                                                    key={i}
                                                    className="aspect-video w-full border border-white/10 bg-[#020202] relative group cursor-pointer overflow-hidden flex flex-col items-center justify-center p-2 hover:border-white/50 transition-colors"
                                                    onClick={() => setModalImg(imgUrl)}
                                                >
                                                    <img src={imgUrl} alt="Execution State" className="w-full h-full object-cover mix-blend-screen opacity-50 group-hover:opacity-100 transition-opacity" />
                                                    <div className="absolute bottom-2 left-2 bg-black/90 px-2 py-1 text-[8px] text-white border border-white/20 flex items-center gap-2">
                                                        <Activity size={8} className="text-blue-400" /> VISUAL_OUTPUT_NODE_v{i}.jpg
                                                    </div>
                                                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Artificial data pipe connecting to next project */}
                                    {pIdx !== PROJECTS.length - 1 && (
                                        <div className="flex justify-center h-16 opacity-30">
                                            <div className="w-px h-full bg-white relative overflow-hidden">
                                                <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-500 animate-[scan_1s_linear_infinite]"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* MODULE 05 — CERTIFICATIONS */}
            <section className="w-full py-20 px-4 md:px-8 border-t border-white/10 bg-[#020202]">
                <div className="max-w-[68ch] mx-auto">
                    <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
                        <ShieldCheck size={18} className="text-white opacity-80" />
                        <h2 className="text-sm tracking-[0.3em] text-white uppercase flex-1">Module 05 // State Verification Vault</h2>
                        <span className="text-[10px] text-[#555]">READ-ONLY</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {CERTS.map((cert, i) => (
                            <div
                                key={i}
                                className="group cursor-pointer border border-white/10 bg-[#050505] p-3 hover:border-white/50 hover:bg-[#0a0a0a] transition-colors relative"
                                onClick={() => setModalImg(cert.img || "")}
                            >
                                <div className="absolute top-0 right-0 p-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 group-hover:bg-green-500 group-hover:animate-pulse"></div>
                                </div>
                                <div className="w-full aspect-video border border-white/5 bg-black flex items-center justify-center mb-3 p-1">
                                    <img src={cert.img || ""} alt={cert.label} className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                                </div>
                                <div className="text-[9px] text-center text-[#888] uppercase tracking-[0.2em] group-hover:text-white transition-colors break-words">
                                    {cert.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MODULE 06 — CONTACT */}
            <section className="w-full py-32 px-4 md:px-8 border-t border-white/10 bg-[#050505]">
                <div className="max-w-[68ch] mx-auto">
                    <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
                        <Link size={18} className="text-white opacity-60" />
                        <h2 className="text-sm tracking-[0.3em] text-white uppercase flex-1">Module 06 // I/O Tunnels</h2>
                    </div>

                    <div className="border border-white/20 bg-black p-8 font-mono space-y-8">
                        <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                            <span className="text-[10px] text-[#666] w-24">MAIL_PROTOCOL_</span>
                            <a href="mailto:tusharwashishtha2@gmail.com" className="text-white text-xs tracking-widest hover:text-blue-400 hover:underline">tusharwashishtha2@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                            <span className="text-[10px] text-[#666] w-24">VOICE_COMM_</span>
                            <span className="text-[#888] text-xs tracking-widest">[ REQUEST VIA SECURE MAIL ]</span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center items-start gap-4 relative z-[9999]">
                            <span className="text-[10px] text-[#666] md:w-24">FILE_EXPORT_</span>
                            <a
                                href="/assets/Tushar_Washishtha_Resume_Fixed.pdf"
                                download="Tushar_Washishtha_Resume_Fixed.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleResumeDownload}
                                className="text-xs text-black bg-white px-6 py-3 md:px-4 md:py-2 uppercase tracking-widest font-bold hover:bg-green-500 hover:text-white transition-colors flex items-center justify-center gap-3 cursor-pointer w-full md:w-auto overflow-hidden group"
                            >
                                <Download size={16} className="pointer-events-none group-hover:animate-bounce" />
                                <span className="pointer-events-none">DOWNLOAD RESUME PAYLOAD</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-32 text-center text-[10px] text-[#333] font-mono tracking-widest uppercase pb-10">
                    SYSTEM EXECUTION COMPLETED. WAITING FOR I/O INTERRUPT...
                </div>
            </section>

            {/* FULLSCREEN ACTIVE VIEW (MODAL) */}
            <AnimatePresence>
                {modalImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[#020202]/95 backdrop-blur-md p-4 md:p-12 cursor-pointer"
                        onClick={() => setModalImg(null)}
                    >
                        <div className="absolute top-4 left-4 text-[10px] text-green-500 font-mono tracking-widest animate-pulse flex items-center gap-2">
                            <Activity size={12} /> FULLSCREEN ACTIVE VIEW OVERRIDE
                        </div>
                        <div className="relative w-full max-h-[95vh] inline-flex items-center justify-center pointer-events-none" onClick={(e) => e.stopPropagation()}>
                            <div className="absolute -inset-4 border border-white/20">
                                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white"></div>
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white"></div>
                            </div>
                            <motion.img
                                initial={{ scale: 0.95, filter: "brightness(0.5) contrast(1.5)" }}
                                animate={{ scale: 1, filter: "brightness(1) contrast(1)" }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                src={modalImg}
                                className="max-w-full max-h-[85vh] object-contain shadow-[0_0_50px_rgba(255,255,255,0.05)]"
                            />
                        </div>
                        <button className="absolute top-6 right-6 text-[#555] hover:text-white transition-colors bg-black border border-white/20 p-2 pointer-events-auto flex items-center gap-2 font-mono text-[10px]">
                            <X size={14} /> TERMINATE VIEW
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    )
}
