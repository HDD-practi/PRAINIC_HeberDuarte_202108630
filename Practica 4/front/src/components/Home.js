// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error al obtener las publicaciones', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="home-container">
      <h2>Publicaciones</h2>
      <div className="post-list">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <Link to={`/post/${post.id}`}>Ver respuestas</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
