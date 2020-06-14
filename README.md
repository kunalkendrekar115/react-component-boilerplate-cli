## React boilerplate component generator

This cli lets you to create react components with boilerplate code generation for imports, render and PropTypes , you can create respective scss and test file for component.

Create components with below folder structure

- `ComponentName/index.jsx`
- `ComponentName/index.spec.js`(optional)
- `ComponentName/index.scss` (optional)

### Usage

- Create functional components type using prompts:
  - `crc`
- Create Plain Component

  - `crc <ComponentName>`

- Create Component with scss and test file

  - `crc <ComponentName> scss test`

- Create Component with props
  - `crc <ComponentName> props`

### Examples

- Create Component with jsx ,test and scss files

![screen recording](https://recordit.co/uhCdm5xzJT.gif)

- Create Component with props

![screen recording](https://recordit.co/P4A0bGbc2y.gif)

- Create Component with jsx body through emmet syntax (Cheat-Sheets: https://docs.emmet.io/cheat-sheet/)

![screen recording](https://recordit.co/CKjFHG0X7E.gif)

For scss files, its required to use react-css-module npm package

https://www.npmjs.com/package/react-css-modules#module-bundler

You have to pass props in sequence order separated by `-`: PropName-Type-isRequired-DefaultValue
Type and isRequired are optioanal arguments with default value `string` and `Y` respectivly
if isRequired is passed `N` then default value to prop is assigned based on type of prop

Type crc -help for assist
