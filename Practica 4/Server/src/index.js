// server/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path'); // Para servir el frontend en producción
const app = express();

// Middleware
app.use(cors()); // Permitir peticiones desde cualquier origen
app.use(bodyParser.json()); // Para procesar los datos JSON del cuerpo de las peticiones

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia esto por tu usuario
  password: '', // Cambia esto por tu contraseña
  database: 'mi_base_de_datos', // Cambia esto por el nombre de tu base de datos
});

// Conexión exitosa o error
db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Importar las rutas
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

// Usar las rutas en el servidor
app.use('/api/auth', authRoutes); // Rutas de autenticación (login y registro)
app.use('/api/posts', postRoutes); // Rutas para publicaciones

// Servir el frontend (si estás en producción y tienes un build de React)
if (process.env.NODE_ENV === 'production') {
  // Servir los archivos estáticos de React
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Escuchar en el puerto 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
