
const getImportString = () => `import React from 'react';`

const returnBody = `return (
       <div>
       </div>
    );`

const getFunctionalComponent = (componentName) => (

  `${getImportString()}

export function ${componentName}() {
   
     ${returnBody}
  }`
)

const getFunctionalComponentWithProps = (componentName, props) => (

  `${getImportString()}

export function ${componentName}({${props}}) {

     ${returnBody}
  }`
)

module.exports = { getFunctionalComponent, getFunctionalComponentWithProps }