var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.post("/mostrarGrafico", function (req, res) {
    medidaController.mostrarGrafico(req, res);
})

module.exports = router;