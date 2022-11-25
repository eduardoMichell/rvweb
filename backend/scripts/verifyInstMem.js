const instMem = require('../core/memories/instMem.json');

const verifyInstMem = () => {
    let firstPosition = 4194304;
    let haveError = false;
    const errorPositions = [];
    for (let i = 0; i < Object.keys(instMem).length; i++) {
        if (Number.parseInt(Object.keys(instMem)[i]) !== firstPosition) {
            haveError = true;
            errorPositions.push(Object.keys(instMem)[i]);
        }
        firstPosition += 4;
    }
    return {haveError, errorPositions}
}
module.exports = verifyInstMem
