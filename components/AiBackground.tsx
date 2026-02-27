"use client"
import { motion } from "framer-motion"

export default function AiBackground() {
    return (
        <div className="fixed inset-0 w-full h-full z-0 bg-[#0a0a0c] overflow-hidden pointer-events-none">
            {/* Subtle Grid / Data Lines */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            ></div>

            {/* Floating Light Surfaces / Depth Highlights */}
            <motion.div
                animate={{
                    x: [-50, 50, -50],
                    y: [-20, 30, -20],
                    opacity: [0.03, 0.08, 0.03],
                }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#06b6d4] rounded-full blur-[180px]"
            />
            <motion.div
                animate={{
                    x: [50, -50, 50],
                    y: [20, -30, 20],
                    opacity: [0.02, 0.06, 0.02],
                }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#3b82f6] rounded-full blur-[180px]"
            />

            {/* Muted silver lines drifting vertically - Data streams */}
            <div className="absolute inset-0 flex justify-around opacity-[0.1]">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ y: "-100%" }}
                        animate={{ y: "100vh" }}
                        transition={{ repeat: Infinity, duration: 8 + i * 3, ease: "linear", delay: i * 1.5 }}
                        className="w-[1px] h-48 bg-gradient-to-b from-transparent via-[#94a3b8] to-transparent"
                    />
                ))}
            </div>
        </div>
    )
}
