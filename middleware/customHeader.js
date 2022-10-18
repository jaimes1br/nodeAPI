const customHeader = (req, res, next) =>{
    try{
        const apiKey = req.headers.api_key;
        if(apiKey === 'brandonSecret'){
            next()
        }else{
            res.status(403);
            res.send({error: "API KEY no es correcto"})
        }
    }catch(e){
        res.status(403); 
        res.send({error: "Error Header"})

    }
}


module.exports = customHeader;