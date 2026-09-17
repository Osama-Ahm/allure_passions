'use client';

import { cx } from '@/lib/cx';
import { useConsultation } from './ConsultationProvider';

const VARIANTS = {
  solid:
    'bg-sanctuary-charcoal text-sanctuary-alabaster hover:bg-sanctuary-gold hover:text-white',
  outline:
    'border border-sanctuary-gold text-sanctuary-charcoal hover:bg-sanctuary-gold hover:text-white',
} as const;

/**
 * Opens the consultation enquiry. Lets a server-rendered section carry a
 * working call to action without becoming a client component itself.
 */
export function ConsultationButton({
  children,
  treatment,
  variant = 'solid',
  className,
}: {
  children: React.ReactNode;
  treatment?: string;
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  const { open } = useConsultation();

  return (
    <button
      type="button"
      onClick={() => open(treatment)}
      className={cx(
        'rounded-full px-6 py-3 font-sans text-xs uppercase tracking-widest transition-colors duration-300',
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </button>
  );
}
