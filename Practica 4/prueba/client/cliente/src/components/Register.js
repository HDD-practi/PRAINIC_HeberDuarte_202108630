import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [registroAcademico, setRegistroAcademico] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        registroAcademico,
        nombre,
        apellido,
        correo,
        contrasena,
      });

      // Mostrar mensaje de éxito si el registro es exitoso
      setMensaje(response.data.message);
      
      // Si el registro fue exitoso, redirigir al login
      if (response.status === 201) {
        setTimeout(() => {
          navigate('/');
        }, 2000); // Redirigir después de 2 segundos
      }
    } catch (error) {
      console.error('Error al registrar el usuario', error);
      setMensaje(error.response ? error.response.data.message : 'Error en el servidor');
    }
  };

  return (
    <div className="register-container">
      <h2>Crear una cuenta</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="registroAcademico">Registro Académico:</label>
          <input
            type="text"
            id="registroAcademico"
            value={registroAcademico}
            onChange={(e) => setRegistroAcademico(e.target.value)}
            placeholder="Ingresa tu registro académico"
            required
          />
        </div>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa tu nombre"
            required
          />
        </div>
        <div>
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Ingresa tu apellido"
            required
          />
        </div>
        <div>
          <label htmlFor="correo">Correo Electrónico:</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Ingresa tu correo"
            required
          />
        </div>
        <div>
          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Register;
