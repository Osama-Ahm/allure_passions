'use client';

import { Canvas, advance, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { story } from '@/lib/story/store';
import { onFrame } from '@/lib/useSmoothScroll';
import { Annotations } from './Annotations';
import { Director } from './Director';
import { Lighting } from './Lighting';
import { readQuality } from './quality';

/**
 * The 3D stage: one transparent canvas, fixed behind the chapters' front
 * layers and in front of their back layers (see "Chapters" in globals.css).
 *
 * It never runs its own animation loop. The page's single loop (GSAP's ticker,
 * lib/useSmoothScroll.ts) moves the scroll position first and then advances
 * the canvas, so the 3D can never be a frame behind the copy. Past the last
 * chapter that has a shot, the stage renders one last, empty frame and rests.
 */
export function Stage() {
  const quality = useMemo(readQuality, []);
  const background = useMemo(() => new THREE.Color(), []);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let rendering = true;
    return onFrame((time) => {
      // Chapters after Technologies have no shot yet (M4, M5).
      const active = story.u < 4.05;
      if (active || rendering) advance(time);
      rendering = active;
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.classList.add('stage-live');
    return () => root.classList.remove('stage-live');
  }, [ready]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[1] h-[100lvh] transition-opacity duration-1000 ease-out"
      style={{ opacity: ready ? 1 : 0 }}
    >
      <Canvas
        frameloop="never"
        dpr={quality.dpr}
        camera={{ fov: 24, near: 0.1, far: 40, position: [0, 1.2, 4] }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          // Khronos PBR Neutral keeps the brand's creams and golds true to
          // their hex values, where ACES would shift and desaturate them.
          gl.toneMapping = THREE.NeutralToneMapping;
          gl.toneMappingExposure = 1;
        }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <Director quality={quality} background={background} />
          <WarmUp onReady={() => setReady(true)} />
        </Suspense>
      </Canvas>
      <Annotations />
    </div>
  );
}

/**
 * Compiles every shader before the canvas is shown. three only compiles what
 * is visible, and most models start hidden until their chapter, so for its
 * first few frames (while the canvas is still transparent) this shows every
 * object, compiles, and lets real frames render, including the glass's own
 * passes. The scenes set each object's visibility again every frame, so
 * nothing stays shown. The fade-in never stutters and no model hitches the
 * first time it appears.
 */
function WarmUp({ onReady }: { onReady: () => void }) {
  const { gl, scene, camera } = useThree();
  const frames = useRef(0);
  const done = useRef(false);

  useFrame(() => {
    if (done.current) return;
    frames.current += 1;
    scene.traverse((object) => {
      object.visible = true;
    });
    if (frames.current === 1) gl.compile(scene, camera);
    if (frames.current >= 4) {
      done.current = true;
      onReady();
    }
  });

  return null;
}
