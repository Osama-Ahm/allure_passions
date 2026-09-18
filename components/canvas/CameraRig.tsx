'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { cameraAt } from '@/lib/hallway';

/**
 * Walks the camera through the hallway.
 *
 * Position and focal point are damped rather than snapped, so the walk has
 * weight. During a reading hold the plan returns a constant target, so the
 * damping settles and the camera comes to a genuine standstill — text that
 * drifts a pixel a frame is text nobody can read comfortably.
 *
 * `scrollProgress` is a ref written by ScrollTrigger, so scrolling never
 * re-renders this component.
 */
export function CameraRig({
  scrollProgress,
  onStopChange,
}: {
  scrollProgress: { current: number };
  onStopChange?: (index: number) => void;
}) {
  const { camera, size } = useThree();
  const currentPosition = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3());
  const lastIndex = useRef(-1);
  const initialised = useRef(false);

  useEffect(() => {
    const perspective = camera as THREE.PerspectiveCamera;
    // A narrow viewport crops the alcove badly at 50 degrees.
    perspective.fov = size.width < 768 ? 68 : 50;
    perspective.updateProjectionMatrix();
  }, [size.width, camera]);

  useFrame((_, delta) => {
    const { position, lookAt, activeIndex } = cameraAt(scrollProgress.current);

    if (!initialised.current) {
      currentPosition.current.copy(position);
      currentLookAt.current.copy(lookAt);
      initialised.current = true;
    }

    // Exponential damping, so the lag is the same on a 60Hz and a 144Hz screen.
    const smoothing = 1 - Math.exp(-6 * Math.min(delta, 0.1));
    currentPosition.current.lerp(position, smoothing);
    currentLookAt.current.lerp(lookAt, smoothing);

    camera.position.copy(currentPosition.current);
    camera.lookAt(currentLookAt.current);

    if (activeIndex !== lastIndex.current) {
      lastIndex.current = activeIndex;
      onStopChange?.(activeIndex);
    }
  });

  return null;
}
