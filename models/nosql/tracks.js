const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const TracksScheme = new mongoose.Schema(
    {
        name: { type: String},
        album: { type: String},
        cover: {
            type: String,
            validate: {
                validator: (req) =>{
                    return true
                },
                message: "ERROR_URL",
            },
        },
        artist: {
            name: { type: String},
            nickname: { type: String},
            nacionality: { type: String},
        },
        duration: {
            start: {type: Number},
            end: {type: Number}
        },
        mediaId:{
            type: mongoose.Types.ObjectId
        }
    },
    {
        timestamps: true, //nos crea las columnas de fecha de creacion y fecha de actualizacion
        versionKey: false
    }
);



//Metodoo para tener la relacion track-storage
TracksScheme.statics.findAllData = () => {
    const joinData = this.aggregate([
        {
            $lookup: {
                from: "storages", //la relacion va del padre al hijo, en este caso tracks -> storages
                localField: "mediaId", //la relacion se hace desde esta propiedad (del padre),
                foreignField: "_id", // la relacion se hace desde esta propiedad (del hijo) 
                //osease la relacion es mediaId === _id, traime lo que sea igual a eso
                as: "audio" // y el elemento se guarda en un alias llamado audio
            },
        },
        {
            $unwind: "$audio",
        }
    ])

    return joinData; 
};

TracksScheme.statics.findOneData = (id) => {
    const joinData = this.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(id)
            },
        },
        {
            $lookup: {
                from: "storages", //la relacion va del padre al hijo, en este caso tracks -> storages
                localField: "mediaId", //la relacion se hace desde esta propiedad (del padre),
                foreignField: "_id", // la relacion se hace desde esta propiedad (del hijo) 
                //osease la relacion es mediaId === _id, traime lo que sea igual a eso
                as: "audio" // y el elemento se guarda en un alias llamado audio
            },
        },
        {
            $unwind: "$audio",
        }
    ])
    return joinData; 

};


TracksScheme.plugin(mongooseDelete,{overrideMethods:'all'});

module.exports = mongoose.model("tracks", TracksScheme);