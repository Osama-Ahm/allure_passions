'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Walks the camera down the sanctuary as the page scrolls, interpolating
 * linearly between the four narrative waypoints:
 *
 *   0.00 – 0.25  Grand Foyer          (0.0, 1.6,  6.0) → (1.8, 1.4,  -6.0)
 *   0.25 – 0.50  Signature Suite      (1.8, 1.4, -6.0) → (-1.5, 1.5, -16.0)
 *   0.50 – 0.65  Consultation Alcove  (-1.5, 1.5, -16.0) → (0.0, 1.6, -26.0)
 *   0.65 – 1.00  Serenity Portal      (0.0, 1.6, -26.0) → (0.0, 3.2, -28.0)
 *
 * `scrollProgress` is a ref written by the ScrollTrigger in Walkthrough, so
 * scroll updates never re-render this component — they are read inside the
 * render loop instead.
 */
export function CameraController({ scrollProgress }: { scrollProgress: { current: number } }) {
  const { camera, size } = useThree();
  const targetLookAt = useRef(new THREE.Vector3(0, 1.4, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.4, 0));

  // A phone's narrow viewport crops the corridor badly at 50°, so it opens up.
  useEffect(() => {
    const perspective = camera as THREE.PerspectiveCamera;
    perspective.fov = size.width < 768 ? 65 : 50;
    perspective.updateProjectionMatrix();
  }, [size.width, camera]);

  useFrame((_, delta) => {
    const p = scrollProgress.current;

    if (p <= 0.25) {
      const t = p / 0.25;
      camera.position.x = THREE.MathUtils.lerp(0.0, 1.8, t);
      camera.position.y = THREE.MathUtils.lerp(1.6, 1.4, t);
      camera.position.z = THREE.MathUtils.lerp(6.0, -6.0, t);
      targetLookAt.current.set(
        THREE.MathUtils.lerp(0.0, -0.4, t),
        THREE.MathUtils.lerp(1.4, 1.2, t),
        THREE.MathUtils.lerp(0.0, -10.0, t)
      );
    } else if (p <= 0.5) {
      const t = (p - 0.25) / 0.25;
      camera.position.x = THREE.MathUtils.lerp(1.8, -1.5, t);
      camera.position.y = THREE.MathUtils.lerp(1.4, 1.5, t);
      camera.position.z = THREE.MathUtils.lerp(-6.0, -16.0, t);
      targetLookAt.current.set(
        THREE.MathUtils.lerp(-0.4, 0.8, t),
        THREE.MathUtils.lerp(1.2, 1.3, t),
        THREE.MathUtils.lerp(-10.0, -20.0, t)
      );
    } else if (p <= 0.65) {
      const t = (p - 0.5) / 0.15;
      camera.position.x = THREE.MathUtils.lerp(-1.5, 0.0, t);
      camera.position.y = THREE.MathUtils.lerp(1.5, 1.6, t);
      camera.position.z = THREE.MathUtils.lerp(-16.0, -26.0, t);
      targetLookAt.current.set(
        THREE.MathUtils.lerp(0.8, 0.0, t),
        THREE.MathUtils.lerp(1.3, 1.5, t),
        THREE.MathUtils.lerp(-20.0, -34.0, t)
      );
    } else {
      const t = Math.min((p - 0.65) / 0.35, 1.0);
      camera.position.y = THREE.MathUtils.lerp(1.6, 3.2, t);
      camera.position.z = THREE.MathUtils.lerp(-26.0, -28.0, t);
      targetLookAt.current.set(0.0, 1.5, -34.0);
    }

    // The focal point trails the waypoint slightly, which reads as a head turn
    // rather than a snap. Exponential damping keeps the lag identical on a
    // 60 Hz and a 144 Hz display, where a fixed lerp factor would not.
    const smoothing = 1 - Math.exp(-5 * delta);
    currentLookAt.current.lerp(targetLookAt.current, smoothing);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
