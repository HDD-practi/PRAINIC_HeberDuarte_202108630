// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [registroAcademico, setRegistroAcademico] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook de navegación

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica para verificar las credenciales (esto puede ser con una API real)
    console.log('Registro Académico:', registroAcademico);
    console.log('Contraseña:', password);

    // Redirigir a una nueva página si el login es exitoso (opcional)
    // navigate('/home');
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
