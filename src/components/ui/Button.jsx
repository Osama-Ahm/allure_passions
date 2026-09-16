import { Link } from 'react-router';
import cx from '../../lib/cx';
import './Button.css';

const EXTERNAL_PROPS = { target: '_blank', rel: 'noopener noreferrer' };

/**
 * Renders a router link (`to`), an anchor (`href`) or a button.
 * variant: 'primary' | 'secondary' · size: 'md' | 'sm'
 * icon: a lucide icon component, shown after the label unless iconPosition="start".
 */
export function Button({
  to,
  href,
  external = false,
  variant = 'primary',
  size = 'md',
  icon: IconComponent,
  iconPosition = 'end',
  fullWidth = false,
  type = 'button',
  className,
  children,
  ...rest
}) {
  const classes = cx(
    'ap-button',
    `ap-button--${variant}`,
    size !== 'md' && `ap-button--${size}`,
    fullWidth && 'ap-button--full',
    IconComponent && `ap-button--icon-${iconPosition}`,
    className,
  );

  const icon = IconComponent && (
    <IconComponent className="ap-button__icon" aria-hidden="true" size={16} strokeWidth={1.5} absoluteStrokeWidth />
  );

  const content = (
    <>
      {iconPosition === 'start' && icon}
      <span className="ap-button__label">{children}</span>
      {iconPosition === 'end' && icon}
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

/** Round icon-only button; `label` is required for screen readers. variant: 'outline' | 'ghost' */
export function IconButton({ icon: IconComponent, label, variant = 'outline', size = 'md', className, ...rest }) {
  return (
    <button
      type="button"
      className={cx('ap-icon-button', `ap-icon-button--${variant}`, size !== 'md' && `ap-icon-button--${size}`, className)}
      aria-label={label}
      {...rest}
    >
      <IconComponent aria-hidden="true" size={18} strokeWidth={1.25} absoluteStrokeWidth />
    </button>
  );
}
