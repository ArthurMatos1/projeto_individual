var database = require("../database/config");


function mostrarGrafico() {

    var instrucaoSql = `
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
    
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

    function graficoPolar(){

        var instrucaoSql = `
        SELECT
    ROUND(longboard  / 9 * 100, 0) 
    AS Longboard,
    ROUND(funboard / 9 * 100, 0) 
    AS Funboard,
    ROUND(shortboard / 9 * 100, 0) 
    AS Shortboard,
    ROUND(fishboard  / 9 * 100, 0) 
    AS Fishboard,
    ROUND(gunboard   / 9 * 100, 0) 
    AS Gunboard
FROM caracteristica;
`;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
    }

function kpi() {

    var instrucaoSql = `
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
    
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpi2() {

    var instrucaoSql = `
    SELECT
	ROUND(
		(SELECT COUNT(*)
        FROM caracteristica
            WHERE longboard  >= funboard
            AND longboard  >= shortboard
            AND longboard  >= fishboard
            AND longboard  >= gunboard)
			/ (SELECT COUNT(*) FROM caracteristica) * 100, 0) AS Longboard,

	ROUND(
		(SELECT COUNT(*)
			FROM caracteristica
            WHERE funboard   >= longboard
            AND funboard   >= shortboard
            AND funboard   >= fishboard
            AND funboard   >= gunboard)
             /	(SELECT COUNT(*) FROM caracteristica) * 100, 0) AS Funboard,
	
		ROUND(
			(SELECT COUNT(*)
            FROM caracteristica
            WHERE shortboard >= longboard
            AND shortboard >= funboard
            AND shortboard >= fishboard
            AND shortboard >= gunboard)
             / (SELECT COUNT(*) FROM caracteristica) * 100, 0) AS Shortborad,
            
            ROUND(
				(SELECT COUNT(*)
                FROM caracteristica
            WHERE fishboard  >= longboard
            AND fishboard  >= funboard
            AND fishboard  >= shortboard
            AND fishboard  >= gunboard)
             / (SELECT COUNT(*) FROM caracteristica) * 100, 0) AS Fishboard,

	ROUND(
		(SELECT COUNT(*)
        FROM caracteristica
            WHERE gunboard >= longboard
            AND gunboard >= funboard
            AND gunboard >= shortboard
            AND gunboard >= fishboard)
             / (SELECT COUNT(*) FROM caracteristica) * 100, 0) AS Gunboard
                FROM caracteristica;
    
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    mostrarGrafico,
    graficoPolar,
    kpi,
    kpi2
}
