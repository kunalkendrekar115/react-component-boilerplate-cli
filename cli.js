#!/usr/bin/env node

var inquirer = require('inquirer');

const templets = require('./templets')
var fs = require('fs')


// function createConfigFile() {
//     var fs = require('fs')

//     fs.access('config.js', (err) => {

//         if (!err) {
//             console.log('config file already exists');
//             promptQuestions()

//         } else {

//             const str = { props: [], scssFile: "Y", testFile: "Y" }

//             fs.writeFile('config.js', JSON.stringify(str), (err) => {
//                 if (err) {
//                     console.log(err)
//                     return
//                 }
//                 console.log('created config.js file\nWrite props in array')
//                 promptQuestions()
//             })
//         }
//     })

// }



// function promptQuestions() {

//     inquirer
//         .prompt([
//             { name: 'componentName', message: 'Enter the name of component' }

//         ])
//         .then(answers => {
//             createComponent(answers.componentName)
//         })
//         .catch(error => {
//             console.log(error)
//         })
// }


const createComponent = async () => {


    // var configObj = JSON.parse(fs.readFileSync('config.js', 'utf8'))

    const { name, test, scss, props } = argsObj

    if (!name)
        throw new Error('Name arg is Mandatory')


    if (props) {
        const { props: propsString } = await parseProps(props)
        createReactComponent(name, propsString)
    } else
        createReactComponent(name)

    if (scss && scss.toUpperCase() === 'Y')
        createScssFile(name)

    if (test && test.toUpperCase() === 'Y')
        createTestFile(name)

}

const createReactComponent = (componentName, propsString) => {

    fs.mkdirSync(componentName)

    const templaeStr = propsString ? templets.getFunctionalComponentWithProps(componentName, propsString)
        : templets.getFunctionalComponent(componentName)

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

parseProps = () => {

    return inquirer
        .prompt([
            { name: 'props', message: 'Enter Props name separated by comma' }

        ])
}

var myArgs = process.argv.slice(2);

const argsObj = myArgs.reduce((acc, args) => {
    keyVal = args.split('=')
    return {
        ...acc, [keyVal[0]]: keyVal[1]
    }
}, {})

if (argsObj)
    createComponent()