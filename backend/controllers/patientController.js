const Patient = require("../models/patient");
const User = require("../models/user");

exports.getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (err) {
    next(err);
  }
};

exports.getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).send("Patient not found");
    }
  } catch (err) {
    next(err);
  }
};

exports.createPatient = async (req, res, next) => {
  try {
    const patient = await Patient.create(req.body);
    const userExists = await User.findByPk(req.body.idUser);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(201).json(patient);
  } catch (err) {
    next(err);
  }
};

exports.updatePatient = async (req, res, next) => {
  try {
    const [updated] = await Patient.update(req.body, {
      where: { idPatient: req.params.id },
    });
    if (updated) {
      const updatePatient = await Patient.findByPk(req.params.id);
      res.status(200).json(updatePatient);
    } else {
      res.status(404).send("Patient not found");
    }
  } catch (err) {
    next(err);
  }
};

exports.deletePatient = async (req, res, next) => {
  try {
    const deleted = await Patient.destroy({
      where: { idPatient: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send("Patient not found");
    }
  } catch (err) {
    next(err);
  }
};
