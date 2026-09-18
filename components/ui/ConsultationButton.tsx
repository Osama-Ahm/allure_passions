'use client';

import { cx } from '@/lib/cx';
import { useConsultation } from './ConsultationProvider';

/** Both variants read the theme roles, so they work on cream and on night. */
const VARIANTS = {
  solid: 'bg-ink text-paper hover:bg-accent',
  outline: 'border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-paper',
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
        'rounded-full px-6 py-3.5 font-sans text-label uppercase transition-colors duration-300',
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </button>
  );
}
