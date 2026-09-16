/**
 * Google reviews adapter (plan §9). Module 7 connects a provider; until one is
 * configured this reports `configured: false` and the UI shows no numbers, so
 * no rating is ever displayed that isn't live (§8.11, DMCC Act).
 */
export function getReviewsSummary() {
  return { configured: false, rating: null, count: null };
}
