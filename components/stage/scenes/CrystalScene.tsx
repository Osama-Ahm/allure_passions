'use client';

import { MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { createCrystalGeometry } from '@/lib/scene/crystal';
import { createGlowMaterial, setGlow } from '@/lib/scene/glow';
import { serum as serumColour } from '@/lib/scene/palette';
import { ORDER, clamp01, lerp, span, spanLinear, stage } from '@/lib/scene/stage';
import { MERGED_CENTRE } from '@/lib/scene/layout';
import { T } from '@/lib/scene/timeline';
import type { Quality } from '../quality';
import { Energies, ENERGY_COLOURS, energy } from './Energies';

/** The merged drop's radius, and the crystal's girdle radius once frozen. */
export const DROP_R = 0.24;
export const CRYSTAL_R = 0.3;

const honey = new THREE.Color(serumColour);
const clear = new THREE.Color('#FFFDF8');
const honeyDepth = new THREE.Color('#B9823F');
const clearDepth = new THREE.Color('#EEF1F4');
const glowColour = new THREE.Color();
const mix = new THREE.Color();

/**
 * Chapter 4 · Technologies. The six droplets have flowed back into one drop;
 * here it freezes into a crystal (a single morph from sphere to cut stone, see
 * lib/scene/crystal.ts), and each technology plays through it as its own light
 * or energy while its details are read (Energies.tsx).
 *
 * The drop is already this mesh while the droplets finish merging, tinted like
 * the serum; as it freezes the tint clears to glass, and a soft flash marks the
 * moment it sets.
 */
export function CrystalScene({ quality, background }: { quality: Quality; background: THREE.Color }) {
  const { camera } = useThree();
  const geometry = useMemo(createCrystalGeometry, []);
  const flashMaterial = useMemo(() => createGlowMaterial('#FFF3DC', 'disc'), []);
  const coreMaterial = useMemo(() => createGlowMaterial('#F6E2BC', 'disc'), []);
  const disc = useMemo(() => new THREE.PlaneGeometry(1, 1), []);

  useEffect(
    () => () => {
      geometry.dispose();
      flashMaterial.dispose();
      coreMaterial.dispose();
      disc.dispose();
    },
    [geometry, flashMaterial, coreMaterial, disc]
  );

  const rig = useRef<THREE.Group>(null);
  const crystal = useRef<THREE.Mesh>(null);
  const glass = useRef<THREE.MeshPhysicalMaterial & { chromaticAberration: number }>(null);
  const flash = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const u = stage.u;
    const merge = spanLinear(u, T.merge);
    // The drop takes over from the metaballs over the last third of the merge.
    const appear = clamp01((merge - 0.62) / 0.38);
    // Kept a moment past the break so its flash can finish.
    const visible = appear > 0 && u < T.fracture[1] + 0.03;
    const whole = u < T.fracture[1];
    if (rig.current) rig.current.visible = visible;
    if (glass.current) glass.current.visible = visible && whole;
    if (crystal.current) crystal.current.visible = whole;
    if (!visible || !crystal.current || !glass.current) return;

    const freeze = span(u, T.freeze);
    const still = stage.reducedMotion;
    const time = still ? 0 : stage.time;

    rig.current!.position.copy(MERGED_CENTRE);
    rig.current!.position.y += still ? 0 : Math.sin(time * 0.7) * 0.015;

    // Sphere → cut stone, and a little larger as it sets.
    crystal.current.morphTargetInfluences![0] = freeze;
    // At dawn it swells a little, then breaks: the arch's stones fly out of it.
    const fracture = spanLinear(u, T.fracture);
    const breaking = (1 + 0.14 * clamp01(fracture / 0.5)) * (1 - clamp01((fracture - 0.5) / 0.5));
    const size = lerp(DROP_R * lerp(0.7, 1, appear), CRYSTAL_R, freeze) * (1 - energy.squeeze) * breaking;
    crystal.current.scale.setScalar(size);
    crystal.current.rotation.set(0.08 * freeze, time * 0.12 + freeze * 0.6, 0.05 * freeze);

    // Serum-tinted while liquid; clear, bright glass once frozen.
    const material = glass.current;
    material.color.lerpColors(honey, clear, freeze);
    material.attenuationColor.lerpColors(honeyDepth, clearDepth, freeze);
    material.attenuationDistance = lerp(0.35, 3, freeze);
    material.roughness = lerp(0.08, 0.015, freeze);
    material.chromaticAberration = lerp(0.02, 0.09, freeze);

    // The flash as it sets, facing the camera.
    const flashT = Math.max(
      Math.sin(Math.PI * spanLinear(u, [T.freeze[0] + 0.02, T.freeze[1] - 0.01])),
      Math.sin(Math.PI * spanLinear(u, [T.fracture[0] + 0.03, T.fracture[1] + 0.03]))
    );
    if (flash.current) {
      flash.current.visible = flashT > 0.001;
      flash.current.quaternion.copy(camera.quaternion);
      flash.current.scale.setScalar(0.4 + 1.4 * flashT);
      setGlow(flashMaterial, 1.1 * flashT);
    }

    // A faint inner light, coloured by whichever technology is being read.
    if (core.current) {
      core.current.quaternion.copy(camera.quaternion);
      glowColour.setRGB(0, 0, 0);
      let total = 0;
      energy.weights.forEach((weight, i) => {
        if (weight <= 0) return;
        mix.set(ENERGY_COLOURS[i]).multiplyScalar(weight);
        glowColour.add(mix);
        total += weight;
      });
      if (total > 0) glowColour.multiplyScalar(1 / total);
      else glowColour.set('#F6E2BC');
      coreMaterial.uniforms.uColor.value.copy(glowColour);
      setGlow(coreMaterial, freeze * (0.1 + 0.22 * Math.min(1, total)));
    }
  }, ORDER.crystal);

  return (
    <group ref={rig} visible={false}>
      <mesh ref={crystal} geometry={geometry} morphTargetInfluences={[0]} renderOrder={2}>
        <MeshTransmissionMaterial
          ref={glass as never}
          background={background}
          samples={quality.glassSamples}
          resolution={quality.glassResolution}
          transmission={1}
          thickness={0.35}
          ior={1.55}
          anisotropicBlur={0.05}
          distortion={0}
          temporalDistortion={0}
          clearcoat={1}
          clearcoatRoughness={0.04}
          iridescence={0.3}
          iridescenceIOR={1.4}
          envMapIntensity={1.6}
        />
      </mesh>
      <mesh ref={core} geometry={disc} material={coreMaterial} scale={0.7} renderOrder={3} />
      <mesh ref={flash} geometry={disc} material={flashMaterial} renderOrder={4} visible={false} />
      <Energies />
    </group>
  );
}
