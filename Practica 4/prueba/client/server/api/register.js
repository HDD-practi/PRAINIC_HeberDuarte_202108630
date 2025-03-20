const express = require('express');
const router = express.Router();
const Usuario = require('./models/usuario'); // Asegúrate de tener un modelo de usuario

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
  const { registroAcademico, nombre, apellido, correo, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await Usuario.findOne({ registro_academico: registroAcademico });
    if (existingUser) {
      return res.status(400).json({ message: 'Ya existe un usuario con ese registro académico' });
    }

    // Crear un nuevo usuario (sin encriptar la contraseña)
    const newUser = new Usuario({
      registro_academico: registroAcademico,
      nombre,
      apellido,
      correo,
      contrasena: password, // Guardamos la contraseña tal cual
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Responder con éxito
    res.status(200).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

module.exports = router;
