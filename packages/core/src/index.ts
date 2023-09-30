import { ActorSubclass } from "@dfinity/agent" // Import from Dfinity
import { create, useStore } from "zustand"
import {
  CallActorMethodType,
  ExtractActorServiceType,
  ICState,
  UseSelectorType,
} from "./types"

const createICStoreAndActions = (actorInitializer: ActorSubclass<any>) => {
  type ServiceType = ExtractActorServiceType<
    ReturnType<typeof actorInitializer>
  >

  let actor: ServiceType | null = null

  const DEFAULT_STATE: ICState = {
    data: null,
    initialized: false,
    initializing: false,
    loading: false,
    error: null,
  }

  const store = create(() => DEFAULT_STATE)

  const startActivation = () => {
    store.setState({ initializing: true })

    try {
      actor = actorInitializer()

      update({ initialized: true, initializing: false })
    } catch (error) {
      console.error("Error in initializeActor:", error)

      update({ error, initializing: false })
    }

    return () => {
      actor = null
      resetState()
    }
  }

  const resetState = () => {
    store.setState(DEFAULT_STATE)
  }

  const update = (newState: Partial<ICState>) => {
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

  const useSelector: UseSelectorType = (fn) => {
    return useStore(store, fn)
  }

  return [
    store,
    { startActivation, useSelector, resetState, callActorMethod },
  ] as const
}

export default createICStoreAndActions
