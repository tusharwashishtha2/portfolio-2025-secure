"use client"
import { useEffect, useRef } from "react"

export default function PaperBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d", { willReadFrequently: true })
        if (!ctx) return

        let width = 0
        let height = 0
        let isDrawing = false
        let lastX = 0
        let lastY = 0

        // Represents droplets of ink
        const splatters: { x: number, y: number, radius: number, alpha: number, vx: number, vy: number, life: number, maxLife: number }[] = []

        const resize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight

            // Fill initial paper texture
            ctx.fillStyle = "#FDFCF0" // Base paper color
            ctx.fillRect(0, 0, width, height)

            // Add subtle grain/texture base (rendered once for performance)
            const imgData = ctx.getImageData(0, 0, width, height)
            const data = imgData.data
            for (let i = 0; i < data.length; i += 4) {
                // Subtle noise for paper grain
                const noise = (Math.random() - 0.5) * 10
                data[i] = Math.max(0, Math.min(255, 253 + noise))     // R (-2)
                data[i + 1] = Math.max(0, Math.min(255, 252 + noise))   // G (-1)
                data[i + 2] = Math.max(0, Math.min(255, 240 + noise))   // B (more yellow/warm)
                data[i + 3] = 255
            }
            ctx.putImageData(imgData, 0, 0)
        }

        window.addEventListener("resize", resize)
        resize()

        const addInk = (x: number, y: number, isMove = false) => {
            const count = isMove ? 2 : 10; // more splatters on click/stop
            for (let i = 0; i < count; i++) {
                splatters.push({
                    x: x + (Math.random() - 0.5) * (isMove ? 10 : 30),
                    y: y + (Math.random() - 0.5) * (isMove ? 10 : 30),
                    radius: Math.random() * (isMove ? 4 : 8) + 1,
                    alpha: Math.random() * 0.4 + 0.1, // very light initially to build up
                    vx: (Math.random() - 0.5) * 1,
                    vy: (Math.random() - 0.5) * 1,
                    life: 0,
                    maxLife: Math.random() * 100 + 50 // frames before fully fading or bleeding
                })
            }
        }

        const onPointerMove = (e: PointerEvent) => {
            if (e.pointerType === 'mouse' || e.pointerType === 'touch') {
                // simple interpolation to avoid broken lines if moving fast
                const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY)
                if (isDrawing && dist > 5) {
                    const steps = Math.min(Math.floor(dist / 5), 20)
                    for (let i = 0; i < steps; i++) {
                        const px = lastX + (e.clientX - lastX) * (i / steps)
                        const py = lastY + (e.clientY - lastY) * (i / steps)
                        addInk(px, py, true)
                    }
                } else if (!isDrawing) {
                    addInk(e.clientX, e.clientY, true) // subtle trail when just moving without click
                }
            }
            lastX = e.clientX
            lastY = e.clientY
        }

        const onPointerDown = (e: PointerEvent) => {
            isDrawing = true
            lastX = e.clientX
            lastY = e.clientY
            addInk(e.clientX, e.clientY, false) // bigger splash on click
        }

        const onPointerUp = () => {
            isDrawing = false
        }

        window.addEventListener("pointermove", onPointerMove)
        window.addEventListener("pointerdown", onPointerDown)
        window.addEventListener("pointerup", onPointerUp)

        // Offscreen canvas to preserve the fade effect while maintaining the static paper grain below
        const inkCanvas = document.createElement("canvas")
        inkCanvas.width = window.innerWidth
        inkCanvas.height = window.innerHeight
        const inkCtx = inkCanvas.getContext("2d")

        // Handle resize for ink canvas too
        window.addEventListener("resize", () => {
            if (inkCanvas.width !== window.innerWidth || inkCanvas.height !== window.innerHeight) {
                inkCanvas.width = window.innerWidth
                inkCanvas.height = window.innerHeight
            }
        })

        let animationFrameId: number

        const render = () => {
            if (!inkCtx) return

            // 1. Fade the ink slowly to transparent (simulate drying and disappearing over long time)
            inkCtx.globalCompositeOperation = "destination-out"
            inkCtx.fillStyle = "rgba(0, 0, 0, 0.01)" // incredibly light fade to keep trail long
            inkCtx.fillRect(0, 0, width, height)
            inkCtx.globalCompositeOperation = "source-over"

            // Blur the ink slightly over time to simulate bleeding into paper
            // inkCtx.filter = "blur(1px)"
            // Not using filter here because it kills performance over time. 
            // Better to just draw circles and let opacity build up.

            // 2. Draw new splatters onto ink canvas
            for (let i = splatters.length - 1; i >= 0; i--) {
                const s = splatters[i]

                // Deep dark inky blue/black
                inkCtx.fillStyle = `rgba(15, 23, 42, ${s.alpha})`
                inkCtx.beginPath()
                inkCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
                inkCtx.fill()

                // diffuse movement
                s.x += s.vx
                s.y += s.vy
                s.radius += 0.05 // expand slowly like bleeding ink
                s.alpha *= 0.98  // fade out

                s.life++
                if (s.life >= s.maxLife || s.alpha < 0.01) {
                    splatters.splice(i, 1)
                }
            }

            // 3. Composite ink canvas over the static paper background canvas
            // We only need to copy the ink canvas over.
            // Wait, we can't easily preserve the paper grain if we just clear.
            // Actually, we can put the paper grain in CSS and only draw the INK on this transparent canvas!
            // Let's change the approach slightly for better performance and true paper feel:

            ctx.clearRect(0, 0, width, height) // Clear the display canvas heavily
            ctx.drawImage(inkCanvas, 0, 0)

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            window.removeEventListener("resize", resize)
            window.removeEventListener("pointermove", onPointerMove)
            window.removeEventListener("pointerdown", onPointerDown)
            window.removeEventListener("pointerup", onPointerUp)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden"
            style={{
                backgroundColor: "#F4EFE6", // Deep cream/beige paper
                backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
                // Fallback CSS noise if image fails:
                boxShadow: "inset 0 0 100px rgba(0,0,0,0.1)"
            }}>
            {/* Note: I'm using a common seamless texture URL for the physical paper feel. Will add a highly subtle CSS fallback. */}
            <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>

            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full block z-0 mix-blend-multiply"
            />
        </div>
    )
}
