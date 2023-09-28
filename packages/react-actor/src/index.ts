import { createStore, StoreApi } from "zustand"
import type {
  ActorMethod,
  ActorType,
  ICActions,
  ICState,
  ICStateUpdate,
} from "./types"

export function createICStoreAndActions<A extends ActorType<any>>(
  actorInitializer: () => A
): [StoreApi<ICState<A>>, ICActions<A, ActorMethod<A>>] {
  const actor = actorInitializer() // Initialize the actor here

  const DEFAULT_STATE: ICState<A> = {
    actor,
    data: null,
    loading: false,
    error: null,
  }

  const store = createStore<ICState<A>>(() => DEFAULT_STATE)

  function startActivation(): () => void {
    store.setState({ loading: true })
    return () => {
      store.setState({ loading: false })
    }
  }

  function update(stateUpdate: ICStateUpdate): void {
    store.setState(stateUpdate)
  }

  function resetState(): void {
    store.setState(DEFAULT_STATE)
  }

  function callActorMethod(method: ActorMethod<A>, ...args: any[]): void {
    const state = store.getState()
    if (state.actor) {
      state.actor[method](...args)
        .then((result) => {
          update({ data: result, loading: false })
        })
        .catch((error) => {
          update({ error, loading: false })
        })
    }
  }

  return [store, { startActivation, update, resetState, callActorMethod }]
}

import { backend, createActor } from "./candid"

// Example actor type
type MyActor = typeof backend

// Create store and actions
const [myStore, myActions] = createICStoreAndActions<MyActor>(() =>
  createActor("http://localhost:8000")
)

// Use actions
const cancelActivation = myActions.startActivation()
myActions.callActorMethod("anonymous_user")
cancelActivation()
