
CREATE DATABASE individual;
use individual;

CREATE TABLE usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(200),
senha VARCHAR(45)
);

CREATE TABLE quiz(
idQuiz INT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE caracteristica(
idCaracteristica INT auto_incremenT,
id_usuario INT,
CONSTRAINT usuarioRegra
	FOREIGN KEY (id_usuario)
		REFERENCES usuario(idUsuario),
id_quiz INT,
	CONSTRAINT quizRegra
		FOREIGN KEY (id_quiz)
			REFERENCES quiz(idQuiz),
PRIMARY KEY( idCaracteristica, id_usuario, id_quiz),
	longboard INT,
	funboard INT,
	shortboard INT,
	fishboard INT,
	bodyboard INT
);