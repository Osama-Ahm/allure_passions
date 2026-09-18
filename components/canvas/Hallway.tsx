'use client';

import { Environment, Lightformer, MeshReflectorMaterial } from '@react-three/drei';
import type * as THREE from 'three';
import { useEffect, useMemo } from 'react';
import {
  createFlutedColumnGeometry,
  createMarbleTexture,
  createPlasterTexture,
  createPolishTexture,
} from '@/lib/proceduralTextures';
import {
  CORRIDOR_END_Z,
  CORRIDOR_LENGTH,
  CORRIDOR_MID_Z,
  CORRIDOR_START_Z,
  PANEL_Y,
  WALL_X,
  stops,
  wallX,
  type WallSide,
} from '@/lib/hallway';

/**
 * The hallway: a long gallery corridor with a lit alcove on alternating walls.
 *
 * Everything is procedural — primitives, canvas-generated textures and physical
 * materials — so the walk carries no external asset weight.
 *
 * The walls are built as segments around each alcove rather than as one plane
 * with holes cut in it. More meshes, but every edge is a number you can read off
 * the plan, which matters when the alcove opening has to line up exactly with
 * the content hung inside it.
 */

const VERDE = '#2C4A3E';
const VERDE_DEEP = '#1C3229';
const GOLD = '#C5A880';

/** Alcove opening, in corridor-z and height. */
export const ALCOVE_W = 5.8;
export const ALCOVE_H = 3.0;
export const ALCOVE_DEPTH = 0.42;
const ALCOVE_BOTTOM = PANEL_Y - ALCOVE_H / 2;
const ALCOVE_TOP = PANEL_Y + ALCOVE_H / 2;

const WALL_H = 6;
// Kept below the alcove opening, which now starts at 0.45.
const DADO_H = 0.42;

/** Rotation that turns a plane to face into the corridor from a given wall. */
const facing = (side: WallSide): [number, number, number] => [
  0,
  side === 'left' ? Math.PI / 2 : -Math.PI / 2,
  0,
];

/** Nudge toward the corridor centre, to keep coplanar faces from z-fighting. */
const inward = (side: WallSide, amount: number) =>
  side === 'left' ? wallX(side) + amount : wallX(side) - amount;

function WallRun({
  side,
  plaster,
  high,
}: {
  side: WallSide;
  plaster: THREE.Texture;
  high: boolean;
}) {
  const alcoveZs = stops.filter((stop) => stop.side === side).map((stop) => stop.z);

  // The gaps of full-height wall between alcoves, from the corridor mouth to
  // its far end. Alcove z values descend, so the run is walked in that order.
  const segments: Array<{ from: number; to: number }> = [];
  let cursor = CORRIDOR_START_Z;
  for (const z of alcoveZs) {
    segments.push({ from: cursor, to: z + ALCOVE_W / 2 });
    cursor = z - ALCOVE_W / 2;
  }
  segments.push({ from: cursor, to: CORRIDOR_END_Z });

  const x = wallX(side);
  const rotation = facing(side);

  return (
    <group>
      {/* Full-height wall between the alcoves */}
      {segments.map(({ from, to }) => {
        const length = from - to;
        if (length <= 0.01) return null;
        const centre = (from + to) / 2;
        return (
          <mesh key={`run-${centre}`} position={[x, WALL_H / 2, centre]} rotation={rotation} receiveShadow>
            <planeGeometry args={[length, WALL_H]} />
            <meshStandardMaterial color="#EFE9DE" roughness={0.96} bumpMap={plaster} bumpScale={0.6} />
          </mesh>
        );
      })}

      {/* Wall above and below each alcove opening */}
      {alcoveZs.map((z) => (
        <group key={`surround-${z}`}>
          <mesh
            position={[x, ALCOVE_BOTTOM / 2, z]}
            rotation={rotation}
            receiveShadow
          >
            <planeGeometry args={[ALCOVE_W, ALCOVE_BOTTOM]} />
            <meshStandardMaterial color="#EFE9DE" roughness={0.96} bumpMap={plaster} bumpScale={0.6} />
          </mesh>
          <mesh
            position={[x, (ALCOVE_TOP + WALL_H) / 2, z]}
            rotation={rotation}
            receiveShadow
          >
            <planeGeometry args={[ALCOVE_W, WALL_H - ALCOVE_TOP]} />
            <meshStandardMaterial color="#EFE9DE" roughness={0.96} bumpMap={plaster} bumpScale={0.6} />
          </mesh>
        </group>
      ))}

      {/* Verde plinth, broken only by the alcoves, which start above it */}
      <mesh
        position={[inward(side, 0.02), DADO_H / 2, CORRIDOR_MID_Z]}
        rotation={rotation}
      >
        <planeGeometry args={[CORRIDOR_LENGTH, DADO_H]} />
        <meshStandardMaterial color={VERDE} roughness={0.55} metalness={0.04} />
      </mesh>
      <mesh position={[inward(side, 0.05), DADO_H + 0.035, CORRIDOR_MID_Z]}>
        <boxGeometry args={[0.06, 0.07, CORRIDOR_LENGTH]} />
        <meshStandardMaterial color={GOLD} metalness={0.8} roughness={0.28} />
      </mesh>

      {/* The alcoves themselves */}
      {alcoveZs.map((z) => (
        <Alcove key={`alcove-${z}`} side={side} z={z} high={high} />
      ))}
    </group>
  );
}

