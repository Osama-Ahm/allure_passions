import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { findConcern } from '../../content/concerns';
import { treatmentMedia } from '../../content/media';
import { treatmentPath } from '../../content/treatments';
import cx from '../../lib/cx';
import { trackPointer } from '../../lib/motion';
import useMediaQuery from '../../lib/useMediaQuery';
import Media from '../media/Media';
import Reveal from '../motion/Reveal';
import { Tag } from '../ui';
import './TreatmentIndex.css';

const PREVIEW_QUERY = '(min-width: 64rem) and (hover: hover) and (pointer: fine)';

/**
 * The numbered index of treatments (plan §6, Block 4). The whole row is the
 * link. Used on the homepage and on the treatments page, so the two can never
 * show a different list. On a desktop pointer, the treatment's image follows
 * the cursor while a row is hovered.
 */
export default function TreatmentIndex({ treatments, startAt = 1 }) {
  const showsPreview = useMediaQuery(PREVIEW_QUERY);
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className={cx('ap-index-wrap', hovered && 'is-previewing')}
      onPointerMove={showsPreview ? trackPointer : undefined}
      onPointerLeave={() => setHovered(null)}
    >
      <Reveal as="ol" stagger className="ap-index" start={startAt}>
        {treatments.map((treatment, index) => (
          <li className="ap-index__item" key={treatment.slug}>
            <Link
              className="ap-index__row"
              to={treatmentPath(treatment.slug)}
              viewTransition
              onPointerEnter={() => setHovered(treatment.slug)}
            >
              <span className="ap-index__number ap-nums" aria-hidden="true">
                {String(startAt + index).padStart(2, '0')}
              </span>
  
              <span className="ap-index__identity">
                <span className="ap-index__name">{treatment.name}</span>
                <span className="ap-index__type">{treatment.type}</span>
              </span>
  
              <span className="ap-index__about">
                <span className="ap-index__summary">{treatment.summary}</span>
                <span className="ap-index__tags">
                  {treatment.concerns.map((id) => (
                    <Tag key={id}>{findConcern(id).name}</Tag>
                  ))}
                </span>
              </span>
  
              <span className="ap-index__facts">
                <span className="ap-index__fact">{treatment.sessions}</span>
                <span className="ap-index__fact">{treatment.downtime}</span>
                <span className="ap-index__fact ap-nums">From {treatment.fromPrice}</span>
              </span>
  
              <ArrowRight className="ap-index__arrow" aria-hidden="true" size={20} strokeWidth={1.25} absoluteStrokeWidth />
            </Link>
          </li>
        ))}
      </Reveal>

      {showsPreview && (
        <div className="ap-index__preview" aria-hidden="true">
          {treatments.map((treatment) =>
            treatmentMedia[treatment.slug] ? (
              <Media
                key={treatment.slug}
                slot={treatmentMedia[treatment.slug]}
                fill
                reveal={false}
                className={cx('ap-index__preview-image', hovered === treatment.slug && 'is-active')}
              />
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}
