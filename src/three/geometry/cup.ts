import * as THREE from 'three';

export const CUP = {
  height: 1.16,
  rimOuter: 0.86,
  rimInner: 0.79,
  baseOuter: 0.5,
  baseInner: 0.44,
  floor: 0.09,
  bulge: 0.055,
};

/** Inner radius of the cup at a given height — used to size the liquid disc. */
export const innerRadiusAt = (y: number) => {
  const t = THREE.MathUtils.clamp((y - CUP.floor) / (CUP.height - CUP.floor), 0, 1);
  const eased = Math.pow(t, 0.86);
  return THREE.MathUtils.lerp(CUP.baseInner, CUP.rimInner, eased) + CUP.bulge * Math.sin(t * Math.PI) * 0.6;
};

const wall = (
  points: THREE.Vector2[],
  from: THREE.Vector2,
  to: THREE.Vector2,
  bulge: number,
  steps: number,
) => {
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const eased = Math.pow(t, 0.86);
    const r = THREE.MathUtils.lerp(from.x, to.x, eased) + bulge * Math.sin(t * Math.PI);
    const y = THREE.MathUtils.lerp(from.y, to.y, t);
    points.push(new THREE.Vector2(r, y));
  }
};

/**
 * Lathe profile for a hand-thrown ceramic tumbler: outer wall sweeps up with a
 * subtle bulge, rolls over the rim, and returns down the inner wall to a
 * thickened floor. One closed profile means one draw call and correct
 * silhouette from any angle.
 */
export const createCupGeometry = (segments = 64) => {
  const p: THREE.Vector2[] = [];
  const detail = Math.max(10, Math.round(segments / 3));

  p.push(new THREE.Vector2(0, 0.004));
  p.push(new THREE.Vector2(CUP.baseOuter * 0.55, 0));
  p.push(new THREE.Vector2(CUP.baseOuter, 0.012));

  wall(
    p,
    new THREE.Vector2(CUP.baseOuter, 0.012),
    new THREE.Vector2(CUP.rimOuter, CUP.height),
    CUP.bulge,
    detail,
  );

  // Rim roll-over
  p.push(new THREE.Vector2(CUP.rimOuter - 0.012, CUP.height + 0.012));
  p.push(new THREE.Vector2(CUP.rimInner + 0.012, CUP.height + 0.012));

  wall(
    p,
    new THREE.Vector2(CUP.rimInner, CUP.height),
    new THREE.Vector2(CUP.baseInner, CUP.floor),
    -CUP.bulge * 0.8,
    detail,
  );

  p.push(new THREE.Vector2(CUP.baseInner * 0.5, CUP.floor - 0.008));
  p.push(new THREE.Vector2(0, CUP.floor - 0.012));

  const geo = new THREE.LatheGeometry(p, segments);
  geo.computeVertexNormals();
  return geo;
};

/** Shallow saucer, same lathe trick. */
export const createSaucerGeometry = (segments = 64) => {
  const p: THREE.Vector2[] = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.55, 0),
    new THREE.Vector2(0.95, 0.008),
    new THREE.Vector2(1.32, 0.058),
    new THREE.Vector2(1.44, 0.086),
    new THREE.Vector2(1.44, 0.104),
    new THREE.Vector2(1.3, 0.086),
    new THREE.Vector2(0.9, 0.05),
    new THREE.Vector2(0.52, 0.042),
    new THREE.Vector2(0, 0.042),
  ];
  const geo = new THREE.LatheGeometry(p, segments);
  geo.computeVertexNormals();
  return geo;
};
