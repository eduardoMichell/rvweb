const dataMem = require('../core/memories/dataMem.json');

const verifyDataMem = () => {
    let firstPosition = 268500992;
    let haveError = false;
    const errorPositions = [];
    for (let i = 0; i < Object.keys(dataMem).length; i++) {
        if (Number.parseInt(Object.keys(dataMem)[i]) !== firstPosition) {
            haveError = true;
            errorPositions.push(Object.keys(dataMem)[i]);
        }
        firstPosition += 4;
    }
    return {haveError, errorPositions}
}
module.exports = verifyDataMem