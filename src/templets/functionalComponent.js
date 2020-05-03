
const helpers = require('./helpers')

const { getImportString, getJSXBody, getPropTypes, getReduxMap, getExportStr } = helpers

const getFunctionalComponent = (componentName, { props, scss, redux ,jsx}) => {

  if (props)
    return getFunctionalComponentWithProps(componentName, { props, scss, redux,jsx })

  return (`${getImportString(scss, false, redux)}
\n
${ redux ? getReduxMap() : ''}
 const ${componentName} = () =>{\n
  ${getJSXBody(jsx)}
}\n
${ getExportStr(componentName, scss, redux)} `)

}


const getFunctionalComponentWithProps = (componentName, { props, scss, redux ,jsx}) => {

  const propsStr = props.reduce((acc, { propName: name }, index) => {
    if (index == 0)
      return (`${name} `)
    return (`${acc}, ${name} `)
  }, ``)

  return (`${getImportString(scss, true, redux)} \n
${ redux ? getReduxMap() : ''}
const ${componentName} = ({ ${propsStr}})=> {\n
  ${getJSXBody(jsx)}
}\n
${getPropTypes(componentName, props)}
\n
${ getExportStr(componentName, scss, redux)} `)
}

module.exports = { getFunctionalComponent }