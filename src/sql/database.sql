CREATE DATABASE accion_comunal;
use accion_comunal;

CREATE TABLE usuarios(
	id INT PRIMARY KEY auto_increment NOT NULL,
	avatar VARCHAR(70) NOT NULL,
	name VARCHAR(70) NOT NULL,
	lastName VARCHAR(70) NOT NULL,
	email VARCHAR(70) UNIQUE DEFAULT NULL,
	user VARCHAR(70) NOT NULL,
	password VARCHAR(70) NOT NULL,
    rol VARCHAR(70) NOT NULL, -- se tendra dos roles  [administrador, usuario, encuestador, secretaria, superadmin]
	typeDocument VARCHAR(70) NOT NULL,
	nroDocument INT(70) NOT NULL,
	address VARCHAR(70) NOT NULL,
	mobile VARCHAR(70) NOT NULL,
	municipality VARCHAR(70) NOT NULL,
	department VARCHAR(70) NOT NULL,
	neighborhood VARCHAR(70) NOT NULL,
	dateofbirth date NOT NULL,
    date_create date NOT NULL, -- fecha de creacion del registro
    state VARCHAR(150) NOT NULL, -- si el usuario esta habilitado para mostrarse en la visual del admin
    date_update date NOT NULL -- fecha de actualizacion del registro
);

DESCRIBE usuarios;

CREATE TABLE encuesta(
	id INT PRIMARY KEY auto_increment NOT NULL,
	encuestadorId int(11) DEFAULT NULL,
	name VARCHAR(70) NOT NULL,
	lastName VARCHAR(70) NOT NULL,
	typeDocument VARCHAR(70) NOT NULL,
	nroDocument INT(70) NOT NULL,
	email VARCHAR(70) UNIQUE DEFAULT NULL,
	estrato VARCHAR(70) NOT NULL,
	eps VARCHAR(70) NOT NULL,
	tienesSisben VARCHAR(70) NOT NULL,
	grupoDelSisben VARCHAR(70) NOT NULL,
	tieneHijos VARCHAR(70) NOT NULL,
	nroHijos VARCHAR(70) NOT NULL,
	address VARCHAR(70) NOT NULL,
	mobile VARCHAR(70) NOT NULL,
	phone VARCHAR(70) NOT NULL,
	municipality VARCHAR(70) NOT NULL,
	department VARCHAR(70) NOT NULL,
	neighborhood VARCHAR(70) NOT NULL,
	dateofbirth date NOT NULL,
	serviciosHogar VARCHAR(70) NOT NULL,
	nivelEscolar VARCHAR(70) NOT NULL,
    date_create date NOT NULL, -- fecha de creacion del registro
    state VARCHAR(150) NOT NULL, -- si el usuario esta habilitado para mostrarse en la visual del admin
    date_update date NOT NULL -- fecha de actualizacion del registro
);

DESCRIBE encuesta;

ALTER TABLE encuesta ADD CONSTRAINT `encuesta_ibfk_1` FOREIGN KEY (`encuestadorId`) REFERENCES usuarios (`id`);

CREATE TABLE contacto(
	id INT PRIMARY KEY auto_increment NOT NULL,
	nameComplete VARCHAR(70) NOT NULL,
	email VARCHAR(70) NOT NULL,
	asunto VARCHAR(70) NOT NULL,
	mensaje VARCHAR(300) NOT NULL,
    date_create date NOT NULL, -- fecha de creacion del registro
    date_update date NOT NULL -- fecha de actualizacion del registro
);

DESCRIBE contacto;

