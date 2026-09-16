import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../../lib/motion';
import { getReviews } from '../../../services/reviews';
import { ArrowLink, Container, Eyebrow, Heading, IconButton, Section } from '../../../components/ui';
import './PatientReviews.css';

/**
 * Block 6 (plan §6): the live rating on the left, a carousel of reviews on the
 * right. Nothing renders until a provider is connected, so no rating or quote
 * appears that isn't genuinely from Google (§8.11).
 */
export default function PatientReviews() {
  const { configured, rating, count, url, reviews } = getReviews();
  const trackRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const update = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      setEdges({ start: track.scrollLeft <= 1, end: track.scrollLeft >= maxScroll - 1 });
    };

    update();
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [reviews.length]);

  if (!configured && !url) return null;

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!track || !card) return;
    const step = card.getBoundingClientRect().width + Number.parseFloat(getComputedStyle(track).columnGap || '0');
    track.scrollBy({ left: direction * step, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <Section id="reviews" tone="stone" aria-labelledby="ap-reviews-title">
      <Container>
        <div className="ap-reviews">
          <div className="ap-reviews__summary">
            <Eyebrow>Patient reviews</Eyebrow>
            <Heading as="h2" size="l" id="ap-reviews-title">
              In our patients&rsquo; words
            </Heading>

            {configured && (
              <p className="ap-reviews__rating">
                <span className="ap-reviews__score ap-nums">{rating.toFixed(1)}</span>
                <span className="ap-reviews__stars" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} size={16} strokeWidth={1.25} absoluteStrokeWidth fill="currentColor" />
                  ))}
                </span>
                <span className="ap-visually-hidden">out of 5</span>
                <span className="ap-reviews__count">Based on {count} Google reviews</span>
              </p>
            )}

            {url && (
              <ArrowLink href={url} external>
                Read all reviews on Google
              </ArrowLink>
            )}
          </div>

          {reviews.length > 0 && (
            <div className="ap-reviews__carousel">
              <ul
                className="ap-reviews__track"
                ref={trackRef}
                tabIndex={0}
                role="group"
                aria-label="Patient reviews, scrollable"
              >
                {reviews.map((review) => (
                  <li className="ap-reviews__card" key={review.id}>
                    <blockquote className="ap-reviews__quote">
                      <p>{review.text}</p>
                    </blockquote>
                    <p className="ap-reviews__meta">
                      <span className="ap-reviews__author">{review.author}</span>
                      <span>
                        {review.date}
                        {review.treatment ? ` · ${review.treatment}` : ''}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>

              <div className="ap-reviews__controls">
                <IconButton icon={ChevronLeft} label="Previous reviews" onClick={() => scrollByCard(-1)} disabled={edges.start} />
                <IconButton icon={ChevronRight} label="More reviews" onClick={() => scrollByCard(1)} disabled={edges.end} />
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
