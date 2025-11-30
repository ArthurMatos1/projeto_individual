
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

INSERT INTO quiz VALUES
(1);

CREATE TABLE caracteristica(
idCaracteristica INT auto_increment,
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
	gunboard INT
);

SELECT * FROM usuario;
SELECT * FROM caracteristica;
show tables;


-- Gráfico barra
CREATE VIEW vwgraficoBarra as 
SELECT
	(SELECT ROUND(longboard / 9 * 100, 0)
    FROM caracteristica 
    ORDER BY id_quiz DESC LIMIT 1) AS Longboard,

    (SELECT ROUND(funboard / 9 * 100, 0)
    FROM caracteristica
    ORDER BY id_quiz DESC LIMIT 1) AS Funboard,
    
    (SELECT ROUND(shortboard / 9 * 100, 0)
    FROM caracteristica
    ORDER BY id_quiz DESC LIMIT 1) AS shortboard,
    
    (SELECT ROUND(fishboard / 9 * 100,0)
    FROM caracteristica
    ORDER BY id_quiz DESC LIMIT 1) AS Fishboard,
    
    (SELECT ROUND(gunboard / 9 * 100, 0)
    FROM caracteristica
    ORDER BY id_quiz DESC LIMIT 1) AS Gunboard;
    
	SELECT * FROM vwgraficoBarra;
    
    -- Gráfico Polar
    ALTER VIEW vwGraficoPolar AS
   SELECT 
    ROUND(
        (SELECT COUNT(*) 
        FROM caracteristica 
        WHERE longboard > funboard 
        AND longboard > shortboard 
        AND longboard > gunboard 
        AND longboard > fishboard)
        / (SELECT COUNT(*) FROM caracteristica) * 100
    , 0) AS Longboard,

    ROUND(
        (SELECT COUNT(*) 
        FROM caracteristica
        WHERE funboard > longboard 
        AND funboard > shortboard 
        AND funboard > gunboard 
        AND funboard > fishboard)
        / (SELECT COUNT(*) FROM caracteristica) * 100
    , 0) AS Funboard,

    ROUND(
        (SELECT COUNT(*) 
        FROM caracteristica 
        WHERE shortboard > longboard 
        AND shortboard > funboard 
        AND shortboard > fishboard 
        AND shortboard > gunboard)
        / (SELECT COUNT(*) FROM caracteristica) * 100
    , 0) AS Shortboard,

    ROUND(
        (SELECT COUNT(*) 
        FROM caracteristica 
        WHERE fishboard > longboard 
        AND fishboard > funboard 
        AND fishboard > gunboard 
        AND fishboard > shortboard)
        / (SELECT COUNT(*) FROM caracteristica) * 100
    , 0) AS Fishboard,

    ROUND(
        (SELECT COUNT(*) 
        FROM caracteristica 
        WHERE gunboard > longboard 
        AND gunboard > fishboard 
        AND gunboard > shortboard 
        AND gunboard > funboard)
        / (SELECT COUNT(*) FROM caracteristica) * 100
    , 0) AS Gunboard;

SELECT * FROM vwGraficoPolar;

-- kpi 1
	CREATE VIEW pranchaVencedora AS
SELECT
    CASE
            WHEN longboard  >= funboard
            AND longboard  >= shortboard
            AND longboard  >= fishboard
            AND longboard  >= gunboard
                THEN 'Longboard'

            WHEN funboard   >= longboard
            AND funboard   >= shortboard
            AND funboard   >= fishboard
            AND funboard   >= gunboard
                THEN 'Funboard'

            WHEN shortboard >= longboard
            AND shortboard >= funboard
            AND shortboard >= fishboard
            AND shortboard >= gunboard
                THEN 'Shortboard'

            WHEN fishboard  >= longboard
            AND fishboard  >= funboard
            AND fishboard  >= shortboard
            AND fishboard  >= gunboard
                THEN 'Fishboard'

            WHEN gunboard >= longboard
            AND gunboard >= funboard
            AND gunboard >= shortboard
            AND gunboard >= fishboard
                THEN 'Gunboard'
                
        END AS pranchaVencedora
                FROM caracteristica
        ORDER BY pranchaVencedora DESC LIMIT 1;
        
        SELECT * FROM pranchaVencedora;
        
        -- kpi 2
        
        ALTER VIEW vwKpi2 AS 
      SELECT 
    CASE
        WHEN longboard >= shortboard 
         AND longboard >= funboard 
         AND longboard >= gunboard 
         AND longboard >= fishboard 
            THEN Longboard

        WHEN shortboard >= longboard
         AND shortboard >= funboard
         AND shortboard >= fishboard
         AND shortboard >= gunboard
            THEN Shortboard

        WHEN funboard >= longboard
         AND funboard >= shortboard
         AND funboard >= fishboard
         AND funboard >= gunboard
            THEN Funboard

        WHEN fishboard >= longboard
         AND fishboard >= funboard
         AND fishboard >= shortboard
         AND fishboard >= gunboard
            THEN Fishboard

        ELSE gunboard
    END AS MaiorValor,

    CASE
         WHEN longboard >= shortboard 
         AND longboard >= funboard 
         AND longboard >= gunboard 
         AND longboard >= fishboard 
            THEN 'Longboard'

         WHEN shortboard >= longboard
         AND shortboard >= funboard
         AND shortboard >= fishboard
         AND shortboard >= gunboard
            THEN 'Shortboard'

         WHEN funboard >= longboard
         AND funboard >= shortboard
         AND funboard >= fishboard
         AND funboard >= gunboard
            THEN 'Funboard'

        WHEN fishboard >= longboard
         AND fishboard >= funboard
         AND fishboard >= shortboard
         AND fishboard >= gunboard
            THEN 'Fishboard'

        ELSE 'Gunboard'
    END AS Prancha

FROM vwGraficoPolar;
                
		SELECT * FROM vwKpi2;
	
    select * from quiz;


