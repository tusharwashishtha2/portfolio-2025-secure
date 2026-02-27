"use client"
import { useEffect, useRef } from "react"

export default function HiddenBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d", { alpha: false })
        if (!ctx) return

        let width = 0
        let height = 0
        let animationFrameId: number

        const resize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
        }

        window.addEventListener("resize", resize)
        resize()

        let time = 0

        const render = () => {
            // Extremely dark, almost imperceptible background
            ctx.fillStyle = "#030303"
            ctx.fillRect(0, 0, width, height)

            // Draw a few very faint, slow moving large gradient orbs
            const gradient1 = ctx.createRadialGradient(
                width / 2 + Math.sin(time * 0.0005) * 200,
                height / 2 + Math.cos(time * 0.0003) * 200,
                0,
                width / 2,
                height / 2,
                800
            )
            gradient1.addColorStop(0, "rgba(20, 20, 20, 0.4)")
            gradient1.addColorStop(1, "rgba(3, 3, 3, 0)")

            ctx.fillStyle = gradient1
            ctx.fillRect(0, 0, width, height)

            // Add subtle noise
            const imgData = ctx.getImageData(0, 0, width, height)
            const data = imgData.data
            for (let i = 0; i < data.length; i += 4) {
                // VERY faint noise
                const noise = Math.random() * 3
                data[i] = Math.min(255, data[i] + noise)
                data[i + 1] = Math.min(255, data[i + 1] + noise)
                data[i + 2] = Math.min(255, data[i + 2] + noise)
            }
            ctx.putImageData(imgData, 0, 0)

            time++
            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            window.removeEventListener("resize", resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <div className="absolute inset-0 w-full h-full bg-[#030303] overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full block z-0 opacity-50"
            />
        </div>
    )
}
