'use client'

import { useEffect, useRef } from 'react'

export default function AliveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let particles: Particle[] = []

        // Configuration
        const particleCount = 200
        const connectionDistance = 120
        const mouseRepelDistance = 150
        const mouseRepelForce = 0.05
        const returnForce = 0.01

        let mouse = {
            x: -1000,
            y: -1000,
            vx: 0,
            vy: 0
        }

        let lastMouse = { x: -1000, y: -1000 }

        class Particle {
            x: number
            y: number
            baseX: number
            baseY: number
            vx: number
            vy: number
            size: number
            color: string

            constructor(x: number, y: number) {
                this.x = x
                this.y = y
                this.baseX = x
                this.baseY = y
                this.vx = (Math.random() - 0.5) * 1
                this.vy = (Math.random() - 0.5) * 1
                this.size = Math.random() * 2 + 0.5

                // Liquid energy colors (cyan/blue/white)
                const hue = 180 + Math.random() * 40
                this.color = `hsla(${hue}, 100%, 70%, Math.random())`
            }

            update() {
                // Calculate distance to mouse
                const dx = mouse.x - this.x
                const dy = mouse.y - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                // Mouse interaction (Repel with a fluid feel)
                if (distance < mouseRepelDistance) {
                    const forceDirectionX = dx / distance
                    const forceDirectionY = dy / distance
                    const force = (mouseRepelDistance - distance) / mouseRepelDistance

                    // Add mouse velocity influence for a "swirl" effect
                    const swirlX = -forceDirectionY * mouse.vx * 0.1
                    const swirlY = forceDirectionX * mouse.vy * 0.1

                    this.vx -= (forceDirectionX * force * mouseRepelForce * 10) + swirlX
                    this.vy -= (forceDirectionY * force * mouseRepelForce * 10) + swirlY
                }

                // Add slight organic wandering
                this.vx += (Math.random() - 0.5) * 0.1
                this.vy += (Math.random() - 0.5) * 0.1

                // Return to base position slowly (elasticity)
                const baseDx = this.baseX - this.x
                const baseDy = this.baseY - this.y
                this.vx += baseDx * returnForce
                this.vy += baseDy * returnForce

                // Friction/Damping
                this.vx *= 0.92
                this.vy *= 0.92

                // Move
                this.x += this.vx
                this.y += this.vy
            }

            draw() {
                if (!ctx) return
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = this.color
                ctx.fill()
            }
        }

        const init = () => {
            // Set canvas size to window
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight

            particles = []

            // Hexagonal or grid distribution usually looks better than pure random for networks
            const cols = Math.floor(canvas.width / 60)
            const rows = Math.floor(canvas.height / 60)

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    if (Math.random() > 0.3) { // 70% chance to place a particle to make it organic
                        const x = (i * 60) + (Math.random() * 40 - 20)
                        const y = (j * 60) + (Math.random() * 40 - 20)
                        particles.push(new Particle(x, y))
                    }
                }
            }

            // Fill the rest up to particleCount randomly
            while (particles.length < particleCount) {
                particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height))
            }
        }

        const animate = () => {
            // Calculate mouse velocity
            mouse.vx = mouse.x - lastMouse.x
            mouse.vy = mouse.y - lastMouse.y
            lastMouse.x = mouse.x
            lastMouse.y = mouse.y

            // Clear rect with fading for trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)' // Black background with trails
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Update and draw particles
            particles.forEach(p => p.update())

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        const opacity = 1 - (distance / connectionDistance)
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.2})` // Cyan lines
                        ctx.lineWidth = 1 // thinner lines
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            }

            particles.forEach(p => p.draw())

            // Draw a subtle glow exactly at the mouse pointer
            if (mouse.x > -1000) {
                const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 150)
                gradient.addColorStop(0, 'rgba(34, 211, 238, 0.15)')
                gradient.addColorStop(1, 'rgba(34, 211, 238, 0)')
                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(mouse.x, mouse.y, 150, 0, Math.PI * 2)
                ctx.fill()
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        // Event Listeners
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        const handleMouseLeave = () => {
            mouse.x = -1000
            mouse.y = -1000
        }

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                mouse.x = e.touches[0].clientX
                mouse.y = e.touches[0].clientY
            }
        }

        window.addEventListener('resize', init)
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseleave', handleMouseLeave)
        window.addEventListener('touchmove', handleTouchMove, { passive: false })

        init()
        animate()

        return () => {
            window.removeEventListener('resize', init)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseleave', handleMouseLeave)
            window.removeEventListener('touchmove', handleTouchMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{ background: '#000000' }}
        />
    )
}
