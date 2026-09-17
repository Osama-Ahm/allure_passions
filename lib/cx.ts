import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Joins class names and lets a later Tailwind utility win over an earlier one. */
export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
