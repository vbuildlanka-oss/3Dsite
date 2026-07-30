import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Rig } from './Rig';
import { Effects } from './Effects';
import { Floor } from './objects/Floor';
import { Cup } from './objects/Cup';
import { Beans } from './objects/Beans';
import { HeroBean } from './objects/HeroBean';
import { Pour } from './objects/Pour';
import { Dust } from './objects/Dust';
import { stage } from './stage';
import { damp } from '@/lib/math';
import { sceneQuality } from '@/lib/device';

/** Reports upward once the renderer has actually put pixels on screen. */
function Ready({ onReady }: { onReady: () => void }) {
  const frames = useRef(0);
  const gl = useThree((s) => s.gl);

  useEffect(() => {
    // Guard against a lost context leaving the preloader up forever.
    const id = window.setTimeout(onReady, 6000);
    return () => window.clearTimeout(id);
  }, [onReady, gl]);

  useFrame(() => {
    frames.current += 1;
    if (frames.current === 4) onReady();
  });

  return null;
}

/** Everything that shares the subject's screen-space offset. */
function Subject() {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    g.position.x = damp(g.position.x, stage.subjectX, 5, stage.dt);
    g.position.y = damp(g.position.y, stage.subjectY, 5, stage.dt);
  });

  return (
    <group ref={group}>
      <Floor />
      <Cup />
      <Pour />
      <HeroBean />

      {/* Menu act: the flight of three. */}
      <Cup
        presence={(s) => s.trio}
        fill={() => 0.82}
        steam={(s) => s.trio * 0.55}
        crema={() => 0.85}
        position={[-1.72, 0, 0.35]}
        rotation={0.6}
        scale={0.78}
        seed={3}
        steamCount={280}
      />
      <Cup
        presence={(s) => s.trio}
        fill={() => 0.62}
        steam={(s) => s.trio * 0.45}
        crema={() => 0.35}
        position={[1.72, 0, 0.35]}
        rotation={-0.8}
        scale={0.78}
        seed={7}
        steamCount={280}
      />
    </group>
  );
}

export function Scene({ onReady }: { onReady: () => void }) {
  const quality = useMemo(() => sceneQuality(), []);
  const [visible, setVisible] = useState(true);

  // Stop burning GPU when the tab is hidden or the page is scrolled past.
  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return (
    <Canvas
      dpr={quality.dpr}
      flat={quality.postFx}
      frameloop={visible ? 'always' : 'never'}
      camera={{ fov: 34, near: 0.08, far: 90, position: [0, 0.64, 3.3] }}
      gl={{
        antialias: !quality.postFx,
        alpha: true,
        stencil: false,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false,
      }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(new THREE.Color('#080504'), 0);
        scene.fog = new THREE.FogExp2(new THREE.Color('#0a0705').convertSRGBToLinear(), 0.052);
      }}
    >
      <Rig />
      <Subject />
      <Beans />
      <Dust />
      <Ready onReady={onReady} />
      {quality.postFx && <Effects />}
    </Canvas>
  );
}
