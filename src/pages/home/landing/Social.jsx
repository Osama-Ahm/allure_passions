import { getInstagramFeed } from '../../../services/instagram';
import { getReviews } from '../../../services/reviews';
import PillButton from '../../../components/ui/PillButton';
import './Social.css';

const STAR = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z" />
  </svg>
);

function Stars({ label }) {
  return (
    <span className="ap-stars" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {STAR}
      {STAR}
      {STAR}
      {STAR}
      {STAR}
    </span>
  );
}

/** Enough cards per column that the loop never shows a gap, however few reviews there are. */
function fillColumns(reviews, columns = 3, minimum = 4) {
  const pool = [];
  while (pool.length < columns * minimum) pool.push(...reviews);
  // Repeats are hidden from assistive tech, so each review is read out once.
  const cards = pool.map((review, index) => ({ review, isRepeat: index >= reviews.length }));
  return Array.from({ length: columns }, (_, column) => cards.filter((_, index) => index % columns === column));
}

function ReviewCard({ review, hidden }) {
  return (
    <article className="ap-review" aria-hidden={hidden || undefined}>
      <Stars />
      <p>{review.text}</p>
      <footer>
        <span className="ap-review__av" aria-hidden="true">
          {review.author[0]}
        </span>
        <span>
          {review.author}
          <small>{review.date}</small>
        </span>
        <span className="ap-review__src">Google</span>
      </footer>
    </article>
  );
}

/**
 * Patient reviews: three slowly moving columns beside the rating. Renders only
 * when a review provider is connected (services/reviews.js), so a production
 * build never shows a rating or words it cannot stand behind.
 */
export function Reviews() {
  const { configured, rating, count, url, reviews } = getReviews();
  if (!configured || reviews.length === 0) return null;

  const columns = fillColumns(reviews);

  return (
    <section className="ap-reviews" id="reviews" data-chapter="trust" aria-labelledby="ap-reviews-title">
      <div className="ap-wrap ap-reviews__grid">
        <div data-reveal>
          <p className="ap-dot-eyebrow">Patient reviews</p>
          <h2 className="ap-display ap-display--l" id="ap-reviews-title">
            In our patients&rsquo; <em>own words.</em>
          </h2>
          <p className="ap-lede ap-reviews__lede">Unedited reviews from our Google Business Profile, updated automatically.</p>
          <div className="ap-rating">
            <b className="ap-serif">{rating.toFixed(1)}</b>
            <Stars label={`Rated ${rating.toFixed(1)} out of 5`} />
            <span>Google rating · {count} reviews</span>
            <div className="ap-rating__actions">
              <a className="ap-line-link" href={url} target="_blank" rel="noopener noreferrer">
                Read all on Google ↗<span className="ap-visually-hidden"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>

        <div className="ap-walls" data-reveal style={{ '--d': '.1s' }}>
          {columns.map((column, index) => (
            <div className="ap-wall" key={index}>
              <div className="ap-wall__track" style={{ '--dur': `${38 + index * 9}s` }}>
                {column.map((card, row) => (
                  <ReviewCard key={`a-${row}`} review={card.review} hidden={card.isRepeat} />
                ))}
                {column.map((card, row) => (
                  <ReviewCard key={`b-${row}`} review={card.review} hidden />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Inside the clinic: a drifting strip of recent posts. Renders only once an
 * Instagram provider is connected (services/instagram.js).
 */
export function Instagram() {
  const { configured, handle, url, posts } = getInstagramFeed();
  if (!configured || posts.length === 0) return null;

  const tile = (post, hidden) => (
    <li key={`${hidden ? 'b' : 'a'}-${post.id}`} aria-hidden={hidden || undefined}>
      <a className="ap-post" href={post.href} target="_blank" rel="noopener noreferrer" data-cursor="Open" tabIndex={hidden ? -1 : undefined}>
        <img src={post.image} alt="" loading="lazy" decoding="async" />
        {post.isReel && (
          <span className="ap-post__type" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M3 1.5v9l7.5-4.5z" />
            </svg>
          </span>
        )}
        <span className="ap-post__over">{post.caption}</span>
        <span className="ap-visually-hidden"> (opens in a new tab)</span>
      </a>
    </li>
  );

  return (
    <section className="ap-insta" id="instagram" data-chapter="trust" aria-labelledby="ap-insta-title">
      <div className="ap-wrap ap-insta__head">
        <div data-reveal>
          <p className="ap-dot-eyebrow">Inside the clinic</p>
          <h2 className="ap-display ap-display--m" id="ap-insta-title">
            Follow along <em>{handle}</em>
          </h2>
        </div>
        <div data-reveal>
          <PillButton href={url} external variant="ghost">
            Follow on Instagram
          </PillButton>
        </div>
      </div>
      <ul className="ap-insta__strip">
        {posts.map((post) => tile(post, false))}
        {posts.map((post) => tile(post, true))}
      </ul>
    </section>
  );
}
