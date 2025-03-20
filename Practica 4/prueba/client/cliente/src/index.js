import React from "react";
import ReactDOM from "react-dom/client";  // Nota que ahora importas 'react-dom/client'
import "./index.css";  // Si tienes un archivo CSS global
import App from "./App";  // Asegúrate de que se importe el archivo App.js correctamente

// Crear un "root" en el DOM donde se montará la app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Usar el nuevo método para renderizar la app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


