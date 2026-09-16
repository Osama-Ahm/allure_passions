import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { findConcern } from '../../content/concerns';
import { treatmentPath } from '../../content/treatments';
import { Tag } from '../ui';
import './TreatmentIndex.css';

/**
 * The numbered index of treatments (plan §6, Block 4). The whole row is the
 * link. Used on the homepage and on the treatments page, so the two can never
 * show a different list.
 */
export default function TreatmentIndex({ treatments, startAt = 1 }) {
  return (
    <ol className="ap-index" start={startAt}>
      {treatments.map((treatment, index) => (
        <li className="ap-index__item" key={treatment.slug}>
          <Link className="ap-index__row" to={treatmentPath(treatment.slug)} viewTransition>
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
    </ol>
  );
}
