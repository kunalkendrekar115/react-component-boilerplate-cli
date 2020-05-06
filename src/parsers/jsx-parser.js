const inquirer = require("inquirer")
const emmet = require("emmet")

const parseJsx = () => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([{ name: "jsx", message: "Enter jsx" }])
      .then(({ jsx }) => {
        const jsxStr = emmet.default(jsx)
        resolve(jsxStr)
      })
      .catch((error) => reject(error))
  })
}

module.exports = parseJsx
