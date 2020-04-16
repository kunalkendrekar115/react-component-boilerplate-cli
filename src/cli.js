#!/usr/bin/env node


const createComponent = require('./creator')

var myArgs = process.argv.slice(2);

const validArgs = ['redux', 'scss', 'test', 'props']

const argsObj = myArgs.reduce((acc, args, index) => {

    if (index == 0) {    
        const capitizedName = `${args.charAt(0).toUpperCase()}${args.slice(1)}`
        return { "name": capitizedName }
    }

    if (validArgs.includes(args.toLocaleLowerCase()))
        return { ...acc, [args]: true }
    else
        throw new Error(`Invalid argument ${args}`)
}, {})

if (argsObj)
    createComponent(argsObj)
