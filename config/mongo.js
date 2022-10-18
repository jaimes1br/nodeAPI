const mongoose = require("mongoose");
const NODE_ENV = process.env.NODE_ENV;

const dbConnect = () => {
    const db_uri = (NODE_ENV === 'test') ? process.env.DB_URI_TEST : process.env.DB_URI;
    mongoose.connect(db_uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },(err,res) =>{
        if(!err){
            console.log(`*****Conexion Exitosa******`);
        }else{
            console.log(`*****Error de Conexion******`);
        }
    });
}

module.exports = dbConnect

