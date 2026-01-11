import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  ...nextVitals,
  {
    rules: {
      // Add custom Bauhaus strictness rules here
      "@next/next/no-html-link-for-pages": "error",
    }
  },
  {
    // Ensure build artifacts are never linted
    ignores: [".next/*", "out/*", "build/*"]
  }
]);
