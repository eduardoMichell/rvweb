const instructionsJson = require('../memories/instructions.json')

const getInstruction = (inst) => {
    if (instructionsJson[inst]) {
      return {error: false, inst: instructionsJson[inst]}
    } else {
      return {error: true, inst: null}
    }
  }
  

module.exports = {
    getInstruction
}
  