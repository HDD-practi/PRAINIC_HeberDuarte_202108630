const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener perfil de usuario
router.get('/perfil/:registroacademico', (req, res) => {
  const { registroacademico } = req.params;

  // Obtener información del usuario (por ejemplo, nombre, correo, etc.)
  const userQuery = `SELECT nombre, correo FROM usuario WHERE registroacademico = ?`;
  db.query(userQuery, [registroacademico], (err, userResult) => {
    if (err) {
      return res.status(500).json({ message: "Error al obtener usuario", error: err });
    }

    if (userResult.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Obtener cursos aprobados
    const coursesQuery = `SELECT c.nombre AS curso FROM curso c
                          JOIN curso_aprobado ca ON ca.idcurso = c.idcurso
                          WHERE ca.registroacademico = ?`;
    db.query(coursesQuery, [registroacademico], (err, coursesResult) => {
      if (err) {
        return res.status(500).json({ message: "Error al obtener cursos aprobados", error: err });
      }

      res.json({
        usuario: userResult[0],
        cursosAprobados: coursesResult,
      });
    });
  });
});

module.exports = router;
