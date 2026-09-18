import * as THREE from 'three';

/**
 * The crystal the six concern droplets freeze into.
 *
 * It is a fine sphere carrying one morph target: every vertex pushed out along
 * its own direction until it meets the surface of a faceted gem (an octagonal
 * girdle, eight crown facets, eight pavilion facets and a flat table). Morph
 * influence 0 is the liquid drop, 1 is the crystal, and anything between is
 * the drop freezing, so the change is one continuous surface, never a swap.
 *
 * Each vertex also takes the normal of the facet it lands on, so the frozen
 * surface lights as flat, polished facets with fine bevels between them.
 */

type Plane = { normal: THREE.Vector3; distance: number };

function facet(azimuth: number, elevation: number, girdleRadius: number, height: number): Plane {
  const normal = new THREE.Vector3(
    Math.cos(elevation) * Math.cos(azimuth),
    Math.sin(elevation),
    Math.cos(elevation) * Math.sin(azimuth)
  );
  // The plane passes through the girdle's edge at this azimuth.
  const through = new THREE.Vector3(girdleRadius * Math.cos(azimuth), height, girdleRadius * Math.sin(azimuth));
  return { normal, distance: normal.dot(through) };
}

/** The gem, as the planes of a convex solid, girdle radius 1. */
function gemPlanes(): Plane[] {
  const planes: Plane[] = [];
  const sides = 8;
  const girdleHalf = 0.16;
  for (let k = 0; k < sides; k++) {
    const a = (k / sides) * Math.PI * 2;
    // The girdle: a narrow upright band.
    planes.push({ normal: new THREE.Vector3(Math.cos(a), 0, Math.sin(a)), distance: 1 });
    // Crown facets above it, and pavilion facets below, offset half a side so
    // the facets interleave the way a cut stone's do.
    planes.push(facet(a, THREE.MathUtils.degToRad(40), 1, girdleHalf));
    planes.push(facet(a + Math.PI / sides, THREE.MathUtils.degToRad(-54), 1, -girdleHalf));
  }
  // The table.
  planes.push({ normal: new THREE.Vector3(0, 1, 0), distance: 0.6 });
  return planes;
}

export function createCrystalGeometry() {
  const geometry = new THREE.SphereGeometry(1, 128, 96);
  const planes = gemPlanes();
  const position = geometry.getAttribute('position');
  const targetPositions = new Float32Array(position.count * 3);
  const targetNormals = new Float32Array(position.count * 3);
  const direction = new THREE.Vector3();

  for (let i = 0; i < position.count; i++) {
    direction.fromBufferAttribute(position, i).normalize();
    // Where the ray from the centre along this direction leaves the solid:
    // the nearest of the planes it is heading towards.
    let nearest = Infinity;
    let hit: Plane = planes[0];
    for (const plane of planes) {
      const facing = plane.normal.dot(direction);
      if (facing <= 1e-6) continue;
      const t = plane.distance / facing;
      if (t < nearest) {
        nearest = t;
        hit = plane;
      }
    }
    targetPositions[i * 3] = direction.x * nearest;
    targetPositions[i * 3 + 1] = direction.y * nearest;
    targetPositions[i * 3 + 2] = direction.z * nearest;
    targetNormals[i * 3] = hit.normal.x;
    targetNormals[i * 3 + 1] = hit.normal.y;
    targetNormals[i * 3 + 2] = hit.normal.z;
  }

  geometry.morphAttributes.position = [new THREE.Float32BufferAttribute(targetPositions, 3)];
  geometry.morphAttributes.normal = [new THREE.Float32BufferAttribute(targetNormals, 3)];
  // The crystal reaches further than the unit sphere (its tip is ~0.9 below
  // the centre and its corners stick out), so the bounds must cover both.
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1.5);
  return geometry;
}
