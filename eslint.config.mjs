import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["coverage/**/*", "dist/**/*"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
];
