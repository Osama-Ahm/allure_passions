import * as THREE from 'three';

/**
 * The signature transition: a shape resolves (or disappears) through soft
 * noise, with a thin champagne-gold edge where it is forming. Used wherever
 * two shapes cannot simply morph into each other.
 *
 * It is injected once, when the material first compiles, and driven by one
 * uniform, so a dissolve never recompiles a shader mid-scroll. Every dissolving
 * material shares one program (same cache key), each with its own amount.
 *
 * amount 0 = whole, 1 = gone.
 */
export type Dissolving<M extends THREE.Material> = M & { dissolve: { value: number } };

const NOISE = /* glsl */ `
  varying vec3 vDissolvePosition;
  uniform float uDissolve;
  uniform vec3 uDissolveEdge;
  float dissolveHash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float dissolveNoise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(dissolveHash(i + vec3(0, 0, 0)), dissolveHash(i + vec3(1, 0, 0)), f.x),
          mix(dissolveHash(i + vec3(0, 1, 0)), dissolveHash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(dissolveHash(i + vec3(0, 0, 1)), dissolveHash(i + vec3(1, 0, 1)), f.x),
          mix(dissolveHash(i + vec3(0, 1, 1)), dissolveHash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }
  float dissolveField(vec3 p) {
    return 0.62 * dissolveNoise(p * 9.0) + 0.38 * dissolveNoise(p * 23.0);
  }
`;

export function withDissolve<M extends THREE.MeshStandardMaterial>(material: M, edge = '#E9C98E'): Dissolving<M> {
  const dissolve = { value: 0 };
  const edgeColour = { value: new THREE.Color(edge) };

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uDissolve = dissolve;
    shader.uniforms.uDissolveEdge = edgeColour;

    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vDissolvePosition;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvDissolvePosition = position;');

    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${NOISE}`)
      .replace(
        '#include <clipping_planes_fragment>',
        `#include <clipping_planes_fragment>
        float dissolveValue = dissolveField(vDissolvePosition);
        if (uDissolve > 0.0 && dissolveValue < uDissolve * 1.08) discard;`
      )
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        float dissolveRim = uDissolve > 0.001 ? 1.0 - smoothstep(0.0, 0.07, dissolveValue - uDissolve * 1.08) : 0.0;
        totalEmissiveRadiance += uDissolveEdge * dissolveRim * 2.4;`
      );
  };
  // One program for every dissolving material.
  material.customProgramCacheKey = () => 'allure-dissolve';

  return Object.assign(material, { dissolve });
}
