const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const fs = require("fs");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

// obtener lista de elementos
const getItems = async (req,res) =>{
    //traer todos los elementos en la coleccion
    try{
        const data = await storageModel.find({});    
        res.send({data});
    }catch(e){
        handleHttpError(res,'Error GETITEMS_storage');
    }
};

//obtener un elemento de la lista
const getItem = async (req,res) => {
    try{
        const { id } = matchedData(req);
        const data = await storageModel.findById(id);
        res.send({data});
    }catch(e){
        handleHttpError(res,'Error UPDATEITEMS_storage');
    }
};


//agregar un nuevo registro
const createItem = async (req,res) => {
    try{
        const { body, file } = req;
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData);
        res.status(201);
        res.send({data});
    }catch(e){
        handleHttpError(res,'Error CREATEITEM_storage');
    }
};


//eliminar un elemento
const deleteItem = async (req,res) => {
    try{
        const { id } = matchedData(req);
        const dataFile = await storageModel.findById(id);  
        await storageModel.deleteOne({_id:id});
        const { filename } = dataFile;
        const filePath =  `${MEDIA_PATH}/${filename}`;
        fs.unlinkSync(filePath);
        const data = {
            filePath,
            deleted:1
        }

        res.send({ data });

    }catch(e){
        console.log(e);
        handleHttpError(res,'Error DELETEITEMS_storage');
    }
};



module.exports = { getItems,getItem,createItem,deleteItem}