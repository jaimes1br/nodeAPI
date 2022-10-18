const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const { Storage } = require('./storage');

const Tracks = sequelize.define(
    "tracks",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        album: {
            type: DataTypes.NUMBER,
        },
        cover: {
            type: DataTypes.STRING,
        },
        artist_name: {
            type: DataTypes.STRING,
        },
        artist_nickname: {
            type: DataTypes.STRING,
        },
        artist_nacionality: {
            type: DataTypes.STRING,
        },
        duration_start: {
            type: DataTypes.INTEGER,
        },
        duration_end: {
            type: DataTypes.INTEGER,
        },
        mediaId: {
            type: DataTypes.INTEGER,
        },
    },
    {
        timestamps: true,
    }
);


//modelo personalizado
Tracks.findAllData = () => {
    //Una cancion pertenece a(belongsTo) un storage
    Tracks.belongsTo(Storage,{
        foreignKey: 'mediaId',
        as: 'audio'
    }) //creamos la relacion entre ambas tablas a partir de la propiedad mediaId

    return Tracks.findAll({include: 'audio'});
    //include:Storage, me traera los datos juntos con los de storaga, los de la relacion
}

Tracks.findOneData = (id) => {
    //Una cancion pertenece a(belongsTo) un storage
    Tracks.belongsTo(Storage,{
        foreignKey: 'mediaId',
        as: 'audio'
    }) //creamos la relacion entre ambas tablas a partir de la propiedad mediaId

    return Tracks.findOne({where:{id}, include: 'audio'});
    //include:Storage, me traera los datos juntos con los de storaga, los de la relacion
}


module.exports = Tracks;