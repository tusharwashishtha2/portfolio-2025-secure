"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

function StarGalaxy() {
    const pointsRef = useRef<THREE.Points>(null)
    const { viewport } = useThree()

    // GALAXY PARAMETERS
    const count = 8000
    const [positions, colors] = useMemo(() => {
        const p = new Float32Array(count * 3)
        const c = new Float32Array(count * 3)

        // Color Palette: Deep Space
        const colorInside = new THREE.Color("#ff6030") // Hot Orange Core
        const colorOutside = new THREE.Color("#1b3984") // Cool Blue Arms

        for (let i = 0; i < count; i++) {
            // Spiral Logic
            // r = radius, t = angle
            const radius = Math.random() * 8
            const spinAngle = radius * 5 // Tighter spiral in center
            const branchAngle = ((i % 3) / 3) * Math.PI * 2 // 3 Arms

            const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5 * radius
            const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5 * radius
            const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5 * radius

            p[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX
            p[i * 3 + 1] = randomY * 0.5 // Flattened galaxy
            p[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

            // Mixed Color based on radius
            const mixedColor = colorInside.clone()
            mixedColor.lerp(colorOutside, radius / 8)

            c[i * 3] = mixedColor.r
            c[i * 3 + 1] = mixedColor.g
            c[i * 3 + 2] = mixedColor.b
        }
        return [p, c]
    }, [])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        // Interaction
        const mx = (state.mouse.x * viewport.width) / 5
        const my = (state.mouse.y * viewport.height) / 5

        if (pointsRef.current) {
            // Rotate the entire galaxy
            pointsRef.current.rotation.y = time * 0.05

            // Tilt with mouse
            pointsRef.current.rotation.x = my * 0.05 + 0.5 // Default tilt
            pointsRef.current.rotation.z = mx * 0.05
        }
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
                <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial
                size={0.05} // Stars
                sizeAttenuation={true}
                depthWrite={false}
                vertexColors={true}
                blending={THREE.AdditiveBlending}
                transparent={true}
                opacity={0.8}
            />
        </points>
    )
}

function FogOverlay() {
    return (
        <mesh position={[0, 0, 0]}>
            {/* A giant faint sphere to give "nebula" volume feeling */}
            <sphereGeometry args={[12, 32, 32]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.2} side={THREE.BackSide} />
        </mesh>
    )
}

export default function GalaxyBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-black pointer-events-auto">
            <Canvas camera={{ position: [0, 6, 10], fov: 45 }} gl={{ antialias: false, alpha: false }}>
                <color attach="background" args={["#030305"]} />

                <StarGalaxy />
                <FogOverlay />

                {/* Cinematic Post-Processing manually via overlay */}
            </Canvas>

            {/* Cinematic Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_120%)] opacity-80 pointer-events-none"></div>

            {/* Star Dust Overlay (CSS) strictly for depth */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        </div>
    )
}
