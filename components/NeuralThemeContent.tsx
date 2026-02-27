"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Download, Mail, MapPin, Github, Linkedin, X } from "lucide-react"
import { SKILLS, EDUCATION, PROJECTS, CERTS } from "@/lib/data"
import { handleResumeDownload } from "@/lib/utils"

// Organic Floating Node Component
const NeuralNode = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        animate={{
            y: [0, -10, 0],
            scale: [1, 1.01, 1]
        }}
        // "Breathing" animation loop
        //@ts-ignore - framer motion transition types complain about repeatType but it works
        transition={{
            duration: 1, delay,
            y: { repeat: Infinity, duration: 6 + Math.random() * 2, ease: "easeInOut" },
            scale: { repeat: Infinity, duration: 8 + Math.random() * 2, ease: "easeInOut" }
        }}
        className={`
      bg-black/60 backdrop-blur border border-[#3b1252]/50 
      rounded-[2rem] p-8 text-[#e2d5ec] 
      hover:bg-[#1a0524]/60 hover:border-[#9d4edd]/50 hover:shadow-[0_0_40px_rgba(157,78,221,0.2)]
      transition-all duration-700
      ${className}
    `}
    >
        {children}
    </motion.div>
)

export default function NeuralThemeContent() {
    const [modalImg, setModalImg] = useState<string | null>(null)

    return (
        <>
            <main className="relative z-10 w-full min-h-screen flex flex-col items-center overflow-x-hidden pt-32 pb-40 px-6 gap-40 max-w-7xl mx-auto">

                {/* HERO SECTION - LIVING CORE */}
                <section className="w-full min-h-[80vh] flex flex-col items-center justify-center relative">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="text-center z-10 mb-16"
                    >
                        <h1 className="text-4xl sm:text-7xl md:text-9xl font-light tracking-tighter mb-8 break-words">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-[#e0c3fc] to-[#712b9c]">
                                TUSHAR
                            </span>
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#e0c3fc] via-[#9d4edd] to-[#3c096c]">
                                WASHISHTHA
                            </span>
                        </h1>

                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 2 }}
                            className="text-xl md:text-2xl font-light text-[#c8b6ff] space-y-2 tracking-wide"
                        >
                            <p>Entry-Level Front-End & Python Developer</p>
                            <p>Passionate about <span className="text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Web & AI</span></p>
                            <p>Ready to Learn and Collaborate</p>
                        </motion.div>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row items-center justify-center gap-16 w-full max-w-5xl relative z-10">
                        {/* Neural Membrane Card */}
                        <NeuralNode className="flex-1 rounded-[3rem] lg:order-1 order-2">
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-justify text-center italic text-[#e0aaff]">
                                “I specialize in building projects using modern <strong className="font-normal text-white not-italic drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">AI-assisted development</strong>,
                                focusing on problem-solving, debugging, and delivering <strong className="font-normal text-white not-italic drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">working solutions</strong> rather than just writing code line-by-line.”
                            </p>
                        </NeuralNode>

                        {/* Glowing Profile Bubble */}
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                                rotate: [0, 2, -1, 0]
                            }}
                            // @ts-ignore
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                            className="relative w-64 h-64 md:w-80 md:h-80 rounded-[4rem] p-1 bg-gradient-to-br from-[#9d4edd] via-[#3c096c] to-black lg:order-2 order-1 flex-shrink-0"
                        >
                            <div className="absolute inset-0 bg-[#e0aaff] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000 rounded-[4rem]"></div>
                            <div className="w-full h-full rounded-[3.8rem] overflow-hidden bg-black relative z-10">
                                <img src="/assets/tushar_photo.jpg" alt="Profile" className="w-full h-full object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000" />
                            </div>
                        </motion.div>
                    </div>

                </section>

                {/* SECTION 1 - ABOUT (Living Container) */}
                <section className="w-full max-w-4xl relative">
                    <div className="absolute -inset-10 bg-gradient-to-r from-[#3c096c]/20 via-[#9d4edd]/10 to-[#3c096c]/20 blur-3xl rounded-[100%] pointer-events-none"></div>
                    <NeuralNode className="rounded-[4rem] text-center px-8 py-16 md:px-16" delay={0.2}>
                        <h2 className="text-3xl tracking-widest text-[#e0aaff] mb-12 font-light">NEURAL PATHWAYS // ABOUT</h2>
                        <div className="text-xl font-light leading-relaxed text-justify space-y-8 text-[#d8bbff]">
                            <p>
                                I operate at the intersection of structural engineering and creative logic. My foundation is built on
                                <span className="text-white"> HTML5</span> and <span className="text-white">CSS3</span>.
                                However, I view <span className="text-white">JavaScript</span> as the nervous system—it breathes life into the static membrane.
                            </p>
                            <p>
                                Beyond the browser, my thinking is powered by <span className="text-white">Python</span>.
                                I use it to solve challenges, architect backends with <span className="text-white">Flask</span>, and experiment with
                                <span className="text-[#ffcbf2] font-medium drop-shadow-md"> AI & Machine Learning models</span>.
                            </p>
                            <p>
                                I am a builder by nature. My philosophy is simple: learn by doing, break things to understand them, and write code that adapts organically to the problem space.
                            </p>
                        </div>
                    </NeuralNode>
                </section>

                {/* SECTION 3 - SKILLS (Floating Nodes) */}
                <section className="w-full max-w-5xl">
                    <h2 className="text-3xl tracking-widest text-center text-[#e0aaff] mb-20 font-light">SYNAPTIC CONNECTIONS // SKILLS</h2>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                        {SKILLS.map((skill, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                transition={{ duration: 0.8, delay: i * 0.05 }}
                                className="group relative cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-[#9d4edd] blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
                                <div className="relative z-10 bg-black/50 backdrop-blur-md border border-[#5a189a]/50 rounded-[2rem] px-6 py-4 flex flex-col items-center justify-center min-w-[140px] hover:border-[#e0aaff] transition-colors duration-500">
                                    <span className="text-white font-light text-lg mb-1">{skill.name}</span>
                                    <span className="text-[10px] text-[#c8b6ff] uppercase tracking-widest text-center">{skill.desc}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* SECTION 2 - EDUCATION (Organic Expanding Hover) */}
                <section className="w-full max-w-4xl">
                    <h2 className="text-3xl tracking-widest text-center text-[#e0aaff] mb-16 font-light">MEMORY BANKS // EDUCATION</h2>
                    <div className="space-y-8">
                        {EDUCATION.map((ed, i) => (
                            <NeuralNode key={i} delay={i * 0.2} className="rounded-[3rem] group">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                                    <h3 className="text-2xl font-light text-white group-hover:text-[#ffcbf2] transition-colors">{ed.title}</h3>
                                    <span className="text-xs tracking-widest uppercase text-[#e0aaff] bg-[#9d4edd]/20 px-4 py-2 rounded-full border border-[#9d4edd]/40 drop-shadow-md">{ed.meta}</span>
                                </div>
                                <p className="text-[#d8bbff] font-light leading-relaxed text-justify">{ed.desc}</p>
                            </NeuralNode>
                        ))}
                    </div>
                </section>

                {/* SECTION 4 - PROJECTS */}
                <section className="w-full">
                    <h2 className="text-3xl tracking-widest text-center text-[#e0aaff] mb-20 font-light">MANIFESTATIONS // PROJECTS</h2>
                    <div className="space-y-40">
                        {PROJECTS.map((proj, i) => (
                            <div key={i} className={`flex flex-col lg:flex-row gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>

                                {/* Images */}
                                <div className="w-full lg:w-1/2 relative group">
                                    <div className="absolute -inset-4 bg-[#712b9c] blur-3xl opacity-10 group-hover:opacity-30 transition-opacity duration-1000 rounded-[4rem]"></div>
                                    <div className="grid grid-cols-2 gap-4 relative z-10 p-4">
                                        {(proj.images || [proj.img1, proj.img2]).slice(0, 2).map((img, idx) => (
                                            <motion.img
                                                key={idx}
                                                whileHover={{ scale: 1.05 }}
                                                src={img}
                                                className={`w-full h-auto object-cover cursor-pointer ${idx === 0 ? 'rounded-tl-[3rem] rounded-bl-2xl rounded-tr-2xl rounded-br-[3rem]' : 'rounded-tr-[3rem] rounded-br-2xl rounded-tl-2xl rounded-bl-[3rem]'} border border-[#3c096c]/50`}
                                                onClick={() => setModalImg(img)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Text */}
                                <NeuralNode delay={0.2} className="w-full lg:w-1/2 rounded-[3.5rem]">
                                    <h3 className="text-3xl font-light text-white mb-4 drop-shadow-md">{proj.title}</h3>
                                    <p className="text-xs uppercase tracking-widest text-[#e0aaff] mb-8 font-mono">{proj.tech}</p>
                                    <p className="text-lg text-[#d8bbff] font-light leading-relaxed text-justify mb-8">{proj.desc}</p>
                                    <div className="pt-6 border-t border-[#5a189a]/30">
                                        <span className="text-sm font-light text-[#c8b6ff]">CORE FOCUS // <strong className="text-white font-normal">{proj.key}</strong></span>
                                    </div>
                                </NeuralNode>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SECTION 6 - CERTIFICATIONS */}
                <section className="w-full max-w-6xl">
                    <h2 className="text-3xl tracking-widest text-center text-[#e0aaff] mb-16 font-light">VALIDATION NODES // CERTS</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {CERTS.map((cert, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05, y: -10 }}
                                className="relative w-40 h-40 md:w-56 md:h-56 rounded-[3rem] cursor-pointer group overflow-hidden border border-[#5a189a]/50"
                                onClick={() => setModalImg(cert.img)}
                            >
                                <img src={cert.img} alt={cert.label} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-6">
                                    <span className="text-[10px] tracking-widest text-[#e0aaff] group-hover:text-white transition-colors uppercase">{cert.label}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* SECTION 8 - CONTACT */}
                <section className="w-full max-w-3xl pb-20">
                    <NeuralNode className="rounded-[4rem] text-center flex flex-col items-center py-20">
                        <h2 className="text-4xl font-light text-white mb-16 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">INITIATE HANDSHAKE</h2>

                        <div className="space-y-12 mb-16">
                            <div>
                                <p className="text-xs tracking-widest text-[#9d4edd] mb-2 uppercase">Neural Link</p>
                                <a href="mailto:tusharwashishtha2@gmail.com" className="text-2xl md:text-3xl text-[#e0aaff] hover:text-white transition-colors break-all">
                                    tusharwashishtha2@gmail.com
                                </a>
                            </div>
                            <div>
                                <p className="text-xs tracking-widest text-[#9d4edd] mb-2 uppercase">Physical Coordinates</p>
                                <p className="text-xl text-[#c8b6ff] font-light">Indore, India</p>
                            </div>
                        </div>

                        <a
                            href="/assets/Tushar_Washishtha_Resume_Fixed.pdf"
                            download="Tushar_Washishtha_Resume_Fixed.pdf"
                            onClick={handleResumeDownload}
                            className="inline-flex items-center gap-4 bg-white/5 border border-white/20 px-8 py-4 rounded-full text-white font-mono text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#3c096c] to-[#9d4edd] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                            <span className="relative z-10 text-xs tracking-[0.2em] flex items-center gap-3">
                                <Download size={14} /> DOWNLOAD DATA_PACKET (RESUME)
                            </span>
                        </a>
                    </NeuralNode>
                </section>

            </main>

            {/* FULLSCREEN EXAMINE MODAL */}
            <AnimatePresence>
                {modalImg && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[#050008]/90 p-6 cursor-zoom-out"
                        onClick={() => setModalImg(null)}
                    >
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0, borderRadius: "10rem" }}
                            animate={{ scale: 1, opacity: 1, borderRadius: "2rem" }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            src={modalImg}
                            className="max-w-full max-h-[90vh] shadow-[0_0_50px_rgba(157,78,221,0.3)] object-contain cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button className="absolute top-10 right-10 text-[#e0aaff] hover:text-white hover:rotate-90 transition-all duration-500">
                            <X size={40} strokeWidth={1} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
