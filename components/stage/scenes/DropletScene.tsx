'use client';

import { ContactShadows } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js';
import { annotations } from '@/lib/scene/annotations';
import { goldLight, pearl, serum as serumColour, clay, gold } from '@/lib/scene/palette';
import { ORDER, clamp01, ease, lerp, span, spanLinear, stage } from '@/lib/scene/stage';
import { DROP_X, FLOOR_Y, MERGED_CENTRE } from '@/lib/scene/layout';
import { DROPLETS, T } from '@/lib/scene/timeline';
import type { Quality } from '../quality';
import { REST_TIP } from './BottleScene';

/** Radius of each concern droplet. */
const R = 0.105;
/** The drop at the moment it lands, and the single drop they merge back into. */
const LANDING_R = 0.14;
const MERGED_R = 0.24;
const LANDING = new THREE.Vector3(DROP_X, FLOOR_Y + LANDING_R, 0);
const LIQUID_OPACITY = 0.66;

/** Where droplet `i` rests: a shallow arc on a desktop screen, two rows of three on a phone. */
export function dropletHome(i: number, mobile: boolean, target = new THREE.Vector3()) {
  if (mobile) {
    const column = (i % 3) - 1;
    const row = Math.floor(i / 3);
    return target.set(DROP_X + column * 0.44, FLOOR_Y + R * 0.88, row * 0.55 - 0.3);
  }
  const k = (i - (DROPLETS - 1) / 2) / ((DROPLETS - 1) / 2);
  return target.set(DROP_X + k * 0.6, FLOOR_Y + R * 0.88, -0.5 + 0.5 * k * k);
}

/**
 * The drop, from the moment it swells at the pipette until it lands. The fall
 * accelerates, the drop stretches a little on the way down, and it grows as
 * the camera closes in on it (a liberty that reads as the camera moving).
 */
export function dropAt(u: number, tip: THREE.Vector3, out: { position: THREE.Vector3; radius: number; stretch: number }) {
  const swell = span(u, T.swell);
  const fall = spanLinear(u, T.fall);
  const hanging = 0.045 * swell;
  if (fall <= 0) {
    out.radius = hanging;
    out.stretch = 1 + 0.25 * swell;
    out.position.set(tip.x, tip.y - hanging * 1.15, tip.z);
    return out;
  }
  // The drop lets go from wherever the tip was, then falls from the tip's rest
  // position, so the bottle can rise away without dragging the drop with it.
  start.lerpVectors(tip, REST_TIP, clamp01(fall / 0.15));
  const g = fall * fall;
  out.radius = lerp(0.045, LANDING_R, ease(fall));
  out.stretch = 1 + 0.18 * Math.sin(Math.PI * fall);
  out.position.set(lerp(start.x, LANDING.x, fall), lerp(start.y - 0.05, LANDING.y, g), lerp(start.z, LANDING.z, fall));
  return out;
}

/* ------------------------------------------------------------------------- */

const start = new THREE.Vector3();
const vec = new THREE.Vector3();
const home = new THREE.Vector3();
const drop = { position: new THREE.Vector3(), radius: 0, stretch: 1 };

