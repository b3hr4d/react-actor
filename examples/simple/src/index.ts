import createICStoreAndActions from "react-actor"
import { createActor } from "./candid"

const [myStore, myActions] = createICStoreAndActions(() =>
  createActor("http://localhost:8000")
)

myStore.subscribe((state) => {
  console.log("state", state)
})
;(async () => {
  const cancelActivation = myActions.startActivation()

  const key = await myActions.callActorMethod("symmetric_key_verification_key")
  console.log("key", key)

  const userData = await myActions.callActorMethod("anonymous_user", [])
  console.log("userData", userData)

  const timers = await myActions.callActorMethod("timers")
  console.log("timers", timers)

  cancelActivation()
})()
