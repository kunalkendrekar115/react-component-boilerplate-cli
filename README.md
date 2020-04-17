## React boilerplate component generator


This cli lets you to create react components with boilerplate code generation for imports, render and PropTypes , create respective scss and test file for component.

Create components based on the following structure 
- `new-component/index.jsx`
- `new-component/index.js`(optional)
- `new-component/index.scss` (optional)


  
### Installation
- `npm -g install react-component-boilerplate-cli`

### Usage
- Create functional components type using prompts: 
    - `crc` 
- Create Plain Component
   - `clr <ComponentName>`

- Create Component with scss and test file
   - `clr <ComponentName> scss test` 

- Create Component with props
   - `clr <ComponentName> props` 
  
You have to pass props in sequence separated by `-`: PropName-Type-isRequired-DefaultValue 
Type and isRequired  are optioanal arguments with default value `string` and  `Y` respectivly
if isRequired is passed `N` then default value to prop is assigned based on type of prop 

  Type crc -help for assist
