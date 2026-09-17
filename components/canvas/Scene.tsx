'use client';

import { Environment, Float, Lightformer, MeshReflectorMaterial } from '@react-three/drei';

/**
 * The virtual sanctuary, built entirely from Three.js primitives and physical
 * materials so the walkthrough carries no external 3D asset weight at all.
 *
 * The corridor runs from z = 0 at the entrance to z = -34 at the far portal,
 * and the camera travels it on scroll (see CameraController). The four stops
 * below sit at the z positions the camera's waypoints look towards.
 *
 * `quality` drops the costly work — mirror resolution, shadow casting — on
 * phones, where the reflective floor is what drops frames first.
 */
export function SanctuaryEnvironment({ quality }: { quality: 'high' | 'low' }) {
  const high = quality === 'high';
  const reflectorResolution = high ? 1024 : 512;

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
      <ambientLight intensity={0.55} color="#FFF8EE" />
      <directionalLight
        position={[8, 12, 5]}
        intensity={1.1}
        color="#FFF3E0"
        castShadow={high}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <pointLight position={[0, 4, -10]} intensity={1.5} color="#E5C992" distance={15} decay={2} />
      <pointLight position={[2, 3, -20]} intensity={1.2} color="#F9F6F0" distance={12} decay={2} />
      <pointLight position={[0, 3, -32]} intensity={1.8} color="#E5C992" distance={15} decay={2} />

      {/* Sanctuary Floor: Continuous Reflective Alabaster */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -15]} receiveShadow>
        <planeGeometry args={[40, 80]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={reflectorResolution}
          mirror={0.35}
          mixBlur={0.8}
          mixStrength={1.2}
          roughness={0.2}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#F4EFE6"
          metalness={0.1}
        />
      </mesh>

      {/* Ceiling Plane */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, -15]}>
        <planeGeometry args={[40, 80]} />
        <meshStandardMaterial color="#FAF7F2" roughness={0.9} />
      </mesh>

      {/*
        Side walls, turned inward to close the corridor. Not in the original
        specification, which left the space open at the sides: without them the
        camera sees past the columns into empty background on every sweep.
      */}
      {[-7, 7].map((x) => (
        <mesh
          key={x}
          position={[x, 3, -15]}
          rotation={[0, x < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
          receiveShadow
        >
          <planeGeometry args={[80, 6]} />
          <meshStandardMaterial color="#F4F0E8" roughness={0.95} />
        </mesh>
      ))}

      {/* Architectural Fluted Columns (Alabaster & Stone) */}
      {[-4, 4].map((x, i) => (
        <group key={i}>
          {[-5, -12, -19, -26].map((z, j) => (
            <mesh key={j} position={[x, 3, z]} castShadow={high} receiveShadow>
              <cylinderGeometry args={[0.45, 0.45, 6, 32]} />
              <meshStandardMaterial color="#EFE9DF" roughness={0.4} />
            </mesh>
          ))}
        </group>
      ))}

      {/* STOP 1: Grand Foyer Archway */}
      <mesh position={[0, 3, -3]}>
        <torusGeometry args={[3.2, 0.25, 16, 64, Math.PI]} />
        <meshStandardMaterial color="#C5A880" metalness={0.85} roughness={0.25} />
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
        <mesh position={[0, 0.3, 0]} castShadow={high} receiveShadow>
          <cylinderGeometry args={[1.6, 1.8, 0.6, 48]} />
          <meshStandardMaterial color="#EDE5D8" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.62, 0]}>
          <cylinderGeometry args={[1.62, 1.62, 0.05, 48]} />
          <meshStandardMaterial color="#C5A880" metalness={0.9} roughness={0.2} />
        </mesh>

        {/*
          Floating Abstract Flacon. Enlarged from the specified 0.25 × 1.1, and
          the glass given a champagne attenuation: clear glass at that size,
          against an alabaster room, was effectively invisible — the object the
          whole stop is built around could not be seen.
        */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.4}>
          <mesh position={[0, 1.75, 0]} castShadow={high}>
            <cylinderGeometry args={[0.38, 0.38, 1.6, 48]} />
            <meshPhysicalMaterial
              transmission={0.95}
              roughness={0.08}
              thickness={1.6}
              ior={1.52}
              color="#FFFFFF"
              attenuationColor="#C5A880"
              attenuationDistance={0.75}
              clearcoat={1}
              clearcoatRoughness={0.05}
            />
          </mesh>
          <mesh position={[0, 2.75, 0]} castShadow={high}>
            <cylinderGeometry args={[0.27, 0.27, 0.4, 48]} />
            <meshStandardMaterial color="#C5A880" metalness={0.95} roughness={0.15} />
          </mesh>
        </Float>
      </group>

      {/* STOP 3: Consultation Alcove — Frosted Partition */}
      <group position={[0, 2.5, -20]}>
        <mesh position={[-1.8, 0, 0]}>
          <boxGeometry args={[2.8, 5, 0.08]} />
          <meshPhysicalMaterial
            transmission={0.9}
            roughness={0.38}
            thickness={1.8}
            ior={1.45}
            color="#FAF7F2"
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh position={[-1.8, 0, 0]}>
          <boxGeometry args={[2.84, 5.04, 0.04]} />
          <meshStandardMaterial color="#C5A880" metalness={0.8} roughness={0.3} wireframe />
        </mesh>
      </group>

      {/*
        STOP 4: VIP Serenity Lounge — Arched Portal.

        Pushed back to z = -33 and the arch reduced from a 3.8 to a 2.9 radius.
        At the specified size the camera finished six units from a 7.6-unit-wide
        arch, so only its two legs were in frame and it read as a pair of dark
        stubs in the corners rather than a portal.
      */}
      <group position={[0, 0, -33.5]}>
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
          <meshStandardMaterial color="#C5A880" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.4, 0]} castShadow={high} receiveShadow>
          <boxGeometry args={[3.2, 0.6, 1.6]} />
          <meshStandardMaterial color="#EDE6DB" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.75, 0]}>
          <boxGeometry args={[3.0, 0.15, 1.4]} />
          <meshStandardMaterial color="#E2D8C9" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}
