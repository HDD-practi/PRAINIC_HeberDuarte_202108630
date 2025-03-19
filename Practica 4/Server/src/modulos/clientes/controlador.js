const db = require('../../DB/mysql');

const TABLA = 'curso';

function todos() {
    return db.todos(TABLA);
}

module.exports = {
    todos,
}