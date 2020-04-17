
const helpContent = () => {

    const msg = `Welcome to react-component-cli\n`

    console.log(msg)

    const createPlainComponent = `Create Plain Component\nclr <ComponentName>`


    const createCmpScss = `\n\ncreate component with scss file and import\ncrc <ComponentName> scss`

    const createCmpScssTest = `\n\ncreate component with scss and test file\ncrc <ComponentName> scss test`

    const createCmpWithProps = `\n\ncreate component with props\ncrc <ComponentName> props`



    console.log(createPlainComponent)

    console.log(createCmpScssTest)

    console.log(createCmpWithProps)
}

module.exports = helpContent

