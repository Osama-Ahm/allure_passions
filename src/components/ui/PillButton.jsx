import { Link } from 'react-router';
import cx from '../../lib/cx';
import './PillButton.css';

const EXTERNAL_PROPS = { target: '_blank', rel: 'noopener noreferrer' };

export function ArrowGlyph({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" focusable="false">
      <path d="M1 7h12M8 2l5 5-5 5" />
    </svg>
  );
}

/**
 * The rounded button from the homepage design: a label beside a round arrow
 * that turns as bronze rises through the pill on hover.
 * Renders a router link (`to`), an anchor (`href`) or a button.
 * variant: 'dark' | 'light' | 'ghost' · size: 'md' | 'sm'
 */
export default function PillButton({ to, href, external = false, variant = 'dark', size = 'md', type = 'button', className, children, ...rest }) {
  const classes = cx('ap-pill-btn', `ap-pill-btn--${variant}`, size !== 'md' && `ap-pill-btn--${size}`, className);
  const content = (
    <>
      <span className="ap-pill-btn__label">{children}</span>
      <span className="ap-pill-btn__icon">
        <ArrowGlyph />
      </span>
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

  if (href) {
    return (
      <a href={href} className={classes} {...(external ? EXTERNAL_PROPS : {})} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
