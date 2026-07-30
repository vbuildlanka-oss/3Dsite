import * as THREE from 'three';
import { createSweptTube } from './sweep';

export const CUP = {
  height: 1.16,
  rimOuter: 0.862,
  rimInner: 0.804,
  baseOuter: 0.455,
  baseInner: 0.42,
  floor: 0.1,
  bulge: 0.05,
  /** Height of the saucer well the cup foot seats into. */
  seat: 0.031,
};

/** Inner radius of the cup at a given height — used to size the liquid disc. */
export const innerRadiusAt = (y: number) => {
  const t = THREE.MathUtils.clamp((y - CUP.floor) / (CUP.height - 0.035 - CUP.floor), 0, 1);
  const eased = Math.pow(t, 0.86);
  return (
    THREE.MathUtils.lerp(CUP.baseInner, CUP.rimInner, eased) +
    CUP.bulge * Math.sin(t * Math.PI) * 0.55
  );
};

const V2 = (x: number, y: number) => new THREE.Vector2(x, y);

/** Arc of points, for rolled rims and foot rings. */
const arc = (
  out: THREE.Vector2[],
  cx: number,
  cy: number,
  r: number,
  from: number,
  to: number,
  steps: number,
) => {
  for (let i = 0; i <= steps; i++) {
    const a = THREE.MathUtils.lerp(from, to, i / steps);
    out.push(V2(cx + Math.cos(a) * r, cy + Math.sin(a) * r));
  }
};

/**
 * Wall from one point to another, with a bulge and the faint horizontal
 * ripples a thrown pot keeps from the potter's fingers. The ripples are barely
 * half a millimetre at this scale, but they are what stops the silhouette
 * reading as a lathe primitive under a raking light.
 */
const wall = (
  out: THREE.Vector2[],
  from: THREE.Vector2,
  to: THREE.Vector2,
  bulge: number,
  steps: number,
  rings = 0,
) => {
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const eased = Math.pow(t, 0.86);
    const ripple = rings ? Math.sin(t * Math.PI * rings) * 0.0055 * Math.sin(t * Math.PI) : 0;
    out.push(
      V2(
        THREE.MathUtils.lerp(from.x, to.x, eased) + bulge * Math.sin(t * Math.PI) + ripple,
        THREE.MathUtils.lerp(from.y, to.y, t),
      ),
    );
  }
};

/**
 * The full turned profile: recessed foot ring, bulged body with throwing rings,
 * rolled-over rim, back down the inner wall to a thickened, domed floor.
 * `innerStart` marks where the interior begins so the cream glaze can be built
 * as its own thin shell.
 */
const cupProfile = (detail: number) => {
  const p: THREE.Vector2[] = [];

  p.push(V2(0, 0.014));
  p.push(V2(CUP.baseOuter * 0.5, 0.01));
  p.push(V2(CUP.baseOuter * 0.82, 0.001));
  p.push(V2(CUP.baseOuter, 0));
  p.push(V2(CUP.baseOuter + 0.012, 0.014));
  p.push(V2(CUP.baseOuter, 0.032));

  wall(p, V2(CUP.baseOuter, 0.032), V2(CUP.rimOuter, CUP.height - 0.029), CUP.bulge, detail, 7);

  const rollR = (CUP.rimOuter - CUP.rimInner) / 2;
  arc(p, CUP.rimOuter - rollR, CUP.height - 0.029, rollR, 0, Math.PI, 10);

  const innerStart = p.length - 1;

  wall(
    p,
    V2(CUP.rimInner, CUP.height - 0.032),
    V2(CUP.baseInner, CUP.floor),
    -CUP.bulge * 0.72,
    detail,
    0,
  );

  p.push(V2(CUP.baseInner * 0.72, CUP.floor - 0.012));
  p.push(V2(CUP.baseInner * 0.36, CUP.floor - 0.02));
  p.push(V2(0, CUP.floor - 0.022));

  return { points: p, innerStart };
};

export const createCupGeometry = (segments = 96) => {
  const detail = Math.max(14, Math.round(segments / 2.6));
  const geo = new THREE.LatheGeometry(cupProfile(detail).points, segments);
  geo.computeVertexNormals();
  return geo;
};

/**
 * Thin interior shell, the inner wall offset 4 mm inward. Rendering the
 * interior as its own surface is what lets the cup read as dark stoneware
 * outside and cream glaze inside — a two-tone that also keeps overlaid type
 * legible against the body.
 */
export const createCupInteriorGeometry = (segments = 96) => {
  const detail = Math.max(14, Math.round(segments / 2.6));
  const { points, innerStart } = cupProfile(detail);
  const inner = points.slice(innerStart).map((v) => V2(Math.max(0, v.x - 0.005), v.y - 0.002));
  const geo = new THREE.LatheGeometry(inner, segments);
  geo.computeVertexNormals();
  return geo;
};

/** Saucer with a shallow central well, a flared face and a thickened rim. */
export const createSaucerGeometry = (segments = 96) => {
  const p: THREE.Vector2[] = [
    V2(0, 0.004),
    V2(0.3, 0),
    V2(0.62, 0.006),
    V2(0.98, 0.036),
    V2(1.24, 0.076),
    V2(1.34, 0.098),
    V2(1.375, 0.116),
    V2(1.35, 0.132),
    V2(1.16, 0.108),
    V2(0.84, 0.078),
    V2(0.63, 0.058),
    V2(0.56, 0.04),
    V2(0.5, CUP.seat),
    V2(0.26, CUP.seat - 0.003),
    V2(0, CUP.seat - 0.004),
  ];
  const geo = new THREE.LatheGeometry(p, segments);
  geo.computeVertexNormals();
  return geo;
};

/**
 * Strap handle swept along a curve: wider in the plane of the loop than across
 * it, swelling in the middle and thinning where it meets the wall.
 */
export const createHandleGeometry = (quality = 1) => {
  const curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.78, 0.95, 0),
      new THREE.Vector3(1.2, 0.92, 0),
      new THREE.Vector3(1.42, 0.63, 0),
      new THREE.Vector3(1.24, 0.34, 0),
      new THREE.Vector3(0.79, 0.29, 0),
    ],
    false,
    'catmullrom',
    0.4,
  );

  return createSweptTube(curve, {
    steps: quality > 0.5 ? 72 : 32,
    radial: quality > 0.5 ? 18 : 10,
    flatten: 1.4,
    radius: (t) => 0.026 + 0.026 * Math.pow(Math.sin(Math.PI * t), 0.55),
  });
};
