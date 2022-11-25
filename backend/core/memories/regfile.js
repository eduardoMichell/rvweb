const regfile = {
    get zero() { return this.x0 },
    get ra() { return this.x1 },
    get sp() { return this.x2 },
    get gp() { return this.x3 },
    get tp() { return this.x4 },
    get t0() { return this.x5 },
    get t1() { return this.x6 },
    get t2() { return this.x7 },
    get s0() { return this.x8 },
    get s1() { return this.x9 },
    get a0() { return this.x10 },
    get a1() { return this.x11 },
    get a2() { return this.x12 },
    get a3() { return this.x13 },
    get a4() { return this.x14 },
    get a5() { return this.x15 },
    get a6() { return this.x16 },
    get a7() { return this.x17 },
    get s2() { return this.x18 },
    get s3() { return this.x19 },
    get s4() { return this.x20 },
    get s5() { return this.x21 },
    get s6() { return this.x22 },
    get s7() { return this.x23 },
    get s8() { return this.x24 },
    get s9() { return this.x25 },
    get s10() { return this.x26 },
    get s11() { return this.x27 },
    get t3() { return this.x28 },
    get t4() { return this.x29 },
    get t5() { return this.x30 },
    get t6() { return this.x31 },
    x0: {
        value: "0",
        "description": "The constant value 0"
    },
    x1: {
        "value": "0",
        "description": "Return address"
    },
    x2: {
        "value": "0",
        "description": "Stack pointer"
    },
    x3: {
        "value": "0",
        "description": "Global pointer"
    },
    x4: {
        "value": "0",
        "description": "Thread pointer"
    },
    x5: {
        "value": "0",
        "description": "Temporary"
    },
    x6: {
        "value": "0",
        "description": "Temporary"
    },
    x7: {
        "value": "0",
        "description": "Temporary"
    },
    x8: {
        "value": "0",
        "description": "Saved register / Frame pointer"
    },
    x9: {
        "value": "0",
        "description": "Save register"
    },
    x10: {
        "value": "0",
        "description": "Function argument / Return Value"
    },
    x11: {
        "value": "0",
        "description": "Function argument / Return Value"
    },
    x12: {
        "value": "0",
        "description": "Function argument"
    },
    x13: {
        "value": "0",
        "description": "Function argument"
    },
    x14: {
        "value": "0",
        "description": "Function argument"
    },
    x15: {
        "value": "0",
        "description": "Function argument"
    },
    x16: {
        "value": "0",
        "description": "Function argument"
    },
    x17: {
        "value": "0",
        "description": "The constant value 0"
    },
    x18: {
        "value": "0",
        "description": "Saved register"
    },
    x19: {
        "value": "0",
        "description": "Saved register"
    },
    x20: {
        "value": "0",
        "description": "Saved register"
    },
    x21: {
        "value": "0",
        "description": "Saved register"
    },
    x22: {
        "value": "0",
        "description": "Saved register"
    },
    x23: {
        "value": "0",
        "description": "Saved register"
    },
    x24: {
        "value": "0",
        "description": "Saved register"
    },
    x25: {
        "value": "0",
        "description": "Saved register"
    },
    x26: {
        "value": "0",
        "description": "Saved register"
    },
    x27: {
        "value": "0",
        "description": "Saved register"
    },
    x28: {
        "value": "0",
        "description": "Temporary"
    },
    x29: {
        "value": "0",
        "description": "Temporary"
    },
    x30: {
        "value": "0",
        "description": "Temporary"
    },
    x31: {
        "value": "0",
        "description": "Temporary"
    },
    pc: {
        "value": "4194304",
        "description": "Program counter"
    },
}


module.exports = regfile