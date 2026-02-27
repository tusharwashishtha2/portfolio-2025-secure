"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cpu, Eye, ChevronDown, Check } from "lucide-react"

interface ThemeOption {
    id: string
    name: string
}

interface NeuralToggleProps {
    currentThemeId: string
    currentThemeName: string
    themes: ThemeOption[]
    setTheme: (id: string) => void
}

export default function NeuralToggle({ currentThemeId, currentThemeName, themes, setTheme }: NeuralToggleProps) {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div ref={menuRef} className="fixed top-3 right-3 md:top-6 md:right-8 z-[999] flex flex-col items-end gap-2 pointer-events-none">
            {/* The Main Button */}
            <motion.button
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    pointer-events-auto flex items-center gap-2 md:gap-3 px-3 py-2 md:px-6 md:py-3.5 rounded-xl md:rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-500
                    ${currentThemeId !== "vision"
                        ? "bg-black/60 border-white/20 text-white hover:bg-black/80 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        : "bg-white/80 border-black/10 text-slate-900 hover:bg-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                    }
                `}
            >
                {currentThemeId !== "vision" ? <Cpu className="w-4 h-4 md:w-[18px] md:h-[18px] animate-pulse text-cyan-400" /> : <Eye className="w-4 h-4 md:w-[18px] md:h-[18px] text-blue-600" />}

                <div className="flex flex-col items-start leading-[1.1]">
                    <span className="text-[7px] md:text-[10px] uppercase tracking-[0.2em] opacity-60 font-medium">SYSTEM THEME</span>
                    <span className="text-xs md:text-base font-mono uppercase tracking-widest font-bold mt-0.5">{currentThemeName}</span>
                </div>

                <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-500 ml-1 md:ml-2 ${isOpen ? "rotate-180" : ""}`} />
            </motion.button>

            {/* The Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, scale: 0.95, filter: "blur(4px)" }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className={`pointer-events-auto flex flex-col mt-2 min-w-[240px] rounded-2xl overflow-hidden border backdrop-blur-2xl shadow-2xl transition-colors duration-500
                            ${currentThemeId !== "vision"
                                ? "bg-[#0a0a0c]/90 border-white/10"
                                : "bg-white/90 border-[#d2d2d7]"
                            }
                        `}
                    >
                        <div className={`px-5 py-3 text-[10px] uppercase tracking-[0.2em] font-medium border-b ${currentThemeId !== "vision" ? "border-white/10 text-white/50" : "border-black/5 text-slate-400"}`}>
                            Select Interface
                        </div>
                        <div className="flex flex-col py-2">
                            {themes.map((t) => {
                                const isActive = currentThemeId === t.id
                                return (
                                    <button
                                        key={t.id}
                                        onClick={() => {
                                            setTheme(t.id)
                                            setIsOpen(false)
                                        }}
                                        className={`
                                            w-full flex items-center justify-between px-5 py-3 text-xs md:text-sm font-mono tracking-widest transition-all duration-300
                                            ${currentThemeId !== "vision"
                                                ? isActive ? "bg-white/10 text-cyan-400 font-bold" : "text-slate-300 hover:bg-white/5 hover:text-white"
                                                : isActive ? "bg-black/5 text-blue-600 font-bold" : "text-slate-600 hover:bg-black/5 hover:text-black"
                                            }
                                        `}
                                    >
                                        <span className="flex items-center gap-3">
                                            {isActive ? <Check size={14} className={currentThemeId !== "vision" ? "text-cyan-400" : "text-blue-600"} /> : <span className="w-[14px]"></span>}
                                            {t.name}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
