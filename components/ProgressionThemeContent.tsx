"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, Unlock, Download, X } from "lucide-react"
import { SKILLS, EDUCATION, PROJECTS, CERTS } from "@/lib/data"
import { handleResumeDownload } from "@/lib/utils"

export default function ProgressionThemeContent() {
    // Game State: 1 to 7
    const [level, setLevel] = useState(1)
    const [modalImg, setModalImg] = useState<string | null>(null)
    const [modalProject, setModalProject] = useState<any>(null)

    // Lock scroll when modal is open
    useEffect(() => {
        if (modalImg || modalProject) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'auto'
    }, [modalImg, modalProject])

    const unlockLevel = (nextLevel: number) => {
        if (level < nextLevel) {
            setLevel(nextLevel)
            // Optional: scroll slightly to reveal next content, or rely on user scroll
        }
    }

    return (
        <div className="relative z-10 min-h-screen text-slate-300 font-mono pb-48 selection:bg-cyan-900/50 selection:text-cyan-100">

            {/* PROGRESS HUD */}
            <div className="fixed top-0 left-0 w-full z-40 bg-[#020617]/90 backdrop-blur-md border-b border-white/5 px-4 sm:px-6 pt-20 pb-4 sm:py-4 flex flex-row items-center justify-between shadow-2xl gap-2 sm:gap-4 transition-all pr-4 sm:pr-[280px]">
                <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-bold text-sm sm:text-lg">
                        {level}
                    </div>
                    <div className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-slate-400 hidden sm:block">
                        System Level
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-1/2 sm:w-full max-w-2xl h-1.5 sm:h-2 bg-slate-800 rounded-full overflow-hidden border border-white/5 relative flex-grow mx-2 sm:mx-6">
                    <motion.div
                        className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] absolute left-0 top-0"
                        initial={{ width: "14%" }}
                        animate={{ width: `${(level / 7) * 100}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                </div>

                <div className="text-[10px] sm:text-xs tracking-[0.2em] text-cyan-500 font-bold w-12 text-right flex-shrink-0">
                    {Math.round((level / 7) * 100)}%
                </div>
            </div>

            <main className="container mx-auto px-4 md:px-6 max-w-4xl pt-48 sm:pt-36 flex flex-col gap-12">

                {/* ==================== LEVEL 1: IDENTITY ==================== */}
                <motion.section
                    className="border border-white/10 bg-white/[0.02] p-8 md:p-16 rounded-lg relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="absolute top-0 right-0 p-4 text-xs text-slate-600 tracking-widest uppercase flex items-center gap-2">
                        <Unlock size={14} className="text-cyan-500" /> Level 01
                    </div>

                    <div className="text-xs tracking-[0.3em] text-cyan-500 mb-6 uppercase">Identity Verified</div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-8">
                        TUSHAR<br />WASHISHTHA
                    </h1>

                    <div className="text-sm md:text-lg font-light tracking-wide text-slate-400 text-justify leading-relaxed border-l-2 border-cyan-500/50 pl-6">
                        Entry-Level Front-End & Python Developer. Passionate about Web & AI. Ready to Learn and Collaborate.
                    </div>

                    {level === 1 && (
                        <motion.button
                            onClick={() => unlockLevel(2)}
                            className="mt-12 w-full py-6 border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 tracking-widest uppercase transition-all flex items-center justify-center gap-4 group"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Lock size={18} className="group-hover:hidden" />
                            <Unlock size={18} className="hidden group-hover:block" />
                            Unlock Level 2: About
                        </motion.button>
                    )}
                </motion.section>

                {/* ==================== LEVEL 2: ABOUT ==================== */}
                <LevelContainer currentLevel={level} requiredLevel={2} title="System.About">
                    <div className="text-base md:text-xl leading-relaxed text-slate-300 space-y-6 text-justify font-light">
                        <p>I operate at the intersection of structural engineering and creative logic. My foundation is built on HTML5 and CSS3. However, I view JavaScript as the nervous system—it breathes life into the static grid.</p>
                        <p>Beyond the browser, my thinking is powered by Python. I use it to solve challenges, architect backends with Flask, and experiment with AI & Machine Learning.</p>
                        <p>I am a builder by nature. My philosophy is simple: learn by doing, break things to understand them, and write code that is clean and functional.</p>
                    </div>

                    {level === 2 && (
                        <UnlockButton onClick={() => unlockLevel(3)} text="Unlock Level 3: Education" />
                    )}
                </LevelContainer>

                {/* ==================== LEVEL 3: EDUCATION ==================== */}
                <LevelContainer currentLevel={level} requiredLevel={3} title="System.Education">
                    <div className="space-y-6">
                        {EDUCATION.map((ed, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="border border-white/5 p-6 bg-white/[0.01] flex flex-col md:flex-row gap-6 justify-between items-start md:items-center"
                            >
                                <div>
                                    <h3 className="text-xl font-medium text-white mb-2">{ed.title}</h3>
                                    <div className="text-sm text-cyan-500/70 tracking-wider font-bold mb-2 md:mb-0">{ed.meta}</div>
                                </div>
                                <div className="text-sm text-slate-400 text-justify md:text-right max-w-sm">
                                    {ed.desc}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {level === 3 && (
                        <UnlockButton onClick={() => unlockLevel(4)} text="Unlock Level 4: Skills" />
                    )}
                </LevelContainer>

                {/* ==================== LEVEL 4: SKILLS ==================== */}
                <LevelContainer currentLevel={level} requiredLevel={4} title="System.Capabilities">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {SKILLS.map((skill, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: i * 0.05, type: 'spring' }}
                                className="border border-white/5 bg-slate-900/50 p-6 flex flex-col items-center justify-center text-center group hover:border-cyan-500/50 hover:bg-cyan-950/30 transition-all"
                            >
                                <div className="text-lg text-white mb-1 group-hover:text-cyan-300 transition-colors">{skill.name}</div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest">{skill.desc}</div>
                            </motion.div>
                        ))}
                    </div>

                    {level === 4 && (
                        <UnlockButton onClick={() => unlockLevel(5)} text="Unlock Level 5: Projects" />
                    )}
                </LevelContainer>

                {/* ==================== LEVEL 5: PROJECTS ==================== */}
                <LevelContainer currentLevel={level} requiredLevel={5} title="System.Executables" description="Select a terminal to inspect payload">
                    <div className="grid md:grid-cols-2 gap-6">
                        {PROJECTS.map((proj, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: i * 0.2 }}
                                onClick={() => setModalProject(proj)}
                                className="cursor-pointer group border border-white/10 bg-[#050510] overflow-hidden flex flex-col hover:border-cyan-500/50 transition-colors"
                            >
                                <div className="aspect-video relative overflow-hidden bg-slate-900">
                                    <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay group-hover:opacity-0 transition-opacity z-10" />
                                    <img src={proj.img1 || proj.images?.[0]} alt={proj.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-2xl text-white mb-2 group-hover:text-cyan-400 transition-colors">{proj.title}</h3>
                                    <div className="text-xs tracking-widest text-cyan-700 mb-4">{proj.tech}</div>
                                    <p className="text-sm text-slate-400 leading-relaxed text-justify line-clamp-3">{proj.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {level === 5 && (
                        <UnlockButton onClick={() => unlockLevel(6)} text="Unlock Level 6: Certifications" />
                    )}
                </LevelContainer>

                {/* ==================== LEVEL 6: CERTIFICATIONS ==================== */}
                <LevelContainer currentLevel={level} requiredLevel={6} title="System.Verification_Keys">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {CERTS.map((cert, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => setModalImg(cert.img)}
                                className="cursor-pointer group"
                            >
                                <div className="aspect-[4/3] border border-white/10 overflow-hidden relative mb-3 bg-slate-900 group-hover:border-cyan-500/50 transition-colors">
                                    <div className="absolute inset-0 bg-cyan-900/40 mix-blend-multiply group-hover:opacity-0 transition-opacity z-10" />
                                    <img src={cert.img} alt={cert.label} className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 transition-all duration-500" />
                                </div>
                                <div className="text-[10px] text-center text-slate-400 tracking-widest uppercase group-hover:text-cyan-400 transition-colors">{cert.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {level === 6 && (
                        <UnlockButton onClick={() => unlockLevel(7)} text="Unlock Final Level: Contact" />
                    )}
                </LevelContainer>

                {/* ==================== LEVEL 7: CONTACT ==================== */}
                <LevelContainer currentLevel={level} requiredLevel={7} title="System.Transmission">
                    <div className="border border-white/10 bg-slate-900/30 p-8 md:p-16 text-center flex flex-col items-center">
                        <h2 className="text-2xl md:text-4xl text-white tracking-widest uppercase mb-8">Signal Established</h2>

                        <div className="space-y-4 text-base md:text-lg text-slate-400 font-light mb-12">
                            <div><a href="mailto:tusharwashishtha2@gmail.com" className="hover:text-cyan-400 transition-colors">tusharwashishtha2@gmail.com</a></div>
                            <div>Indore, India</div>
                        </div>

                        <div className="flex gap-8 mb-12 text-sm tracking-widest uppercase text-slate-500">
                            <a href="https://linkedin.com/in/tushar-washishtha-a04192305" className="hover:text-cyan-400 transition-colors">[ LinkedIn ]</a>
                            <a href="https://github.com/tusharwashishtha2" className="hover:text-cyan-400 transition-colors">[ GitHub ]</a>
                        </div>

                        <button
                            onClick={handleResumeDownload}
                            className="flex items-center gap-3 px-8 py-4 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all tracking-widest uppercase"
                        >
                            <Download size={18} />
                            Extract Payload (Resume)
                        </button>
                    </div>
                </LevelContainer>

            </main>

            {/* PROJECT MODAL */}
            <AnimatePresence>
                {modalProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 font-mono"
                        onClick={() => setModalProject(null)}
                    >
                        <button className="absolute top-6 right-6 text-white/50 hover:text-white p-2">
                            <X size={32} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-[#050510] border border-cyan-500/30 p-6 md:p-12 max-w-4xl w-full max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-xs text-cyan-500 tracking-[0.3em] uppercase mb-4">Project Terminal</div>
                            <h2 className="text-3xl md:text-5xl text-white mb-4 leading-tight">{modalProject.title}</h2>
                            <div className="text-xs tracking-[0.2em] text-slate-400 mb-8 uppercase">{modalProject.tech}</div>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                {(modalProject.images || [modalProject.img1, modalProject.img2]).map((img: string, idx: number) => (
                                    <div key={idx} className="border border-white/10">
                                        <img src={img} alt="Project view" className="w-full h-auto" />
                                    </div>
                                ))}
                            </div>

                            <div className="text-sm md:text-base text-slate-300 leading-relaxed text-justify mb-8 space-y-4 font-light">
                                <p>{modalProject.desc}</p>
                                <div className="p-6 border border-white/5 bg-white/[0.02]">
                                    <div className="text-xs text-cyan-500 uppercase tracking-widest mb-4">Architecture</div>
                                    <div className="space-y-2">{modalProject.key}</div>
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
                        className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
                        onClick={() => setModalImg(null)}
                    >
                        <button className="absolute top-6 right-6 text-white/50 hover:text-white p-2 border border-white/10 bg-white/5">
                            <X size={24} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            src={modalImg}
                            className="max-w-full max-h-[90vh] border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)]"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}

// Helper components for consistency
const LevelContainer = ({ currentLevel, requiredLevel, title, description, children }: { currentLevel: number, requiredLevel: number, title: string, description?: string, children: React.ReactNode }) => {
    const isUnlocked = currentLevel >= requiredLevel;

    return (
        <motion.section
            className={`border rounded-lg relative overflow-hidden transition-all duration-1000 ${isUnlocked ? 'border-white/10 bg-white/[0.02] p-8 md:p-12' : 'border-dashed border-white/5 bg-transparent p-6 flex flex-col items-center justify-center min-h-[150px]'}`}
            initial={false}
            animate={{
                opacity: isUnlocked ? 1 : 0.4,
                scale: isUnlocked ? 1 : 0.98
            }}
        >
            <div className={`absolute top-0 right-0 p-4 text-xs tracking-widest uppercase flex items-center gap-2 ${isUnlocked ? 'text-slate-600' : 'text-slate-700'}`}>
                {isUnlocked ? <><Unlock size={14} className="text-cyan-500" /> Level 0{requiredLevel}</> : <><Lock size={14} /> Locked</>}
            </div>

            {isUnlocked ? (
                <>
                    <h2 className="text-xl md:text-2xl text-white mb-2 uppercase tracking-widest">{title}</h2>
                    {description && <div className="text-xs text-slate-500 uppercase tracking-widest mb-8">{description}</div>}
                    {!description && <div className="h-4" />} {/* Spacer */}

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {children}
                    </motion.div>
                </>
            ) : (
                <div className="flex flex-col items-center gap-3 select-none">
                    <Lock size={32} className="text-slate-800" />
                    <div className="text-sm tracking-[0.3em] uppercase text-slate-600">Level {requiredLevel} Locked</div>
                </div>
            )}
        </motion.section>
    )
}

const UnlockButton = ({ onClick, text }: { onClick: () => void, text: string }) => (
    <motion.button
        onClick={onClick}
        className="mt-12 w-full py-5 border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/20 text-cyan-400 tracking-widest uppercase transition-all flex items-center justify-center gap-4 group text-sm"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
    >
        <Lock size={16} className="group-hover:hidden" />
        <Unlock size={16} className="hidden group-hover:block" />
        {text}
    </motion.button>
)
