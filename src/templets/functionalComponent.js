
const helpers = require('./helpers')

const { getImportString, getReturnBody, getPropTypes, getReduxMap, getExportStr } = helpers

const getFunctionalComponent = (componentName, { props, scss, redux }) => {

  if (props)
    return getFunctionalComponentWithProps(componentName, { props, scss, redux })

  return (`${getImportString(scss, false, redux)}
\n
${ redux ? getReduxMap() : ''}
export function ${ componentName} () {\n
  ${getReturnBody()}
}\n
${ getExportStr(componentName, scss, redux)} `)

}


const getFunctionalComponentWithProps = (componentName, { props, scss, redux }) => {

  const propsStr = props.reduce((acc, { propName: name }, index) => {
    if (index == 0)
      return (`${name} `)
    return (`${acc}, ${name} `)
  }, ``)

  return (`${getImportString(scss, true, redux)} \n
${ redux ? getReduxMap() : ''}
export function ${ componentName} ({ ${propsStr}}) {\n
  ${getReturnBody()}
}\n
${getPropTypes(componentName, props)}
\n
${ getExportStr(componentName, scss, redux)} `)
}

module.exports = { getFunctionalComponent }