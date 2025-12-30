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
            // Scale: 10 to 40
            targetScale = 10 + Math.min(speed * 0.5, 30)
        }

        // Touch tracking
        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const speed = 15;
                targetScale = 15 + Math.min(speed * 0.5, 30)
            }
        }

        window.addEventListener("mousemove", onMouseMove)
        window.addEventListener("touchmove", onTouchMove, { passive: true })

        // Animation Loop
        const tick = () => {
            // Lerp to RESTING STATE
            targetScale = targetScale * 0.9 + 2 * 0.1 // Decay to 2 (not 0)

            // Lerp current values
            currentScale += (targetScale - currentScale) * 0.1

            // CONSTANT GENTLE FLOW (Time based only)
            // Prevents massive spikes in noise generation complexity
            const time = Date.now() * 0.0005
            const flowFreq = 0.01 + Math.sin(time) * 0.002

            if (turbRef.current && displRef.current) {
                turbRef.current.setAttribute("baseFrequency", `${flowFreq} ${flowFreq}`)
                displRef.current.setAttribute("scale", `${currentScale}`)
            }
            rafRef.current = requestAnimationFrame(tick)
        }
        tick()

        return () => {
            window.removeEventListener("mousemove", onMouseMove)
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
