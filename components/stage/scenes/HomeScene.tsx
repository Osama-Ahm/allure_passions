'use client';

import { ContactShadows } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { withDissolve } from '@/lib/scene/dissolve';
import { createGlowMaterial, setGlow } from '@/lib/scene/glow';
import { BESIDE_JAR, FLOOR_Y, JAR_BASE, JAR_HEIGHT } from '@/lib/scene/layout';
import { ORDER, span, spanLinear, stage } from '@/lib/scene/stage';
import { T } from '@/lib/scene/timeline';
import { useShadowGate } from '@/lib/scene/useShadowGate';
import type { Quality } from '../quality';

/** The jar's body, turned like the bottle: a soft foot, straight walls, a short neck. */
const JAR_PROFILE: [number, number][] = [
  [0, 0],
  [0.17, 0],
  [0.195, 0.008],
  [0.205, 0.028],
  [0.206, 0.16],
  [0.2, 0.182],
  [0.184, 0.194],
  [0.176, 0.2],
  [0.172, JAR_HEIGHT],
  [0, JAR_HEIGHT],
];

/** Grows from its foot, beneath the lid, as the medallion comes down onto it. */
export const jarGrowth = (u: number) => span(u, T.jarGrow);

/**
 * Chapters 9–11 · At home and FAQ. A cream jar grows up beneath the medallion,
 * which becomes its lid (TokenScene), and the bottle returns beside it
 * (BottleScene). The two rest together through the questions, then dissolve
 * into light on the way to the Visit chapter.
 */
export function HomeScene({ quality }: { quality: Quality }) {
  const { camera } = useThree();
  const geometry = useMemo(
    () => new THREE.LatheGeometry(JAR_PROFILE.map(([r, y]) => new THREE.Vector2(r, y)), 96),
    []
  );
  const material = useMemo(
    () =>
      withDissolve(
        new THREE.MeshPhysicalMaterial({
          color: '#F4EFE7',
          roughness: 0.34,
          clearcoat: 1,
          clearcoatRoughness: 0.18,
          sheen: 0.4,
          sheenColor: '#FFFFFF',
        })
      ),
    []
  );
  const flashMaterial = useMemo(() => createGlowMaterial('#FFE6BE', 'disc'), []);
  const disc = useMemo(() => new THREE.PlaneGeometry(1, 1), []);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
      flashMaterial.dispose();
      disc.dispose();
    },
    [geometry, material, flashMaterial, disc]
  );

  const group = useRef<THREE.Group>(null);
  const jar = useRef<THREE.Mesh>(null);
  const flash = useRef<THREE.Mesh>(null);
  const [shadowLive, setShadowLive] = useShadowGate();

  useFrame(() => {
    const u = stage.u;
    const visible = u >= T.jarGrow[0] && u < T.pairOut[1] + 0.04;
    if (group.current) group.current.visible = visible;
    setShadowLive(visible);
    if (!visible || !jar.current) return;

    const grow = jarGrowth(u);
    jar.current.position.copy(JAR_BASE);
    jar.current.scale.set(1, Math.max(0.001, grow), 1);
    jar.current.rotation.y = stage.time * 0.08;
    material.dissolve.value = Math.max(1 - span(u, [T.jarGrow[0], T.jarGrow[0] + 0.1]), span(u, T.pairOut), stage.away);
    jar.current.visible = material.dissolve.value < 0.999;

    // As the pair dissolves, a soft light where they stood.
    if (flash.current) {
      const t = Math.sin(Math.PI * spanLinear(u, [T.pairOut[0], T.pairOut[1] + 0.04]));
      flash.current.visible = t > 0.001;
      flash.current.position.set((JAR_BASE.x + BESIDE_JAR.x) / 2, FLOOR_Y + 0.35, (JAR_BASE.z + BESIDE_JAR.z) / 2);
      flash.current.quaternion.copy(camera.quaternion);
      flash.current.scale.setScalar(0.6 + 1.2 * t);
      setGlow(flashMaterial, 0.9 * t);
    }
  }, ORDER.home);

  return (
    <group ref={group} visible={false}>
      <mesh ref={jar} geometry={geometry} material={material} />
      <mesh ref={flash} geometry={disc} material={flashMaterial} visible={false} renderOrder={4} />
      <ContactShadows
        position={[(JAR_BASE.x + BESIDE_JAR.x) / 2, FLOOR_Y + 0.001, JAR_BASE.z]}
        scale={1.8}
        far={1}
        blur={2.4}
        opacity={0.3}
        resolution={quality.shadowResolution / 2}
        color="#4A3B2C"
        frames={shadowLive ? Infinity : 0}
      />
    </group>
  );
}
