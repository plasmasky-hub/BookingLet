const swaggerJsDoc = require('swagger-jsdoc');

module.exports = swaggerJsDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bookinglet',
            version: '1.0.1',
            contact: {
                name: "Derek",
                email: "s3582474@gmail.com",
            },
            description: 'APIs of Bookinglet.'
        },
    },
    apis: ['./controllers/*.js'],


})