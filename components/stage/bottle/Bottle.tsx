'use client';

import { MeshTransmissionMaterial } from '@react-three/drei';
import { type RefObject, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import {
  BODY_R,
  bulbProfile,
  collarProfile,
  glassProfile,
  pipette,
  serumProfile,
  type ProfilePoint,
} from '@/lib/bottle/profile';
import { createKnurlTexture } from '@/lib/proceduralTextures';
import { gold, goldDeep, serum as serumColour } from '@/lib/scene/palette';
import type { Quality } from '../quality';

/** How far the collar, bulb and pipette rise when the dropper is lifted out. */
export const PIPETTE_TRAVEL = 0.66;

const lathe = (profile: ProfilePoint[], segments = 128) =>
  new THREE.LatheGeometry(
    profile.map(([r, y]) => new THREE.Vector2(r, y)),
    segments
  );

export type BottleRefs = {
  /** Collar, bulb and pipette: everything that lifts out together. */
  dropper: RefObject<THREE.Group | null>;
  /** The serum, counter-tilted so its surface stays level. */
  serum: RefObject<THREE.Mesh | null>;
  /** The glass material, hidden (not unmounted) when the bottle is off screen. */
  glass: RefObject<THREE.Material | null>;
};

/**
 * The Allure serum bottle, turned from the profile in lib/bottle/profile.ts.
 *
 * Only the outer glass uses the transmission material: it re-renders the scene
 * behind it, so everything inside (serum, pipette) is ordinary material that
 * the glass then refracts. The canvas is transparent, so the glass is told the
 * page colour to refract through (`background`), or it would read as smoked.
 */
export function Bottle({
  refs,
  quality,
  background,
}: {
  refs: BottleRefs;
  quality: Quality;
  background: THREE.Color;
}) {
  const geometry = useMemo(
    () => ({
      glass: lathe(glassProfile),
      serum: lathe(serumProfile, 96),
      collar: lathe(collarProfile, 128),
      bulb: lathe(bulbProfile, 96),
      tube: new THREE.CylinderGeometry(pipette.radius, pipette.radius, pipette.top - pipette.bottom - 0.05, 24, 1, true),
      tip: new THREE.CylinderGeometry(pipette.radius, pipette.tipRadius, 0.05, 24, 1, true),
      tubeSerum: new THREE.CylinderGeometry(pipette.radius * 0.7, pipette.tipRadius * 0.7, 0.24, 16),
    }),
    []
  );

  const knurl = useMemo(() => {
    const texture = createKnurlTexture();
    texture.repeat.set(1, 1);
    return texture;
  }, []);

  useEffect(
    () => () => {
      Object.values(geometry).forEach((entry) => entry.dispose());
      knurl.dispose();
    },
    [geometry, knurl]
  );

  const tubeLength = pipette.top - pipette.bottom - 0.05;

  return (
    <group>
      {/* The glass body. */}
      <mesh geometry={geometry.glass} renderOrder={2}>
        <MeshTransmissionMaterial
          ref={refs.glass as never}
          background={background}
          samples={quality.glassSamples}
          resolution={quality.glassResolution}
          transmission={1}
          thickness={0.3}
          roughness={0.07}
          ior={1.45}
          chromaticAberration={0.03}
          anisotropicBlur={0.08}
          distortion={0}
          temporalDistortion={0}
          color="#FFF8EE"
          attenuationColor="#F0E2C8"
          attenuationDistance={2.4}
          clearcoat={1}
          clearcoatRoughness={0.12}
        />
      </mesh>

      {/* The serum, seen through the glass. */}
      <mesh ref={refs.serum} geometry={geometry.serum}>
        {/* Slightly see-through, so the page glows through it the way light
            comes through an oil serum. */}
        <meshPhysicalMaterial
          color={serumColour}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.08}
          transparent
          opacity={0.78}
        />
      </mesh>

      <Label />

      {/* The dropper: collar, bulb and pipette, which lift out as one. */}
      <group ref={refs.dropper}>
        <mesh geometry={geometry.collar}>
          <meshStandardMaterial
            color={gold}
            metalness={1}
            roughness={0.3}
            bumpMap={knurl}
            bumpScale={0.9}
            envMapIntensity={1.15}
          />
        </mesh>

        <mesh geometry={geometry.bulb}>
          <meshPhysicalMaterial color="#F1EBE1" roughness={0.62} sheen={0.6} sheenColor="#FFFFFF" clearcoat={0.15} />
        </mesh>

        <group position-y={pipette.bottom}>
          <mesh geometry={geometry.tip} position-y={0.025}>
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.28} roughness={0.05} depthWrite={false} />
          </mesh>
          <mesh geometry={geometry.tube} position-y={0.05 + tubeLength / 2}>
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.28} roughness={0.05} depthWrite={false} />
          </mesh>
          <mesh geometry={geometry.tubeSerum} position-y={0.13}>
            <meshStandardMaterial color={serumColour} roughness={0.2} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ---------------------------------------------------------------------------
   The label: "ALLURE PASSIONS" and the monogram, printed in champagne gold on
   the glass. Drawn on a canvas in the site's own Cormorant once the font has
   loaded; the texture object exists from the first frame, so redrawing it
   never changes the shader.
   --------------------------------------------------------------------------- */

