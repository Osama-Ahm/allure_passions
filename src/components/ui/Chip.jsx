import cx from '../../lib/cx';
import './Chip.css';

/**
 * Selectable pill. The caller supplies the selection semantics
 * (aria-pressed for toggles, role="radio" + aria-checked inside a radio group).
 * `as` makes it a link where the chip navigates rather than selects.
 */
export function Chip({ as: Element = 'button', selected = false, className, children, ...rest }) {
  const buttonProps = Element === 'button' ? { type: 'button' } : {};

  return (
    <Element className={cx('ap-chip', selected && 'is-selected', className)} {...buttonProps} {...rest}>
      {children}
    </Element>
  );
}

/** Non-interactive label, e.g. the concerns a treatment addresses. */
export function Tag({ as: Element = 'span', className, children, ...rest }) {
  return (
    <Element className={cx('ap-tag', className)} {...rest}>
      {children}
    </Element>
  );
}
