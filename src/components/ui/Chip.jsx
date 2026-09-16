import cx from '../../lib/cx';
import './Chip.css';

/**
 * Selectable pill. The caller supplies the selection semantics
 * (aria-pressed for toggles, role="radio" + aria-checked inside a radio group).
 */
export function Chip({ selected = false, className, children, ...rest }) {
  return (
    <button type="button" className={cx('ap-chip', selected && 'is-selected', className)} {...rest}>
      {children}
    </button>
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
