const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

//validaciones con express-validator 


// obtener lista de elementos
const getItems = async (req,res) =>{
    try{
        //traer todos los elementos en la coleccion
        const user = req.user;
        const data = await tracksModel.find({});    
        res.send({data, user});
    }catch(e){
        handleHttpError(res,'Error GETITEMS_tracks',403);
    }
};

//obtener un elemento de la lista
const getItem =  async (req,res) => {
    try{
        req = matchedData(req);
        const { id } = req;
        console.log(id);
        const data = await tracksModel.findOneData(id);    
        res.send({data});
    }catch(e){
        handleHttpError(res,'Error GETITEM_tracks',403);
    }
};


//agregar un nuevo registro
const createItem = async (req,res) => {
    try{
        const body = matchedData(req);
        const data = await tracksModel.create(body);
        res.send({data});
    }catch(e){
        handleHttpError(res, "Error CREATEITEM_tracks")
    }
};

//actualizar un nuevo registro
const updateItem =  async (req,res) => {
    try{
        const {id, ...body} = matchedData(req);
        const data = await tracksModel.findOneAndUpdate(id,body);
        res.send({data});
    }catch(e){
        handleHttpError(res, "Error UPDATEITEM_tracks")
    }
};


//eliminar un elemento
const deletetem =  async (req,res) => {
    try{
        req = matchedData(req);
        const { id } = req;
        const data = await tracksModel.delete({_id:id});    
        res.send({data});
    }catch(e){
        handleHttpError(res, "Error DELETEITEM_tracks")
    }
};



module.exports = { getItems,getItem,createItem,updateItem,deletetem}