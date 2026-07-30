import * as THREE from 'three';

type SweepOptions = {
  /** Samples along the curve. */
  steps?: number;
  /** Points around the cross-section. */
  radial?: number;
  /** Radius at t (0..1) along the curve. */
  radius: (t: number) => number;
  /** Cross-section flattening across the sweep plane. 1 = round. */
  flatten?: number;
  /** Close the ends with caps. */
  caps?: boolean;
};

/**
 * Sweeps a tapered, optionally flattened cross-section along a curve.
 *
 * `TubeGeometry` only does a constant radius, which is exactly what makes
 * procedural handles and spouts look like bent pipes: real ones swell in the
 * middle and blend into the body at both ends. Frenet frames from the curve
 * keep the section perpendicular through the bends.
 */
export const createSweptTube = (
  curve: THREE.Curve<THREE.Vector3>,
  { steps = 64, radial = 20, radius, flatten = 1, caps = true }: SweepOptions,
) => {
  const frames = curve.computeFrenetFrames(steps, false);
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const point = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const offset = new THREE.Vector3();

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    curve.getPointAt(t, point);
    const r = radius(t);
    const N = frames.normals[i];
    const B = frames.binormals[i];

    for (let j = 0; j <= radial; j++) {
      const v = (j / radial) * Math.PI * 2;
      const sin = Math.sin(v);
      const cos = -Math.cos(v);

      normal.set(N.x * cos * flatten + B.x * sin, N.y * cos * flatten + B.y * sin, N.z * cos * flatten + B.z * sin);
      normal.normalize();

      offset.set(
        N.x * cos * r * flatten + B.x * sin * r,
        N.y * cos * r * flatten + B.y * sin * r,
        N.z * cos * r * flatten + B.z * sin * r,
      );

      positions.push(point.x + offset.x, point.y + offset.y, point.z + offset.z);
      normals.push(normal.x, normal.y, normal.z);
      uvs.push(t, j / radial);
    }
  }

  const ring = radial + 1;
  for (let i = 0; i < steps; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * ring + j;
      const b = (i + 1) * ring + j;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  if (caps) {
    for (const end of [0, 1] as const) {
      const t = end;
      curve.getPointAt(t, point);
      const centre = positions.length / 3;
      const dir = curve.getTangentAt(t, new THREE.Vector3()).multiplyScalar(end === 0 ? -1 : 1);
      positions.push(point.x, point.y, point.z);
      normals.push(dir.x, dir.y, dir.z);
      uvs.push(t, 0.5);

      const base = end === 0 ? 0 : steps * ring;
      for (let j = 0; j < radial; j++) {
        if (end === 0) indices.push(centre, base + j + 1, base + j);
        else indices.push(centre, base + j, base + j + 1);
      }
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeBoundingSphere();
  return geo;
};
