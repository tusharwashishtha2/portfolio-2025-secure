"use client"
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Subtle grid/particle system for the game menu aesthetic
const Particles = () => {
    const particlesRef = useRef<THREE.Points>(null)

    const particleCount = 2000
    const [positions, phases] = useMemo(() => {
        const pos = new Float32Array(particleCount * 3)
        const ph = new Float32Array(particleCount)
        for (let i = 0; i < particleCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 50
            pos[i * 3 + 1] = (Math.random() - 0.5) * 50
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10
            ph[i] = Math.random() * Math.PI * 2
        }
        return [pos, ph]
    }, [])

    useFrame((state) => {
        if (!particlesRef.current) return
        const time = state.clock.getElapsedTime()
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

        for (let i = 0; i < particleCount; i++) {
            // Subtle drift
            positions[i * 3 + 1] -= 0.01 // Move down slowly
            if (positions[i * 3 + 1] < -25) {
                positions[i * 3 + 1] = 25
            }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true

        // Rotate entire field very slowly
        particlesRef.current.rotation.y = Math.sin(time * 0.05) * 0.1
    })

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-phase"
                    count={phases.length}
                    array={phases}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#334155"
                transparent
                opacity={0.4}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    )
}

export default function ProgressionBackground() {
    return (
        <div className="absolute inset-0 bg-[#020617]"> {/* Very dark slate */}
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                <Particles />
                <fog attach="fog" args={['#020617', 5, 25]} />
            </Canvas>
        </div>
    )
}
