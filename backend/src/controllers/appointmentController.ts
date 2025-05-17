import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../database/data-source";
import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { AppointmentService } from "../services/AppointmentService";
import { CareProfessionalRepository } from "../repositories/CareProfessionalRepository";
import { CareProfessionalService } from "../services/CareProfessionalService";
import { PatientRepository } from "../repositories/PatientRepository";
import { PatientService } from "../services/PatientService";
import { AppointmentStatus } from "../models/enums/AppointmentStatus";

const appointmentRepository = new AppointmentRepository(AppDataSource);
const appointmentService = new AppointmentService(appointmentRepository);
const careProfessionalRepository = new CareProfessionalRepository(AppDataSource);
const careProfessionalService = new CareProfessionalService(careProfessionalRepository);
const patientRepository = new PatientRepository(AppDataSource);
const patientService = new PatientService(patientRepository);

export const getAllAppointments = async (req: Request, res : Response, next: NextFunction): Promise<void> => {
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
      return;
    } else {
      res.status(404).send("Appointment not found");
      return;
    }
  } catch (err) {
    next(err);
  }
};

export const createAppointment = async (req: Request, res : Response, next: NextFunction) => {
  try {
    const { status } = req.body;

    const careProfessionalExists = await careProfessionalService.getCareProfessionalById(
      req.body.idCareProfessional
    );
    if (!careProfessionalExists) {
      res.status(404).json({ error: "Care professional not found" });
      return;
    }

    const patientExists = await patientService.getPatientById(req.body.idPatient);
    if (!patientExists) {
      res.status(404).json({ error: "Patient not found" });
      return;
    }

    if (!Object.values(AppointmentStatus).includes(status)) {
      res.status(400).json({ message: "Invalid appointment status" });
      return;
    }

    const appointment = await appointmentService.createAppointments(req.body);
    res.status(201).json(appointment.idAppointment);
    return;
  } catch (err) {
    next(err);
  }
};

export const updateAppointment = async (req: Request, res : Response, next: NextFunction) => {
  try {
    const { status } = req.body;

    if (status && !Object.values(AppointmentStatus).includes(status)) {
      res.status(400).json({ message: "Invalid appointment status" });
      return;
    }

    const updated = await appointmentService.updateAppointments(Number(req.params.id), req.body);
    
    if (updated) {
      const updateAppointment = await appointmentService.getAppointmentById(Number(req.params.id));
      res.status(200).json(updateAppointment);
      return;
    } else {
      res.status(404).send("Appointment not found");
      return;
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
      return;
    } else {
      res.status(404).send("Appointment not found");
      return;
    }
  } catch (err) {
    next(err);
  }
};
