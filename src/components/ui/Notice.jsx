import { Info, TriangleAlert } from 'lucide-react';
import cx from '../../lib/cx';
import './Notice.css';

/**
 * Stone panel with a rule down its left edge (plan §8.6).
 * tone: 'info' (bronze rule) | 'important' (ink rule).
 */
export default function Notice({ tone = 'info', title, className, children, ...rest }) {
  const NoticeIcon = tone === 'important' ? TriangleAlert : Info;

  return (
    <aside className={cx('ap-notice', `ap-notice--${tone}`, className)} {...rest}>
      <NoticeIcon className="ap-notice__icon" aria-hidden="true" size={20} strokeWidth={1.25} absoluteStrokeWidth />
      <div className="ap-notice__body">
        {title && <p className="ap-notice__title">{title}</p>}
        {children}
      </div>
    </aside>
  );
}
