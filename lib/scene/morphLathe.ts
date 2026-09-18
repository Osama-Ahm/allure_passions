import * as THREE from 'three';

/**
 * A turned shape whose profile is three numbers, rewritten in place whenever
 * they change, so it can morph continuously between forms that share them:
 *
 *   pebble     a small, soft, flattened stone     (round sides, p ≈ 2)
 *   disc       a flat disc with a rounded edge    (square sides, p ≈ 9)
 *   medallion  a wider, thinner disc              (p ≈ 12)
 *
 * The profile is a superellipse swept round the vertical axis: radius `a`,
 * half-height `b`, squareness `p`. The vertex count never changes, so the
 * geometry, and the shader, stay the same objects throughout.
 */
export type LatheShape = { a: number; b: number; p: number };

const PROFILE_POINTS = 28;
const SEGMENTS = 72;

export function createMorphLathe(shape: LatheShape) {
  const profile = Array.from({ length: PROFILE_POINTS }, () => new THREE.Vector2());
  const geometry = new THREE.LatheGeometry(profile, SEGMENTS);
  const position = geometry.getAttribute('position') as THREE.BufferAttribute;
  const normal = geometry.getAttribute('normal') as THREE.BufferAttribute;
  const current: LatheShape = { a: -1, b: -1, p: -1 };
  const seam = new THREE.Vector3();

  function setShape(next: LatheShape) {
    if (Math.abs(next.a - current.a) < 1e-5 && Math.abs(next.b - current.b) < 1e-5 && Math.abs(next.p - current.p) < 1e-4) return;
    Object.assign(current, next);

    const e = 2 / next.p;
    for (let j = 0; j < PROFILE_POINTS; j++) {
      // From the bottom centre (-90°) to the top centre (+90°).
      const phi = -Math.PI / 2 + (j / (PROFILE_POINTS - 1)) * Math.PI;
      const c = Math.cos(phi);
      const s = Math.sin(phi);
      profile[j].set(next.a * Math.pow(Math.abs(c), e), next.b * (1 + Math.sign(s) * Math.pow(Math.abs(s), e)));
    }

    // The same vertex order as THREE.LatheGeometry: segment by segment, each
    // running up the profile.
    for (let i = 0; i <= SEGMENTS; i++) {
      const angle = (i / SEGMENTS) * Math.PI * 2;
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);
      for (let j = 0; j < PROFILE_POINTS; j++) {
        position.setXYZ(i * PROFILE_POINTS + j, profile[j].x * sin, profile[j].y, profile[j].x * cos);
      }
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();

    // The first and last segments are the same seam; average their normals so
    // it never shows.
    for (let j = 0; j < PROFILE_POINTS; j++) {
      const first = j;
      const last = SEGMENTS * PROFILE_POINTS + j;
      seam
        .set(normal.getX(first) + normal.getX(last), normal.getY(first) + normal.getY(last), normal.getZ(first) + normal.getZ(last))
        .normalize();
      normal.setXYZ(first, seam.x, seam.y, seam.z);
      normal.setXYZ(last, seam.x, seam.y, seam.z);
    }
    normal.needsUpdate = true;
    geometry.computeBoundingSphere();
  }

  setShape(shape);
  return { geometry, setShape };
}

export const lerpShape = (from: LatheShape, to: LatheShape, t: number, out: LatheShape): LatheShape => {
  out.a = from.a + (to.a - from.a) * t;
  out.b = from.b + (to.b - from.b) * t;
  out.p = from.p + (to.p - from.p) * t;
  return out;
};

export const PEBBLE: LatheShape = { a: 0.11, b: 0.04, p: 2.2 };
export const DISC: LatheShape = { a: 0.2, b: 0.026, p: 9 };
export const MEDALLION: LatheShape = { a: 0.3, b: 0.028, p: 12 };
