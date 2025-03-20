import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Perfil = () => {
  const { registroacademico } = useParams(); // Usamos useParams para obtener el registroacademico de la URL
  const [cursos, setCursos] = useState([]);
  const [nuevoCurso, setNuevoCurso] = useState('');
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  
  const currentUser = '202108630'; // Aquí usarías el registro académico del usuario logueado (desde tu autenticación)
  
  // Verificar si el perfil actual es del usuario logueado
  useEffect(() => {
    setIsOwnProfile(currentUser === registroacademico);
    
    // Obtener los cursos del usuario
    axios.get(`http://localhost:5000/api/perfil/${registroacademico}/cursos`)
      .then((response) => {
        setCursos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los cursos', error);
      });
  }, [registroacademico, currentUser]);

  const agregarCurso = () => {
    if (nuevoCurso && isOwnProfile) {
      axios.post(`http://localhost:5000/api/perfil/${registroacademico}/cursos`, {
        registroacademico,
        curso: nuevoCurso
      })
      .then(() => {
        // Recargar los cursos después de agregar uno nuevo
        setCursos([...cursos, { curso: nuevoCurso }]);
        setNuevoCurso('');
      })
      .catch((error) => {
        console.error('Error al agregar el curso', error);
      });
    } else if (!isOwnProfile) {
      alert('No puedes agregar cursos a otros perfiles');
    }
  };

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <h3>Cursos Aprobados</h3>
      <ul>
        {cursos.length > 0 ? (
          cursos.map((curso, index) => (
            <li key={index}>{curso.curso}</li>
          ))
        ) : (
          <p>No tienes cursos aprobados aún.</p>
        )}
      </ul>
      
      {/* Mostrar el formulario solo si el usuario está viendo su propio perfil */}
      {isOwnProfile && (
        <div>
          <input 
            type="text" 
            value={nuevoCurso} 
            onChange={(e) => setNuevoCurso(e.target.value)} 
            placeholder="Añadir nuevo curso"
          />
          <button onClick={agregarCurso}>Añadir Curso</button>
        </div>
      )}
    </div>
  );
};

export default Perfil;
