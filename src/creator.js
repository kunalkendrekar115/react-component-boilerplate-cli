var fs = require('fs')
const logSymbols = require('log-symbols');

const templets = require('./templets')
const { parseProps, parseJsx } = require('./parsers')


const createComponent = async (argsObj) => {

    try {
        const { name, redux, scss, test, props, jsx } = argsObj

        let consoleStr

        if (!name)
            throw new Error('Component Name should be first argument')

        let cmpArgs = { scss, redux }

        if (props) {
            const propsArray = await parseProps()
            console.log(propsArray)
            cmpArgs = { ...cmpArgs, props: propsArray }
        }

        if (jsx) {
            const jsx = await parseJsx()
            console.log(jsx)
            cmpArgs = { ...cmpArgs, jsx }
        }

        await createReactComponent(name, cmpArgs)

        consoleStr = `\t\b\b\b|- ${name}\n\t|- index.jsx`

        if (scss) {
            await createScssFile(name)
            consoleStr = `${consoleStr}\n\t|- index.style.scss`
        }

        if (test) {
            await createTestFile(name)
            consoleStr = `${consoleStr}\n\t|- index.spec.js`
        }

        console.log('')
        console.log(logSymbols.success, `All Done\n\n${consoleStr}\n`)


    } catch (error) {
        if (error.message)
            console.log(logSymbols.error, error.message)
        else
            console.log(logSymbols.error, error)
    }
}

const createReactComponent = (componentName, args) => {

    fs.mkdirSync(componentName)

    const templaeStr = templets.getFunctionalComponent(componentName, args)
    fs.writeFileSync(componentName + '/index.jsx', templaeStr)
    
    console.log(logSymbols.success, 'created index.jsx ')

}

const createScssFile = (dir) => {
    fs.writeFileSync(dir + '/index.style.scss', '')
    console.log(logSymbols.success, 'created index.style.scss')
}

createTestFile = (dir) => {
    fs.writeFileSync(dir + '/index.spec.jsx', '')
    console.log(logSymbols.success, 'created index.spec.jsx')
}

module.exports = createComponent