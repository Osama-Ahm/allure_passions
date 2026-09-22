import { Children, cloneElement, isValidElement } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_OUT, VIEWPORT } from './presets';

const wordVariants = {
  hidden: { y: '112%', rotate: 2.5 },
  show: (i) => ({
    y: '0%',
    rotate: 0,
    transition: { duration: 1.05, ease: EASE_OUT, delay: i.base + i.index * i.gap },
  }),
};

function splitChildren(children, state) {
  return Children.toArray(children).flatMap((child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return String(child)
        .split(/(\s+)/)
        .filter(Boolean)
        .map((part) => {
          if (/^\s+$/.test(part)) return ' ';
          const index = state.index++;
          return (
            <span className="ap-tr-word" key={`w${index}`}>
              <motion.span variants={wordVariants} custom={{ index, gap: state.gap, base: state.base }}>
                {part}
              </motion.span>
            </span>
          );
        });
    }
    if (isValidElement(child) && child.props.children != null) {
      return [cloneElement(child, { key: child.key ?? `e${state.index}` }, splitChildren(child.props.children, state))];
    }
    return [child];
  });
}

/**
 * Heading whose words rise out of a mask, one after another.
 * Nested elements keep their styling, e.g.
 *   <TextReveal as="h2" className="ap-h2">Start With What <em className="ap-accent">Matters to You</em></TextReveal>
 * By default it plays when scrolled into view; pass `play` (boolean) to control it yourself.
 */
export default function TextReveal({ as = 'h2', className, children, gap = 0.06, delay = 0, play, amount = 0.5, ...rest }) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }
  const Tag = motion[as] || motion.h2;
  const controlled = typeof play === 'boolean';
  const content = splitChildren(children, { index: 0, gap, base: delay });
  return (
    <Tag
      className={className}
      initial="hidden"
      {...(controlled
        ? { animate: play ? 'show' : 'hidden' }
        : { whileInView: 'show', viewport: { ...VIEWPORT, amount } })}
      {...rest}
    >
      {content}
    </Tag>
  );
}
