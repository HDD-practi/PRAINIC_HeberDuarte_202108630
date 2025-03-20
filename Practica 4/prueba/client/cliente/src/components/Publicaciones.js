// Publicaciones.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [mensajes, setMensajes] = useState({}); // Para almacenar los mensajes por publicación

  // Obtener las publicaciones cuando se carga el componente
  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/publicaciones');
        setPublicaciones(response.data); // Almacenar las publicaciones en el estado

        // Obtener los mensajes de cada publicación
 
      } catch (error) {
        console.error('Error al obtener publicaciones:', error);
      }
    };

    fetchPublicaciones();
  }, []);




  return (
    <div>
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <button>
          <Link to="/perfil">Ir al perfil</Link>
        </button>
      </div>
      
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
              <p><strong>Registro académico:</strong> {publicacion.registroacademico}</p>
              <p><strong>Fecha de creación:</strong> {new Date(publicacion.fecha).toLocaleString()}</p>
              <Link to={`/perfil/${publicacion.registroacademico}`}>Ver perfil</Link>
  
              {/* Mostrar respuestas (mensajes) */}
              <div className="mensajes">
                {/* Aquí mostrarías las respuestas como ya lo tienes configurado */}
              </div>
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



