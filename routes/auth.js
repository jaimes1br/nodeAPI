const express = require("express");
const { loginController,registerController } = require("../controllers/auth");
const router = express.Router();
const { validadorRegister,validadorLogin } = require("../validators/auth");


/**
 *  Route Register new user
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *              - auth
 *          summary: "Register nuevo usuario"
 *          description: "Ruta para registrar un nuevo usuario"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: "#/components/schemas/authRegister"
 *          responses:
 *              '201':
 *                  description: "usuario registrado de manera correcta"
 *              '403':
 *                  description: "Error por validacion de usuario"
 */
router.post("/register",validadorRegister,registerController); //crear elemento


router.post("/login",validadorLogin,loginController); //crear elemento



module.exports = router