#!/usr/bin/env node

const logSymbols = require("log-symbols")
const createComponent = require("./creator")
const helpContent = require("../help")

const validArgs = ["redux", "scss", "test", "props", "jsx"]

const cliArgs = process.argv.slice(2)

if (cliArgs[0] === "-help") {
  helpContent()
} else {
  const argsObj = cliArgs.reduce((acc, args, index) => {
    if (index === 0) {
      const capitizedName = `${args.charAt(0).toUpperCase()}${args.slice(1)}`
      return { name: capitizedName }
    }

    if (validArgs.includes(args.toLocaleLowerCase()))
      return { ...acc, [args]: true }

    console.log(logSymbols.error, `Invalid argument ${args}`)
  }, {})

  if (argsObj) createComponent(argsObj)
}
