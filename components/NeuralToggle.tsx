"use client"
import { motion } from "framer-motion"
import { Cpu, Eye, EyeOff } from "lucide-react"

export default function NeuralToggle({ active, toggle }: { active: boolean, toggle: () => void }) {
    return (
        <div className="fixed top-6 right-4 md:right-8 z-50 flex items-center gap-2 md:gap-4 pointer-events-none">
            {/* Unified Helper Text (Desktop & Mobile) */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border pointer-events-auto
                    ${active
                        ? "bg-orange-950/20 border-orange-500/30 text-orange-400 shadow-[0_0_15px_rgba(255,165,0,0.3)]"
                        : "bg-white/40 border-slate-200 text-slate-600 shadow-sm"
                    }`}
            >
                <motion.span
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="font-mono text-[9px] md:text-[10px] tracking-widest font-bold whitespace-nowrap"
                >
                    {active ? "TAP TO ENTER LIQUID MODE" : "TAP TO ENTER GALAXY MODE"}
                </motion.span>
                <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-[10px]"
                >
                    ➔
                </motion.span>
            </motion.div>

            <motion.button
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={toggle}
                className={`
                    pointer-events-auto flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full border backdrop-blur-md font-mono text-[10px] md:text-xs tracking-widest uppercase transition-all duration-500
                    ${active
                        ? "bg-orange-950/20 border-orange-500 text-orange-400 shadow-[0_0_20px_rgba(255,165,0,0.4)] hover:bg-orange-900/40"
                        : "bg-white/50 border-black/10 text-slate-900 hover:bg-white hover:shadow-lg"
                    }
                `}
            >
                {active ? (
                    <>
                        <Cpu size={14} className="animate-pulse" />
                        <span className="hidden md:inline">GALAXY::CORE</span>
                        <span className="md:hidden">CORE</span>
                    </>
                ) : (
                    <>
                        <Eye size={14} />
                        <span className="hidden md:inline">VIEW CODE</span>
                        <span className="md:hidden">CODE</span>
                    </>
                )}
            </motion.button>
        </div>
    )
}
