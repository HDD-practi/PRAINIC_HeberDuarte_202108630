import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  // Estados para los datos del formulario
  const [registroAcademico, setRegistroAcademico] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleRegister = async (e) => {
    e.preventDefault();

    // Validamos que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      // Enviamos los datos al backend
      const response = await axios.post('http://localhost:5000/api/register', {
        registroAcademico,
        nombre,
        apellido,
        correo,
        password,
      });

      if (response.status === 200) {
        // Si el registro es exitoso, redirigimos al login
        alert('Usuario creado exitosamente!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error al crear usuario', error);
      alert('Hubo un error al crear la cuenta, por favor intenta nuevamente.');
    }
  };

  return (
    <div className="register-container">
      <h2>Crear cuenta</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="registroAcademico">Registro Académico:</label>
          <input
            type="text"
            id="registroAcademico"
            value={registroAcademico}
            onChange={(e) => setRegistroAcademico(e.target.value)} // Actualiza el estado
            placeholder="Ingresa tu registro académico"
            required
          />
        </div>
        <div>
          <label htmlFor="nombre">Nombres:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)} // Actualiza el estado
            placeholder="Ingresa tu nombre"
            required
          />
        </div>
        <div>
          <label htmlFor="apellido">Apellidos:</label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)} // Actualiza el estado
            placeholder="Ingresa tus apellidos"
            required
          />
        </div>
        <div>
          <label htmlFor="correo">Correo Electrónico:</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)} // Actualiza el estado
            placeholder="Ingresa tu correo electrónico"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Actualiza el estado
            placeholder="Confirma tu contraseña"
            required
          />
        </div>
        <button type="submit">Crear cuenta</button>
      </form>
      <div>
        <p>¿Ya tienes una cuenta?</p>
        <button onClick={() => navigate('/')}>Iniciar sesión</button>
      </div>
    </div>
  );
};

export default Register;

