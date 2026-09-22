import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { EASE_INOUT, EASE_OUT, VIEWPORT } from './presets';

/**
 * Picture that opens out of its frame (clip wipe) while settling from a zoom,
 * with optional scroll parallax. The frame fills its parent box; size it with className.
 *   <RevealImage className="card__media" src="/assets/…" alt="…" parallax={0.06} />
 *
 * The in-view check watches the unclipped frame: Chrome's IntersectionObserver
 * honours an element's own clip-path, so a fully clipped element never "enters".
 */
export default function RevealImage({
  src,
  alt = '',
  className = '',
  imgClassName,
  parallax = 0,
  delay = 0,
  radius = 16,
  direction = 'up',
  position,
  loading = 'lazy',
  sizes,
  srcSet,
  children,
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, VIEWPORT);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const shift = useTransform(scrollYProgress, [0, 1], [`${-parallax * 100}%`, `${parallax * 100}%`]);

  const from =
    direction === 'left'
      ? `inset(0% 100% 0% 0% round ${radius}px)`
      : direction === 'right'
        ? `inset(0% 0% 0% 100% round ${radius}px)`
        : `inset(100% 0% 0% 0% round ${radius}px)`;
  const to = `inset(0% 0% 0% 0% round ${radius}px)`;
  const imgStyle = position ? { objectPosition: position } : undefined;

  if (reduce) {
    return (
      <div ref={ref} className={`ap-media ${className}`} style={{ borderRadius: radius }}>
        <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} loading={loading} decoding="async" className={imgClassName} style={imgStyle} />
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={`ap-media ${className}`} style={{ borderRadius: radius }}>
      <motion.div
        className="ap-media__clip"
        initial={{ clipPath: from }}
        animate={inView ? { clipPath: to } : undefined}
        transition={{ duration: 1.2, ease: EASE_INOUT, delay }}
      >
        <motion.div
          className="ap-media__inner"
          style={parallax ? { y: shift, inset: `${-parallax * 100 - 2}% 0` } : { inset: 0 }}
        >
          <motion.img
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            loading={loading}
            decoding="async"
            className={imgClassName}
            style={imgStyle}
            initial={{ scale: 1.16 }}
            animate={inView ? { scale: 1 } : undefined}
            transition={{ duration: 1.7, ease: EASE_OUT, delay }}
          />
        </motion.div>
        {children}
      </motion.div>
    </div>
  );
}
