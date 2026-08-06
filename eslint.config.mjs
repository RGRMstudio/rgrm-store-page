import { FlatCompat } from '@eslint/eslintrc';

// eslint-config-next@14 ships a legacy (eslintrc) config — bridge it to flat config.
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  ...compat.extends('next/core-web-vitals'),
  {
    rules: {
      // Add custom Bauhaus strictness rules here
      "@next/next/no-html-link-for-pages": "error",
    }
  },
  {
    // Ensure build artifacts are never linted
    ignores: [".next/*", "out/*", "build/*", "node_modules/*"]
  }
];
