import { instagramFixture } from './fixtures';

/**
 * Instagram adapter (plan §9, Block 7). Until a provider is connected a
 * production build reports `configured: false` and the strip does not render,
 * so the page never shows an empty frame or sample posts (R3).
 */
const NOT_CONFIGURED = { configured: false, handle: null, url: null, posts: [] };

export function getInstagramFeed() {
  if (import.meta.env.DEV) return instagramFixture();
  return NOT_CONFIGURED;
}
