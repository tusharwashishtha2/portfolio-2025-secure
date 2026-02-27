'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, X, ZoomIn, Download, ChevronRight } from 'lucide-react'
import { SKILLS, EDUCATION, PROJECTS, CERTS } from "@/lib/data"
import { handleResumeDownload } from "@/lib/utils"

// Typewriter Utility
const TypewriterText = ({ text, delay = 0, speed = 0.05, className = "", onComplete, glitch = false }: { text: string, delay?: number, speed?: number, className?: string, onComplete?: () => void, glitch?: boolean }) => {
    const [displayedText, setDisplayedText] = useState('')

    useEffect(() => {
        let timeout: NodeJS.Timeout
        let currentIndex = 0

        const typeChar = () => {
            if (currentIndex <= text.length) {
                // Glitch effect: occasionally show random characters
                if (glitch && Math.random() < 0.1 && currentIndex < text.length) {
                    const chars = "!@#$%^&*"
                    setDisplayedText(text.slice(0, currentIndex) + chars[Math.floor(Math.random() * chars.length)])
                    timeout = setTimeout(typeChar, 30) // fast glitch
                } else {
                    setDisplayedText(text.slice(0, currentIndex))
                    currentIndex++
                    timeout = setTimeout(typeChar, speed * 1000)
                }
            } else if (onComplete) {
                onComplete()
            }
        }

        const startDelay = setTimeout(typeChar, delay * 1000)

        return () => {
            clearTimeout(timeout)
            clearTimeout(startDelay)
        }
    }, [text, delay, speed, onComplete, glitch])

    return <span className={className}>{displayedText}</span>
}


