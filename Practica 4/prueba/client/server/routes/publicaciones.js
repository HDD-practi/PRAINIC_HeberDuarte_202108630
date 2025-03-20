// routes/publicaciones.js
const express = require('express');
const router = express.Router();
const connection = require('../db');  // Usamos la conexión de mysql2 sin promesas

// Obtener todas las publicaciones con los filtros de curso y catedrático
router.get('/publicaciones', (req, res) => {
  const { curso, catedratico } = req.query;
  let query = 'SELECT * FROM publicacion';
  const params = [];

  if (curso) {
    query += ' WHERE idcurso = ?';
    params.push(curso);
  }

  if (catedratico) {
    query += ' AND idcatedratico = ?';
    params.push(catedratico);
  }

  connection.query(query, params, (err, publicaciones) => {
    if (err) {
      console.error('Error al obtener publicaciones:', err);
      return res.status(500).json({ message: 'Error al obtener publicaciones' });
    }

    // Obtener respuestas para cada publicación
    let publicacionesConRespuestas = [];
    let publicacionesProcesadas = 0;

    publicaciones.forEach((publicacion, index) => {
      connection.query(
        'SELECT * FROM mensajes WHERE idpublicacion = ?',
        [publicacion.idpublicacion],
        (err, respuestas) => {
          if (err) {
            console.error('Error al obtener respuestas:', err);
            return res.status(500).json({ message: 'Error al obtener respuestas' });
          }

          publicaciones[index].respuestas = respuestas;
          publicacionesProcesadas++;

          // Cuando todas las publicaciones hayan sido procesadas, enviamos la respuesta
          if (publicacionesProcesadas === publicaciones.length) {
            return res.json(publicaciones);
          }
        }
      );
    });
  });
});

// Crear una nueva publicación
router.post('/publicaciones', (req, res) => {
  const { idcurso, idcatedratico, registroacademico, publicacion, tipo } = req.body;
  const fecha = new Date();  // Fecha actual

  connection.query(
    'INSERT INTO publicacion (idcurso, idcatedratico, registroacademico, publicacion, fecha, tipo) VALUES (?, ?, ?, ?, ?, ?)',
    [idcurso, idcatedratico, registroacademico, publicacion, fecha, tipo],
    (err, result) => {
      if (err) {
        console.error('Error al crear publicación:', err);
        return res.status(500).json({ message: 'Error al crear publicación' });
      }
      res.status(201).json({ message: 'Publicación creada correctamente' });
    }
  );
});

// Responder a una publicación
router.post('/publicaciones/:id/respuesta', (req, res) => {
  const { id } = req.params;
  const { mensaje, registroacademico } = req.body;
  const fecha = new Date();

  connection.query(
    'INSERT INTO mensajes (mensaje, idpublicacion, registroacademico, fecha) VALUES (?, ?, ?, ?)',
    [mensaje, id, registroacademico, fecha],
    (err, result) => {
      if (err) {
        console.error('Error al agregar respuesta:', err);
        return res.status(500).json({ message: 'Error al agregar respuesta' });
      }
      res.status(201).json({ message: 'Respuesta agregada correctamente' });
    }
  );
});

module.exports = router;
