# React Candid

React Candid is a library that provides a hook for calling functions defined in a Candid file. It consists of three packages:

- `candid-utils`: A package that provides utility functions for working with Candid files.
- `use-candid`: A package that provides the `useCandid` hook for calling functions defined in a Candid file.
- `react-candid`: A package that exports the `useCandid` hook and other public modules.

## Installation

To install React Candid, run the following command:

```
npm install react-candid
```

## Usage

To use the `useCandid` hook, import it from the `react-candid` package and call it with the Candid file and the function name as arguments. For example:

```jsx
import { useCandid } from 'react-candid';

function MyComponent() {
  const myFunction = useCandid('myFile.did', 'myFunction');
  // Call myFunction with arguments
  return <div>{/* ... */}</div>;
}
```

## Contributing

If you want to contribute to React Candid, please follow these steps:

1. Fork the repository and clone it to your local machine.
2. Install the dependencies by running `npm install` in the root directory.
3. Make your changes and write tests for them.
4. Run the tests by running `npm test` in the root directory.
5. Commit your changes and push them to your fork.
6. Create a pull request to the `main` branch of the original repository.

## License

React Candid is licensed under the MIT License. See the LICENSE file for more information.