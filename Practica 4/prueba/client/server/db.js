const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',       // Dirección del servidor de la base de datos
  user: 'root',            // Usuario de la base de datos
  password: 'SuperXD', // Contraseña de la base de datos
  database: 'notascatedraticos'  // Nombre de la base de datos
});

// Verifica si la conexión fue exitosa
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos');
  }
});

module.exports = connection;


