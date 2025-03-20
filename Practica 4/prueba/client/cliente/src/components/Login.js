import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [registroAcademico, setRegistroAcademico] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        registroAcademico,
        password,
      });

      if (response.status === 200) {
        // Si el login es exitoso, redirigir a la página de publicaciones
        navigate('/home');
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
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
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      <div>
        <p>Aún no tienes una cuenta?</p>
        <button onClick={() => navigate('/register')}>Crear una cuenta</button>
      </div>
    </div>
  );
};

export default Login;

