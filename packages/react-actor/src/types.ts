import { ActorMethod, ActorSubclass } from "@dfinity/agent"

export type ExtractActorMethodArgs<T> = T extends ActorMethod<infer A>
  ? A
  : never
export type ExtractReturnType<T> = T extends ActorMethod<any, infer R>
  ? R
  : never

// Your existing types remain the same
export interface ICState<A extends ActorSubclass<any>> {
  actor: A | null
  data: any | null
  loading: boolean
  error: Error | null
}

export interface ICStateUpdate {
  data?: any
  loading?: boolean
  error?: Error
}

export type ICStore<A extends ActorSubclass<any>> = {
  actor: A | null
  data: any | null
  loading: boolean
  error: Error | null
}

// Adapt the ICActions to use Dfinity's ActorMethod
export interface ICActions<A extends ActorSubclass<any>> {
  startActivation: () => () => void
  resetState: () => void
  callActorMethod: <M extends keyof A>(
    method: M,
    ...args: ExtractActorMethodArgs<A[M]>
  ) => Promise<ExtractReturnType<A[M]>>
}
