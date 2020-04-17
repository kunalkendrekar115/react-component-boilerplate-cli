var fs = require('fs')

const templets = require('./templets')
const parseProps = require('./parser')

const createComponent = async (argsObj) => {

    try {
        const { name, redux, scss, test, props } = argsObj

        if (!name)
            throw new Error('Component Name should be first argument')

        let cmpArgs = { scss, redux }

        if (props) {
            const propsArray = await parseProps(props)
            console.log(propsArray)
            createReactComponent(name, { ...cmpArgs, props: propsArray })
        } else
            createReactComponent(name, cmpArgs)

        if (scss)
            createScssFile(name)

        if (test)
            createTestFile(name)
    } catch (error) { console.log(error) }
}

const createReactComponent = (componentName, args) => {

    fs.mkdirSync(componentName)

    const templaeStr = templets.getFunctionalComponent(componentName, args)

    fs.writeFile(componentName + '/index.jsx', templaeStr, (err) => {
        if (err)
            console.log(err)
        else
            console.log('index.jsx File Created')
    })
}

const createScssFile = (dir) => {

    fs.writeFile(dir + '/index.scss', '', (err) => {
        if (err)
            console.log(err)
        else
            console.log('index.scss File Created')
    })
}

createTestFile = (dir) => {

    fs.writeFile(dir + '/index.spec.js', '', (err) => {
        if (err)
            console.log(err)
        else
            console.log('index.spec.js File Created')
    })
}

module.exports = createComponent