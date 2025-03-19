const mysql = require('mysql');
const config = require('../config');

const prueba = {
    id : 1,
    nombre : 'Prueba',
    edad : 43
}

function todos(tabla) {
    return prueba;
}

function uno(tabla, id) {

}

function agregar(tabla, datos){

}

function eliminar(tabla, id){

}


module.exports = {
    todos,
    uno,
    agregar,
    eliminar
}