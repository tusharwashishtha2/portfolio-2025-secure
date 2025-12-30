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
            // VERY SLOW DECAY (Simulates heavy fluid momentum)
            targetScale = targetScale * 0.95 + 0 * 0.05

            // Lerp current values for smoothness
            currentScale += (targetScale - currentScale) * 0.05

            // CONSTANT SMOOTH FLOW (No agitation bubbles)
            // Just a pure, rolling ocean swell
            const timeStr = t * 0.0002; // Slow time

            // Ultra Low Frequency = Large, smooth waves
            // We use two different frequencies for X and Y to define the "water surface"
            const freqX = 0.002 + Math.sin(timeStr) * 0.001;
            const freqY = 0.002 + Math.cos(timeStr) * 0.001;

            if (turbRef.current && displRef.current) {
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
