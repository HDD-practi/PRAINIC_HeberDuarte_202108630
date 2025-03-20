const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController'); // Asegúrate de que la ruta sea correcta
const publicacionesController = require('./controllers/publicacionesController');

// Ruta para el inicio de sesión
router.post('/login', authController.login);

// Ruta para el registro de usuario
router.post('/register', authController.register);


// Obtener detalles de una publicación por id
router.get('/publicaciones/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM publicacion WHERE idpublicacion = ?', [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }
    res.status(200).json(result[0]); // Devolvemos solo el primer (y único) resultado
  } catch (err) {
    console.error('Error al obtener los detalles de la publicación:', err);
    res.status(500).json({ message: 'Error al obtener los detalles de la publicación' });
  }
});

router.get('/publicaciones', publicacionesController.getPublicaciones);

// Ruta para crear una nueva publicación
router.post('/publicaciones', publicacionesController.createPublicacion);

// Ruta para obtener respuestas a una publicación
router.get('/publicaciones/:id/respuestas', publicacionesController.getRespuestas);

// Ruta para agregar una respuesta a una publicación
router.post('/publicaciones/:id/respuestas', publicacionesController.addRespuesta);

module.exports = router;





