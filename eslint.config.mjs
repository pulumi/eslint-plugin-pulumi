import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["coverage/**/*", "dist/**/*", "ci-scripts/**/*"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
];
