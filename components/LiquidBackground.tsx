"use client"

"use client"

"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { v4 as uuidv4 } from "uuid"

// --- 1. SIMULATION SHADER (The Physics Engine) ---
const simVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const simFragmentShader = `
  uniform sampler2D uCurrent;
  uniform sampler2D uPrevious;
  uniform vec2 uMouse;
  uniform float uMouseSize;
  uniform float uViscosity;
  uniform vec2 uResolution;
  uniform float uTime;
  
  varying vec2 vUv;

  void main() {
    vec2 e = 1.0 / uResolution;

    float average = (
      texture2D(uCurrent, vUv + vec2(e.x, 0.0)).r +
      texture2D(uCurrent, vUv + vec2(-e.x, 0.0)).r +
      texture2D(uCurrent, vUv + vec2(0.0, e.y)).r +
      texture2D(uCurrent, vUv + vec2(0.0, -e.y)).r
    ) * 0.25;

    float current = texture2D(uCurrent, vUv).r;
    float previous = texture2D(uPrevious, vUv).r;
    
    // Low viscosity for "oily" feel
    float next = (average * 2.0 - previous) * 0.96;

    // AUTOMATIC AMBIENT PERTURBATION (Always Moving)
    // Create random ripples based on time
    float autoRipple = sin(vUv.x * 10.0 + uTime * 2.0) * cos(vUv.y * 10.0 + uTime * 1.5) * 0.005;
    next += autoRipple;

    // MOUSE: Aggressive Displacement
    vec2 diff = vUv - uMouse;
    vec2 aspect = vec2(uResolution.x/uResolution.y, 1.0);
    float dist = length(diff * aspect);
    
    // Wider, stronger brush
    if (dist < 0.1) {
       float force = 0.3 * (1.0 - dist / 0.1); // TRIPLED FORCE (was 0.1)
       next += force;
    }

    gl_FragColor = vec4(next, 0.0, 0.0, 1.0);
  }
`

