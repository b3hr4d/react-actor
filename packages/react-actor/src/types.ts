import { ActorSubclass } from "@dfinity/agent"

// Define a generic ActorType
export type ActorType<S> = ActorSubclass<S>

// Define ActorMethod for a given ActorType
export type ActorMethod<A extends ActorType<any>> = keyof A

// Define ICState for a given ActorType
export interface ICState<A extends ActorType<any>> {
  actor: A | null
  data: any | null
  loading: boolean
  error: Error | null
}

// Define ICStateUpdate
export interface ICStateUpdate {
  data?: any
  loading?: boolean
  error?: Error
}

// Define ICStore for a given ActorType
export type ICStore<A extends ActorType<any>> = {
  (): ICState<A>
  subscribe: (subscription: (state: ICState<A>) => void) => () => void
  getState: () => ICState<A>
  setState: (newState: ICState<A> | ((state: ICState<A>) => ICState<A>)) => void
}

// Define ICActions for a given ActorType and ActorMethod
export interface ICActions<A extends ActorType<any>, M extends ActorMethod<A>> {
  startActivation: () => () => void
  update: (stateUpdate: ICStateUpdate) => void
  resetState: () => void
  callActorMethod: (method: M, ...args: any[]) => void
}
