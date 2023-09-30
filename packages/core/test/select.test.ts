import createICStoreAndActions from "../src"
import { createActor } from "./candid"
jest.mock("./candid")

// Mocked actorInitializer function for testing
function mockActorInitializer() {
  return createActor("canisterId")
}

describe("createICStoreAndActions", () => {
  it("should initialize the store with default state", () => {
    const [store] = createICStoreAndActions(mockActorInitializer)
    const state = store.getState()
    expect(state.data).toBeNull()
    expect(state.initialized).toBe(false)
    expect(state.initializing).toBe(false)
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
  })

  it("should start activation and initialize actor", () => {
    const [store, actions] = createICStoreAndActions(mockActorInitializer)
    const cancelActivation = actions.startActivation()
    const state = store.getState()
    expect(state.initializing).toBe(true)
    cancelActivation() // Simulate cancellation
    const updatedState = store.getState()
    expect(updatedState.initialized).toBe(true)
    expect(updatedState.initializing).toBe(false)

    // Check that the actor is initialized
    expect(actions.callActorMethod("timers")).toBeDefined()

    // Check that the actor works as expected
    expect(actions.callActorMethod("timers")).resolves.toBe("Hello")

    // Check that the actor works as expected
    expect(actions.callActorMethod("timers")).resolves.toBe("Hello")
  })

  it("should reset state to default", () => {
    const [store, actions] = createICStoreAndActions(mockActorInitializer)
    actions.resetState()
    const state = store.getState()
    expect(state.data).toBeNull()
    expect(state.initialized).toBe(false)
    expect(state.initializing).toBe(false)
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
  })

  // Add more test cases as needed
})
