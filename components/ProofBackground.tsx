import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PROOF_VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const PROOF_FRAGMENT_SHADER = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  
  varying vec2 vUv;
  
  // Hash function for random noise (film grain)
  float hash(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  // Creates a scrolling grid
  float grid(vec2 uv, float thickness) {
      vec2 gridUv = fract(uv);
      vec2 d = abs(gridUv - 0.5);
      vec2 mask = smoothstep(0.5 - thickness, 0.5, d);
      return max(mask.x, mask.y);
  }

  void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 p = (gl_FragCoord.xy / uResolution.xy);
    
    // Pixel coordinates for grid / aspect ratio correction
    vec2 p2 = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
    
    // 1. GRID LAYER
    // Scroll the grid slowly downwards and slightly right
    vec2 gridPos = p2 * 4.0; 
    gridPos.y -= uTime * 0.2;
    gridPos.x -= uTime * 0.05;
    
    // Add subtle distortion based on mouse position to make it feel alive
    vec2 mouseNorm = (uMouse * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
    mouseNorm.y = -mouseNorm.y; 
    float distToMouse = length(p2 - mouseNorm);
    gridPos += normalize(p2 - mouseNorm) * exp(-distToMouse * 2.0) * 0.2 * sin(uTime * 2.0);
    
    float g = grid(gridPos, 0.02);
    // Dark base with subtle green grid glow
    vec3 colorBase = vec3(0.01, 0.02, 0.015);
    vec3 colorGrid = vec3(0.0, 0.3, 0.1); // subtle green
    vec3 finalColor = mix(colorBase, colorGrid, g * 0.15); // Grid is very faint

    // 2. SCANLINES
    // CRT scanline effect
    float scanline = sin(p.y * uResolution.y * 0.5 + uTime * 5.0) * 0.04;
    finalColor -= scanline;

    // 3. NOISE / GRAIN
    // High frequency noise
    float n = hash(p * uTime) * 0.06;
    finalColor += n;

    // 4. VIGNETTE & GLOW
    // Darken edges, slight amber/green glow in center
    float distFromCenter = length(p - 0.5);
    float vignette = smoothstep(0.8, 0.2, distFromCenter);
    
    // Mouse Glow
    float mouseGlow = exp(-distToMouse * 3.0) * 0.1;
    vec3 colorMouseGlow = vec3(0.1, 0.4, 0.2); // Greenish glow
    
    finalColor *= vignette;
    finalColor += colorMouseGlow * mouseGlow;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function ShaderMesh() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { size, viewport } = useThree();

    // Track mouse for ripples/glow
    const mouseRef = useRef(new THREE.Vector2(size.width / 2, size.height / 2));
    const targetMouse = useRef(new THREE.Vector2(size.width / 2, size.height / 2));

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
        uMouse: { value: new THREE.Vector2(size.width / 2, size.height / 2) }
    }), [size.width, size.height]);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

            // Smooth mouse tracking
            mouseRef.current.lerp(targetMouse.current, 0.05);
            materialRef.current.uniforms.uMouse.value.copy(mouseRef.current);
        }
    });

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            targetMouse.current.set(e.clientX, e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    React.useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
        }
    }, [size.width, size.height]);

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[viewport.width, viewport.height]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={PROOF_VERTEX_SHADER}
                fragmentShader={PROOF_FRAGMENT_SHADER}
                uniforms={uniforms}
                transparent={true}
            />
        </mesh>
    );
}

export default function ProofBackground() {
    return (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#030504]">
            <Canvas style={{ pointerEvents: 'none' }}>
                <ShaderMesh />
            </Canvas>
        </div>
    );
}
