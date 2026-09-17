'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { CameraController } from './CameraController';
import { SanctuaryEnvironment } from './Scene';

/**
 * The WebGL surface. Kept apart from the overlay and the ScrollTrigger wiring
 * in Walkthrough so that nothing here re-renders on scroll.
 */
export function SanctuaryCanvas({
  scrollProgress,
  isMobile,
}: {
  scrollProgress: { current: number };
  isMobile: boolean;
}) {
  const quality = isMobile ? 'low' : 'high';

  return (
    <Canvas
      // "percentage" is PCFShadowMap. Plain `shadows` asks for PCFSoftShadowMap,
      // which three 0.186 has removed — it falls back to this anyway, with a
      // console warning.
      shadows={isMobile ? false : 'percentage'}
      // Retina phones render four times the pixels for no visible gain here,
      // and it is the first thing that costs frames.
      dpr={isMobile ? [1, 1.2] : [1, 1.75]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 1.6, 6], fov: 50 }}
      className="h-full w-full"
    >
      {/* Fog and background close the far end of the corridor into the page's
          own alabaster, so the geometry does not simply stop in mid air. */}
      <color attach="background" args={['#F9F6F0']} />
      <fog attach="fog" args={['#F9F6F0', 24, 62]} />

      <Suspense fallback={null}>
        <SanctuaryEnvironment quality={quality} />
      </Suspense>
      <CameraController scrollProgress={scrollProgress} />
    </Canvas>
  );
}
