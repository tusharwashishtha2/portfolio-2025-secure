"use client"

import { useEffect, useRef } from "react"
// WE REMOVED GSAP because we are using requestAnimationFrame manually
// import { gsap } from "gsap"

export default function LiquidSVG() {
    const turbRef = useRef<SVGFETurbulenceElement>(null)
    const displRef = useRef<SVGFEDisplacementMapElement>(null)
    const rafRef = useRef<number>(0)

    useEffect(() => {
        // Target state
        let targetFreq = 0.01 // Base flow
        let targetScale = 2   // Slight resting wobble (so it's never totally gone)

        let currentFreq = 0.01
        let currentScale = 2

        // Mouse tracking (ONLY AFFECTS SCALE/INTENSITY NOW, NOT FREQUENCY)
        const onMouseMove = (e: MouseEvent) => {
            const speed = Math.abs(e.movementX) + Math.abs(e.movementY)
            // Scale: MUCH STRONGER (50 to 150)
            // This makes the "wave" clearly visible
            targetScale = 50 + Math.min(speed * 2.0, 100)
        }

        // Touch tracking
        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const speed = 15;
                targetScale = 60 + Math.min(speed * 2.0, 100)
            }
        }

        window.addEventListener("mousemove", onMouseMove)
        window.addEventListener("touchmove", onTouchMove, { passive: true })

        // Animation Loop
        const tick = (t: DOMHighResTimeStamp) => {
            // Lerp to RESTING STATE
            // Faster decay (0.92) - settles nicely but not sluggishly
            targetScale = targetScale * 0.92 + 2 * 0.08

            // Lerp current values - FASTER RESPONSE (0.1)
            currentScale += (targetScale - currentScale) * 0.1

            // FASTER, ENERGETIC FLOW
            // "Drop in bucket" means the wave travels FAST
            const timeStr = t * 0.001; // 5x faster than before

            // Middle Frequency = Visible Ripples (not too big, not too small)
            // Agitation: faster frequency when scale is high (creating smaller, faster ripples on interact)
            const agitation = (currentScale / 100) * 0.005;

            const freqX = 0.012 + Math.sin(timeStr) * (0.002 + agitation);
            const freqY = 0.012 + Math.cos(timeStr) * (0.002 + agitation);

            if (turbRef.current && displRef.current) {
                // Use TURBULENCE type for sharper water-like ridges? 
                // No, sticking to fractalNoise for smooth warping, just faster.
                turbRef.current.setAttribute("baseFrequency", `${freqX} ${freqY}`)
                displRef.current.setAttribute("scale", `${currentScale}`)
            }
            rafRef.current = requestAnimationFrame(tick)
        }
        // Start loop
        rafRef.current = requestAnimationFrame(tick)

        return () => {
            window.removeEventListener("mousemove", onMouseMove)
            window.removeEventListener("touchmove", onTouchMove)
            cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return (
        <svg className="fixed inset-0 pointer-events-none z-[-1] w-0 h-0 overflow-hidden">
            <defs>
                <filter id="liquid-warp">
                    <feTurbulence
                        ref={turbRef}
                        type="fractalNoise"
                        baseFrequency="0.01 0.01"
                        numOctaves="1"
                        result="noise"
                    />
                    <feDisplacementMap
                        ref={displRef}
                        in="SourceGraphic"
                        in2="noise"
                        scale="2"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </defs>
        </svg>
    )
}
