"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Download, Eye } from "lucide-react"
import { SKILLS, EDUCATION, PROJECTS, CERTS } from "@/lib/data"
import { handleResumeDownload } from "@/lib/utils"

// A component that stays almost invisible (0.01 opacity) until hovered,
// with a large expanded hit area to simulate "proximity" reveal.
const ProximityReveal = ({
    children,
    className = "",
    hitAreaPadding = "p-12",
    transitionDuration = "duration-[1.5s]"
}: {
    children: React.ReactNode,
    className?: string,
    hitAreaPadding?: string,
    transitionDuration?: string
}) => {
    return (
        <div className={`relative group \${hitAreaPadding}`}>
            {/* The visible content */}
            <div className={`opacity-[0.02] filter blur-[2px] group-hover:blur-0 group-hover:opacity-100 transition-all ease-out \${transitionDuration} \${className}`}>
                {children}
            </div>
        </div>
    )
}

export default function HiddenThemeContent() {
    const [modalImg, setModalImg] = useState<string | null>(null)
    const [modalProject, setModalProject] = useState<any>(null)

    // Global cursor tracking for flashlight effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Lock scroll when modal is open
    useEffect(() => {
        if (modalImg || modalProject) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'auto'
    }, [modalImg, modalProject])

    return (
        <div className="relative z-10 min-h-screen text-slate-300 font-mono overflow-x-hidden selection:bg-white/10 selection:text-white pb-32">

            {/* Global cursor tracker for a highly subtle global flashlight effect using native CSS */}
            <div
                className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay transition-opacity duration-1000"
                style={{
                    background: "radial-gradient(circle 600px at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(255,255,255,0.05), transparent 40%)"
                }}
            />

            <main className="container mx-auto px-4 md:px-6 max-w-5xl flex flex-col gap-24 md:gap-48 pb-20">

                {/* HERO SECTION */}
                <section className="min-h-[85vh] flex items-center justify-center pt-8 md:pt-20">
                    <ProximityReveal hitAreaPadding="p-8 md:p-32" transitionDuration="duration-[2s]" className="flex flex-col items-center justify-center gap-8 md:gap-12 w-full max-w-5xl mx-auto">
                        {/* Immersive Cyber Profile Image (Centered & Circular) */}
                        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full relative overflow-hidden bg-[#030303] border-2 border-white/20 flex-shrink-0 group-hover:border-white/50 transition-colors duration-1000 shadow-[0_0_30px_rgba(255,255,255,0.05)] mx-auto">
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-1000 z-10" />
                            <img src="/assets/tushar_photo.jpg" alt="Tushar" className="w-full h-full object-cover filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[3s]" />
                        </div>

                        <div className="flex flex-col items-center justify-center w-full max-w-2xl px-2 md:px-0 mx-auto">
                            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-widest uppercase mb-6 md:mb-10 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] leading-tight text-center">
                                Tushar
                                <br /> Washishtha
                            </h1>
                            {/* Merged into a single paragraph to enable perfect text-justify block rendering on mobile without cutoff */}
                            <div className="text-sm sm:text-base md:text-xl font-light tracking-widest text-slate-400 text-justify leading-relaxed md:leading-loose w-full border-t border-b border-white/10 py-5">
                                Entry-Level Front-End & Python Developer. Passionate about Web & AI. Ready to Learn and Collaborate.
                            </div>
                        </div>
                    </ProximityReveal>
                </section>

                {/* HIGHLIGHT STATEMENT */}
                <section className="flex justify-center items-center py-6 md:py-12">
                    <ProximityReveal hitAreaPadding="p-4 md:p-24" className="max-w-4xl w-full">
                        <div className="text-2xl md:text-5xl leading-relaxed text-justify font-light italic text-slate-200">
                            &quot;I specialize in building projects using modern AI-assisted development, focusing on problem-solving, debugging, and delivering working solutions rather than just writing code line-by-line.&quot;
                        </div>
                    </ProximityReveal>
                </section>

                {/* ABOUT SECTION */}
                <section className="min-h-[60vh] flex flex-col justify-center">
                    <ProximityReveal hitAreaPadding="py-24" className="space-y-12">
                        <h2 className="text-sm md:text-base tracking-[0.5em] text-slate-500 uppercase border-b border-slate-800 pb-4 inline-block">System.About</h2>
                        <div className="text-xl md:text-3xl leading-relaxed text-slate-300 space-y-8 max-w-4xl text-justify font-light">
                            <p>I operate at the intersection of structural engineering and creative logic. My foundation is built on HTML5 and CSS3. However, I view JavaScript as the nervous system—it breathes life into the static grid.</p>
                            <p>Beyond the browser, my thinking is powered by Python. I use it to solve challenges, architect backends with Flask, and experiment with AI & Machine Learning.</p>
                            <p>I am a builder by nature. My philosophy is simple: learn by doing, break things to understand them, and write code that is clean and functional.</p>
                        </div>
                    </ProximityReveal>
                </section>

                {/* EDUCATION SECTION */}
                <section className="py-12">
                    <ProximityReveal hitAreaPadding="py-12" className="mb-16">
                        <h2 className="text-sm md:text-base tracking-[0.5em] text-slate-500 uppercase border-b border-slate-800 pb-4 inline-block">System.Education</h2>
                    </ProximityReveal>

                    <div className="space-y-4 flex flex-col items-center">
                        {EDUCATION.map((ed, i) => (
                            <ProximityReveal key={i} hitAreaPadding="p-8 w-full max-w-3xl" transitionDuration="duration-[1s]">
                                <div className="border border-white/5 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.01]">
                                    <div>
                                        <h3 className="text-2xl font-light text-white mb-2">{ed.title}</h3>
                                        <div className="text-slate-500 tracking-wider">{ed.meta}</div>
                                    </div>
                                    <div className="text-lg text-slate-400 max-w-md text-justify md:text-left">
                                        {ed.desc}
                                    </div>
                                </div>
                            </ProximityReveal>
                        ))}
                    </div>
                </section>

                {/* SKILLS SECTION */}
                <section className="py-12">
                    <ProximityReveal hitAreaPadding="py-12" className="mb-16 text-center md:text-left">
                        <h2 className="text-sm md:text-base tracking-[0.5em] text-slate-500 uppercase border-b border-slate-800 pb-4 inline-block">System.Capabilities</h2>
                    </ProximityReveal>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {SKILLS.map((skill, i) => (
                            <ProximityReveal key={i} hitAreaPadding="p-4" transitionDuration="duration-[0.8s]">
                                <div className="border border-white/5 p-6 h-full flex flex-col justify-center items-center text-center hover:bg-white/5 hover:border-white/20 transition-all duration-700 shadow-[0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                    <div className="text-2xl font-light text-white mb-2 tracking-wide">{skill.name}</div>
                                    <div className="text-xs text-slate-500 uppercase tracking-widest">{skill.desc}</div>
                                </div>
                            </ProximityReveal>
                        ))}
                    </div>
                </section>

                {/* PROJECTS SECTION */}
                <section className="py-24">
                    <ProximityReveal hitAreaPadding="py-12" className="mb-24 text-center">
                        <h2 className="text-sm md:text-base tracking-[0.5em] text-slate-500 uppercase border-b border-slate-800 pb-4 inline-block">System.Executables</h2>
                        <p className="text-slate-600 mt-6 tracking-widest text-xs uppercase">Hover anomalous zones to reveal data</p>
                    </ProximityReveal>

                    <div className="grid md:grid-cols-2 gap-24">
                        {PROJECTS.map((proj, i) => (
                            <ProximityReveal key={i} hitAreaPadding="p-8 md:p-12 -m-8 md:-m-12">
                                <div
                                    className="group flex flex-col gap-6"
                                    onClick={() => { if (typeof window !== 'undefined' && window.innerWidth >= 768) setModalProject(proj) }}
                                >
                                    <div className="aspect-video bg-[#050505] border border-white/5 overflow-hidden relative grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 md:cursor-pointer">
                                        <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-1000 z-10" />
                                        <img src={proj.img1 || proj.images?.[0]} alt={proj.title} className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out" />
                                        <div className="absolute inset-0 flex items-center justify-center md:hidden z-20 pointer-events-none">
                                            <button
                                                className="pointer-events-auto p-4 bg-black/60 border border-white/20 rounded-full text-white backdrop-blur-md"
                                                onClick={(e) => { e.stopPropagation(); setModalProject(proj); }}
                                            >
                                                <Eye size={24} />
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-light text-white mb-3 tracking-wide">{proj.title}</h3>
                                        <div className="text-xs tracking-[0.3em] text-slate-500 mb-4 uppercase">{proj.tech}</div>
                                        <p className="text-slate-400 font-light leading-relaxed line-clamp-2 text-justify">{proj.desc}</p>
                                    </div>
                                </div>
                            </ProximityReveal>
                        ))}
                    </div>
                </section>

                {/* CERTIFICATIONS SECTION */}
                <section className="py-24 border-t border-white/5">
                    <ProximityReveal hitAreaPadding="py-12" className="mb-16 text-center">
                        <h2 className="text-sm md:text-base tracking-[0.5em] text-slate-500 uppercase border-b border-slate-800 pb-4 inline-block">System.Verification_Keys</h2>
                    </ProximityReveal>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {CERTS.map((cert, i) => (
                            <ProximityReveal key={i} hitAreaPadding="p-6">
                                <div
                                    className="group flex flex-col items-center gap-4 relative"
                                    onClick={() => { if (typeof window !== 'undefined' && window.innerWidth >= 768) setModalImg(cert.img) }}
                                >
                                    <div className="w-full aspect-[4/3] bg-[#050505] border border-white/10 overflow-hidden relative md:cursor-pointer">
                                        <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent transition-colors duration-700 z-10 mix-blend-multiply" />
                                        <img src={cert.img} alt={cert.label} className="w-full h-full object-cover filter brightness-50 group-hover:brightness-100 transition-all duration-1000" />
                                        <div className="absolute inset-0 flex items-center justify-center md:hidden z-20 pointer-events-none">
                                            <button
                                                className="pointer-events-auto p-3 bg-black/60 border border-white/20 rounded-full text-white backdrop-blur-md"
                                                onClick={(e) => { e.stopPropagation(); setModalImg(cert.img); }}
                                            >
                                                <Eye size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-xs text-center text-slate-500 tracking-widest uppercase">{cert.label}</div>
                                </div>
                            </ProximityReveal>
                        ))}
                    </div>
                </section>

                {/* CONTACT SECTION */}
                <section className="min-h-[50vh] flex flex-col items-center justify-center">
                    <ProximityReveal hitAreaPadding="p-24 w-full" transitionDuration="duration-[2s]">
                        <div className="border border-white/5 bg-[#030303] p-12 md:p-24 text-center flex flex-col items-center gap-12">
                            <h2 className="text-3xl md:text-5xl font-light text-white tracking-widest">INITIATE_CONTACT</h2>

                            <div className="space-y-6 text-xl md:text-2xl font-light tracking-wide text-slate-400">
                                <div><a href="mailto:tusharwashishtha2@gmail.com" className="hover:text-white transition-colors duration-500">tusharwashishtha2@gmail.com</a></div>
                                <div>Indore, India</div>
                            </div>

                            <div className="flex gap-12 mt-4 text-slate-500">
                                <a href="https://linkedin.com/in/tushar-washishtha-a04192305" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-500 uppercase tracking-widest text-sm">
                                    [ LinkedIn ]
                                </a>
                                <a href="https://github.com/tusharwashishtha2" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-500 uppercase tracking-widest text-sm">
                                    [ GitHub ]
                                </a>
                            </div>

                            <button
                                onClick={handleResumeDownload}
                                className="mt-12 flex items-center gap-4 border border-white/20 text-slate-300 px-8 py-4 hover:bg-white hover:text-black hover:border-white transition-all duration-700 uppercase tracking-[0.3em] text-sm"
                            >
                                <Download size={16} />
                                Extract_Data.pdf
                            </button>
                        </div>
                    </ProximityReveal>
                </section>

            </main>

            {/* PROJECT MODAL */}
            <AnimatePresence>
                {modalProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12 font-mono"
                        onClick={() => setModalProject(null)}
                    >
                        <button
                            onClick={() => setModalProject(null)}
                            className="absolute top-4 left-4 md:top-8 md:bottom-auto md:right-8 md:left-auto text-white/50 hover:text-white transition-colors z-50 p-4"
                        >
                            <X size={32} />
                        </button>

                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="w-full max-w-5xl max-h-[90vh] overflow-y-auto relative no-scrollbar"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="border border-white/10 p-8 md:p-16 bg-[#030303]">
                                <div className="text-xs text-slate-500 tracking-[0.5em] uppercase mb-8 border-b border-white/10 pb-4">Decrypted Payload</div>
                                <h2 className="text-4xl md:text-6xl font-light text-white mb-6 uppercase tracking-wider">{modalProject.title}</h2>
                                <div className="text-sm tracking-[0.3em] text-slate-400 mb-12 uppercase">{modalProject.tech}</div>

                                <div className="grid md:grid-cols-2 gap-8 mb-16">
                                    {(modalProject.images || [modalProject.img1, modalProject.img2]).map((img: string, idx: number) => (
                                        <div key={idx} className="border border-white/10 p-2 bg-black">
                                            <img src={img} alt="Project Demo" className="w-full h-auto filter grayscale hover:grayscale-0 transition-all duration-1000" />
                                        </div>
                                    ))}
                                </div>

                                <div className="text-lg leading-relaxed text-slate-300 space-y-8 font-light text-justify">
                                    <p>{modalProject.desc}</p>
                                    <div className="border border-white/10 p-8 bg-white/[0.02] mt-12">
                                        <strong className="text-sm tracking-[0.3em] text-white block mb-6 uppercase border-b border-white/10 pb-4">Key Mechanisms:</strong>
                                        <div className="space-y-4 text-slate-400">
                                            {/* Since original 'key' data was passed as a JSX block in data.tsx, we just render it */}
                                            {modalProject.key}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* IMAGE MODAL */}
            <AnimatePresence>
                {modalImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-md p-8"
                        onClick={() => setModalImg(null)}
                    >
                        <button
                            className="absolute top-4 left-4 md:top-8 md:bottom-auto md:right-8 md:left-auto text-white/50 hover:text-white transition-colors bg-white/5 border border-white/10 p-4 z-50 pointer-events-auto"
                            onClick={(e) => { e.stopPropagation(); setModalImg(null); }}
                        >
                            <X size={24} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            src={modalImg}
                            className="max-w-full max-h-[90vh] border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.05)]"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
