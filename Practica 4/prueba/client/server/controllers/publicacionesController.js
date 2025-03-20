// publicacionesController.js

const db = require('../db');  // Asegúrate de que esto sea correcto y esté configurado

// Obtener todas las publicaciones con filtros por curso o catedrático
const getPublicaciones = async (req, res) => {
  const { curso, catedratico } = req.query;
  let query = 'SELECT * FROM publicacion';

  if (curso) {
    query += ' WHERE idcurso = ?';
  } else if (catedratico) {
    query += ' WHERE idcatedratico = ?';
  }

  try {
    const publicaciones = await db.query(query, [curso || catedratico]);
    res.json(publicaciones);
  } catch (error) {
    console.error('Error al obtener publicaciones:', error);
    res.status(500).json({ message: 'Error al obtener publicaciones' });
  }
};

// Crear una nueva publicación
const createPublicacion = async (req, res) => {
  const { idcurso, idcatedratico, registroacademico, publicacion, tipo } = req.body;
  const fecha = new Date();  // Fecha actual

  try {
    const result = await db.query(
      'INSERT INTO publicacion (idcurso, idcatedratico, registroacademico, publicacion, fecha, tipo) VALUES (?, ?, ?, ?, ?, ?)',
      [idcurso, idcatedratico, registroacademico, publicacion, fecha, tipo]
    );
    res.status(201).json({ message: 'Publicación creada correctamente' });
  } catch (error) {
    console.error('Error al crear publicación:', error);
    res.status(500).json({ message: 'Error al crear publicación' });
  }
};

// Obtener respuestas a una publicación
const getRespuestas = async (req, res) => {
  const { id } = req.params;

  try {
    const respuestas = await db.query('SELECT * FROM mensajes WHERE idpublicacion = ?', [id]);
    res.json(respuestas);
  } catch (error) {
    console.error('Error al obtener respuestas:', error);
    res.status(500).json({ message: 'Error al obtener respuestas' });
  }
};

// Agregar una respuesta a una publicación
const addRespuesta = async (req, res) => {
  const { id } = req.params;
  const { mensaje, registroacademico } = req.body;
  const fecha = new Date();  // Fecha actual

  try {
    await db.query(
      'INSERT INTO mensajes (mensaje, idpublicacion, registroacademico, fecha) VALUES (?, ?, ?, ?)',
      [mensaje, id, registroacademico, fecha]
    );
    res.status(201).json({ message: 'Respuesta agregada correctamente' });
  } catch (error) {
    console.error('Error al agregar respuesta:', error);
    res.status(500).json({ message: 'Error al agregar respuesta' });
  }
};

module.exports = {
  getPublicaciones,
  createPublicacion,
  getRespuestas,
  addRespuesta,
};
