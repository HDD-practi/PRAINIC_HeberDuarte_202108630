import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Usamos useEffect para obtener las publicaciones desde el backend
  useEffect(() => {
    // Función para obtener publicaciones
    const obtenerPublicaciones = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/publicaciones');
        setPublicaciones(response.data);  // Guardamos las publicaciones en el estado
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener publicaciones:', error);
        setLoading(false);
      }
    };

    obtenerPublicaciones();  // Llamamos la función para obtener las publicaciones
  }, []);  // El arreglo vacío asegura que solo se ejecute una vez al cargar el componente

  // Verificamos si estamos cargando
  if (loading) {
    return <p>Cargando publicaciones...</p>;
  }

  // Si no hay publicaciones
  if (publicaciones.length === 0) {
    return <p>No hay publicaciones disponibles.</p>;
  }

  return (
    <div>
      <h2>Publicaciones</h2>
      <div>
        {publicaciones.map((publicacion) => (
          <div key={publicacion.idpublicacion}>
            <h3>{publicacion.publicacion}</h3>
            <p>Por {publicacion.registroacademico}</p>
            <p>Fecha: {publicacion.fecha}</p>
            {/* Mostrar respuestas */}
            {publicacion.respuestas && publicacion.respuestas.length > 0 && (
              <div>
                <h4>Respuestas:</h4>
                <ul>
                  {publicacion.respuestas.map((respuesta) => (
                    <li key={respuesta.idmensaje}>{respuesta.mensaje}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Publicaciones;

