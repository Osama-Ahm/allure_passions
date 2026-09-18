'use client';

import { ContactShadows } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { ARCH, ARCH_HEIGHT, PLAN_STONES, createArchStones } from '@/lib/scene/arch';
import { withDissolve } from '@/lib/scene/dissolve';
import { goldLight, travertine } from '@/lib/scene/palette';
import { ORDER, clamp01, ease, lerp, span, spanLinear, stage } from '@/lib/scene/stage';
import { T } from '@/lib/scene/timeline';
import { createMarbleTexture } from '@/lib/proceduralTextures';
import type { Quality } from '../quality';
import { DROP_X } from './BottleScene';
import { FLOOR_Y, MERGED_CENTRE } from './DropletScene';

/** Where the arch stands: on the floor, a little behind where the crystal was. */
export const ARCH_ORIGIN = new THREE.Vector3(DROP_X, FLOOR_Y, -0.3);
/** Where it lies once it has gone down: the centre of the consultation plan. */
export const PLAN_CENTRE = new THREE.Vector3(DROP_X, FLOOR_Y, -0.3 - 0.78);

const tmp = new THREE.Vector3();
const control = new THREE.Vector3();
const settled = new THREE.Quaternion();
const zAxis = new THREE.Vector3(0, 0, 1);

/** Seeded, so the stones fly the same way on every visit. */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a = (a * 16807) % 2147483647;
    return a / 2147483647;
  };
}

/**
 * Chapters 5–6 · Clinic and Consultation. The crystal breaks at dawn and its
 * pieces fly out and build the clinic's archway, stone by stone, foundations
 * first and keystone last, resolving from light as they go. Sunlight fills the
 * doorway. Then the arch lies down; the stones that are not part of the plan
 * dissolve, and four of them become the consultation plan (TokenScene).
 */
export function ArchScene({ quality }: { quality: Quality }) {
  const stones = useMemo(createArchStones, []);
  const map = useMemo(() => {
    const texture = createMarbleTexture(1024);
    texture.repeat.set(1.4, 1.4);
    return texture;
  }, []);
  const materials = useMemo(
    () =>
      stones.map(() =>
        withDissolve(new THREE.MeshStandardMaterial({ color: travertine, map, roughness: 0.72, metalness: 0 }))
      ),
    [stones, map]
  );

  // Each stone's flight: from inside the crystal, out along its own arc, home.
  const flights = useMemo(() => {
    const random = seeded(4404);
    const maxOrder = Math.max(...stones.map((stone) => stone.order));
    return stones.map((stone) => {
      const start = new THREE.Vector3(
        MERGED_CENTRE.x - ARCH_ORIGIN.x + (random() - 0.5) * 0.16,
        MERGED_CENTRE.y - ARCH_ORIGIN.y + (random() - 0.5) * 0.16,
        MERGED_CENTRE.z - ARCH_ORIGIN.z + (random() - 0.5) * 0.16
      );
      const spin = new THREE.Quaternion().setFromEuler(
        new THREE.Euler((random() - 0.5) * 5, (random() - 0.5) * 5, (random() - 0.5) * 5)
      );
      const outward = stone.position.clone().sub(start).normalize();
      return { start, spin, outward, delay: (stone.order / maxOrder) * 0.38 };
    });
  }, [stones]);

  // Sunlight in the doorway: a soft warm glow, brightest low in the opening.
  const sunlight = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 256, 0, 0);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.7, 'rgba(255,255,255,0.55)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 256);
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  useEffect(
    () => () => {
      stones.forEach((stone) => stone.geometry.dispose());
      materials.forEach((material) => material.dispose());
      map.dispose();
      sunlight.dispose();
    },
    [stones, materials, map, sunlight]
  );

  const arch = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const light = useRef<THREE.MeshBasicMaterial>(null);
  const shadow = useRef<THREE.Group>(null);

  useFrame(() => {
    const u = stage.u;
    const visible = u >= T.fracture[0] && u < T.planStones[1] + 0.02;
    if (arch.current) arch.current.visible = visible;
    if (shadow.current) shadow.current.visible = visible && u < T.lieDown[0] + 0.1;
    if (!visible || !arch.current) return;

    const assemble = spanLinear(u, T.assemble);
    const lie = span(u, T.lieDown);
    const clear = span(u, T.clearArch);
    const planClear = span(u, [T.planStones[0], T.planStones[0] + 0.1]);

    // The whole arch pivots back about its foot to lie flat on the floor.
    arch.current.position.copy(ARCH_ORIGIN);
    arch.current.rotation.x = -lie * (Math.PI / 2);

    stones.forEach((stone, i) => {
      const mesh = meshes.current[i];
      if (!mesh) return;
      const flight = flights[i];
      const t = clamp01((assemble - flight.delay) / (1 - 0.38));
      const eased = ease(t);

      // A quadratic path: out past its own place, then back in to it.
      control.copy(flight.start).addScaledVector(flight.outward, 0.9);
      control.y += 0.3;
      tmp.copy(flight.start).multiplyScalar((1 - t) * (1 - t));
      tmp.addScaledVector(control, 2 * (1 - t) * t);
      tmp.addScaledVector(stone.position, t * t);
      mesh.position.copy(tmp);

      settled.setFromAxisAngle(zAxis, stone.rotation);
      mesh.quaternion.copy(flight.spin).slerp(settled, eased);
      mesh.scale.setScalar(lerp(0.16, 1, eased));

      // Resolving from light while it flies; later, gone unless it is one of
      // the four that become the plan.
      const isPlan = PLAN_STONES.includes(i);
      const forming = 1 - clamp01(t / 0.55);
      const leaving = isPlan ? planClear : clear;
      materials[i].dissolve.value = Math.max(forming, leaving);
      mesh.visible = materials[i].dissolve.value < 0.999;
    });

    // Publish where the plan stones lie, for the consultation stones to rise from.
    arch.current.updateMatrixWorld();
    PLAN_STONES.forEach((index, k) => {
      const mesh = meshes.current[index];
      if (mesh) mesh.getWorldPosition(stage.planFrom[k]);
    });

    // Sunlight through the door while the arch stands.
    if (light.current) {
      const built = span(u, [T.assemble[0] + 0.12, T.assemble[1]]);
      light.current.opacity = 0.5 * built * (1 - span(u, [T.lieDown[0], T.lieDown[0] + 0.12]));
    }
  }, ORDER.arch);

  return (
    <group>
      <group ref={arch} visible={false}>
        {stones.map((stone, i) => (
          <mesh
            key={i}
            ref={(el) => {
              meshes.current[i] = el;
            }}
            geometry={stone.geometry}
            material={materials[i]}
          />
        ))}
        <mesh position={[0, ARCH.pillarHeight * 0.62, -0.04]}>
          <planeGeometry args={[ARCH.inner * 1.9, ARCH_HEIGHT * 0.86]} />
          <meshBasicMaterial ref={light} color={goldLight} map={sunlight} transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>

      <group ref={shadow} visible={false}>
        <ContactShadows
          position={[ARCH_ORIGIN.x, FLOOR_Y + 0.001, ARCH_ORIGIN.z]}
          scale={2.6}
          far={1.2}
          blur={2.6}
          opacity={0.28}
          resolution={quality.shadowResolution / 2}
          color="#4A3B2C"
        />
      </group>
    </group>
  );
}
