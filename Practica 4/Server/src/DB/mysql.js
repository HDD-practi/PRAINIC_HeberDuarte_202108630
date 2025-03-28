const mysql = require('mysql2');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err)=>{
        if (err){
            console.log('[db err]', err);
            setTimeout(conMysql, 200);
        }else{
            console.log('DB conectada');
        }
    });

    conexion.on('error', err => {
        console.log('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    })
}

conMysql();

function todos(tabla) {
    return  new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
}

function uno(tabla, codigo_curso) {
    return  new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE codigo_curso=${codigo_curso}` , (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
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