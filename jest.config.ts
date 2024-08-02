import type { Config } from "jest";

export default {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  coverageReporters: ["lcov"],
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
} satisfies Config;
