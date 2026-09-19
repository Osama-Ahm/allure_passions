'use client';

import { ContactShadows } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { ARCH, ARCH_HEIGHT, PLAN_STONES, createArchStones } from '@/lib/scene/arch';
import { withDissolve } from '@/lib/scene/dissolve';
import { createGlowMaterial, setGlow } from '@/lib/scene/glow';
import { travertine } from '@/lib/scene/palette';
import { ORDER, clamp01, ease, lerp, span, spanLinear, stage } from '@/lib/scene/stage';
import { ARCH_ORIGIN, FLOOR_Y, MERGED_CENTRE } from '@/lib/scene/layout';
import { T } from '@/lib/scene/timeline';
import { useShadowGate } from '@/lib/scene/useShadowGate';
import { createMarbleTexture } from '@/lib/proceduralTextures';
import { media } from '@/content/media';
import type { Quality } from '../quality';

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

/** How far the doorway's picture runs into the stones round the opening, so no edge of it shows. */
const DOOR_OVERLAP = 0.012;
const DOOR_RADIUS = ARCH.inner + DOOR_OVERLAP;
/**
 * The picture stands a little way back in the opening, so from the camera,
 * which looks down slightly, its foot would show above the pillars' front
 * edges. It runs this far below the floor to meet them.
 */
const DOOR_SILL = 0.04;
const DOOR_HEIGHT = DOOR_SILL + ARCH.pillarHeight + DOOR_RADIUS;

/**
 * The treatment room seen through the doorway: the photograph drawn into the
 * shape of the opening (a rectangle under a semicircle), so it never shows
 * outside the stones. The canvas exists from the first frame, filled with warm
 * light, and the photograph is drawn into it once it has loaded, so the
 * material never recompiles.
 */
function createDoorwayView(src: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = Math.round((768 * DOOR_HEIGHT) / (2 * DOOR_RADIUS));
  const ctx = canvas.getContext('2d')!;
  const { width, height } = canvas;
  const springing = height - (height * (DOOR_SILL + ARCH.pillarHeight)) / DOOR_HEIGHT;

  const opening = () => {
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, springing);
    ctx.arc(width / 2, springing, width / 2, Math.PI, 0);
    ctx.lineTo(width, height);
    ctx.closePath();
  };

  const glow = ctx.createLinearGradient(0, height, 0, 0);
  glow.addColorStop(0, '#F3DDB4');
  glow.addColorStop(1, '#F9F1E4');
  opening();
  ctx.fillStyle = glow;
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  const image = new Image();
  image.onload = () => {
    // Cover the opening, as object-fit: cover would.
    const scale = Math.max(width / image.width, height / image.height);
    const w = image.width * scale;
    const h = image.height * scale;
    ctx.save();
    opening();
    ctx.clip();
    ctx.drawImage(image, (width - w) / 2, (height - h) / 2, w, h);
    // A little shade just inside the stones, so the room reads as set back
    // behind the door rather than printed on it.
    const shade = ctx.createLinearGradient(0, 0, width, 0);
    shade.addColorStop(0, 'rgba(74, 59, 44, 0.28)');
    shade.addColorStop(0.12, 'rgba(74, 59, 44, 0)');
    shade.addColorStop(0.88, 'rgba(74, 59, 44, 0)');
    shade.addColorStop(1, 'rgba(74, 59, 44, 0.28)');
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
    texture.needsUpdate = true;
  };
  image.src = src;

  return texture;
}

/**
 * Chapters 5–6 and 11 · Clinic, Consultation and Visit. The crystal breaks at dawn and its
 * pieces fly out and build the clinic's archway, stone by stone, foundations
 * first and keystone last, resolving from light as they go. Through the
 * doorway, a treatment room in morning light. Then the arch lies down; the
 * stones that are not part of the plan dissolve, and four of them become the
 * consultation plan (TokenScene).
 *
 * At the end, on night, the arch is drawn again from light where the jar and
 * bottle dissolved, stone by stone from the ground up, and its doorway is lit
 * warm: the clinic's door, open.
 */
