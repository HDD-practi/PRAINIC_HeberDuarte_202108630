const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController'); // Asegúrate de que la ruta sea correcta
const publicacionesController = require('./controllers/publicacionesController'); // Asegúrate de que la ruta sea correcta
const db = require('./db');

// Ruta para el inicio de sesión
router.post('/login', authController.login);

// Ruta para el registro de usuario
router.post('/register', authController.register);

router.get('/publicaciones', (req, res) => {
  db.query('SELECT * FROM publicacion', (err, result) => {  // Cambiar de 'publicaciones' a 'publicacion'
    if (err) {
      console.error('Error al obtener publicaciones:', err);
      return res.status(500).send({ message: 'Error al obtener publicaciones' });
    }
    res.status(200).json(result);
  });
});

// Crear una nueva publicación
router.post('/publicaciones', (req, res) => {
  const { idcurso, idcatedratico, registroacademico, publicacion, tipo } = req.body;

  // Validar que tipo sea 'curso' o 'catedratico'
  if (tipo !== 'curso' && tipo !== 'catedratico') {
    return res.status(400).json({ message: 'El tipo debe ser "curso" o "catedratico"' });
  }

  // Insertar una nueva publicación en la tabla 'publicacion'
  const query = 'INSERT INTO publicacion (idcurso, idcatedratico, registroacademico, publicacion, tipo) VALUES (?, ?, ?, ?, ?)';  // Cambiar de 'publicaciones' a 'publicacion'
  db.query(query, [idcurso, idcatedratico, registroacademico, publicacion, tipo], (err, result) => {
    if (err) {
      console.error('Error al crear publicación:', err);
      return res.status(500).json({ message: 'Error al crear publicación', error: err });
    }
    res.status(200).json({ message: 'Publicación creada con éxito' });
  });
});

module.exports = router;





