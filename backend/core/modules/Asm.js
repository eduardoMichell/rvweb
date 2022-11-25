const { getInstruction } = require('./ConfigModule')
const regFile = require('../memories/regfile')
module.exports = class ASM {
    constructor(asm) {
        const { text, data } = getTextAndData(asm)
        this.text = text;
        this.data = data;
    }
}

/**
 * Define two arrays, data and text of asm string code
 * @param asm asm string coe
 * @returns {{data: (*|*[]), text: (*|*[])}} two separated arrays data and text
 */
const getTextAndData = (asm) => {
    asm = asm.trim()
    let asmArray = asm.split(/\s*\n/m)
    asmArray = removeComments(asmArray)
    asmArray = removeWhiteSpaces(asmArray)
    asmArray = removePunctuation(asmArray)

    let text = separateValues(asmArray, '.text', '.data')
    let data = separateValues(asmArray, '.data', '.text')

    text = splitValues(text)
    data = splitValues(data)

    text = removeWhiteSpacesFromArray(text)
    data = removeWhiteSpacesFromArray(data)


    text = removeEscapes(text)
    data = removeEscapes(data)


    const { textDataLabels, errorLabels, messageLabels } = checkLabels(text)
    if (errorLabels) {
        throw messageLabels
    }
    text = textDataLabels

    const { errorSynxtax, messageSyntax } = checkSyntax(text)
    if (errorSynxtax) {
        throw messageSyntax
    }

    // text = checkPseudoCode(text)

    return { data, text }
}




const isPseudo = (inst) => {
    const pseudos = ['nop', 'j', 'jr', 'la']
    return pseudos.includes(inst)
}

const checkPseudoCode = (text) => {
    for (let i = 0; i < text.length; i++) {
        if (isPseudo(text[i][0])) {
            text[i] = changePseudo(text[i])
        }
    }
    return text
}

const changePseudo = (line) => {

    switch (line[0]) {
        case 'nop':
            return setLine(line, 'addi', 'zero', 'zero', '0')
        case 'j':
            return setLine(line, 'jal', 'zero', line[1])
        case 'jr':
            return setLine(line, 'addi', 'zero', 'zero', '0')
    }
}

const setLine = (line, inst, t1, t2, t3) => {
    line[0] = inst
    line[1] = t1
    line[2] = t2
    if (t3) {
        line[3] = t3
    }
    return line
}

const removeEscapes = (asm) => {
    asm.forEach((part, i, array) => {
        part.forEach((partZ, z, arrayZ) => {
            arrayZ[z] = partZ.replaceAll('\t', '')
        })
    })
    return asm
}

const checkLabels = (text) => {
    for (let i = 0; i < text.length; i++) {
        const { error, inst } = getInstruction(text[i][0])
        if (error && !text[i][0].includes(':') && (!inst && !isPseudo(text[i][0]))) {
            return { errorLabels: true, textDataLabels: null, messageLabels: `"${text[i][0]}" is not a recognized operator` }
        }
        if ((!inst && !isPseudo(text[i][0])) && text[i].length > 1) {
            const newArray = []
            for (let j = 1; j < text[i].length; j++) {
                newArray.push(text[i][j])
            }
            text[i] = [text[i][0]]
            text.splice(i + 1, 0, newArray)
            i++
        }
    }
    return { errorLabels: false, textDataLabels: text, messageLabels: null }
}

const checkSyntax = (text) => {
    for (let i = 0; i < text.length; i++) {
        const position = text[i][0]
        if (!!regFile[position]) {
            return { errorSynxtax: true, messageSyntax: `"${position}" is not a recognized operator` }
        }
    }
    return { errorSynxtax: false, messageSyntax: null }
}

/**
 * Remove all empty spaces in lines
 * @param asm asm code
 * @returns {data[], text[]} two separated arrays data and text without spaces
 */
const removeWhiteSpacesFromArray = (asm) => {
    asm.forEach((part, i, array) => {
        array[i] = part.filter((partZ, z, arrayZ) => {
            return arrayZ[z].length > 0
        })
    })
    return asm
}

/**
 * Slit all indexes of array by ' '
 * @param asm asm code
 * @returns array of asm code with split values in each line
 */
const splitValues = (asm) => {
    asm.forEach((part, i, array) => {
        array[i] = part.split(' ')
    })
    return asm
}

/**
 * Remove all comments from asm code
 * @param asm asm string code
 * @returns array of asm code
 */
const removeComments = (asm) => {
    const newArray = []
    asm.forEach((part, i, array) => {
        if (part.includes('#')) {
            part = part.slice(0, part.indexOf('#'))
        }
        if (part.trim().length !== 0) {
            newArray.push(part)
        }
    })
    asm = newArray;
    return asm
}

/**
 * Remove ',' from lines
 * @param asm array of strings
 * @returns array of asm strings without ',' in line
 */
const removePunctuation = (asm) => {
    asm.forEach((part, i, array) => {
        part = part.replaceAll(',', '')
        //part = part.replaceAll(':', '')
        array[i] = part
    })
    return asm
}

/**
 * Remove all white spaces at start and final of all lines from asm code
 * @param asm asm code
 * @returns array of asm code
 */
const removeWhiteSpaces = (asm) => {
    asm.forEach((part, i, array) => {
        part = part.trim()
        if (part.length > 0) {
            array[i] = part
        }
    })
    return asm
}

/**
 * Separate data from text
 * @param asm asm code
 * @param separatedValue defines what value will use to separate
 * @param notSeparatedValue defines what value will not separate
 * @returns [] returns an array of the choice part
 */
const separateValues = (asm, separatedValue, notSeparatedValue) => {
    const part = []
    let haveDot = false
    for (let i = 0; i < asm.length; i++) {
        if (asm[i].includes(separatedValue)) {
            haveDot = true
            i++
        }
        if (haveDot) {
            if (i < asm.length) {
                if (asm[i].includes(notSeparatedValue)) break
                part.push(asm[i])
            }
        }
    }
    return part
}