
const getImportString = (isScssImport, isPropsAvailable, isRedux) => {
  let importString = `import React from 'react';`

  if (isScssImport)
    importString = `${importString}\nimport styles from './index.style.scss';\nimport CSSModules from "react-css-modules"; `

  if (isPropsAvailable)
    importString = `${importString}\nimport PropTypes from "prop-types";`

  if (isRedux)
    importString = `${importString}\nimport { bindActionCreators } from "redux";\nimport { connect } from "react-redux";`

  return importString
}

const getReturnBody = () => `return (
    <div>
    </div>
  ); `

const getExportStr = (componentName, isScss, isRedux) => {

  let exportString = `export default ${componentName} `

  let cmpName = componentName;

  if (isScss) {
    cmpName = `${componentName}Styled`
    exportString = `const ${cmpName} = CSSModules(${componentName}, styles, {
    allowMultiple: true
  }); `
  }
  if (isRedux) {
    exportString = `${exportString} \n\nexport default connect(mapStateToProps, mapDispatchToProps)(${cmpName}); `
  }

  return exportString
}

const getReduxMap = () => (
`const mapStateToProps = ({ }) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch); \n`)

const getFunctionalComponent = (componentName, { props, scss, redux }) => {

  if (props)
    return getFunctionalComponentWithProps(componentName, { props, scss, redux })

  return (`${getImportString(scss, false, redux)}
\n
${ redux ? getReduxMap() : ''}
export function ${ componentName} () {
  ${ getReturnBody()}
}
\n
${ getExportStr(componentName, scss, redux)} `)
}


const getPropTypes = (componentName, props) => (
  `${componentName}.PropTypes = {
  ${
  props.reduce((acc, { propName: name, type, isRequired }, index) => {

    const isRequiredStr = `${isRequired.toUpperCase() == 'Y' ? `.isRequired` : ``}`
    if (index == 0 && props.length > 1)
      return (`${name}: PropTypes.${type}${isRequiredStr},\n`)
    else if (index == props.length - 1)
      return (`${acc}${name}: PropTypes.${type}${isRequiredStr}`)
    else
      return (`${acc}${name}: PropTypes.${type}${isRequiredStr},\n`)
  }, ``)
  } \n}`
)

const getFunctionalComponentWithProps = (componentName, { props, scss, redux }) => {

  const propsStr = props.reduce((acc, { propName: name }, index) => {
    if (index == 0)
      return (`${name} `)
    return (`${acc}, ${name} `)
  }, ``)

  return (`${getImportString(scss, true, redux)} \n
${ redux ? getReduxMap() : ''}
export function ${ componentName} ({ ${propsStr}}) {
\n
  ${ getReturnBody()}
}\n
${ getPropTypes(componentName, props)}
\n
${ getExportStr(componentName, scss, redux)} `)
}

module.exports = { getFunctionalComponent }