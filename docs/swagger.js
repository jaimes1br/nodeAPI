const swaggerJsdoc = require("swagger-jsdoc");


/** Configuracion de la documentacion, nombre, contacto, version etc... */
const swaggerDefinition = {
    openapi: "3.0.0",
    info:{
        title: "Documentacion de mi API",
        version: "1.0.1"
    },
    //serversss
    servers: [
        {
            url: "http://localhost:3002/api"
        }
    ],
    components:{
        securitySchemes:{
            bearerAuth: {
                type:"http",
                scheme:"bearer"
            }
        },
        schemas: {
            authLogin: {},
            authRegister: {
                type: "object",
                required: ["email","password","name","age"],
                properties:{
                    email:{ type: 'string' },
                    password:{ type: 'string' },
                    name:{ type: 'string' },
                    age:{ type: 'integer' },
                }
            },
            track:{
                type: "object",
                required:["name","album"],
                properties: {
                    name:{ type: 'string' },
                    album:{ type: 'string' },
                    cover:{ type: 'string' },
                    artist: {
                        type:"object",
                        properties: {
                            name:{ type: 'string' },
                            nickname:{ type: 'string' },
                            nacionality:{ type: 'string' },
    
                        }
                    },
                    duration: {
                        type:"object",
                        properties: {
                            start:{ type: 'integer' },
                            end:{ type: 'integer' },
    
                        }
                    },
                    mediaId:{ type: 'string' },
                }
            }
        },   
    }
}

/*** opciones */

const options = {
    swaggerDefinition,
    apis: [
        "./routes/*.js" //directorio donde tenemos las rutas
    ]
};

const openApiConfiguration = swaggerJsdoc(options);


module.exports = openApiConfiguration