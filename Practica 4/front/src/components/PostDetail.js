// src/components/PostDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error al obtener la publicación', error);
      }
    };

    const fetchResponses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}/responses`);
        setResponses(response.data);
      } catch (error) {
        console.error('Error al obtener las respuestas', error);
      }
    };

    fetchPost();
    fetchResponses();
  }, [id]);

  if (!post) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="post-detail-container">
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <h3>Respuestas:</h3>
      <div className="responses-list">
        {responses.map((response) => (
          <div key={response.id} className="response">
            <p>{response.content}</p>
          </div>
        ))}
      </div>

      <Link to="/home">Volver a las publicaciones</Link>
    </div>
  );
};

export default PostDetail;

