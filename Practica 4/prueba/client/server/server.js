const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Importa el archivo de rutas donde están las rutas POST
const publicacionesRoutes = require('./routes/publicaciones'); 
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json()); // Asegúrate de que bodyParser esté configurado para aceptar JSON

// Usa las rutas
app.use('/api', routes); // La ruta base para tus APIs
app.use('/api', publicacionesRoutes);


// Arrancar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});




