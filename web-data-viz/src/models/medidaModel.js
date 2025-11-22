var database = require("../database/config");


function mostrarGrafico() {

    var instrucaoSql = `
        SELECT
		ROUND(
		(SELECT COUNT(*)
        FROM caracteristica
        WHERE longboard > funboard
        AND longboard > shortboard
        AND longboard > fishboard
        AND longboard > gunboard)
        / ( SELECT COUNT(*) FROM caracteristica) * 100 , 0)
        AS Longboard,
			
		ROUND(
			(SELECT COUNT(*)
            FROM caracteristica
        WHERE funboard > longboard
        AND funboard > shortboard
        AND funboard > fishboard
        AND funboard > gunboard)
        / (SELECT COUNT(*) FROM caracteristica) * 100, 0)
        AS funboard,
        
        ROUND(
			(SELECT COUNT(*)
            FROM caracteristica
        WHERE shortboard > longboard
        AND shortboard > funboard
        AND shortboard > fishboard
        AND shortboard > gunboard)
        / (SELECT COUNT(*) FROM caracteristica) * 100, 0)
        AS Shortboard,
        
        ROUND(
			(SELECT COUNT(*)
            FROM caracteristica
        WHERE fishboard > longboard
        AND fishboard > funboard
        AND fishboard > shortboard
        AND fishboard > gunboard)
        / (SELECT COUNT(*) FROM caracteristica) * 100, 0)
        AS Fishboard;
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    mostrarGrafico
}
