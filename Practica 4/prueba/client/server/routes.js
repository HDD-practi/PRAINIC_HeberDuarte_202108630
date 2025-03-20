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
  db.query('SELECT * FROM publicacion', (err, result) => {
    if (err) {
      console.error('Error al obtener publicaciones', err);
      return res.status(500).json({ error: 'Error al obtener publicaciones' });
    }

    // Convertimos la fecha a formato ISO en el backend
    const publicaciones = result.map((pub) => ({
      ...pub,
      fecha: new Date(pub.fecha).toISOString(), // Convierte la fecha a formato ISO
    }));

    res.json(publicaciones);
  });
});

// Crear una nueva publicación
router.post('/publicaciones', (req, res) => {
  const { publicacion, idcurso, idcatedratico, tipo, registroacademico } = req.body;
  const fecha = new Date().toISOString(); // Fecha actual en formato ISO

  const query = `
    INSERT INTO publicacion (publicacion, idcurso, idcatedratico, tipo, fecha, registroacademico)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [publicacion, idcurso, idcatedratico, tipo, fecha, registroacademico], (err, result) => {
    if (err) {
      console.error('Error al crear publicación', err);
      return res.status(500).json({ error: 'Error al crear publicación' });
    }
    res.status(201).json({ message: 'Publicación creada con éxito' });
  });
});

// Responder a una publicación
router.post('/responder', (req, res) => {
  const { idpublicacion, mensaje, registroacademico } = req.body;
  const fecha = new Date().toISOString(); // Fecha de la respuesta

  // Verificamos si los campos necesarios están presentes
  if (!idpublicacion || !mensaje || !registroacademico) {
    return res.status(400).json({ error: 'Faltan campos necesarios' });
  }

  // Consulta para insertar el mensaje en la tabla 'mensajes'
  const query = `
    INSERT INTO mensajes (mensaje, idpublicacion, registroacademico, fecha)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [mensaje, idpublicacion, registroacademico, fecha], (err, result) => {
    if (err) {
      console.error('Error al crear respuesta', err);
      return res.status(500).json({ error: 'Error al crear respuesta' });
    }

    // Responder con el mensaje de éxito
    res.status(201).json({ message: 'Respuesta enviada con éxito' });
  });
});

// Obtener mensajes de una publicación
router.get('/respuestas/:idpublicacion', (req, res) => {
  const { idpublicacion } = req.params;

  const query = `
    SELECT * FROM mensajes WHERE idpublicacion = ?
  `;

  db.query(query, [idpublicacion], (err, result) => {
    if (err) {
      console.error('Error al obtener respuestas', err);
      return res.status(500).json({ error: 'Error al obtener respuestas' });
    }
    res.json(result); // Devolvemos las respuestas de la publicación
  });
});

router.get('/perfil/:registroacademico/cursos', (req, res) => {
  const registroacademico = req.params.registroacademico;
  const query = `SELECT * FROM cursos WHERE registroacademico = ?`;

  db.query(query, [registroacademico], (err, result) => {
    if (err) {
      console.error('Error al obtener los cursos', err);
      return res.status(500).json({ error: 'Error al obtener los cursos' });
    }
    res.status(200).json(result);
  });
});

// Agregar un curso aprobado para un usuario
router.post('/perfil/:registroacademico/cursos', (req, res) => {
  const registroacademico = req.params.registroacademico;
  const { curso } = req.body;
  
  // Solo el usuario logueado puede agregar un curso
  if (registroacademico !== req.body.registroacademico) {
    return res.status(403).json({ error: 'No tienes permisos para agregar cursos a este perfil' });
  }

  const query = `INSERT INTO cursos (registroacademico, curso) VALUES (?, ?)`;

  db.query(query, [registroacademico, curso], (err, result) => {
    if (err) {
      console.error('Error al agregar el curso', err);
      return res.status(500).json({ error: 'Error al agregar el curso' });
    }
    res.status(201).json({ message: 'Curso agregado correctamente' });
  });
});


module.exports = router;





