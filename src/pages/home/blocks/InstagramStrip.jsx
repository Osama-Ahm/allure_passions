import { Play } from 'lucide-react';
import { getInstagramFeed } from '../../../services/instagram';
import { ArrowLink, Container, Eyebrow, Heading, Section } from '../../../components/ui';
import './InstagramStrip.css';

/**
 * Block 7 (plan §6): the one image-led block on the page, deliberately kept to
 * a contained strip. Nothing renders until a provider is connected (R3).
 */
export default function InstagramStrip() {
  const { configured, handle, url, posts } = getInstagramFeed();

  if (!configured || posts.length === 0) return null;

  return (
    <Section id="instagram" spacing="compact" aria-labelledby="ap-instagram-title">
      <Container>
        <div className="ap-instagram__header">
          <div>
            <Eyebrow>{handle}</Eyebrow>
            <Heading as="h2" size="m" id="ap-instagram-title">
              Inside the clinic
            </Heading>
          </div>
          <ArrowLink href={url} external>
            Follow on Instagram
          </ArrowLink>
        </div>

        <ul className="ap-instagram__strip">
          {posts.slice(0, 6).map((post) => (
            <li className="ap-instagram__tile" key={post.id}>
              <a className="ap-instagram__link" href={post.href} target="_blank" rel="noopener noreferrer">
                <img src={post.image} alt={post.caption} loading="lazy" width="400" height="400" />
                {post.isReel && (
                  <span className="ap-instagram__badge">
                    <Play aria-hidden="true" size={14} strokeWidth={1.25} absoluteStrokeWidth fill="currentColor" />
                    <span className="ap-visually-hidden">Reel</span>
                  </span>
                )}
                <span className="ap-visually-hidden">: {post.caption} (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
