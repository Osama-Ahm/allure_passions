import { ChevronsLeftRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion, useInView } from '../../lib/motion';
import Media from './Media';
import './BeforeAfter.css';

// The one-time "try me" sweep when the comparison first comes into view.
const DEMO_STOPS = [50, 28, 72, 50];
const DEMO_LEG_MS = 900;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Before/after comparison. Drag anywhere on the image, or use the slider with
 * the keyboard (arrow keys, Home, End) — it is a native range input underneath.
 * `demo` sweeps the divider once on first view unless the visitor has already
 * touched it, or prefers reduced motion.
 */
export default function BeforeAfter({ before, after, label, demo = true }) {
  const frameRef = useRef(null);
  const touched = useRef(false);
  const [position, setPosition] = useState(50);
  const [isDragging, setDragging] = useState(false);
  const inView = useInView(frameRef, { threshold: 0.6 });

  useEffect(() => {
    if (!demo || !inView || prefersReducedMotion()) return undefined;
    let frame = 0;
    const start = performance.now() + 400;
    const tick = (now) => {
      if (touched.current) return;
      const elapsed = (now - start) / DEMO_LEG_MS;
      const leg = Math.floor(elapsed);
      if (elapsed >= 0 && leg >= DEMO_STOPS.length - 1) {
        setPosition(DEMO_STOPS.at(-1));
        return;
      }
      if (elapsed >= 0) {
        const from = DEMO_STOPS[leg];
        const to = DEMO_STOPS[leg + 1];
        setPosition(from + (to - from) * easeInOutCubic(elapsed - leg));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [demo, inView]);

  const moveTo = useCallback((clientX) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition(Math.min(97, Math.max(3, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onPointerDown = (event) => {
    touched.current = true;
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
    moveTo(event.clientX);
  };

  const onPointerMove = (event) => {
    if (isDragging) moveTo(event.clientX);
  };

  const stopDragging = () => setDragging(false);

  return (
    <div
      ref={frameRef}
      className={`ap-compare${isDragging ? ' is-dragging' : ''}`}
      style={{ '--compare': `${position}%`, aspectRatio: after.ratio }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      <Media slot={after} fill reveal={false} tone="dark" className="ap-compare__layer" />
      <div className="ap-compare__before">
        <Media slot={before} fill reveal={false} tone="dark" className="ap-compare__layer ap-compare__layer--before" />
      </div>

      <span className={`ap-compare__tag ap-compare__tag--before${position < 18 ? ' is-covered' : ''}`} aria-hidden="true">
        Before
      </span>
      <span className={`ap-compare__tag ap-compare__tag--after${position > 82 ? ' is-covered' : ''}`} aria-hidden="true">
        After
      </span>

      <div className="ap-compare__divider" aria-hidden="true">
        <span className="ap-compare__handle">
          <ChevronsLeftRight size={18} strokeWidth={1.5} absoluteStrokeWidth />
        </span>
      </div>

      <input
        className="ap-compare__range"
        type="range"
        min="0"
        max="100"
        step="1"
        value={Math.round(position)}
        aria-label={label}
        aria-valuetext={`${Math.round(position)}% before, ${100 - Math.round(position)}% after`}
        onChange={(event) => {
          touched.current = true;
          setPosition(Number(event.target.value));
        }}
      />
    </div>
  );
}
