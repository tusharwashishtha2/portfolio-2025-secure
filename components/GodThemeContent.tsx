"use client"
import React, { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { Terminal, Activity, Eye, Cpu, Database, Network, ChevronRight, X, Download, Shield, Zap, Code2, Link, Layers } from "lucide-react"
import { SKILLS, EDUCATION, PROJECTS, CERTS } from "@/lib/data"
import { handleResumeDownload } from "@/lib/utils"

// --- Global Constants & Helper Components ---

const SystemText = ({ children, delay = 0, speed = 0.05, className = "" }: { children: string, delay?: number, speed?: number, className?: string }) => {
    const [text, setText] = useState("")

    useEffect(() => {
        let currentText = ""
        let currentIndex = 0
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (currentIndex < children.length) {
                    currentText += children[currentIndex]
                    setText(currentText)
                    currentIndex++
                } else {
                    clearInterval(interval)
                }
            }, speed * 1000)
            return () => clearInterval(interval)
        }, delay * 1000)
        return () => clearTimeout(timeout)
    }, [children, delay, speed])

    return (
        <span className={`${className} font-mono relative`}>
            {text}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 sm:w-3 h-4 sm:h-5 bg-cyan-400 ml-1 translate-y-1"
            />
        </span>
    )
}

// 3D Tilt Card Component mapping cursor position
const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`perspective-1000 relative w-full ${className}`}
        >
            <motion.div style={{ transform: "translateZ(30px)" }} className="w-full h-full relative z-10 pointer-events-none">
                {children}
            </motion.div>
        </motion.div>
    )
}

