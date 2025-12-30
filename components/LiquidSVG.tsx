"use client"

import { useEffect, useRef } from "react"
// WE REMOVED GSAP because we are using requestAnimationFrame manually
// import { gsap } from "gsap"

export default function LiquidSVG() {
    const displRef = useRef<SVGFEDisplacementMapElement>(null)
    const rafRef = useRef<number>(0)

    useEffect(() => {
        // Target state
        let targetScale = 10 // Base warp
        let currentScale = 10

        // Mouse tracking
        const onMouseMove = (e: MouseEvent) => {
            // "Rock in Lake" - Medium Burst
            const speed = Math.abs(e.movementX) + Math.abs(e.movementY)

            // Scale: 15 to 50 (Much stronger warp)
            targetScale = 15 + Math.min(speed * 0.8, 35)
        }

        // Touch tracking
        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                // Simulate "movement" by tracking delta (simplified for effect)
                // "Rock in Lake" - Medium Burst
                const speed = 15; // Higher base speed for touch

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
            targetScale = targetScale * 0.95 + 0 * 0.05

            // Lerp current values
            currentScale += (targetScale - currentScale) * 0.1

            // CAP MAXIMUM SCALE 
            const finalScale = Math.min(currentScale, 30)

            // ONLY UPDATE SCALE (Cheap)
            // We do NOT update baseFrequency (Expensive Noise Generation)
            if (displRef.current) {
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
                        type="fractalNoise"
                        baseFrequency="0.015 0.015"
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
