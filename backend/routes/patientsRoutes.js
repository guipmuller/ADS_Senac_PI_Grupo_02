var express = require("express");
var router = express.Router();
const Controller = require("../controllers/patientController");

router.get("/", Controller.getAllPatients);
router.get("/:id", Controller.getPatientById);
router.post("/", Controller.createPatient);
router.put("/:id", Controller.updatePatient);
router.delete("/:id", Controller.deletePatient);

module.exports = router;
