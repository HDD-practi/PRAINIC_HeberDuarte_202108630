CREATE DATABASE notascatedraticos;
USE notascatedraticos;

CREATE TABLE usuario (
    registro_academico VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    contrasena VARCHAR(50) NOT NULL
);

CREATE TABLE curso (
    codigo_curso VARCHAR(20) PRIMARY KEY,
    nombre_curso VARCHAR(50) NOT NULL,
    registrocatedratico VARCHAR(50) NOT NULL
);

CREATE TABLE catedratico (
    registroacademico VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE publicacion (
    idpublicacion INT PRIMARY KEY AUTO_INCREMENT,
    idcurso VARCHAR (20) NOT NULL,
    idcatedratico VARCHAR(20) NOT NULL,
    registroacademico VARCHAR(20) NOT NULL,
    publicacion VARCHAR(50) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo ENUM('curso', 'catedratico') NOT NULL,
    FOREIGN KEY (idcurso) REFERENCES curso(codigo_curso),
    FOREIGN KEY (idcatedratico) REFERENCES catedratico(registroacademico),
    FOREIGN KEY (registroacademico) REFERENCES usuario(registro_academico)
);

CREATE TABLE mensajes (
    idmensaje INT PRIMARY KEY AUTO_INCREMENT,
    mensaje TEXT NOT NULL,
    idpublicacion INT NOT NULL,
    registroacademico VARCHAR(20) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idpublicacion) REFERENCES publicacion(idpublicacion),
    FOREIGN KEY (registroacademico) REFERENCES usuario(registro_academico)
);


CREATE TABLE curso_catedratico (
    idcurso VARCHAR(20) NOT NULL,
    idcatedratico VARCHAR(20) NOT NULL,
    PRIMARY KEY (idcurso, idcatedratico),
    FOREIGN KEY (idcurso) REFERENCES curso(codigo_curso),
    FOREIGN KEY (idcatedratico) REFERENCES catedratico(registroacademico)
);

CREATE TABLE cursos_aprobados (
    idcurso VARCHAR(20) NOT NULL,
    registroacademico VARCHAR(20) NOT NULL,
    PRIMARY KEY (idcurso, registroacademico),
    FOREIGN KEY (idcurso) REFERENCES curso(codigo_curso),
    FOREIGN KEY (registroacademico) REFERENCES usuario(registro_academico)
);

