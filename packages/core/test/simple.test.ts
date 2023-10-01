import createICStoreAndActions from "../src"
import { createActor } from "./candid"

describe("My IC Store and Actions", () => {
  const [, myActions] = createICStoreAndActions(() =>
    createActor("mnrs5-4qaaa-aaaap-abc5a-cai")
  )

  afterAll(() => {
    myActions.resetState()
  })

  it("should return the symmetric key verification key", async () => {
    myActions.startActivation()

    const key = await myActions.callActorMethod(
      "symmetric_key_verification_key"
    )
    expect(key).toBeDefined()
  })

  it("should return anonymous user data", async () => {
    myActions.startActivation()

    const userData = await myActions.callActorMethod(
      "anonymous_user",
      Uint8Array.from([])
    )
    expect(userData).toBeDefined()
  })

  it("should return timers", async () => {
    myActions.startActivation()

    const timers = await myActions.callActorMethod("timers")
    expect(timers).toBeDefined()
  })
})
