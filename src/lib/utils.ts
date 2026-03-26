import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// This helper makes Tailwind CSS classes easier to manage
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This helper turns titles into clean URLs
export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}
