
const createComponentWithProps = (componentName, props) => (

    `import React from 'react';

export function ${componentName}({${props}}) {

  return (
       <div>
       </div>
    );
  }`
)

exports.createComponentWithProps = createComponentWithProps