/**
 * A lit gallery alcove: a recess in the wall, a champagne reveal around the
 * opening and a warm wash down the back panel. The light is what lets the
 * content inside read as bright without looking pasted on.
 */
function Alcove({ side, z, high }: { side: WallSide; z: number; high: boolean }) {
  const x = wallX(side);
  const rotation = facing(side);
  const backX = side === 'left' ? x - ALCOVE_DEPTH : x + ALCOVE_DEPTH;
  const sign = side === 'left' ? -1 : 1;

  return (
    <group>
      {/* Back of the recess — the lit surface the content sits against */}
      <mesh position={[backX, PANEL_Y, z]} rotation={rotation} receiveShadow>
        <planeGeometry args={[ALCOVE_W, ALCOVE_H]} />
        <meshStandardMaterial
          color="#FBF7F0"
          emissive="#F6EEDF"
          emissiveIntensity={0.55}
          roughness={0.9}
        />
      </mesh>

      {/* Reveals: top, bottom and the two ends of the recess */}
      <mesh position={[x + (sign * ALCOVE_DEPTH) / 2, ALCOVE_TOP, z]} rotation={[0, 0, 0]}>
        <boxGeometry args={[ALCOVE_DEPTH, 0.02, ALCOVE_W]} />
        <meshStandardMaterial color="#F4EFE5" roughness={0.85} />
      </mesh>
      <mesh position={[x + (sign * ALCOVE_DEPTH) / 2, ALCOVE_BOTTOM, z]}>
        <boxGeometry args={[ALCOVE_DEPTH, 0.02, ALCOVE_W]} />
        <meshStandardMaterial color="#F4EFE5" roughness={0.85} />
      </mesh>
      {[-1, 1].map((end) => (
        <mesh
          key={end}
          position={[x + (sign * ALCOVE_DEPTH) / 2, PANEL_Y, z + (end * ALCOVE_W) / 2]}
        >
          <boxGeometry args={[ALCOVE_DEPTH, ALCOVE_H, 0.02]} />
          <meshStandardMaterial color="#F4EFE5" roughness={0.85} />
        </mesh>
      ))}

      {/* Champagne reveal framing the opening */}
      {[
        { pos: [inward(side, 0.01), ALCOVE_TOP + 0.04, z], args: [0.05, 0.08, ALCOVE_W + 0.16] },
        { pos: [inward(side, 0.01), ALCOVE_BOTTOM - 0.04, z], args: [0.05, 0.08, ALCOVE_W + 0.16] },
        {
          pos: [inward(side, 0.01), PANEL_Y, z - ALCOVE_W / 2 - 0.04],
          args: [0.05, ALCOVE_H + 0.16, 0.08],
        },
        {
          pos: [inward(side, 0.01), PANEL_Y, z + ALCOVE_W / 2 + 0.04],
          args: [0.05, ALCOVE_H + 0.16, 0.08],
        },
      ].map((bar, index) => (
        <mesh key={index} position={bar.pos as [number, number, number]}>
          <boxGeometry args={bar.args as [number, number, number]} />
          <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.25} />
        </mesh>
      ))}

      {/* The wash of light inside the recess */}
      <pointLight
        position={[inward(side, 1.1), ALCOVE_TOP - 0.25, z]}
        intensity={high ? 2.4 : 1.6}
        color="#FFF2DC"
        distance={6}
        decay={2}
      />
    </group>
  );
}

