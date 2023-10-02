import { Actor, Cbor, HttpAgent } from "@dfinity/agent"
import { IDL } from "@dfinity/candid"
import { Principal } from "@dfinity/principal"
import fetchMock from "jest-fetch-mock"

fetchMock.enableMocks()

describe("makeActor", () => {
  const canisterDecodedReturnValue = "Hello, World!"
  const expectedReplyArg = IDL.encode([IDL.Text], [canisterDecodedReturnValue])

  fetchMock.mockResponse(async (req) => {
    console.log("mockResponse", req.url)
    if (req.url.endsWith("/call")) {
      return Promise.resolve({
        status: 202,
        statusText: "accepted",
      })
    } else {
      const responseObj = {
        status: "replied",
        reply: {
          arg: expectedReplyArg,
        },
      }

      // Simulate encoding the response as CBOR
      const cborData = Cbor.encode(responseObj)

      return Promise.resolve({
        status: 200,
        statusText: "ok",
        body: cborData,
      })
    }
  })

  const actorInterface = () => {
    return IDL.Service({
      greet: IDL.Func([IDL.Text], [IDL.Text], ["query"]),
      greet_update: IDL.Func([IDL.Text], [IDL.Text]),
    })
  }

  const agent = new HttpAgent({
    host: "http://localhost",
  })

  it("should call the actor method", async () => {
    const canisterId = Principal.fromText("2chl6-4hpzw-vqaaa-aaaaa-c")
    const actor = Actor.createActor(actorInterface, {
      canisterId,
      agent,
    })

    const reply = await actor.greet("test")

    expect(reply).toEqual(canisterDecodedReturnValue)

    // const replyUpdate = await actor.greet_update("test")
    // console.log("update-reply", replyUpdate)

    // expect(replyUpdate).toEqual(canisterDecodedReturnValue)
  })
})
