const fs = require("fs")
const logSymbols = require("log-symbols")
const prettier = require("prettier")
const templates = require("./templats")

const { parseProps, parseJsx } = require("./parsers")

const createReactComponent = (componentName, args) => {
  fs.mkdirSync(componentName)

  const componentTemplate = templates.getFunctionalComponent(
    componentName,
    args
  )

  const formattedTemplate = prettier.format(componentTemplate, {
    trailingComma: "none",
    tabWidth: 2,
    semi: false,
    singleQuote: false,
    parser: "babel"
  })

  fs.writeFileSync(`${componentName}/index.jsx`, formattedTemplate)

  console.log(logSymbols.success, "created index.jsx ")
}

const createScssFile = (dir) => {
  fs.writeFileSync(`${dir}/index.style.scss`, ``)
  console.log(logSymbols.success, "created index.style.scss")
}

const createTestFile = (dir) => {
  fs.writeFileSync(`${dir}/index.spec.jsx`, ``)
  console.log(logSymbols.success, "created index.spec.jsx")
}

const createComponent = async ({ name, redux, scss, test, props, jsx }) => {
  try {
    let successMessageString = null

    if (!name) throw new Error("Component Name should be as a first argument")

    let cmpArgs = { scss, redux }

    if (props) {
      const propsArray = await parseProps()
      console.log(propsArray)
      cmpArgs = { ...cmpArgs, props: propsArray }
    }

    if (jsx) {
      const jsxStr = await parseJsx()
      console.log(jsxStr)
      cmpArgs = { ...cmpArgs, jsxStr }
    }

    await createReactComponent(name, cmpArgs)

    successMessageString = `\t\b\b\b|- ${name}\n\t|- index.jsx`

    if (scss) {
      await createScssFile(name)
      successMessageString = `${successMessageString}\n\t|- index.style.scss`
    }

    if (test) {
      await createTestFile(name)
      successMessageString = `${successMessageString}\n\t|- index.spec.js`
    }

    console.log("")
    console.log(logSymbols.success, `All Done\n\n${successMessageString}\n`)
  } catch (error) {
    if (error.message) console.log(logSymbols.error, error.message)
    else console.log(logSymbols.error, error)
  }
}

module.exports = createComponent
