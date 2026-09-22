import { motion } from 'motion/react';
import { SPRING_SNAPPY } from '../../motion/presets';

/**
 * Figma button. variant: 'gold' (default) | 'dark' | 'glass' | 'outline'.
 * Renders an <a> when href is given, otherwise a <button>.
 *   <Button onClick={…}>Book a Consultation</Button>
 *   <Button variant="glass" icon={<ArrowRight size={18} />}>Explore Treatments</Button>
 */
export default function Button({
  variant = 'gold',
  block = false,
  href,
  icon,
  className = '',
  children,
  type = 'button',
  ...rest
}) {
  const classes = `ap-btn ap-btn--${variant}${block ? ' ap-btn--block' : ''} ${className}`.trim();
  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { y: 0, scale: 0.985 },
    transition: SPRING_SNAPPY,
  };
  const content = (
    <>
      <span>{children}</span>
      {icon ? <span className="ap-btn__icon" aria-hidden="true">{icon}</span> : null}
    </>
  );
  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps} {...rest}>
        {content}
      </motion.a>
    );
  }
  return (
    <motion.button type={type} className={classes} {...motionProps} {...rest}>
      {content}
    </motion.button>
  );
}
