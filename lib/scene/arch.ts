import * as THREE from 'three';

/**
 * The clinic's archway, as the fifteen stones it is built from: nine wedge
 * voussoirs round a semicircle and two pillars of three blocks. Each stone's
 * geometry is centred on itself, so it can fly, turn and settle into place
 * (lib/scene/timeline.ts, ArchScene.tsx) before it is part of the arch.
 *
 * Arch space: the origin is on the floor, midway between the pillars.
 */

export const ARCH = {
  inner: 0.46,
  outer: 0.64,
  depth: 0.2,
  pillarHeight: 0.9,
  blocks: 3,
  voussoirs: 9,
  /** A hair of mortar between stones, so the joints read. */
  joint: 0.006,
};

export const ARCH_MID = (ARCH.inner + ARCH.outer) / 2;
export const ARCH_HEIGHT = ARCH.pillarHeight + ARCH.outer;

export type ArchStone = {
  geometry: THREE.BufferGeometry;
  /** Final position in arch space. */
  position: THREE.Vector3;
  /** Final turn about the depth axis. */
  rotation: number;
  /** Order in which it settles: foundations first, keystone last. */
  order: number;
  kind: 'block' | 'voussoir';
};

const extrude = (shape: THREE.Shape) => {
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: ARCH.depth,
    bevelEnabled: true,
    bevelSize: 0.007,
    bevelThickness: 0.007,
    bevelSegments: 2,
    curveSegments: 12,
  });
  geometry.translate(0, 0, -ARCH.depth / 2);
  return geometry;
};

export function createArchStones(): ArchStone[] {
  const stones: ArchStone[] = [];
  const width = ARCH.outer - ARCH.inner - ARCH.joint;
  const blockHeight = ARCH.pillarHeight / ARCH.blocks;

  // The pillars.
  for (const side of [-1, 1]) {
    for (let k = 0; k < ARCH.blocks; k++) {
      const shape = new THREE.Shape();
      const w = width / 2;
      const h = (blockHeight - ARCH.joint) / 2;
      shape.moveTo(-w, -h);
      shape.lineTo(w, -h);
      shape.lineTo(w, h);
      shape.lineTo(-w, h);
      shape.closePath();
      stones.push({
        geometry: extrude(shape),
        position: new THREE.Vector3(side * ARCH_MID, blockHeight * (k + 0.5), 0),
        rotation: 0,
        order: k,
        kind: 'block',
      });
    }
  }

  // The voussoirs, each drawn with its radial direction up (+y) and centred.
  const step = Math.PI / ARCH.voussoirs;
  const half = step / 2 - ARCH.joint / ARCH_MID / 2;
  for (let k = 0; k < ARCH.voussoirs; k++) {
    const mid = step * (k + 0.5);
    const shape = new THREE.Shape();
    const steps = 6;
    for (let i = 0; i <= steps; i++) {
      const a = -half + (2 * half * i) / steps;
      const x = ARCH.inner * Math.sin(a);
      const y = ARCH.inner * Math.cos(a) - ARCH_MID;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    for (let i = steps; i >= 0; i--) {
      const a = -half + (2 * half * i) / steps;
      shape.lineTo(ARCH.outer * Math.sin(a), ARCH.outer * Math.cos(a) - ARCH_MID);
    }
    shape.closePath();
    stones.push({
      geometry: extrude(shape),
      position: new THREE.Vector3(ARCH_MID * Math.cos(mid), ARCH.pillarHeight + ARCH_MID * Math.sin(mid), 0),
      rotation: mid - Math.PI / 2,
      // Up from both springings towards the keystone, which goes in last.
      order: ARCH.blocks + Math.min(k, ARCH.voussoirs - 1 - k),
      kind: 'voussoir',
    });
  }

  return stones;
}

/** The four voussoirs that become the four stones of the consultation plan. */
export const PLAN_STONES = [7, 9, 11, 13];