export function HallwayEnvironment({ quality }: { quality: 'high' | 'low' }) {
  const high = quality === 'high';

  const marble = useMemo(() => createMarbleTexture(high ? 1024 : 512), [high]);
  const polish = useMemo(() => createPolishTexture(high ? 512 : 256), [high]);
  const plaster = useMemo(() => createPlasterTexture(high ? 512 : 256), [high]);
  const columnGeometry = useMemo(() => createFlutedColumnGeometry(0.4, WALL_H, 24, 0.032), []);

  useMemo(() => {
    marble.repeat.set(5, 14);
    polish.repeat.set(4, 12);
    plaster.repeat.set(10, 1);
  }, [marble, polish, plaster]);

  useEffect(
    () => () => {
      marble.dispose();
      polish.dispose();
      plaster.dispose();
      columnGeometry.dispose();
    },
    [marble, polish, plaster, columnGeometry]
  );

  // Columns sit midway between alcoves so they never stand in front of content.
  const columnZs = useMemo(() => {
    const zs: number[] = [];
    for (let i = 0; i < stops.length - 1; i += 1) {
      zs.push((stops[i].z + stops[i + 1].z) / 2);
    }
    return zs;
  }, []);

  return (
    <group>
      {/* Procedural studio environment, baked once: the gold is metal and needs
          something to reflect or it renders near-black. */}
      <Environment resolution={high ? 256 : 128} frames={1}>
        <Lightformer
          form="rect"
          intensity={2.2}
          color="#FFF4E2"
          position={[0, WALL_H, CORRIDOR_MID_Z]}
          scale={[14, CORRIDOR_LENGTH, 1]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={1.1}
          color="#F6F1E7"
          position={[-8, 3, CORRIDOR_MID_Z]}
          scale={[CORRIDOR_LENGTH, 6, 1]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Lightformer
          form="rect"
          intensity={1.1}
          color="#F6F1E7"
          position={[8, 3, CORRIDOR_MID_Z]}
          scale={[CORRIDOR_LENGTH, 6, 1]}
          rotation={[0, -Math.PI / 2, 0]}
        />
      </Environment>

      <ambientLight intensity={0.5} color="#FFF8EE" />
      <directionalLight
        position={[8, 12, 5]}
        intensity={0.85}
        color="#FFF3E0"
        castShadow={high}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, CORRIDOR_MID_Z]} receiveShadow>
        <planeGeometry args={[2 * WALL_X, CORRIDOR_LENGTH]} />
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

      {/* Champagne inlay running the length of the walk */}
      {[-1.7, 1.7].map((x) => (
        <mesh key={x} position={[x, 0.004, CORRIDOR_MID_Z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.06, CORRIDOR_LENGTH - 2]} />
          <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.25} />
        </mesh>
      ))}

      {/* Ceiling, coffers and coves */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, WALL_H, CORRIDOR_MID_Z]}>
        <planeGeometry args={[2 * WALL_X, CORRIDOR_LENGTH]} />
        <meshStandardMaterial color="#FBF8F3" emissive="#EFE7DA" emissiveIntensity={0.35} roughness={0.95} bumpMap={plaster} bumpScale={0.35} />
      </mesh>
      {columnZs.map((z) => (
        <mesh key={`coffer-${z}`} position={[0, WALL_H - 0.18, z]}>
          <boxGeometry args={[2 * WALL_X - 0.4, 0.22, 0.5]} />
          <meshStandardMaterial color="#F3EDE3" roughness={0.9} />
        </mesh>
      ))}
      {[-(WALL_X - 0.4), WALL_X - 0.4].map((x) => (
        <mesh key={`cove-${x}`} position={[x, WALL_H - 0.28, CORRIDOR_MID_Z]}>
          <boxGeometry args={[0.16, 0.1, CORRIDOR_LENGTH - 1]} />
          <meshStandardMaterial
            color="#FFF6E6"
            emissive="#F0DDB8"
            emissiveIntensity={1.1}
            roughness={1}
          />
        </mesh>
      ))}

      <WallRun side="left" plaster={plaster} high={high} />
      <WallRun side="right" plaster={plaster} high={high} />

      {/* Fluted columns, set between the alcoves */}
      {columnZs.map((z) =>
        [-1, 1].map((dir) => (
          <group key={`col-${z}-${dir}`} position={[dir * (WALL_X - 1.1), 0, z]}>
            <mesh position={[0, 0.16, 0]} receiveShadow>
              <boxGeometry args={[0.96, 0.32, 0.96]} />
              <meshStandardMaterial color={VERDE} roughness={0.55} />
            </mesh>
            <mesh position={[0, 0.42, 0]} castShadow={high} receiveShadow>
              <cylinderGeometry args={[0.5, 0.54, 0.2, 32]} />
              <meshStandardMaterial color="#EDE7DC" roughness={0.45} />
            </mesh>
            <mesh geometry={columnGeometry} position={[0, 3.2, 0]} castShadow={high} receiveShadow>
              <meshStandardMaterial color="#F0EAE0" roughness={0.42} />
            </mesh>
            <mesh position={[0, WALL_H - 0.1, 0]}>
              <cylinderGeometry args={[0.46, 0.46, 0.06, 32]} />
              <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.22} />
            </mesh>
            <mesh position={[0, WALL_H + 0.06, 0]} castShadow={high}>
              <cylinderGeometry args={[0.54, 0.48, 0.26, 32]} />
              <meshStandardMaterial color="#EDE7DC" roughness={0.45} />
            </mesh>
          </group>
        ))
      )}

      {/* The far end of the walk: a champagne portal closing the corridor */}
      <group position={[0, 0, CORRIDOR_END_Z + 1]}>
        <mesh position={[0, 2.6, -0.5]}>
          <planeGeometry args={[2 * WALL_X, WALL_H]} />
          <meshStandardMaterial color={VERDE_DEEP} roughness={0.7} />
        </mesh>
        <mesh position={[0, 1.9, -0.4]}>
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
      </group>
    </group>
  );
}
