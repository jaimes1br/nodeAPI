const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');


const Storages = sequelize.define(
    "storages",
    {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        filename: {
            type: DataTypes.NUMBER,
        }
    },
    {
        timestamps: true,
    }
);


module.exports = Storages;