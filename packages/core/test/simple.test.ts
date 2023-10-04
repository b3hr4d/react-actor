import createICStoreAndActions from "../src"
import { createActor } from "./candid/backend"

describe("My IC Store and Actions", () => {
  const [, myActions] = createICStoreAndActions(() =>
    createActor("bd3sg-teaaa-aaaaa-qaaba-cai", {
      agentOptions: {
        host: "http://localhost:8080",
      },
    })
  )

  afterAll(() => {
    myActions.resetState()
  })

  it("should return the symmetric key verification key", async () => {
    myActions.initialize()

    const key = await myActions.call("symmetric_key_verification_key")
    expect(key).toBeDefined()
  })

  it("should return anonymous user data", async () => {
    myActions.initialize()

    const mockData = Uint8Array.from(Array(48).fill(0))
    const publicKey = Uint8Array.from(Array(48).fill(0))

    const index = await myActions.call("save_encrypted_text", mockData, [
      publicKey,
    ])

    expect(index).toBeDefined()

    const userData = await myActions.call("anonymous_user", publicKey)

    expect(userData).toBeDefined()
  })

  it("should return timers", async () => {
    myActions.initialize()

    const timers = await myActions.call("timers")
    expect(timers).toBeDefined()
  })
})
