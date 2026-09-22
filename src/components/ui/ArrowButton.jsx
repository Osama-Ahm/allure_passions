import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SPRING_SNAPPY } from '../../motion/presets';

const buttonVariants = { rest: { scale: 1 }, hover: { scale: 1.04 }, tap: { scale: 0.94 } };

/**
 * Figma carousel arrow: gold 64x62 square (or frosted glass over imagery).
 *   <ArrowButton dir="prev" onClick={prev} label="Previous result" />
 */
export default function ArrowButton({ dir = 'next', glass = false, label, className = '', ...rest }) {
  const Icon = dir === 'prev' ? ArrowLeft : ArrowRight;
  const nudge = dir === 'prev' ? -3 : 3;
  return (
    <motion.button
      type="button"
      className={`ap-arrow${glass ? ' ap-arrow--glass' : ''} ${className}`.trim()}
      aria-label={label || (dir === 'prev' ? 'Previous' : 'Next')}
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      transition={SPRING_SNAPPY}
      {...rest}
    >
      <motion.span
        style={{ display: 'inline-flex' }}
        variants={{ rest: { x: 0 }, hover: { x: nudge }, tap: { x: nudge } }}
        transition={SPRING_SNAPPY}
      >
        <Icon size={22} strokeWidth={1.75} />
      </motion.span>
    </motion.button>
  );
}
