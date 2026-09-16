import cx from '../../lib/cx';
import './Icon.css';

/**
 * Thin line icon in the accent colour. Decorative unless a `label` is given.
 * icon: a lucide icon component
 */
export default function Icon({ icon: IconComponent, size = 20, label, className, ...rest }) {
  return (
    <IconComponent
      className={cx('ap-icon', className)}
      size={size}
      strokeWidth={1.25}
      absoluteStrokeWidth
      focusable="false"
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
      {...rest}
    />
  );
}
