#!/usr/bin/env node

var inquirer = require('inquirer');

var templets = require('./templets')

const sayHello = (name) => {
    console.log("Hello " + name)
}

// let componentName = ''

const getComponentStr = (componentName, propsArray) => {

    let propsString = ''
    if (propsArray) {
        propsArray.map((prop, index) => {
            if (index !== 0)
                propsString = propsString + ',' + prop
            else
                propsString = prop
        })
    }

    return templets.createComponentWithProps(componentName, propsString)
}
function createConfigFile() {
    var fs = require('fs')

    fs.access('config.js', (err) => {

        if (!err) {
            console.log('config file already exists');
            promptQuestions()

        } else {

            const str = { props: [], scssFile: "Y", testFile: "Y" }

            fs.writeFile('config.js', JSON.stringify(str), (err) => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log('created config.js file\nWrite props in array')
                promptQuestions()
            })
        }
    })

}

createConfigFile()

function promptQuestions() {

    inquirer
        .prompt([
            { name: 'componentName', message: 'Enter the name of component' }

        ])
        .then(answers => {
            createComponent(answers.componentName)
        })
        .catch(error => {
            console.log(error)
        })
}

const createComponent = (componentName) => {
    var fs = require('fs')

    var configObj = JSON.parse(fs.readFileSync('config.js', 'utf8'))


    fs.mkdirSync(componentName)

    const str = getComponentStr(componentName, configObj.props)

    fs.writeFile(componentName + '/index.jsx', str, (err) => {
        if (err)
            console.log(err)
        else
            console.log('index.jsx File Created')
    })

    if (configObj.scssFile === 'Y') {

        fs.writeFile(componentName + '/index.scss', '', (err) => {
            if (err)
                console.log(err)
            else
                console.log('index.scss File Created')
        })
    }

    if (configObj.testFile === 'Y') {

        fs.writeFile(componentName + '/index.spec.js', '', (err) => {
            if (err)
                console.log(err)
            else
                console.log('index.spec.js File Created')
        })
    }
}

// createComponent()
// exports.sayHello = sayHello
exports.createComponent = createComponent