/** Seeded, so the flecks sit in the same place on every load. */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function DropletScene({ quality }: { quality: Quality }) {
  const { camera, size } = useThree();

  const liquid = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: serumColour,
        roughness: 0.03,
        clearcoat: 1,
        clearcoatRoughness: 0.03,
        transparent: true,
        opacity: LIQUID_OPACITY,
        iridescence: 0.45,
        iridescenceIOR: 1.3,
        envMapIntensity: 1.8,
      }),
    []
  );

  // The metaballs: one field that the drop splits into six in, and that the
  // six flow back together in. Only updated while one of those is happening.
  const field = useMemo(() => {
    const cubes = new MarchingCubes(quality.mobile ? 52 : 72, liquid, false, false, 60000);
    cubes.position.set(DROP_X, FLOOR_Y + 0.45, -0.16);
    cubes.scale.setScalar(1.15);
    cubes.frustumCulled = false;
    return cubes;
  }, [liquid, quality.mobile]);

  const sphere = useMemo(() => new THREE.SphereGeometry(1, 64, 48), []);
  const ring = useMemo(() => new THREE.TorusGeometry(1, 0.004, 8, 160), []);

  useEffect(
    () => () => {
      liquid.dispose();
      sphere.dispose();
      ring.dispose();
      field.geometry.dispose();
    },
    [liquid, sphere, ring, field]
  );

  const falling = useRef<THREE.Mesh>(null);
  const droplets = useRef<(THREE.Group | null)[]>([]);
  const glows = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const splash = useRef<THREE.Mesh>(null);
  const splashMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const shadows = useRef<THREE.Group>(null);

  useFrame(() => {
    const u = stage.u;
    const mobile = quality.mobile;

    // --- The falling drop -------------------------------------------------
    const dropOn = u >= T.swell[0] && u < T.land[0];
    if (falling.current) {
      falling.current.visible = dropOn;
      if (dropOn) {
        dropAt(u, stage.tip, drop);
        falling.current.position.copy(drop.position);
        falling.current.scale.set(drop.radius / Math.sqrt(drop.stretch), drop.radius * drop.stretch, drop.radius / Math.sqrt(drop.stretch));
      }
    }

    // --- Splash ring on landing -------------------------------------------
    const splashT = spanLinear(u, [T.land[0], T.land[0] + 0.2]);
    if (splash.current && splashMaterial.current) {
      splash.current.visible = splashT > 0 && splashT < 1;
      splash.current.position.set(LANDING.x, FLOOR_Y + 0.002, LANDING.z);
      splash.current.scale.setScalar(lerp(0.1, 0.6, ease(splashT)));
      splashMaterial.current.opacity = (1 - splashT) * 0.45;
    }

    // --- Metaballs: land → split, and merge --------------------------------
    const splitting = u >= T.land[0] && u < T.split[1];
    const merging = u >= T.merge[0] && u < T.merge[1];
    field.visible = splitting || merging;
    // As the six finish flowing together, the crystal scene's drop forms
    // inside them and the liquid thins away around it.
    liquid.opacity = merging ? LIQUID_OPACITY * (1 - clamp01((spanLinear(u, T.merge) - 0.7) / 0.3)) : LIQUID_OPACITY;
    if (field.visible) {
      const iso = field.isolation;
      const subtract = 12;
      const S = field.scale.x;
      const strengthFor = (radius: number, share = 1) => ((radius / (2 * S)) ** 2 * (iso + subtract)) / share;
      field.reset();

      for (let i = 0; i < DROPLETS; i++) {
        let strength: number;
        if (splitting) {
          const t = span(u, T.split);
          dropletHome(i, mobile, home);
          vec.lerpVectors(LANDING, home, t);
          // Squashed a little as it lands, before the six pull apart.
          vec.y -= (1 - t) * 0.05 * span(u, T.land);
          strength = lerp(strengthFor(LANDING_R, DROPLETS), strengthFor(R), t);
        } else {
          const k = (i - (DROPLETS - 1) / 2) / ((DROPLETS - 1) / 2);
          const lag = Math.abs(k) * 0.25;
          const t = ease(clamp01((spanLinear(u, T.merge) - lag * 0.4) / (1 - lag * 0.4)));
          dropletHome(i, mobile, home);
          vec.lerpVectors(home, MERGED_CENTRE, t);
          // Each rises on its own arc: up out of the line, then in.
          const arc = Math.sin(Math.PI * t);
          vec.y += arc * (0.18 + 0.12 * Math.cos(i * 2.1));
          vec.z += arc * 0.16 * Math.sin(i * 2.1);
          strength = lerp(strengthFor(R), strengthFor(MERGED_R, DROPLETS), t);
        }
        field.addBall(
          0.5 + (vec.x - field.position.x) / (2 * S),
          0.5 + (vec.y - field.position.y) / (2 * S),
          0.5 + (vec.z - field.position.z) / (2 * S),
          strength,
          subtract
        );
      }
      field.update();
    }

    // --- The six resting droplets -----------------------------------------
    const resting = u >= T.split[1] && u < T.merge[0];
    const focus = stage.focusChapter === 'concerns' ? stage.focus : u < 2.5 ? -1 : DROPLETS - 1;
    const labelsOn = span(u, [T.split[1] - 0.04, T.split[1] + 0.06]) * (1 - span(u, [T.merge[0] - 0.06, T.merge[0]]));

    for (let i = 0; i < DROPLETS; i++) {
      const group = droplets.current[i];
      if (!group) continue;
      group.visible = resting;

      // How much this droplet is the one being read about, 0 → 1.
      const weight = focus < -0.5 ? 0 : Math.exp(-((focus - i) ** 2) / 0.18);
      const bob = stage.reducedMotion ? 0 : Math.sin(stage.time * 0.8 + i * 1.3) * 0.008;

      dropletHome(i, mobile, group.position);
      group.position.y += 0.16 * weight + bob;
      group.scale.setScalar(1 + 0.12 * weight);
      group.rotation.y = stage.time * 0.15 + i;

      const glow = glows.current[i];
      if (glow) glow.emissiveIntensity = 0.25 + 1.4 * weight;

      // The group's label, held above its droplet.
      const label = annotations.droplets[i];
      if (label) {
        const opacity = resting || labelsOn > 0 ? labelsOn * (0.45 + 0.55 * weight) : 0;
        label.style.opacity = opacity.toFixed(3);
        if (opacity > 0) {
          dropletHome(i, mobile, vec);
          vec.y += 0.16 * weight + R * 1.25;
          vec.project(camera);
          const x = ((vec.x + 1) / 2) * size.width;
          const y = ((1 - vec.y) / 2) * size.height;
          label.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        }
      }
    }

    if (shadows.current) shadows.current.visible = u >= T.land[0] - 0.05 && u < 3.2;
  }, ORDER.droplets);

  return (
    <group>
      <mesh ref={falling} geometry={sphere} material={liquid} visible={false} />

      <mesh ref={splash} geometry={ring} rotation-x={-Math.PI / 2} visible={false}>
        <meshBasicMaterial ref={splashMaterial} color={gold} transparent depthWrite={false} />
      </mesh>

      <primitive object={field} />

      {Array.from({ length: DROPLETS }, (_, i) => (
        <group key={i} ref={(el: THREE.Group | null) => { droplets.current[i] = el; }} visible={false}>
          <mesh geometry={sphere} material={liquid} scale={[R, R * 0.88, R]} renderOrder={2} />
          <Interior
            index={i}
            sphere={sphere}
            glowRef={(material) => {
              glows.current[i] = material;
            }}
          />
        </group>
      ))}

      <group ref={shadows}>
        <ContactShadows
          position={[DROP_X, FLOOR_Y + 0.001, -0.16]}
          scale={3.4}
          far={0.8}
          blur={2.4}
          opacity={0.3}
          resolution={quality.shadowResolution / 2}
          color="#4A3B2C"
        />
      </group>
    </group>
  );
}

