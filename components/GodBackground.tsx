"use client"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function GodBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let width = window.innerWidth
        let height = window.innerHeight
        canvas.width = width
        canvas.height = height

        // Mouse tracking
        let mouse = { x: width / 2, y: height / 2, vx: 0, vy: 0, speed: 0 }
        let lastMouse = { x: width / 2, y: height / 2 }

        // System state (tension/awareness)
        let systemTension = 0.1 // 0 to 1
        const targetTension = { value: 0.1 }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouse.x = e.clientX - rect.left
            mouse.y = e.clientY - rect.top

            // Calculate velocity
            const dx = mouse.x - lastMouse.x
            const dy = mouse.y - lastMouse.y
            const speed = Math.sqrt(dx * dx + dy * dy)

            mouse.vx = dx
            mouse.vy = dy
            mouse.speed = speed

            // Spike tension on fast movement
            if (speed > 5) {
                targetTension.value = Math.min(1, targetTension.value + speed * 0.005)
            }

            lastMouse.x = mouse.x
            lastMouse.y = mouse.y
        }

        window.addEventListener("mousemove", handleMouseMove)

        const handleResize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
            initParticles()
        }
        window.addEventListener("resize", handleResize)

        class Particle {
            x: number
            y: number
            vx: number
            vy: number
            baseX: number
            baseY: number
            size: number
            baseSize: number
            angle: number
            speed: number

            constructor(x: number, y: number) {
                this.x = x
                this.y = y
                this.baseX = x
                this.baseY = y
                this.vx = (Math.random() - 0.5) * 0.5
                this.vy = (Math.random() - 0.5) * 0.5
                this.size = Math.random() * 2 + 0.5
                this.baseSize = this.size
                this.angle = Math.random() * Math.PI * 2
                this.speed = Math.random() * 0.2 + 0.1
            }

            update() {
                // Wave motion
                this.angle += this.speed * (0.5 + systemTension * 2)
                this.x += Math.cos(this.angle) * (0.5 + systemTension)
                this.y += Math.sin(this.angle) * (0.5 + systemTension)

                // Mouse interaction
                const dx = mouse.x - this.x
                const dy = mouse.y - this.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                const interactionRadius = 150 + systemTension * 100

                if (dist < interactionRadius) {
                    const force = (interactionRadius - dist) / interactionRadius
                    // Push away from mouse slightly, pull slightly, create a wake
                    this.x -= (dx / dist) * force * (mouse.speed * 0.1 + 1)
                    this.y -= (dy / dist) * force * (mouse.speed * 0.1 + 1)
                    this.size = this.baseSize + force * 2 * (1 + systemTension * 2)
                } else {
                    this.size = this.baseSize
                    // Slowly return to base
                    this.x += (this.baseX - this.x) * 0.01
                    this.y += (this.baseY - this.y) * 0.01
                }

                // Add background drift based on tension
                this.y -= systemTension * 2
                if (this.y < 0) this.y = height
                if (this.y > height) this.y = 0
                if (this.x < 0) this.x = width
                if (this.x > width) this.x = 0
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                // Color shifts from calm cold to intense cyan/white based on tension and proximity
                const distToMouse = Math.sqrt((mouse.x - this.x) ** 2 + (mouse.y - this.y) ** 2)
                const glow = Math.max(0, 1 - distToMouse / 200)

                const alpha = Math.min(1, 0.1 + glow * 0.5 + systemTension * 0.3)
                ctx.fillStyle = `rgba(${100 + systemTension * 155}, ${150 + systemTension * 105}, 255, ${alpha})`
                ctx.fill()
            }
        }

        let particles: Particle[] = []
        const initParticles = () => {
            particles = []
            const numParticles = Math.floor((width * height) / 8000)
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle(Math.random() * width, Math.random() * height))
            }
        }
        initParticles()

        let animationFrameId: number

        const render = () => {
            // Decay tension
            targetTension.value = Math.max(0, targetTension.value - 0.005)
            systemTension += (targetTension.value - systemTension) * 0.1
            mouse.speed *= 0.9 // Decay mouse speed calculation

            // Clear with trail effect, trail length depends on tension
            ctx.fillStyle = `rgba(3, 5, 8, ${0.1 + (1 - systemTension) * 0.1})`
            ctx.fillRect(0, 0, width, height)

            // Draw connecting lines between close particles if tension is high
            if (systemTension > 0.3) {
                ctx.lineWidth = 0.5
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x
                        const dy = particles[i].y - particles[j].y
                        const dist = dx * dx + dy * dy
                        if (dist < 5000) {
                            ctx.beginPath()
                            ctx.strokeStyle = `rgba(100, 200, 255, ${(1 - dist / 5000) * systemTension * 0.5})`
                            ctx.moveTo(particles[i].x, particles[i].y)
                            ctx.lineTo(particles[j].x, particles[j].y)
                            ctx.stroke()
                        }
                    }
                }
            }

            particles.forEach(p => {
                p.update()
                p.draw(ctx)
            })

            // Draw global lighting gradient based on tension
            const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 400 + systemTension * 400)
            gradient.addColorStop(0, `rgba(50, 150, 255, ${systemTension * 0.1})`)
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, width, height)

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ filter: "blur(1px) contrast(1.2)" }} // Post-processing for depth
        />
    )
}
