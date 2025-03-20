const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/publicaciones', (req, res) => {
    const { idcurso, idcatedratico, registroacademico, publicacion, tipo } = req.body;
  
    // Verificar que tipo sea 'catedratico' o 'curso'
    if (tipo !== 'catedratico' && tipo !== 'curso') {
      return res.status(400).json({ message: 'El tipo debe ser "catedratico" o "curso"' });
    }
  
    const query = `
      INSERT INTO publicaciones (idcurso, idcatedratico, registroacademico, publicacion, tipo)
      VALUES (?, ?, ?, ?, ?)
    `;
  
    db.query(query, [idcurso, idcatedratico, registroacademico, publicacion, tipo], (err, result) => {
      if (err) {
        console.error('Error al crear publicación:', err);
        return res.status(500).json({ message: 'Error al crear publicación', error: err });
      }
  
      res.status(201).json({ message: 'Publicación creada con éxito' });
    });
  });

  router.get('/publicaciones', (req, res) => {
    const query = 'SELECT * FROM publicaciones';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener publicaciones:', err);
        return res.status(500).json({ message: 'Error al obtener publicaciones', error: err });
      }
      res.json(results);
    });
  });

module.exports = router;
