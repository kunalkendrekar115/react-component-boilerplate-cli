
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

const getJSXBody = (jsx) => {

    if (jsx)
        return (`return (\n${jsx}\n)`)
    return (`return (
      <div>
      </div>
    ); `)
}

const getExportStr = (componentName, isScss, isRedux) => {

    let exportString = ''

    let cmpName = componentName;

    if (isScss) {
        cmpName = `${componentName}Styled`
        if (!isRedux)
            return `export default ${cmpName} = CSSModules(${componentName}, styles, {
      allowMultiple: true
    }); `
        else
            exportString = `const ${cmpName} = CSSModules(${componentName}, styles, {
        allowMultiple: true
      }); `
    }
    else if (isRedux) {
        exportString = `${exportString}\nexport default connect(mapStateToProps, mapDispatchToProps)(${cmpName}); `
    } else
        exportString = `export default ${componentName} `

    return exportString
}

const getReduxMap = () => (
    `const mapStateToProps = ({ }) => ({});\n
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch); \n`)


const getPropTypes = (componentName, props) => {

    let defaultValues = []

    const propTypes = (
        `${componentName}.PropTypes = {
    ${
        props.reduce((acc, { propName: name, type, isRequired, defaultValue }, index) => {

            if (defaultValue !== undefined) {
                defaultValues = [...defaultValues, { name, defaultValue }]
            }

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

    if (defaultValues.length > 0) {
        return `${propTypes}\n
${componentName}.defaultProps = {
  ${defaultValues.reduce((acc, { name, defaultValue }, index) => {

            if (index == 0 && props.length > 1)
                return (`${name}: ${defaultValue},\n`)
            else if (index == props.length - 1)
                return (`${acc}${name}:${defaultValue}`)
            else
                return (`${acc}${name}: ${defaultValue},\n`)
        }, ``)}    
}`
    }
    return propTypes
}

module.exports = {
    getImportString, getJSXBody, getPropTypes, getReduxMap, getExportStr
}
