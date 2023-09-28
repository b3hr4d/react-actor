# react-actor

This library provides a simple interface for interacting with a canister using the `zustand` library and strong types generated from the canister's Candid file.

## Installation

```
npm install react-actor
```

## Usage

### `useActor`

The `useActor` hook is used to interact with the canister. It returns an object with methods corresponding to the canister's methods.

```typescript
import { useActor } from "react-actor"

const { anonymous_user } = useActor()
const userData = await anonymous_user([1, 2, 3])
```

### `Actor` type

The `Actor` type is used to define the actor interface. It is generated from the canister's Candid file.

```typescript
import type { Actor } from "react-actor"

const actor: Actor = {
  anonymous_user: async (arg: [number[]]) => {
    // ...
  },
  // ...
}
```

### Types

The types used in the canister interface are exported from `types.ts`. They are generated from the canister's Candid file.

```typescript
import type { AnonymousUserData } from "react-actor"

const userData: AnonymousUserData = {
  texts: [1n, 2n, 3n],
  created_at: 123n,
  decryption_key: [],
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
