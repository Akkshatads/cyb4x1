'use client';

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { useDeviceQuality } from '@/hooks/use-device-quality';
import { useTheme } from '@/providers/theme-provider';

function TunnelParticles() {
  const ref = useRef<THREE.Points>(null);
  const { maxParticles } = useDeviceQuality();
  const { reducedMotion } = useTheme();

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(maxParticles * 3);
    const colors = new Float32Array(maxParticles * 3);
    
    for (let i = 0; i < maxParticles; i++) {
      const i3 = i * 3;
      
      // Create tunnel-like distribution
      const radius = Math.random() * 8 + 2;
      const theta = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 20;
      
      positions[i3] = Math.cos(theta) * radius;
      positions[i3 + 1] = Math.sin(theta) * radius;
      positions[i3 + 2] = z;
      
      // Cyber colors
      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        // Cyan
        colors[i3] = 0;
        colors[i3 + 1] = 0.9;
        colors[i3 + 2] = 1;
      } else if (colorChoice < 0.7) {
        // Purple
        colors[i3] = 0.6;
        colors[i3 + 1] = 0.36;
        colors[i3 + 2] = 0.9;
      } else {
        // Magenta
        colors[i3] = 1;
        colors[i3 + 1] = 0;
        colors[i3 + 2] = 0.66;
      }
    }
    
    return [positions, colors];
  }, [maxParticles]);

  useFrame((state, delta) => {
    if (!ref.current || reducedMotion) return;
    
    ref.current.rotation.z += delta * 0.1;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    
    // Move particles through tunnel
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < maxParticles; i++) {
      const i3 = i * 3;
      positions[i3 + 2] += delta * 2;
      
      // Reset particle if it's too far
      if (positions[i3 + 2] > 10) {
        positions[i3 + 2] = -10;
      }
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
      <bufferAttribute
        attach="geometry-attributes-color"
        array={colors}
        count={maxParticles}
        itemSize={3}
      />
    </Points>
  );
}

function TunnelRings() {
  const groupRef = useRef<THREE.Group>(null);
  const { reducedMotion } = useTheme();

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;
    
    groupRef.current.rotation.z += delta * 0.05;
    groupRef.current.children.forEach((ring, i) => {
      ring.rotation.y = Math.sin(state.clock.elapsedTime + i) * 0.1;
      ring.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.05);
    });
  });

  return (
    <group ref={groupRef}>
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[0, 0, -i * 3]}>
          <torusGeometry args={[3 + i * 0.5, 0.05, 8, 64]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#00E6FF' : '#9B5DE5'}
            transparent
            opacity={0.6 - i * 0.1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

export function R3FHeroTunnel() {
  const { canUseWebGL, quality } = useDeviceQuality();

  if (!canUseWebGL) {
    return null;
  }

  const pixelRatio = quality === 'high' ? 2 : 1;

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ 
          antialias: quality === 'high',
          alpha: true,
          powerPreference: quality === 'low' ? 'low-power' : 'high-performance'
        }}
        dpr={pixelRatio}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#0A0A0F']} />
          <fog attach="fog" args={['#0A0A0F', 5, 20]} />
          
          <TunnelParticles />
          <TunnelRings />
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}