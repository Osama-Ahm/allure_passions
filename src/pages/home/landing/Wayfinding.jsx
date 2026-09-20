import { useCallback, useEffect, useRef, useState } from 'react';
import { chapterIndex, chapters } from '../../../content/home';
import { consultationCta } from '../../../content/navigation';
import { prefersReducedMotion } from '../../../lib/motion';
import cx from '../../../lib/cx';
import PillButton from '../../../components/ui/PillButton';
import { clamp01, pad2, useScrollFrame } from './useLandingMotion';
import './Wayfinding.css';

const RING = 2 * Math.PI * 17;

/**
 * The chapter pill: once the hero has gone it rises from the foot of the
 * screen, naming the part of the story in view, with a ring for overall
 * progress and a way to ask for a consultation. It steps aside for the closing
 * chapter, which makes the same offer itself.
 */
export function ChapterPill({ rootRef }) {
  const [chapter, setChapter] = useState(0);
  const [isOn, setOn] = useState(false);
  const arcRef = useRef(null);

  const onScroll = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const viewport = window.innerHeight;
    const max = document.documentElement.scrollHeight - viewport;
    let current = 0;
    root.querySelectorAll('[data-chapter]').forEach((element) => {
      if (element.getBoundingClientRect().top < viewport * 0.55) current = chapterIndex[element.dataset.chapter];
    });
    const begin = root.querySelector('#begin');
    // Measured from the hero itself, which pins for several screens: the pill
    // waits until that whole sequence has gone by rather than a fixed screenful.
    const hero = root.querySelector('.ap-hero');
    const heroGone = hero ? hero.getBoundingClientRect().bottom < viewport * 0.1 : window.scrollY > viewport * 0.9;
    setChapter(current);
    setOn(heroGone && (!begin || begin.getBoundingClientRect().top > viewport * 0.6));
    if (arcRef.current) arcRef.current.style.strokeDashoffset = RING * (1 - clamp01(window.scrollY / (max || 1)));
  }, [rootRef]);
  useScrollFrame(onScroll);

  const { name, label } = chapters[chapter];

  return (
    <aside className={cx('ap-chapter-pill', isOn && 'is-on')} aria-label="Where you are on this page" inert={!isOn || undefined}>
      <span className="ap-chapter-pill__ring" aria-hidden="true">
        <svg viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="17" fill="none" stroke="rgb(255 255 255 / .15)" strokeWidth="2" />
          <circle ref={arcRef} cx="20" cy="20" r="17" fill="none" stroke="var(--color-champagne)" strokeWidth="2" strokeLinecap="round" strokeDasharray={RING} strokeDashoffset={RING} />
        </svg>
        <b>{pad2(chapter + 1)}</b>
      </span>
      <span className="ap-chapter-pill__label" aria-live="off">
        <small>{name}</small>
        <span>{label}</span>
      </span>
      <PillButton to={consultationCta.to} variant="light" size="sm">
        Enquire
      </PillButton>
    </aside>
  );
}

/**
 * A soft dot that trails the pointer and grows into a label over anything
 * marked `data-cursor` (Drag, View, Open). Fine pointers only; it is
 * decorative, and the real cursor stays visible underneath.
 */
export function Cursor() {
  const ref = useRef(null);
  const [enabled] = useState(
    () => typeof window !== 'undefined' && !prefersReducedMotion() && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  );

  useEffect(() => {
    const cursor = ref.current;
    if (!enabled || !cursor) return undefined;
    const label = cursor.firstElementChild;
    let target = { x: -100, y: -100 };
    let position = { x: -100, y: -100 };
    let frame = 0;

    const onMove = (event) => {
      target = { x: event.clientX, y: event.clientY };
      cursor.style.opacity = '1';
    };
    const onOver = (event) => {
      const labelled = event.target.closest?.('[data-cursor]');
      cursor.classList.toggle('is-label', Boolean(labelled));
      label.textContent = labelled ? labelled.dataset.cursor : '';
    };
    const onLeave = () => {
      cursor.style.opacity = '0';
    };
    const loop = () => {
      position = { x: position.x + (target.x - position.x) * 0.18, y: position.y + (target.y - position.y) * 0.18 };
      cursor.style.transform = `translate(${position.x}px, ${position.y}px)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.documentElement.addEventListener('pointerleave', onLeave);
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div className="ap-cursor" ref={ref} aria-hidden="true">
      <span />
    </div>
  );
}
