import createICStoreAndActions from "../src"

const createMockActorInitializer = () => {
  return {
    timers: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("Hello")
        }, 1000)
      })
    },
  }
}

// Mocked actorInitializer function for testing
function mockActorInitializer() {
  return createMockActorInitializer()
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
    cancelActivation() // Simulate cancellation
    const updatedState = store.getState()
    expect(updatedState.initialized).toBe(false)
    expect(updatedState.initializing).toBe(false)

    // Check that the actor is not initialized
    expect(actions.callActorMethod("timers")).rejects.toThrow(
      "Actor not initialized"
    )

    actions.startActivation()

    // Check that the actor works as expected
    expect(actions.callActorMethod("timers")).resolves.toBe("Hello")

    // Check that the actor works as expected
    expect(actions.useSelector((state) => state.data)).toBe("Hello")
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
