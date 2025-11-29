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

`;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
    }

function kpi(fkusuario) {


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
WHERE id_usuario = ${fkusuario};
    
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpi2() { // descobrir qual select fazer aqui

    var instrucaoSql = `
      
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

FROM vwGraficoPolar;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    mostrarGrafico,
    graficoPolar,
    kpi,
    kpi2
}
