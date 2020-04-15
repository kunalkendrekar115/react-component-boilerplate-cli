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

    const { name, redux, scss, test, props } = argsObj

    if (!name)
        throw new Error('Name arg is Mandatory')

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

parseProps = () => {

    return new Promise((resolve, reject) => {

        inquirer
            .prompt([
                { name: 'props', message: 'Enter Props name-type-isRequired(y/n) separated by comma (ex: userId-number-n)' }
            ]).then(({ props }) => {

                const propsArray = props.replace(/\s/g, "")
                    .split(',')
                    .reduce((acc, prop) => {
                        const propSplit = prop.trim().split('-')
                        let propObj = null;
                        if (propSplit && propSplit.length == 3)
                            propObj = { propName: propSplit[0], type: propSplit[1], isRequired: propSplit[2] }
                        else if (propSplit && propSplit.length == 2)
                            propObj = { propName: propSplit[0], type: propSplit[1], isRequired: 'Y' }
                        else
                            propObj = { propName: prop, type: 'String', isRequired: 'Y' }

                        return [...acc, propObj]
                    }, [])
                resolve(propsArray)
            }).catch((error) => reject(error))
    })
}

var myArgs = process.argv.slice(2);

const validArgs = ['redux', 'scss', 'test', 'props']

const argsObj = myArgs.reduce((acc, args, index) => {

    if (index == 0) {
        const capitizedName = `${args.charAt(0).toUpperCase()}${args.slice(1)}`
        return { "name": capitizedName }
    }

    if (validArgs.includes(args))
        return { ...acc, [args]: true }
    else
        throw new Error(`Invalid argument ${args}`)
}, {})

if (argsObj)
    createComponent()
