'use client';

import { HallwayExperience } from '@/components/sections/HallwayExperience';
import { useReducedMotion, useWebGLSupport } from '@/lib/useEnvironment';

/**
 * Chooses between the hallway and the flat page.
 *
 * Both probes start at their "no capability" value, so the server render and
 * the first client render produce the flat page. That is deliberate: it is
 * what search engines are served, what anyone without WebGL gets, and what
 * anyone who has asked for reduced motion keeps. The walk is an upgrade
 * applied afterwards, never a requirement.
 */
export function LandingExperience({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const webgl = useWebGLSupport();

  const immersive = webgl === true && !reducedMotion;

  if (!immersive) return <>{children}</>;

  return <HallwayExperience />;
}
