const inquirer = require("inquirer")

const promptMessage = `Enter Props name-type-isRequired(y/n)-defaultValue separated by comma(,) \n(ex: userId-number-n-10)`

const validTypes = [
  "array",
  "number",
  "string",
  "func",
  "object",
  "bool",
  "element"
]

const getDefauleValue = (type) => {
  switch (type) {
    case "number":
      return 0
    case "string":
      return ""
    case "array":
      return []
    case "bool":
      return false
    default:
      return null
  }
}

const parseProps = () => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([{ name: "props", message: promptMessage }])
      .then(({ props }) => {
        const propsArray = props
          .replace(/\s/g, "")
          .split(",")
          .reduce((acc, prop) => {
            const propSplit = prop.trim().split("-")
            let propObj = null
            if (propSplit && propSplit.length >= 3) {
              if (validTypes.includes(propSplit[1])) {
                const isRequired = propSplit[2].toUpperCase()
                if (isRequired !== "Y" && isRequired !== "N")
                  reject(new Error("Invalid isRequired argument"))
                else if (isRequired === "N") {
                  propObj = {
                    propName: propSplit[0],
                    type: propSplit[1],
                    isRequired,
                    defaultValue: propSplit[3]
                      ? propSplit[3]
                      : getDefauleValue(propSplit[1])
                  }
                } else {
                  propObj = {
                    propName: propSplit[0],
                    type: propSplit[1],
                    isRequired
                  }
                }
              } else reject(new Error(`Invalid PropType ${propSplit[1]}`))
            } else if (propSplit && propSplit.length === 2) {
              if (validTypes.includes(propSplit[1]))
                propObj = {
                  propName: propSplit[0],
                  type: propSplit[1],
                  isRequired: "Y"
                }
              else reject(new Error(`Invalid PropType ${propSplit[1]}`))
            } else
              propObj = {
                propName: prop,
                type: "String",
                isRequired: "Y"
              }

            return [...acc, propObj]
          }, [])

        resolve(propsArray)
      })
      .catch((error) => reject(error))
  })
}

module.exports = parseProps
