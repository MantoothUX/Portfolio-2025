import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

// Floating Points/Satellites component
const Points = ({
  count,
  radius,
  color,
  size,
}: {
  count: number;
  radius: number;
  color: string;
  size: number;
}) => {
  const points = useRef<THREE.Points>(null);
  const positions = useRef<Float32Array>(new Float32Array(count * 3));

  // Generate random positions on a sphere
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    positions.current[i * 3] = x;
    positions.current[i * 3 + 1] = y;
    positions.current[i * 3 + 2] = z;
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions.current}
          itemSize={3}
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Main Glowing Globe component
const GlowingGlobe = ({ darkMode, globeColor }: { darkMode: boolean; globeColor: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const pointColor1 = darkMode ? "#00ff88" : "#13531C";
  const pointColor2 = darkMode ? "#00cc6a" : "#0d4215";
  const innerSphereColor = darkMode ? "#000000" : "#ffffff";

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* Main Wireframe Globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.8, 64, 64]} />
        <meshBasicMaterial
          color={globeColor}
          wireframe
          transparent
          opacity={darkMode ? 0.3 : 0.4}
        />
      </mesh>

      {/* Inner solid sphere to block stars behind */}
      <mesh>
        <sphereGeometry args={[2.78, 64, 64]} />
        <meshBasicMaterial color={innerSphereColor} />
      </mesh>

      {/* Outer glowing ring effect */}
      <mesh>
        <sphereGeometry args={[2.82, 64, 64]} />
        <meshBasicMaterial
          color={globeColor}
          wireframe
          transparent
          opacity={darkMode ? 0.1 : 0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Floating Points/Satellites */}
      <group ref={groupRef}>
        <Points count={30} radius={3.2} color={pointColor1} size={0.08} />
        <Points count={50} radius={3.8} color={pointColor2} size={0.05} />
      </group>
    </group>
  );
};

// Background Stars component using drei Stars with green color in light mode
const BackgroundStars = ({ darkMode }: { darkMode: boolean }) => {
  const ref = useRef<THREE.Group>(null);
  const starsRef = useRef<any>(null);

  useFrame((_state, delta) => {
    if (ref.current && delta !== undefined) {
      ref.current.rotation.x -= delta * 0.01;
      ref.current.rotation.y -= delta * 0.01;
    }
    // Update star color based on mode - green in light mode, white in dark mode
    try {
      if (starsRef.current) {
        // drei Stars component exposes the points object
        const points = starsRef.current;
        if (points && points.material) {
          const material = points.material as THREE.PointsMaterial;
          const targetColor = darkMode ? "#ffffff" : "#13531C"; // White in dark, green in light
          material.color.set(targetColor);
        }
      }
    } catch (e) {
      // Silently handle ref access errors
    }
  });

  return (
    <group ref={ref}>
      {/* Use drei Stars component - white in dark mode, green in light mode */}
      <Stars
        ref={starsRef}
        radius={100}
        depth={50}
        count={darkMode ? 5000 : 3000}
        factor={4}
        saturation={0}
        speed={1}
        fade
      />
    </group>
  );
};

// Main SpinningGlobe component
export default function SpinningGlobe({ darkMode }: { darkMode: boolean }) {
  const [isDragging, setIsDragging] = useState(false);
  
  // Adjust colors based on dark/light mode
  const bgColor = darkMode ? "#000000" : "#ffffff";
  const fogColor = darkMode ? "#000000" : "#ffffff";
  const globeColor = darkMode ? "#00ff88" : "#13531C";
  const pointLightColor = darkMode ? "#00ff88" : "#13531C";
  const pointLightColor2 = darkMode ? "#00cc6a" : "#0d4215";

  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
      <div className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <Canvas
          camera={{
            position: [0, 0, 8],
            fov: 45,
          }}
          dpr={[1, 2]}
          gl={{ antialias: true }}
          style={{ pointerEvents: 'auto', cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <color attach="background" args={[bgColor]} />
          <fog attach="fog" args={[fogColor, 5, 20]} />

          <ambientLight intensity={darkMode ? 0.5 : 0.8} color="#ffffff" />
          <pointLight position={[10, 10, 10]} intensity={darkMode ? 1.5 : 1.0} color={pointLightColor} />
          <pointLight position={[-10, -10, -10]} intensity={darkMode ? 0.5 : 0.3} color={pointLightColor2} />

          <BackgroundStars darkMode={darkMode} />
          <GlowingGlobe darkMode={darkMode} globeColor={globeColor} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.5}
            enableDamping
            dampingFactor={0.05}
            onStart={() => setIsDragging(true)}
            onEnd={() => setIsDragging(false)}
          />
        </Canvas>

        {/* Gradient overlays to blend the canvas edges */}
        {darkMode ? (
          <>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          </>
        ) : (
          <>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </>
        )}
      </div>
    </div>
  );
}
