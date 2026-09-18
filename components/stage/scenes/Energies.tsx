'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { createGlowMaterial, setGlow } from '@/lib/scene/glow';
import { ORDER, clamp01, stage } from '@/lib/scene/stage';

/**
 * The six technologies, each as its own light or energy passing through the
 * crystal, in the order of content/treatments.ts. They are drawn in the
 * crystal's own frame (its centre at the origin, girdle radius ~0.3) and add
 * light onto the night page (lib/scene/glow.ts). None is a device, and none
 * claims a depth: they are how each technology behaves, not diagrams of it.
 *
 * Which one is showing follows the technology being read (the story's focus),
 * crossfading between neighbours as the copy scrolls.
 */

export const ENERGY_COLOURS = ['#F2E6FF', '#FFC04D', '#E8C27A', '#FFE8C2', '#F1E3C6', '#5BE39A'];

/** Shared with the crystal: how much each energy is showing, and the Emsculpt pulse. */
export const energy = { weights: [0, 0, 0, 0, 0, 0], squeeze: 0 };

const up = new THREE.Vector3(0, 1, 0);
const direction = new THREE.Vector3();

/** Places a unit beam group (two crossed planes, length along Y) between two points. */
function placeBeam(group: THREE.Object3D, from: THREE.Vector3, to: THREE.Vector3, width: number) {
  direction.subVectors(to, from);
  const length = direction.length();
  group.position.addVectors(from, to).multiplyScalar(0.5);
  group.quaternion.setFromUnitVectors(up, direction.normalize());
  group.scale.set(width, length, width);
}

/** A beam: two crossed planes, so it has body from any angle. */
function Beam({
  from,
  to,
  width,
  material,
  plane,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  width: number;
  material: THREE.Material;
  plane: THREE.PlaneGeometry;
}) {
  const ref = useRef<THREE.Group>(null);
  useEffect(() => {
    if (ref.current) placeBeam(ref.current, from, to, width);
  }, [from, to, width]);
  return (
    <group ref={ref}>
      <mesh geometry={plane} material={material} />
      <mesh geometry={plane} material={material} rotation-y={Math.PI / 2} />
    </group>
  );
}

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/** A pulse that snaps on and decays, `rate` times a second. */
const strobe = (time: number, rate: number, sharpness = 10) => Math.pow(1 - ((time * rate) % 1), sharpness);

