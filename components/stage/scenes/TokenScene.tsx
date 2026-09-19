'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { annotations, placeLabel } from '@/lib/scene/annotations';
import { withDissolve } from '@/lib/scene/dissolve';
import { createEngraving } from '@/lib/scene/engraving';
import { DISC, LID, MEDALLION, PEBBLE, createMorphLathe, lerpShape, type LatheShape } from '@/lib/scene/morphLathe';
import { gold, travertine } from '@/lib/scene/palette';
import { ORDER, clamp01, lerp, span, spanLinear, stage } from '@/lib/scene/stage';
import { JAR_BASE, JAR_HEIGHT, MEDALLION_CENTRE, PLAN_CENTRE } from '@/lib/scene/layout';
import { T } from '@/lib/scene/timeline';
import { jarGrowth } from './HomeScene';

/** The consultation circle's radius. */
const CIRCLE_R = 0.5;
const GAP = 0.012;

/**
 * What each stone becomes as a disc: gold (the one that becomes the
 * medallion), sage, cream and rose. The programme stack is one model through
 * the whole chapter, whichever course is being read.
 */
const FINISHES = [
  { colour: gold, metalness: 1, roughness: 0.3 },
  { colour: '#9CB6A7', metalness: 0.15, roughness: 0.25 },
  { colour: '#EDE6DA', metalness: 0, roughness: 0.5 },
  { colour: '#CBA595', metalness: 0.05, roughness: 0.42 },
];
/** Where each disc sits in the stack, from the bottom: gold, rose, sage, cream. */
const LEVEL = [0, 2, 3, 1];

/**
 * How the stack moves as the programmes scroll past: over the chapter it lifts
 * a little, its discs part, and it leans towards you and sways from one side
 * to the other; it is closed and upright at both ends, where it forms and
 * where it presses into the medallion.
 */
const LIFT = 0.025;
const SPREAD = 0.02;
const LEAN = 0.1;
const SWAY = 0.4;

// A warmer stone than the arch's, so the plan reads against the cream page.
const stone = new THREE.Color('#E2D5C1');
const finishColours = FINISHES.map((finish) => new THREE.Color(finish.colour));
const target = new THREE.Vector3();
const from = new THREE.Vector3();
const medallionAt = new THREE.Vector3();
const stackUp = new THREE.Vector3();
const leanAxis = new THREE.Vector3();
const lean = new THREE.Quaternion();
const discLean = new THREE.Quaternion();
const shape: LatheShape = { a: 0, b: 0, p: 0 };

/** Where plan stone `k` sits: 01 at the top of the circle as seen from above, then clockwise. */
function planSpot(k: number, out: THREE.Vector3) {
  const angle = (k * Math.PI) / 2;
  return out.set(PLAN_CENTRE.x + Math.sin(angle) * CIRCLE_R, PLAN_CENTRE.y, PLAN_CENTRE.z - Math.cos(angle) * CIRCLE_R);
}

/**
 * Chapters 6–10 · Consultation, Programmes, Trust, At home. Four of the arch's
 * stones become the plan: soft stones on a gold circle that draws itself,
 * lighting in turn as the four steps are read. Then they round into discs and
 * stack, one stack for the whole programmes chapter, which rises, parts and
 * sways a little as the courses scroll by. For Trust the stack presses into
 * one gold medallion, engraved in black with the monogram, which rises to face
 * you; at home it lies back down and becomes the lid of the cream jar
 * (HomeScene), until the pair dissolve on the way to the Visit chapter.
 */
