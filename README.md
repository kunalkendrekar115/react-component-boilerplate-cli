## React boilerplate component generator


This cli lets you to create react components with boilerplate code generation for imports, render and PropTypes , create respective scss and test file for component.

Create components with below folder structure 
- `ComponentName/index.jsx`
- `ComponentName/index.js`(optional)
- `ComponentName/index.scss` (optional)


  
### Installation
- `npm -g install react-component-boilerplate-cli`

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

- Create Component with scss & Testfile
![screen recording](http://g.recordit.co/IJFrpFGvTk.gif)


- Create Component with Props

![screen recording](http://g.recordit.co/FzBmovon2m.gif)

  
You have to pass props in sequence separated by `-`: PropName-Type-isRequired-DefaultValue 
Type and isRequired  are optioanal arguments with default value `string` and  `Y` respectivly
if isRequired is passed `N` then default value to prop is assigned based on type of prop 

  Type crc -help for assist
