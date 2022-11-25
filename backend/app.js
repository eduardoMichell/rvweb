const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./common/config/swagger_autogen.json')

require("dotenv").config()

app.use(cors())
app.use(bodyParser.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/rv', require('./core/controllers/RvController'))

const createInstMem = require('./scripts/createInstMem')
createInstMem()

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server is running on port: ${PORT}`))

