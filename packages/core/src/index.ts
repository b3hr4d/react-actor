import { ActorSubclass } from "@dfinity/agent" // Import from Dfinity
import { create, useStore } from "zustand"
import {
  CallActorMethodType,
  ExtractActorMethodArgs,
  ExtractActorMethodReturnType,
  ICActions,
  ICState,
  ICStore,
  UseSelectorType,
} from "./types"

function createICStoreAndActions<A extends ActorSubclass<any>>(
  actorInitializer: () => A
): [ICStore, ICActions<A>] {
  let actor: A | null = null

  const DEFAULT_STATE: ICState = {
    data: null,
    initialized: false,
    initializing: false,
    loading: false,
    error: null,
  }

  const store = create(() => DEFAULT_STATE)

  const initialize = () => {
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

  const call: CallActorMethodType<A> = async (method, ...args) => {
    if (!actor) {
      throw new Error("Actor not initialized")
    }

    update({ loading: true })

    try {
      if (!actor[method] || typeof actor[method] !== "function") {
        throw new Error(`Method ${String(method)} not found on actor`)
      }

      const actorMethod = actor[method] as (
        ...args: ExtractActorMethodArgs<A[typeof method]>
      ) => Promise<ExtractActorMethodReturnType<A[typeof method]>>

      const result = await actorMethod(...args)
      update({ data: result, loading: false })
      return result
    } catch (error) {
      update({ error, loading: false })
      throw error
    }
  }

  const useSelector: UseSelectorType = (fn) => {
    return useStore(store, fn)
  }

  return [store, { initialize, useSelector, resetState, call }]
}

export default createICStoreAndActions
