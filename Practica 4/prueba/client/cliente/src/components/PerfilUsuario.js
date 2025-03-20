// PerfilUsuario.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PerfilUsuario = ({ match }) => {
  const [perfil, setPerfil] = useState(null);
  const { registroacademico } = match.params;

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/perfil/${registroacademico}`);
        setPerfil(response.data);
      } catch (error) {
        console.error('Error al obtener perfil:', error);
      }
    };

    fetchPerfil();
  }, [registroacademico]);

  if (!perfil) return <div>Cargando perfil...</div>;

  return (
    <div>
      <h2>Perfil de {perfil.nombre}</h2>
      <p><strong>Registro Académico:</strong> {perfil.registroacademico}</p>
      <p><strong>Correo:</strong> {perfil.correo}</p>
      <p><strong>Curso Aprobados:</strong> {perfil.cursos_aprobados}</p>
      {/* Aquí puedes mostrar más información del perfil */}
    </div>
  );
};

export default PerfilUsuario;
