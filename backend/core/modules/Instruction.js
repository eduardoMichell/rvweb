const instructionsJson = require('../memories/instructions.json')

module.exports = class Instruction {
  constructor(inst) {
    this.line = inst
    this.inst = instructionsJson[inst[0]] ? inst[0] : ''
    this.t1 = inst[1] ? inst[1] : ''
    this.t2 = inst[2] ? inst[2] : ''
    this.t3 = inst[3] ? inst[3] : ''
  }
}
