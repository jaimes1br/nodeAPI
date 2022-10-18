const express = require("express");
const { getItems, getItem, createItem,updateItem,deletetem} = require("../controllers/tracks");
const customHeader = require("../middleware/customHeader");
const { checkRole } = require("../middleware/role");
const authMiddleware = require("../middleware/session");
const router = express.Router();
const { validatorCreateItem,validatorGetItem } = require("../validators/tracks")

//TODO http://localhost/tracks GET, POST, DELETE, PUT

router.get("/", authMiddleware,getItems); //lista de items

router.post("/",authMiddleware,checkRole(['admin']),validatorCreateItem,createItem); //crear elemento

router.get("/:id",validatorGetItem,getItem) //obtener un elemento

router.put("/:id",validatorGetItem,validatorCreateItem,updateItem)//actualizar un elemento

router.delete("/:id",validatorGetItem,deletetem); //eliminar un elemento


module.exports = router