/**
 * What sits inside each droplet, one per concern group, in the order of
 * content/concerns.ts: skin, pigmentation, laser, skin tightening, body,
 * wellness. Each carries a warm glow that brightens when its group is read.
 */
function Interior({
  index,
  sphere,
  glowRef,
}: {
  index: number;
  sphere: THREE.SphereGeometry;
  glowRef: (material: THREE.MeshStandardMaterial | null) => void;
}) {
  const flecks = useMemo(() => {
    const random = seeded(4200 + index);
    return Array.from({ length: 16 }, () => {
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      const r = Math.cbrt(random()) * R * 0.62;
      return [r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi) * 0.8, r * Math.sin(phi) * Math.sin(theta)] as const;
    });
  }, [index]);

  const glowMaterial = (colour: string) => (
    <meshStandardMaterial ref={glowRef} color={colour} emissive={colour} emissiveIntensity={0.25} roughness={0.4} />
  );

  switch (index) {
    // Skin: a clear pearl core.
    case 0:
      return <mesh geometry={sphere} scale={R * 0.42}>{glowMaterial(pearl)}</mesh>;
    // Pigmentation: fine gold flecks held in the liquid.
    case 1:
      return (
        <group>
          {flecks.map((position, i) => (
            <mesh key={i} geometry={sphere} position={position} scale={0.0085}>
              {i === 0 ? glowMaterial(gold) : <meshStandardMaterial color={gold} metalness={0.8} roughness={0.3} />}
            </mesh>
          ))}
        </group>
      );
    // Laser: a single fine line of warm light through the drop.
    case 2:
      return (
        <mesh rotation={[0.5, 0, 0.9]}>
          <cylinderGeometry args={[0.0035, 0.0035, R * 1.5, 8]} />
          {glowMaterial('#E7826B')}
        </mesh>
      );
    // Skin tightening: two taut concentric rings.
    case 3:
      return (
        <group rotation-x={Math.PI / 2}>
          <mesh>
            <torusGeometry args={[R * 0.55, 0.0035, 8, 64]} />
            {glowMaterial(goldLight)}
          </mesh>
          <mesh>
            <torusGeometry args={[R * 0.32, 0.0035, 8, 48]} />
            <meshStandardMaterial color={goldLight} metalness={0.6} roughness={0.3} />
          </mesh>
        </group>
      );
    // Body: a softer drop held within the drop.
    case 4:
      return <mesh geometry={sphere} scale={[R * 0.55, R * 0.45, R * 0.55]}>{glowMaterial(clay)}</mesh>;
    // Wellness: a warm core of light.
    default:
      return <mesh geometry={sphere} scale={R * 0.3}>{glowMaterial(goldLight)}</mesh>;
  }
}
