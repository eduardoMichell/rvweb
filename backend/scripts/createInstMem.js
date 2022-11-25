const fs = require('fs');

const createInstMem = () => {
  let firstPosition = 4194304;
  let instMem = []
  for (let i = 0; i < 128; i++) {
    const object = `{
      "${firstPosition}": {
        "data": "",
        "previousLabel":""
      }
    }`
    instMem.push(JSON.parse(object))
    firstPosition += 4;
  }
  fs.writeFile('./core/memories/instMem.json', JSON.stringify(instMem), 'utf8', (err) => {
    if (err) throw err;
  });
}

module.exports = createInstMem

