'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { pipette } from '@/lib/bottle/profile';
import { ORDER, span, stage } from '@/lib/scene/stage';
import { BESIDE_JAR, DROP_X } from '@/lib/scene/layout';
import { T } from '@/lib/scene/timeline';
import { Bottle, PIPETTE_TRAVEL, type BottleRefs } from '../bottle/Bottle';
import { PLINTH_HEIGHT, Plinth } from '../Plinth';
import type { Quality } from '../quality';

/** Where the pipette tip rests once the dropper is lifted and carried aside. */
export const REST_TIP = new THREE.Vector3(DROP_X, PLINTH_HEIGHT + PIPETTE_TRAVEL + pipette.bottom, 0);

/** Turned so the label sits a little off-centre, as a photographer would place it. */
const BASE_TURN = THREE.MathUtils.degToRad(-12);

const aside = new THREE.Vector3();
const yAxis = new THREE.Vector3(0, 1, 0);
const tipLocal = new THREE.Vector3(0, pipette.bottom, 0);

/**
 * Chapters 1–2, and 9–10: the bottle on its plinth. In the hero it floats and follows the
 * pointer. In the bridge it turns, the plinth sinks away, the dropper lifts out
 * and is carried to one side, and the drop (drawn by the droplet scene) forms
 * at its tip. As the camera follows the drop down, the bottle leaves the top of
 * the frame and is hidden.
 */
export function BottleScene({ quality, background }: { quality: Quality; background: THREE.Color }) {
  const rig = useRef<THREE.Group>(null);
  const bottle = useRef<THREE.Group>(null);
  const plinth = useRef<THREE.Group>(null);
  const dropper = useRef<THREE.Group>(null);
  const serum = useRef<THREE.Mesh>(null);
  const glass = useRef<THREE.Material>(null);
  const refs = useMemo<BottleRefs>(() => ({ dropper, serum, glass }), []);

  useFrame(() => {
    const u = stage.u;
    // At home it slides back in beside the jar, and later goes into light with it.
    const atHome = u >= T.bottleBack[0] && u < T.pairOut[1];
    const visible = u < 1.95 || atHome;
    if (rig.current) rig.current.visible = visible;
    // The glass's extra render passes stop the moment it is off screen.
    if (glass.current) glass.current.visible = visible;
    if (!visible || !bottle.current || !dropper.current || !rig.current) return;

    if (atHome) {
      const back = span(u, T.bottleBack);
      const away = span(u, T.pairOut);
      rig.current.position.set(BESIDE_JAR.x + (1 - back) * 1.6, BESIDE_JAR.y, BESIDE_JAR.z);
      rig.current.scale.setScalar(Math.max(0.001, (1 - away) * (1 - stage.away)));
      bottle.current.position.y = 0;
      bottle.current.rotation.set(stage.tiltX * 0.5, BASE_TURN - (1 - back) * 1.4 + stage.time * 0.05, stage.tiltZ * 0.5);
      dropper.current.position.set(0, 0, 0);
      serum.current?.rotation.set(0, 0, 0);
      if (plinth.current) plinth.current.visible = false;
      return;
    }
    rig.current.position.x = 0;
    rig.current.position.z = 0;
    rig.current.scale.setScalar(1);

    const turn = span(u, T.turn);
    const lift = span(u, T.lift);
    const carry = span(u, T.aside);
    const sink = span(u, T.sink);
    const float = stage.reducedMotion ? 0 : Math.sin(stage.time * 0.9) * 0.006;

    const rotationY = BASE_TURN + turn * ((Math.PI * 2) / 3);
    // As the drop falls, the bottle rises away out of the top of the frame.
    rig.current.position.y = span(u, T.bottleOut) * 2.6;
    bottle.current.position.y = PLINTH_HEIGHT + float;
    bottle.current.rotation.set(stage.tiltX, rotationY, stage.tiltZ);

    // The dropper is carried sideways in world space, so the offset is turned
    // back against the bottle's own rotation.
    aside.set(carry * DROP_X, lift * PIPETTE_TRAVEL, 0).applyAxisAngle(yAxis, -rotationY);
    dropper.current.position.copy(aside);

    // The serum lags the tilt a little, so its surface looks level.
    serum.current?.rotation.set(-stage.tiltX * 0.6, 0, -stage.tiltZ * 0.6);

    if (plinth.current) {
      plinth.current.position.y = -sink * 2;
      plinth.current.visible = sink < 0.98;
    }

    // Publish the pipette tip, where the drop forms.
    rig.current.updateMatrixWorld();
    stage.tip.copy(tipLocal);
    dropper.current.localToWorld(stage.tip);
  }, ORDER.bottle);

  return (
    <group ref={rig}>
      <Plinth ref={plinth} shadowResolution={quality.shadowResolution} />
      <group ref={bottle} position-y={PLINTH_HEIGHT}>
        <Bottle refs={refs} quality={quality} background={background} />
      </group>
    </group>
  );
}
