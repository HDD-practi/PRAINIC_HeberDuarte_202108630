// CrearPublicacion.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CrearPublicacion = () => {
  const [publicacion, setPublicacion] = useState('');
  const [idcurso, setIdcurso] = useState('');
  const [idcatedratico, setIdcatedratico] = useState('');
  const [tipo, setTipo] = useState('curso'); // Valor por defecto: 'curso'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/publicaciones', {
        idcurso,
        idcatedratico,
        registroacademico: '123456', // Deberías reemplazarlo con el valor real del usuario logueado
        publicacion,
        tipo,
      });

      alert('Publicación creada con éxito');
      navigate('/publicaciones');
    } catch (error) {
      console.error('Error al crear publicación:', error);
      alert('Error al crear publicación');
    }
  };

  return (
    <div>
      <h2>Crear Publicación</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Publicación</label>
          <textarea
            value={publicacion}
            onChange={(e) => setPublicacion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Curso</label>
          <input
            type="text"
            value={idcurso}
            onChange={(e) => setIdcurso(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Catedrático</label>
          <input
            type="text"
            value={idcatedratico}
            onChange={(e) => setIdcatedratico(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tipo</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="curso">Curso</option>
            <option value="catedratico">Catedrático</option>
          </select>
        </div>
        <button type="submit">Crear Publicación</button>
      </form>
    </div>
  );
};

export default CrearPublicacion;
