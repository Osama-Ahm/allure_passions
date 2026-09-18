'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// three.js and the scene load only in the browser, and only after the page's
// own HTML is on screen: the headline, not the canvas, is the first paint.
const Stage = dynamic(() => import('./Stage').then((module) => module.Stage), { ssr: false });

/**
 * Mounts the 3D stage where it can run. Without WebGL (or with ?stage=off, for
 * checking the fallback) the page keeps its line drawings instead.
 */
export function StageMount() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('stage') === 'off') return;
    try {
      const probe = document.createElement('canvas');
      const context = probe.getContext('webgl2') ?? probe.getContext('webgl');
      if (!context) return;
      // Hand the probe context back: browsers cap live WebGL contexts per page.
      context.getExtension('WEBGL_lose_context')?.loseContext();
      setEnabled(true);
    } catch {
      // No WebGL: the line drawings stay.
    }
  }, []);

  return enabled ? <Stage /> : null;
}
