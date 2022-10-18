const { validationResult } = require("express-validator")

const validateResults = (req,res,next) =>{
    try{
        validationResult(req).throw(); //hace la validadaciones, si hay error lo arroja
        return next(); //si no hay error pasa al controlador
    } catch(err){
        res.status(403);
        res.send({errors: err.array()})
    }
};


module.exports = validateResults;