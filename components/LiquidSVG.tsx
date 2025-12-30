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
        let targetFreq = 0.001 // Base stillness
        let currentFreq = 0.001

        let targetScale = 10 // Base warp
        let currentScale = 10

        // Mouse tracking
        const onMouseMove = (e: MouseEvent) => {
            // "Rock in Lake" - Medium Burst
            const speed = Math.abs(e.movementX) + Math.abs(e.movementY)

            // Freq: 0.015 to 0.04 (Stronger range)
            targetFreq = 0.015 + Math.min(speed * 0.001, 0.025)

            // Scale: 15 to 50 (Much stronger warp)
            targetScale = 15 + Math.min(speed * 0.8, 35)
        }

        // Touch tracking
        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                // Simulate "movement" by tracking delta (simplified for effect)
                // "Rock in Lake" - Medium Burst
                const speed = 15; // Higher base speed for touch

                // Freq: 0.015 to 0.04
                targetFreq = 0.015 + Math.min(speed * 0.001, 0.025)

                // Scale: 15 to 50
                targetScale = 15 + Math.min(speed * 0.8, 35)
            }
        }

        window.addEventListener("mousemove", onMouseMove)
        window.addEventListener("touchmove", onTouchMove, { passive: true })

        // Animation Loop
        const tick = () => {
            // Lerp to RESTING STATE
            // Slower decay (0.9 -> 0.95) for continuous feel
            targetFreq = targetFreq * 0.95 + 0.01 * 0.05
            targetScale = targetScale * 0.95 + 0 * 0.05

            // Lerp current values
            currentFreq += (targetFreq - currentFreq) * 0.1
            currentScale += (targetScale - currentScale) * 0.1

            // DYNAMIC FLOW (Alive, oscillating)
            // We oscillate X and Y differently to create a "drifting" feel
            const time = Date.now() * 0.001 // Faster time base
            const osc = Math.sin(time) * 0.002 // Base oscillation

            // Scale oscillation with intensity (more agitation = more ripple)
            const rippleIntensity = currentFreq * 0.1
            const flowFreqX = currentFreq + Math.sin(time) * rippleIntensity
            const flowFreqY = currentFreq + Math.cos(time * 0.7) * rippleIntensity

            // CAP MAXIMUM SCALE 
            const finalScale = Math.min(currentScale, 50) // Increased cap slightly for drama

            if (turbRef.current && displRef.current) {
                // Asymmetric frequency creates "flow" illusion
                turbRef.current.setAttribute("baseFrequency", `${flowFreqX} ${flowFreqY}`)
                displRef.current.setAttribute("scale", `${finalScale}`)
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
                        scale="0"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </defs>
        </svg>
    )
}
