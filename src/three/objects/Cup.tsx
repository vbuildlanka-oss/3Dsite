import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import {
  CUP,
  createCupGeometry,
  createCupInteriorGeometry,
  createHandleGeometry,
  createSaucerGeometry,
  innerRadiusAt,
} from '../geometry/cup';
import { LiquidMaterial } from '../shaders/liquid';
import { Steam } from './Steam';
import { stage, type Stage } from '../stage';
import { surfaceMaps } from '../textures';
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
  /** Per-cup phase so a row of cups never moves in lockstep. */
  seed?: number;
};

const LIQUID_LOW = CUP.floor + 0.03;
const LIQUID_HIGH = CUP.height - 0.075;

/**
 * The hero object: turned stoneware with a rolled rim and a swept strap handle,
 * a cream interior shell, and a shader liquid whose radius tracks the interior
 * wall as the level rises.
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

  const seg = quality.cupSegments;
  const detail = quality.tier === 'low' ? 0.4 : 1;

  const cupGeo = useMemo(() => createCupGeometry(seg), [seg]);
  const interiorGeo = useMemo(() => createCupInteriorGeometry(seg), [seg]);
  const saucerGeo = useMemo(() => createSaucerGeometry(seg), [seg]);
  const handleGeo = useMemo(() => createHandleGeometry(detail), [detail]);
  const discGeo = useMemo(() => new THREE.CircleGeometry(1, Math.max(48, seg)), [seg]);

  const liquidMat = useMemo(() => new LiquidMaterial(), []);

  // Dark glazed exterior, cream interior. Real ceramic has orange-peel in the
  // glaze, so both share a fine procedural normal + roughness pair.
  const glaze = useMemo(() => {
    const { normalMap, roughnessMap } = surfaceMaps('ceramic');
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#1b100b').convertSRGBToLinear(),
      roughness: 0.4,
      metalness: 0,
      normalMap,
      normalScale: new THREE.Vector2(0.12, 0.12),
      roughnessMap,
      clearcoat: 0.62,
      clearcoatRoughness: 0.3,
      sheen: 0.45,
      sheenColor: new THREE.Color('#ffd9b0').convertSRGBToLinear(),
      sheenRoughness: 0.6,
      side: THREE.FrontSide,
      transparent: true,
      opacity: 1,
      envMapIntensity: 0.85,
    });
  }, []);

  const liner = useMemo(() => {
    const { normalMap, roughnessMap } = surfaceMaps('ceramic');
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#cdbca4').convertSRGBToLinear(),
      roughness: 0.46,
      metalness: 0,
      normalMap,
      normalScale: new THREE.Vector2(0.09, 0.09),
      roughnessMap,
      clearcoat: 0.5,
      clearcoatRoughness: 0.32,
      side: THREE.FrontSide,
      transparent: true,
      envMapIntensity: 0.75,
    });
  }, []);

  useEffect(
    () => () => {
      [cupGeo, interiorGeo, saucerGeo, handleGeo, discGeo].forEach((g) => g.dispose());
      [liquidMat, glaze, liner].forEach((m) => m.dispose());
    },
    [cupGeo, interiorGeo, saucerGeo, handleGeo, discGeo, liquidMat, glaze, liner],
  );

  const shown = useRef(0);
  const level = useRef(LIQUID_LOW);
  const tilt = useRef(0);

  useFrame(() => {
    const p = clamp(presence(stage));
    shown.current = damp(shown.current, p, 6, stage.dt);
    const vis = shown.current > 0.006;

    if (group.current) {
      group.current.visible = vis;
      // The fade doubles as a settle: the cup rises and scales into frame.
      group.current.scale.setScalar(scale * lerp(0.92, 1, shown.current));
      group.current.position.set(
        position[0],
        position[1] + lerp(-0.18, 0, shown.current),
        position[2],
      );

      const t = stage.time + seed * 12;
      group.current.rotation.y =
        rotation + stage.px * 0.1 + Math.sin(t * 0.24) * 0.04 + stage.tl * 0.1;
      group.current.rotation.z = Math.sin(t * 0.19) * 0.006;
      group.current.rotation.x = stage.py * 0.02;
    }
    if (!vis) return;

    glaze.opacity = shown.current;
    liner.opacity = shown.current;

    const f = clamp(fill(stage));
    level.current = damp(level.current, lerp(LIQUID_LOW, LIQUID_HIGH, f), 5, stage.dt);
    const y = level.current;
    const r = innerRadiusAt(y) - 0.008;

    // Inertia: the surface lags the cup, so a fast scroll tips the liquid.
    tilt.current = damp(tilt.current, stage.vel * 0.055, 3.5, stage.dt);

    if (liquid.current) {
      liquid.current.position.y = y;
      liquid.current.scale.setScalar(r);
      liquid.current.rotation.z = tilt.current;
      liquid.current.rotation.x = -Math.PI / 2;
      liquid.current.visible = f > 0.015;
    }
    if (steamAnchor.current) steamAnchor.current.position.y = y + 0.015;

    const u = liquidMat.uniforms;
    u.uTime.value = stage.time;
    u.uOpacity.value = shown.current;
    u.uCrema.value = damp(u.uCrema.value, clamp(crema(stage)), 4, stage.dt);
    u.uVel.value = damp(u.uVel.value, stage.vel * 0.35, 4, stage.dt);
    u.uAgitate.value = damp(u.uAgitate.value, 0.18 + stage.pour * 1.9, 4, stage.dt);
  });

  const shadows = quality.shadows;

  return (
    <group ref={group}>
      {saucer && (
        <mesh
          geometry={saucerGeo}
          material={glaze}
          scale={[0.8, 1, 0.8]}
          castShadow={shadows}
          receiveShadow={shadows}
        />
      )}

      <group position={[0, saucer ? CUP.seat : 0, 0]}>
        <mesh geometry={cupGeo} material={glaze} castShadow={shadows} receiveShadow={shadows} />
        <mesh geometry={interiorGeo} material={liner} />
        <mesh geometry={handleGeo} material={glaze} castShadow={shadows} receiveShadow={shadows} />

        <mesh
          ref={liquid}
          geometry={discGeo}
          material={liquidMat}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, LIQUID_LOW, 0]}
        />

        <group ref={steamAnchor}>
          <Steam
            count={steamCount ?? quality.steamCount}
            radius={CUP.rimInner * 0.72}
            rise={1.1}
            size={quality.tier === 'low' ? 0.24 : 0.19}
            intensity={steam}
          />
        </group>
      </group>
    </group>
  );
}
