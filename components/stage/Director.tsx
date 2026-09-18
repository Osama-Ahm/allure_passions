'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { story } from '@/lib/story/store';
import { ORDER, damp, lerp, span, spanLinear, stage } from '@/lib/scene/stage';
import { T } from '@/lib/scene/timeline';
import type { Quality } from './quality';
import { BottleScene, DROP_X } from './scenes/BottleScene';
import { ARCH_ORIGIN, ArchScene, PLAN_CENTRE } from './scenes/ArchScene';
import { CrystalScene } from './scenes/CrystalScene';
import { DropletScene, FLOOR_Y, MERGED_CENTRE, dropAt, dropletHome } from './scenes/DropletScene';
import { TokenScene } from './scenes/TokenScene';

/**
 * Conducts the stage. Once a frame, before any scene moves, it smooths the
 * story position and the pointer, then points the camera; each scene then
 * poses its own models from the same smoothed values.
 *
 * The camera is described as a sequence of named shots, blended in order as
 * the story passes each hand-over. Placement uses a lens shift (setViewOffset)
 * rather than moving the models: the camera keeps looking straight at its
 * subject, so nothing is distorted, and where the subject sits on screen is
 * simply a point on the screen ("the right third").
 */

type Shot = {
  target: THREE.Vector3;
  distance: number;
  /** Degrees above the horizon. */
  elevation: number;
  /** Where the target sits on screen, -1 → 1 in each axis. */
  anchorX: number;
  anchorY: number;
  /** Degrees round the target, 0 = from the front. */
  azimuth: number;
};

const shot = (
  x: number,
  y: number,
  z: number,
  distance: number,
  elevation: number,
  anchorX: number,
  anchorY: number,
  azimuth = 0
): Shot => ({
  target: new THREE.Vector3(x, y, z),
  distance,
  elevation,
  anchorX,
  anchorY,
  azimuth,
});

type Layout = 'desktop' | 'mobile';

type ShotName = 'hero' | 'bridge' | 'drop' | 'concerns' | 'crystal' | 'arch' | 'plan' | 'stack';

const SHOTS: Record<Layout, Record<ShotName, Shot>> = {
  desktop: {
    // Chapter 1: the bottle in the right third, beside the headline.
    hero: shot(0, 0.48, 0, 3.7, 11, 0.54, 0),
    // Chapter 2: pulled back and centred, the bottle and its dropper in frame.
    bridge: shot(0.25, 0.84, 0, 4.9, 11, 0, 0.02),
    // Closer on the drop swelling at the pipette.
    drop: shot(DROP_X, 0.62, 0, 3.4, 12, 0, 0.06),
    // Chapter 3: the arc of droplets on the right, beside the concern list.
    concerns: shot(DROP_X, FLOOR_Y + 0.18, -0.12, 4.6, 13, 0.44, -0.04),
    // Chapter 4: the crystal on the right, a little low, energies playing above it.
    crystal: shot(MERGED_CENTRE.x, MERGED_CENTRE.y + 0.1, MERGED_CENTRE.z, 3.1, 8, 0.36, -0.1, -20),
    // Chapter 5: the archway, square on and centred between the giant words.
    arch: shot(ARCH_ORIGIN.x, FLOOR_Y + 0.78, ARCH_ORIGIN.z, 5.4, 4, 0, 0.02),
    // Chapter 6: straight down on the plan, upper right, clear of the copy.
    plan: shot(PLAN_CENTRE.x, FLOOR_Y, PLAN_CENTRE.z, 6.2, 80, 0.4, 0.14),
    // Chapter 7: close on the programme's stack, on the right.
    stack: shot(PLAN_CENTRE.x, FLOOR_Y + 0.12, PLAN_CENTRE.z, 2.4, 16, 0.5, -0.02),
  },
  mobile: {
    hero: shot(0, 0.48, 0, 7.4, 11, 0, 0.47),
    bridge: shot(0.25, 0.84, 0, 7.2, 11, 0, 0.04),
    drop: shot(DROP_X, 0.62, 0, 5.6, 12, 0, 0.1),
    concerns: shot(DROP_X, FLOOR_Y + 0.2, -0.05, 7.4, 22, 0, 0.62),
    crystal: shot(MERGED_CENTRE.x, MERGED_CENTRE.y + 0.1, MERGED_CENTRE.z, 8, 8, 0, 0.6, -20),
    arch: shot(ARCH_ORIGIN.x, FLOOR_Y + 0.78, ARCH_ORIGIN.z, 9, 4, 0, 0.5),
    plan: shot(PLAN_CENTRE.x, FLOOR_Y, PLAN_CENTRE.z, 7, 80, 0, 0.52),
    stack: shot(PLAN_CENTRE.x, FLOOR_Y + 0.12, PLAN_CENTRE.z, 4.2, 16, 0, 0.55),
  },
};

