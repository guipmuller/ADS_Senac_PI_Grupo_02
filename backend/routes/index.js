var express = require("express");
var router = express.Router();

console.log("Index router carregado");

/* GET home page. */
router.get("/", function (req, res) {
  console.log("GET / chamado");
  res.render("index", { title: "App" });
});

module.exports = router;
