const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('./models/usuario'); // Asume que tienes un modelo de Usuario

router.post('/login', async (req, res) => {
  const { registroAcademico, password } = req.body;
  
  try {
    // Buscar al usuario por registro académico
    const user = await Usuario.findOne({ registro_academico: registroAcademico });
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.contrasena);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Crear un token (si es necesario, puedes agregar información adicional al payload)
    const token = jwt.sign({ registroAcademico: user.registro_academico }, 'secretkey', { expiresIn: '1h' });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
});

module.exports = router;
