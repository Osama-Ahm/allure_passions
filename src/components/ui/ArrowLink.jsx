import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import cx from '../../lib/cx';
import './ArrowLink.css';

/** Text link with a trailing arrow. External links open in a new tab and show ↗. */
export default function ArrowLink({ to, href, external = false, className, children, ...rest }) {
  const Arrow = external ? ArrowUpRight : ArrowRight;
  const classes = cx('ap-arrow-link', external && 'ap-arrow-link--external', className);

  const content = (
    <>
      <span className="ap-arrow-link__label">{children}</span>
      <Arrow className="ap-arrow-link__icon" aria-hidden="true" size={16} strokeWidth={1.5} absoluteStrokeWidth />
      {external && <span className="ap-visually-hidden"> (opens in a new tab)</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} viewTransition className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}