export function ArchScene({ quality }: { quality: Quality }) {
  const size = useThree((state) => state.size);
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

  // The lit doorway at night: a soft warm glow, brightest low in the opening.
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

  const doorGlow = useMemo(() => createGlowMaterial('#F6C27A', 'disc'), []);
  const doorway = useMemo(() => createDoorwayView(media.whyClinic.src), []);

  useEffect(
    () => () => {
      stones.forEach((stone) => stone.geometry.dispose());
      materials.forEach((material) => material.dispose());
      map.dispose();
      sunlight.dispose();
      doorGlow.dispose();
      doorway.dispose();
    },
    [stones, materials, map, sunlight, doorGlow, doorway]
  );

  const arch = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const light = useRef<THREE.MeshBasicMaterial>(null);
  const room = useRef<THREE.Mesh>(null);
  const roomMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const shadow = useRef<THREE.Group>(null);
  const glow = useRef<THREE.Mesh>(null);
  const [shadowLive, setShadowLive] = useShadowGate();

  useFrame(() => {
    const u = stage.u;
    const atNight = u >= T.nightArch[0];
    const visible = (u >= T.fracture[0] && u < T.planStones[1] + 0.02) || atNight;
    if (arch.current) arch.current.visible = visible;
    const grounded = visible && !atNight && u < T.lieDown[0] + 0.1;
    if (shadow.current) shadow.current.visible = grounded;
    setShadowLive(grounded);
    if (glow.current) glow.current.visible = atNight;
    if (room.current) room.current.visible = visible && !atNight;
    if (!visible || !arch.current) return;

    if (atNight) {
      const night = spanLinear(u, T.nightArch);
      arch.current.position.copy(ARCH_ORIGIN);
      arch.current.rotation.x = 0;
      stones.forEach((stone, i) => {
        const mesh = meshes.current[i];
        if (!mesh) return;
        mesh.position.copy(stone.position);
        mesh.quaternion.setFromAxisAngle(zAxis, stone.rotation);
        mesh.scale.setScalar(1);
        const t = clamp01((night - flights[i].delay) / (1 - 0.38));
        materials[i].dissolve.value = 1 - t;
        mesh.visible = t > 0.001;
      });
      // On a phone the Visit copy scrolls over the door, so it is lit softly.
      const lit = span(u, [T.nightArch[0] + 0.12, T.nightArch[1] + 0.05]) * (stage.mobile ? 0.35 : 1);
      if (light.current) light.current.opacity = 0.92 * lit;
      setGlow(doorGlow, 0.7 * lit);
      return;
    }

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

    // The room through the door while the arch stands. Its own morning light
    // is the daylight here; the door's glow is kept for the night. On a phone
    // or any upright screen the arch fills the width and the copy sits over
    // the door, so the room is shown softly there.
    const standing = span(u, [T.assemble[0] + 0.12, T.assemble[1]]) * (1 - span(u, [T.lieDown[0], T.lieDown[0] + 0.12]));
    const upright = stage.mobile || size.width < size.height;
    if (roomMaterial.current) roomMaterial.current.opacity = standing * (upright ? 0.4 : 1);
    if (light.current) light.current.opacity = 0;
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
        {/* The treatment room, set back in the opening, inside the stones' depth. */}
        <mesh ref={room} position={[0, DOOR_HEIGHT / 2 - DOOR_SILL, -0.06]} renderOrder={1} visible={false}>
          <planeGeometry args={[2 * DOOR_RADIUS, DOOR_HEIGHT]} />
          <meshBasicMaterial ref={roomMaterial} map={doorway} transparent opacity={0} toneMapped={false} />
        </mesh>
        <mesh position={[0, ARCH.pillarHeight * 0.62, -0.04]} renderOrder={2}>
          <planeGeometry args={[ARCH.inner * 1.9, ARCH_HEIGHT * 0.86]} />
          <meshBasicMaterial ref={light} color="#F2C98A" map={sunlight} transparent opacity={0} depthWrite={false} />
        </mesh>
        {/* At night, the door's light spilling onto the dark around it. */}
        <mesh ref={glow} position={[0, ARCH.pillarHeight * 0.55, 0.02]} scale={[1.9, 2.4, 1]} visible={false} renderOrder={4}>
          <planeGeometry args={[1, 1]} />
          <primitive object={doorGlow} attach="material" />
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
          frames={shadowLive ? Infinity : 0}
        />
      </group>
    </group>
  );
}
