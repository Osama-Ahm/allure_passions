import * as THREE from 'three';

/**
 * Light that adds to what is behind it: the beams, rings and fields of the
 * technology chapter.
 *
 * The canvas is transparent. These materials add colour but leave the alpha
 * untouched (colour One/One, alpha Zero/One), and the browser composites the
 * canvas premultiplied, so the glow adds onto the night page behind the canvas
 * exactly as light would. On cream it would vanish, which is why the energies
 * only ever appear in the dark chapter.
 */

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SHAPES = {
  /** A beam along a plane's length: a hot core with a soft halo, faded at both ends. */
  beam: /* glsl */ `
    float across = 1.0 - abs(vUv.x * 2.0 - 1.0);
    float core = pow(across, 8.0);
    float halo = pow(across, 1.6) * 0.3;
    float along = smoothstep(0.0, 0.18, vUv.y) * smoothstep(1.0, 0.82, vUv.y);
    float shape = (core + halo) * along;
  `,
  /** A round glow on a plane, bright in the middle. */
  disc: /* glsl */ `
    float d = length(vUv - 0.5) * 2.0;
    float shape = pow(max(0.0, 1.0 - d), 2.6);
  `,
  /** Flat colour, for thin lines and tubes. */
  line: /* glsl */ `
    float shape = 1.0;
  `,
} as const;

export type GlowShape = keyof typeof SHAPES;

export function createGlowMaterial(color: THREE.ColorRepresentation, shape: GlowShape = 'beam') {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: 0 },
    },
    vertexShader: VERTEX,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uIntensity;
      varying vec2 vUv;
      void main() {
        ${SHAPES[shape]}
        gl_FragColor = vec4(uColor * shape * uIntensity, 0.0);
      }
    `,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    side: THREE.DoubleSide,
    blending: THREE.CustomBlending,
    blendEquation: THREE.AddEquation,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.OneFactor,
    blendSrcAlpha: THREE.ZeroFactor,
    blendDstAlpha: THREE.OneFactor,
  });
}

/** Sets a glow material's brightness. */
export function setGlow(material: THREE.Material | null | undefined, intensity: number) {
  if (material && 'uniforms' in material) (material as THREE.ShaderMaterial).uniforms.uIntensity.value = intensity;
}
