// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [registroAcademico, setRegistroAcademico] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Verificación simple de que las contraseñas coinciden
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Lógica para registrar el nuevo usuario (esto puede ser con una API real)
    console.log('Registro Académico:', registroAcademico);
    console.log('Contraseña:', password);
    console.log('Confirmar Contraseña:', confirmPassword);

    // Redirigir al login o a la página principal si el registro es exitoso
    navigate('/');
  };

  return (
    <div className="register-container">
      <h2>Crear una nueva cuenta</h2>
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
        <div>
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
