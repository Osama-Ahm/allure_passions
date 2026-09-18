import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// tailwind-merge only knows Tailwind's built-in font sizes. Without this it reads
// `text-label` as a colour, and a later `text-paper` silently removes it.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['label', 'display-giant', 'display-xl', 'display-lg', 'display-md', 'display-sm'] }],
    },
  },
});

/** Joins class names and lets a later Tailwind utility win over an earlier one. */
export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
