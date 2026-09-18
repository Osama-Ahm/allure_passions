'use client';

import { Environment, Lightformer } from '@react-three/drei';

/**
 * A photographer's studio, baked once into the environment map: a large soft
 * box overhead, a tall window strip on the left that draws the long highlight
 * down the glass, a warm strip rim on the right and a low gold bounce. No HDR
 * file is downloaded.
 *
 * The rig never changes shape. Later chapters dim or warm it by intensity
 * only, so no shader ever has to recompile mid-scroll.
 */
export function Lighting() {
  return (
    <>
      <Environment resolution={256} frames={1}>
        <color attach="background" args={['#D9D7D3']} />
        <Lightformer form="rect" intensity={2.4} color="#FFFFFF" position={[0, 5, 1.5]} rotation-x={Math.PI / 2} scale={[7, 4, 1]} />
        <Lightformer form="rect" intensity={4} color="#FFFFFF" position={[-4, 1.4, 2]} rotation-y={Math.PI / 2.4} scale={[1.1, 6, 1]} />
        <Lightformer form="rect" intensity={1.6} color="#F6E8D2" position={[4, 1.2, -1.2]} rotation-y={-Math.PI / 2.2} scale={[0.5, 6, 1]} />
        <Lightformer form="rect" intensity={0.4} color="#EFE2C8" position={[0, -3, 2]} rotation-x={-Math.PI / 2} scale={[6, 3, 1]} />
      </Environment>

      <ambientLight intensity={0.2} color="#FFFFFF" />
      <directionalLight position={[-3, 5, 3]} intensity={1.4} color="#FFFAF3" />
      <directionalLight position={[4, 2, -3]} intensity={0.5} color="#F6E8D2" />
    </>
  );
}
