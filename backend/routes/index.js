var express = require("express");
var router = express.Router();

console.log("Index router carregado");

router.get("/", function (req, res) {
  console.log("GET / chamado");
  res.render("index", { title: "App" });
});

module.exports = router;
