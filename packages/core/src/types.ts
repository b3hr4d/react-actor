import { Actor, ActorMethod, ActorSubclass } from "@dfinity/agent"

export type ExtractActorMethodArgs<T> = T extends ActorMethod<infer A>
  ? A
  : never

export type ExtractActorMethodReturnType<T> = T extends ActorMethod<
  any,
  infer R
>
  ? R
  : never

export type ExtractActorServiceType<T> = T extends Actor & infer S ? S : never

export interface ICState {
  data: any | null
  loading: boolean
  initialized: boolean
  initializing: boolean
  error: Error | unknown | null
}

export interface ICStateUpdate {
  data?: any
  loading?: boolean
  error?: Error
}

export type ICStore<A> = {
  actor: A | null
  data: any | null
  loading: boolean
  error: Error | null
}

export type CallActorMethodType<A extends ActorSubclass<unknown>> = <
  M extends keyof A
>(
  method: M,
  ...args: ExtractActorMethodArgs<A[M]>
) => Promise<ExtractActorMethodReturnType<A[M]>>

// Adapt the ICActions to use Dfinity's ActorMethod
export interface ICActions<A extends ActorSubclass<unknown>> {
  startActivation: () => () => void
  resetState: () => void
  callActorMethod: CallActorMethodType<A>
}
