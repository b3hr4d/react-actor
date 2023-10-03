import createICStoreAndActions from "react-actor"
import { createActor } from "./candid"

const [myStore, myActions] = createICStoreAndActions(() =>
  createActor("http://localhost:8080")
)

myStore.subscribe((state) => {
  console.log("state", state)
})
;(async () => {
  const cancelActivation = myActions.initialize()

  const key = await myActions.call("symmetric_key_verification_key")
  console.log("key", key)

  const userData = await myActions.call("anonymous_user", [])
  console.log("userData", userData)

  const timers = await myActions.call("timers")
  console.log("timers", timers)

  cancelActivation()
})()
