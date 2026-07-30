import * as THREE from 'three';
import { createSweptTube } from './sweep';

/**
 * A gooseneck pour-over kettle.
 *
 * This exists to fix a credibility problem: a stream of coffee appearing out of
 * empty air reads as a special effect. Give the viewer the vessel it comes out
 * of — with the spout tip at the exact point the stream begins — and the same
 * animation reads as a pour.
 *
 * Everything is authored in natural coordinates (base of the body at y = 0) and
 * `KETTLE_TIP` reports where the spout ends, so the component can pivot the
 * whole kettle about the tip and keep the stream anchored while it tips.
 */
export const KETTLE_TIP = new THREE.Vector3(0.876, 0.238, 0);

const V2 = (x: number, y: number) => new THREE.Vector2(x, y);

export const createKettleBody = (segments = 80) => {
  const p: THREE.Vector2[] = [
    V2(0, 0.002),
    V2(0.24, 0),
    V2(0.305, 0.008),
    V2(0.335, 0.03),
    V2(0.362, 0.09),
    V2(0.374, 0.17),
    V2(0.372, 0.27),
    V2(0.352, 0.37),
    V2(0.314, 0.455),
    V2(0.258, 0.52),
    V2(0.206, 0.565),
    V2(0.192, 0.6),
    // Rolled lip around the lid opening
    V2(0.205, 0.612),
    V2(0.196, 0.62),
    V2(0.18, 0.606),
    V2(0, 0.6),
  ];
  const geo = new THREE.LatheGeometry(p, segments);
  geo.computeVertexNormals();
  return geo;
};

export const createKettleLid = (segments = 64) => {
  const p: THREE.Vector2[] = [
    V2(0, 0.604),
    V2(0.14, 0.606),
    V2(0.178, 0.614),
    V2(0.186, 0.626),
    V2(0.15, 0.634),
    V2(0.07, 0.638),
    V2(0.042, 0.652),
    V2(0.05, 0.676),
    V2(0.036, 0.69),
    V2(0, 0.692),
  ];
  const geo = new THREE.LatheGeometry(p, segments);
  geo.computeVertexNormals();
  return geo;
};

export const createKettleSpout = (quality = 1) => {
  const curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.22, 0.33, 0),
      new THREE.Vector3(0.46, 0.39, 0),
      new THREE.Vector3(0.68, 0.53, 0),
      new THREE.Vector3(0.84, 0.5, 0),
      new THREE.Vector3(0.888, 0.36, 0),
      KETTLE_TIP.clone(),
    ],
    false,
    'catmullrom',
    0.4,
  );

  return createSweptTube(curve, {
    steps: quality > 0.5 ? 84 : 40,
    radial: quality > 0.5 ? 20 : 12,
    // Necks down hard at the tip — that is what makes a gooseneck controllable.
    radius: (t) => 0.082 * Math.pow(1 - t, 0.85) + 0.019,
  });
};

export const createKettleHandle = (quality = 1) => {
  const curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.28, 0.47, 0),
      new THREE.Vector3(-0.56, 0.44, 0),
      new THREE.Vector3(-0.66, 0.24, 0),
      new THREE.Vector3(-0.5, 0.09, 0),
      new THREE.Vector3(-0.3, 0.07, 0),
    ],
    false,
    'catmullrom',
    0.4,
  );

  return createSweptTube(curve, {
    steps: quality > 0.5 ? 64 : 30,
    radial: quality > 0.5 ? 16 : 10,
    flatten: 1.25,
    radius: (t) => 0.022 + 0.014 * Math.pow(Math.sin(Math.PI * t), 0.6),
  });
};
