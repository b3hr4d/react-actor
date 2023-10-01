import { Actor, Cbor, HttpAgent } from "@dfinity/agent"
import { IDL } from "@dfinity/candid"
import { Principal } from "@dfinity/principal"

describe("makeActor", () => {
  const canisterDecodedReturnValue = "Hello, World!"
  const expectedReplyArg = IDL.encode([IDL.Text], [canisterDecodedReturnValue])

  const mockFetch = jest.fn((resource) => {
    if (resource.endsWith("/call")) {
      return Promise.resolve(
        new Response(null, {
          status: 202,
          statusText: "accepted",
        })
      )
    }

    return Promise.resolve(
      new Response(
        Cbor.encode({
          status: "replied",
          reply: {
            arg: expectedReplyArg,
          },
        }),
        {
          status: 200,
          statusText: "ok",
        }
      )
    )
  })

  const actorInterface = () => {
    return IDL.Service({
      greet: IDL.Func([IDL.Text], [IDL.Text], ["query"]),
      greet_update: IDL.Func([IDL.Text], [IDL.Text]),
    })
  }

  const httpAgent = new HttpAgent({
    fetch: mockFetch,
    host: "http://localhost",
  })

  it("should call the actor method", async () => {
    const canisterId = Principal.fromText("2chl6-4hpzw-vqaaa-aaaaa-c")
    const actor = Actor.createActor(actorInterface, {
      canisterId,
      agent: httpAgent,
    })

    const reply = await actor.greet("test")

    console.log(reply)
    expect(reply).toEqual(canisterDecodedReturnValue)

    const replyUpdate = await actor.greet_update("test")
    console.log(replyUpdate)
    expect(replyUpdate).toEqual(canisterDecodedReturnValue)
  })
})
