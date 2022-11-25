class RiscvState {
    asm: string;
    source: string[];

    constructor(asm: string, source: string[]) {
        this.asm = asm;
        this.source = source;
    }



}

module.exports = RiscvState;