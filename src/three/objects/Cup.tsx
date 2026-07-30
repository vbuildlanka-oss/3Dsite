import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CUP, createCupGeometry, createSaucerGeometry, innerRadiusAt } from '../geometry/cup';
import { LiquidMaterial } from '../shaders/liquid';
import { Steam } from './Steam';
import { stage, type Stage } from '../stage';
import { clamp, damp, lerp } from '@/lib/math';
import { sceneQuality } from '@/lib/device';

type Props = {
  presence?: (s: Stage) => number;
  fill?: (s: Stage) => number;
  steam?: (s: Stage) => number;
  crema?: (s: Stage) => number;
  position?: [number, number, number];
  rotation?: number;
  scale?: number;
  saucer?: boolean;
  steamCount?: number;
  /** Per-cup drift so a row of cups never moves in lockstep. */
  seed?: number;
};

const LIQUID_LOW = CUP.floor + 0.03;
const LIQUID_HIGH = CUP.height - 0.06;

/**
 * The hero object: lathe-turned stoneware, a shader liquid surface whose radius
 * tracks the interior wall as it fills, and its own steam column.
 */
export function Cup({
  presence = (s) => s.cup,
  fill = (s) => s.fill,
  steam = (s) => s.steam,
  crema = (s) => s.crema,
  position = [0, 0, 0],
  rotation = 0,
  scale = 1,
  saucer = true,
  steamCount,
  seed = 0,
}: Props) {
  const quality = useMemo(() => sceneQuality(), []);
  const group = useRef<THREE.Group>(null);
  const liquid = useRef<THREE.Mesh>(null);
  const steamAnchor = useRef<THREE.Group>(null);

  const cupGeo = useMemo(() => createCupGeometry(quality.cupSegments), [quality.cupSegments]);
  const saucerGeo = useMemo(() => createSaucerGeometry(quality.cupSegments), [quality.cupSegments]);
  const handleGeo = useMemo(
    () => new THREE.TorusGeometry(0.29, 0.052, quality.tier === 'low' ? 8 : 16, quality.cupSegments),
    [quality],
  );
  const discGeo = useMemo(() => new THREE.CircleGeometry(1, quality.cupSegments), [quality.cupSegments]);

  const liquidMat = useMemo(() => new LiquidMaterial(), []);

  // Dark glazed exterior, cream interior: the two-tone reads clearly against
  // overlaid type and gives the crema something to bounce off.
  const glaze = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#1b100b').convertSRGBToLinear(),
        roughness: 0.36,
        metalness: 0,
        clearcoat: 0.55,
        clearcoatRoughness: 0.34,
        sheen: 0.55,
        sheenColor: new THREE.Color('#ffd9b0').convertSRGBToLinear(),
        sheenRoughness: 0.6,
        side: THREE.FrontSide,
        transparent: true,
        opacity: 1,
        envMapIntensity: 0.8,
      }),
    [],
  );

  const liner = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#e7dac6').convertSRGBToLinear(),
        roughness: 0.5,
        metalness: 0,
        clearcoat: 0.4,
        clearcoatRoughness: 0.35,
        side: THREE.FrontSide,
        transparent: true,
        envMapIntensity: 1.05,
      }),
    [],
  );

  useEffect(
    () => () => {
      [cupGeo, saucerGeo, handleGeo, discGeo].forEach((g) => g.dispose());
      [liquidMat, glaze, liner].forEach((m) => m.dispose());
    },
    [cupGeo, saucerGeo, handleGeo, discGeo, liquidMat, glaze, liner],
  );

  const shown = useRef(0);
  const level = useRef(0.5);

  useFrame(() => {
    const p = clamp(presence(stage));
    shown.current = damp(shown.current, p, 6, stage.dt);
    const vis = shown.current > 0.006;

    if (group.current) {
      group.current.visible = vis;
      // Fade-in doubles as a settle: the cup rises and scales into frame.
      const s = scale * lerp(0.9, 1, shown.current);
      group.current.scale.setScalar(s);
      group.current.position.set(
        position[0],
        position[1] + lerp(-0.22, 0, shown.current),
        position[2],
      );

      const t = stage.time + seed * 12;
      group.current.rotation.y =
        rotation + stage.px * 0.12 + Math.sin(t * 0.24) * 0.05 + stage.tl * 0.14;
      group.current.rotation.z = Math.sin(t * 0.19) * 0.008;
      group.current.rotation.x = stage.py * 0.03;
    }
    if (!vis) return;

    glaze.opacity = shown.current;
    liner.opacity = shown.current;

    const f = clamp(fill(stage));
    level.current = damp(level.current, lerp(LIQUID_LOW, LIQUID_HIGH, f), 5, stage.dt);
    const y = level.current;
    const r = innerRadiusAt(y) - 0.006;

    if (liquid.current) {
      liquid.current.position.y = y;
      liquid.current.scale.setScalar(r);
      liquid.current.visible = f > 0.015;
    }
    if (steamAnchor.current) steamAnchor.current.position.y = y + 0.02;

    const u = liquidMat.uniforms;
    u.uTime.value = stage.time;
    u.uOpacity.value = shown.current;
    u.uCrema.value = damp(u.uCrema.value, clamp(crema(stage)), 4, stage.dt);
    u.uVel.value = damp(u.uVel.value, stage.vel * 0.35, 4, stage.dt);
    u.uAgitate.value = damp(u.uAgitate.value, 0.2 + stage.pour * 1.6, 4, stage.dt);
  });

  return (
    <group ref={group}>
      {saucer && <mesh geometry={saucerGeo} material={glaze} scale={[0.78, 1, 0.78]} />}

      <group position={[0, 0.045, 0]}>
        <mesh geometry={cupGeo} material={glaze} castShadow={false} />
        <mesh
          geometry={handleGeo}
          material={glaze}
          position={[CUP.rimOuter * 0.95, 0.66, 0]}
          rotation={[0, 0, -0.14]}
          scale={[0.82, 1.12, 1]}
        />

        {/* Cream interior, nested just inside the glaze so only its wall shows. */}
        <mesh geometry={cupGeo} material={liner} scale={[0.955, 0.995, 0.955]} />

        <mesh
          ref={liquid}
          geometry={discGeo}
          material={liquidMat}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.5, 0]}
        />

        <group ref={steamAnchor}>
          <Steam
            count={steamCount ?? quality.steamCount}
            radius={CUP.rimInner * 0.72}
            rise={1.1}
            size={quality.tier === 'low' ? 0.4 : 0.34}
            intensity={steam}
          />
        </group>
      </group>
    </group>
  );
}
