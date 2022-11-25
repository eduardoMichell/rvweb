const opcodes = require('../memories/instructions.json')
const regFile = require('../memories/regfile.js')
const fs = require('fs')

const ASM = require("./Asm")
const Instruction = require('./Instruction')
const instMemJson = require('../memories/instMem.json')
const instMem = instMemJson.slice()

const {getInstruction} = require('./ConfigModule')
const createInstMem = require('../../scripts/createInstMem')

const TestCaseMachineCode = (asm) => {
  const asmCode = new ASM(asm);

  // // createInstMem()
  // // setTextToInstMem(text)
  // // const machineCode = getMachineCode(text)

  return { text: asmCode.text, data: asmCode.data }

}


const setTextToInstMem = (text) => {
  let instMemSize = 0
  for (let i = 0; i < text.length; i++) {
    if (getInstruction(text[i][0])) {
      instMem[instMemSize][Object.keys(instMem[instMemSize])[0]].data = text[i]
    } else {
      instMem[instMemSize][Object.keys(instMem[instMemSize])[0]].data = text[(i) + 1]
      instMem[instMemSize][Object.keys(instMem[instMemSize])[0]].previousLabel = text[i][0]
      i++
    }
    instMemSize++
  }
  fs.writeFile('./core/memories/instMem.json', JSON.stringify(instMem), (err) => {
    if (err) throw err
  })


}

const getMachineCode = (text) => {
  const machineCode = []
  for (let i = 0; i < text.length; i++) {
    // tem que pegar as labels e botar na memoria e tirar do text
    machineCode.push(selectByType(text[i]))
  }
  return machineCode
}
const convertAsmToBinaryTypeR = (instruction) => {
  const func7 = opcodes[instruction.inst].funct7
  const rs2 = getInstNumber(instruction.t3)
  const rs1 = getInstNumber(instruction.t2)
  const rd = getInstNumber(instruction.t1)
  const func3 = opcodes[instruction.inst].funct3
  const opcode = opcodes[instruction.inst].opcode
  return addZeros(func7 + rs2 + rs1 + func3 + rd + opcode, 32)
}


const convertAsmToBinaryTypeI = (instruction) => {
  const rd = getInstNumber(instruction.t1)
  const func3 = opcodes[instruction.inst].funct3
  const opcode = opcodes[instruction.inst].opcode
  if (instruction.t3) {
    const rs1 = getInstNumber(instruction.t2)
    const data = parseInt(instruction.t3).toString(2)
    return addZeros(data + rs1 + func3 + rd + opcode, 32)
  } else {
    if (instruction.t2) {
      const data = getImmediate(instruction.t2)
      const rs1 = getInstNumber(data[1])
      const imm = parseInt(data[0]).toString(2)
      return addZeros(imm + rs1 + func3 + rd + opcode, 32)
    }
  }
}

const convertAsmToBinaryTypeS = (instruction) => {
  const immediate = getImmediate(instruction.t2)
  const destiny = getDestinyImmediate(instruction.t2)
  const imm511 = separateImmediate(5, 11, immediate)
  const rs2 = getInstNumber(instruction.t1)
  const rs1 = getInstNumber(destiny)
  const imm04 = separateImmediate(0, 4, immediate)
  const func3 = opcodes[instruction.inst].funct3
  const opcode = opcodes[instruction.inst].opcode
  return addZeros(imm511 + rs2 + rs1 + func3 + imm04 + opcode, 32)
}

const convertAsmToBinaryTypeB = (instruction) => {
  const opcode = opcodes[instruction.inst].opcode
  const rs2 = getInstNumber(instruction.t2)
  const rs1 = getInstNumber(instruction.t1)
  const offset = getOffset(instruction.line)
  const func3 = opcodes[instruction.inst].funct3
  return addZeros(offset[0] + separateBinary(offset, 2, 7) + rs2 + rs1 + func3 + separateBinary(offset, 8, 11) + offset[1] + opcode, 32)
}

const separateBinary = (binary, start, end) => {
  return binary.slice(start, end + 1)
}

