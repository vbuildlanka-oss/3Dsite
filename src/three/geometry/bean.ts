import * as THREE from 'three';

type BeanOptions = {
  segments?: number;
  /** Half-length along X — the long axis. */
  length?: number;
  /** Half-width along Y — the axis the crease runs across. */
  width?: number;
  /** Half-thickness along Z — the flattest axis. */
  thickness?: number;
  /** 0..1 fraction of the thickness the centre crease removes. */
  crease?: number;
  /** How far the two halves swell back out either side of the crease. */
  lips?: number;
};

const gauss = (x: number, sigma: number) => Math.exp(-(x * x) / (2 * sigma * sigma));

/**
 * A coffee bean, built by deforming a sphere.
 *
 * Real proportions matter more than detail here: a bean is roughly 10 × 7 × 5,
 * so the ellipsoid is markedly flattened on Z. The creased face carries a deep
 * gaussian valley with raised lips either side, and the whole thing gets a
 * little low-amplitude wrinkle so the specular never reads as plastic.
 * Doing this in geometry rather than a normal map keeps the silhouette correct
 * against the rim light, which is where beans usually give themselves away.
 */
export const createBeanGeometry = ({
  segments = 64,
  length = 1,
  width = 0.57,
  thickness = 0.395,
  crease = 0.94,
  lips = 0.13,
}: BeanOptions = {}) => {
  const geo = new THREE.SphereGeometry(1, segments, Math.round(segments * 0.62));
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();

  // Silver skin: the pale chaff that stays lodged in the crease after hulling.
  // Baked as vertex colour so it survives the roast tint, which is applied as
  // an instance colour and multiplies on top.
  const tint = new Float32Array(pos.count * 3);

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);

    const x = v.x * length;
    // Blunt the ends: real beans are stubbier than an ellipsoid at the tips.
    const stub = 1 + 0.05 * (1 - Math.abs(v.x));
    let y = v.y * width * stub;
    let z = v.z * thickness * stub;

    // The creased face is flatter than the domed back.
    const front = z > 0;
    if (front) z *= 0.86;

    // Crease fades to nothing at the tips.
    const along = Math.max(0, 1 - Math.pow(Math.abs(x) / length, 2.4));

    if (front) {
      const relative = z / (thickness * 0.86); // 0 at the edge, 1 at the crown
      // A narrow gaussian, not a broad bowl: the crease has to read as a fold.
      const valley = gauss(y / width, 0.085) * crease * along;
      z -= z * valley;
      // Lips: a ridge either side of the valley, following its gradient.
      z += gauss(Math.abs(y / width) - 0.3, 0.13) * lips * thickness * along * relative;
    }

    // Fine wrinkle, strongest on the domed back.
    const wrinkle = Math.sin(x * 14.5) * Math.sin(y * 21.3) * 0.002 * (front ? 0.4 : 1);
    z += Math.sign(z || 1) * wrinkle;
    y += Math.sin(x * 3.1) * 0.008;

    pos.setXYZ(i, x, y, z);

    const chaff = front ? gauss(y / width, 0.06) * along : 0;
    const shade = 1 + chaff * 0.85;
    tint[i * 3] = shade;
    tint[i * 3 + 1] = shade * (1 - chaff * 0.04);
    tint[i * 3 + 2] = shade * (1 - chaff * 0.12);
  }

  geo.setAttribute('color', new THREE.BufferAttribute(tint, 3));
  geo.computeVertexNormals();
  geo.computeBoundingSphere();
  return geo;
};

/** Roast progression, sampled as a gradient. */
const ROAST_STOPS = [
  '#8e9a6a', // raw / green
  '#c9a95f', // drying, yellowing
  '#a3733f', // cinnamon
  '#7b4a2c', // city
  '#4e2c1c', // full city
  '#2c1610', // dark, oily
].map((hex) => new THREE.Color(hex).convertSRGBToLinear());

const tmpA = new THREE.Color();

export const roastColor = (t: number, target = new THREE.Color()) => {
  const x = Math.min(0.9999, Math.max(0, t)) * (ROAST_STOPS.length - 1);
  const i = Math.floor(x);
  target.copy(ROAST_STOPS[i]).lerp(tmpA.copy(ROAST_STOPS[i + 1] ?? ROAST_STOPS[i]), x - i);
  return target;
};
