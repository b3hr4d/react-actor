import type { Config } from "jest"

const config: Config = {
  collectCoverageFrom: ["**/*.{js,jsx}"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
}

export default config
