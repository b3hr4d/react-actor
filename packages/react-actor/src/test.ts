import { backend } from "./candid"
import { ExtractActorMethodArgs, ExtractReturnType } from "./types"

type MyActor = typeof backend

const testFunc = <K extends keyof MyActor>(
  method: K,
  args: ExtractActorMethodArgs<MyActor[K]>
): Promise<ExtractReturnType<MyActor[K]>> => {
  return (
    backend[method] as unknown as (
      args: ExtractActorMethodArgs<MyActor[K]>
    ) => Promise<ExtractReturnType<MyActor[K]>>
  )(args)
}

let data = testFunc("anonymous_user", [Uint8Array.from([])])

data.then((result) => {
  console.log(result.created_at)
})
