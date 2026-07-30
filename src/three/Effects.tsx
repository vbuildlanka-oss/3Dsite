import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
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

/**
 * Grade pass.
 *
 * The effects are instantiated directly rather than via the JSX wrappers:
 * those wrappers memoise on `JSON.stringify(props)`, and under React 19 `ref`
 * arrives as a normal prop — serialising a live effect (and its back-reference
 * into the scene graph) throws on the circular structure. Owning the instances
 * also means bloom can be animated straight from the timeline.
 */
export function Effects() {
  const bloom = useMemo(
    () =>
      new BloomEffect({
        intensity: 0.55,
        luminanceThreshold: 0.3,
        luminanceSmoothing: 0.3,
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
        offset: new THREE.Vector2(0.0006, 0.0009),
        radialModulation: true,
        modulationOffset: 0.45,
      }),
    [],
  );

  const noise = useMemo(() => {
    const effect = new NoiseEffect({ blendFunction: BlendFunction.SOFT_LIGHT, premultiply: true });
    effect.blendMode.opacity.value = 0.16;
    return effect;
  }, []);

  const vignette = useMemo(
    () => new VignetteEffect({ offset: 0.22, darkness: 0.74 }),
    [],
  );

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
    bloom.intensity = damp(bloom.intensity, 0.4 + heat * 0.8, 3, stage.dt);
  });

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <primitive object={bloom} />
      <primitive object={chromatic} />
      <primitive object={noise} />
      <primitive object={vignette} />
      <primitive object={tone} />
    </EffectComposer>
  );
}
