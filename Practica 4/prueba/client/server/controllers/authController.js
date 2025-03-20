const db = require('../db'); // Asegúrate de que el archivo de conexión esté correctamente importado

// Función para el login
const login = (req, res) => {
  const { registroAcademico, password } = req.body;

  const query = 'SELECT * FROM usuario WHERE registro_academico = ?';
  
  db.query(query, [registroAcademico], (err, results) => {
    if (err) {
      console.error('Error al realizar la consulta a la base de datos:', err);
      return res.status(500).json({ message: 'Error al verificar las credenciales' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = results[0];

    if (user.contrasena === password) {
      return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
  });
};

// Función para registrar un nuevo usuario
const register = (req, res) => {
  const { registroAcademico, nombre, apellido, correo, contrasena } = req.body;

  // Verificar si el registro académico ya está en uso
  const checkQuery = 'SELECT * FROM usuario WHERE registro_academico = ?';
  db.query(checkQuery, [registroAcademico], (err, results) => {
    if (err) {
      console.error('Error al consultar la base de datos:', err);
      return res.status(500).json({ message: 'Error al verificar el registro académico' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'El registro académico ya está en uso' });
    }

    // Si el registro académico no está en uso, insertamos el nuevo usuario
    const insertQuery = 'INSERT INTO usuario (registro_academico, nombre, apellido, correo, contrasena) VALUES (?, ?, ?, ?, ?)';
    db.query(insertQuery, [registroAcademico, nombre, apellido, correo, contrasena], (err, results) => {
      if (err) {
        console.error('Error al insertar el usuario en la base de datos:', err);
        return res.status(500).json({ message: 'Error al registrar el usuario' });
      }

      return res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
  });
};

module.exports = { login, register };
