import createICStoreAndActions from "react-actor"
import { createActor } from "./candid"

export const [store, { resetState, useSelector, initialize, call }] =
  createICStoreAndActions(() => createActor("bd3sg-teaaa-aaaaa-qaaba-cai"))

export default store

export type RootState = (typeof store)["getState"] extends () => infer S
  ? S
  : never
