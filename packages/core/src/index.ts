import { ActorSubclass } from "@dfinity/agent" // Import from Dfinity
import { create, useStore } from "zustand"
import { CallActorMethodType, ExtractActorServiceType, ICState } from "./types"

function createICStoreAndActions<T extends () => ActorSubclass<any>>(
  actorInitializer: T
) {
  type ServiceType = ExtractActorServiceType<ReturnType<T>>
  let actor: ServiceType

  const DEFAULT_STATE: ICState = {
    data: null,
    initialized: false,
    initializing: false,
    loading: false,
    error: null,
  }

  const store = create(() => DEFAULT_STATE)

  function startActivation(): () => void {
    store.setState({ initializing: true })

    try {
      actor = actorInitializer()

      update({ initialized: true })
    } catch (error) {
      console.error("Error in initializeActor:", error)

      update({ error, initializing: false })
    }

    return () => {
      store.setState({ initializing: false })
    }
  }

  function resetState(): void {
    store.setState(DEFAULT_STATE)
  }

  function update(newState: Partial<typeof DEFAULT_STATE>): void {
    store.setState((state) => ({
      ...state,
      ...newState,
    }))
  }

  const callActorMethod: CallActorMethodType<ServiceType> = async (
    method,
    ...args
  ) => {
    if (!actor) {
      throw new Error("Actor not initialized")
    }

    update({ loading: true })

    try {
      const result = await actor[method](...args)
      update({ data: result, loading: false })
      return result
    } catch (error) {
      update({ error, loading: false })
      return error
    }
  }

  const useSelector = <K extends keyof typeof DEFAULT_STATE>(
    key: K
  ): (typeof DEFAULT_STATE)[K] => {
    return useStore(store, (state) => state[key])
  }

  return [
    store,
    { startActivation, useSelector, resetState, callActorMethod },
  ] as const
}

export default createICStoreAndActions
