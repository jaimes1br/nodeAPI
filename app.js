//inicializamos las variables de entorno
require("dotenv").config()

// Espress: nos permite levantar un servicio web que estaremos usando
// para crear la base de datos
const express = require("express"); 
// Cors: en este coso es un plugin para nuestra aplicacion que nos
// permitira delimitar el acceso o dar acceso entre otras cosas a 
// nuestra app
const cors = require("cors");
//Generamos nuestra instancia para empezar a crear los servicios
// que usaremos, todos bajo el mismo elemento

const swaggerUi = require("swagger-ui-express");

const ENGINE_BD = process.env.ENGINE_BD;
const NODE_ENV = process.env.NODE_ENV || "development";

//importamos nuestra conexion a nuestra BD
const dbConnectNoSQL = require('./config/mongo');
const { dbConnectMySql } = require('./config/mysql');

const openApiConfiguration = require('./docs/swagger')


const app = express();

// Le decimos a la app que use el plugin de cors
app.use(cors());

//para preparar a la BD para recibir elementos en un JSON
app.use(express.json());

//para mostrar datos publicos/estaticos,sacalos y que se puedan ver y los sacas de "storage"
app.use(express.static("storage"));

const port = process.env.PORT || 3000; //puerto que quiero usar


// Colocamos las rutas!

//definir ruta de la documentacion
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(openApiConfiguration))


//localhost/api/___
// con el ./routes buscmaos directamente en index
app.use("/api/",require("./routes"))




//da el inicio que a que nuestra app empiece a escuchar en el 
// puerto que queremos y en la consola nos dara el mensaje que estamos
// colocando dentro de si es que se pudo levantar bien la app

if( NODE_ENV !== 'test'){
    app.listen(port, () =>{
        console.log(`Tu app esta lista por http://localhost:${port}`);
    });
}


// (ENGINE_BD === 'nosql') ? dbConnectNoSQL() : dbConnectMySql()

dbConnectNoSQL();

module.exports = app

