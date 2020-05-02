var inquirer = require('inquirer');
var emmet = require('emmet');
var pretty = require('pretty');

parseJsx = () => {

    return new Promise((resolve, reject) => {

        inquirer
            .prompt([
                { name: 'jsx', message: 'Enter jsx' }
            ]).then(({ jsx }) => {

                const jsxStr = pretty(emmet.default(jsx), { ocd: false })
                resolve(jsxStr)
            }).catch(error => reject(error))
    })
}


module.exports = parseJsx