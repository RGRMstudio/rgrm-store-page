import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.url,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allows you to use 'any' in webhook responses if necessary
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