const LABEL_ARC = 1.4;
const LABEL_HEIGHT = BODY_R * LABEL_ARC * 0.5;
const LABEL_Y = 0.25;

function Label() {
  const { texture, geometry } = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 8;
    return {
      texture: tex,
      geometry: new THREE.CylinderGeometry(
        BODY_R + 0.0012,
        BODY_R + 0.0012,
        LABEL_HEIGHT,
        64,
        1,
        true,
        -LABEL_ARC / 2,
        LABEL_ARC
      ),
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    drawLabel(texture.image as HTMLCanvasElement).then(() => {
      if (!cancelled) texture.needsUpdate = true;
    });
    return () => {
      cancelled = true;
      texture.dispose();
      geometry.dispose();
    };
  }, [texture, geometry]);

  return (
    <mesh geometry={geometry} position-y={LABEL_Y} renderOrder={3}>
      <meshStandardMaterial
        color={goldDeep}
        metalness={0.35}
        roughness={0.45}
        alphaMap={texture}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/** Draws text one letter at a time so the tracking works in every browser. */
function spaced(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, tracking: number) {
  const widths = Array.from(text).map((ch) => ctx.measureText(ch).width);
  const total = widths.reduce((sum, w) => sum + w, 0) + tracking * (text.length - 1);
  let cursor = x - total / 2;
  Array.from(text).forEach((ch, i) => {
    ctx.fillText(ch, cursor + widths[i] / 2, y);
    cursor += widths[i] + tracking;
  });
}

async function drawLabel(canvas: HTMLCanvasElement) {
  const family =
    getComputedStyle(document.documentElement).getPropertyValue('--font-cormorant').trim() || 'Georgia, serif';
  await Promise.all([
    document.fonts.load(`300 72px ${family}`),
    document.fonts.load(`500 30px ${family}`),
  ]).catch(() => undefined);

  const monogram = await new Promise<HTMLImageElement | null>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = '/assets/brand/ap-monogram.png';
  });

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // The monogram as a white silhouette (the texture is used as an alpha map).
  if (monogram) {
    const mark = document.createElement('canvas');
    mark.width = 120;
    mark.height = 148;
    const markCtx = mark.getContext('2d')!;
    markCtx.drawImage(monogram, 0, 0, mark.width, mark.height);
    markCtx.globalCompositeOperation = 'source-in';
    markCtx.fillStyle = '#FFFFFF';
    markCtx.fillRect(0, 0, mark.width, mark.height);
    ctx.drawImage(mark, width / 2 - 45, 58, 90, 111);
  }

  ctx.font = `300 72px ${family}`;
  spaced(ctx, 'ALLURE PASSIONS', width / 2, 262, 16);

  ctx.fillRect(width / 2 - 70, 322, 140, 2);

  ctx.font = `500 30px ${family}`;
  spaced(ctx, 'FITZROVIA · LONDON', width / 2, 372, 14);
}
