const helpContent = () => {
  const msg = `Welcome to react-components-boilerplate-cli\n`

  console.log(msg)

  const createPlainComponent = `Create Plain Component\ncrc <ComponentName>`

  const createCmpScssTest = `\n\ncreate component with scss and test file\ncrc <ComponentName> scss test`

  const createCmpWithProps = `\n\ncreate component with props\ncrc <ComponentName> props`

  const createCmpWithJsx = `\n\ncreate component with jsx body through emmet\ncrc <ComponentName> jsx`

  console.log(createCmpWithJsx)

  console.log(createPlainComponent)

  console.log(createCmpScssTest)

  console.log(createCmpWithProps)

  console.log(createCmpWithJsx)
}

module.exports = helpContent
