import * as THREE from 'three';

/**
 * The medallion's face, as a bump map: the monogram at the centre, the
 * clinic's name round the rim between two fine rings. White is raised. Drawn
 * on a canvas in the site's own Cormorant; the texture exists from the first
 * frame and is redrawn once the font and the monogram have loaded, so its
 * material never recompiles.
 *
 * It carries the clinic's name only, never an award's: there is no genuine
 * award artwork to reproduce (see content/credentials.ts).
 */
export function createEngraving() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;

  const ready = drawEngraving(canvas).then(() => {
    texture.needsUpdate = true;
  });

  return { texture, ready };
}

async function drawEngraving(canvas: HTMLCanvasElement) {
  const family =
    getComputedStyle(document.documentElement).getPropertyValue('--font-cormorant').trim() || 'Georgia, serif';
  await document.fonts.load(`500 52px ${family}`).catch(() => undefined);
  const monogram = await new Promise<HTMLImageElement | null>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = '/assets/brand/ap-monogram.png';
  });

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const size = canvas.width;
  const centre = size / 2;
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, size, size);

  // Two fine rings.
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 6;
  for (const radius of [size * 0.46, size * 0.36]) {
    ctx.beginPath();
    ctx.arc(centre, centre, radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  // The name, set round between them.
  const text = 'ALLURE PASSIONS UK  ·  FITZROVIA  ·  LONDON  ·  ';
  ctx.font = `500 52px ${family}`;
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const radius = size * 0.41;
  const step = (Math.PI * 2) / text.length;
  Array.from(text).forEach((ch, i) => {
    const angle = -Math.PI / 2 + i * step;
    ctx.save();
    ctx.translate(centre + Math.cos(angle) * radius, centre + Math.sin(angle) * radius);
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillText(ch, 0, 0);
    ctx.restore();
  });

  // The monogram, as a white silhouette.
  if (monogram) {
    const mark = document.createElement('canvas');
    const height = size * 0.44;
    const width = (height * monogram.width) / monogram.height;
    mark.width = Math.round(width);
    mark.height = Math.round(height);
    const markCtx = mark.getContext('2d')!;
    markCtx.imageSmoothingQuality = 'high';
    markCtx.drawImage(monogram, 0, 0, mark.width, mark.height);
    markCtx.globalCompositeOperation = 'source-in';
    markCtx.fillStyle = '#FFFFFF';
    markCtx.fillRect(0, 0, mark.width, mark.height);
    ctx.drawImage(mark, centre - width / 2, centre - height / 2);
  }
}
