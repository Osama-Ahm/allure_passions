'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { annotations, placeLabel } from '@/lib/scene/annotations';
import { withDissolve } from '@/lib/scene/dissolve';
import { DISC, PEBBLE, createMorphLathe, lerpShape, type LatheShape } from '@/lib/scene/morphLathe';
import { gold, travertine } from '@/lib/scene/palette';
import { ORDER, clamp01, lerp, span, spanLinear, stage } from '@/lib/scene/stage';
import { T } from '@/lib/scene/timeline';
import { PLAN_CENTRE } from './ArchScene';

/** The consultation circle's radius. */
const CIRCLE_R = 0.5;
const GAP = 0.012;

/**
 * The four roles a disc can play in a programme, bottom of the stack to top,
 * and the programmes (content/programmes.ts, in order) as which roles they
 * combine: Contour Synergy is Emsculpt Neo alone; Luxe adds Emerald Laser;
 * Advanced adds mesotherapy; Cosmelan is its own protocol.
 */
const ROLES = [
  { colour: gold, metalness: 1, roughness: 0.3 },
  { colour: '#9CB6A7', metalness: 0.15, roughness: 0.25 },
  { colour: '#EDE6DA', metalness: 0, roughness: 0.5 },
  { colour: '#CBA595', metalness: 0.05, roughness: 0.42 },
];
const PROGRAMMES = [
  [1, 0, 0, 0],
  [1, 1, 0, 0],
  [1, 1, 1, 0],
  [0, 0, 0, 1],
];

// A warmer stone than the arch's, so the plan reads against the cream page.
const stone = new THREE.Color('#E2D5C1');
const roleColours = ROLES.map((role) => new THREE.Color(role.colour));
const target = new THREE.Vector3();
const from = new THREE.Vector3();
const shape: LatheShape = { a: 0, b: 0, p: 0 };

/** Where plan stone `k` sits: 01 at the top of the circle as seen from above, then clockwise. */
function planSpot(k: number, out: THREE.Vector3) {
  const angle = (k * Math.PI) / 2;
  return out.set(PLAN_CENTRE.x + Math.sin(angle) * CIRCLE_R, PLAN_CENTRE.y, PLAN_CENTRE.z - Math.cos(angle) * CIRCLE_R);
}

/**
 * Chapters 6–7 · Consultation and Programmes. Four of the arch's stones become
 * the plan: soft stones on a gold circle that draws itself, lighting in turn
 * as the four steps are read. Then they round into discs and stack, and each
 * programme shows its own stack: the technologies it combines, layer by layer.
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
    },
    [tokens, materials, circle]
  );

  const group = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const ring = useRef<THREE.Mesh>(null);
  const ringMaterial = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    const u = stage.u;
    const visible = u >= T.planStones[0] && u < 7.05;
    if (group.current) group.current.visible = visible;
    if (!visible) {
      annotations.plan.forEach((label) => label && (label.style.opacity = '0'));
      annotations.layers.forEach((label) => label && (label.style.opacity = '0'));
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

    // --- Which step, and which programme ----------------------------------
    const step = spanLinear(u, T.steps) * 3;
    const planLabels = span(u, [T.circle[0], T.circle[1]]) * (1 - span(u, [T.toDiscs[0] - 0.1, T.toDiscs[0]]));

    const focus = stage.focusChapter === 'programmes' ? stage.focus : u < 6.5 ? 0 : 3;
    const programme = Math.min(3, Math.max(0, focus));
    const roleWeight = [0, 0, 0, 0];
    PROGRAMMES.forEach((roles, p) => {
      const w = clamp01(1 - Math.abs(programme - p) * 1.4);
      roles.forEach((member, r) => (roleWeight[r] += member * w));
    });
    // Until they have gathered, all four stay; then the stack is the programme's.
    const composing = span(u, [T.toStack[1] - 0.06, T.toStack[1] + 0.08]);
    const shown = roleWeight.map((w) => lerp(1, Math.min(1, w), composing));

    const toDiscs = span(u, T.toDiscs);
    const toStack = span(u, T.toStack);
    const rise = span(u, T.planStones);
    const layerLabels = span(u, [T.toStack[1], T.toStack[1] + 0.1]);

    let stackHeight = 0;
    tokens.forEach((token, k) => {
      const mesh = meshes.current[k];
      if (!mesh) return;
      const material = materials[k];

      // Shape: a soft stone, rounding into a disc.
      token.setShape(lerpShape(PEBBLE, DISC, toDiscs, shape));

      // Place: up from where the arch lay, onto the circle, then into the stack.
      planSpot(k, target);
      from.copy(stage.planFrom[k]);
      from.y = PLAN_CENTRE.y;
      mesh.position.lerpVectors(from, target, rise);
      const lit = clamp01(1 - Math.abs(step - k) * 1.3) * (1 - toDiscs);
      mesh.position.y += 0.05 * lit;

      const inStack = k === 3 ? 0 : stackHeight;
      mesh.position.lerp(target.set(PLAN_CENTRE.x, PLAN_CENTRE.y + inStack, PLAN_CENTRE.z), toStack);
      if (k < 3) stackHeight += shown[k] * (2 * shape.b + GAP);
      mesh.rotation.y = stage.time * 0.1 + k;

      // Surface: travertine, taking on its role's material as it becomes a disc.
      const role = ROLES[k];
      material.color.copy(stone).lerp(roleColours[k], toDiscs);
      material.metalness = lerp(0, role.metalness, toDiscs);
      material.roughness = lerp(0.7, role.roughness, toDiscs);
      material.emissiveIntensity = 0.55 * lit;

      // Present: resolving as it rises from the arch; dissolving if the
      // programme being read does not use it.
      const forming = 1 - span(u, [T.planStones[0], T.planStones[0] + 0.12]);
      material.dissolve.value = Math.max(forming, 1 - shown[k]);
      mesh.visible = material.dissolve.value < 0.999;

      // Labels: the step beside its stone, then the layer beside its disc.
      placeLabel(
        annotations.plan[k],
        from.copy(PLAN_CENTRE).addScaledVector(target.set(Math.sin((k * Math.PI) / 2), 0, -Math.cos((k * Math.PI) / 2)), k % 2 ? 1 : 0.74),
        camera,
        size,
        planLabels * (0.5 + 0.5 * clamp01(1 - Math.abs(step - k) * 1.3))
      );
      placeLabel(
        annotations.layers[k],
        from.copy(mesh.position).add(target.set(shape.a + 0.05, shape.b, 0)),
        camera,
        size,
        layerLabels * shown[k]
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
        />
      ))}
      <mesh ref={ring} geometry={circle} visible={false}>
        <meshBasicMaterial ref={ringMaterial} color={gold} transparent />
      </mesh>
    </group>
  );
}
