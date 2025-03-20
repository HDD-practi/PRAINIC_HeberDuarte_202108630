// Publicaciones.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [nuevoPublicacion, setNuevoPublicacion] = useState('');
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [catedraticoSeleccionado, setCatedraticoSeleccionado] = useState('');
  const [respuestas, setRespuestas] = useState({});
  const [nuevoComentario, setNuevoComentario] = useState('');

  const fetchPublicaciones = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/publicaciones', {
        params: {
          curso: cursoSeleccionado,
          catedratico: catedraticoSeleccionado,
        },
      });
      setPublicaciones(response.data);
    } catch (error) {
      console.error('Error al obtener publicaciones:', error);
    }
  };

  const handleCreatePublicacion = async () => {
    const usuario = { registroacademico: '12345' }; // Aquí deberías obtener el registro del usuario logueado

    try {
      await axios.post('http://localhost:5000/api/publicaciones', {
        idcurso: cursoSeleccionado,
        idcatedratico: catedraticoSeleccionado,
        registroacademico: usuario.registroacademico,
        publicacion: nuevoPublicacion,
        tipo: 'curso', // O 'catedratico', según corresponda
      });

      fetchPublicaciones();
      setNuevoPublicacion('');
    } catch (error) {
      console.error('Error al crear publicación:', error);
    }
  };

  const handleAddComentario = async (idPublicacion) => {
    const usuario = { registroacademico: '12345' }; // Aquí deberías obtener el registro del usuario logueado

    try {
      await axios.post(`http://localhost:5000/api/publicaciones/${idPublicacion}/respuestas`, {
        mensaje: nuevoComentario,
        registroacademico: usuario.registroacademico,
      });

      fetchRespuestas(idPublicacion);
      setNuevoComentario('');
    } catch (error) {
      console.error('Error al agregar comentario:', error);
    }
  };

  const fetchRespuestas = async (idPublicacion) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/publicaciones/${idPublicacion}/respuestas`);
      setRespuestas((prev) => ({ ...prev, [idPublicacion]: response.data }));
    } catch (error) {
      console.error('Error al obtener respuestas:', error);
    }
  };

  useEffect(() => {
    fetchPublicaciones();
  }, [cursoSeleccionado, catedraticoSeleccionado]);

  return (
    <div>
      <h2>Publicaciones</h2>

      {/* Filtros */}
      <div>
        <label>
          Curso:
          <input
            type="text"
            value={cursoSeleccionado}
            onChange={(e) => setCursoSeleccionado(e.target.value)}
          />
        </label>
        <label>
          Catedrático:
          <input
            type="text"
            value={catedraticoSeleccionado}
            onChange={(e) => setCatedraticoSeleccionado(e.target.value)}
          />
        </label>
      </div>

      {/* Crear publicación */}
      <div>
        <h3>Crear publicación</h3>
        <textarea
          value={nuevoPublicacion}
          onChange={(e) => setNuevoPublicacion(e.target.value)}
          placeholder="Escribe tu publicación aquí"
        />
        <button onClick={handleCreatePublicacion}>Crear publicación</button>
      </div>

      {/* Mostrar publicaciones */}
      <ul>
        {publicaciones.map((publicacion) => (
          <li key={publicacion.idpublicacion}>
            <h4>{publicacion.publicacion}</h4>
            <button onClick={() => fetchRespuestas(publicacion.idpublicacion)}>Ver respuestas</button>

            {/* Mostrar respuestas */}
            {respuestas[publicacion.idpublicacion] && (
              <div>
                <h5>Respuestas:</h5>
                <ul>
                  {respuestas[publicacion.idpublicacion].map((respuesta) => (
                    <li key={respuesta.idmensaje}>{respuesta.mensaje}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Agregar respuesta */}
            <div>
              <textarea
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                placeholder="Escribe tu comentario aquí"
              />
              <button onClick={() => handleAddComentario(publicacion.idpublicacion)}>Agregar respuesta</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Publicaciones;

