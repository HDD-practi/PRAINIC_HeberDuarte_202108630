// Publicaciones.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    // Cargar las publicaciones
    const fetchPublicaciones = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/publicaciones');
        setPublicaciones(response.data);
      } catch (error) {
        console.error('Error al obtener publicaciones:', error);
      }
    };

    fetchPublicaciones();
  }, []);

  return (
    <div>
      <h2>Publicaciones</h2>
      <button>
        <Link to="/crear-publicacion">Crear Publicación</Link>
      </button>
      <ul>
        {publicaciones.length > 0 ? (
          publicaciones.map((publicacion) => (
            <li key={publicacion.idpublicacion}>
              <h3>{publicacion.publicacion}</h3>
              <p><strong>Curso:</strong> {publicacion.idcurso}</p>
              <p><strong>Catedrático:</strong> {publicacion.idcatedratico}</p>
              <p><strong>Tipo:</strong> {publicacion.tipo}</p>
              <Link to={`/perfil/${publicacion.registroacademico}`}>Ver perfil</Link>
            </li>
          ))
        ) : (
          <p>No hay publicaciones disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default Publicaciones;



