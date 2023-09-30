import { readdirSync } from "fs"
import { resolve } from "path"
import { check } from "typings-tester"

const tsDirectory = resolve(__dirname, "../../../examples")
// read the examples directory and get all the subdirectories
const examples = readdirSync(tsDirectory).filter((file: string) =>
  require("fs").statSync(`${tsDirectory}/${file}`).isDirectory()
)

describe("typings", () => {
  for (const example of examples) {
    test(`should compile and run "${tsDirectory}/${example}" without error`, () => {
      expect(() =>
        check(
          [`${tsDirectory}/${example}/src`],
          `${tsDirectory}/${example}/tsconfig.json`
        )
      ).not.toThrow()
    })
  }
})
