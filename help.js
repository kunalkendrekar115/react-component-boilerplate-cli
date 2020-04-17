
const helpContent = () => {

    const msg = `Welcome to react-component-cli\n`

    console.log(msg)

    const createPlainComponent = `Create Plain Component\nclr <ComponentName>`


    const createCmpScss = `\n\ncreate component with scss file and import\nclr <ComponentName> scss`

    const createCmpScssTest = `\n\ncreate component with scss and test file\nclr <ComponentName> scss test`

    const createCmpWithProps = `\n\ncreate component with props\nclr <ComponentName> props`



    console.log(createPlainComponent)

    console.log(createCmpScssTest)

    console.log(createCmpWithProps)
}

module.exports = helpContent

