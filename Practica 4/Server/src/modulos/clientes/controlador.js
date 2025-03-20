const db = require('../../DB/mysql');

const TABLA = 'curso';

function todos() {
    return db.todos(TABLA);
}

function uno(codigo_curso) {
    return db.uno(TABLA, codigo_curso);
}

module.exports = {
    todos,
    uno
}