export default function GodThemeContent() {
    const [bootPhase, setBootPhase] = useState(0)
    const [modalImg, setModalImg] = useState<string | null>(null)

    // Global tension track to pass into UI rendering (mimics the canvas logic)
    const [globalTension, setGlobalTension] = useState(0)
    const lastPos = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleTension = (e: MouseEvent) => {
            const dx = e.clientX - lastPos.current.x
            const dy = e.clientY - lastPos.current.y
            const speed = Math.sqrt(dx * dx + dy * dy)
            if (speed > 5) {
                setGlobalTension(prev => Math.min(1, prev + 0.05))
            }
            lastPos.current = { x: e.clientX, y: e.clientY }
        }

        const decayTimer = setInterval(() => {
            setGlobalTension(prev => Math.max(0, prev - 0.02))
        }, 50)

        window.addEventListener('mousemove', handleTension)
        return () => {
            window.removeEventListener('mousemove', handleTension)
            clearInterval(decayTimer)
        }
    }, [])

    useEffect(() => {
        if (bootPhase === 0) {
            setTimeout(() => setBootPhase(1), 1500)
            setTimeout(() => setBootPhase(2), 2500)
            setTimeout(() => setBootPhase(3), 3500) // Hero ready
            setTimeout(() => setBootPhase(4), 5000) // All modules ready
        }
    }, [bootPhase])

    return (
        <div className="relative z-10 text-cyan-50 min-h-screen selection:bg-cyan-500/30 overflow-x-hidden">

            {/* Global Distortion Overlay responding to tension */}
            <motion.div
                className="fixed inset-0 pointer-events-none mix-blend-screen opacity-10"
                animate={{
                    filter: `blur(${globalTension * 10}px)`,
                    scale: 1 + globalTension * 0.05
                }}
            />

            <main className="container mx-auto px-6 pt-16 pb-24 flex flex-col gap-32">

                {/* HERO SYSTEM */}
                <section className="min-h-[85vh] flex flex-col justify-center relative mb-12">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 w-full">
                        <motion.div className="flex flex-col gap-4 max-w-3xl w-full lg:w-3/5">

                            {/* Status Readout moved above the name */}
                            <div className="flex flex-col text-[10px] sm:text-xs text-cyan-400 font-mono tracking-widest border-l-2 border-cyan-500/30 pl-4 py-1 opacity-80 mb-2 mt-2 lg:mt-0">
                                {bootPhase >= 0 && <SystemText delay={0.2} speed={0.02}>&gt; INITIALIZING AWARENESS INTERFACE...</SystemText>}
                                {bootPhase >= 1 && <SystemText delay={0.2} speed={0.02}>&gt; LOADING SYNAPTIC PROFILE DATA...</SystemText>}
                                {bootPhase >= 2 && <SystemText delay={0.2} speed={0.02}>&gt; RENDERING INTELLIGENCE LAYER...</SystemText>}
                                {bootPhase >= 3 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 mt-1">[ SYSTEM ONLINE ]</motion.div>}
                            </div>

                            {/* Core Identity */}
                            {bootPhase >= 3 && (
                                <motion.div
                                    initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="space-y-3"
                                >

                                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-slate-500 break-words">
                                        TUSHAR
                                        <br />
                                        WASHISHTHA
                                    </h1>

                                    <div className="space-y-2 font-mono text-sm sm:text-base lg:text-lg text-cyan-200/80 border-l border-white/20 pl-6 relative">
                                        <SystemText delay={0.5} speed={0.03} className="block">Entry-Level Front-End & Python Developer</SystemText>
                                        <SystemText delay={2.5} speed={0.03} className="block">Passionate about Web & AI</SystemText>
                                        <SystemText delay={4.0} speed={0.03} className="block">Ready to Learn and Collaborate</SystemText>

                                        {/* AI Focus Block */}
                                        {bootPhase >= 4 && (
                                            <motion.div
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
                                                className="mt-6 p-4 sm:p-6 bg-black/40 border border-cyan-500/20 backdrop-blur-xl rounded-xl relative overflow-hidden group"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                                <p className="text-justify text-slate-300 leading-relaxed font-sans text-sm sm:text-base italic relative z-10">
                                                    “I specialize in building projects using modern <strong className="text-cyan-400 font-normal">AI-assisted development</strong>,
                                                    focusing on problem-solving, debugging,
                                                    and delivering <strong className="text-cyan-400 font-normal">working solutions</strong> rather than
                                                    just writing code line-by-line.”
                                                </p>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Profile Image Layer */}
                        {bootPhase >= 3 && (
                            <motion.div
                                initial={{ opacity: 0, filter: "blur(20px)", scale: 0.8 }}
                                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                className="w-full lg:w-2/5 flex justify-center lg:justify-end order-last mt-6 lg:mt-0"
                            >
                                <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border border-cyan-500/30 shadow-[0_0_80px_rgba(34,211,238,0.15)] group">
                                    <div className="absolute inset-0 bg-cyan-500/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                                    <img
                                        src="/assets/tushar_photo.jpg"
                                        alt="Tushar Washishtha"
                                        className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-105 group-hover:scale-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent -translate-y-[150%] group-hover:animate-[scan_2s_ease-in-out_infinite] pointer-events-none z-20" />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* MODULES (Appear after boot) */}
                {bootPhase >= 4 && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
                        className="flex flex-col gap-32"
                    >

                        {/* ABOUT PANEL */}
                        <section className="relative">
                            <div className="flex items-center gap-4 mb-12 border-b border-cyan-500/20 pb-4">
                                <Cpu className="text-cyan-400" />
                                <h2 className="text-2xl font-mono tracking-[0.2em] uppercase text-cyan-50">Identity Module</h2>
                            </div>

                            <motion.div
                                className="bg-black/40 border border-white/10 p-8 sm:p-12 backdrop-blur-2xl rounded-2xl relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                                animate={{ borderColor: `rgba(255,255,255,${0.1 + globalTension * 0.2})` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-50" />

                                <div className="relative z-10 text-justify text-lg sm:text-xl font-light leading-[1.8] text-slate-300 space-y-8">
                                    <p>
                                        I operate at the intersection of structural engineering and creative logic. My foundation is built on
                                        <strong className="text-white font-medium mx-1">HTML5</strong> and <strong className="text-white font-medium mx-1">CSS3</strong>.
                                        However, I view <strong className="text-white font-medium mx-1">JavaScript</strong> as the nervous system—it breathes life into the static grid, transforming layouts into interactive experiences.
                                    </p>
                                    <p>
                                        Beyond the browser, my thinking is powered by <strong className="text-white font-medium mx-1">Python</strong>.
                                        I use it to solve complex challenges, architect robust backends with <strong className="text-white font-medium mx-1">Flask</strong>, and experiment deeply with
                                        <strong className="text-white font-medium mx-1">AI & Machine Learning</strong>. The logic remains consistent, regardless of the stack.
                                    </p>
                                    <p>
                                        I am a builder by nature. My philosophy is uncompromisingly simple: learn by doing, aggressively tear systems down to understand their raw mechanics, and write code that is meticulously clean and highly functional.
                                    </p>
                                </div>
                            </motion.div>
                        </section>

                        {/* EDUCATION TIMELINE */}
                        <section>
                            <div className="flex items-center gap-4 mb-12 border-b border-cyan-500/20 pb-4">
                                <Database className="text-cyan-400" />
                                <h2 className="text-2xl font-mono tracking-[0.2em] uppercase text-cyan-50">Academic Archive</h2>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-6">
                                {EDUCATION.map((ed, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="bg-[#050810]/80 border border-cyan-900/50 p-8 rounded-xl backdrop-blur-md relative group overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                                        <span className="text-cyan-500 font-mono text-xs tracking-widest block mb-4">RECORD 0{i + 1}</span>
                                        <h3 className="text-xl font-bold text-white mb-2 leading-tight">{ed.title}</h3>
                                        <p className="text-sm font-mono text-cyan-200/60 mb-6">{ed.meta}</p>
                                        <p className="text-slate-400 text-sm leading-relaxed text-justify">{ed.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* SKILLS */}
                        <section>
                            <div className="flex items-center gap-4 mb-12 border-b border-cyan-500/20 pb-4">
                                <Activity className="text-cyan-400" />
                                <h2 className="text-2xl font-mono tracking-[0.2em] uppercase text-cyan-50">Capability Matrix</h2>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {SKILLS.map((skill, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.05, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                                        className="border border-white/5 bg-black/20 p-6 rounded-lg backdrop-blur-sm flex flex-col gap-2 relative overflow-hidden group transition-colors duration-300 hover:border-cyan-500/50"
                                    >
                                        <span className="text-lg font-bold text-white relative z-10">{skill.name}</span>
                                        <span className="text-xs font-mono text-cyan-400/70 uppercase tracking-wider relative z-10">{skill.desc}</span>

                                        {/* Hover scanning effect */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent -translate-y-[150%] group-hover:animate-[scan_2s_ease-in-out_infinite]" />
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* PROJECTS */}
                        <section>
                            <div className="flex items-center gap-4 mb-12 border-b border-cyan-500/20 pb-4">
                                <Network className="text-cyan-400" />
                                <h2 className="text-2xl font-mono tracking-[0.2em] uppercase text-cyan-50">Execution Logs</h2>
                            </div>

                            <div className="space-y-16">
                                {PROJECTS.map((project, i) => (
                                    <TiltCard key={i}>
                                        <div className="bg-[#030508]/90 border border-cyan-900/40 rounded-2xl overflow-hidden backdrop-blur-2xl shadow-2xl flex flex-col lg:flex-row group w-full pointer-events-auto cursor-crosshair">

                                            {/* Media Panel */}
                                            <div className="w-full lg:w-2/5 border-b lg:border-b-0 lg:border-r border-cyan-900/40 relative h-64 lg:h-auto overflow-hidden">
                                                <div
                                                    className="absolute inset-0 opacity-40 mix-blend-screen scale-110 transition-transform duration-1000 group-hover:scale-100 group-hover:opacity-100"
                                                    style={{
                                                        backgroundImage: `url(${project.img1 || project.images?.[0]})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center'
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#030508] to-transparent opacity-80" />
                                                <button
                                                    onClick={() => setModalImg(project.img1 || project.images?.[0] || null)}
                                                    className="absolute bottom-6 left-6 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 hover:text-white bg-black/50 px-4 py-2 rounded-full border border-cyan-500/30 backdrop-blur-md"
                                                >
                                                    <Eye size={14} /> View Artifact
                                                </button>
                                            </div>

                                            {/* Data Panel */}
                                            <div className="w-full lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                                                <div className="text-xs font-mono text-cyan-500 tracking-widest mb-4 flex items-center gap-3">
                                                    <Terminal size={14} /> LOG_INDEX: 00{i + 1}
                                                </div>
                                                <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">{project.title}</h3>

                                                <p className="text-slate-300 text-base leading-relaxed text-justify mb-8 pb-8 border-b border-white/5">
                                                    {project.desc}
                                                </p>

                                                <div className="flex flex-col sm:flex-row justify-between gap-6">
                                                    <div>
                                                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Core Tech</span>
                                                        <span className="text-cyan-300 text-sm font-medium">{project.tech}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Key Descriptors</span>
                                                        <span className="text-slate-400 text-sm italic">{project.key}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Hover Glow using global tension for intensity */}
                                            <motion.div
                                                className="absolute inset-0 rounded-2xl pointer-events-none border border-cyan-400/0 transition-colors duration-500"
                                                animate={{ borderColor: `rgba(34, 211, 238, ${globalTension * 0.5})` }}
                                            />
                                        </div>
                                    </TiltCard>
                                ))}
                            </div>
                        </section>

                        {/* CERTIFICATIONS */}
                        <section>
                            <div className="flex items-center gap-4 mb-12 border-b border-cyan-500/20 pb-4">
                                <Shield className="text-cyan-400" />
                                <h2 className="text-2xl font-mono tracking-[0.2em] uppercase text-cyan-50">Security & Credentials</h2>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                                {CERTS.map((cert, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setModalImg(cert.img)}
                                        className="bg-black/40 border border-white/5 p-4 rounded-xl cursor-pointer group hover:bg-white/5 hover:border-cyan-500/30 transition-all duration-300 text-center flex flex-col items-center justify-center min-h-[120px]"
                                    >
                                        <Shield className="text-slate-600 group-hover:text-cyan-400 mb-3 transition-colors" size={24} />
                                        <span className="text-xs font-mono uppercase tracking-widest text-slate-400 group-hover:text-cyan-50">{cert.label}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* CONTACT & EXPORT */}
                        <section className="mb-24">
                            <div className="bg-gradient-to-br from-[#050a10] to-black border border-cyan-900/50 p-8 sm:p-16 rounded-3xl relative overflow-hidden backdrop-blur-2xl text-center flex flex-col items-center shadow-2xl">

                                <Zap className="text-cyan-400 mb-6 w-12 h-12" />

                                <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mb-4">
                                    Initiate Transmission
                                </h2>

                                <p className="text-slate-400 font-mono text-sm sm:text-base max-w-xl mx-auto mb-12">
                                    SYSTEM READY AWAITING HANDSHAKE PROTOCOL. DIRECT SECURE LINK OPEN FOR OPPORTUNITIES.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center gap-6 w-full max-w-lg">
                                    <a
                                        href="mailto:tusharw@example.com"
                                        className="flex-1 w-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono tracking-widest text-sm uppercase py-4 rounded-lg transition-colors flex items-center justify-center gap-3"
                                    >
                                        Transmit Mail
                                    </a>
                                    <a
                                        href="/assets/Tushar_Washishtha_Resume_Fixed.pdf"
                                        download="Tushar_Washishtha_Resume_Fixed.pdf"
                                        onClick={handleResumeDownload}
                                        className="flex-1 w-full bg-cyan-500 text-black hover:bg-white border border-transparent font-mono tracking-widest font-bold text-sm uppercase py-4 rounded-lg transition-colors flex items-center justify-center gap-3 group"
                                    >
                                        <Download className="group-hover:animate-bounce" size={18} /> Export Profile
                                    </a>
                                </div>
                            </div>
                        </section>

                    </motion.div>
                )}
            </main>

            {/* FULLSCREEN MODAL OVERLAY */}
            <AnimatePresence>
                {modalImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setModalImg(null)}
                        className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
                    >
                        <button
                            className="absolute top-6 right-6 text-white hover:text-cyan-400 transition-colors z-50 bg-black/50 p-3 rounded-full border border-white/10"
                            onClick={(e) => { e.stopPropagation(); setModalImg(null) }}
                        >
                            <X size={24} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            src={modalImg}
                            alt="Fullscreen Modal Content"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg border border-white/10 shadow-2xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}
