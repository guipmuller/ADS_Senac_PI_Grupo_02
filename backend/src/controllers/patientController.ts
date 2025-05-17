import { Request, Response, NextFunction } from "express";
import { PatientService } from "../services/PatientService";
import { PatientRepository } from "../repositories/PatientRepository";
import { AppDataSource } from "../database/data-source";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";

const patientRepository = new PatientRepository(AppDataSource);
const patientService = new PatientService(patientRepository);
const userRepository = new UserRepository(AppDataSource);
const userService = new UserService(userRepository);

export const getAllPatients = async (req: Request, res : Response, next: NextFunction) => {
  try {
    const patients = await patientService.getAllPatients();
    res.json(patients);
  } catch (err) {
    next(err);
  }
};

export const getPatientById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patient = await patientService.getPatientById(Number(req.params.id));
    if (patient) res.json(patient);
    else res.status(404).send("Patient not found");
  } catch (err) {
    next(err);
  }
};

export const createPatient = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  try {
    const { idUser, ...patientData } = req.body;
    const userExists = await userService.getUserById(idUser);
    if (!userExists) res.status(404).json({ error: "User not found" });
    const patient = await patientService.createPatient({ idUser, ...patientData });
    res.status(201).json({ id: patient.idPatient });
  } catch (err) {
    next(err);
  }
};

export const updatePatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await patientService.updatePatient(Number(req.params.id), req.body);
    if (updatedUser) {
      const updatePatient = await patientService.getPatientById(Number(req.params.id));
      res.status(200).json(updatePatient);
    } else  res.status(404).send("Patient not found");
  } catch (err) {
    next(err);
  }
};

export const deletePatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await patientService.deletePatient(Number(req.params.id))
    if (deleted) res.status(204).send();
    else res.status(404).send("Patient not found");
  } catch (err) {
    next(err);
  }
};
