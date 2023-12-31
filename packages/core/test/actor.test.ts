import { Cbor } from "@dfinity/agent"
import { IDL } from "@dfinity/candid"
import fetchMock from "jest-fetch-mock"
import createICStoreAndActions from "../src"
import { createActor } from "./candid/hello"

fetchMock.enableMocks()

const canisterDecodedReturnValue = "Hello, World!"
const expectedReplyArg = IDL.encode([IDL.Text], [canisterDecodedReturnValue])

fetchMock.mockResponse(async (req) => {
  console.log("mockResponse", req.url.split("/").findLast((_) => _) ?? "")

  if (req.url.endsWith("/call")) {
    return Promise.resolve({
      status: 200,
    })
  }

  const responseObj = {
    status: "replied",
    reply: {
      arg: expectedReplyArg,
    },
    root_key: [
      48, 129, 130, 48, 29, 6, 13, 43, 6, 1, 4, 1, 130, 220, 124, 5, 3, 1, 2, 1,
      6, 12, 43, 6, 1, 4, 1, 130, 220, 124, 5, 3, 2, 1, 3, 97, 0, 152, 245, 4,
      39, 146, 174, 234, 225, 244, 127, 143, 22, 30, 244, 96, 2, 185, 106, 236,
      194, 117, 132, 255, 155, 140, 185, 7, 232, 134, 106, 159, 201, 151, 124,
      250, 187, 134, 24, 222, 199, 14, 102, 155, 207, 175, 235, 0, 227, 1, 25,
      5, 48, 61, 231, 72, 146, 168, 216, 60, 223, 174, 138, 180, 149, 247, 3,
      97, 218, 226, 71, 68, 160, 168, 2, 86, 197, 60, 84, 86, 174, 6, 208, 158,
      57, 110, 122, 8, 222, 41, 146, 247, 102, 75, 37, 145, 253,
    ],
  }

  return Promise.resolve({
    status: 200,
    body: Cbor.encode(responseObj),
  })
})

describe("CreateActor", () => {
  const [{ getState }, { initialize, call }] = createICStoreAndActions(() =>
    createActor("bd3sg-teaaa-aaaaa-qaaba-cai")
  )

  it("should initialize the actor", () => {
    initialize()

    expect(getState().initialized).toEqual(true)
  })

  it("should call the query method", async () => {
    const reply = await call("greet", "World")

    expect(reply).toEqual(canisterDecodedReturnValue)
    expect(getState().data).toEqual(canisterDecodedReturnValue)
  })

  it.skip("should call the update method", async () => {
    const replyUpdate = await call("greet_update", "World")

    expect(replyUpdate).toEqual(canisterDecodedReturnValue)
    expect(getState().data).toEqual(canisterDecodedReturnValue)
  })
})
