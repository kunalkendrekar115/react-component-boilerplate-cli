
const getImportString = (isScssImport, isPropsAvailable) =>
  (`import React from 'react';
${isScssImport ? `import styles from './index.style.scss';
import CSSModules from "react-css-modules";` : ''}
${isPropsAvailable ? `import PropTypes from "prop-types";` : ``}`)


const getReturnBody = () => `return (
       <div>
       </div>
    );`

const getExportStr = (componentName, isScss) => {

  let exportString = `export default ${componentName}`
  if (isScss) {
    exportString = `const ${componentName}Styled = CSSModules(${componentName}, styles, {
      allowMultiple: true
});`
  }

  return exportString
}
const getFunctionalComponent = (componentName, { props, scss }) => {

  if (props)
    return getFunctionalComponentWithProps(componentName, { props, scss })

  return (`${getImportString(scss)}
\n
export function ${componentName}() {
     ${getReturnBody()}
  }
  \n
${getExportStr(componentName, scss)}`)
}

const getPropTypes = (componentName, props) => (
  `${componentName}.PropTypes={
    ${
  props.reduce((acc, { propName: name, type, isRequired }, index) => {

    const isRequiredStr = `${isRequired.toUpperCase() == 'Y' ? `.isRequired` : ``}`
    if (index == 0)
      return (`${name}: PropTypes.${type}${isRequiredStr},\n`)
    else if (index == props.length - 1)
      return (`${acc}${name}: PropTypes.${type}${isRequiredStr}`)
    else
      return (`${acc}${name}: PropTypes.${type}${isRequiredStr},\n`)
  }, ``)
  }
  }`
)

const getFunctionalComponentWithProps = (componentName, { props, scss }) => {

  const propsStr = props.reduce((acc, { propName: name }, index) => {
    if (index == 0)
      return (`${name}`)
    return (`${acc},${name}`)
  }, ``)

  return (`${getImportString(scss, true)}\n
export function ${componentName}({${propsStr}}) {\n
     ${getReturnBody()}
}\n
${getPropTypes(componentName, props)}   
\n
${getExportStr(componentName, scss)} `)
}

module.exports = { getFunctionalComponent }