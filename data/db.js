const {Sequelize} = require('sequelize'); //Importamos sequelize
require('dotenv').config();//importamos dotenv

/*Creamos una constante que dentro tendra el tipo de 
gestor de base de datos a utilizar,y el nombre de la base de datos
e indicamos que no queremos que tenga informacion para atras
*/
const sequelize = new Sequelize({
    dialect:process.env.DB_DIALECT || 'sqlite',
    storage:process.env.DB_STORAGE || './turismo.sqlite',
    logger:false,
});

module.exports = sequelize; /*exportamos nuestro objeto con las 
configuraciones de lugar*/
