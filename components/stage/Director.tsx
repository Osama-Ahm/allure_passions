'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { techFrame } from '@/lib/story/chapters';
import { story } from '@/lib/story/store';
import { ORDER, damp, lerp, span, spanLinear, stage } from '@/lib/scene/stage';
import { ARCH_ORIGIN, BESIDE_JAR, DROP_X, FLOOR_Y, JAR_BASE, MEDALLION_CENTRE, MERGED_CENTRE, PLAN_CENTRE } from '@/lib/scene/layout';
import { T } from '@/lib/scene/timeline';
import type { Quality } from './quality';
import { BottleScene } from './scenes/BottleScene';
import { ArchScene } from './scenes/ArchScene';
import { DropletScene, dropAt, dropletHome } from './scenes/DropletScene';
import { HomeScene } from './scenes/HomeScene';
import { LensScene } from './scenes/LensScene';
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

/** Between the jar and the bottle, a little above the jar. */
const HOME_TARGET = new THREE.Vector3((JAR_BASE.x + BESIDE_JAR.x) / 2, FLOOR_Y + 0.32, (JAR_BASE.z + BESIDE_JAR.z) / 2);

type ShotName = 'hero' | 'bridge' | 'drop' | 'concerns' | 'lens' | 'arch' | 'plan' | 'stack' | 'medallion' | 'home' | 'rest' | 'night';

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
    // Chapter 4: the merged drop exactly where the photograph's frame is
    // centred (techFrame), so the photograph can open out of its light.
    lens: shot(
      MERGED_CENTRE.x,
      MERGED_CENTRE.y,
      MERGED_CENTRE.z,
      3.4,
      8,
      (techFrame.x - 0.5) * 2,
      (0.5 - techFrame.y) * 2,
      -20
    ),
    // Chapter 5: the archway, square on and centred between the giant words.
    arch: shot(ARCH_ORIGIN.x, FLOOR_Y + 0.78, ARCH_ORIGIN.z, 5.4, 4, 0, 0.02),
    // Chapter 6: straight down on the plan, upper right, clear of the copy.
    plan: shot(PLAN_CENTRE.x, FLOOR_Y, PLAN_CENTRE.z, 6.2, 80, 0.4, 0.14),
    // Chapter 7: close on the programme's stack, on the right.
    stack: shot(PLAN_CENTRE.x, FLOOR_Y + 0.12, PLAN_CENTRE.z, 2.4, 16, 0.5, -0.02),
    // Chapter 8: the medallion facing you in the left third, beside the credentials.
    medallion: shot(MEDALLION_CENTRE.x, MEDALLION_CENTRE.y, MEDALLION_CENTRE.z, 3, 3, -0.52, 0.02),
    // Chapter 9: the jar and the bottle together, on the right.
    home: shot(HOME_TARGET.x, HOME_TARGET.y, HOME_TARGET.z, 2.9, 9, 0.5, -0.04),
    // Chapter 10: the pair small, at rest in the margin below the heading.
    rest: shot(HOME_TARGET.x, HOME_TARGET.y, HOME_TARGET.z, 4.4, 7, -0.6, -0.4),
    // Chapter 11: the archway at night, its door lit: small, in the upper
    // right, beside the contact details and clear of the footer below them.
    night: shot(ARCH_ORIGIN.x, FLOOR_Y + 0.78, ARCH_ORIGIN.z, 9.2, 3, 0.52, 0.16),
  },
  mobile: {
    hero: shot(0, 0.48, 0, 7.4, 11, 0, 0.47),
    bridge: shot(0.25, 0.84, 0, 7.2, 11, 0, 0.04),
    drop: shot(DROP_X, 0.62, 0, 5.6, 12, 0, 0.1),
    concerns: shot(DROP_X, FLOOR_Y + 0.2, -0.05, 7.4, 22, 0, 0.62),
    lens: shot(MERGED_CENTRE.x, MERGED_CENTRE.y + 0.1, MERGED_CENTRE.z, 8, 8, 0, 0.6, -20),
    arch: shot(ARCH_ORIGIN.x, FLOOR_Y + 0.78, ARCH_ORIGIN.z, 9, 4, 0, 0.5),
    plan: shot(PLAN_CENTRE.x, FLOOR_Y, PLAN_CENTRE.z, 7, 80, 0, 0.52),
    stack: shot(PLAN_CENTRE.x, FLOOR_Y + 0.12, PLAN_CENTRE.z, 4.2, 16, 0, 0.55),
    medallion: shot(MEDALLION_CENTRE.x, MEDALLION_CENTRE.y, MEDALLION_CENTRE.z, 5.2, 3, 0, 0.62),
    home: shot(HOME_TARGET.x, HOME_TARGET.y, HOME_TARGET.z, 4.8, 9, 0, 0.56),
    rest: shot(HOME_TARGET.x, HOME_TARGET.y, HOME_TARGET.z, 6.4, 7, 0, 0.62),
    night: shot(ARCH_ORIGIN.x, FLOOR_Y + 0.78, ARCH_ORIGIN.z, 12, 3, 0, 0.62),
  },
};

/**
 * With reduced motion the story does not animate with the scroll: each chapter
 * has one composed still (a story position chosen for it), and moving between
 * chapters fades the canvas out, cuts, and fades it back in.
 */
const STILLS = [0, 1.36, 2.5, 3.5, 4.3, 5.3, 6.5, 7.4, 8.5, 9.3, 10.6];
const FADE_SECONDS = 0.22;

const current: Shot = shot(0, 0, 0, 0, 0, 0, 0);
const falling: Shot = shot(0, 0, 0, 0, 0, 0, 0);
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
  const chapterStill = useRef({ shown: -1, pending: -1 });

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
      stage.u = quality.reducedMotion ? STILLS[story.index] ?? story.u : story.u;
      stage.focus = story.focus;
      chapterStill.current.shown = story.index;
      started.current = true;
    }
    if (quality.reducedMotion) {
      const s = chapterStill.current;
      if (story.index !== s.shown && s.pending === -1) s.pending = story.index;
      if (s.pending !== -1) {
        stage.fade = Math.min(1, stage.fade + dt / FADE_SECONDS);
        if (stage.fade >= 1) {
          s.shown = s.pending;
          s.pending = -1;
          stage.u = STILLS[s.shown] ?? story.u;
        }
      } else {
        stage.fade = Math.max(0, stage.fade - dt / FADE_SECONDS);
      }
    } else {
      stage.u = damp(stage.u, story.u, quality.mobile ? 5 : 8, dt);
    }
    stage.focus = damp(stage.focus, story.focus, 6, dt);
    stage.focusChapter = story.focusChapter;
    stage.time = state.clock.elapsedTime;
    stage.away = damp(stage.away, quality.mobile ? story.rx : 0, 6, dt);

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

    blend(current, shots.lens, span(u, T.merge));

    blend(current, shots.arch, span(u, T.toArch));
    blend(current, shots.plan, span(u, T.toPlan));
    blend(current, shots.stack, span(u, T.toStack));
    blend(current, shots.medallion, span(u, T.toTrust));
    blend(current, shots.home, span(u, T.toHome));
    blend(current, shots.rest, span(u, T.toRest));
    blend(current, shots.night, span(u, T.toNight));

    // At night the studio dims, so the lit doorway carries the scene.
    state.scene.environmentIntensity = lerp(1, 0.45, span(u, T.toNight));

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
      <LensScene />
      <ArchScene quality={quality} />
      <TokenScene />
      <HomeScene quality={quality} />
    </>
  );
}