const getOffset = (inst) => {
  const instPosition = Number.parseInt(getInstructionPosition(inst))
  const labelPosition = Number.parseInt(getPreviousLabelPosition(inst))

  const bites = (((labelPosition - instPosition) / 4) * 32) / 8
  if (bites < 0) {
    const biteNegative = (bites >>> 0).toString(2)
    return separateBinary(biteNegative, biteNegative.length - 13, biteNegative.length)
  } else {
    return addZeros(bites.toString(2), 13)
  }
}

const getInstructionPosition = (inst) => {
  const instructionFiltered = instMem.filter((part, i) => {
    return Object.values(part)[0].data === inst
  })
  if (instructionFiltered) {
    return Object.keys(instructionFiltered[0])[0]
  } else {
    return ''
  }
}

const getPreviousLabelPosition = (inst) => {
  const instructionFiltered = instMem.filter((part, i) => {
    return Object.values(part)[0].previousLabel === inst[3]
  })
  if (instructionFiltered) {
    return Object.keys(instructionFiltered[0])[0]
  } else {
    return ''
  }
}

const convertAsmToBinaryTypeU = (instruction) => {
  const opcode = opcodes[instruction.inst].opcode
  const rd = getInstNumber(instruction.t1)
  const immediate = addZeros(parseInt(instruction.t2).toString(2), 20)
  return addZeros(immediate + rd + opcode, 32)
}

const convertAsmToBinaryTypeJ = (instruction) => {
  const opcode = opcodes[instruction.inst].opcode
  // const rd = getInstNumber(instruction.t1)
  const imm20 = parseInt(instruction.t2).toString(2)[0]
  const imm10and1 = separateBinary(parseInt(instruction.t2).toString(2), 9, 19)
  const imm11 = separateBinary(parseInt(instruction.t2).toString(2), 9, 9)
  const imm19and12 = separateBinary(parseInt(instruction.t2).toString(2), 1, 8)
  const immediate = imm20 + imm10and1 + imm11 + imm19and12
  return addZeros(immediate + opcode, 32)
}

const separateImmediate = (start, end, immediate) => {
  let binaryImmediate = addZeros(parseInt(immediate).toString(2), 12)
  binaryImmediate = reverse(binaryImmediate).slice(start, end + 1)
  return reverse(binaryImmediate)
}

function reverse(s) {
  return [...s].reverse().join('')
}

const getInstNumber = (position) => {
  return addZeros(parseInt(regFile[position] ? regFile[position].number : position).toString(2), 5)
}
const getImmediate = (t2) => {
  return t2.split('(')[0]
}

const getDestinyImmediate = (t2) => {
  const destiny = t2.split('(')[1]
  return destiny.replaceAll(')', '')
}


const selectByType = (line) => {
  const myInstruction = new Instruction(line)
  switch (getInstruction(myInstruction.inst).type) {
    case 'R':
      return convertAsmToBinaryTypeR(myInstruction)
    case 'I':
      return convertAsmToBinaryTypeI(myInstruction)
    case 'S':
      return convertAsmToBinaryTypeS(myInstruction)
    case 'B':
      return convertAsmToBinaryTypeB(myInstruction)
    case 'U':
      return convertAsmToBinaryTypeU(myInstruction)
    case 'J':
      return convertAsmToBinaryTypeJ(myInstruction)
    default:
      return
  }
}

const isLabel = (label) => {
  if (opcodes[label]) return false
  return !Number.parseInt(label)
}

const isImmediate = (label) => {
  return Number.parseInt(label)
}
const isInstruction = (label) => {
  return !!opcodes[label]

}

const isRegister = (label) => {
  return !!regFile[label]
}


const haveDotText = (assemblyCode) => {
  return assemblyCode.includes('.text')
}


const addZeros = (inst, quantity, number = '0') => {
  const increment = quantity - inst.length
  for (let i = 0; i < increment; i++) {
    inst = number + inst
  }
  return inst
}

module.exports = {
  haveDotText,
  TestCaseMachineCode,
}
