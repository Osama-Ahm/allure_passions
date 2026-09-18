'use client';

import { ContactShadows } from '@react-three/drei';
import { forwardRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { createMarbleTexture } from '@/lib/proceduralTextures';
import { travertine } from '@/lib/scene/palette';

export const PLINTH_RADIUS = 0.34;
export const PLINTH_HEIGHT = 0.055;

/**
 * A low travertine disc for the bottle to stand on. There is no floor: its
 * soft contact shadow falls straight onto the page, which is what makes the
 * page read as the surface the plinth stands on.
 */
export const Plinth = forwardRef<THREE.Group, { shadowResolution: number }>(function Plinth(
  { shadowResolution },
  ref
) {
  const { map, geometry } = useMemo(() => {
    const texture = createMarbleTexture(1024);
    texture.repeat.set(0.8, 0.8);
    return {
      map: texture,
      geometry: new THREE.CylinderGeometry(PLINTH_RADIUS, PLINTH_RADIUS + 0.01, PLINTH_HEIGHT, 128),
    };
  }, []);

  useEffect(
    () => () => {
      map.dispose();
      geometry.dispose();
    },
    [map, geometry]
  );

  return (
    <group ref={ref}>
      <mesh geometry={geometry} position-y={PLINTH_HEIGHT / 2}>
        <meshStandardMaterial color={travertine} map={map} roughness={0.7} />
      </mesh>

      {/* On the page, around the plinth… */}
      <ContactShadows
        position={[0, 0.001, 0]}
        scale={1.8}
        far={0.6}
        blur={2.8}
        opacity={0.34}
        resolution={shadowResolution}
        color="#4A3B2C"
      />
      {/* …and on the plinth, under the bottle. */}
      <ContactShadows
        position={[0, PLINTH_HEIGHT + 0.0015, 0]}
        scale={0.6}
        far={0.35}
        blur={2}
        opacity={0.42}
        resolution={shadowResolution / 2}
        color="#4A3B2C"
      />
    </group>
  );
});
