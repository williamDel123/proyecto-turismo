const {DataTypes} = require('sequelize');
const sequelize = require('../data/db');

const User = sequelize.define(
    'User',{
        nombre:{
            type:DataTypes.STRING(25),
            allowNull:false,
            validate:{notEmpty:true}
        },
        apellido:{
            type:DataTypes.STRING(50),
            allowNull:false,
            validate:{notEmpty:true}
        },
        edad:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{notEmpty:true}
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{isEmail:true,notEmpty:true}
        },
         user:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{notEmpty:true,len:[3,40]}
        },
        passwordhash:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{notEmpty:true}
        }
    },{
        tableName:'users',
        underscored:true
    }
);

module.exports = User;