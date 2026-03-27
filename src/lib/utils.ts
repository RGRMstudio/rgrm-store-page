import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// This helps combine CSS styles so they don't fight each other
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// THE SLUG MAKER: Turns "Manifesto Poster" into "manifesto-poster"
export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word characters
    .replace(/--+/g, '-')     // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start of text
    .replace(/-+$/, '');      // Trim - from end of text
}
