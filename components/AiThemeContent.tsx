"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Download, ChevronRight, Mail, Code2, Database, Layout, Sparkles, CheckCircle2, Server, Cpu, Layers, Github, Linkedin, X } from "lucide-react"
import { PROJECTS, CERTS } from "@/lib/data"
import { handleResumeDownload } from "@/lib/utils"

// --- Helper Components for AI Theme ---

// Typewriter effect for system logs
const TypewriterText = ({ text, delay = 0, speed = 50, onComplete }: { text: string, delay?: number, speed?: number, onComplete?: () => void }) => {
    const [displayed, setDisplayed] = useState("")

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        // Initial delay before starting to type
        const startTimeout = setTimeout(() => {
            let i = 0;
            const intervalId = setInterval(() => {
                setDisplayed(text.substring(0, i + 1));
                i++;
                if (i >= text.length) {
                    clearInterval(intervalId);
                    if (onComplete) onComplete();
                }
            }, speed);

            return () => clearInterval(intervalId);
        }, delay * 1000);

        return () => clearTimeout(startTimeout);
    }, [text, delay, speed, onComplete])

    return <span>{displayed}{displayed.length < text.length ? '█' : ''}</span>
}

// Glass Panel for Data Modules
const GlassModule = ({ children, title, className = "", delay = 0 }: { children: React.ReactNode, title?: string, className?: string, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay }}
        className={`bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] ${className}`}
    >
        {title && (
            <div className="border-b border-white/10 bg-white/[0.01] px-6 py-3 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#06b6d4] shadow-[0_0_8px_#06b6d4]"></div>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400 font-mono">{title}</span>
            </div>
        )}
        <div className="p-6 md:p-8">
            {children}
        </div>
    </motion.div>
)

