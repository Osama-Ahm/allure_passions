import { reviewsFixture } from './fixtures';

/**
 * Google reviews adapter (plan §9, Block 6).
 *
 * One async-shaped interface with a single source of truth for whether reviews
 * are live. No provider is connected yet, so a production build reports
 * `configured: false` and every place that would show a rating shows nothing —
 * never a number we cannot stand behind (§8.11, DMCC Act; R3).
 *
 * Connecting a provider means replacing the body of `getReviews`.
 */
const NOT_CONFIGURED = { configured: false, rating: null, count: null, url: null, reviews: [] };

export function getReviews() {
  if (import.meta.env.DEV) return reviewsFixture;
  return NOT_CONFIGURED;
}

/** Just the numbers, for the credentials ribbon. */
export function getReviewsSummary() {
  const { configured, rating, count, url } = getReviews();
  return { configured, rating, count, url };
}
