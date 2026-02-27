"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Download, MapPin, Mail, Linkedin, Github, ExternalLink } from "lucide-react"
import { SKILLS, EDUCATION, PROJECTS, CERTS } from "@/lib/data"
import { handleResumeDownload } from "@/lib/utils"

// Handwritten Typewriter Effect
const HandType = ({ text, delay = 0, speed = 0.05, className = "" }: { text: string, delay?: number, speed?: number, className?: string }) => {
    const [displayedText, setDisplayedText] = useState('')

    useEffect(() => {
        let timeout: NodeJS.Timeout
        let currentIndex = 0

        const typeChar = () => {
            if (currentIndex <= text.length) {
                setDisplayedText(text.slice(0, currentIndex))
                currentIndex++
                // Slight random variation in speed for organic handwriting feel
                const variance = Math.random() * 0.04
                timeout = setTimeout(typeChar, (speed + variance) * 1000)
            }
        }

        const startDelay = setTimeout(typeChar, delay * 1000)

        return () => {
            clearTimeout(timeout)
            clearTimeout(startDelay)
        }
    }, [text, delay, speed])

    return <span className={className}>{displayedText}</span>
}

// Uneven ink border component
const InkBox = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`relative \${className}`}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                <path
                    d="M 5,5 Q 10,0 50,2 T 95%,5 Q 100%,10 98%,50 T 95%,95 Q 90%,100 50%,98 T 5%,95 Q 0%,90 2%,50 T 5%,5"
                    fill="none"
                    stroke="rgba(15, 23, 42, 0.7)"
                    strokeWidth="2"
                    strokeDasharray="10 2"
                    vectorEffect="non-scaling-stroke"
                    className="opacity-70"
                />
            </svg>
            <div className="relative z-10 p-6">
                {children}
            </div>
        </div>
    )
}

