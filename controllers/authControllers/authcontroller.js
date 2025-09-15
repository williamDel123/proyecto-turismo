const bcrypt = require('bcrypt');
const users = require('../../models/user');
 
exports.mostrarLogin = (req,res)=>{
    res.render('pages/login.njk',{
        title:'Login'
    });
};

exports.mostrarRegistro = (req,res)=>{
    res.render('pages/registro.njk',{
        title:'Registro',
        errors:[],
        old:{}
    });
};

exports.EnviarRegistro = async(req,res)=>{
    const {nombre,apellido,edad,email,user,passwordhash,confirmarpassword} = req.body;

    const errors=[];
    if(!nombre?.trim())errors.push('El nombre no debe estar vacio.');
    if(!apellido?.trim())errors.push('El apellido no debe estar vacio.');
    if(!edad?.trim())errors.push('El edad no debe estar vacio.');
    if(!email?.trim())errors.push('El email no debe estar vacio.');
    if(!user?.trim())errors.push('El email no debe estar vacio.');
    if(!passwordhash)errors.push('Debe colocar una contraseña');
    if(passwordhash !== confirmarpassword)errors.push("Las contraseñas son diferentes.");
    if(edad &&(isNaN(Number(edad))) || Number(edad) < 0 || Number(edad)> 120){
        errors.push("Debe Ingresar una edad valida");
    }
    if(email){
        const existEmail = await users.findOne({where:{email}});
        if(existEmail)errors.push('El correo ya esta en uso.');
    }
    if(errors.length){
        return res.status(400).render('pages/registro.njk',{
        title:'Registro',
        errors,
        old:{nombre,apellido,edad,email,user}
        });
    };
    try{
        const Passwordhash = await
        bcrypt.hash(passwordhash,12);
        await users.create({
        nombre:nombre.trim().toLowerCase(),
        apellido:apellido.trim().toLowerCase(),
        edad:edad ? Number(edad):null,
        email:email.trim().toLowerCase(),
        user:user.trim().toLowerCase(),
        passwordhash:Passwordhash,
        });
        return res.redirect('/');
    }catch(err){
        console.error(err);
        return res.status(500).render('pages/registro.njk',{
        title:'Registro',
        errors:['Ocurrio un error al registrar los datos, intenta de nuevo.'],
        old:{nombre,apellido,edad,email,user}
        });
    }
 
}
 


