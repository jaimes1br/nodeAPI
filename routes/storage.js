const express = require("express");

const uploadMiddleware = require("../utils/handleStorage"); 
const { createItem, getItem, getItems, deleteItem } = require("../controllers/storage");
const { validatorGetItem } = require("../validators/storage");

const router = express.Router();



// single de que solo estoy enviando un archivo, lo va a tomar mi middleware,
// pero le tengo que decir que dentro de mi peticion en myFile, esta mi archivo
router.post("/",uploadMiddleware.single("myFile"),createItem);

router.get("/",getItems);
router.get("/:id",validatorGetItem,getItem);
router.delete("/:id",validatorGetItem,deleteItem);


module.exports = router;