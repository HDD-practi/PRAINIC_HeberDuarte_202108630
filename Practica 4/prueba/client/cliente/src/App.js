import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";  // Asegúrate de que este componente existe
import Dashboard from "./components/Dashboard";  // Asegúrate de que este componente existe
import Register from './components/Register';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Página de Login */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Página principal después de loguearse */}
        <Route path="/register" element={<Register />} /> {/* Página de Registro */}
        <Route path="/home" element={<Home />} /> {/* Página de Inicio */}
      </Routes>
    </Router>
  );
}

export default App;

