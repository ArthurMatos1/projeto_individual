var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.post("/mostrarGrafico", function (req, res) {
    medidaController.mostrarGrafico(req, res);
})

router.post("/graficoPolar", function (req, res) {
    medidaController.graficoPolar(req, res);
})

router.post("/kpi", function (req, res) {
    medidaController.kpi(req, res);
})

router.post("/kpi2", function (req, res) {
    medidaController.kpi2(req, res);
})


module.exports = router;