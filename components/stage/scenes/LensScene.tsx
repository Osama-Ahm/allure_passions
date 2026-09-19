'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { createGlowMaterial, setGlow } from '@/lib/scene/glow';
import { serum } from '@/lib/scene/palette';
import { ORDER, clamp01, lerp, span, spanLinear, stage } from '@/lib/scene/stage';
import { MERGED_CENTRE } from '@/lib/scene/layout';
import { T } from '@/lib/scene/timeline';

/** The merged drop's radius: what the six droplets' metaballs add up to. */
const DROP_R = 0.24;

/**
 * Chapter 4 · Technologies. The six concern droplets have flowed back into one
 * drop; here it fills with light and draws in to a point, and the chapter's
 * photograph opens out of that point. The photograph sits in the chapter's back
 * layer, framed exactly behind the drop (techFrame in lib/story/chapters.ts),
 * so the flash blooms over it as it opens.
 *
 * The drop is already this mesh while the droplets finish merging: the
 * metaballs thin away around it (DropletScene), because a smooth sphere reads
 * better this close than their surface does.
 *
 * The photograph's opening (--open on #treatments-frame) is written from here,
 * so it moves on the same smoothed story position as the light. Without the
 * stage it is simply open.
 */
export function LensScene() {
  const camera = useThree((state) => state.camera);
  const sphere = useMemo(() => new THREE.SphereGeometry(1, 64, 48), []);
  const disc = useMemo(() => new THREE.PlaneGeometry(1, 1), []);
  // The droplets' own liquid, able to glow.
  const liquid = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: serum,
        emissive: serum,
        emissiveIntensity: 0,
        roughness: 0.03,
        clearcoat: 1,
        clearcoatRoughness: 0.03,
        transparent: true,
        opacity: 0.66,
        iridescence: 0.45,
        iridescenceIOR: 1.3,
        envMapIntensity: 1.8,
      }),
    []
  );
  const flashMaterial = useMemo(() => createGlowMaterial('#FFF3DC', 'disc'), []);

  const frame = useRef<HTMLElement | null>(null);
  const written = useRef(-1);

  useEffect(() => {
    frame.current = document.getElementById('treatments-frame');
    return () => {
      frame.current?.style.removeProperty('--open');
      sphere.dispose();
      disc.dispose();
      liquid.dispose();
      flashMaterial.dispose();
    };
  }, [sphere, disc, liquid, flashMaterial]);

  const drop = useRef<THREE.Mesh>(null);
  const flash = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const u = stage.u;

    // The photograph: shut until the drop has become light, then opening out
    // of it.
    const open = span(u, T.iris);
    if (frame.current && Math.abs(open - written.current) > 0.0005) {
      frame.current.style.setProperty('--open', open.toFixed(4));
      written.current = open;
    }

    // The drop takes over from the metaballs over the last third of the merge,
    // fills with light, then draws in to a point.
    const appear = clamp01((spanLinear(u, T.merge) - 0.62) / 0.38);
    const glowing = span(u, [T.toLight[0], T.toLight[0] + 0.04]);
    const drawIn = span(u, [T.toLight[0] + 0.03, T.toLight[1]]);
    const dropOn = appear > 0 && drawIn < 1;
    if (drop.current) {
      drop.current.visible = dropOn;
      if (dropOn) {
        const bob = stage.reducedMotion ? 0 : Math.sin(stage.time * 0.7) * 0.015;
        drop.current.position.set(MERGED_CENTRE.x, MERGED_CENTRE.y + bob, MERGED_CENTRE.z);
        drop.current.scale.setScalar(DROP_R * lerp(0.7, 1, appear) * lerp(1, 0.04, drawIn));
        liquid.emissiveIntensity = 1.6 * glowing;
        liquid.opacity = lerp(0.66, 0.95, glowing) * (1 - drawIn * drawIn);
      }
    }

    // The flash as it becomes light, facing the camera: brightest as the drop
    // vanishes, and gone as the photograph finishes opening.
    const flashT = Math.sin(Math.PI * spanLinear(u, [T.toLight[0] + 0.02, T.iris[0] + 0.08]));
    if (flash.current) {
      flash.current.visible = flashT > 0.001;
      if (flash.current.visible) {
        flash.current.position.copy(MERGED_CENTRE);
        flash.current.quaternion.copy(camera.quaternion);
        flash.current.scale.setScalar(0.35 + 1.1 * flashT);
        setGlow(flashMaterial, 1.2 * flashT);
      }
    }
  }, ORDER.lens);

  return (
    <group>
      <mesh ref={drop} geometry={sphere} material={liquid} renderOrder={2} visible={false} />
      <mesh ref={flash} geometry={disc} material={flashMaterial} renderOrder={4} visible={false} />
    </group>
  );
}