export default function AliveThemeContent() {
    const [systemState, setSystemState] = useState<'boot' | 'welcome' | 'active'>('boot')
    const [bootPhase, setBootPhase] = useState(0)

    // Focus tracking for spatial navigation
    // null = zoomed out / central view
    const [focusArea, setFocusArea] = useState<string | null>(null)
    const [selectedProject, setSelectedProject] = useState<any>(null)
    const [modalImg, setModalImg] = useState<string | null>(null)

    // Track mouse for parallax or interactive hover effects
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20, // -10 to 10
                y: (e.clientY / window.innerHeight - 0.5) * 20
            })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    useEffect(() => {
        if (systemState === 'boot') {
            const t1 = setTimeout(() => setBootPhase(1), 1000) // CORE
            const t2 = setTimeout(() => setBootPhase(2), 2000) // SCANNING
            const t3 = setTimeout(() => setBootPhase(3), 3000) // UNKNOWN
            const t4 = setTimeout(() => {
                setSystemState('welcome')
            }, 4500)

            return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
        }

        if (systemState === 'welcome') {
            const t5 = setTimeout(() => {
                setSystemState('active')
            }, 2500)
            return () => clearTimeout(t5)
        }
    }, [systemState])


    return (
        <div className="fixed inset-0 z-10 overflow-hidden font-mono text-cyan-50 selection:bg-cyan-500/30">

            {/* BOOT SEQUENCE */}
            <AnimatePresence>
                {systemState === 'boot' && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50"
                    >
                        <div className="w-full max-w-lg px-8 flex flex-col gap-4 text-cyan-500 tracking-widest text-sm sm:text-base">
                            {bootPhase >= 0 && <TypewriterText text="> INITIALIZING CORE..." />}
                            {bootPhase >= 1 && <TypewriterText text="> SCANNING USER..." delay={0} />}
                            {bootPhase >= 2 && <TypewriterText text="> IDENTITY UNKNOWN..." delay={0} />}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* WELCOME SEQUENCE */}
            <AnimatePresence>
                {systemState === 'welcome' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
                    >
                        <h1 className="text-2xl sm:text-4xl md:text-6xl text-white font-light tracking-[0.2em] text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] uppercase">
                            WELCOME TO THE SYSTEM
                        </h1>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ACTIVE SPATIAL SYSTEM */}
            <AnimatePresence>
                {systemState === 'active' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        className="absolute inset-0 pointer-events-none"
                    >

                        {/* THE SPATIAL UNIVERSE */}
                        <motion.div
                            className="absolute inset-0 transition-transform duration-1000 ease-out pointer-events-auto"
                            animate={{
                                scale: focusArea === null ? 1 : 1,
                                x: 0,
                                y: 0,
                            }}
                        >
                            {/* --- CENTER: IDENTITY MODULE --- */}
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-6 flex flex-col items-center justify-center cursor-pointer group"
                                animate={{ opacity: focusArea === null || focusArea === 'identity' ? 1 : 0 }}
                                style={{ pointerEvents: focusArea === null || focusArea === 'identity' ? 'auto' : 'none' }}
                                onClick={() => focusArea === null && setFocusArea('identity')}
                            >
                                <div className="text-center space-y-6">
                                    <div className="space-y-2">
                                        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-500">
                                            <TypewriterText text="I am Tushar Washishtha" speed={0.03} glitch={true} />
                                        </h1>
                                        {focusArea === 'identity' && (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-col gap-2 text-sm sm:text-lg text-cyan-200/60 font-mono items-center mt-4">
                                                <span>Entry-Level Front-End & Python Developer</span>
                                                <span>Passionate about Web & AI</span>
                                                <span>Ready to Learn and Collaborate</span>
                                            </motion.div>
                                        )}
                                    </div>

                                    {focusArea === 'identity' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 1 }}
                                            className="max-w-2xl mx-auto border-l-2 border-cyan-500/50 pl-6 text-left mt-8 bg-black/40 p-6 rounded-r-xl backdrop-blur-md relative"
                                        >
                                            <p className="text-transparent text-sm sm:text-base leading-relaxed italic text-justify w-full select-none">
                                                “I specialize in building projects using modern AI-assisted development, focusing on problem-solving, debugging, and delivering working solutions rather than just writing code line-by-line.”
                                            </p>
                                            <p className="absolute inset-y-6 inset-x-6 pl-6 text-cyan-50 text-sm sm:text-base leading-relaxed italic text-justify pointer-events-none">
                                                <TypewriterText text="“I specialize in building projects using modern AI-assisted development, focusing on problem-solving, debugging, and delivering working solutions rather than just writing code line-by-line.”" delay={2} speed={0.01} glitch={true} />
                                            </p>
                                        </motion.div>
                                    )}

                                    {focusArea === null && (
                                        <div className="text-cyan-300 font-bold text-xs sm:text-sm tracking-[0.3em] uppercase animate-pulse mt-8 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                                            [ SYSTEM IDLE ]
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* --- EDUCATION DATA --- */}
                            <motion.div
                                className={`absolute group cursor-pointer transition-all duration-700 ease-in-out ${focusArea === 'education' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] md:w-[70vw] max-w-4xl px-4' : 'top-[15%] left-[5%] sm:left-[15%] z-10 max-w-[42vw] sm:max-w-none sm:w-64'}`}
                                animate={{ opacity: focusArea === null || focusArea === 'education' ? 1 : 0 }}
                                style={{ pointerEvents: focusArea === null || focusArea === 'education' ? 'auto' : 'none' }}
                                onClick={() => focusArea === null && setFocusArea('education')}
                            >
                                <div className={`text-cyan-400 font-bold tracking-[0.2em] mb-4 border-b border-cyan-500/30 pb-2 ${focusArea === 'education' ? 'text-center text-lg sm:text-xl border-cyan-400/60' : 'text-[10px] sm:text-sm text-left group-hover:text-cyan-300 group-hover:border-cyan-400'}`}>DATA_NODE: ACADEMICS</div>
                                {focusArea === 'education' && (
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 mt-6 bg-black/60 border border-cyan-500/30 px-6 pt-6 pb-24 sm:px-10 sm:pt-10 sm:pb-28 rounded-2xl backdrop-blur-xl max-h-[70vh] overflow-y-auto w-full pointer-events-auto">
                                        {EDUCATION.map((ed, i) => (
                                            <div key={i} className="bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-xl hover:border-cyan-400/50 transition-colors w-full">
                                                <h3 className="text-white font-bold text-lg">{ed.title}</h3>
                                                <p className="text-cyan-400 text-xs mt-1 mb-3">{ed.meta}</p>
                                                <p className="text-cyan-100/70 text-sm leading-relaxed">{ed.desc}</p>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* --- SKILLS MATRIX --- */}
                            <motion.div
                                className={`absolute group cursor-pointer transition-all duration-700 ease-in-out ${focusArea === 'skills' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] md:w-[70vw] max-w-4xl px-4' : 'top-[15%] right-[5%] sm:right-[15%] z-10 max-w-[42vw] sm:max-w-none sm:w-64'}`}
                                animate={{ opacity: focusArea === null || focusArea === 'skills' ? 1 : 0 }}
                                style={{ pointerEvents: focusArea === null || focusArea === 'skills' ? 'auto' : 'none' }}
                                onClick={() => focusArea === null && setFocusArea('skills')}
                            >
                                <div className={`text-cyan-400 font-bold tracking-[0.2em] mb-4 border-b border-cyan-500/30 pb-2 ${focusArea === 'skills' ? 'text-center text-lg sm:text-xl border-cyan-400/60' : 'text-[10px] sm:text-sm text-right group-hover:text-cyan-300 group-hover:border-cyan-400'}`}>SYSTEM_CAPABILITIES</div>
                                {focusArea === 'skills' && (
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 bg-black/60 border border-cyan-500/30 px-6 pt-6 pb-24 sm:px-10 sm:pt-10 sm:pb-28 rounded-2xl backdrop-blur-xl max-h-[70vh] overflow-y-auto w-full pointer-events-auto">
                                        {SKILLS.map((skill, i) => (
                                            <div key={i} className="flex flex-col bg-cyan-900/20 border border-cyan-500/20 p-4 rounded-xl relative overflow-hidden group/opt hover:border-cyan-400 transition-colors">
                                                <div className="absolute inset-0 bg-cyan-400/10 -translate-x-full group-hover/opt:translate-x-0 transition-transform duration-500" />
                                                <span className="text-white font-bold text-sm z-10">{skill.name}</span>
                                                <span className="text-cyan-500/70 text-[10px] uppercase tracking-wider z-10 mt-1">{skill.desc}</span>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* --- PROJECT PORTALS --- */}
                            <motion.div
                                className={`absolute group cursor-pointer transition-all duration-700 ease-in-out ${focusArea === 'projects' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] md:w-[70vw] max-w-4xl px-4' : 'bottom-[18%] sm:bottom-[15%] left-[5%] sm:left-[15%] z-10 max-w-[42vw] sm:max-w-none sm:w-64'}`}
                                animate={{ opacity: focusArea === null || focusArea === 'projects' ? 1 : 0 }}
                                style={{ pointerEvents: focusArea === null || focusArea === 'projects' ? 'auto' : 'none' }}
                                onClick={() => focusArea === null && setFocusArea('projects')}
                            >
                                <div className={`text-cyan-400 font-bold tracking-[0.2em] mb-4 border-b border-cyan-500/30 pb-2 ${focusArea === 'projects' ? 'text-center text-lg sm:text-xl border-cyan-400/60' : 'text-[10px] sm:text-sm text-left group-hover:text-cyan-300 group-hover:border-cyan-400'}`}>EXECUTION_PORTALS</div>
                                {focusArea === 'projects' && (
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 mt-6 bg-black/60 border border-cyan-500/30 px-6 pt-6 pb-24 sm:px-10 sm:pt-10 sm:pb-28 rounded-2xl backdrop-blur-xl max-h-[70vh] overflow-y-auto w-full pointer-events-auto">
                                        {PROJECTS.map((proj, i) => (
                                            <div
                                                key={i}
                                                onClick={(e) => { e.stopPropagation(); setSelectedProject(proj); }}
                                                className="group/portal bg-cyan-950/40 border border-cyan-500/30 p-6 rounded-xl hover:border-cyan-400 hover:bg-cyan-900/40 transition-all cursor-pointer flex justify-between items-center w-full"
                                            >
                                                <div>
                                                    <h3 className="text-white font-bold text-lg md:text-xl group-hover/portal:text-cyan-400 transition-colors">{proj.title}</h3>
                                                    <p className="text-cyan-500/60 text-sm mt-2">{proj.tech}</p>
                                                </div>
                                                <ChevronRight className="text-cyan-500/50 group-hover/portal:text-cyan-400 group-hover/portal:translate-x-2 transition-all w-6 h-6" />
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* --- VERIFICATION VAULT (CERTS) --- */}
                            <motion.div
                                className={`absolute group cursor-pointer transition-all duration-700 ease-in-out ${focusArea === 'certs' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] md:w-[70vw] max-w-4xl px-4' : 'bottom-[18%] sm:bottom-[15%] right-[5%] sm:right-[15%] z-10 max-w-[42vw] sm:max-w-none sm:w-64 text-right'}`}
                                animate={{ opacity: focusArea === null || focusArea === 'certs' ? 1 : 0 }}
                                style={{ pointerEvents: focusArea === null || focusArea === 'certs' ? 'auto' : 'none' }}
                                onClick={() => focusArea === null && setFocusArea('certs')}
                            >
                                <div className={`text-cyan-400 font-bold tracking-[0.2em] mb-4 border-b border-cyan-500/30 pb-2 ${focusArea === 'certs' ? 'text-center text-lg sm:text-xl border-cyan-400/60' : 'text-[10px] sm:text-sm text-right group-hover:text-cyan-300 group-hover:border-cyan-400'}`}>VERIFICATION_VAULT</div>
                                {focusArea === 'certs' && (
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 bg-black/60 border border-cyan-500/30 px-6 pt-6 pb-24 sm:px-10 sm:pt-10 sm:pb-28 rounded-2xl backdrop-blur-xl max-h-[70vh] overflow-y-auto w-full pointer-events-auto">
                                        {CERTS.map((cert, i) => (
                                            <div
                                                key={i}
                                                onClick={(e) => { e.stopPropagation(); setModalImg(cert.img); }}
                                                className="relative aspect-video bg-cyan-950/40 border border-cyan-500/30 rounded-xl overflow-hidden group/cert cursor-pointer hover:border-cyan-400 transition-colors"
                                            >
                                                <img src={cert.img} alt={cert.label} className="w-full h-full object-cover opacity-60 group-hover/cert:opacity-100 transition-opacity grayscale group-hover/cert:grayscale-0" />
                                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover/cert:opacity-100 transition-all">
                                                    <ZoomIn className="text-white mb-2" size={24} />
                                                    <span className="text-cyan-400 text-xs font-bold tracking-widest">{cert.label}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* --- SECURE COMMS (CONTACT) --- */}
                            <motion.div
                                className={`absolute group cursor-pointer transition-all duration-700 ease-in-out flex flex-col items-center ${focusArea === 'contact' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] md:w-[60vw] max-w-2xl px-4' : 'bottom-[3%] sm:bottom-[5%] left-1/2 -translate-x-1/2 z-10 w-48 sm:w-64'}`}
                                animate={{ opacity: focusArea === null || focusArea === 'contact' ? 1 : 0 }}
                                style={{ pointerEvents: focusArea === null || focusArea === 'contact' ? 'auto' : 'none' }}
                                onClick={() => focusArea === null && setFocusArea('contact')}
                            >
                                <div className={`text-cyan-400 font-bold tracking-[0.2em] mb-4 border-b border-cyan-500/30 pb-2 w-full text-center ${focusArea === 'contact' ? 'text-lg sm:text-xl border-cyan-400/60' : 'text-xs sm:text-sm group-hover:text-cyan-300 group-hover:border-cyan-400'}`}>SECURE_COMMS</div>
                                {focusArea === 'contact' && (
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap justify-center gap-6 mt-6 bg-black/60 border border-cyan-500/30 px-6 pt-6 pb-24 sm:px-10 sm:pt-10 sm:pb-28 rounded-2xl backdrop-blur-xl w-full pointer-events-auto">
                                        <a href="mailto:tusharwashishtha2@gmail.com" className="p-4 bg-cyan-950/50 border border-cyan-500/30 rounded-full hover:bg-cyan-900 hover:border-cyan-400 transition-all text-cyan-200">
                                            <Mail size={24} />
                                        </a>
                                        <a href="https://linkedin.com/in/tushar-washishtha-a04192305" target="_blank" rel="noopener noreferrer" className="p-4 bg-cyan-950/50 border border-cyan-500/30 rounded-full hover:bg-cyan-900 hover:border-cyan-400 transition-all text-cyan-200">
                                            <Linkedin size={24} />
                                        </a>
                                        <a href="https://github.com/tusharwashishtha2" target="_blank" rel="noopener noreferrer" className="p-4 bg-cyan-950/50 border border-cyan-500/30 rounded-full hover:bg-cyan-900 hover:border-cyan-400 transition-all text-cyan-200">
                                            <Github size={24} />
                                        </a>
                                        <button onClick={handleResumeDownload} className="p-4 bg-cyan-950/50 border border-cyan-500/30 rounded-full hover:bg-cyan-900 hover:border-cyan-400 transition-all text-cyan-200">
                                            <Download size={24} />
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>

                        </motion.div>

                        {/* NAV CONTROL (BACK BUTTON) */}
                        <AnimatePresence>
                            {focusArea && !selectedProject && !modalImg && (
                                <motion.button
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    onClick={() => setFocusArea(null)}
                                    className="fixed top-3 left-3 md:top-6 md:left-6 pointer-events-auto flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-black/90 border border-cyan-500/80 rounded-full text-cyan-400 font-bold tracking-widest text-xs md:text-sm hover:bg-cyan-900 hover:text-white transition-all backdrop-blur-xl z-[100] shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105"
                                >
                                    <X size={16} className="md:w-[18px] md:h-[18px]" />
                                    <span className="hidden sm:inline">RETURN TO SYSTEM CORE</span>
                                    <span className="sm:hidden">SYSTEM CORE</span>
                                </motion.button>
                            )}
                        </AnimatePresence>

                    </motion.div>
                )}
            </AnimatePresence>

            {/* PROJECT PORTAL OVERLAY */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl overflow-y-auto"
                    >
                        <div className="min-h-screen p-6 sm:p-12 max-w-6xl mx-auto flex flex-col relative">
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="fixed top-3 left-3 md:top-6 md:left-6 p-2 md:p-4 text-cyan-500 hover:text-white hover:bg-cyan-900/50 transition-colors border border-cyan-500/50 rounded-full bg-black/80 z-[160] shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:scale-110"
                            >
                                <X size={20} className="md:w-[28px] md:h-[28px]" />
                            </button>

                            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="mt-12 sm:mt-24 space-y-12">

                                <div>
                                    <div className="text-cyan-500 font-bold tracking-[0.2em] text-sm mb-4">PORTAL : {selectedProject.title.toUpperCase()}</div>
                                    <h1 className="text-4xl sm:text-6xl font-black text-white">{selectedProject.title}</h1>
                                    <p className="text-cyan-400 font-mono mt-4 text-lg">{selectedProject.tech}</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-12 border-t border-cyan-500/20 pt-12">
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-white font-bold mb-2">SYSTEM PARAMETERS</h3>
                                            <p className="text-cyan-100/70 leading-relaxed text-justify">{selectedProject.desc}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold mb-2">KEY TECHNOLOGIES</h3>
                                            <p className="text-cyan-400">{selectedProject.key}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h3 className="text-white font-bold mb-2">VISUAL TELEMETRY</h3>
                                        {selectedProject.img1 && (
                                            <div className="relative rounded-xl border border-cyan-500/30 overflow-hidden cursor-pointer group" onClick={() => setModalImg(selectedProject.img1)}>
                                                <img src={selectedProject.img1} alt="telemetry 1" className="w-full h-auto opacity-70 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        )}
                                        {selectedProject.img2 && (
                                            <div className="relative rounded-xl border border-cyan-500/30 overflow-hidden cursor-pointer group" onClick={() => setModalImg(selectedProject.img2)}>
                                                <img src={selectedProject.img2} alt="telemetry 2" className="w-full h-auto opacity-70 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        )}
                                        {selectedProject.images && selectedProject.images.map((img: string, i: number) => (
                                            <div key={i} className="relative rounded-xl border border-cyan-500/30 overflow-hidden cursor-pointer group" onClick={() => setModalImg(img)}>
                                                <img src={img} alt={`telemetry ${i}`} className="w-full h-auto opacity-70 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FULLSCREEN IMAGE MODAL */}
            <AnimatePresence>
                {modalImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setModalImg(null)}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); setModalImg(null); }}
                            className="fixed top-3 left-3 md:top-6 md:left-6 p-2 md:p-4 text-cyan-500 hover:text-white hover:bg-cyan-900/50 transition-colors border border-cyan-500/50 rounded-full bg-black/80 z-[210] shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:scale-110"
                        >
                            <X size={20} className="md:w-[28px] md:h-[28px]" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            src={modalImg!}
                            className="max-w-full max-h-[90vh] object-contain border border-cyan-500/20 rounded-xl shadow-2xl"
                            alt="Fullscreen view"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}