export default function PaperThemeContent() {
    const [modalImg, setModalImg] = useState<string | null>(null)
    const [modalProject, setModalProject] = useState<any>(null)

    // Lock scroll when modal is open
    useEffect(() => {
        if (modalImg || modalProject) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'auto'
    }, [modalImg, modalProject])

    return (
        <div className="relative z-10 min-h-screen">
            {/* Inject Google Font for Handwriting */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');

                .font-handwriting {
                    font-family: 'Caveat', cursive;
                }

                .ink-text {
                    color: #111827;
                    text-shadow: 0 0 1px rgba(17, 24, 39, 0.2); 
                }

                .ink-hover:hover {
                    text-shadow: 0 0 8px rgba(17, 24, 39, 0.4);
                    transform: scale(1.02);
                }
            `}} />

            <main className="container mx-auto px-6 py-24 md:py-32 font-handwriting ink-text max-w-5xl flex flex-col gap-32 overflow-x-hidden">

                {/* HERO SECTION */}
                <section className="flex flex-col-reverse md:flex-row items-center gap-16 md:gap-24 relative min-h-[80vh]">
                    <div className="flex-1 space-y-8 flex flex-col justify-center">
                        <h1 className="text-6xl md:text-8xl font-bold font-handwriting tracking-tight leading-none text-slate-900">
                            <HandType text="Tushar" delay={0.2} speed={0.1} />
                            <br />
                            <HandType text="Washishtha" delay={1.0} speed={0.1} />
                        </h1>
                        <div className="text-3xl md:text-4xl font-medium text-slate-700 space-y-3 mt-8 ml-4 border-l-2 border-slate-800/20 pl-6 leading-relaxed">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 2 }}>
                                <div>Entry-Level Front-End & Python Developer</div>
                                <div>Passionate about Web & AI</div>
                                <div>Ready to Learn and Collaborate</div>
                            </motion.div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                        animate={{ opacity: 1, scale: 1, rotate: -2 }}
                        transition={{ delay: 1.5, duration: 1.5 }}
                        className="w-64 h-64 md:w-96 md:h-96 relative flex-shrink-0"
                    >
                        {/* Physical print photo effect */}
                        <div className="absolute inset-0 bg-white shadow-[0_15px_30px_rgba(0,0,0,0.15)] rounded border border-slate-200 rotate-2 p-3">
                            <img src="/assets/tushar_photo.jpg" alt="Profile" className="w-full h-full object-cover filter contrast-125 sepia-[0.2]" />
                        </div>
                    </motion.div>
                </section>

                {/* HIGHLIGHT STATEMENT */}
                <section className="flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-3xl w-full"
                    >
                        <InkBox className="text-5xl md:text-[3.5rem] leading-normal text-justify font-bold text-slate-800 p-8 md:p-12">
                            <HandType text="“I specialize in building projects using modern AI-assisted development, focusing on problem-solving, debugging, and delivering working solutions rather than just writing code line-by-line.”" delay={0.5} speed={0.03} />
                        </InkBox>
                    </motion.div>
                </section>

                {/* ABOUT SECTION */}
                <section>
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 border-b-2 border-slate-800/30 inline-block pb-2">About Me</h2>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl leading-relaxed space-y-6 text-slate-800 max-w-4xl text-justify"
                    >
                        <p>I operate at the intersection of structural engineering and creative logic. My foundation is built on HTML5 and CSS3. However, I view JavaScript as the nervous system—it breathes life into the static grid.</p>
                        <p>Beyond the browser, my thinking is powered by Python. I use it to solve challenges, architect backends with Flask, and experiment with AI & Machine Learning.</p>
                        <p>I am a builder by nature. My philosophy is simple: learn by doing, break things to understand them, and write code that is clean and functional.</p>
                    </motion.div>
                </section>

                {/* EDUCATION SECTION */}
                <section>
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 border-b-2 border-slate-800/30 inline-block pb-2">Education Notes</h2>
                    <div className="space-y-12 ml-4 md:ml-8 border-l-2 border-slate-800/20 pl-8">
                        {EDUCATION.map((ed, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2, duration: 0.8 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="absolute -left-[41px] top-2 w-4 h-4 bg-slate-800 rounded-full" />
                                <h3 className="text-3xl font-bold text-slate-900 mb-1">{ed.title}</h3>
                                <div className="text-xl text-slate-600 mb-2">{ed.meta}</div>
                                <p className="text-2xl text-slate-800 leading-relaxed max-w-2xl">{ed.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* SKILLS SECTION */}
                <section>
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 border-b-2 border-slate-800/30 inline-block pb-2">Technical Arsenal</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {SKILLS.map((skill, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="group cursor-default"
                            >
                                <InkBox className="h-full px-4 py-3 md:px-6 md:py-3 transition-all duration-500 group-hover:bg-slate-800/5 group-hover:-translate-y-1">
                                    <div className="text-3xl font-bold text-slate-900 ink-hover transition-all">{skill.name}</div>
                                    <div className="text-lg text-slate-600">{skill.desc}</div>
                                </InkBox>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* PROJECTS SECTION */}
                <section>
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 border-b-2 border-slate-800/30 inline-block pb-2">Execution Portals</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {PROJECTS.map((proj, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <InkBox className="h-full flex flex-col bg-white/40 hover:bg-white/60 transition-colors shadow-sm cursor-pointer"
                                >
                                    <div onClick={() => setModalProject(proj)}>
                                        <div className="aspect-video mb-6 overflow-hidden rounded filter sepia-[0.3] contrast-110">
                                            <img src={proj.img1 || proj.images?.[0]} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-slate-900 mb-2">{proj.title}</h3>
                                        <div className="text-xl text-slate-600 mb-4">{proj.tech}</div>
                                        <p className="text-2xl text-slate-800 line-clamp-3 leading-relaxed">{proj.desc}</p>
                                    </div>
                                </InkBox>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CERTIFICATIONS SECTION */}
                <section>
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 border-b-2 border-slate-800/30 inline-block pb-2">Verification Vault</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {CERTS.map((cert, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, rotate: (i % 2 === 0) ? -5 : 5 }}
                                whileInView={{ opacity: 1, rotate: (i % 2 === 0) ? 2 : -2 }}
                                whileHover={{ scale: 1.05, rotate: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="relative bg-white p-3 shadow-md border border-slate-200 cursor-pointer"
                                onClick={() => setModalImg(cert.img)}
                            >
                                {/* Thumbtack effect */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-400 shadow-[0_2px_2px_rgba(0,0,0,0.3)] z-10 
                                                after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-1 after:h-1 after:bg-slate-300 after:rounded-full"></div>
                                <img src={cert.img} alt={cert.label} className="w-full aspect-[4/3] object-cover filter contrast-125 sepia-[0.1]" />
                                <div className="text-center mt-3 text-lg font-bold text-slate-800">{cert.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CONTACT SECTION */}
                <section className="flex justify-center pb-32">
                    <InkBox className="max-w-xl w-full text-center bg-white/30 p-12">
                        <h2 className="text-5xl font-bold text-slate-900 mb-12">Let&apos;s Collaborate</h2>

                        <div className="space-y-6 text-3xl text-slate-800 flex flex-col items-center">
                            <a href="mailto:tusharwashishtha2@gmail.com" className="flex items-center gap-4 hover:text-slate-900 ink-hover transition-all">
                                <span>tusharwashishtha2@gmail.com</span>
                            </a>
                            <div className="flex items-center gap-4">
                                <span>Indore, India</span>
                            </div>

                            <div className="flex gap-8 mt-6">
                                <a href="https://linkedin.com/in/tushar-washishtha-a04192305" target="_blank" rel="noopener noreferrer" className="p-3 border-2 border-slate-800 rounded-full hover:bg-slate-800 hover:text-white transition-all">
                                    <Linkedin size={28} />
                                </a>
                                <a href="https://github.com/tusharwashishtha2" target="_blank" rel="noopener noreferrer" className="p-3 border-2 border-slate-800 rounded-full hover:bg-slate-800 hover:text-white transition-all">
                                    <Github size={28} />
                                </a>
                            </div>

                            <a
                                href="/assets/Tushar_Washishtha_Resume_Fixed.pdf"
                                download="Tushar_Washishtha_Resume.pdf"
                                onClick={handleResumeDownload}
                                className="mt-12 group relative inline-flex items-center gap-3 px-8 py-3 bg-slate-900 text-white text-2xl font-bold overflow-hidden"
                            >
                                <span className="absolute inset-0 w-full h-full -ml-2 hover:w-[120%] hover:skew-x-12 transition-all duration-500 bg-slate-700 -z-10"></span>
                                <Download size={24} /> Download Resume
                            </a>
                        </div>
                    </InkBox>
                </section>

            </main>

            {/* PROJECT MODAL */}
            <AnimatePresence>
                {modalProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 md:p-12 font-handwriting"
                        onClick={() => setModalProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-[#FDFCF0] w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded shadow-2xl relative p-8 md:p-12"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setModalProject(null)}
                                className="absolute top-6 right-6 p-2 bg-slate-200 hover:bg-slate-300 rounded-full text-slate-800 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">{modalProject.title}</h2>
                            <div className="text-2xl text-slate-600 mb-8 border-b-2 border-slate-300 pb-4">{modalProject.tech}</div>

                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                {(modalProject.images || [modalProject.img1, modalProject.img2]).map((img: string, idx: number) => (
                                    <img key={idx} src={img} alt="Project Demo" className="w-full rounded shadow-md filter sepia-[0.1]" />
                                ))}
                            </div>

                            <div className="text-2xl leading-relaxed text-slate-800 space-y-6 text-justify">
                                <p>{modalProject.desc}</p>
                                <div className="p-6 bg-slate-100/50 border-l-4 border-slate-800 mt-8">
                                    <strong className="text-3xl text-slate-900 block mb-2">Key Ingredients:</strong>
                                    {modalProject.key}
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
                        className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4"
                        onClick={() => setModalImg(null)}
                    >
                        <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors bg-black/40 p-2 rounded-full">
                            <X size={32} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            src={modalImg}
                            className="max-w-full max-h-[90vh] rounded shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
