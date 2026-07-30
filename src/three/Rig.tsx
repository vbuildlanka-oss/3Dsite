import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { sampleShot } from './choreography';
import { stage, updateStage } from './stage';
import { clamp, damp, lerp, range } from '@/lib/math';

const target = new THREE.Vector3();
const look = new THREE.Vector3();

/**
 * Drives the stage clock and the camera. Mounted first so `stage` is fresh
 * before any other object's frame callback reads it.
 */
export function Rig() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  const lookRef = useRef(new THREE.Vector3(0, 0.6, 0));
  const key = useRef<THREE.DirectionalLight>(null);

  useFrame((state, delta) => {
    updateStage(state.clock.elapsedTime, delta, size.width / Math.max(1, size.height));

    const shot = sampleShot(stage.tl);
    const t = stage.time;

    // Resolve the subject's framing against the live lens: half the visible
    // width at the subject's depth, times the requested fraction.
    const halfWidth =
      shot.pos.z * Math.tan(THREE.MathUtils.degToRad(shot.fov) * 0.5) * Math.max(1, stage.aspect);
    stage.subjectX = stage.subjectShift * halfWidth;

    // Narrow viewports need more distance to keep the subject inside the frame.
    const widen = stage.narrow ? 1.26 : lerp(1.12, 1, clamp(range(stage.aspect, 1.15, 1.75)));

    target.set(
      shot.pos.x + stage.px * 0.28,
      shot.pos.y - stage.py * 0.2 + Math.sin(t * 0.35) * 0.022,
      shot.pos.z * widen + Math.sin(t * 0.27) * 0.03,
    );

    // Camera is set, not damped: `stage.tl` is already smoothed, so this stays
    // exactly locked to the scroll while still feeling weighted.
    camera.position.copy(target);

    look.copy(shot.look);
    look.x += stage.px * 0.06;
    look.y += stage.py * 0.03;
    lookRef.current.lerp(look, 1 - Math.exp(-6 * stage.dt));
    camera.lookAt(lookRef.current);
    camera.rotateZ(shot.roll + stage.px * 0.008);

    const fov = shot.fov + (stage.narrow ? 6 : 0);
    if (Math.abs(camera.fov - fov) > 0.01) {
      camera.fov = damp(camera.fov, fov, 8, stage.dt);
      camera.updateProjectionMatrix();
    }

    if (key.current) {
      key.current.intensity = lerp(1.25, 2.1, clamp(stage.glow));
    }
  });

  return (
    <>
      <ambientLight intensity={0.22} color="#c99a6a" />

      {/* Fills only — the shadow-casting key light lives with the subject so
          its pool of light travels when the subject is re-framed. */}
      <directionalLight ref={key} position={[-3.4, 4.2, 2.8]} intensity={1.5} color="#ffd7ab" />
      <directionalLight position={[3.6, 1.8, -3.4]} intensity={0.42} color="#7d90ad" />

      {/*
        Studio in a box. Round emitters keep their reflections soft — a
        rectangular softbox reflected in a glazed, near-mirror surface draws a
        hard straight edge that reads as a seam straight down the cup. The one
        narrow strip is deliberate: it lands off-centre as a vertical highlight
        along the cup's shoulder, the way a bar light would.
      */}
      <Environment resolution={256} frames={1}>
        <Lightformer
          form="circle"
          intensity={3.4}
          color="#ffe2bd"
          scale={[13, 13, 1]}
          position={[-7, 7, 6]}
          target={[0, 0.6, 0]}
        />
        <Lightformer
          form="rect"
          intensity={5}
          color="#fff2dd"
          scale={[0.55, 6, 1]}
          position={[3.4, 1.8, 2.8]}
          target={[0, 0.7, 0]}
        />
        <Lightformer
          form="circle"
          intensity={1.35}
          color="#7d93b8"
          scale={[15, 15, 1]}
          position={[8, 2, -7]}
          target={[0, 0.6, 0]}
        />
        <Lightformer
          form="circle"
          intensity={1.9}
          color="#ff9b4d"
          scale={[7, 7, 1]}
          position={[1.5, -2.4, 4]}
          target={[0, 0.4, 0]}
        />
        <Lightformer
          form="circle"
          intensity={0.9}
          color="#3b2416"
          scale={[16, 16, 1]}
          position={[0, -7, 0]}
          target={[0, 0, 0]}
        />
      </Environment>
    </>
  );
}
