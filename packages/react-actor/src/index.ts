import { ActorSubclass } from "@dfinity/agent" // Import from Dfinity
import { createStore } from "zustand"

export function createICStoreAndActions<A extends ActorSubclass>(
  actorInitializer: () => A
) {
  // Use keyof A for ActorMethod
  const actor = actorInitializer() // Initialize the actor here

  const DEFAULT_STATE = {
    actor,
    data: null,
    loading: false,
    error: null,
  }

  const store = createStore(() => DEFAULT_STATE)

  function startActivation(): () => void {
    store.setState({ loading: true })
    return () => {
      store.setState({ loading: false })
    }
  }

  function resetState(): void {
    store.setState(DEFAULT_STATE)
  }

  function callActorMethod<M extends keyof A>(
    method: M,
    ...args: ExtractActorMethodArgs<A[M]>
  ): Promise<ExtractReturnType<A[M]>> {
    const state = store.getState()

    if (!state.actor) {
      throw new Error("Actor not initialized")
    }

    return state.actor[method](...args)
      .then((result) => {
        // update({ data: result, loading: false })
        return result as ExtractReturnType<A[M]>
      })
      .catch((error) => {
        // update({ error, loading: false })
        return error
      })
  }

  return [store, { startActivation, resetState, callActorMethod }] as const
}

// Create store and actions

import { createActor } from "./candid"
import { ExtractActorMethodArgs, ExtractReturnType } from "./types"

// Example actor type

type MyActor = ReturnType<typeof createActor>

const [myStore, myActions] = createICStoreAndActions<MyActor>(() =>
  createActor("http://localhost:8000")
)

const cancelActivation = myActions.startActivation()

let key = myActions.callActorMethod("anonymous_user", [])

cancelActivation()
