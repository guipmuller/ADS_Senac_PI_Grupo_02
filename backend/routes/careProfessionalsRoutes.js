var express = require("express");
var router = express.Router();
const Controller = require("../controllers/careProfessionalController");

router.get("/", Controller.getAllCareProfessionals);
router.get("/:id", Controller.getCareProfessionalById);
router.post("/", Controller.createCareProfessional);
router.put("/:id", Controller.updateCareProfessional);
router.delete("/:id", Controller.deleteCareProfessional);

module.exports = router;