export function TokenScene() {
  const { camera, size } = useThree();

  const tokens = useMemo(() => Array.from({ length: 4 }, () => createMorphLathe(PEBBLE)), []);
  const materials = useMemo(
    () =>
      tokens.map(() =>
        withDissolve(new THREE.MeshStandardMaterial({ color: travertine, roughness: 0.7, metalness: 0, emissive: gold, emissiveIntensity: 0 }))
      ),
    [tokens]
  );

  // One map drives the face's colour, metal and relief: gold where it is
  // white, and where it is black, the engraving, cut in and filled with black
  // enamel so the name and monogram read from across the room.
  const engraving = useMemo(() => {
    const { texture } = createEngraving();
    const material = withDissolve(
      new THREE.MeshStandardMaterial({
        color: gold,
        map: texture,
        metalness: 1,
        metalnessMap: texture,
        roughness: 0.26,
        bumpMap: texture,
        bumpScale: 1.5,
      })
    );
    return { texture, material, geometry: new THREE.CircleGeometry(1, 96) };
  }, []);

  const circle = useMemo(() => {
    const points = Array.from({ length: 129 }, (_, i) => {
      const angle = (i / 128) * Math.PI * 2;
      return new THREE.Vector3(Math.sin(angle) * CIRCLE_R, 0, -Math.cos(angle) * CIRCLE_R);
    });
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 256, 0.0032, 6, false);
  }, []);

  useEffect(
    () => () => {
      tokens.forEach((token) => token.geometry.dispose());
      materials.forEach((material) => material.dispose());
      circle.dispose();
      engraving.texture.dispose();
      engraving.material.dispose();
      engraving.geometry.dispose();
    },
    [tokens, materials, circle, engraving]
  );

  const group = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const ring = useRef<THREE.Mesh>(null);
  const ringMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const face = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const u = stage.u;
    const visible = u >= T.planStones[0] && u < T.pairOut[1] + 0.02;
    if (group.current) group.current.visible = visible;
    if (!visible) {
      annotations.plan.forEach((label) => label && (label.style.opacity = '0'));
      return;
    }

    // --- The circle, drawn round from step 01 -----------------------------
    const drawn = span(u, T.circle);
    const index = circle.index!.count;
    circle.setDrawRange(0, Math.floor((index * drawn) / 6) * 6);
    if (ring.current && ringMaterial.current) {
      ring.current.position.set(PLAN_CENTRE.x, PLAN_CENTRE.y + 0.002, PLAN_CENTRE.z);
      ringMaterial.current.opacity = 1 - span(u, [T.toDiscs[0], T.toDiscs[0] + 0.12]);
      ring.current.visible = drawn > 0 && ringMaterial.current.opacity > 0;
    }

    // --- Which step ----------------------------------------------------------
    const step = spanLinear(u, T.steps) * 3;
    const planLabels = span(u, [T.circle[0], T.circle[1]]) * (1 - span(u, [T.toDiscs[0] - 0.1, T.toDiscs[0]]));

    const toDiscs = span(u, T.toDiscs);
    const toStack = span(u, T.toStack);
    const rise = span(u, T.planStones);
    // Trust, at home, and away.
    const merge = span(u, T.toMedallion);
    const stand = span(u, T.medallionRise) * (1 - span(u, T.toLid));
    const toLid = span(u, T.toLid);
    const grow = jarGrowth(u);
    const away = span(u, T.pairOut);

    // --- The programme stack, moving with the scroll ------------------------
    // `open` rises from nothing where the stack forms to its fullest halfway
    // through the chapter and back to nothing where it presses into the
    // medallion, easing in and out at both ends; scrolling back plays it in
    // reverse.
    const reading = spanLinear(u, T.programmes);
    const open = Math.sin(Math.PI * reading) ** 2;
    const bob = stage.reducedMotion ? 0 : 0.004 * Math.sin(stage.time * 0.9) * open;
    const discB = lerp(PEBBLE.b, DISC.b, toDiscs);
    const pitch = 2 * discB + GAP + SPREAD * open;
    const sway = SWAY * (2 * reading - 1);
    leanAxis.set(Math.cos(sway), 0, -Math.sin(sway));
    stackUp.set(0, 1, 0).applyQuaternion(lean.setFromAxisAngle(leanAxis, LEAN * open));

    tokens.forEach((token, k) => {
      const mesh = meshes.current[k];
      if (!mesh) return;
      const material = materials[k];

      // Shape: a soft stone, rounding into a disc; the first becomes the
      // medallion, then a lid.
      lerpShape(PEBBLE, DISC, toDiscs, shape);
      if (k === 0) {
        lerpShape(shape, MEDALLION, merge, shape);
        lerpShape(shape, LID, toLid, shape);
      }
      token.setShape(shape);

      // Place: up from where the arch lay, onto the circle, then into the stack.
      planSpot(k, target);
      from.copy(stage.planFrom[k]);
      from.y = PLAN_CENTRE.y;
      mesh.position.lerpVectors(from, target, rise);
      const lit = clamp01(1 - Math.abs(step - k) * 1.3) * (1 - toDiscs);
      mesh.position.y += 0.05 * lit;

      const level = LEVEL[k];
      target.copy(PLAN_CENTRE).addScaledVector(stackUp, level * pitch);
      target.y += LIFT * open + bob;
      mesh.position.lerp(target, toStack);

      mesh.rotation.order = 'YXZ';
      if (k === 0) {
        // Up to face you, then down onto the jar as its lid.
        mesh.position.lerp(MEDALLION_CENTRE, span(u, T.medallionRise));
        mesh.position.lerp(target.set(JAR_BASE.x, JAR_BASE.y + JAR_HEIGHT * grow, JAR_BASE.z), toLid);
        medallionAt.copy(mesh.position);
        // Facing you, it turns slowly so the light runs across the gold.
        const swing = stage.reducedMotion ? 0 : Math.sin(stage.time * 0.35) * 0.45;
        mesh.rotation.set(stand * (Math.PI / 2), lerp(stage.time * 0.1, swing, stand), 0);
      } else {
        // The others press into it.
        mesh.position.lerp(medallionAt, merge);
        mesh.rotation.set(0, stage.time * 0.1 + k, 0);
      }
      // In the stack, each disc leans with it, the upper ones a touch more,
      // so the layers read as parting rather than as one block tipping.
      if (open > 0) mesh.quaternion.premultiply(discLean.setFromAxisAngle(leanAxis, LEAN * open * (0.85 + 0.1 * level)));

      // Surface: travertine, taking on its finish as it becomes a disc.
      const finish = FINISHES[k];
      material.color.copy(stone).lerp(finishColours[k], toDiscs);
      material.metalness = lerp(0, finish.metalness, toDiscs);
      material.roughness = lerp(0.7, finish.roughness, toDiscs);
      material.emissiveIntensity = 0.55 * lit;

      // Present: resolving as it rises from the arch, and pressed into the
      // medallion on the way to Trust.
      const forming = 1 - span(u, [T.planStones[0], T.planStones[0] + 0.12]);
      const pressedIn = k === 0 ? 0 : span(u, [T.toMedallion[0] + 0.08, T.toMedallion[1]]);
      material.dissolve.value = Math.max(forming, pressedIn, away, k === 0 ? stage.away * toLid : 0);
      mesh.visible = material.dissolve.value < 0.999;

      // The medallion's engraved face, on its top, while it is a medallion.
      if (k === 0 && face.current) {
        face.current.position.set(0, 2 * shape.b + 0.0012, 0);
        face.current.scale.setScalar(shape.a * 0.9);
        engraving.material.dissolve.value = Math.max(
          1 - span(u, [T.toMedallion[0] + 0.1, T.toMedallion[1] + 0.06]),
          span(u, [T.toLid[0], T.toLid[0] + 0.1])
        );
        face.current.visible = engraving.material.dissolve.value < 0.999;
      }

      // Label: the step beside its stone.
      placeLabel(
        annotations.plan[k],
        from.copy(PLAN_CENTRE).addScaledVector(target.set(Math.sin((k * Math.PI) / 2), 0, -Math.cos((k * Math.PI) / 2)), k % 2 ? 1 : 0.74),
        camera,
        size,
        planLabels * (0.5 + 0.5 * clamp01(1 - Math.abs(step - k) * 1.3))
      );
    });
  }, ORDER.tokens);

  return (
    <group ref={group} visible={false}>
      {tokens.map((token, k) => (
        <mesh
          key={k}
          ref={(el) => {
            meshes.current[k] = el;
          }}
          geometry={token.geometry}
          material={materials[k]}
        >
          {k === 0 ? (
            <mesh
              ref={face}
              geometry={engraving.geometry}
              material={engraving.material}
              rotation-x={-Math.PI / 2}
              visible={false}
            />
          ) : null}
        </mesh>
      ))}
      <mesh ref={ring} geometry={circle} visible={false}>
        <meshBasicMaterial ref={ringMaterial} color={gold} transparent />
      </mesh>
    </group>
  );
}
