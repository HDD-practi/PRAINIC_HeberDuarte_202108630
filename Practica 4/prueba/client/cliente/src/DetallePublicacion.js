import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetallePublicacion = () => {
  const { id } = useParams(); // Obtener el id de la publicación de la URL
  const [publicacion, setPublicacion] = useState(null);

  useEffect(() => {
    const fetchPublicacion = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/publicaciones/${id}`);
        setPublicacion(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles de la publicación', error);
      }
    };

    fetchPublicacion();
  }, [id]);

  if (!publicacion) return <p>Cargando...</p>;

  return (
    <div className="detalle-publicacion">
      <h2>{publicacion.tipo === 'curso' ? `Curso: ${publicacion.nombre_curso}` : `Catedrático: ${publicacion.nombre_catedratico}`}</h2>
      <p>{publicacion.publicacion}</p>
      <span>{new Date(publicacion.fecha).toLocaleDateString()}</span>
      {/* Aquí podrías agregar un formulario para dejar comentarios */}
    </div>
  );
};

export default DetallePublicacion;
