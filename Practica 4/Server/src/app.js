// server.js (o app.js)
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Para permitir peticiones desde React
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia esto por tu usuario de MySQL
  password: '', // Cambia esto por tu contraseña de MySQL
  database: 'mi_base_de_datos', // Cambia esto por tu base de datos
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Ruta para login
app.post('/api/login', (req, res) => {
  const { registroAcademico, password } = req.body;

  const query = 'SELECT * FROM usuarios WHERE registro_academico = ? AND password = ?';
  db.query(query, [registroAcademico, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al autenticar' });
    }

    if (result.length > 0) {
      // Usuario encontrado
      return res.status(200).json({ message: 'Login exitoso', user: result[0] });
    } else {
      return res.status(400).json({ error: 'Credenciales incorrectas' });
    }
  });
});

// Ruta para registro de usuario
app.post('/api/register', (req, res) => {
  const { registroAcademico, password } = req.body;

  const query = 'INSERT INTO usuarios (registro_academico, password) VALUES (?, ?)';
  db.query(query, [registroAcademico, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al registrar usuario' });
    }

    return res.status(200).json({ message: 'Usuario registrado exitosamente' });
  });
});

// Ruta para obtener publicaciones
app.get('/api/posts', (req, res) => {
  const query = 'SELECT * FROM publicaciones';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener publicaciones' });
    }

    return res.status(200).json(result); // Devolvemos las publicaciones
  });
});

// Ruta para obtener las respuestas a una publicación
app.get('/api/posts/:id/responses', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM respuestas WHERE post_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener respuestas' });
    }

    return res.status(200).json(result); // Devolvemos las respuestas
  });
});

// Arrancar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
