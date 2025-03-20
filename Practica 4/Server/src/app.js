const express = require('express');
const config = require('./config');
const morgan = require('morgan');

const clientes = require('./modulos/clientes/rutas')

const app = express();

//middleware
app.use(morgan('dev'));

//configuracion
app.set('port', config.app.port);

//rutas
app.use('/api/clientes', clientes)

module.exports = app;