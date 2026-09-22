import { motion, useReducedMotion } from 'motion/react';
import { VIEWPORT, fadeUp, stagger, item, cardItem } from './presets';

const VARIANT_SETS = { up: fadeUp };

/**
 * Rises and fades its content in the first time it scrolls into view.
 *   <Reveal as="p" delay={0.1}>…</Reveal>
 */
export function Reveal({ as = 'div', delay = 0, variants, className, children, amount, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }
  return (
    <Tag
      className={className}
      variants={variants || VARIANT_SETS.up}
      initial="hidden"
      whileInView="show"
      viewport={amount ? { ...VIEWPORT, amount } : VIEWPORT}
      custom={delay}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Staggers direct <RevealItem> children as the group enters the viewport.
 *   <RevealGroup className="grid" gap={0.08}>{cards.map(c => <RevealItem key…/>)}</RevealGroup>
 */
export function RevealGroup({ as = 'div', gap = 0.09, delay = 0, className, children, amount, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }
  return (
    <Tag
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="show"
      viewport={amount ? { ...VIEWPORT, amount } : VIEWPORT}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Child of <RevealGroup>. variant="card" adds a gentle scale settle. */
export function RevealItem({ as = 'div', variant, className, children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }
  return (
    <Tag className={className} variants={variant === 'card' ? cardItem : item} {...rest}>
      {children}
    </Tag>
  );
}