export function Energies() {
  const plane = useMemo(() => new THREE.PlaneGeometry(1, 1), []);
  const needle = useMemo(() => new THREE.CylinderGeometry(0.0025, 0.0012, 0.1, 6), []);
  const ring = useMemo(() => new THREE.TorusGeometry(1, 0.0028, 6, 128), []);

  // One material per role, so each energy's brightness is one uniform.
  const m = useMemo(
    () => ({
      picoBeam: createGlowMaterial(ENERGY_COLOURS[0]),
      picoDust: createGlowMaterial('#F4D9A8', 'disc'),
      advAmber: createGlowMaterial('#FFC04D'),
      advRose: createGlowMaterial('#D6565E'),
      morphNeedles: createGlowMaterial('#E8C27A', 'line'),
      morphTips: createGlowMaterial('#FFE0A0', 'disc'),
      morphHeat: createGlowMaterial('#E8A868', 'disc'),
      sofBand: createGlowMaterial('#FFE3B0', 'disc'),
      emsField: createGlowMaterial('#F1E3C6', 'line'),
      emerald: createGlowMaterial('#5BE39A'),
    }),
    []
  );

  // Each Sofwave ring fades on its own, so each has its own material.
  const ringMaterials = useMemo(() => Array.from({ length: 4 }, () => createGlowMaterial('#FFE8C2', 'line')), []);

  // Emsculpt Neo's field lines: dipole loops (r = L·sin²θ) around the crystal.
  const fieldLines = useMemo(
    () =>
      Array.from({ length: 6 }, (_, k) => {
        const phi = (k / 6) * Math.PI;
        const points: THREE.Vector3[] = [];
        for (let i = 0; i <= 48; i++) {
          const theta = 0.32 + (i / 48) * (Math.PI - 0.64);
          const r = 0.47 * Math.sin(theta) ** 2;
          points.push(v(r * Math.sin(theta) * Math.cos(phi), r * Math.cos(theta), r * Math.sin(theta) * Math.sin(phi)));
        }
        const loop = new THREE.CatmullRomCurve3([...points, ...points.slice(1, -1).reverse().map((p) => v(-p.x, p.y, -p.z))], true);
        return new THREE.TubeGeometry(loop, 160, 0.0028, 6, true);
      }),
    []
  );

  // PicoWay's pigment: five small clusters that shatter into dust on each pulse.
  const dust = useMemo(() => {
    const random = (() => {
      let a = 91;
      return () => {
        a = (a * 16807) % 2147483647;
        return a / 2147483647;
      };
    })();
    const clusters = Array.from({ length: 5 }, () => v((random() - 0.5) * 0.3, (random() - 0.5) * 0.22, (random() - 0.5) * 0.3));
    return Array.from({ length: 40 }, (_, i) => ({
      origin: clusters[i % 5],
      out: v(random() - 0.5, random() - 0.5, random() - 0.5).normalize(),
    }));
  }, []);

  useEffect(
    () => () => {
      plane.dispose();
      needle.dispose();
      ring.dispose();
      fieldLines.forEach((line) => line.dispose());
      Object.values(m).forEach((material) => material.dispose());
      ringMaterials.forEach((material) => material.dispose());
    },
    [plane, needle, ring, fieldLines, m, ringMaterials]
  );

  const groups = useRef<(THREE.Group | null)[]>([]);
  const dustRefs = useRef<(THREE.Mesh | null)[]>([]);
  const needles = useRef<THREE.Group>(null);
  const rings = useRef<(THREE.Mesh | null)[]>([]);
  const fan = useRef<THREE.Group>(null);
  const field = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = stage.reducedMotion ? 1.2 : stage.time;
    const focus = stage.focusChapter === 'treatments' ? stage.focus : -2;

    // How much each technology is showing: full when its copy is centred,
    // crossfading into its neighbours in between.
    for (let i = 0; i < 6; i++) {
      const weight = clamp01(1 - Math.abs(focus - i) * 1.4);
      energy.weights[i] = weight * weight * (3 - 2 * weight);
      const group = groups.current[i];
      if (group) group.visible = energy.weights[i] > 0.005;
    }
    const [pico, advatx, morpheus, sofwave, emsculpt, emerald] = energy.weights;

    // 0 · PicoWay: needle-fine pulses strike in; the pigment shatters to dust.
    if (pico > 0) {
      const pulse = strobe(time, 1.6);
      setGlow(m.picoBeam, pico * (0.2 + 1.8 * pulse));
      const burst = ((time * 1.6) % 1) ** 0.5;
      dust.forEach((particle, i) => {
        const mesh = dustRefs.current[i];
        if (!mesh) return;
        mesh.position.copy(particle.origin).addScaledVector(particle.out, 0.012 + burst * 0.09);
        mesh.quaternion.copy(state.camera.quaternion);
        mesh.scale.setScalar(0.016 * (1 - burst * 0.6));
      });
      setGlow(m.picoDust, pico * 0.75 * (1 - ((time * 1.6) % 1)));
    }

    // 1 · ADVATx: two wavelengths, amber and a deeper rose, bent by the stone.
    if (advatx > 0) {
      setGlow(m.advAmber, advatx * (0.9 + 0.12 * Math.sin(time * 3.1)));
      setGlow(m.advRose, advatx * (0.8 + 0.12 * Math.sin(time * 2.3 + 1.4)));
    }

    // 2 · Morpheus8: a grid of fine points presses in; heat blooms beneath.
    if (morpheus > 0) {
      const phase = (time * 0.7) % 1;
      const press = Math.sin(Math.PI * Math.min(1, phase * 1.6)) ** 2;
      if (needles.current) needles.current.position.y = 0.3 - press * 0.1;
      setGlow(m.morphNeedles, morpheus * 0.9);
      setGlow(m.morphTips, morpheus * (0.3 + 1.6 * press));
      setGlow(m.morphHeat, morpheus * 0.9 * press);
    }

    // 3 · Sofwave: rings of ultrasound converge on one plane inside.
    if (sofwave > 0) {
      rings.current.forEach((mesh, i) => {
        if (!mesh) return;
        const t = (time * 0.45 + i / 4) % 1;
        mesh.scale.setScalar(0.58 * (1 - t) + 0.05);
        setGlow(ringMaterials[i], sofwave * Math.sin(Math.PI * t) * 1.1);
      });
      setGlow(m.sofBand, sofwave * (0.55 + 0.25 * Math.sin(time * 2.2)));
    }

    // 4 · Emsculpt Neo: field lines pulse around it, and it contracts with them.
    const beat = Math.pow(0.5 + 0.5 * Math.sin(time * 4.2), 3);
    energy.squeeze = emsculpt * 0.03 * beat;
    if (emsculpt > 0) {
      setGlow(m.emsField, emsculpt * (0.25 + 0.9 * beat));
      if (field.current) field.current.rotation.y = time * 0.15;
    }

    // 5 · Emerald: a fan of fine green lines turning slowly through it.
    if (emerald > 0) {
      setGlow(m.emerald, emerald * 0.75);
      if (fan.current) fan.current.rotation.y = time * 0.35;
    }
  }, ORDER.energies);

  const apex = v(0.05, 1.05, 0.05);

  return (
    <group>
      {/* 0 · PicoWay */}
      <group ref={(el) => { groups.current[0] = el; }} visible={false}>
        <Beam from={v(0.62, 1.2, 0.25)} to={v(0, 0, 0)} width={0.03} material={m.picoBeam} plane={plane} />
        <Beam from={v(-0.2, 1.25, -0.4)} to={v(0.04, 0.02, 0)} width={0.018} material={m.picoBeam} plane={plane} />
        {dust.map((_, i) => (
          <mesh key={i} ref={(el) => { dustRefs.current[i] = el; }} geometry={plane} material={m.picoDust} />
        ))}
      </group>

      {/* 1 · ADVATx */}
      <group ref={(el) => { groups.current[1] = el; }} visible={false}>
        <Beam from={v(1.1, 0.85, 0.15)} to={v(0, 0.02, 0)} width={0.05} material={m.advAmber} plane={plane} />
        <Beam from={v(0, 0.02, 0)} to={v(-0.5, -0.78, 0.08)} width={0.04} material={m.advAmber} plane={plane} />
        <Beam from={v(1.15, 0.55, -0.12)} to={v(0.02, -0.05, 0)} width={0.05} material={m.advRose} plane={plane} />
        <Beam from={v(0.02, -0.05, 0)} to={v(-0.62, -0.95, -0.05)} width={0.04} material={m.advRose} plane={plane} />
      </group>

      {/* 2 · Morpheus8 */}
      <group ref={(el) => { groups.current[2] = el; }} visible={false}>
        <group ref={needles} position-y={0.3}>
          {Array.from({ length: 25 }, (_, i) => {
            const x = ((i % 5) - 2) * 0.034;
            const z = (Math.floor(i / 5) - 2) * 0.034;
            return (
              <group key={i} position={[x, 0, z]}>
                <mesh geometry={needle} material={m.morphNeedles} />
                <mesh geometry={plane} material={m.morphTips} position-y={-0.05} scale={0.035} rotation-x={-Math.PI / 2} />
              </group>
            );
          })}
        </group>
        <mesh geometry={plane} material={m.morphHeat} position-y={0.07} rotation-x={-Math.PI / 2} scale={0.42} />
      </group>

      {/* 3 · Sofwave */}
      <group ref={(el) => { groups.current[3] = el; }} visible={false} position-y={-0.02}>
        {Array.from({ length: 4 }, (_, i) => (
          <mesh
            key={i}
            ref={(el) => { rings.current[i] = el; }}
            geometry={ring}
            material={ringMaterials[i]}
            rotation-x={Math.PI / 2}
          />
        ))}
        <mesh geometry={plane} material={m.sofBand} rotation-x={-Math.PI / 2} scale={0.5} />
      </group>

      {/* 4 · Emsculpt Neo */}
      <group ref={(el) => { groups.current[4] = el; }} visible={false}>
        <group ref={field}>
          {fieldLines.map((line, i) => (
            <mesh key={i} geometry={line} material={m.emsField} />
          ))}
        </group>
      </group>

      {/* 5 · Emerald Laser */}
      <group ref={(el) => { groups.current[5] = el; }} visible={false}>
        <group ref={fan}>
          {Array.from({ length: 10 }, (_, i) => {
            const a = (i / 10) * Math.PI * 2;
            return (
              <Beam
                key={i}
                from={apex}
                to={v(Math.cos(a) * 0.5, -0.55, Math.sin(a) * 0.5)}
                width={0.012}
                material={m.emerald}
                plane={plane}
              />
            );
          })}
        </group>
      </group>
    </group>
  );
}
