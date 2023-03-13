const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Jean's LC. API",
            description: "Jean's LC. API Information",
            servers: ['http://localhost:5000']
        }
    },
    apis: ['./routes/*.js']
}

const swaggerDocs = (app) => {
    const swaggerDcs = swaggerJsDoc(swaggerOptions);
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDcs));
}

module.exports = swaggerDocs;