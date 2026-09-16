import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { consultationCta } from '../../content/navigation';
import cx from '../../lib/cx';
import useMediaQuery from '../../lib/useMediaQuery';
import { whatsappHref } from '../../utils/contact';
import { Button } from '../ui';
import './QuickContactBar.css';

const COMPACT_QUERY = '(max-width: 74.99rem)';
const SHOW_AFTER = 520; // about one hero's worth of scrolling

/**
 * Optional slim contact bar for phones and tablets (plan §5.2): it appears once
 * the hero has scrolled away and steps aside as the footer arrives, so the two
 * fastest routes to the clinic are always a thumb away.
 */
export default function QuickContactBar() {
  const isCompact = useMediaQuery(COMPACT_QUERY);
  const [isPastHero, setPastHero] = useState(false);
  const [isFooterInView, setFooterInView] = useState(false);

  useEffect(() => {
    if (!isCompact) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      setPastHero(window.scrollY > SHOW_AFTER);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [isCompact]);

  useEffect(() => {
    if (!isCompact || !('IntersectionObserver' in window)) return undefined;

    // The footer carries its own contact details, so the bar gets out of its way.
    const footer = document.querySelector('.ap-footer');
    if (!footer) return undefined;

    const observer = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting));
    observer.observe(footer);
    return () => observer.disconnect();
  }, [isCompact]);

  if (!isCompact) return null;

  const isShown = isPastHero && !isFooterInView;

  return (
    <div className={cx('ap-quick-contact', isShown && 'is-shown')} aria-hidden={!isShown} inert={!isShown || undefined}>
      <Button className="ap-quick-contact__action" to={consultationCta.to} size="sm">
        {consultationCta.label}
      </Button>
      <Button
        className="ap-quick-contact__action ap-quick-contact__whatsapp"
        href={whatsappHref()}
        external
        variant="secondary"
        size="sm"
        icon={MessageCircle}
        iconPosition="start"
        aria-label="Message us on WhatsApp"
      >
        WhatsApp
      </Button>
    </div>
  );
}
