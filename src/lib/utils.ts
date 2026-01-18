import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Bauhaus UI Utility
 * Combines Tailwind classes and handles conditional styling
 * for the thick black borders and primary color blocks.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
