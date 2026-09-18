import * as THREE from 'three';

/**
 * Textures drawn on a canvas at runtime. The specification asks for zero
 * external 3D assets, and that has to cover images as well as models — so the
 * marble veining, the plaster grain and the floor's polish variation are all
 * generated here rather than downloaded.
 *
 * The generator is seeded, so the room looks the same on every load and
 * screenshots are comparable between builds.
 */

/** Small, fast, seeded PRNG. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function canvasOf(size: number) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  return { canvas, ctx: canvas.getContext('2d')! };
}

/**
 * Warm alabaster marble with soft clouding and a scatter of veins, a few of
 * them champagne rather than grey. Used as the floor's colour map so the
 * reflection has something to break up.
 */
export function createMarbleTexture(size = 1024) {
  const { canvas, ctx } = canvasOf(size);
  const rand = mulberry32(20260918);

  ctx.fillStyle = '#F2ECE1';
  ctx.fillRect(0, 0, size, size);

  // Clouding: overlapping soft blooms, alternately warmer and cooler.
  for (let i = 0; i < 150; i += 1) {
    const x = rand() * size;
    const y = rand() * size;
    const r = size * (0.04 + rand() * 0.22);
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, rand() > 0.5 ? 'rgba(226,217,203,0.40)' : 'rgba(255,253,249,0.45)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Veining.
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (let i = 0; i < 30; i += 1) {
    let x = rand() * size;
    let y = rand() * size;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const segments = 6 + Math.floor(rand() * 8);
    for (let s = 0; s < segments; s += 1) {
      const nx = x + (rand() - 0.5) * size * 0.34;
      const ny = y + (rand() - 0.5) * size * 0.34;
      ctx.quadraticCurveTo(x + (rand() - 0.5) * 90, y + (rand() - 0.5) * 90, nx, ny);
      x = nx;
      y = ny;
    }
    const champagne = rand() > 0.72;
    ctx.strokeStyle = champagne ? 'rgba(197,168,128,0.32)' : 'rgba(146,138,125,0.16)';
    ctx.lineWidth = champagne ? 0.7 + rand() * 1.1 : 0.5 + rand() * 1.9;
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}

/**
 * Greyscale polish variation for the floor's roughness map, so the mirror is
 * not uniformly sharp across forty metres of stone.
 */
export function createPolishTexture(size = 512) {
  const { canvas, ctx } = canvasOf(size);
  const rand = mulberry32(77712);

  ctx.fillStyle = '#4a4a4a';
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 90; i += 1) {
    const x = rand() * size;
    const y = rand() * size;
    const r = size * (0.06 + rand() * 0.24);
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    const tone = Math.floor(40 + rand() * 90);
    gradient.addColorStop(0, `rgba(${tone},${tone},${tone},0.5)`);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * Fine plaster grain, as a bump map for the walls and ceiling. Without it those
 * planes are perfectly flat and read as nothing at all.
 */
export function createPlasterTexture(size = 512) {
  const { canvas, ctx } = canvasOf(size);
  const rand = mulberry32(31337);

  const image = ctx.createImageData(size, size);
  for (let i = 0; i < image.data.length; i += 4) {
    const noise = 118 + rand() * 24;
    image.data[i] = noise;
    image.data[i + 1] = noise;
    image.data[i + 2] = noise;
    image.data[i + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);

  // A few broad trowel sweeps over the grain.
  ctx.globalAlpha = 0.16;
  for (let i = 0; i < 40; i += 1) {
    ctx.beginPath();
    ctx.ellipse(
      rand() * size,
      rand() * size,
      size * (0.05 + rand() * 0.2),
      size * (0.02 + rand() * 0.06),
      rand() * Math.PI,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = rand() > 0.5 ? '#ffffff' : '#9a9a9a';
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * A fluted column. The specification calls these "fluted" but describes a plain
 * cylinder, which is why every column read as the same featureless post: the
 * flutes are what catch the light and tell one column from the next.
 *
 * The profile is a circle whose radius is modulated by a cosine, extruded along
 * the column's height.
 */
export function createFlutedColumnGeometry(
  radius = 0.45,
  height = 6,
  flutes = 24,
  fluteDepth = 0.035
) {
  const shape = new THREE.Shape();
  const steps = flutes * 8;

  for (let i = 0; i <= steps; i += 1) {
    const theta = (i / steps) * Math.PI * 2;
    const r = radius - fluteDepth * (0.5 + 0.5 * Math.cos(flutes * theta));
    const x = Math.cos(theta) * r;
    const y = Math.sin(theta) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: height,
    bevelEnabled: false,
    steps: 1,
    curveSegments: 1,
  });

  // Extrusion runs along +Z; stand it up and centre it on the origin.
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(0, -height / 2, 0);
  geometry.computeVertexNormals();

  return geometry;
}

/**
 * Fine vertical ridges for the bottle collar's bump map: the knurling on a
 * dropper collar, which catches the light as a row of tiny highlights.
 */
export function createKnurlTexture(ridges = 96) {
  const { canvas, ctx } = canvasOf(256);
  const gradient = ctx.createLinearGradient(0, 0, 256 / ridges, 0);
  gradient.addColorStop(0, '#000');
  gradient.addColorStop(0.5, '#fff');
  gradient.addColorStop(1, '#000');
  for (let i = 0; i < ridges; i += 1) {
    ctx.save();
    ctx.translate((i * 256) / ridges, 0);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256 / ridges, 256);
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}
