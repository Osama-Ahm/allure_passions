import cx from '../../lib/cx';
import './Typography.css';

/** Small uppercase label that introduces a section or group. */
export function Eyebrow({ as: Tag = 'p', className, children, ...rest }) {
  return (
    <Tag className={cx('ap-eyebrow', className)} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Display heading. `as` sets the semantic level, `size` the visual style,
 * so hierarchy and appearance can differ where a layout needs it.
 * size: 'xl' | 'l' | 'm' | 'title'
 */
export function Heading({ as: Tag = 'h2', size = 'l', className, children, ...rest }) {
  return (
    <Tag className={cx('ap-heading', `ap-heading--${size}`, className)} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Running text.
 * size: 'lede' | 'body' | 'small' · tone: 'strong' | 'muted'
 */
export function Text({ as: Tag = 'p', size = 'body', tone, className, children, ...rest }) {
  return (
    <Tag className={cx('ap-text', `ap-text--${size}`, tone && `ap-text--${tone}`, className)} {...rest}>
      {children}
    </Tag>
  );
}