const current: Shot = shot(0, 0, 0, 0, 0, 0, 0);
const falling: Shot = shot(0, 0, 0, 0, 0, 0, 0);
const orbiting: Shot = shot(0, 0, 0, 0, 0, 0, 0);
const drop = { position: new THREE.Vector3(), radius: 0, stretch: 1 };
const focusPoint = new THREE.Vector3();

function blend(into: Shot, to: Shot, t: number) {
  if (t <= 0) return;
  into.target.lerp(to.target, t);
  into.distance = lerp(into.distance, to.distance, t);
  into.elevation = lerp(into.elevation, to.elevation, t);
  into.anchorX = lerp(into.anchorX, to.anchorX, t);
  into.anchorY = lerp(into.anchorY, to.anchorY, t);
  into.azimuth = lerp(into.azimuth, to.azimuth, t);
}

function copy(into: Shot, from: Shot) {
  into.target.copy(from.target);
  into.distance = from.distance;
  into.elevation = from.elevation;
  into.anchorX = from.anchorX;
  into.anchorY = from.anchorY;
  into.azimuth = from.azimuth;
}

export function Director({ quality, background }: { quality: Quality; background: THREE.Color }) {
  const { camera, size } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  const started = useRef(false);

  useEffect(() => {
    stage.mobile = quality.mobile;
    stage.reducedMotion = quality.reducedMotion;
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [quality]);

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.1);

    // The one smoothed value everything is posed from. On the first frame it
    // starts where the page already is, so a restored scroll does not fly in.
    if (!started.current) {
      stage.u = story.u;
      stage.focus = story.focus;
      started.current = true;
    }
    stage.u = damp(stage.u, story.u, quality.mobile ? 5 : 8, dt);
    stage.focus = damp(stage.focus, story.focus, 6, dt);
    stage.focusChapter = story.focusChapter;
    stage.time = state.clock.elapsedTime;

    const still = quality.reducedMotion;
    stage.tiltX = damp(stage.tiltX, still ? 0 : pointer.current.y * 0.05, 2.5, dt);
    stage.tiltZ = damp(stage.tiltZ, still ? 0 : -pointer.current.x * 0.05, 2.5, dt);

    // --- The camera, shot by shot ---------------------------------------------
    const u = stage.u;
    const shots = SHOTS[quality.mobile ? 'mobile' : 'desktop'];

    copy(current, shots.hero);
    blend(current, shots.bridge, span(u, T.toCentre));
    blend(current, shots.drop, span(u, T.swell));

    // Following the drop down: the camera keeps it just below the centre.
    if (u >= T.fall[0]) {
      dropAt(u, stage.tip, drop);
      copy(falling, shots.drop);
      falling.target.set(drop.position.x, drop.position.y + 0.05, drop.position.z);
      falling.distance = lerp(shots.drop.distance, shots.drop.distance * 0.85, spanLinear(u, T.fall));
      falling.elevation = shots.drop.elevation + 4;
      blend(current, falling, span(u, [T.fall[0], T.fall[0] + 0.1]));
    }

    blend(current, shots.concerns, span(u, T.arrive));

    // Among the droplets, the camera leans a little towards the one being read.
    if (stage.focusChapter === 'concerns' && stage.focus > -0.5) {
      dropletHome(Math.round(Math.min(5, Math.max(0, stage.focus))), quality.mobile, focusPoint);
      const lean = 0.1 * (1 - span(u, T.merge));
      current.target.x += (focusPoint.x - DROP_X) * lean;
    }

    // Round the crystal: a few degrees further for each technology read, so
    // the stone never sits still while its energies change.
    copy(orbiting, shots.crystal);
    if (stage.focusChapter === 'treatments') orbiting.azimuth += Math.max(-1, stage.focus) * 9;
    blend(current, orbiting, span(u, T.merge));

    blend(current, shots.arch, span(u, T.toArch));
    blend(current, shots.plan, span(u, T.toPlan));
    blend(current, shots.stack, span(u, T.toStack));

    const elevation = THREE.MathUtils.degToRad(current.elevation);
    const azimuth = THREE.MathUtils.degToRad(current.azimuth);
    camera.position.set(
      current.target.x + Math.cos(elevation) * Math.sin(azimuth) * current.distance,
      current.target.y + Math.sin(elevation) * current.distance,
      current.target.z + Math.cos(elevation) * Math.cos(azimuth) * current.distance
    );
    camera.lookAt(current.target);
    (camera as THREE.PerspectiveCamera).setViewOffset(
      size.width,
      size.height,
      (-current.anchorX * size.width) / 2,
      (current.anchorY * size.height) / 2,
      size.width,
      size.height
    );

    // The glass refracts whatever colour the page is right now.
    const [r, g, b] = story.bg;
    background.setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
  }, ORDER.director);

  return (
    <>
      <BottleScene quality={quality} background={background} />
      <DropletScene quality={quality} />
      <CrystalScene quality={quality} background={background} />
      <ArchScene quality={quality} />
      <TokenScene />
    </>
  );
}
