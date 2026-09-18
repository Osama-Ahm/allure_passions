import * as THREE from 'three';

/**
 * Where everything in the story lives, in world units. The bottle stands at
 * the origin; everything after the drop happens on an invisible floor below
 * it. Kept in one pure module so every scene (and the camera) agree, and so
 * no scene has to import another to know where it is.
 */

/** How far to the side the dropper is carried before the drop falls, clear of the bottle. */
export const DROP_X = 0.5;

/** The invisible surface the droplets, arch, plan and jar all rest on. */
export const FLOOR_Y = -1.9;

/** Where the droplets merge, and the crystal hangs. */
export const MERGED_CENTRE = new THREE.Vector3(DROP_X, FLOOR_Y + 0.75, -0.16);

/** Where the arch stands: on the floor, a little behind where the crystal was. */
export const ARCH_ORIGIN = new THREE.Vector3(DROP_X, FLOOR_Y, -0.3);

/** Where the arch lies once it has gone down: the centre of the consultation plan, and of the stack. */
export const PLAN_CENTRE = new THREE.Vector3(DROP_X, FLOOR_Y, -0.3 - 0.78);

/** Where the medallion hangs, facing the camera. */
export const MEDALLION_CENTRE = new THREE.Vector3(PLAN_CENTRE.x, FLOOR_Y + 0.42, PLAN_CENTRE.z);

/** The cream jar: where it stands, and how tall it is (its lid sits on top). */
export const JAR_BASE = new THREE.Vector3(PLAN_CENTRE.x, FLOOR_Y, PLAN_CENTRE.z);
export const JAR_HEIGHT = 0.2;

/** Where the bottle stands when it comes back, beside the jar. */
export const BESIDE_JAR = new THREE.Vector3(PLAN_CENTRE.x + 0.5, FLOOR_Y, PLAN_CENTRE.z - 0.12);
