

const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  registro_academico: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