// --- 2. RENDER SHADER (The Distortion) ---
const renderVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const renderFragmentShader = `
  uniform sampler2D uTexture; // The Ripple Height Map
  varying vec2 vUv;

  void main() {
    // 1. Get Height
    float height = texture2D(uTexture, vUv).r;
    
    // 2. DISPLACEMENT (The "Warp" Effect)
    // We use the height to offset the texture lookup
    // This creates the "refraction" look
    vec2 distortion = vec2(height * 0.5, height * 0.5); // Strong warp
    
    // 3. WATER CAUSTICS (Deep Ocean Look)
    vec2 uv = vUv + distortion; // Distorted UV
    
    // High frequency caustic pattern to avoid big grey blobs
    float pattern = sin(uv.x * 80.0) * cos(uv.y * 60.0) + sin(uv.x * 120.0 + uTime) * 0.5;
    
    // Light Mode Water Colors (Ethereal Silver-Blue)
    vec3 col1 = vec3(0.98, 0.99, 1.0); // Pure White Base
    vec3 col2 = vec3(0.55, 0.65, 0.85); // DEEP Silver-Blue Shadow (High Contrast)
    
    // Mix based on height and pattern
    // Sharpen the smoothstep for crisper ripples
    vec3 finalColor = mix(col1, col2, smoothstep(-0.1, 0.2, height + pattern * 0.1));
    
    // 4. CHROMATIC ABERRATION (Subtle High-End look)
    finalColor.r += height * 0.2;
    finalColor.b -= height * 0.2;
    
    // DEBUG: Show Red Trail if mouse near (Proves input works)
    vec2 diff = vUv - uMouse;
    vec2 aspect = vec2(512.0/512.0, 1.0); // Simplified format
    float dist = length(diff);
    // Removed debug dot
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

function Simulation() {
    const { gl, size, pointer } = useThree()

    // Create Ping-Pong Buffers
    const [currentBuffer, previousBuffer] = useMemo(() => {
        const options = {
            type: THREE.FloatType, // High precision
            format: THREE.RedFormat, // Only need 1 channel (height)
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            stencilBuffer: false,
            depthBuffer: false,
        }
        return [
            new THREE.WebGLRenderTarget(512, 512, options), // Current
            new THREE.WebGLRenderTarget(512, 512, options)  // Previous
        ]
    }, [])

    const sceneDiff = useMemo(() => new THREE.Scene(), [])
    const cameraDiff = useMemo(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), [])

    const simMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uCurrent: { value: null },
                uPrevious: { value: null },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uMouseSize: { value: 0.2 }, // BIGGER BRUSH (Easier to hit on mobile)
                uViscosity: { value: 0.97 }, // Longer trails
                uResolution: { value: new THREE.Vector2(512, 512) },
                uTime: { value: 0 }
            },
            vertexShader: simVertexShader,
            fragmentShader: simFragmentShader
        })
    }, [])

    const plane = useMemo(() => {
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMaterial)
        sceneDiff.add(mesh)
        return mesh
    }, [sceneDiff, simMaterial])

    // Render Target for Display
    const renderMaterial = useMemo(() => new THREE.ShaderMaterial({
        uniforms: {
            uTexture: { value: null },
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uScroll: { value: 0 }
        },
        vertexShader: renderVertexShader,
        fragmentShader: renderFragmentShader
    }), [])

    // Ref to swap buffers
    const bufRef = useRef({ current: currentBuffer, previous: previousBuffer, temp: null })

    // GLOBAL MOUSE TRACKER (Bypassing R3F event system)
    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            // Convert to UV space (0 to 1)
            simMaterial.uniforms.uMouse.value.set(
                e.clientX / window.innerWidth,
                1.0 - (e.clientY / window.innerHeight) // GLSL Y is inverted relative to Screen Y
            );
        };

        const handleTouch = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                simMaterial.uniforms.uMouse.value.set(
                    touch.clientX / window.innerWidth,
                    1.0 - (touch.clientY / window.innerHeight)
                );
            }
        }

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleTouch, { passive: false }); // Passive false prevents scroll interference if needed

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleTouch);
        }
    }, [simMaterial]);

    useFrame((state) => {
        const { current, previous } = bufRef.current;

        // UPDATE SIMULATION
        simMaterial.uniforms.uCurrent.value = current.texture;
        simMaterial.uniforms.uPrevious.value = previous.texture;
        simMaterial.uniforms.uTime.value = state.clock.elapsedTime;

        // NOTE: uMouse is now updated by the Global Listener above

        // Render Simulation
        gl.setRenderTarget(previous);
        gl.render(sceneDiff, cameraDiff);
        gl.setRenderTarget(null);

        // UPDATE DISPLAY
        renderMaterial.uniforms.uTexture.value = previous.texture;

        // SWAP
        const temp = bufRef.current.current;
        bufRef.current.current = bufRef.current.previous;
        bufRef.current.previous = temp;
    });

    // Resize handler to update uResolution properly? 
    // For now we just use fixed 512 for sim, but maybe visual needs screen aspect?
    // Let's keep it simple.

    return (
        <mesh scale={[2.0, 2.0, 1.0]}>
            <planeGeometry args={[1, 1]} />
            <primitive object={renderMaterial} attach="material" />
        </mesh>
    )
}

export default function LiquidBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-white">
            <Canvas
                // ORTHOGRAPHIC CAMERA ensures the [-1, 1] plane covers the screen perfectly
                camera={{ position: [0, 0, 1], zoom: 1 }}
                orthographic
                gl={{ antialias: false, alpha: true }}
                dpr={[1, 2]} // Optimize for mobile
                onCreated={({ gl }) => {
                    gl.setClearColor('#ffffff') // Force WHITE background
                }}
            >
                <Simulation />
            </Canvas>
        </div>
    )
}
