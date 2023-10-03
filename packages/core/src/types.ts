import { ActorMethod, ActorSubclass } from "@dfinity/agent"
import { StoreApi, UseBoundStore } from "zustand"

export type ExtractActorMethodArgs<T> = T extends ActorMethod<infer A>
  ? A
  : never

export type ExtractActorMethodReturnType<T> = T extends ActorMethod<
  any,
  infer R
>
  ? R
  : never

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

export type CallActorMethodType<A = Record<string, ActorMethod>> = <
  M extends keyof A
>(
  method: M,
  ...args: ExtractActorMethodArgs<A[M]>
) => Promise<ExtractActorMethodReturnType<A[M]>>

export type UseSelectorType = (fn: (state: ICState) => any) => any

// Adapt the ICActions to use Dfinity's ActorMethod
export interface ICActions<A extends ActorSubclass<any>> {
  readonly initialize: () => () => void
  readonly resetState: () => void
  readonly useSelector: UseSelectorType
  readonly call: CallActorMethodType<A>
}
export type ICStore = UseBoundStore<StoreApi<ICState>>
