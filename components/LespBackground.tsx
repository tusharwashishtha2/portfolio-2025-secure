"use client"

import { useEffect, useRef } from "react"

export default function LespBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let width = window.innerWidth
        let height = window.innerHeight

        const resize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
        }
        window.addEventListener("resize", resize)
        resize()

        // Live chart data
        const chartData1: number[] = Array(100).fill(50)
        const chartData2: number[] = Array(100).fill(20)

        // Matrix/data streams
        const streams: { x: number, y: number, speed: number, text: string }[] = []
        for (let i = 0; i < 30; i++) {
            streams.push({
                x: Math.random() * width,
                y: Math.random() * height,
                speed: 1 + Math.random() * 3,
                text: "0x" + Math.floor(Math.random() * 16777215).toString(16).toUpperCase()
            })
        }

        let time = 0

        const draw = () => {
            ctx.fillStyle = "rgba(5, 5, 5, 0.3)" // Trail effect
            ctx.fillRect(0, 0, width, height)

            time++

            // Update chart data
            if (time % 5 === 0) {
                chartData1.shift()
                chartData1.push(50 + Math.sin(time * 0.05) * 30 + (Math.random() * 20 - 10))

                chartData2.shift()
                chartData2.push(30 + Math.cos(time * 0.03) * 20 + (Math.random() * 15 - 7))
            }

            // Draw Grid
            ctx.strokeStyle = "rgba(255, 255, 255, 0.03)"
            ctx.lineWidth = 1
            const gridSize = 40
            const offsetX = (time * 0.5) % gridSize
            const offsetY = (time * 0.5) % gridSize

            ctx.beginPath()
            for (let x = -offsetX; x < width; x += gridSize) {
                ctx.moveTo(x, 0)
                ctx.lineTo(x, height)
            }
            for (let y = -offsetY; y < height; y += gridSize) {
                ctx.moveTo(0, y)
                ctx.lineTo(width, y)
            }
            ctx.stroke()

            // Draw Streams
            ctx.font = "10px monospace"
            streams.forEach((s) => {
                ctx.fillStyle = "rgba(100, 100, 100, 0.4)"
                ctx.fillText(s.text, s.x, s.y)
                s.y += s.speed
                if (s.y > height) {
                    s.y = -20
                    s.x = Math.random() * width
                    s.text = "0x" + Math.floor(Math.random() * 16777215).toString(16).toUpperCase()
                }
            })

            // Draw Charts (Bottom third of the screen)
            const chartHeight = Math.min(200, height / 3)
            const chartY = height - chartHeight - 50
            const stepX = width / chartData1.length

            ctx.beginPath()
            ctx.moveTo(0, chartY + chartHeight - (chartData1[0] / 100) * chartHeight)
            for (let i = 1; i < chartData1.length; i++) {
                ctx.lineTo(i * stepX, chartY + chartHeight - (chartData1[i] / 100) * chartHeight)
            }
            ctx.strokeStyle = "rgba(200, 200, 200, 0.3)"
            ctx.lineWidth = 1.5
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(0, chartY + chartHeight - (chartData2[0] / 100) * chartHeight)
            for (let i = 1; i < chartData2.length; i++) {
                ctx.lineTo(i * stepX, chartY + chartHeight - (chartData2[i] / 100) * chartHeight)
            }
            ctx.strokeStyle = "rgba(100, 100, 100, 0.3)"
            ctx.lineWidth = 1
            ctx.stroke()

            // Live crosshair effect
            if (time % 2 === 0) {
                ctx.beginPath()
                ctx.moveTo(width / 2, 0)
                ctx.lineTo(width / 2, height)
                ctx.moveTo(0, height / 2)
                ctx.lineTo(width, height / 2)
                ctx.strokeStyle = "rgba(255, 255, 255, 0.02)"
                ctx.stroke()
            }

            requestAnimationFrame(draw)
        }

        draw()

        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#020202]"
        />
    )
}
