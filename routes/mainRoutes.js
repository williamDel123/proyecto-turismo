const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers/authcontroller');

router.get('/',authController.mostrarLogin);
router.get('/registro',authController.mostrarRegistro);
router.post('/registro',authController.EnviarRegistro);
 

module.exports = router;


