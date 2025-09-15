require('dotenv').config({ override: true });
const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');

const app = express();

app.use(express.urlencoded({extended:true}))//Esta parte
app.use(express.json())//Esta parte

const viewPath = path.join(__dirname,'view')  

 
nunjucks.configure('view',{
    autoescape:true,
    express:app,
    watch:true,  
    noCache:true  
}); 

app.set('views',viewPath);

app.set('view engine','njk');

app.use(express.static(path.join(__dirname,'public')));

const mainRoutes = require('./routes/mainRoutes'); 

app.use('/',mainRoutes); 

const sequelize = require('./data/db');//Esta parte
require('./models/user');//Esta parte
 
const PORT =process.env.PORT  || 3000;
//Esta parte
 (async()=>{
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT,()=>{
             console.log(`Servidor iniciado en http://localhost:${PORT}`)
        });
    }catch(e){
        console.error('Error al iniciar el servidor:',e);
        process.exit(1)
    }
 })();
 


