import { ImageIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import cx from '../../lib/cx';
import { useInView, useScrollProgress } from '../../lib/motion';
import './Media.css';

/**
 * A photograph slot from `content/media.js`. Tries the slot's file; if it is
 * not there yet, shows a labelled placeholder naming the slot, so the page
 * reads correctly while the imagery is being produced.
 *
 * `parallax` drifts the image inside its frame as the page scrolls.
 * `fill` lets the parent decide the size instead of the slot's ratio.
 * `reveal` draws a curtain off the frame the first time it scrolls into view.
 */
export default function Media({ slot, parallax = false, fill = false, reveal = true, priority = false, className, tone }) {
  const frameRef = useRef(null);
  const inView = useInView(frameRef, { threshold: 0.25 });
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useScrollProgress(parallax ? frameRef : NO_REF);

  return (
    <figure
      ref={frameRef}
      className={cx(
        'ap-media',
        parallax && 'ap-media--parallax',
        fill && 'ap-media--fill',
        loaded && 'is-loaded',
        failed && 'is-placeholder',
        reveal && 'ap-media--reveal',
        reveal && inView && 'is-revealed',
        className,
      )}
      style={fill ? undefined : { aspectRatio: slot.ratio }}
      data-media-tone={tone}
    >
      {failed ? (
        <div className="ap-media__placeholder" role="img" aria-label={slot.alt}>
          <span className="ap-media__placeholder-tag">
            <ImageIcon aria-hidden="true" size={14} strokeWidth={1.5} absoluteStrokeWidth />
            {slot.kind === 'real' ? 'Clinic photo needed' : 'Image placeholder'}
          </span>
          <span className="ap-media__placeholder-subject">{slot.subject}</span>
          <span className="ap-media__placeholder-file">{slot.id}.webp</span>
        </div>
      ) : (
        <img
          className="ap-media__img"
          src={slot.src}
          alt={slot.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          draggable="false"
          style={{ objectPosition: slot.position }}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
      {reveal && <span className="ap-media__curtain" aria-hidden="true" />}
    </figure>
  );
}

const NO_REF = { current: null };
