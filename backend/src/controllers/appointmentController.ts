import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../database/data-source";
import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { AppointmentService } from "../services/AppointmentService";
import { CareProfessionalRepository } from "../repositories/CareProfessionalRepository";
import { CareProfessionalService } from "../services/CareProfessionalService";
import { PatientRepository } from "../repositories/PatientRepository";
import { PatientService } from "../services/PatientService";

const appointmentRepository = new AppointmentRepository(AppDataSource);
const appointmentService = new AppointmentService(appointmentRepository);
const careProfessionalRepository = new CareProfessionalRepository(AppDataSource);
const careProfessionalService = new CareProfessionalService(careProfessionalRepository);
const patientRepository = new PatientRepository(AppDataSource);
const patientService = new PatientService(patientRepository);

export const getAllAppointments = async (req: Request, res : Response, next: NextFunction) => {
  try {
    const appointments = await appointmentService.getAllAppointments();
    res.json(appointments);
  } catch (err) {
    next(err);
  }
};

export const getAppointmentById = async (req: Request, res : Response, next: NextFunction) => {
  try {
    const appointment = await appointmentService.getAppointmentById(Number(req.params.id));
    if (appointment) {
      res.json(appointment);
    } else {
      res.status(404).send("Appointment not found");
    }
  } catch (err) {
    next(err);
  }
};

export const createAppointment = async (req: Request, res : Response, next: NextFunction) : Promise<void> => {
  try {
    const careProfessionalExists = await careProfessionalService.getCareProfessionalById(
      req.body.idCareProfessional
    );
    if (!careProfessionalExists) {
      res.status(404).json({ error: "Care professional not found" });
    }
    const patientExists = await patientService.getPatientById(req.body.idPatient);
    if (!patientExists) {
      res.status(404).json({ error: "Patient not found" });
    }
    const appointment = await appointmentService.createAppointments(req.body);
    res.status(201).json(appointment);
  } catch (err) {
    next(err);
  }
};

export const updateAppointment = async (req: Request, res : Response, next: NextFunction) => {
  try {
    const updated = await appointmentService.updateAppointments(Number(req.params.id), req.body);
    if (updated) {
      const updateAppointment = await appointmentService.getAppointmentById(Number(req.params.id));
      res.status(200).json(updateAppointment);
    } else {
      res.status(404).send("Appointment not found");
    }
  } catch (err) {
    next(err);
  }
};

export const deleteAppointment = async (req: Request, res : Response, next: NextFunction) => {
  try {
    const deleted = await appointmentService.deleteAppointments(Number(req.params.id));
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send("Appointment not found");
    }
  } catch (err) {
    next(err);
  }
};