export default function AiThemeContent() {
    const [booted, setBooted] = useState(false)
    const [bootStep, setBootStep] = useState(0)
    const [activeSkill, setActiveSkill] = useState<number | null>(null)
    const [modalImg, setModalImg] = useState<string | null>(null)

    // System Initialization Sequence
    useEffect(() => {
        const s1 = setTimeout(() => setBootStep(1), 1000)
        const s2 = setTimeout(() => setBootStep(2), 2500)
        const s3 = setTimeout(() => setBootStep(3), 4000)
        const s4 = setTimeout(() => setBooted(true), 5500)
        return () => { clearTimeout(s1); clearTimeout(s2); clearTimeout(s3); clearTimeout(s4) }
    }, [])

    if (!booted) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0c] text-[#06b6d4] font-mono text-sm md:text-base">
                <div className="flex flex-col gap-4 max-w-md w-full px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <Terminal size={24} />
                        <span className="tracking-widest">TW.AI // TERMINAL</span>
                    </div>
                    <div className="space-y-2 h-32">
                        {bootStep >= 0 && <p className="opacity-80">] <TypewriterText text="SYSTEM INITIALIZING..." speed={30} /></p>}
                        {bootStep >= 1 && <p className="opacity-80">] <TypewriterText text="LOADING INTELLIGENT INTERFACE" speed={30} /></p>}
                        {bootStep >= 2 && <p className="text-[#3b82f6] shadow-[#3b82f6]">] <TypewriterText text="IDENTITY CONFIRMED" speed={30} /></p>}
                        {bootStep >= 3 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 h-1 bg-white/10 w-full overflow-hidden rounded-full">
                                <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.2 }} className="h-full bg-[#06b6d4] shadow-[0_0_10px_#06b6d4]" />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <main className="relative z-10 w-full min-h-screen flex flex-col items-center overflow-x-hidden pt-24 pb-40 px-6 gap-32 max-w-7xl mx-auto text-slate-300 font-sans">

            {/* MODULE 1 - SYSTEM INITIALIZATION (HERO) */}
            <section className="w-full min-h-[85vh] flex flex-col justify-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="grid lg:grid-cols-12 gap-12 items-center"
                >
                    <div className="lg:col-span-7 space-y-10 order-2 lg:order-1">
                        <div className="space-y-2">
                            <span className="text-xs uppercase tracking-[0.3em] text-[#06b6d4] font-mono flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#06b6d4] rounded-full animate-pulse"></span>
                                SYSTEM.IDENTITY.PRIMARY
                            </span>
                            <h1 className="text-4xl sm:text-7xl xl:text-8xl font-medium tracking-tight text-white leading-[1.1] break-words">
                                TUSHAR
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-slate-500">
                                    WASHISHTHA
                                </span>
                            </h1>
                        </div>

                        <div className="text-xl md:text-2xl font-light text-slate-400 border-l-2 border-white/10 pl-6 py-2 space-y-3">
                            <p><TypewriterText text="Entry-Level Frontend & Python Developer" delay={0.5} speed={40} /></p>
                            <p><TypewriterText text="Passionate About Web & AI" delay={2.5} speed={40} /></p>
                            <p><TypewriterText text="Ready to Learn & Collaborate" delay={4.0} speed={40} /></p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button onClick={() => document.getElementById('labs')?.scrollIntoView({ behavior: 'smooth' })} className="group relative px-6 py-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#06b6d4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <ChevronRight size={18} className="text-[#06b6d4] group-hover:translate-x-1 transition-transform" />
                                <span className="text-sm tracking-widest uppercase font-medium text-white relative z-10">Launch Projects</span>
                            </button>

                            <a href="/assets/Tushar_Washishtha_Resume_Fixed.pdf" download="Tushar_Washishtha_Resume_Fixed.pdf" onClick={handleResumeDownload} className="group relative px-6 py-4 bg-[#06b6d4]/10 border border-[#06b6d4]/30 rounded-lg hover:bg-[#06b6d4]/20 transition-all flex items-center justify-center gap-3 overflow-hidden">
                                <span className="absolute left-0 w-2 h-full bg-[#06b6d4] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300"></span>
                                <Download size={18} className="text-[#06b6d4]" />
                                <span className="text-white text-xs font-mono tracking-[0.2em] relative z-10">DOWNLOAD RESUME INSTRUCTION SET</span>
                            </a>

                            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="group relative px-6 py-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3 overflow-hidden">
                                <Mail size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                                <span className="text-sm tracking-widest uppercase font-medium text-slate-300 group-hover:text-white relative z-10">Gateway</span>
                            </button>

                            <a href="https://github.com/TUSHARWASHISHTHA" target="_blank" rel="noopener noreferrer" className="group relative px-6 py-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-3 overflow-hidden">
                                <Github size={18} className="text-slate-400 group-hover:text-black transition-colors" />
                                <span className="sr-only">GitHub</span>
                            </a>

                            <a href="https://www.linkedin.com/in/tusharwashishtha/" target="_blank" rel="noopener noreferrer" className="group relative px-6 py-4 bg-white/5 border border-white/10 rounded-lg hover:bg-[#0077b5] border-hover-[#0077b5] transition-all flex items-center justify-center gap-3 overflow-hidden">
                                <Linkedin size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="relative w-64 h-64 md:w-96 md:h-96 rounded-2xl p-1 bg-gradient-to-br from-white/20 via-white/5 to-transparent backdrop-blur-3xl shadow-[0_0_50px_rgba(6,182,212,0.1)] overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-60 z-10"></div>
                            <div className="absolute inset-0 border border-white/10 rounded-2xl z-20 pointer-events-none"></div>
                            {/* Scanner line effect on hover */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#06b6d4] shadow-[0_0_10px_#06b6d4] opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_ease-in-out_infinite] z-30"></div>
                            <img src="/assets/tushar_photo.jpg" alt="Identity Confirmation" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 relative z-0" />

                            <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-1">
                                <span className="text-[10px] font-mono text-[#06b6d4] uppercase tracking-widest">ID: TW-994</span>
                                <span className="text-xs font-mono text-white uppercase tracking-widest flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> ONLINE</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* MODULE 2 - IDENTITY CORE */}
            <section className="w-full">
                <GlassModule title="MODULE 02 // IDENTITY CORE">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 text-base md:text-lg font-light leading-relaxed text-justify text-slate-300 text-justify space-y-6">
                            <p>I am a Python and Front-End developer with a strong foundation in AI, machine learning, and modern web development. My academic background in Information Technology is supported by practical experience in developing real-world, end-to-end solutions. I have built and deployed machine learning applications using Python, TensorFlow, PyTorch, Streamlit, and Flask—delivering both deep learning models (for audio, image, and text data) and practical web interfaces.</p>
                            <p>My projects include an award-winning bird species identifier (combining neural networks for sound and image) and a full-stack text-to-image generation platform leveraging Stable Diffusion XL. I am skilled at translating data science and AI models into user-friendly applications by integrating cloud tools (Kaggle, Colab), public-facing dashboards, and high-quality user experiences with HTML and CSS.</p>
                            <p>My work style is hands-on, research-driven, and focused on building scalable, reliable systems ready for real user feedback. Eager to join a dynamic, collaborative team, I am looking to grow further as a developer—especially in roles that combine Python, AI, and innovative frontend technologies.</p>
                        </div>
                        <div className="lg:col-span-1 border-l border-white/10 pl-8 space-y-8 flex flex-col justify-center">
                            <div>
                                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#06b6d4] font-mono mb-2">Location</span>
                                <span className="text-lg text-white font-medium">Indore, India</span>
                            </div>
                            <div>
                                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#06b6d4] font-mono mb-2">Email</span>
                                <a href="mailto:tusharwashishtha2@gmail.com" className="text-lg text-white font-medium hover:text-[#3b82f6] transition-colors break-all">tusharwashishtha2@gmail.com</a>
                            </div>
                            <div>
                                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#06b6d4] font-mono mb-2">Phone</span>
                                <span className="text-lg text-white font-medium">+91 7000308463</span>
                            </div>
                        </div>
                    </div>
                </GlassModule>
            </section>

            {/* MODULE 3 - KNOWLEDGE STACK */}
            <section className="w-full">
                <div className="grid lg:grid-cols-2 gap-8">
                    <GlassModule title="MODULE 03A // EDUCATION STACK" delay={0.1}>
                        <div className="space-y-6 relative border-l border-white/10 pl-6">
                            {[
                                { title: "Bachelors in Information Technology", meta: "Malwa Institute of Technology, Indore", grade: "CGPA: 6.70" },
                                { title: "12th Science", meta: "Motherland School, Indore", grade: "67%" },
                                { title: "10th", meta: "Little Wonders Convent School, Indore", grade: "65%" },
                            ].map((ed, i) => (
                                <div key={i} className="relative group">
                                    <div className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-slate-700 group-hover:bg-[#06b6d4] transition-colors shadow-[0_0_10px_rgba(6,182,212,0)] group-hover:shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                                    <h3 className="text-lg text-white font-medium">{ed.title}</h3>
                                    <p className="text-sm text-slate-400 mb-1">{ed.meta}</p>
                                    <span className="inline-block text-xs font-mono text-[#3b82f6] bg-[#3b82f6]/10 px-2 py-1 rounded">{ed.grade}</span>
                                </div>
                            ))}
                        </div>
                    </GlassModule>

                    <GlassModule title="MODULE 03B // SYSTEM CERTIFICATIONS" delay={0.2}>
                        <div className="space-y-4">
                            {CERTS.map((cert, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/5 hover:border-[#06b6d4]/30 hover:bg-[#06b6d4]/5 transition-colors cursor-pointer group"
                                    onClick={() => setModalImg(cert.img)}
                                >
                                    <img src={cert.img} alt={cert.label} className="w-8 h-8 rounded object-cover border border-white/20" />
                                    <span className="text-sm text-slate-200 group-hover:text-white transition-colors">{cert.label}</span>
                                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[10px] font-mono text-[#06b6d4] uppercase tracking-widest border border-[#06b6d4]/30 px-2 py-1 rounded">Verified</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassModule>
                </div>
            </section>

            {/* MODULE 4 - CAPABILITY ENGINE */}
            <section className="w-full">
                <GlassModule title="MODULE 04 // CAPABILITY ENGINE">
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { icon: <Cpu />, title: "AI/ML Model Prototyping (Audio, Image, Text)", desc: "Building deep learning architectures using PyTorch and TensorFlow for multi-modal classification and generative synthesis." },
                            { icon: <Layout />, title: "Interactive Python Web Apps (HTML/CSS/Streamlit/Flask)", desc: "Creating robust RESTful APIs with Flask and highly interactive, data-driven interfaces using Streamlit." },
                            { icon: <Server />, title: "Data Science & Model Inference on Cloud Platforms", desc: "Leveraging cloud GPU acceleration (Kaggle, Colab) and tunneling (Ngrok) for scalable AI model inference." },
                            { icon: <Code2 />, title: "Modern Front-End Prototyping (HTML, CSS, JavaScript)", desc: "Executing premium, high-budget UI/UX designs into responsive, pixel-perfect layouts without relying strictly on templates." }
                        ].map((cap, i) => (
                            <div key={i} className="p-6 bg-white/[0.02] border border-white/5 hover:border-[#3b82f6]/30 hover:bg-[#3b82f6]/5 transition-all rounded-xl group cursor-default">
                                <div className="text-slate-500 group-hover:text-[#3b82f6] mb-4 transition-colors">
                                    {cap.icon}
                                </div>
                                <h3 className="text-lg text-white font-medium mb-3">{cap.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed text-justify group-hover:text-slate-300 transition-colors">{cap.desc}</p>
                            </div>
                        ))}
                    </div>
                </GlassModule>
            </section>

            {/* MODULE 5 - SKILL MATRIX */}
            <section className="w-full">
                <GlassModule title="MODULE 05 // SKILL MATRIX" className="text-center overflow-visible">
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { name: "Python", desc: "Core scripting & backend engine." },
                            { name: "Streamlit", desc: "Rapid data-app prototyping UI." },
                            { name: "HTML5 & CSS3", desc: "Structural & visual markup." },
                            { name: "Flask", desc: "RESTful web micro-framework." },
                            { name: "TensorFlow & PyTorch", desc: "Deep learning model frameworks." },
                            { name: "Kaggle & Colab", desc: "Cloud GPU environments." },
                            { name: "Stable Diffusion XL", desc: "Generative AI image synthesis." },
                            { name: "GitHub", desc: "Version control & collaboration." }
                        ].map((skill, i) => (
                            <div
                                key={i}
                                className={`
                    relative p-4 rounded-xl border transition-all duration-300 cursor-pointer text-left w-full md:w-[calc(33%-1rem)] lg:w-[calc(25%-1rem)]
                    ${activeSkill === i ? 'bg-[#06b6d4]/10 border-[#06b6d4] scale-105 shadow-[0_0_20px_rgba(6,182,212,0.2)] z-10' : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}
                  `}
                                onClick={() => setActiveSkill(activeSkill === i ? null : i)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-1.5 h-1.5 rounded-full ${activeSkill === i ? 'bg-[#06b6d4] shadow-[0_0_5px_#06b6d4]' : 'bg-slate-600'}`}></div>
                                    <span className="text-sm font-medium text-white">{skill.name}</span>
                                </div>
                                <AnimatePresence>
                                    {activeSkill === i && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-3 pt-3 border-t border-[#06b6d4]/20 text-xs text-[#06b6d4] font-mono tracking-wide"
                                        >
                                            {skill.desc}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </GlassModule>
            </section>

            {/* MODULE 6 - INTELLIGENCE LABS */}
            <section id="labs" className="w-full">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-light text-white tracking-wide">INTELLIGENCE LABS</h2>
                    <div className="flex gap-2">
                        <div className="w-1.5 h-6 bg-[#06b6d4]/50"></div>
                        <div className="w-1.5 h-6 bg-[#06b6d4]"></div>
                        <div className="w-1.5 h-6 bg-white"></div>
                    </div>
                </div>

                <div className="space-y-12">
                    {PROJECTS.map((lab, i) => (
                        <GlassModule key={i} title={`LAB 0${i + 1} // ACTIVE MONITOR`} className="border-t-2 border-t-[#3b82f6]">
                            <div className="flex flex-col lg:flex-row gap-12">
                                <div className="w-full lg:w-1/3">
                                    <div className="aspect-[4/3] bg-[#0a0a0c] rounded-lg border border-white/10 relative overflow-hidden group flex items-center justify-center">
                                        {/* Grid overlay for "monitor" feel */}
                                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDE5aDIwTTE5IDB2MjAiIHN0cm9rZT0icmdiYSsyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] z-10 pointer-events-none mix-blend-screen"></div>
                                        {/* Scanline */}
                                        <div className="absolute top-0 left-0 w-full h-[15%] bg-gradient-to-b from-transparent via-[#06b6d4]/10 to-transparent animate-[scan_3s_linear_infinite] z-20 pointer-events-none"></div>

                                        {lab.img1 ? (
                                            <img src={lab.img1} alt={lab.title} onClick={() => setModalImg(lab.img1)} className="cursor-pointer absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 duration-500" />
                                        ) : lab.images ? (
                                            <img src={lab.images[0]} alt={lab.title} onClick={() => setModalImg(lab.images[0])} className="cursor-pointer absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 duration-500" />
                                        ) : (
                                            <span className="text-slate-600 font-mono text-sm tracking-widest z-0 group-hover:text-[#06b6d4] transition-colors relative">MONITOR_OFFLINE // DATA</span>
                                        )}

                                        <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay pointer-events-none"></div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-2/3 space-y-6">
                                    <h3 className="text-3xl text-white font-medium">{lab.title}</h3>

                                    <div className="grid sm:grid-cols-2 gap-6 bg-black/20 p-6 rounded-xl border border-white/5">
                                        <div className="sm:col-span-2">
                                            <span className="block text-[10px] uppercase tracking-[0.2em] text-[#06b6d4] font-mono mb-2 border-b border-white/10 pb-1">System Objective</span>
                                            <p className="text-sm text-slate-300 leading-relaxed text-justify">{lab.desc}</p>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <span className="block text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-mono mb-2 border-b border-white/10 pb-1">Core Architecture Highlights</span>
                                            <p className="text-sm text-slate-300">{lab.key}</p>
                                        </div>
                                    </div>

                                    <div className="inline-block mt-4">
                                        <span className="text-xs font-mono text-[#3b82f6] px-4 py-2 bg-[#3b82f6]/10 border border-[#3b82f6]/30 rounded-full drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                                            <strong className="text-white mr-2">Tech Stack:</strong> {lab.tech}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </GlassModule>
                    ))}
                </div>
            </section>

            {/* MODULE 7 - COMMUNICATION GATEWAY */}
            <section id="contact" className="w-full max-w-3xl pb-20">
                <GlassModule title="MODULE 07 // SECURE COMMUNICATION GATEWAY">
                    <div className="flex flex-col items-center mb-10 text-center">
                        <ShieldCheckIcon className="w-12 h-12 text-[#06b6d4] mb-4" />
                        <h2 className="text-2xl text-white font-medium mb-2">INITIATE SECURE LINK</h2>
                        <p className="text-sm text-slate-400">Directly interface with the system operator.</p>
                    </div>

                    <form className="space-y-6" action="https://formsubmit.co/tusharwashishtha2@gmail.com" method="POST">
                        {/* Auto-response and spam config */}
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="text" name="_honey" style={{ display: 'none' }} />
                        <input type="hidden" name="_subject" value="New Interface Transmission via TW.AI Portfolio" />

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-[#06b6d4] font-mono">Operator ID (Name)</label>
                                <input type="text" name="name" required className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#06b6d4] transition-colors" placeholder="e.g. Guest_402" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-[#06b6d4] font-mono">Return Vector (Email)</label>
                                <input type="email" name="email" required className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#06b6d4] transition-colors" placeholder="system@domain.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#06b6d4] font-mono">Encrypted Payload (Message)</label>
                            <textarea name="message" required rows={4} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#06b6d4] transition-colors resize-none" placeholder="Enter transmission data..."></textarea>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button type="submit" className="group relative px-8 py-4 bg-[#06b6d4] text-black font-semibold tracking-widest uppercase rounded-lg hover:bg-white transition-all overflow-hidden">
                                <span className="relative z-10 flex items-center gap-2">Send Message to System <ChevronRight size={18} /></span>
                            </button>
                        </div>
                    </form>
                </GlassModule>
            </section>

            {/* FOOTER */}
            <footer className="w-full py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-slate-500 uppercase tracking-widest">
                <span>TW.AI SYSTEM CORE v1.0.0</span>
                <span>[ STATUS: ONLINE ]</span>
            </footer>

            {/* FULLSCREEN EXAMINE MODAL */}
            <AnimatePresence>
                {modalImg && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0c]/90 p-6"
                        onClick={() => setModalImg(null)}
                    >
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0, borderRadius: "5rem" }}
                            animate={{ scale: 1, opacity: 1, borderRadius: "0.5rem" }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            src={modalImg}
                            className="max-w-full max-h-[90vh] shadow-[0_0_50px_rgba(6,182,212,0.2)] object-contain border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button className="absolute top-10 right-10 text-slate-500 hover:text-white hover:rotate-90 transition-all duration-500">
                            <X size={40} strokeWidth={1} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    )
}

function ShieldCheckIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}
