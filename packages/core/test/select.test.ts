import createICStoreAndActions from "../src"

const mockActor = () => ({
  initialize: () => {},
  getChainId: () => {},
  getAccounts: () => {},
})

describe("#createICStoreAndActions", () => {
  test("uninitialized", () => {
    const [store] = createICStoreAndActions(mockActor)
    expect(store.getState()).toEqual({
      data: null,
      initialized: false,
      initializing: false,
      loading: false,
      error: null,
    })
  })
})
