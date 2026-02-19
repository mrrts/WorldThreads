import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import type { useAppStore } from "@/hooks/use-app-store";

interface Props {
  store: ReturnType<typeof useAppStore>;
}

const TIME_COLORS: Record<string, { sky: string; ambient: string; fog: string; intensity: number }> = {
  DAWN:      { sky: "#2a1a3a", ambient: "#c48060", fog: "#1a1020", intensity: 0.4 },
  MORNING:   { sky: "#4a6a8a", ambient: "#e8d0a0", fog: "#2a3a4a", intensity: 0.7 },
  NOON:      { sky: "#6a8aaa", ambient: "#fff0d0", fog: "#4a5a6a", intensity: 1.0 },
  AFTERNOON: { sky: "#5a7a9a", ambient: "#e8c890", fog: "#3a4a5a", intensity: 0.8 },
  DUSK:      { sky: "#3a2a4a", ambient: "#d08060", fog: "#1a1020", intensity: 0.5 },
  NIGHT:     { sky: "#0a0a1a", ambient: "#4060a0", fog: "#050510", intensity: 0.2 },
};

export function SceneView({ store }: Props) {
  const timeOfDay = store.activeWorld?.state?.time?.time_of_day ?? "MORNING";
  const colors = TIME_COLORS[timeOfDay] ?? TIME_COLORS.MORNING;

  return (
    <div className="flex-1 relative">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
          <fog attach="fog" args={[colors.fog, 5, 25]} />
          <ambientLight intensity={colors.intensity * 0.5} color={colors.ambient} />
          <directionalLight position={[5, 8, 3]} intensity={colors.intensity} color={colors.ambient} />
          <pointLight position={[-3, 2, -2]} intensity={0.3} color="#ff9060" />

          <Stars radius={50} depth={50} count={timeOfDay === "NIGHT" ? 2000 : timeOfDay === "DUSK" || timeOfDay === "DAWN" ? 800 : 200} factor={2} fade speed={0.5} />

          <Ground color={colors.sky} />

          {store.characters.map((ch, i) => (
            <CharacterOrb
              key={ch.character_id}
              color={ch.avatar_color}
              position={[i * 3 - (store.characters.length - 1) * 1.5, 1.2, 0]}
              active={ch.character_id === store.activeCharacter?.character_id}
              mood={ch.state?.mood ?? 0}
            />
          ))}

          <Particles count={40} timeOfDay={timeOfDay} />
        </Canvas>
      </div>

      <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
        <p className="text-xs text-muted-foreground">
          {store.activeWorld?.state?.location?.current_scene ?? "Unknown"} · Day {store.activeWorld?.state?.time?.day_index ?? 1} · {timeOfDay}
        </p>
        <div className="flex gap-3 mt-1">
          {store.characters.map((ch) => (
            <div key={ch.character_id} className="flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ch.avatar_color }} />
              <span className={ch.character_id === store.activeCharacter?.character_id ? "text-primary" : "text-muted-foreground"}>
                {ch.display_name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CharacterOrb({ color, position, active, mood }: {
  color: string; position: [number, number, number]; active: boolean; mood: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  const emissiveIntensity = active ? 0.6 : 0.15;
  const scale = active ? 1.2 : 0.8;

  return (
    <Float speed={1.5 + mood * 0.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={meshRef} scale={scale}>
          <icosahedronGeometry args={[0.5, 2]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={emissiveIntensity}
            roughness={0.3}
            metalness={0.6}
            wireframe={!active}
          />
        </mesh>
        {active && (
          <mesh scale={scale * 1.3}>
            <icosahedronGeometry args={[0.5, 1]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.08}
              wireframe
            />
          </mesh>
        )}
        <pointLight color={color} intensity={active ? 1.5 : 0.3} distance={4} />
      </group>
    </Float>
  );
}

function Ground({ color }: { color: string }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color={color} roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

function Particles({ count, timeOfDay }: { count: number; timeOfDay: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 16,
      y: Math.random() * 6,
      z: (Math.random() - 0.5) * 16,
      speed: 0.1 + Math.random() * 0.3,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * 0.1 + p.offset) * 0.3,
        p.y + Math.sin(t * p.speed + p.offset) * 0.5,
        p.z,
      );
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const particleColor = timeOfDay === "NIGHT" ? "#4060ff" : timeOfDay === "DUSK" || timeOfDay === "DAWN" ? "#ff8040" : "#ffe0a0";

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.03, 6, 6]} />
      <meshStandardMaterial color={particleColor} emissive={particleColor} emissiveIntensity={2} transparent opacity={0.6} />
    </instancedMesh>
  );
}
