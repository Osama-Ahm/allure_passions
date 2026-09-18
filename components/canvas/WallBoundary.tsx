'use client';

import { Component, type ReactNode } from 'react';

/**
 * Keeps one bad wall from taking down the hallway.
 *
 * An uncaught throw inside the react-three-fiber subtree unmounts that whole
 * subtree, so a single failing panel blanked all ten. Each panel now sits
 * behind its own boundary: a wall that fails leaves an empty lit alcove and
 * the walk carries on.
 */
export class WallBoundary extends Component<
  { children: ReactNode; wallId: string },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    // Surfaced rather than swallowed: a blank alcove in production is a bug
    // someone needs to see.
    console.error('[hallway] wall "' + this.props.wallId + '" failed to render', error);
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
