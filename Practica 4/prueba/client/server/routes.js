const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController'); // Asegúrate de que la ruta sea correcta

// Ruta para el inicio de sesión
router.post('/login', authController.login);

// Ruta para el registro de usuario
router.post('/register', authController.register);

module.exports = router;





