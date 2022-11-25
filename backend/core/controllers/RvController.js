const express = require('express')
const router = express.Router()
const { TestCaseMachineCode, haveDotText } = require('../modules/RiscVModule')

router.get('/', async (req, res) => {
  // #swagger.tags = ['Risc V']
  // #swagger.path = ['/rv']
  // #swagger.description = 'test'
  try {
    res.status(201).json('ok')
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/machineCode', async (req, res) => {
  // #swagger.tags = ['Risc V']
  // #swagger.path = ['/rv/convertAssembly']
  // #swagger.description = 'Convert Assembly code to Machine Language'
  try {
    const { asm } = req.body
    if (!asm) {
      return res.json({ error: true, data: {}, message: 'Assembly code is invalid' })
    }
    if (!haveDotText(asm)) {
      return res.json({ error: true, data: {}, message: 'The code does not have .text' })

    }
    const machineLanguage = TestCaseMachineCode(asm)
    return res.status(201).json({ error: false, data: machineLanguage, message: 'Success' })

  } catch (err) {
    console.log(err)
    return res.json({ message: err, error: true, datA: {}})
  }
})


module.exports = router
