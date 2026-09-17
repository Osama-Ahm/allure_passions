'use client';

import { Environment, Float, Lightformer, MeshReflectorMaterial } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import {
  createFlutedColumnGeometry,
  createMarbleTexture,
  createPlasterTexture,
  createPolishTexture,
} from '@/lib/proceduralTextures';

/**
 * The virtual sanctuary, built entirely from Three.js primitives, procedural
 * textures and physical materials so the walkthrough carries no external asset
 * weight at all.
 *
 * The corridor runs from z = 0 at the entrance to z = -34 at the far portal,
 * and the camera travels it on scroll (see CameraController). The four stops
 * below sit at the z positions the camera's waypoints look towards.
 *
 * Surfaces are deliberately separated in tone and finish — marble floor,
 * plastered walls over a verde dado, fluted columns, a coffered ceiling — so
 * that the eye can tell one plane from another. Built flat and untextured, as
 * originally specified, the whole room read as a single cream mass.
 *
 * `quality` drops the costly work — mirror resolution, shadow casting, texture
 * size — on phones, where the reflective floor is what drops frames first.
 */

const VERDE = '#2C4A3E';
const VERDE_DEEP = '#1C3229';
const GOLD = '#C5A880';

export function SanctuaryEnvironment({ quality }: { quality: 'high' | 'low' }) {
  const high = quality === 'high';

  const marble = useMemo(() => createMarbleTexture(high ? 1024 : 512), [high]);
  const polish = useMemo(() => createPolishTexture(high ? 512 : 256), [high]);
  const plaster = useMemo(() => createPlasterTexture(high ? 512 : 256), [high]);
  const columnGeometry = useMemo(() => createFlutedColumnGeometry(0.45, 6, 24, 0.035), []);

  // Tile the maps across surfaces that are tens of metres long.
  useMemo(() => {
    marble.repeat.set(5, 10);
    polish.repeat.set(4, 8);
    plaster.repeat.set(8, 1);
  }, [marble, polish, plaster]);

  // Canvas textures and hand-built geometry are not reference counted by
  // three.js, so they are released explicitly.
  useEffect(
    () => () => {
      marble.dispose();
      polish.dispose();
      plaster.dispose();
      columnGeometry.dispose();
    },
    [marble, polish, plaster, columnGeometry]
  );

  const columnPositions = [-5, -12, -19, -26];

  return (
    <group>
      {/*
        A procedural studio environment, baked once. The gold here is metal, and
        metal renders what it reflects: with nothing to reflect it came out
        near-black rather than champagne. These light panels are generated on
        the GPU, so the scene still carries no external asset.
      */}
      <Environment resolution={high ? 256 : 128} frames={1}>
        <Lightformer
          form="rect"
          intensity={2.4}
          color="#FFF4E2"
          position={[0, 6, -12]}
          scale={[16, 30, 1]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={1.1}
          color="#F6F1E7"
          position={[-8, 3, -12]}
          scale={[24, 6, 1]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Lightformer
          form="rect"
          intensity={1.1}
          color="#F6F1E7"
          position={[8, 3, -12]}
          scale={[24, 6, 1]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <Lightformer form="ring" intensity={1.8} color="#E5C992" position={[0, 2.2, -33]} scale={7} />
      </Environment>

      {/* Ambient & Studio Lighting */}
      <ambientLight intensity={0.5} color="#FFF8EE" />
      <directionalLight
        position={[8, 12, 5]}
        intensity={1.05}
        color="#FFF3E0"
        castShadow={high}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <pointLight position={[0, 4, -10]} intensity={1.5} color="#E5C992" distance={15} decay={2} />
      <pointLight position={[2, 3, -20]} intensity={1.2} color="#F9F6F0" distance={12} decay={2} />
      <pointLight position={[0, 3, -32]} intensity={1.8} color="#E5C992" distance={15} decay={2} />
      {/* A cool bounce off the verde dado, to keep the greens from going flat. */}
      <pointLight position={[-5, 1, -16]} intensity={0.5} color="#8FB3A1" distance={14} decay={2} />

      {/* Sanctuary Floor: veined alabaster marble, polished */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -15]} receiveShadow>
        <planeGeometry args={[40, 80]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={high ? 1024 : 512}
          mirror={0.3}
          mixBlur={1.1}
          mixStrength={0.7}
          roughness={0.32}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#DED5C6"
          metalness={0.1}
          map={marble}
          roughnessMap={polish}
        />
      </mesh>

      {/* Champagne inlay, running the length of the corridor either side of the
          walking line. It gives the floor a direction and the eye something to
          follow into the depth. */}
      {[-1.9, 1.9].map((x) => (
        <mesh key={x} position={[x, 0.004, -15]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.07, 76]} />
          <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.25} />
        </mesh>
      ))}

      {/* Ceiling, with coffers and a warm cove along each edge */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, -15]}>
        <planeGeometry args={[40, 80]} />
        <meshStandardMaterial color="#FBF8F3" roughness={0.95} bumpMap={plaster} bumpScale={0.35} />
      </mesh>

      {/* Coffer ribs: shallow beams across the corridor, spaced with the
          columns, so the ceiling reads as a surface at a distance. */}
      {[-2, -6, -10, -14, -18, -22, -26, -30].map((z) => (
        <mesh key={z} position={[0, 5.82, z]} castShadow={false}>
          <boxGeometry args={[13.6, 0.22, 0.5]} />
          <meshStandardMaterial color="#F3EDE3" roughness={0.9} />
        </mesh>
      ))}

      {/* Cove lighting: warm strips tucked where ceiling meets wall. */}
      {[-6.6, 6.6].map((x) => (
        <mesh key={x} position={[x, 5.72, -15]}>
          <boxGeometry args={[0.16, 0.1, 76]} />
          <meshStandardMaterial
            color="#FFF6E6"
            emissive="#F0DDB8"
            emissiveIntensity={1.1}
            roughness={1}
          />
        </mesh>
      ))}

      {/*
        Side walls, turned inward to close the corridor. Not in the original
        specification, which left the space open at the sides: without them the
        camera sees past the columns into empty background on every sweep.
      */}
      {[-7, 7].map((x) => (
        <group key={x}>
          {/* Plastered upper wall */}
          <mesh
            position={[x, 3, -15]}
            rotation={[0, x < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
            receiveShadow
          >
            <planeGeometry args={[80, 6]} />
            <meshStandardMaterial
              color="#EFE9DE"
              roughness={0.96}
              bumpMap={plaster}
              bumpScale={0.6}
            />
          </mesh>

          {/* Verde dado. The accent the rest of the site carries, brought into
              the room: it also separates wall from floor, which two shades of
              cream never did. */}
          <mesh
            position={[x < 0 ? x + 0.03 : x - 0.03, 0.62, -15]}
            rotation={[0, x < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
          >
            <planeGeometry args={[80, 1.24]} />
            <meshStandardMaterial color={VERDE} roughness={0.55} metalness={0.04} />
          </mesh>

          {/* Champagne rail capping the dado */}
          <mesh position={[x < 0 ? x + 0.06 : x - 0.06, 1.26, -15]}>
            <boxGeometry args={[0.06, 0.07, 76]} />
            <meshStandardMaterial color={GOLD} metalness={0.8} roughness={0.28} />
          </mesh>
        </group>
      ))}

      {/* Architectural Fluted Columns, on verde plinths with champagne collars */}
      {[-4, 4].map((x) =>
        columnPositions.map((z) => (
          <group key={`${x}-${z}`} position={[x, 0, z]}>
            {/* Plinth */}
            <mesh position={[0, 0.16, 0]} receiveShadow>
              <boxGeometry args={[1.06, 0.32, 1.06]} />
              <meshStandardMaterial color={VERDE} roughness={0.55} />
            </mesh>
            {/* Base */}
            <mesh position={[0, 0.42, 0]} castShadow={high} receiveShadow>
              <cylinderGeometry args={[0.56, 0.6, 0.2, 32]} />
              <meshStandardMaterial color="#EDE7DC" roughness={0.45} />
            </mesh>
            {/* Fluted shaft */}
            <mesh
              geometry={columnGeometry}
              position={[0, 3.2, 0]}
              castShadow={high}
              receiveShadow
            >
              <meshStandardMaterial color="#F0EAE0" roughness={0.42} />
            </mesh>
            {/* Champagne collar and capital */}
            <mesh position={[0, 5.9, 0]}>
              <cylinderGeometry args={[0.52, 0.52, 0.06, 32]} />
              <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.22} />
            </mesh>
            <mesh position={[0, 6.06, 0]} castShadow={high}>
              <cylinderGeometry args={[0.6, 0.54, 0.26, 32]} />
              <meshStandardMaterial color="#EDE7DC" roughness={0.45} />
            </mesh>
          </group>
        ))
      )}

      {/* STOP 1: Grand Foyer Archway */}
      <mesh position={[0, 3, -3]}>
        <torusGeometry args={[3.2, 0.25, 16, 64, Math.PI]} />
        <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.25} />
      </mesh>

      {/*
        STOP 2: Signature Suite Floating Pedestal.

        Moved off the corridor's centre line, from the specified (0, 0, -10) to
        (-1.2, 0, -11): the camera's second segment travels straight down x = 0
        and flew through the pedestal, so the flacon was never framed and the
        gold disc filled the lower half of the shot. Here it sits where the
        camera is already looking as the segment opens.
      */}
      <group position={[-1.2, 0, -11]}>
        <mesh position={[0, 0.12, 0]} receiveShadow>
          <cylinderGeometry args={[2.0, 2.1, 0.24, 48]} />
          <meshStandardMaterial color={VERDE_DEEP} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.42, 0]} castShadow={high} receiveShadow>
          <cylinderGeometry args={[1.6, 1.8, 0.6, 48]} />
          <meshStandardMaterial color="#EDE5D8" roughness={0.3} map={marble} />
        </mesh>
        <mesh position={[0, 0.74, 0]}>
          <cylinderGeometry args={[1.62, 1.62, 0.05, 48]} />
          <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.2} />
        </mesh>

        {/*
          Floating Abstract Flacon. Enlarged from the specified 0.25 × 1.1, and
          the glass given a champagne attenuation: clear glass at that size,
          against an alabaster room, was effectively invisible — the object the
          whole stop is built around could not be seen.
        */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.4}>
          <mesh position={[0, 1.9, 0]} castShadow={high}>
            <cylinderGeometry args={[0.38, 0.38, 1.6, 48]} />
            <meshPhysicalMaterial
              transmission={0.95}
              roughness={0.08}
              thickness={1.6}
              ior={1.52}
              color="#FFFFFF"
              attenuationColor={GOLD}
              attenuationDistance={0.75}
              clearcoat={1}
              clearcoatRoughness={0.05}
            />
          </mesh>
          <mesh position={[0, 2.9, 0]} castShadow={high}>
            <cylinderGeometry args={[0.27, 0.27, 0.4, 48]} />
            <meshStandardMaterial color={GOLD} metalness={0.95} roughness={0.15} />
          </mesh>
        </Float>
      </group>

      {/*
        STOP 3: Consultation Alcove.

        Moved from the specified (-1.8, 2.5, -20) to the right-hand side of the
        corridor. The third segment's camera looks right as it opens, and at the
        original position the screen sat directly on the travel line: the camera
        ended up behind the glass and the entire chapter was filtered through
        it. Here it is a screened alcove the camera looks into, with a
        consultation table inside so the chapter has a subject.
      */}
      <group position={[2.6, 0, -24.5]}>
        <mesh position={[0, 2.5, 0]}>
          <boxGeometry args={[3.2, 5, 0.08]} />
          <meshPhysicalMaterial
            transmission={0.9}
            roughness={0.4}
            thickness={1.4}
            ior={1.45}
            color="#F2F6F3"
            attenuationColor="#BCD3C6"
            attenuationDistance={7}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh position={[0, 2.5, 0]}>
          <boxGeometry args={[3.24, 5.04, 0.04]} />
          <meshStandardMaterial color={GOLD} metalness={0.8} roughness={0.3} wireframe />
        </mesh>

        {/* The consultation itself, read as furniture behind the screen. */}
        <group position={[0.1, 0, -1.7]}>
          <mesh position={[0, 0.7, 0]} castShadow={high} receiveShadow>
            <cylinderGeometry args={[0.72, 0.72, 0.06, 40]} />
            <meshStandardMaterial color="#EDE6DB" roughness={0.4} map={marble} />
          </mesh>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.09, 0.13, 0.7, 24]} />
            <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.03, 0]}>
            <cylinderGeometry args={[0.44, 0.48, 0.06, 32]} />
            <meshStandardMaterial color={VERDE_DEEP} roughness={0.5} />
          </mesh>
          {[-1.35, 1.35].map((x) => (
            <group key={x} position={[x, 0, 0]}>
              <mesh position={[0, 0.42, 0]} castShadow={high} receiveShadow>
                <cylinderGeometry args={[0.42, 0.38, 0.22, 28]} />
                <meshStandardMaterial color={VERDE} roughness={0.7} />
              </mesh>
              <mesh position={[0, 0.16, 0]}>
                <cylinderGeometry args={[0.07, 0.09, 0.32, 20]} />
                <meshStandardMaterial color={GOLD} metalness={0.8} roughness={0.3} />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/*
        STOP 4: VIP Serenity Lounge — Arched Portal.

        Pushed back to z = -33.5 and the arch reduced from a 3.8 to a 2.4
        radius. At the specified size the camera finished six units from a
        7.6-unit-wide arch, so only its two legs were in frame and it read as a
        pair of dark stubs in the corners rather than a portal.
      */}
      <group position={[0, 0, -33.5]}>
        {/* A verde surround, so the arch is set into something */}
        <mesh position={[0, 2.6, -0.75]}>
          <planeGeometry args={[9, 6.4]} />
          <meshStandardMaterial color={VERDE_DEEP} roughness={0.7} />
        </mesh>

        {/* A softly luminous recess, so the arch frames somewhere rather than a
            blank wall. */}
        <mesh position={[0, 1.9, -0.6]}>
          <planeGeometry args={[4.6, 3.8]} />
          <meshStandardMaterial
            color="#FFF6E8"
            emissive="#F2E2C6"
            emissiveIntensity={0.85}
            roughness={1}
          />
        </mesh>

        <mesh position={[0, 2.2, 0]}>
          <torusGeometry args={[2.4, 0.24, 16, 64, Math.PI]} />
          <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.4, 0]} castShadow={high} receiveShadow>
          <boxGeometry args={[3.2, 0.6, 1.6]} />
          <meshStandardMaterial color="#EDE6DB" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.75, 0]}>
          <boxGeometry args={[3.0, 0.15, 1.4]} />
          <meshStandardMaterial color={VERDE} roughness={0.65} />
        </mesh>
      </group>
    </group>
  );
}
