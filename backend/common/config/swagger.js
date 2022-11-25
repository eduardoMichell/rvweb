const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'RISC V!',
        description: 'Risc V Test',
    },
    host: 'localhost:3001',
    schemes: ['http'],
};

const outputFile = './common/config/swagger_autogen.json'
const endpointsFiles = ['./core/controllers/RvController.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
