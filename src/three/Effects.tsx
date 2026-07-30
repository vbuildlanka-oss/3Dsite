import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, N8AO } from '@react-three/postprocessing';
import {
  BlendFunction,
  BloomEffect,
  ChromaticAberrationEffect,
  KernelSize,
  NoiseEffect,
  ToneMappingEffect,
  ToneMappingMode,
  VignetteEffect,
} from 'postprocessing';
import { stage } from './stage';
import { clamp, damp } from '@/lib/math';
import { sceneQuality } from '@/lib/device';

/**
 * Grade pass.
 *
 * Ambient occlusion is doing the heavy lifting for realism here: it darkens the
 * crease of the bean, the inside of the handle and the seat where the cup meets
 * the saucer — the contact cues that are missing from lit-but-unoccluded CG.
 *
 * Bloom's threshold is deliberately high. Additive point sprites produce
 * single-pixel highlights that a low threshold turns into coloured fireflies,
 * especially once chromatic aberration splits them.
 *
 * The effects are instantiated directly rather than via the JSX wrappers: those
 * memoise on `JSON.stringify(props)`, and under React 19 `ref` arrives as a
 * normal prop — serialising a live effect and its back-reference into the scene
 * graph throws on the circular structure.
 */
export function Effects() {
  const quality = useMemo(() => sceneQuality(), []);

  const bloom = useMemo(
    () =>
      new BloomEffect({
        intensity: 0.5,
        luminanceThreshold: 0.62,
        luminanceSmoothing: 0.22,
        mipmapBlur: true,
        kernelSize: KernelSize.LARGE,
        radius: 0.76,
      }),
    [],
  );

  const chromatic = useMemo(
    () =>
      new ChromaticAberrationEffect({
        blendFunction: BlendFunction.NORMAL,
        offset: new THREE.Vector2(0.00028, 0.00042),
        radialModulation: true,
        modulationOffset: 0.45,
      }),
    [],
  );

  const noise = useMemo(() => {
    const effect = new NoiseEffect({ blendFunction: BlendFunction.SOFT_LIGHT, premultiply: true });
    effect.blendMode.opacity.value = 0.15;
    return effect;
  }, []);

  const vignette = useMemo(() => new VignetteEffect({ offset: 0.22, darkness: 0.72 }), []);
  const tone = useMemo(() => new ToneMappingEffect({ mode: ToneMappingMode.AGX }), []);

  useEffect(
    () => () => {
      [bloom, chromatic, noise, vignette, tone].forEach((e) => e.dispose());
    },
    [bloom, chromatic, noise, vignette, tone],
  );

  useFrame(() => {
    // Bloom swells through the roast so first crack actually blooms.
    const heat = clamp(stage.embers * 0.9 + stage.cup * 0.3 + 0.22);
    bloom.intensity = damp(bloom.intensity, 0.3 + heat * 0.62, 3, stage.dt);
  });

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      {quality.ao ? (
        <N8AO
          aoRadius={0.55}
          distanceFalloff={0.85}
          intensity={2.6}
          aoSamples={quality.tier === 'high' ? 16 : 8}
          denoiseSamples={4}
          halfRes
          color="#160c07"
        />
      ) : (
        <></>
      )}
      <primitive object={bloom} />
      <primitive object={chromatic} />
      <primitive object={noise} />
      <primitive object={vignette} />
      <primitive object={tone} />
    </EffectComposer>
  );
}
