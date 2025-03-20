import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);

  // Cargar las publicaciones al cargar el componente
  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/publicaciones');
        setPublicaciones(response.data);
      } catch (error) {
        console.error('Error al obtener las publicaciones', error);
      }
    };

    fetchPublicaciones();
  }, []);

  return (
    <div className="publicaciones-container">
      <h1>Publicaciones</h1>
      <div className="filters">
        {/* Aquí puedes agregar los filtros si lo deseas */}
      </div>
      <div className="publicaciones-list">
        {publicaciones.length > 0 ? (
          publicaciones.map((publicacion) => (
            <div key={publicacion.idpublicacion} className="publicacion-card">
              <h3>
                {publicacion.tipo === 'curso' ? `Curso: ${publicacion.nombre_curso}` : `Catedrático: ${publicacion.nombre_catedratico}`}
              </h3>
              <p>{publicacion.publicacion}</p>
              <span>{new Date(publicacion.fecha).toLocaleDateString()}</span>
              <Link to={`/publicacion/${publicacion.idpublicacion}`} className="ver-detalle">
                Ver detalles
              </Link>
            </div>
          ))
        ) : (
          <p>No hay publicaciones disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Publicaciones;
