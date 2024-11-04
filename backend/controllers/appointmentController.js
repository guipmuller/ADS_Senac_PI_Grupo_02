const Appointment = require("../models/appointment");
const CareProfessional = require("../models/careProfessional");
const Patient = require("../models/patient");

exports.getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  } catch (err) {
    next(err);
  }
};

exports.getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (appointment) {
      res.json(appointment);
    } else {
      res.status(404).send("Appointment not found");
    }
  } catch (err) {
    next(err);
  }
};

exports.createAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.create(req.body);
    const careProfessionalExists = await CareProfessional.findByPk(
      req.body.idCareProfessional
    );
    const patientExists = await Patient.findByPk(req.body.idPatient);
    if (!careProfessionalExists) {
      return res.status(404).json({ error: "Care professional not found" });
    }
    if (!patientExists) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.status(201).json(appointment);
  } catch (err) {
    next(err);
  }
};

exports.updateAppointment = async (req, res, next) => {
  try {
    const [updated] = await Appointment.update(req.body, {
      where: { idAppointment: req.params.id },
    });
    if (updated) {
      const updateAppointment = await Appointment.findByPk(req.params.id);
      res.status(200).json(updateAppointment);
    } else {
      res.status(404).send("Appointment not found");
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteAppointment = async (req, res, next) => {
  try {
    const deleted = await Appointment.destroy({
      where: { idAppointment: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send("Appointment not found");
    }
  } catch (err) {
    next(err);
  }
};
