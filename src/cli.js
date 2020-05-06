#!/usr/bin/env node

const createComponent = require("./creator")
const logSymbols = require("log-symbols")

const validArgs = ["redux", "scss", "test", "props", "jsx"]

const cliArgs = process.argv.slice(2)

if (cliArgs[0] === "-help") {
  const helpContent = require("../help")
  helpContent()
  return
}

const argsObj = cliArgs.reduce((acc, args, index) => {
  if (index === 0) {
    const capitizedName = `${args.charAt(0).toUpperCase()}${args.slice(1)}`
    return { name: capitizedName }
  }

  if (validArgs.includes(args.toLocaleLowerCase()))
    return { ...acc, [args]: true }
  else console.log(logSymbols.error, `Invalid argument ${args}`)
}, {})

if (argsObj) createComponent(argsObj)
