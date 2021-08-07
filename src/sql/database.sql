CREATE DATABASE accion_comunal;
use accion_comunal;

CREATE TABLE usuarios(
	id INT PRIMARY KEY auto_increment NOT NULL,
	avatar VARCHAR(250) NOT NULL,
	name VARCHAR(70) NOT NULL,
	lastName VARCHAR(70) NOT NULL,
	email VARCHAR(70) UNIQUE DEFAULT NULL,
	user VARCHAR(70) NOT NULL,
	password VARCHAR(70) NOT NULL,
    rol VARCHAR(70) NOT NULL, -- se tendra dos roles  [administrador, usuario, encuestador, secretaria, superadmin]
	typeDocument VARCHAR(70) NOT NULL,
	nroDocument INT(70) NOT NULL,
	gender VARCHAR(70) NOT NULL,
	address VARCHAR(150) NOT NULL,
	mobile VARCHAR(70) NOT NULL,
	municipality VARCHAR(70) NOT NULL,
	department VARCHAR(70) NOT NULL,
	neighborhood VARCHAR(70) NOT NULL,
	dateofbirth DATE NOT NULL,
    date_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- fecha de creacion del registro
    state BOOLEAN NOT NULL, -- si el usuario esta habilitado para mostrarse en la visual del admin
    date_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- fecha de actualizacion del registro
);

DESCRIBE usuarios;

INSERT INTO usuarios (avatar,name,lastName,email,user,password,rol,typeDocument,nroDocument,gender,address,mobile,municipality,department,neighborhood,dateofbirth,state)
VALUES ('n/a', 'Super Admin', 'Admin','superadmin@localhost','superadmin','$2a$08$deXgJnXd/rEAr7cAM.fpQ.w/IDwUj.sfg0yIbkbO/BdhQ6HoK9Lda','superadmin','n/a',0123,'n/a','n/a','n/a','n/a','n/a','n/a','2020-02-12', 1);


ALTER TABLE usuarios
  ADD gender VARCHAR(70) NOT NULL;

CREATE TABLE encuesta(
	id INT PRIMARY KEY auto_increment NOT NULL,
	encuestadorId int(11) DEFAULT NULL,
	name VARCHAR(70) NOT NULL,
	lastName VARCHAR(70) NOT NULL,
	typeDocument VARCHAR(70) NOT NULL,
	nroDocument INT(70) NOT NULL,
	email VARCHAR(70) UNIQUE DEFAULT NULL, -- modificar 
	estrato VARCHAR(70) NOT NULL,
	eps VARCHAR(70) NOT NULL,
	gender VARCHAR(70) NOT NULL,
	tienesSisben VARCHAR(70) NOT NULL,
	grupoDelSisben VARCHAR(70) NOT NULL,
	nroPersonas VARCHAR(70) NOT NULL,
	tieneHijos VARCHAR(70) NOT NULL,
	nroHijos VARCHAR(70) NOT NULL,
	conQuienVive VARCHAR(70) NOT NULL,
	address VARCHAR(150) NOT NULL,
	mobile VARCHAR(70) NOT NULL,
	phone VARCHAR(70) NOT NULL,
	municipality VARCHAR(70) NOT NULL,
	department VARCHAR(70) NOT NULL,
	neighborhood VARCHAR(70) NOT NULL,
	serviciosHogar VARCHAR(70) NOT NULL,
	nivelEscolar VARCHAR(70) NOT NULL,
	cabezafamilia VARCHAR(70) NOT NULL,
	ocupacion VARCHAR(70) NOT NULL,
	tienediscapacidad VARCHAR(70) NOT NULL,
	etnia VARCHAR(70) NOT NULL,
    dateofbirth DATE NOT NULL,
    date_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- fecha de creacion del registro
    state BOOLEAN NOT NULL, -- si el usuario esta habilitado para mostrarse en la visual del admin
    date_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- fecha de actualizacion del registro
);

DESCRIBE encuesta;

ALTER TABLE encuesta ADD CONSTRAINT `encuesta_ibfk_1` FOREIGN KEY (`encuestadorId`) REFERENCES usuarios (`id`);

ALTER TABLE encuesta
  ADD gender VARCHAR(70) NOT NULL;

ALTER TABLE encuesta
  ADD nroPersonas VARCHAR(70) NOT NULL;

ALTER TABLE encuesta
  ADD conQuienVive VARCHAR(70) NOT NULL;

ALTER TABLE encuesta
  ADD ocupacion VARCHAR(70) NOT NULL;

ALTER TABLE encuesta
  ADD cabezafamilia VARCHAR(70) NOT NULL;

ALTER TABLE encuesta
  ADD tienediscapacidad VARCHAR(70) NOT NULL;

ALTER TABLE encuesta
  ADD etnia VARCHAR(70) NOT NULL;

CREATE TABLE contacto(
	id INT PRIMARY KEY auto_increment NOT NULL,
	nameComplete VARCHAR(70) NOT NULL,
	email VARCHAR(70) NOT NULL,
	asunto VARCHAR(70) NOT NULL,
	mensaje VARCHAR(300) NOT NULL,
    date_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- fecha de creacion del registro
    date_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- fecha de actualizacion del registro
);

DESCRIBE contacto;

/*


*/