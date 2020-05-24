const getImportString = (isScssImport, isPropsAvailable, isRedux) => {
  let importString = `import React from 'react';`

  if (isPropsAvailable)
    importString = `${importString}\nimport PropTypes from "prop-types";`

  if (isRedux)
    importString = `${importString}\n\nimport { bindActionCreators } from "redux";\nimport { connect } from "react-redux";`

  if (isScssImport)
    importString = `${importString}\n\nimport CSSModules from "react-css-modules";\nimport styles from "./index.style.scss";`

  return importString
}

const getJSXBody = (jsx) => {
  if (jsx) return `return (\n ${jsx}\n )`
  return `return (
      <div>
      </div>
    ); `
}

const getExportStr = (componentName, isScss, isRedux) => {
  let exportString = ""

  let cmpName = componentName

  if (isScss && !isRedux) {
    cmpName = `${componentName}Styled`
    exportString = `const ${cmpName} = CSSModules(${componentName}, styles, {
      allowMultiple: true
    });\n\nexport default ${cmpName}`
  } else if (isScss && isRedux) {
    cmpName = `${componentName}Styled`
    exportString = `const ${cmpName} = CSSModules(${componentName}, styles, {
        allowMultiple: true
      }); `
  }

  if (isRedux) {
    exportString = `${exportString}\n\nexport default connect(mapStateToProps, mapDispatchToProps)(${cmpName}); `
  }

  if (!exportString) exportString = `export default ${componentName} `

  return exportString
}

const getReduxMap = () =>
  `const mapStateToProps = ({ }) => ({});\n
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch); \n`

const getPropTypes = (componentName, props) => {
  let defaultValues = []

  const propTypes = `${componentName}.PropTypes = {
    ${props.reduce(
      (acc, { propName: name, type, isRequired, defaultValue }, index) => {
        if (defaultValue !== undefined) {
          defaultValues = [...defaultValues, { name, defaultValue, type }]
        }

        const isRequiredStr = `${
          isRequired.toUpperCase() === "Y" ? `.isRequired` : ``
        }`
        if (index === 0 && props.length > 1)
          return `${name}: PropTypes.${type}${isRequiredStr},\n`
        if (index === props.length - 1)
          return `${acc}${name}: PropTypes.${type}${isRequiredStr}`
        return `${acc}${name}: PropTypes.${type}${isRequiredStr},\n`
      },
      ``
    )} \n}`

  if (defaultValues.length > 0) {
    return `${propTypes}\n
${componentName}.defaultProps = {
  ${defaultValues.reduce((acc, { name, defaultValue, type }, index) => {
    const formatedValue = type === "string" ? `'${defaultValue}'` : defaultValue

    if (index === 0 && defaultValues.length > 1)
      return `${name}: ${formatedValue},\n`
    if (index === defaultValues.length - 1)
      return `${acc}${name}:${formatedValue}`
    return `${acc}${name}: ${formatedValue},\n`
  }, ``)}    
}`
  }
  return propTypes
}

module.exports = {
  getImportString,
  getJSXBody,
  getPropTypes,
  getReduxMap,
  getExportStr
}
