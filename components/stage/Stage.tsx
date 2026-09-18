'use client';

import { PerformanceMonitor } from '@react-three/drei';
import { Canvas, advance, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { stage } from '@/lib/scene/stage';
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
 * the canvas, so the 3D can never be a frame behind the copy.
 */
export function Stage() {
  const quality = useMemo(readQuality, []);
  const background = useMemo(() => new THREE.Color(), []);
  const [ready, setReady] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  // Every chapter has 3D, so the stage advances on every frame of the loop.
  // With reduced motion it also fades between chapter stills (Director).
  useEffect(() => {
    let lastFade = -1;
    return onFrame((time) => {
      advance(time);
      if (wrapper.current && stage.fade !== lastFade) {
        wrapper.current.style.opacity = String(1 - stage.fade);
        lastFade = stage.fade;
      }
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
      <div ref={wrapper} className="absolute inset-0">
      <Canvas
        frameloop="never"
        dpr={quality.dpr}
        camera={{ fov: 24, near: 0.1, far: 40, position: [0, 1.2, 4] }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          // For checking shader counts and draw calls from the console while
          // developing; never in a production build.
          if (process.env.NODE_ENV !== 'production') Object.assign(window, { __allureRenderer: gl });
          // Khronos PBR Neutral keeps the brand's creams and golds true to
          // their hex values, where ACES would shift and desaturate them.
          gl.toneMapping = THREE.NeutralToneMapping;
          gl.toneMappingExposure = 1;
        }}
      >
        <Suspense fallback={null}>
          <AdaptivePixelRatio max={quality.dpr[1]} />
          <Lighting />
          <Director quality={quality} background={background} />
          <WarmUp onReady={() => setReady(true)} />
        </Suspense>
      </Canvas>
      <Annotations />
      </div>
    </div>
  );
}

/**
 * Drops to a pixel ratio of 1 on a device that cannot hold its frame rate, and
 * climbs back when it recovers. Only the resolution changes; never a material.
 */
function AdaptivePixelRatio({ max }: { max: number }) {
  const setDpr = useThree((state) => state.setDpr);
  return (
    <PerformanceMonitor
      flipflops={3}
      onDecline={() => setDpr(1)}
      onIncline={() => setDpr(max)}
      onFallback={() => setDpr(1)}
    />
  );
}

/**
 * Compiles every shader before the canvas is shown. three only compiles what
 * is visible, and most models start hidden until their chapter, so for its
 * first few frames (while the canvas is still transparent) this shows every
 * object and material, compiles, and lets real frames render.
 *
 * It runs after the scenes have posed things (they set visibility every
 * frame) but before the glass's own render passes (priority 0), because those
 * passes draw the scene again without tone mapping, and every material needs
 * that variant compiled too. The scenes put visibility back on the next frame.
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
      const material = (object as THREE.Mesh).material;
      if (material && !Array.isArray(material)) material.visible = true;
    });
    if (frames.current === 1) gl.compile(scene, camera);
    if (frames.current >= 5) {
      done.current = true;
      onReady();
    }
  }, -0.5);

  return null;
}
