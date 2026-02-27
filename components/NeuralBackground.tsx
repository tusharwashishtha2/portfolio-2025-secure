import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const WAVES_VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const WAVES_FRAGMENT_SHADER = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uHover;
  
  varying vec2 vUv;
  
  // Hash function for random noise
  float hash(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  // Simple 2D noise
  float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      
      // Quintic interpolation curve for organic smoothness
      vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
      
      return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
      );
  }
  
  // Fractal Brownian Motion for tissue-like complexity
  float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 0.0;
      
      // 5 octaves for high detail organic look
      for(int i = 0; i < 5; i++) {
          value += amplitude * noise(p);
          p *= 2.0;
          amplitude *= 0.5;
      }
      return value;
  }

  void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
    
    // Slower organic drift
    float time = uTime * 0.1;
    
    // Base tissue pattern
    vec2 q = vec2(fbm(p + time), fbm(p + vec2(5.2, 1.3) - time));
    vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2) + 0.15 * time), 
                  fbm(p + 4.0 * q + vec2(8.3, 2.8) - 0.12 * time));
                  
    // Add mouse interaction ripples simulating neural disturbance
    vec2 mouseNorm = (uMouse * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
    mouseNorm.y = -mouseNorm.y; 
    
    float distToMouse = length(p - mouseNorm);
    // Exponential falloff for softer interaction spread
    float mouseInfluence = exp(-distToMouse * 2.5) * uHover;
    
    // Distort the pattern based on mouse proximity, pushing the fluid
    r += normalize(p - mouseNorm) * mouseInfluence * 0.8 * sin(distToMouse * 15.0 - uTime * 3.0);

    float f = fbm(p + 4.0 * r);
    
    // Neural Membrane Colors
    vec3 colorBase = vec3(0.05, 0.0, 0.08); // Deep black/purple
    vec3 colorFluid = vec3(0.12, 0.02, 0.2); // Mid purple
    vec3 colorTissue = vec3(0.2, 0.05, 0.3); // Bright violet
    vec3 colorHighlight = vec3(1.0, 0.6, 0.9); // Soft pink glowing highlights
    
    // Mix colors based on fractal noise value mapping
    vec3 finalColor = mix(colorBase, colorFluid, clamp((f*f)*4.0, 0.0, 1.0));
    finalColor = mix(finalColor, colorTissue, clamp(length(q), 0.0, 1.0));
    // Flow highlights
    finalColor = mix(finalColor, colorHighlight, clamp(length(r.x) * f * 1.5, 0.0, 1.0) * 0.4);
    
    // Dynamic mouse glow
    finalColor += colorHighlight * (mouseInfluence * 0.3);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function FluidMesh() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { size, viewport } = useThree();

    // Track mouse for ripples
    const mouseRef = useRef(new THREE.Vector2(size.width / 2, size.height / 2));
    const targetMouse = useRef(new THREE.Vector2(size.width / 2, size.height / 2));
    const targetHover = useRef(0);
    const currentHover = useRef(0);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
        uMouse: { value: new THREE.Vector2(size.width / 2, size.height / 2) },
        uHover: { value: 0 }
    }), [size.width, size.height]);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

            // Smoothly interpolate hover state for organic feeling
            currentHover.current = THREE.MathUtils.lerp(currentHover.current, targetHover.current, 0.02);
            materialRef.current.uniforms.uHover.value = currentHover.current;

            // Smoothly track mouse for fluid "drag" feel
            mouseRef.current.lerp(targetMouse.current, 0.05);
            materialRef.current.uniforms.uMouse.value.copy(mouseRef.current);
        }
    });

    // Handle window level mouse tracking because canvas pointer-events are none
    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            targetMouse.current.set(e.clientX, e.clientY);
            targetHover.current = 1.0;

            // Reset hover after a delay if mouse stops moving, simulating fading ripples
            clearTimeout((window as any).neuralHoverTimeout);
            (window as any).neuralHoverTimeout = setTimeout(() => {
                targetHover.current = 0.0;
            }, 1500);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout((window as any).neuralHoverTimeout);
        };
    }, []);

    // Update resolution uniform on resize
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
                vertexShader={WAVES_VERTEX_SHADER}
                fragmentShader={WAVES_FRAGMENT_SHADER}
                uniforms={uniforms}
                transparent={true}
            />
        </mesh>
    );
}

export default function NeuralBackground() {
    return (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#050008]">
            <Canvas style={{ pointerEvents: 'none' }}>
                <FluidMesh />
            </Canvas>
        </div>
    );
}
