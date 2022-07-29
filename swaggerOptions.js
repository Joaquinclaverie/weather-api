const path = require("path")

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: "Weather API",
            version: '1.0.0',
            descripcion: "Api que utiliza OpenWeatherAPI"
        },
        servers: [
            {url:"http://localhost:3000"}
        ]
    },
    apis: [`${path.join(__dirname, "./swagger/*.js")}`]
}

module.exports = swaggerOptions