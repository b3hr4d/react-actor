import type { Config } from "@jest/types"
const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/lib/", "/dist/", "/docs/"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  bail: false,
  moduleDirectories: ["node_modules"],
  setupFiles: [`<rootDir>/test-setup.ts`],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.{ts,tsx}"],
  displayName: "e2e-node",
}

export default config
