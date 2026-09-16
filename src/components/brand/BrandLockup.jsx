import cx from '../../lib/cx';
import './BrandLockup.css';

/**
 * AP monogram with the live-text wordmark.
 * size: 'sm' (header) | 'md' | 'lg' · showPlace adds "Fitzrovia · London" beneath the name.
 * Decorative by default: wrap it in a link with an accessible name where it navigates.
 */
export default function BrandLockup({ size = 'md', showPlace = true, className }) {
  return (
    <span className={cx('ap-brand', `ap-brand--${size}`, className)}>
      <img className="ap-brand__mark" src="/assets/brand/ap-monogram.png" alt="" width="195" height="240" />
      <span className="ap-brand__text">
        <span className="ap-brand__name">Allure Passions UK</span>
        {showPlace && <span className="ap-brand__place">Fitzrovia · London</span>}
      </span>
    </span>
  );
}
